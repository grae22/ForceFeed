System.register(['@angular/core', '@angular/http', './changelist.service', './changelist.component', 'rxjs/Rx', './settings.service', 'ng2-cookies/ng2-cookies', './submitterList.component'], function(exports_1, context_1) {
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
    var core_1, http_1, changelist_service_1, changelist_component_1, Rx_1, settings_service_1, ng2_cookies_1, submitterList_component_1;
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
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (settings_service_1_1) {
                settings_service_1 = settings_service_1_1;
            },
            function (ng2_cookies_1_1) {
                ng2_cookies_1 = ng2_cookies_1_1;
            },
            function (submitterList_component_1_1) {
                submitterList_component_1 = submitterList_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                //---------------------------------------------------------------------------
                function AppComponent(_changelistService, _http, settings) {
                    var _this = this;
                    this._changelistService = _changelistService;
                    this._http = _http;
                    this._submitters = [];
                    this._isAnyChangelistComponentExpanded = false;
                    this._paginationText = '0';
                    this._paginationStartIndex = 0;
                    this._paginationMaxCount = 30;
                    this._paginationCounts = [20, 30, 40, 75, 100];
                    this._paginationCountIndex = 1;
                    // Get the pagination count if there's one.
                    var countIndex = parseInt(ng2_cookies_1.Cookie.get('paginationCountIndex'));
                    if (countIndex != NaN &&
                        countIndex > -1 &&
                        countIndex < this._paginationCounts.length) {
                        this.setPaginationMaxCount(countIndex);
                    }
                    // Refresh the changelists.
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
                    this._changelistService.getChangelists(this._http, this._submitters, this._paginationStartIndex, this._paginationMaxCount);
                    this._changelistService.ChanglistDatas.subscribe(function (changelists) { return _this._changelistDatas = changelists; });
                    this.updatePaginationText();
                };
                //---------------------------------------------------------------------------
                AppComponent.prototype.onSubmitterSelectionChanged = function (event) {
                    this._submitters = event.submitters;
                    this.refresh();
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
                //---------------------------------------------------------------------------
                AppComponent.prototype.paginationOnNextClick = function () {
                    if (this._changelistDatas.length < this._paginationMaxCount) {
                        return;
                    }
                    this._paginationStartIndex += this._paginationMaxCount;
                    this.refresh();
                };
                //---------------------------------------------------------------------------
                AppComponent.prototype.paginationOnPreviousClick = function () {
                    this._paginationStartIndex -= this._paginationMaxCount;
                    if (this._paginationStartIndex < 0) {
                        this._paginationStartIndex = 0;
                    }
                    this.refresh();
                };
                //---------------------------------------------------------------------------
                AppComponent.prototype.paginationOnFirstClick = function () {
                    this._paginationStartIndex = 0;
                    this.refresh();
                };
                //---------------------------------------------------------------------------
                AppComponent.prototype.paginationOnLessClick = function () {
                    this.setPaginationMaxCount(this._paginationCountIndex - 1);
                    this.refresh();
                };
                //---------------------------------------------------------------------------
                AppComponent.prototype.paginationOnMoreClick = function () {
                    this.setPaginationMaxCount(this._paginationCountIndex + 1);
                    this.refresh();
                };
                //---------------------------------------------------------------------------
                AppComponent.prototype.setPaginationMaxCount = function (index) {
                    if (index > -1 && index < this._paginationCounts.length) {
                        this._paginationCountIndex = index;
                        this._paginationMaxCount = this._paginationCounts[index];
                        ng2_cookies_1.Cookie.set('paginationCountIndex', this._paginationCountIndex.toString(), 100);
                    }
                };
                //---------------------------------------------------------------------------
                AppComponent.prototype.updatePaginationText = function () {
                    this._paginationText =
                        (this._paginationStartIndex + 1) + ' to ' +
                            (this._paginationStartIndex + this._paginationMaxCount);
                };
                __decorate([
                    core_1.ViewChildren(changelist_component_1.ChangelistComponent), 
                    __metadata('design:type', core_1.QueryList)
                ], AppComponent.prototype, "Changelists", void 0);
                __decorate([
                    core_1.ViewChild(submitterList_component_1.SubmitterListComponent), 
                    __metadata('design:type', submitterList_component_1.SubmitterListComponent)
                ], AppComponent.prototype, "SubmitterList", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: './app/app.component.html',
                        directives: [changelist_component_1.ChangelistComponent, submitterList_component_1.SubmitterListComponent],
                        providers: [
                            changelist_service_1.ChangelistService,
                            http_1.ConnectionBackend,
                            settings_service_1.SettingsService
                        ]
                    }), 
                    __metadata('design:paramtypes', [changelist_service_1.ChangelistService, http_1.Http, settings_service_1.SettingsService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map