/* Application Types */
export type ApplicationState = {
    officeHours: OfficeHoursState | undefined;
};

export type AppThunkAction<T> = (dispatch: (action: T) => void, getState: () => ApplicationState) => void;

/* Office Hour Types */
export type OfficeHoursState = {
    officeHoursId: string,
    isLoading: boolean
};

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

export type OfficeHoursActionCreators = {
    requestOfficeHours: (officeHoursId: string) => AppThunkAction<OfficeHoursAction>,
    createBooking: (officeHoursId: string, booking: BookingRequestBody) => AppThunkAction<OfficeHoursAction>,
    requestBooking: (officeHoursId: string, bookingId: string) => AppThunkAction<OfficeHoursAction>
};

export type RequestOfficeHoursAction = {
    type: 'REQUEST_OFFICE_HOURS',
    officeHoursId: string
};

export type ReceiveOfficeHoursAction = {
    type: 'RECEIVE_OFFICE_HOURS',
    officeHours: OfficeHours | undefined
};

export type CreateBookingAction = {
    type: 'CREATE_BOOKING',
    officeHoursId: string,
    booking: BookingRequestBody
};

export type BookingCreatedAction = {
    type: 'BOOKING_CREATED',
    officeHoursId: string,
    bookingId: string
};

export type RequestBookingAction = {
    type: 'REQUEST_BOOKING',
    officeHoursId: string,
    bookingId: string
};

export type ReceiveBookingAction = {
    type: 'RECEIVE_BOOKING',
    officeHoursId: string,
    booking: Booking
};

export type OfficeHoursAction = RequestOfficeHoursAction | ReceiveOfficeHoursAction | CreateBookingAction | BookingCreatedAction | RequestBookingAction | ReceiveBookingAction;

/* Booking Types */
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

/* COMPONENT TYPES */
//export type OfficeHoursComponentProps = OfficeHoursState & OfficeHoursActionCreators & RouteComponentProps<{}>;
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
    createBooking: (booking: BookingRequestBody) => void
};

export type CreateBookingFormComponentStyles = {};