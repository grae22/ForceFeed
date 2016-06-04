System.register(['@angular/core', './file.service', './autoEllipses.pipe'], function(exports_1, context_1) {
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
    var core_1, file_service_1, autoEllipses_pipe_1;
    var FileVersionViewerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (file_service_1_1) {
                file_service_1 = file_service_1_1;
            },
            function (autoEllipses_pipe_1_1) {
                autoEllipses_pipe_1 = autoEllipses_pipe_1_1;
            }],
        execute: function() {
            FileVersionViewerComponent = (function () {
                //---------------------------------------------------------------------------
                function FileVersionViewerComponent(_fileService) {
                    this._fileService = _fileService;
                    //---------------------------------------------------------------------------
                    this.Filename = '';
                    this._content = null;
                    this._isContentVisible = false;
                }
                //---------------------------------------------------------------------------
                FileVersionViewerComponent.prototype.onClick = function () {
                    this._isContentVisible = !this._isContentVisible;
                    // Content is now visible? Load it if it hasn't already been.
                    if (this._isContentVisible &&
                        this._content == null) {
                        this._content = this._fileService.getFileContent(this.Filename);
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], FileVersionViewerComponent.prototype, "Filename", void 0);
                FileVersionViewerComponent = __decorate([
                    core_1.Component({
                        selector: 'fileVersionViewer',
                        template: "\n    <div (click)='onClick()'>\n      <code>{{ Filename | autoEllipses: 100 : true }}</code>\n    </div>\n    <div\n      class='container-fluid'\n      style='background-color: #e0e0e0'\n      *ngIf='_isContentVisible'>\n      {{ _content }}\n    </div>\n  ",
                        providers: [file_service_1.FileService],
                        pipes: [autoEllipses_pipe_1.AutoEllipsesPipe]
                    }), 
                    __metadata('design:paramtypes', [file_service_1.FileService])
                ], FileVersionViewerComponent);
                return FileVersionViewerComponent;
            }());
            exports_1("FileVersionViewerComponent", FileVersionViewerComponent);
        }
    }
});
//# sourceMappingURL=fileVersionViewer.component.js.map