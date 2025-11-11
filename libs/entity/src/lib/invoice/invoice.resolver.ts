import {
	Args,
	Mutation,
	Query,
	Resolver
} from '@nestjs/graphql';
import { MongooseError } from 'mongoose';
import { ChunkRepository } from '../chunk/chunk.repository';
import { InvoiceCreate, InvoiceEntity, InvoiceUpdate } from './invoice.entity';
import { InvoiceRepository } from './invoice.repository';

@Resolver(() => InvoiceEntity)
export class InvoiceResolver {
	constructor(
		private readonly invoiceRepository: InvoiceRepository,
		private readonly chunkRepository: ChunkRepository
	) { }

	@Mutation(() => InvoiceEntity)
	// @Transaction
	createInvoice(
		@Args('createInvoiceInput') createInvoiceInput: InvoiceCreate
	) {
		this.chunkRepository.markInvoiced(createInvoiceInput.lines.flatMap((l) => l.chunkIds), true);
		return this.invoiceRepository.create(createInvoiceInput);
	}

	@Query(() => [InvoiceEntity], { name: 'invoice' })
	findAll() {
		return this.invoiceRepository.findAll();
	}

	@Query(() => InvoiceEntity, { name: 'invoiceId' })
	findOne(@Args('id', { type: () => String }) id: string) {
		return this.invoiceRepository.findOne(id);
	}

	@Mutation(() => InvoiceEntity)
	updateInvoice(
		@Args('updateInvoiceInput') updateInvoiceInput: InvoiceUpdate
	) {
		// TODO: Update chunk invoiced field.
		return this.invoiceRepository.update(
			updateInvoiceInput._id,
			updateInvoiceInput
		);
	}

	@Mutation(() => InvoiceEntity)
	async removeInvoice(@Args('id', { type: () => String }) id: string) {
		const invoice = await this.findOne(id);
		if (!invoice) {
			throw new MongooseError('Invoice does not exist');
		}
		this.chunkRepository.markInvoiced(invoice.lines.flatMap((l) => l.chunkIds), false);
		return this.invoiceRepository.remove(id);
	}
}
