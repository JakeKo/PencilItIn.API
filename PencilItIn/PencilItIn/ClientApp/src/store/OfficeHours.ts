import axios from 'axios';
import { Reducer } from 'redux';
import { responseBodyToBooking, responseBodyToOfficeHours } from '../utilities';
import { BookingResponseBody, OfficeHoursAction, OfficeHoursActionCreators, OfficeHoursResponseBody, OfficeHoursState, ReceiveBookingAction, ReceiveOfficeHoursAction, BookingCreatedAction } from './types';

export const actionCreators: OfficeHoursActionCreators = {
    requestOfficeHours: officeHoursId => async dispatch => {
        // Signal request for office hours, request office hours, signal reception of office hours
        dispatch({ type: 'REQUEST_OFFICE_HOURS', officeHoursId });
        const { data }: { data: OfficeHoursResponseBody } = await axios({
            url: `api/v1/officehours/${officeHoursId}`,
            method: 'GET'
        });

        dispatch({ type: 'RECEIVE_OFFICE_HOURS', officeHours: responseBodyToOfficeHours(data) });
    },
    createBooking: (officeHoursId, booking) => async dispatch => {
        // Signal request to create booking, request booking creation, signal completion of booking creation
        dispatch({ type: 'CREATE_BOOKING', officeHoursId, booking });
        const { data }: { data: string } = await axios({
            url: `api/v1/officehours/${officeHoursId}/bookings`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            data: booking
        });

        dispatch({ type: 'BOOKING_CREATED', officeHoursId, bookingId: data });
    },
    requestBooking: (officeHoursId, bookingId) => async dispatch => {
        // Signal request for booking, request booking, signal reception of booking
        dispatch({ type: 'REQUEST_BOOKING', officeHoursId, bookingId });
        const { data }: { data: BookingResponseBody } = await axios({
            url: `api/v1/officehours/${officeHoursId}/bookings/${bookingId}`,
            method: 'GET'
        });

        dispatch({ type: 'RECEIVE_BOOKING', officeHoursId, booking: responseBodyToBooking(data) });
    }
};

export const reducer: Reducer<OfficeHoursState, OfficeHoursAction> = (state, action) => {
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
        case 'BOOKING_CREATED':
            const bookingCreatedAction = action as BookingCreatedAction
            actionCreators.requestBooking(bookingCreatedAction.officeHoursId, bookingCreatedAction.bookingId);
            return state;
        case 'RECEIVE_BOOKING':
            console.log(action);
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
