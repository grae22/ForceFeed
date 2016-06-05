import {Component, Input} from '@angular/core';
import {FileService} from './file.service';
import {AutoEllipsesPipe} from './autoEllipses.pipe';

@Component(
{
  selector: 'fileVersionViewer',
  template: `
    <div (click)='onClick()'>
      <code>{{ Filename | autoEllipses: 100 : true }}</code>
    </div>
    <div
      class='container-fluid'
      style='background-color: #e0e0e0'
      *ngIf='_isContentVisible'>
      {{ _content }}
    </div>
  `,
  providers: [FileService],
  pipes: [AutoEllipsesPipe]
})
export class FileVersionViewerComponent
{
  //---------------------------------------------------------------------------
  
  @Input() Filename: string = '';
  
  private _content: string = null;
  private _isContentVisible: boolean = false;
  
  //---------------------------------------------------------------------------
  
  constructor( private _fileService: FileService )
  {
    
  }
  
  //---------------------------------------------------------------------------
  
  private onClick()
  {
    this._isContentVisible = !this._isContentVisible;
    
    // Content is now visible? Load it if it hasn't already been.
    if( this._isContentVisible &&
        this._content == null )
    {
      this._fileService.getFileContent( this.Filename );      
      
      this._fileService.Content.subscribe(
        content => this._content = content );
    }
  }
  
  //---------------------------------------------------------------------------
}