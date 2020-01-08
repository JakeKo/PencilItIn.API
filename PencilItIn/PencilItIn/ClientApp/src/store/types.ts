/* Application Types */
export type ApplicationState = {
    officeHours: OfficeHoursState | undefined;
};

export type AppThunkAction<T> = (dispatch: (action: T) => void, getState: () => ApplicationState) => void;

/* Office Hour Types */
export type OfficeHoursState = {
    officeHours: OfficeHours | undefined,
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

export type RequestOfficeHoursAction = {
    type: 'REQUEST_OFFICE_HOURS',
    officeHoursId: string
};

export type ReceiveOfficeHoursAction = {
    type: 'RECEIVE_OFFICE_HOURS',
    officeHours: OfficeHours | undefined
};

export type OfficeHoursAction = RequestOfficeHoursAction | ReceiveOfficeHoursAction;

/* Booking Types */
export type Booking = {
    id: string,
    startTime: Date,
    endTime: Date,
    name: string,
    cancelled: boolean
};