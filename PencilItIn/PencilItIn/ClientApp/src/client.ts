import axios, { AxiosResponse } from 'axios';
import { BookingRequestBody, OfficeHours, OfficeHoursResponseBody } from "./types";
import { responseBodyToOfficeHours } from './utilities';

export const requestOfficeHours: (officeHoursId: string) => Promise<OfficeHours> = async officeHoursId => {
    const response: AxiosResponse<OfficeHoursResponseBody> = await axios({
        url: `api/v1/officehours/${officeHoursId}`,
        method: 'GET'
    });

    return responseBodyToOfficeHours(response.data);
};

export const createBooking: (officeHoursId: string, booking: BookingRequestBody) => void = async (officeHoursId, booking) => {
    await axios({
        url: `api/v1/officehours/${officeHoursId}/bookings`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        data: booking
    });
}