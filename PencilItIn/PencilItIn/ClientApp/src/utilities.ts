import { Booking, BookingResponseBody, OfficeHours, OfficeHoursResponseBody } from './types';

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
