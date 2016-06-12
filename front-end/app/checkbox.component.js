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
    var CheckboxComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            CheckboxComponent = (function () {
                function CheckboxComponent() {
                    this.Changed = new core_1.EventEmitter();
                    this.IsChecked = false;
                }
                //---------------------------------------------------------------------------
                CheckboxComponent.prototype.onChange = function (event) {
                    this.IsChecked = event.target.checked;
                    this.Changed.emit({
                        id: this.Id,
                        checked: event.target.checked
                    });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], CheckboxComponent.prototype, "Id", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], CheckboxComponent.prototype, "Text", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], CheckboxComponent.prototype, "Changed", void 0);
                CheckboxComponent = __decorate([
                    core_1.Component({
                        selector: 'checkbox',
                        template: "\n    <div class='checkbox'>\n      <label> \n        <input\n          #submitterCheckbox\n          type='checkbox'\n          (change)='onChange( $event )' />\n          \n          {{ Text }}\n      </label>\n    </div>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], CheckboxComponent);
                return CheckboxComponent;
            }());
            exports_1("CheckboxComponent", CheckboxComponent);
        }
    }
});
//# sourceMappingURL=checkbox.component.js.map