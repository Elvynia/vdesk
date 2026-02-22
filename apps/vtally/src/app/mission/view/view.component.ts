import { Component, OnInit } from '@angular/core';
import {
	isApiActionSuccess,
	missionActions,
	MissionFormCardComponent,
	MissionListComponent,
	ObserverCompomix
} from '@lv/angular';
import { Mission, selectMissions } from '@lv/common';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, first, takeUntil } from 'rxjs';

@Component({
	selector: 'lv-mission-view',
	imports: [MissionListComponent, MissionFormCardComponent],
	templateUrl: './view.component.html',
	host: {
		class: 'flex flex-col lg:flex-row space-between gap-8 h-full w-full'
	}
})
export class MissionViewComponent extends ObserverCompomix() implements OnInit {
	missions: Mission[];
	editMission?: Mission;

	constructor(private store: Store<any>, private actions: Actions) {
		super();
		this.missions = [];
	}

	ngOnInit() {
		this.store
			.select(selectMissions)
			.pipe(
				filter((s) => !!s),
				takeUntil(this.destroy$)
			)
			.subscribe((missions) => (this.missions = Object.values(missions)));
		this.store.dispatch(missionActions.list());
	}

	cancel() {
		this.editMission = undefined;
	}

	delete(value: Mission) {
		if (this.editMission?._id === value._id) {
			this.editMission = undefined;
		}
		this.store.dispatch(missionActions.delete({ value }));
	}

	edit(mission: Mission) {
		this.editMission = mission;
	}

	save(value: Mission) {
		let action;
		if (value._id) {
			action = missionActions.update({ value });
		} else {
			action = missionActions.create({ value });
		}
		this.store.dispatch(action);
		this.actions
			.pipe(
				ofType(
					missionActions.createSuccess,
					missionActions.createError,
					missionActions.updateSuccess,
					missionActions.updateError
				),
				first(),
			filter((action) => isApiActionSuccess(action))
		).subscribe(() => {
				this.cancel();
			});
	}
}
