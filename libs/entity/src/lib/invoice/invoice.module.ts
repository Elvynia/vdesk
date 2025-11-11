import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChunkModule } from '../chunk/chunk.module';
import { InvoiceEntity, InvoiceSchema } from './invoice.entity';
import { InvoiceRepository } from './invoice.repository';
import { InvoiceResolver } from './invoice.resolver';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: InvoiceEntity.name,
				schema: InvoiceSchema,
				collection: 'invoice',
			},
		]),
		ChunkModule,
	],
	providers: [InvoiceResolver, InvoiceRepository],
	exports: [InvoiceResolver, InvoiceRepository],
})
export class InvoiceModule { }
