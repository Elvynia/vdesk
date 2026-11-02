import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChunkModule } from '../chunk/chunk.module';
import { MissionModule } from '../mission/mission.module';
import { PubSubModule } from '../util/pubsub.module';
import { InvoiceCountLoader } from './invoice-count.loader';
import { InvoiceEntity, InvoiceSchema } from './invoice.entity';
import { InvoiceLoader } from './invoice.loader';
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
		MissionModule,
		PubSubModule
	],
	providers: [
		InvoiceCountLoader,
		InvoiceLoader,
		InvoiceResolver,
		InvoiceRepository
	],
	exports: [
		InvoiceCountLoader,
		InvoiceLoader,
		InvoiceResolver,
		InvoiceRepository
	],
})
export class InvoiceModule { }
