System.register(['angular2/core', './changelist.service', './changelist.component'], function(exports_1, context_1) {
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
    var core_1, changelist_service_1, changelist_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (changelist_service_1_1) {
                changelist_service_1 = changelist_service_1_1;
            },
            function (changelist_component_1_1) {
                changelist_component_1 = changelist_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_changelistService) {
                    this._changelistService = _changelistService;
                    this._changelists = _changelistService.getChangelists();
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n      <div *ngFor='#changelist of _changelists'>\n        <changelist [data]='changelist'></changelist>\n      </div>\n    ",
                        directives: [changelist_component_1.ChangelistComponent],
                        providers: [changelist_service_1.ChangelistService]
                    }), 
                    __metadata('design:paramtypes', [changelist_service_1.ChangelistService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map