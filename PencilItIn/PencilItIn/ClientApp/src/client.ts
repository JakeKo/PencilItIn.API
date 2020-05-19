import axios, { AxiosResponse } from 'axios';
import { Client, OfficeHoursResponseBody } from "./types";
import { responseBodyToOfficeHours } from './utilities';

const client: Client = {
    requestAllOfficeHours: async () => {
        const response: AxiosResponse<OfficeHoursResponseBody[]> = await axios({
            url: 'api/v1/officehours',
            method: 'GET'
        });

        return response.data.map(datum => responseBodyToOfficeHours(datum));
    },
    requestOfficeHours: async officeHoursId => {
        const response: AxiosResponse<OfficeHoursResponseBody> = await axios({
            url: `api/v1/officehours/${officeHoursId}`,
            method: 'GET'
        });

        return responseBodyToOfficeHours(response.data);
    },
    createOfficeHours: async officeHours => {
        const response: AxiosResponse<string> = await axios({
            url: 'api/v1/officehours',
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            data: officeHours
        });

        return response.data;
    },
    createBooking: async (officeHoursId, booking) => {
        const response: AxiosResponse<string> = await axios({
            url: `api/v1/officehours/${officeHoursId}/bookings`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            data: booking
        });

        return response.data;
    }
};

export default client;