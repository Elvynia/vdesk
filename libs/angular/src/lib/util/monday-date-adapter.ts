import { Injectable } from "@angular/core";
import { NativeDateAdapter } from "@angular/material/core";

@Injectable()
export class MondayDateAdapter extends NativeDateAdapter {
	override getFirstDayOfWeek() {
		return 1;
	}
}
