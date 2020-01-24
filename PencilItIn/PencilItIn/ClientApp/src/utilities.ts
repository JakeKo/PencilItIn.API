import axios, { AxiosResponse } from 'axios';
import { Booking, BookingResponseBody, OfficeHours, OfficeHoursResponseBody } from './store/types';

export const minutesElapsed: (t1: Date, t2: Date) => number = (t1: Date, t2: Date): number => Math.abs(t1.valueOf() - t2.valueOf()) / 60000;

export const responseBodyToOfficeHours: (o: OfficeHoursResponseBody) => OfficeHours = (o: OfficeHoursResponseBody): OfficeHours => ({
    id: o.id,
    title: o.title,
    hostName: o.hostName,
    location: o.location,
    cancelled: o.cancelled,
    startTime: new Date(o.startTime),
    endTime: new Date(o.endTime),
    bookings: o.bookings.map(responseBodyToBooking)
});

export const responseBodyToBooking: (b: BookingResponseBody) => Booking = (b: BookingResponseBody): Booking => ({
    id: b.id,
    name: b.name,
    cancelled: b.cancelled,
    startTime: new Date(b.startTime),
    endTime: new Date(b.endTime)
});

export const seedData: () => Promise<void> = async (): Promise<void> => {
    const officeHoursResponse: AxiosResponse<string> = await axios({
        url: 'api/v1/officehours',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: {
            startTime: new Date(2020, 1, 1, 10, 15, 0),
            endTime: new Date(2020, 1, 1, 14, 30, 0),
            location: 'Hogwart\'s School of Witchcraft and Wizardry',
            hostName: 'Severus Snape',
            title: 'DAGA Office Hours'
        }
    });

    const officeHoursId: string = officeHoursResponse.data;
    await axios({
        url: `api/v1/officehours/${officeHoursId}/bookings`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: {
            name: 'Hermoine Granger',
            startTime: new Date(2020, 1, 1, 11, 0, 0),
            endTime: new Date(2020, 1, 1, 11, 30, 0)
        }
    });

    await axios({
        url: `api/v1/officehours/${officeHoursId}/bookings`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: {
            name: 'Hermoine Granger',
            startTime: new Date(2020, 1, 1, 11, 30, 0),
            endTime: new Date(2020, 1, 1, 12, 30, 0)
        }
    });

    await axios({
        url: `api/v1/officehours/${officeHoursId}/bookings`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: {
            name: 'Hermoine Granger',
            startTime: new Date(2020, 1, 1, 13, 0, 0),
            endTime: new Date(2020, 1, 1, 13, 30, 0)
        }
    });
};
