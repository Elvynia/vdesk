import { Module } from '@nestjs/common';
import { MissionToCompanyResolver } from './mission-to-company.resolver';

@Module({
	providers: [MissionToCompanyResolver],
	exports: [MissionToCompanyResolver],
})
export class MissionToCompanyModule { }
