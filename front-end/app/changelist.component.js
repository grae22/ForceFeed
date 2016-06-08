System.register(['@angular/core', './autoEllipses.pipe', './fileVersionViewer.component'], function(exports_1, context_1) {
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
    var core_1, autoEllipses_pipe_1, fileVersionViewer_component_1;
    var ChangelistComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (autoEllipses_pipe_1_1) {
                autoEllipses_pipe_1 = autoEllipses_pipe_1_1;
            },
            function (fileVersionViewer_component_1_1) {
                fileVersionViewer_component_1 = fileVersionViewer_component_1_1;
            }],
        execute: function() {
            ChangelistComponent = (function () {
                function ChangelistComponent() {
                    this._isExpanded = false;
                }
                //-------------------------------------------------------------------------
                ChangelistComponent.prototype.onClick = function () {
                    this._isExpanded = !this._isExpanded;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], ChangelistComponent.prototype, "data", void 0);
                ChangelistComponent = __decorate([
                    core_1.Component({
                        selector: 'changelist',
                        templateUrl: './app/changelist.component.html',
                        styleUrls: ['./app/styles.css'],
                        pipes: [autoEllipses_pipe_1.AutoEllipsesPipe],
                        directives: [fileVersionViewer_component_1.FileVersionViewerComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], ChangelistComponent);
                return ChangelistComponent;
            }());
            exports_1("ChangelistComponent", ChangelistComponent);
        }
    }
});
//# sourceMappingURL=changelist.component.js.map