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
};

export type OfficeHoursComponentStyles = {
    page: () => React.CSSProperties;
    container: () => React.CSSProperties;
    heading: () => React.CSSProperties;
    subheading: () => React.CSSProperties;
    display: () => React.CSSProperties;
};

export type BookingComponentProps = {
    booking: Booking;
    officeHours: OfficeHours;
};

export type BookingComponentStyles = {
    block: (officeHours: OfficeHours, booking: Booking) => React.CSSProperties;
};

export type CreateBookingFormComponentProps = {
    officeHours: OfficeHours;
    createBooking: (officeHoursId: string, booking: BookingRequestBody) => void;
};

export type CreateBookingFormComponentStyles = {
    form: () => React.CSSProperties;
    fieldWrapper: () => React.CSSProperties;
    dividedFields: () => React.CSSProperties;
    dividedFieldWrapper: () => React.CSSProperties;
    fieldLabel: () => React.CSSProperties;
    field: () => React.CSSProperties;
    formButton: () => React.CSSProperties;
};

export type LandingComponentProps = {
    officeHours: OfficeHours[];
};

export type LandingComponentStyles = {};

export type DividerComponentProps = {
    officeHoursStartTime: Date;
    time: Date;
};

export type DividerComponentStyles = {
    line: (timeOffset: number) => React.CSSProperties;
    tag: (timeOffset: number) => React.CSSProperties;
};

export type CreateOfficeHoursFormComponentProps = {
    createOfficeHours: (officeHours: OfficeHoursRequestBody) => Promise<string>;
};

export type CreateOfficeHoursFormComponentStyle = {
    form: () => React.CSSProperties;
    fieldWrapper: () => React.CSSProperties;
    dividedFields: () => React.CSSProperties;
    dividedFieldWrapper: () => React.CSSProperties;
    fieldLabel: () => React.CSSProperties;
    field: () => React.CSSProperties;
    formButton: () => React.CSSProperties;
};
