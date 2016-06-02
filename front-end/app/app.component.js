System.register(['angular2/core', 'angular2/http', './changelist.service', './changelist.component', './submitterFilter.component'], function(exports_1, context_1) {
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
    var core_1, http_1, changelist_service_1, changelist_component_1, submitterFilter_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (changelist_service_1_1) {
                changelist_service_1 = changelist_service_1_1;
            },
            function (changelist_component_1_1) {
                changelist_component_1 = changelist_component_1_1;
            },
            function (submitterFilter_component_1_1) {
                submitterFilter_component_1 = submitterFilter_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                //---------------------------------------------------------------------------
                function AppComponent(_changelistService, _submitterFilter, _http) {
                    this._changelistService = _changelistService;
                    this._submitterFilter = _submitterFilter;
                    this._http = _http;
                    this.Refresh({ submitters: '' });
                }
                //---------------------------------------------------------------------------
                AppComponent.prototype.Refresh = function (event) {
                    var _this = this;
                    this._changelistService.getChangelists(this._http, event.submitters);
                    this._changelistService.Changlists$.subscribe(function (changelists) { return _this._changelists = changelists; });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n      <div>\n        <submitterFilter (FilterChanged)='Refresh( $event )'></submitterFilter>\n      </div>\n      <div *ngFor='#changelist of _changelists'>\n        <changelist [data]='changelist'></changelist>\n      </div>\n    ",
                        directives: [changelist_component_1.ChangelistComponent, submitterFilter_component_1.SubmitterFilterComponent],
                        providers: [changelist_service_1.ChangelistService, submitterFilter_component_1.SubmitterFilterComponent, http_1.ConnectionBackend]
                    }), 
                    __metadata('design:paramtypes', [changelist_service_1.ChangelistService, submitterFilter_component_1.SubmitterFilterComponent, http_1.Http])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map