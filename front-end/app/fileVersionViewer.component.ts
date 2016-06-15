import {Component, Input} from '@angular/core';
import {FileService} from './file.service';
import {AutoEllipsesPipe} from './autoEllipses.pipe';
import {FileContentToHtmlPipe} from './fileContentToHtml.pipe';

@Component(
{
  selector: 'fileVersionViewer',
  template: `
    <div
      (click)='onClick()'
      style='cursor: pointer;'>
      
      <code>
        {{ Filename | autoEllipses: 100 : true }}
        <span style='color: #000000;'>
          (<span style='color: #00a000;'>+{{ AdditionsCount }}</span>
          <span style='color: #ff0000;'>-{{ DeletionsCount }}</span>
          <span style='color: #a000ff;'>~{{ ChangesCount }}</span>)
        </span>
      </code>
    </div>
    <div
      class='container-fluid'
      style='background-color: "#e0e0e0"'
      *ngIf='_isContentVisible'
      [innerHTML]='_content | fileContentToHtml'>
    </div>
  `,
  providers: [FileService],
  pipes: [AutoEllipsesPipe, FileContentToHtmlPipe]
})
export class FileVersionViewerComponent
{
  //---------------------------------------------------------------------------
  
  @Input() Filename: string = '';
  @Input() AdditionsCount: number = 0;
  @Input() DeletionsCount: number = 0;
  @Input() ChangesCount: number = 0;
  
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