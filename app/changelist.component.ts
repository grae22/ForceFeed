import {Component, Input} from 'angular2/core';
import {Http} from 'angular2/http';

@Component(
  {
    selector: 'changelist',
    templateUrl: './app/changelist.component.html'
  })
  export class ChangelistComponent
  {
    //-------------------------------------------------------------------------
    
    @Input() data;
    
    public _isExpanded = false;
    
    //-------------------------------------------------------------------------
    
    constructor()
    {

    }
    
    //-------------------------------------------------------------------------
    
    private onClick()
    {
      this._isExpanded = !this._isExpanded;
    }
    
    //------------------------------------------------------------------------- 
  }