export type OfficeHours = {
    startTime: Date,
    endTime: Date,
    location: string,
    bookings: Booking[],
};

export type Booking = {
    startTime: Date,
    endTime: Date,
    name: string,
};

export type Host = {
    name: string,
    officeHours: OfficeHours[],
    position?: string,
    officeLocation?: string,
};