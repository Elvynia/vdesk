import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleResolver } from './role.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleEntity, RoleSchema } from './role.entity';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: RoleEntity.name, schema: RoleSchema, collection: 'role' },
		]),
	],
	providers: [RoleResolver, RoleService],
})
export class RoleModule {}
