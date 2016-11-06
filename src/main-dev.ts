import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { RammModule } from './ramm/ramm.module';

//enableProdMode();
platformBrowserDynamic().bootstrapModule(RammModule).then((moduleRef) => {
	moduleRef.instance.initialize('http://localhost:8080/spring');
});