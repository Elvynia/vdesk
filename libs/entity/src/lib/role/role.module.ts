import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleByOneLoader } from './role-by-one.loader';
import { RoleEntity, RoleSchema } from './role.entity';
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
		RoleByOneLoader,
		RoleResolver,
		RoleRepository
	],
	exports: [
		RoleByOneLoader,
		RoleResolver,
		RoleRepository
	],
})
export class RoleModule { }
