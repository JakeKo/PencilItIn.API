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
var OfficeHours = /** @class */ (function (_super) {
    __extends(OfficeHours, _super);
    function OfficeHours() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OfficeHours.prototype.render = function () {
        console.log(this.props);
        return (React.createElement(React.Fragment, null,
            React.createElement("h1", null, "Office Hours Component")));
    };
    return OfficeHours;
}(React.PureComponent));
;
exports.default = react_redux_1.connect(function (state) { return state.officeHours; }, OfficeHours_1.actionCreators)(OfficeHours);
//# sourceMappingURL=OfficeHours.js.map