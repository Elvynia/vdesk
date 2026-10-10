import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleEntity, RoleSchema } from './role.entity';
import { RoleLoader } from './role.loader';
import { RoleRepository } from './role.repository';
import { RoleResolver } from './role.resolver';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: RoleEntity.name,
				schema: RoleSchema,
				collection: 'role',
			},
		]),
	],
	providers: [
		RoleLoader,
		RoleResolver,
		RoleRepository
	],
	exports: [
		RoleLoader,
		RoleResolver,
		RoleRepository
	],
})
export class RoleModule { }
