import { MappingPublic } from '@lv/entity';
import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, MongooseHealthIndicator } from '@nestjs/terminus';

@Controller('health')
@MappingPublic()
export class HealthController {
	constructor(
		private health: HealthCheckService,
		private mongooseIndicator: MongooseHealthIndicator,
	) { }

	@Get()
	@HealthCheck()
	check() {
		return this.health.check([
			async () => this.mongooseIndicator.pingCheck('mongodb', { timeout: 3000 }),
		]);
	}
}
