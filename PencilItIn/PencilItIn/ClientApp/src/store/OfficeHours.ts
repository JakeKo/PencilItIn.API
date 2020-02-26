import axios, { AxiosResponse } from 'axios';
import { Reducer } from 'redux';
import { responseBodyToBooking, responseBodyToOfficeHours } from '../utilities';
import { ApplicationState, AppThunkAction, BookingRequestBody, BookingResponseBody, OfficeHoursAction, OfficeHoursActionCreators, OfficeHoursResponseBody, OfficeHoursState, ReceiveBookingAction, ReceiveOfficeHoursAction } from './types';

export const actionCreators: OfficeHoursActionCreators = {
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
            dispatch({ type: 'RECEIVE_OFFICE_HOURS', officeHours: responseBodyToOfficeHours(response.data) });
        }).catch(console.error);
    },
    createBooking: (officeHoursId: string, booking: BookingRequestBody): AppThunkAction<OfficeHoursAction> => dispatch => {
        dispatch({ type: 'CREATE_BOOKING', booking });
        axios({
            url: `api/v1/officehours/${officeHoursId}/bookings`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            data: booking
        }).then((response: AxiosResponse<string>): void => {
            dispatch({ type: 'BOOKING_CREATED', bookingId: response.data });
            dispatch({ type: 'REQUEST_BOOKING', bookingId: response.data });

            axios({
                url: `api/v1/officehours/${officeHoursId}/bookings/${response.data}`,
                method: 'GET'
            }).then((response: AxiosResponse<BookingResponseBody>): void => {
                dispatch({ type: 'RECEIVE_BOOKING', booking: responseBodyToBooking(response.data) });
            }).catch(console.error);
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
        case 'RECEIVE_BOOKING':
            return {
                officeHours: {
                    ...state.officeHours!,
                    bookings: [...state.officeHours!.bookings, (action as ReceiveBookingAction).booking]
                },
                isLoading: false
            };
        default:
            return state;
    }
};
