import { OfficeHours, Booking } from "./types";

export function createOfficeHourSpan(startTime: Date, endTime: Date, location: string, bookings: Booking[]): OfficeHours {
    return { startTime, endTime, location, bookings };
}

export function addBooking(booking: Booking, officeHours: OfficeHours): OfficeHours {
    return { ...officeHours, bookings: [...officeHours.bookings, booking] };
}

export function bookingIsWithinOfficeHours(booking: Booking, officeHours: OfficeHours): boolean {
    return officeHours.startTime <= booking.startTime && booking.endTime <= officeHours.endTime;
}

export function bookingOverlapsOtherBookings(booking: Booking, bookings: Booking[]): boolean {
    bookings.forEach(presentBooking => {
        if ((booking.startTime <= presentBooking.startTime && presentBooking.startTime <= booking.endTime) ||
            presentBooking.startTime <= booking.startTime && booking.startTime <= presentBooking.endTime) {
            return true;
        }
    });

    return false;
}