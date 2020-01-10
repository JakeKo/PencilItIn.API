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
var minutesElapsed = function (t1, t2) { return Math.abs(t1.valueOf() - t2.valueOf()) / 60000; };
var BookingComponent = /** @class */ (function (_super) {
    __extends(BookingComponent, _super);
    function BookingComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getStyle = function () { return ({
            position: 'absolute',
            top: 2 * minutesElapsed(_this.props.officeHoursStartTime, _this.props.booking.startTime) + "px",
            height: 2 * minutesElapsed(_this.props.booking.startTime, _this.props.booking.endTime) + "px",
            width: '95%',
            backgroundColor: 'grey',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontWeight: 800
        }); };
        _this.render = function () { return (React.createElement("div", { style: _this.getStyle() }, "BUSY")); };
        return _this;
    }
    return BookingComponent;
}(React.PureComponent));
;
exports.default = BookingComponent;
//# sourceMappingURL=BookingComponent.js.map