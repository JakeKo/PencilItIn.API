import axios, { AxiosResponse } from 'axios';
import { Reducer } from 'redux';
import { ApplicationState, AppThunkAction, Booking, BookingResponseBody, OfficeHoursAction, OfficeHoursResponseBody, OfficeHoursState, ReceiveOfficeHoursAction } from './types';

export const actionCreators = {
    requestOfficeHours: (officeHoursId: string): AppThunkAction<OfficeHoursAction> => (dispatch, getState) => {
        const state: ApplicationState = getState();
        if (!state.officeHours || !state.officeHours.officeHours || officeHoursId === state.officeHours.officeHours.id) {
            return;
        }

        dispatch({ type: 'REQUEST_OFFICE_HOURS', officeHoursId });
        axios({
            url: `api/v1/officehours/${officeHoursId}`,
            method: 'GET'
        }).then((response: AxiosResponse<OfficeHoursResponseBody>): void => {
            dispatch({
                type: 'RECEIVE_OFFICE_HOURS',
                officeHours: {
                    id: response.data.id,
                    title: response.data.title,
                    hostName: response.data.hostName,
                    location: response.data.location,
                    cancelled: response.data.cancelled,
                    startTime: new Date(response.data.startTime),
                    endTime: new Date(response.data.endTime),
                    bookings: response.data.bookings.map((b: BookingResponseBody): Booking => ({
                        id: b.id,
                        name: b.name,
                        cancelled: b.cancelled,
                        startTime: new Date(b.startTime),
                        endTime: new Date(b.endTime)
                    }))
                }
            })
        }).catch(console.error);
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
