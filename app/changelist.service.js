System.register(['angular2/http', 'rxjs/Rx', 'rxjs/Observable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var http_1, Observable_1;
    var ChangelistService;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            ChangelistService = (function () {
                //---------------------------------------------------------------------------
                function ChangelistService() {
                    var _this = this;
                    this.Changlists$ =
                        new Observable_1.Observable(function (observer) { return _this._changelistsObserver = observer; }).share();
                    this.Changlists$.subscribe(function (data) { });
                }
                //---------------------------------------------------------------------------
                ChangelistService.prototype.getChangelists = function (http) {
                    var _this = this;
                    var responseData;
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    try {
                        http.get('http://localhost:3010/changelists', headers)
                            .map(function (res) { return JSON.parse(res.text()); })
                            .subscribe(function (data) { return _this._changelistsObserver.next(data); }, function (err) { return console.error(err); }, function () { return console.log('Get complete.'); });
                    }
                    catch (error) {
                        console.error(error);
                    }
                    //return responseData;
                    /*
                        return [
                          {
                            id: '12345',
                            username: 'Username',
                            description: 'Description...',
                            timestamp: '2016/05/23 21:00',
                            files: [
                              { filename: 'KFile_1.cpp', revision: 1 },
                              { filename: 'KFile_2.cpp', revision: 2 },
                              { filename: 'KFile_3.cpp', revision: 3 },
                              { filename: 'KFile_4.cpp', revision: 4 }
                            ]
                          },
                          {
                            id: '12346',
                            username: 'Username 2',
                            description: 'Description 2...',
                            timestamp: '2016/05/23 21:01',
                            files: [
                              { filename: 'KFile_1.h', revision: 1 },
                              { filename: 'KFile_2.h', revision: 2 },
                              { filename: 'KFile_3.h', revision: 3 },
                              { filename: 'KFile_4.h', revision: 4 }
                            ]
                          }
                        ];*/
                };
                return ChangelistService;
            }());
            exports_1("ChangelistService", ChangelistService);
        }
    }
});
//# sourceMappingURL=changelist.service.js.map