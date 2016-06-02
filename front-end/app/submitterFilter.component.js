System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var SubmitterFilterComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            SubmitterFilterComponent = (function () {
                function SubmitterFilterComponent() {
                    //---------------------------------------------------------------------------
                    this.FilterChanged = new core_1.EventEmitter();
                }
                //---------------------------------------------------------------------------
                SubmitterFilterComponent.prototype.setSubmitters = function (submitters) {
                    this.FilterChanged.emit({ submitters: submitters });
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], SubmitterFilterComponent.prototype, "FilterChanged", void 0);
                SubmitterFilterComponent = __decorate([
                    core_1.Component({
                        selector: 'submitterFilter',
                        template: "\n    <form class='form-horizontal'>\n      <div class='form-group form-group-sm'>\n        <label class='col-sm-1 control-label' for='submitters'>Submitters:</label>\n        <div class='col-sm-11'>\n          <input #box name='submitters' class='form-control' type='text' (keyup.enter)='setSubmitters( box.value )' />\n        </div>\n      </div>\n    </form>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], SubmitterFilterComponent);
                return SubmitterFilterComponent;
            }());
            exports_1("SubmitterFilterComponent", SubmitterFilterComponent);
        }
    }
});
//# sourceMappingURL=submitterFilter.component.js.map