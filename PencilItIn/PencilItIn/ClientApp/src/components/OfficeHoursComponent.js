"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var OfficeHours_1 = require("../store/OfficeHours");
var utilities_1 = require("../utilities");
var BookingComponent_1 = require("./BookingComponent");
var CreateBookingFormComponent_1 = require("./CreateBookingFormComponent");
var OfficeHoursComponent = /** @class */ (function (_super) {
    __extends(OfficeHoursComponent, _super);
    function OfficeHoursComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.styles = {
            page: function () { return ({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }); },
            container: function () { return ({
                width: '500px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }); },
            heading: function () { return ({
                fontFamily: 'sans-serif',
                fontSize: '32px'
            }); },
            display: function () { return ({
                height: 2 * utilities_1.minutesElapsed(_this.props.officeHours.startTime, _this.props.officeHours.endTime) + "px",
                position: 'relative',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'white',
                border: '1px solid grey',
                boxSizing: 'border-box',
                borderRadius: '3px'
            }); },
            divider: function (position) { return ({
                borderTop: '1px dashed grey',
                width: '100%',
                position: 'absolute',
                top: 2 * position + "px"
            }); }
        };
        _this.dividerPositions = function () {
            var officeHours = _this.props.officeHours;
            var startTime = new Date(officeHours.startTime.getFullYear(), officeHours.startTime.getMonth(), officeHours.startTime.getDate(), officeHours.startTime.getHours() + 1);
            // Assemble a list of times at which to draw a light divider
            // Dividers are drawn at the hour
            var times = [];
            for (var t = startTime; t < officeHours.endTime; t = new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours() + 1)) {
                times.push(t);
            }
            // Calculate the minutes elapsed at each divider time
            return times.map(function (t) { return utilities_1.minutesElapsed(officeHours.startTime, t); });
        };
        _this.render = function () {
            var _a = _this, styles = _a.styles, _b = _a.props, officeHours = _b.officeHours, createBooking = _b.createBooking;
            return (React.createElement("div", { style: styles.page() }, officeHours && React.createElement("div", { style: styles.container() },
                React.createElement("div", { style: styles.heading() }, officeHours.title),
                React.createElement("div", null,
                    officeHours.hostName,
                    " (",
                    officeHours.location,
                    ")"),
                React.createElement(CreateBookingFormComponent_1.default, { officeHours: officeHours, createBooking: createBooking }),
                React.createElement("div", { style: styles.display() },
                    _this.dividerPositions().map(function (position) { return React.createElement("div", { key: Math.random(), style: styles.divider(position) }); }),
                    officeHours.bookings.map(function (booking) { return React.createElement(BookingComponent_1.default, { key: booking.id, officeHours: officeHours, booking: booking }); })))));
        };
        return _this;
    }
    return OfficeHoursComponent;
}(React.PureComponent));
;
exports.default = react_redux_1.connect(function (state) { return state.officeHours; }, OfficeHours_1.actionCreators)(OfficeHoursComponent);
//# sourceMappingURL=OfficeHoursComponent.js.map