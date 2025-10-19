import { Module } from '@nestjs/common';
import { CompanyToMissionResolver } from './company-to-mission.resolver';

@Module({
	providers: [CompanyToMissionResolver],
	exports: [CompanyToMissionResolver],
})
export class CompanyToMissionModule { }
