System.register(['@angular/core', './submitter.service'], function(exports_1, context_1) {
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
    var core_1, submitter_service_1;
    var SubmitterListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (submitter_service_1_1) {
                submitter_service_1 = submitter_service_1_1;
            }],
        execute: function() {
            SubmitterListComponent = (function () {
                //---------------------------------------------------------------------------
                function SubmitterListComponent(_submitterService) {
                    var _this = this;
                    this._submitterService = _submitterService;
                    _submitterService.Submitters$.subscribe(function (submitters) { return _this._submitters = submitters; });
                    _submitterService.getSubmitters();
                }
                SubmitterListComponent = __decorate([
                    core_1.Component({
                        selector: 'submitterList',
                        template: "\n    <div class='container'>\n      Submitters\n      <div\n        class='row'\n        *ngFor='let submitter of _submitters'>\n        \n        {{ submitter }}\n      </div>\n    </div>\n  ",
                        styles: ['./app/submitterList.component.css'],
                        providers: [submitter_service_1.SubmitterService]
                    }), 
                    __metadata('design:paramtypes', [submitter_service_1.SubmitterService])
                ], SubmitterListComponent);
                return SubmitterListComponent;
            }());
            exports_1("SubmitterListComponent", SubmitterListComponent);
        }
    }
});
//# sourceMappingURL=submitterList.component.js.map