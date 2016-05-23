import {Component, Input} from 'angular2/core';

@Component(
  {
    selector: 'changelist',
    templateUrl: './app/changelist.component.html'
  })
  export class ChangelistComponent
  {
    @Input() data;
  }