import { Reducer } from 'redux';
import { ApplicationState, AppThunkAction, OfficeHours, OfficeHoursAction, OfficeHoursState, ReceiveOfficeHoursAction } from './types';

export const actionCreators = {
    requestOfficeHours: (officeHoursId: string): AppThunkAction<OfficeHoursAction> => (dispatch, getState) => {
        const state: ApplicationState = getState();
        if (!state.officeHours || !state.officeHours.officeHours || officeHoursId === state.officeHours.officeHours.id) {
            return;
        }

        dispatch({ type: 'REQUEST_OFFICE_HOURS', officeHoursId });
        fetch(`api/v1/officehours/${officeHoursId}`)
            .then((response: Response) => response.json() as Promise<OfficeHours | undefined>)
            .then((officeHours: OfficeHours | undefined) => dispatch({ type: 'RECEIVE_OFFICE_HOURS', officeHours }))
            .catch(console.error);
    }
};

export const reducer: Reducer<OfficeHoursState, OfficeHoursAction> = (state: OfficeHoursState | undefined, action: OfficeHoursAction): OfficeHoursState => {
    if (state === undefined) {
        return { officeHours: undefined, isLoading: false };
    }

    switch (action.type) {
        case 'REQUEST_OFFICE_HOURS':
            return {
                officeHours: state.officeHours,
                isLoading: true
            };
        case 'RECEIVE_OFFICE_HOURS':
            return {
                officeHours: (action as ReceiveOfficeHoursAction).officeHours,
                isLoading: false
            };
        default:
            return state;
    }
};
