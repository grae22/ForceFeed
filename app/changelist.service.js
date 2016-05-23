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
                ChangelistService.prototype.getChangelists = function () {
                    return [
                        {
                            id: '12345',
                            username: 'Username',
                            description: 'Description...',
                            timestamp: '2016/05/23 21:00'
                        },
                        {
                            id: '12346',
                            username: 'Username 2',
                            description: 'Description 2...',
                            timestamp: '2016/05/23 21:01'
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