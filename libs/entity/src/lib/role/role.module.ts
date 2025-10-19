import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleEntity, RoleSchema } from './role.entity';
import { RoleResolver } from './role.resolver';
import { RoleRepository } from './role.repository';

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
	providers: [RoleResolver, RoleRepository],
	exports: [RoleResolver, RoleRepository],
})
export class RoleModule { }
