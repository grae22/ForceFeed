System.register(['@angular/core'], function(exports_1, context_1) {
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
    var core_1;
    var FileContentToHtmlPipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            FileContentToHtmlPipe = (function () {
                function FileContentToHtmlPipe() {
                }
                //---------------------------------------------------------------------------
                FileContentToHtmlPipe.prototype.transform = function (content) {
                    if (content == null) {
                        return '';
                    }
                    // Diff or just a file's content?
                    var isDiff = false;
                    if (content.indexOf('===') === 0) {
                        isDiff = true;
                    }
                    content = content.replace(new RegExp('\r', 'g'), '');
                    content = content.replace(new RegExp('<', 'g'), '&lt;');
                    content = content.replace(new RegExp('>', 'g'), '&gt;');
                    content = content.replace(new RegExp('\t', 'g'), '<b><font color="#ff0000">[TAB]</font></b>');
                    var newContent = '';
                    var lines = content.split('\n');
                    var isFirstLine = true;
                    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                        var line = lines_1[_i];
                        // Skip the first line - it's a header from p4 we don't want to see.
                        if (isDiff && isFirstLine) {
                            isFirstLine = false;
                            continue;
                        }
                        // Skip lines that begin with @, p4 inserted stuff.
                        if (line[0] == '@') {
                            continue;
                        }
                        // Process the line.
                        var linePostfix = '';
                        if (line[0] == '-') {
                            newContent += '<font color="#ff0000">';
                            linePostfix += '</font>';
                        }
                        else if (line[0] == '+') {
                            newContent += '<font color="#00a020">';
                            linePostfix += '</font>';
                        }
                        // Add this line to the new content.
                        if (isDiff) {
                            newContent += line.substr(1, line.length - 1) + linePostfix + '\n';
                        }
                        else {
                            newContent += line + linePostfix + '\n';
                        }
                    }
                    return '<pre>' + newContent + '</pre>';
                };
                FileContentToHtmlPipe = __decorate([
                    core_1.Pipe({
                        name: 'fileContentToHtml'
                    }), 
                    __metadata('design:paramtypes', [])
                ], FileContentToHtmlPipe);
                return FileContentToHtmlPipe;
            }());
            exports_1("FileContentToHtmlPipe", FileContentToHtmlPipe);
        }
    }
});
//# sourceMappingURL=fileContentToHtml.pipe.js.map