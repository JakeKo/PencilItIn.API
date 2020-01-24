"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
exports.actionCreators = {
    requestOfficeHours: function (officeHoursId) { return function (dispatch, getState) {
        var state = getState();
        if (!state.officeHours || !state.officeHours.officeHours || officeHoursId === state.officeHours.officeHours.id) {
            return;
        }
        dispatch({ type: 'REQUEST_OFFICE_HOURS', officeHoursId: officeHoursId });
        axios_1.default({
            url: "api/v1/officehours/" + officeHoursId,
            method: 'GET'
        }).then(function (response) {
            dispatch({
                type: 'RECEIVE_OFFICE_HOURS',
                officeHours: {
                    id: response.data.id,
                    title: response.data.title,
                    hostName: response.data.hostName,
                    location: response.data.location,
                    cancelled: response.data.cancelled,
                    startTime: new Date(response.data.startTime),
                    endTime: new Date(response.data.endTime),
                    bookings: response.data.bookings.map(function (b) { return ({
                        id: b.id,
                        name: b.name,
                        cancelled: b.cancelled,
                        startTime: new Date(b.startTime),
                        endTime: new Date(b.endTime)
                    }); })
                }
            });
        }).catch(console.error);
    }; }
};
exports.reducer = function (state, action) {
    if (state === undefined) {
        return { officeHours: undefined, isLoading: false };
    }
    switch (action.type) {
        case 'REQUEST_OFFICE_HOURS':
            return {
                officeHours: state.officeHours,
                isLoading: true
            };
        case 'RECEIVE_OFFICE_HOURS':
            return {
                officeHours: action.officeHours,
                isLoading: false
            };
        default:
            return state;
    }
};
//# sourceMappingURL=OfficeHours.js.map