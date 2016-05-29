import {Component, Input} from 'angular2/core';
import {Http} from 'angular2/http';
import {AutoEllipsesPipe} from './autoEllipses.pipe';

@Component(
  {
    selector: 'changelist',
    templateUrl: './app/changelist.component.html',
    pipes: [AutoEllipsesPipe]
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