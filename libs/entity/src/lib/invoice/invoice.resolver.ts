import { HasInvoicePubSub, mapEntityEntry } from '@lv/common';
import {
	Args,
	Mutation,
	Query,
	Resolver,
	Subscription
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { MongooseError } from 'mongoose';
import { ChunkRepository } from '../chunk/chunk.repository';
import { MissionResolver } from '../mission/mission.resolver';
import { InvoiceCreateEntity, InvoiceEntity, InvoiceEntityEntry, InvoicePatchEntity, InvoiceUpdateEntity } from './invoice.entity';
import { InvoiceRepository } from './invoice.repository';

@Resolver(() => InvoiceEntity)
export class InvoiceResolver {
	constructor(
		private readonly invoiceRepository: InvoiceRepository,
		private readonly chunkRepository: ChunkRepository,
		private readonly missionResolver: MissionResolver,
		private pubSub: PubSub<HasInvoicePubSub>
	) { }

	@Mutation(() => InvoiceEntity)
	// @Transaction
	async createInvoice(
		@Args('createInvoiceInput') createInvoiceInput: InvoiceCreateEntity
	) {
		this.chunkRepository.markInvoiced(createInvoiceInput.lines.flatMap((l) => l.chunkIds), true);
		const created = await this.invoiceRepository.create(createInvoiceInput);
		this.publishIfPending(created);
		this.missionResolver.publishIfActive(created.missionIds[0]);
		return created;
	}

	@Query(() => [InvoiceEntity], { name: 'invoice' })
	findAll() {
		return this.invoiceRepository.findAll();
	}

	@Query(() => InvoiceEntity, { name: 'invoiceId' })
	findOne(@Args('id', { type: () => String }) id: string) {
		return this.invoiceRepository.findOne(id);
	}

	@Subscription(() => [InvoiceEntityEntry], {
		name: 'invoicePending'
	})
	async *listenPending(): AsyncGenerator<HasInvoicePubSub> {
		const initialInvoices = await this.invoiceRepository.findAllPending();
		yield {
			invoicePending: initialInvoices.map(mapEntityEntry)
		};

		const it = this.pubSub.asyncIterableIterator('invoicePending') as
			AsyncIterableIterator<HasInvoicePubSub['invoicePending']>;
		try {
			for await (const payload of it) {
				yield { invoicePending: payload };
			}
		} finally {
			if (it.return) {
				await it.return();
			}
		}
	}

	async publishIfPending(invoice: string | InvoiceEntity, remove: boolean = false) {
		let payload = null;
		if (!remove) {
			const isPending = typeof invoice === 'string'
				? await this.invoiceRepository.isPending(invoice)
				: !invoice.paid;
			if (isPending) {
				payload = typeof invoice === 'string' ? await this.findOne(invoice) : invoice;
			}
		}
		this.pubSub.publish('invoicePending', [{
			key: typeof invoice === 'string' ? invoice : invoice._id,
			value: payload
		}]);
	}

	@Mutation(() => InvoiceEntity)
	async updateInvoice(
		@Args('updateInvoiceInput') updateInvoiceInput: InvoiceUpdateEntity
	) {
		const wasPending = await this.invoiceRepository.isPending(updateInvoiceInput._id);
		this.chunkRepository.markPaid(updateInvoiceInput.lines.flatMap((l) => l.chunkIds), updateInvoiceInput.paid);
		const updated = await this.invoiceRepository.update(
			updateInvoiceInput._id,
			updateInvoiceInput
		);
		this.publishIfPending(
			updated,
			wasPending && updated.paid
		);
		this.missionResolver.publishIfActive(updated.missionIds[0]);
		return updated;
	}

	@Mutation(() => InvoiceEntity)
	async removeInvoice(@Args('id', { type: () => String }) id: string) {
		const invoice = await this.findOne(id);
		if (!invoice) {
			throw new MongooseError('Invoice does not exist');
		}
		this.chunkRepository.markInvoiced(invoice.lines.flatMap((l) => l.chunkIds), false);
		const removed = await this.invoiceRepository.remove(id);
		if (!removed.paid) {
			this.publishIfPending(id, true);
		}
		this.missionResolver.publishIfActive(removed.missionIds[0]);
		return removed;
	}

	@Mutation(() => InvoiceEntity)
	async patchInvoice(
		@Args('patchInvoiceInput') patchInvoiceInput: InvoicePatchEntity
	) {
		const { _id, ...fields } = patchInvoiceInput;
		const wasPending = await this.invoiceRepository.isPending(patchInvoiceInput._id);
		const patched = await this.invoiceRepository.patch(
			_id,
			fields
		);
		this.publishIfPending(
			patched,
			wasPending && patched.paid
		);
		this.missionResolver.publishIfActive(patched.missionIds[0]);
		return patched;
	}
}
