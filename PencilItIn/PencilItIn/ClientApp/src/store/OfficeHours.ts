import { Reducer, Action } from 'redux';
import { AppThunkAction, ApplicationState } from './';

export type OfficeHoursState = {
    officeHours: OfficeHours | undefined,
    isLoading: boolean
};

export type OfficeHours = {
    id: string,
    startTime: Date,
    endTime: Date,
    location: string,
    hostName: string,
    title: string,
    cancelled: boolean,
    bookings: any[] // TODO: Implement Booking type
};

type RequestOfficeHoursAction = {
    type: 'REQUEST_OFFICE_HOURS',
    officeHoursId: string
};

type ReceiveOfficeHoursAction = {
    type: 'RECEIVE_OFFICE_HOURS',
    officeHours: OfficeHours | undefined
};

type OfficeHoursAction = RequestOfficeHoursAction | ReceiveOfficeHoursAction;

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

export const reducer: Reducer<OfficeHoursState> = (state: OfficeHoursState | undefined, action: Action): OfficeHoursState => {
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
