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
var BookingComponent_1 = require("./BookingComponent");
var minutesElapsed = function (t1, t2) { return Math.abs(t1.valueOf() - t2.valueOf()) / 60000; };
var OfficeHoursComponent = /** @class */ (function (_super) {
    __extends(OfficeHoursComponent, _super);
    function OfficeHoursComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getStyle = function () { return ({
            backgroundColor: 'blue',
            position: 'relative',
            height: 2 * minutesElapsed(_this.props.officeHours.startTime, _this.props.officeHours.endTime) + "px"
        }); };
        _this.render = function () { return (React.createElement(React.Fragment, null, _this.props.officeHours && React.createElement(React.Fragment, null,
            React.createElement("h1", null, _this.props.officeHours.title),
            React.createElement("h4", null,
                _this.props.officeHours.hostName,
                " (",
                _this.props.officeHours.location,
                ")"),
            React.createElement("div", { style: _this.getStyle() }, _this.props.officeHours.bookings.map(function (booking) {
                return React.createElement(BookingComponent_1.default, { key: Math.random(), officeHoursStartTime: _this.props.officeHours.startTime, booking: booking });
            }))))); };
        return _this;
    }
    return OfficeHoursComponent;
}(React.PureComponent));
;
exports.default = react_redux_1.connect(function (state) { return state.officeHours; }, OfficeHours_1.actionCreators)(OfficeHoursComponent);
//# sourceMappingURL=OfficeHoursComponent.js.map