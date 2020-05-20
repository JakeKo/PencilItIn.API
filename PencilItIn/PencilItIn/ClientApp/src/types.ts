export type Client = {
    requestAllOfficeHours: () => Promise<OfficeHours[]>;
    requestOfficeHours: (officeHoursId: string) => Promise<OfficeHours>;
    createOfficeHours: (officeHours: OfficeHoursRequestBody) => Promise<string>;
    createBooking: (officeHoursId: string, booking: BookingRequestBody) => Promise<string>;
};

export type OfficeHours = {
    id: string;
    startTime: Date;
    endTime: Date;
    location: string;
    hostName: string;
    title: string;
    cancelled: boolean;
    bookings: Booking[];
};

export type OfficeHoursResponseBody = {
    id: string;
    startTime: string;
    endTime: string;
    location: string;
    hostName: string;
    title: string;
    cancelled: boolean;
    bookings: BookingResponseBody[];
};

export type OfficeHoursRequestBody = {
    title: string;
    hostName: string;
    location: string;
    startTime: Date;
    endTime: Date;
};

export type Booking = {
    id: string;
    startTime: Date;
    endTime: Date;
    name: string;
    cancelled: boolean;
};

export type BookingResponseBody = {
    id: string;
    startTime: string;
    endTime: string;
    name: string;
    cancelled: boolean;
};

export type BookingRequestBody = {
    name: string;
    startTime: Date;
    endTime: Date;
};

export type OfficeHoursComponentProps = {
    officeHoursId: string;
    client: Client;
};

export type BookingComponentProps = {
    booking: Booking;
    officeHours: OfficeHours;
};

export type CreateBookingComponentProps = {
    officeHours: OfficeHours;
    client: Client;
};

export type LandingComponentProps = {
    client: Client;
};

export type DividerComponentProps = {
    officeHoursStartTime: Date;
    time: Date;
};

export type CreateOfficeHoursComponentProps = {
    client: Client;
};
