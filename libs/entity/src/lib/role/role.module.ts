import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleEntity, RoleSchema } from './role.entity';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';

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
	providers: [RoleResolver, RoleService],
	exports: [RoleResolver, RoleService],
})
export class RoleModule { }
