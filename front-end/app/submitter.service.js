System.register(['@angular/core', '@angular/http', './settings.service', 'rxjs/Observable'], function(exports_1, context_1) {
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
    var core_1, http_1, settings_service_1, Observable_1;
    var SubmitterService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (settings_service_1_1) {
                settings_service_1 = settings_service_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            SubmitterService = (function () {
                //-------------------------------------------------------------------------
                function SubmitterService(_http, _settings) {
                    var _this = this;
                    this._http = _http;
                    this._settings = _settings;
                    this.Submitters$ =
                        new Observable_1.Observable(function (observer) { return _this._submitters = observer; }).share();
                    this.Submitters$.subscribe(function (data) { });
                }
                //---------------------------------------------------------------------------
                SubmitterService.prototype.getSubmitters = function () {
                    var _this = this;
                    // Set up and perform the request.
                    var headers = new http_1.Headers({ 'Content-Type': 'text/plain; charset=utf-8' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    try {
                        this._http.get(this._settings.SubmittersHttpGetUrl, headers)
                            .map(function (res) { return JSON.parse(res.text()); })
                            .subscribe(function (data) { return _this._submitters.next(data); }, function (err) { return console.error('Submitter GET error(1): ' + err); }, function () { return console.log('Submitter GET complete.'); });
                    }
                    catch (error) {
                        console.error('Submitter GET error(2): ' + error);
                    }
                };
                SubmitterService = __decorate([
                    __param(0, core_1.Inject(http_1.Http)),
                    __param(1, core_1.Inject(settings_service_1.SettingsService)), 
                    __metadata('design:paramtypes', [http_1.Http, settings_service_1.SettingsService])
                ], SubmitterService);
                return SubmitterService;
            }());
            exports_1("SubmitterService", SubmitterService);
        }
    }
});
//# sourceMappingURL=submitter.service.js.map