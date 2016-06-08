System.register(['@angular/core', 'ng2-cookies/ng2-cookies'], function(exports_1, context_1) {
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
    var core_1, ng2_cookies_1;
    var SubmitterFilterComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_cookies_1_1) {
                ng2_cookies_1 = ng2_cookies_1_1;
            }],
        execute: function() {
            SubmitterFilterComponent = (function () {
                //---------------------------------------------------------------------------
                function SubmitterFilterComponent() {
                    //---------------------------------------------------------------------------
                    this.FilterChanged = new core_1.EventEmitter();
                    this._submitters = '';
                    var submitters = ng2_cookies_1.Cookie.get('submitters');
                    this._submitters = (submitters == null ? '' : submitters);
                }
                //---------------------------------------------------------------------------
                SubmitterFilterComponent.prototype.setSubmitters = function (submitters) {
                    this._submitters = submitters;
                    ng2_cookies_1.Cookie.set('submitters', submitters);
                    this.FilterChanged.emit({ submitters: submitters });
                };
                //---------------------------------------------------------------------------
                SubmitterFilterComponent.prototype.getSubmitters = function () {
                    return this._submitters;
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], SubmitterFilterComponent.prototype, "FilterChanged", void 0);
                SubmitterFilterComponent = __decorate([
                    core_1.Component({
                        selector: 'submitterFilter',
                        template: "\n    <form class='form-horizontal'>\n      <div class='form-group form-group-sm'>\n        <label class='col-sm-1 control-label' for='submitters'><b>Submitters:</b></label>\n        <div class='col-sm-10'>\n          <input\n            #box\n            name='submitters'\n            class='form-control'\n            type='text'\n            (keyup.enter)='setSubmitters( box.value )'\n            value='{{ _submitters }}' />\n        </div>\n      </div>\n    </form>"
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