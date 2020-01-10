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
            height: 2 * minutesElapsed(_this.props.officeHours.startTime, _this.props.officeHours.endTime) + "px",
            position: 'relative',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
            border: '1px solid grey',
            boxSizing: 'border-box',
            borderRadius: '3px'
        }); };
        _this.getDashLinePositions = function () {
            var startTime = new Date(_this.props.officeHours.startTime.getFullYear(), _this.props.officeHours.startTime.getMonth(), _this.props.officeHours.startTime.getDate(), _this.props.officeHours.startTime.getHours() + 1);
            var endTime = new Date(_this.props.officeHours.endTime.getFullYear(), _this.props.officeHours.endTime.getMonth(), _this.props.officeHours.endTime.getDate(), _this.props.officeHours.endTime.getHours() - (_this.props.officeHours.endTime.getMinutes() === 0 ? 1 : 0));
            var times = [];
            for (var t = startTime; t <= endTime; t = new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours() + 1)) {
                times.push(t);
            }
            return times.map(function (t) { return minutesElapsed(_this.props.officeHours.startTime, t); });
        };
        _this.render = function () { return (React.createElement("div", { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' } }, _this.props.officeHours && React.createElement("div", { style: { width: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center' } },
            React.createElement("div", { style: { fontFamily: 'sans-serif', fontSize: '32px' } }, _this.props.officeHours.title),
            React.createElement("div", null,
                _this.props.officeHours.hostName,
                " (",
                _this.props.officeHours.location,
                ")"),
            React.createElement("div", { style: _this.getStyle() },
                _this.getDashLinePositions().map(function (position) {
                    return React.createElement("div", { key: Math.random(), style: { borderTop: '1px dashed grey', width: '100%', position: 'absolute', top: 2 * position + "px" } });
                }),
                _this.props.officeHours.bookings.map(function (booking) {
                    return React.createElement(BookingComponent_1.default, { key: Math.random(), officeHoursStartTime: _this.props.officeHours.startTime, booking: booking });
                }))))); };
        return _this;
    }
    return OfficeHoursComponent;
}(React.PureComponent));
;
exports.default = react_redux_1.connect(function (state) { return state.officeHours; }, OfficeHours_1.actionCreators)(OfficeHoursComponent);
//# sourceMappingURL=OfficeHoursComponent.js.map