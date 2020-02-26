"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var utilities_1 = require("../utilities");
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
            dispatch({ type: 'RECEIVE_OFFICE_HOURS', officeHours: utilities_1.responseBodyToOfficeHours(response.data) });
        }).catch(console.error);
    }; },
    createBooking: function (officeHoursId, booking) { return function (dispatch) {
        dispatch({ type: 'CREATE_BOOKING', booking: booking });
        axios_1.default({
            url: "api/v1/officehours/" + officeHoursId + "/bookings",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            data: booking
        }).then(function (response) {
            dispatch({ type: 'BOOKING_CREATED', bookingId: response.data });
            dispatch({ type: 'REQUEST_BOOKING', bookingId: response.data });
            axios_1.default({
                url: "api/v1/officehours/" + officeHoursId + "/bookings/" + response.data,
                method: 'GET'
            }).then(function (response) {
                dispatch({ type: 'RECEIVE_BOOKING', booking: utilities_1.responseBodyToBooking(response.data) });
            }).catch(console.error);
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
        case 'RECEIVE_BOOKING':
            return {
                officeHours: __assign(__assign({}, state.officeHours), { bookings: __spreadArrays(state.officeHours.bookings, [action.booking]) }),
                isLoading: false
            };
        default:
            return state;
    }
};
//# sourceMappingURL=OfficeHours.js.map