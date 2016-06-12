System.register(['@angular/core', './submitter.service', './checkbox.component', 'ng2-cookies/ng2-cookies'], function(exports_1, context_1) {
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
    var core_1, submitter_service_1, checkbox_component_1, ng2_cookies_1;
    var SubmitterListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (submitter_service_1_1) {
                submitter_service_1 = submitter_service_1_1;
            },
            function (checkbox_component_1_1) {
                checkbox_component_1 = checkbox_component_1_1;
            },
            function (ng2_cookies_1_1) {
                ng2_cookies_1 = ng2_cookies_1_1;
            }],
        execute: function() {
            SubmitterListComponent = (function () {
                //---------------------------------------------------------------------------
                function SubmitterListComponent(_submitterService) {
                    var _this = this;
                    this._submitterService = _submitterService;
                    //---------------------------------------------------------------------------
                    this.SelectionChanged = new core_1.EventEmitter();
                    this.Checkboxes = new core_1.QueryList();
                    // We want the submitters so we can populate the checkboxes, the
                    // _submitters array is bound to the template to do this.
                    _submitterService.Submitters$.subscribe(function (submitters) { return _this._submitters = submitters.sort(); });
                    // Make the call that will result in us receiving submitters from the
                    // service which we subscribe to.
                    _submitterService.getSubmitters();
                }
                //---------------------------------------------------------------------------
                SubmitterListComponent.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    // We want to know when the checkboxes have actually been created so
                    // that we can set their states from the cookie.
                    this.Checkboxes.changes.subscribe(function () { return _this.afterCheckboxesCreated(); });
                };
                //---------------------------------------------------------------------------
                // Should be called after the checkboxes have been created so we can set
                // their values from what was previously stored in the cookie.
                SubmitterListComponent.prototype.afterCheckboxesCreated = function () {
                    var selectedSubmitters = JSON.parse(ng2_cookies_1.Cookie.get('selectedSubmitters'));
                    if (selectedSubmitters != null &&
                        this.Checkboxes != null) {
                        // Check each checkbox - if it belongs to a submitter that was
                        // previously check, set it as checked it now.
                        this.Checkboxes.forEach(function (box) {
                            // Is the current box for a previsouly selected submitter?
                            selectedSubmitters.forEach(function (id) {
                                if (box.Id == id) {
                                    box.setChecked(true);
                                }
                            });
                        });
                        // Raise the event to indicate the selected items have changed.
                        this.onChange();
                    }
                };
                //---------------------------------------------------------------------------
                // Should be called when a checkbox changes state.
                SubmitterListComponent.prototype.onChange = function () {
                    // Create an array of selected checkboxes.
                    var submitters = [];
                    this.Checkboxes.forEach(function (box) {
                        if (box.IsChecked) {
                            submitters.push(box.Id);
                        }
                    });
                    // Store the selected submitters in the cookie.
                    ng2_cookies_1.Cookie.set('selectedSubmitters', JSON.stringify(submitters), 100);
                    // Raise an event with the currently selected submitters.
                    this.SelectionChanged.emit({ submitters: submitters });
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], SubmitterListComponent.prototype, "SelectionChanged", void 0);
                __decorate([
                    core_1.ViewChildren(checkbox_component_1.CheckboxComponent), 
                    __metadata('design:type', Object)
                ], SubmitterListComponent.prototype, "Checkboxes", void 0);
                SubmitterListComponent = __decorate([
                    core_1.Component({
                        selector: 'submitterList',
                        template: "\n    <div class='container'>      \n      <h1>Submitters:</h1>\n      <div\n        class='checkbox'\n        *ngFor='let submitter of _submitters'>\n        \n        <checkbox\n          [Id]='submitter'\n          [Text]='submitter'\n          (Changed)='onChange()'>\n        </checkbox>        \n      </div>\n    </div>\n  ",
                        styleUrls: ['./app/submitterList.component.css'],
                        directives: [checkbox_component_1.CheckboxComponent],
                        providers: [submitter_service_1.SubmitterService]
                    }), 
                    __metadata('design:paramtypes', [submitter_service_1.SubmitterService])
                ], SubmitterListComponent);
                return SubmitterListComponent;
            }());
            exports_1("SubmitterListComponent", SubmitterListComponent);
        }
    }
});
//# sourceMappingURL=submitterList.component.js.map