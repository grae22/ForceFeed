System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ChangelistService;
    return {
        setters:[],
        execute: function() {
            ChangelistService = (function () {
                function ChangelistService() {
                }
                //---------------------------------------------------------------------------
                ChangelistService.prototype.getChangelists = function () {
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
                    ];
                };
                return ChangelistService;
            }());
            exports_1("ChangelistService", ChangelistService);
        }
    }
});
//# sourceMappingURL=changelist.service.js.map