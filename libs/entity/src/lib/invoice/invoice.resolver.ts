import {
	Resolver,
	Query,
	Mutation,
	Args,
	Parent,
	ResolveField,
} from '@nestjs/graphql';
import { InvoiceRepository } from './invoice.repository';
import { InvoiceEntity, InvoiceCreate, InvoiceUpdate } from './invoice.entity';

@Resolver(() => InvoiceEntity)
export class InvoiceResolver {
	constructor(private readonly invoiceRepository: InvoiceRepository) {}

	@Mutation(() => InvoiceEntity)
	createInvoice(
		@Args('createInvoiceInput') createInvoiceInput: InvoiceCreate
	) {
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
		return this.invoiceRepository.update(
			updateInvoiceInput._id,
			updateInvoiceInput
		);
	}

	@Mutation(() => InvoiceEntity)
	removeInvoice(@Args('id', { type: () => String }) id: string) {
		return this.invoiceRepository.remove(id);
	}
}
