import { Mission } from "@lv/common";
import { Action, createReducer, on } from "@ngrx/store";
import { authActions } from "../../auth/actions";
import { missionActions } from "../mission.actions";

const initState = {};

export const missionActiveReducer = (
	state: Record<string, Mission> | undefined,
	action: Action
) =>
	createReducer<Record<string, Mission>>(
		initState,
		on(
			missionActions.listenActiveMessage,
			(state, { values }) => ({
				...state,
				...values
			})
		),
		on(authActions.logout, () => ({ ...initState }))
	)(state, action);
