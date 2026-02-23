import { Component, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { ChunkEditorComponent, ChunkFormCardComponent, HasInvoicePendingState, HasMissionActiveState, invoicePendingActions, missionActiveActions, ObserverCompomix, selectInvoicePending, selectMissionActive } from '@lv/angular';
import { Invoice, Mission } from '@lv/common';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';

@Component({
	selector: 'lv-home-view',
	imports: [
		ChunkFormCardComponent,
		ChunkEditorComponent,
		MatCardModule,
	],
	templateUrl: './view.component.html',
	host: {
		class: /*tw*/ 'flex flex-col lg:flex-row h-full gap-8'
	}
})
export class ViewComponent extends ObserverCompomix() implements OnInit {
	missions: Mission[];
	invoices: Invoice[];

	constructor(
		private store: Store<HasMissionActiveState & HasInvoicePendingState>,
	) {
		super();
		this.missions = [];
		this.invoices = [];
	}

	ngOnInit() {
		// FIXME: memoized selector.
		this.store.select(selectMissionActive).pipe(
			takeUntil(this.destroy$)
		).subscribe((missions) => {
			this.missions = Object.values(missions);
		});
		this.store.select(selectInvoicePending).pipe(
			takeUntil(this.destroy$)
		).subscribe((invoices) => {
			this.invoices = Object.values(invoices);
		});
		this.store.dispatch(missionActiveActions.listenActive());
		this.store.dispatch(invoicePendingActions.listenPending());
	}
}
