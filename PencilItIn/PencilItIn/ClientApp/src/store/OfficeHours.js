"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionCreators = {
    requestOfficeHours: function (officeHoursId) { return function (dispatch, getState) {
        var state = getState();
        if (!state.officeHours || !state.officeHours.officeHours || officeHoursId === state.officeHours.officeHours.id) {
            return;
        }
        dispatch({ type: 'REQUEST_OFFICE_HOURS', officeHoursId: officeHoursId });
        fetch("api/v1/officehours/" + officeHoursId)
            .then(function (response) { return response.json(); })
            .then(function (officeHours) { return dispatch({ type: 'RECEIVE_OFFICE_HOURS', officeHours: officeHours }); })
            .catch(console.error);
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