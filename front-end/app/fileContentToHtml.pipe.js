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
                    // Replace some non html safe chars. 
                    content = content.replace(new RegExp('\r', 'g'), '');
                    content = content.replace(new RegExp('<', 'g'), '&lt;');
                    content = content.replace(new RegExp('>', 'g'), '&gt;');
                    content = content.replace(new RegExp('\t', 'g'), '<b><font color="#00ffff" style="background-color: #ff0000;">~tab~</font></b>');
                    // Split up the content into lines.
                    var lines = content.split('\n');
                    // Exclude the last line - it's always blank.
                    if (lines.length > 1) {
                        lines = lines.slice(0, lines.length - 1);
                    }
                    // Iterate through lines and format.
                    var newContent = '';
                    var isFirstLine = true;
                    var isPrevLineBlank = false;
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
                            newContent += '<span style="background-color: #ffc0c0;">';
                            linePostfix += '</span>';
                        }
                        else if (line[0] == '+') {
                            newContent += '<span style="background-color: #a0f0a0;">';
                            linePostfix += '</span>';
                        }
                        // Trailing whitespace.
                        var trailingWhitespaceStartIndex = -1;
                        var trailingWhitespaceCount = 0;
                        for (var i = line.length - 1; i > -1; i--) {
                            if (line[i] == ' ') {
                                trailingWhitespaceStartIndex = i;
                                trailingWhitespaceCount++;
                            }
                            else {
                                break;
                            }
                        }
                        if (trailingWhitespaceCount < line.length - 1 &&
                            trailingWhitespaceCount > 0) {
                            line = line.substr(0, trailingWhitespaceStartIndex);
                            line += '<font color="#00ffff" style="background-color: #ff0000;"><b>';
                            for (var i = 0; i < trailingWhitespaceCount; i++) {
                                line += '~';
                            }
                            line += '</b></font>';
                        }
                        // Consecutive blank lines.
                        var isLineBlank = (line.trim().length == 0);
                        if (isLineBlank &&
                            isPrevLineBlank) {
                            line += '<font color="#00ffff" style="background-color: #ff0000;">~consecutive blank line~</font>';
                        }
                        isPrevLineBlank = isLineBlank;
                        // Add this line to the new content.
                        newContent += line + linePostfix + '\n';
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