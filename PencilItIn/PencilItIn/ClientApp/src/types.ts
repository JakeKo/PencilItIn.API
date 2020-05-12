export type OfficeHours = {
    id: string,
    startTime: Date,
    endTime: Date,
    location: string,
    hostName: string,
    title: string,
    cancelled: boolean,
    bookings: Booking[]
};

export type OfficeHoursResponseBody = {
    id: string,
    startTime: string,
    endTime: string,
    location: string,
    hostName: string,
    title: string,
    cancelled: boolean,
    bookings: BookingResponseBody[]
};

export type Booking = {
    id: string,
    startTime: Date,
    endTime: Date,
    name: string,
    cancelled: boolean
};

export type BookingResponseBody = {
    id: string,
    startTime: string,
    endTime: string,
    name: string,
    cancelled: boolean
};

export type BookingRequestBody = {
    name: string,
    startTime: Date,
    endTime: Date
};

export type OfficeHoursComponentProps = {
    officeHoursId: string
};

export type OfficeHoursComponentStyles = {
    page: () => React.CSSProperties,
    container: () => React.CSSProperties,
    heading: () => React.CSSProperties,
    display: () => React.CSSProperties,
    divider: (position: number) => React.CSSProperties
};

export type BookingComponentProps = {
    booking: Booking,
    officeHours: OfficeHours
};

export type BookingComponentStyles = {
    block: () => React.CSSProperties
};

export type CreateBookingFormComponentProps = {
    officeHours: OfficeHours,
    createBooking: (officeHoursId: string, booking: BookingRequestBody) => void
};

export type CreateBookingFormComponentStyles = {};