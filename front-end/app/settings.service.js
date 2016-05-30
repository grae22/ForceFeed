System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var SettingsService;
    return {
        setters:[],
        execute: function() {
            SettingsService = (function () {
                function SettingsService() {
                    this.WebServerName = 'graemepc';
                    this.ChangelistsHttpGetUrl = this.WebServerName + ':3010/changelists';
                }
                return SettingsService;
            }());
            exports_1("SettingsService", SettingsService);
        }
    }
});
//# sourceMappingURL=settings.service.js.map