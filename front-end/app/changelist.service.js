System.register(['@angular/http', '@angular/core', 'rxjs/Rx', 'rxjs/Observable', './settings.service'], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var http_1, core_1, Observable_1, settings_service_1;
    var ChangelistService;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {},
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (settings_service_1_1) {
                settings_service_1 = settings_service_1_1;
            }],
        execute: function() {
            ChangelistService = (function () {
                //---------------------------------------------------------------------------
                function ChangelistService(_settingsService) {
                    var _this = this;
                    this._settingsService = _settingsService;
                    this.ChanglistDatas =
                        new Observable_1.Observable(function (observer) { return _this._changelistDatasObserver = observer; }).share();
                    this.ChanglistDatas.subscribe(function (data) { });
                }
                //---------------------------------------------------------------------------
                ChangelistService.prototype.getChangelists = function (http, submittters) {
                    var _this = this;
                    var responseData;
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json; charset=utf-8' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    try {
                        http.get(this._settingsService.ChangelistsHttpGetUrl + '?submitters=\'' + submittters + '\'', headers)
                            .map(function (res) { return JSON.parse(res.text()); })
                            .subscribe(function (data) { return _this._changelistDatasObserver.next(data); }, function (err) { return console.error('ERR: ' + err); }, function () { return console.log('INF: Get complete.'); });
                    }
                    catch (error) {
                        console.error(error);
                    }
                };
                ChangelistService = __decorate([
                    __param(0, core_1.Inject(settings_service_1.SettingsService)), 
                    __metadata('design:paramtypes', [settings_service_1.SettingsService])
                ], ChangelistService);
                return ChangelistService;
            }());
            exports_1("ChangelistService", ChangelistService);
        }
    }
});
//# sourceMappingURL=changelist.service.js.map