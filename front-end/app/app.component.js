System.register(['@angular/core', '@angular/http', './changelist.service', './changelist.component', './submitterFilter.component', 'rxjs/Rx', './settings.service'], function(exports_1, context_1) {
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
    var core_1, http_1, changelist_service_1, changelist_component_1, submitterFilter_component_1, Rx_1, settings_service_1;
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
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (settings_service_1_1) {
                settings_service_1 = settings_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                //---------------------------------------------------------------------------
                function AppComponent(_changelistService, _http, submitterFilter, settings) {
                    var _this = this;
                    this._changelistService = _changelistService;
                    this._http = _http;
                    this._submitters = '';
                    this._isAnyChangelistComponentExpanded = false;
                    this._submitters = submitterFilter.getSubmitters();
                    this.refresh();
                    // Set up an periodic check if any changelist components are expanded.
                    Rx_1.Observable.interval(500).subscribe(function () { return _this.checkForExpandedChangelistComponents(); });
                    // Set up an auto refresh routine.    
                    Rx_1.Observable.interval(settings.RefreshChangelistsRateInSecs * 1000)
                        .subscribe(function () { return _this.autoRefresh(); });
                }
                //---------------------------------------------------------------------------
                AppComponent.prototype.setSubmitters = function (event) {
                    this._submitters = event.submitters;
                    this.refresh();
                };
                //---------------------------------------------------------------------------
                AppComponent.prototype.refresh = function () {
                    var _this = this;
                    this._changelistService.getChangelists(this._http, this._submitters);
                    this._changelistService.ChanglistDatas.subscribe(function (changelists) { return _this._changelistDatas = changelists; });
                };
                //---------------------------------------------------------------------------
                AppComponent.prototype.checkForExpandedChangelistComponents = function () {
                    this._isAnyChangelistComponentExpanded = false;
                    for (var _i = 0, _a = this.Changelists.toArray(); _i < _a.length; _i++) {
                        var changelistComponent = _a[_i];
                        if (changelistComponent._isExpanded) {
                            this._isAnyChangelistComponentExpanded = true;
                            break;
                        }
                    }
                };
                //---------------------------------------------------------------------------
                AppComponent.prototype.autoRefresh = function () {
                    // Don't refresh if any changelists are expanded.
                    if (this._isAnyChangelistComponentExpanded == false) {
                        this.refresh();
                    }
                };
                __decorate([
                    core_1.ViewChildren(changelist_component_1.ChangelistComponent), 
                    __metadata('design:type', core_1.QueryList)
                ], AppComponent.prototype, "Changelists", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n    <!-- Entire page -->\n    <div\n      class='row'\n      style='padding: 5px 0px 0px 0px'>\n\n      <!-- Left pane -->\n      <div class='col-sm-2'>\n        <i\n          class='glyphicon glyphicon-grain'\n          style='font-size: 40px;'>\n        </i>\n        <b style='font-size: 16px'>ForceFeed</b>\n      </div>\n      <!-- Right pane -->\n      <div\n        class='container col-sm-8'\n        style='padding: 20px 0px 0px 0px'>\n\n        <!-- Submitter filter -->\n        <div>\n          <submitterFilter (FilterChanged)='setSubmitters( $event )'></submitterFilter>\n        </div>\n        <!-- Changelists -->\n        <div>\n          <div\n            style='padding: 0px 0px 10px 0px'\n            class='container'>\n            <span\n              style='cursor: pointer;'\n              *ngIf='_isAnyChangelistComponentExpanded == true'\n              (click)='refresh()'>\n\n              <i class='glyphicon glyphicon-refresh'></i>\n              <span\n                class='text-center'\n                style='color: grey;'>\n                  Changelists will not be refreshed while any changelist is expanded.\n              </span>\n            </span>\n          </div>\n          <div\n            class='container'\n            *ngFor='let changelistData of _changelistDatas'>\n              <changelist [data]='changelistData'></changelist>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
                        directives: [changelist_component_1.ChangelistComponent, submitterFilter_component_1.SubmitterFilterComponent],
                        providers: [changelist_service_1.ChangelistService, http_1.ConnectionBackend, submitterFilter_component_1.SubmitterFilterComponent, settings_service_1.SettingsService]
                    }), 
                    __metadata('design:paramtypes', [changelist_service_1.ChangelistService, http_1.Http, submitterFilter_component_1.SubmitterFilterComponent, settings_service_1.SettingsService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map