import {Component, Input} from '@angular/core';
import {Http} from '@angular/http';
import {AutoEllipsesPipe} from './autoEllipses.pipe';
import {FileVersionViewerComponent} from './fileVersionViewer.component';

@Component(
  {
    selector: 'changelist',
    templateUrl: './app/changelist.component.html',
    styleUrls: ['./app/styles.css'],
    pipes: [AutoEllipsesPipe],
    directives: [FileVersionViewerComponent]
  })
  export class ChangelistComponent
  {
    //-------------------------------------------------------------------------
    
    @Input() data;
    
    public _isExpanded = false;
    
    //-------------------------------------------------------------------------
    
    private onClick()
    {
      this._isExpanded = !this._isExpanded;
    }
    
    //------------------------------------------------------------------------- 
  }