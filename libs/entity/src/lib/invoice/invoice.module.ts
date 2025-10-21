import { Module } from '@nestjs/common';
import { InvoiceRepository } from './invoice.repository';
import { InvoiceResolver } from './invoice.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceEntity, InvoiceSchema } from './invoice.entity';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: InvoiceEntity.name,
				schema: InvoiceSchema,
				collection: 'invoice',
			},
		]),
	],
	providers: [InvoiceResolver, InvoiceRepository],
	exports: [InvoiceResolver, InvoiceRepository],
})
export class InvoiceModule {}
