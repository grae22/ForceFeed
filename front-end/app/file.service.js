System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var FileService;
    return {
        setters:[],
        execute: function() {
            FileService = (function () {
                function FileService() {
                }
                //---------------------------------------------------------------------------
                FileService.prototype.getFileContent = function (filename) {
                    return filename;
                };
                return FileService;
            }());
            exports_1("FileService", FileService);
        }
    }
});
//# sourceMappingURL=file.service.js.map