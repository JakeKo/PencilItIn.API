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
var axios_1 = require("axios");
var CreateBookingFormComponent = /** @class */ (function (_super) {
    __extends(CreateBookingFormComponent, _super);
    function CreateBookingFormComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.styles = {};
        _this.createBooking = function (event) {
            event.preventDefault();
            // Treat the form element as an array of input elements to get key-value pairs
            var _a = event.target, name = _a[0], startTime = _a[1], endTime = _a[2];
            console.log(event);
            axios_1.default({
                url: "officehours/" + _this.props.officeHours.id + "/bookings",
                method: 'POST',
                data: {
                    name: name.value,
                    // TODO: Populate date value with accurate date
                    startTime: new Date(2020, 1, 1, Number(startTime.value.split(':')[0])),
                    endTime: new Date(2020, 1, 1, Number(endTime.value.split(':')[0])),
                }
            }).then(console.log).catch(console.error);
        };
        _this.render = function () { return (React.createElement("form", { onSubmit: _this.createBooking },
            React.createElement("label", { htmlFor: 'name' }, "Name"),
            React.createElement("input", { name: 'name', type: 'text', placeholder: 'Name' }),
            React.createElement("label", { htmlFor: 'startTime' }, "Start Time"),
            React.createElement("input", { name: 'startTime', type: 'time', placeholder: 'Start Time' }),
            React.createElement("label", { htmlFor: 'endTime' }, "End Time"),
            React.createElement("input", { name: 'endTime', type: 'time', placeholder: 'End Time' }),
            React.createElement("button", { type: 'submit' }, "Submit"))); };
        return _this;
    }
    return CreateBookingFormComponent;
}(React.PureComponent));
;
exports.default = CreateBookingFormComponent;
//# sourceMappingURL=CreateBookingFormComponent.js.map