import axios, { AxiosResponse } from 'axios';
import { Booking, BookingResponseBody, OfficeHours, OfficeHoursResponseBody } from './store/types';

export const minutesElapsed: (t1: Date, t2: Date) => number = (t1, t2) => Math.abs(t1.valueOf() - t2.valueOf()) / 60000;

export const responseBodyToOfficeHours: (o: OfficeHoursResponseBody) => OfficeHours = o => ({
    id: o.id,
    title: o.title,
    hostName: o.hostName,
    location: o.location,
    cancelled: o.cancelled,
    startTime: new Date(o.startTime),
    endTime: new Date(o.endTime),
    bookings: o.bookings.map(responseBodyToBooking)
});

export const responseBodyToBooking: (b: BookingResponseBody) => Booking = b => ({
    id: b.id,
    name: b.name,
    cancelled: b.cancelled,
    startTime: new Date(b.startTime),
    endTime: new Date(b.endTime)
});

export const seedData = async () => {
    const officeHoursResponse: AxiosResponse<string> = await axios({
        url: 'api/v1/officehours',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: {
            startTime: new Date('2020-01-01T10:30:00.000Z'),
            endTime: new Date('2020-01-01T14:30:00.000Z'),
            location: 'Hogwart\'s School of Witchcraft and Wizardry',
            hostName: 'Severus Snape',
            title: 'DAGA Office Hours'
        }
    });

    const officeHoursId = officeHoursResponse.data;
    await axios({
        url: `api/v1/officehours/${officeHoursId}/bookings`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: {
            name: 'Hermoine Granger',
            startTime: new Date('2020-01-01T11:00:00.000Z'),
            endTime: new Date('2020-01-01T11:30:00.000Z')
        }
    });

    await axios({
        url: `api/v1/officehours/${officeHoursId}/bookings`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: {
            name: 'Ron Weasley',
            startTime: new Date('2020-01-01T11:30:00.000Z'),
            endTime: new Date('2020-01-01T12:30:00.000Z')
        }
    });

    await axios({
        url: `api/v1/officehours/${officeHoursId}/bookings`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: {
            name: 'Harry Potter',
            startTime: new Date('2020-01-01T13:00:00.000Z'),
            endTime: new Date('2020-01-01T13:30:00.000Z')
        }
    });
};
