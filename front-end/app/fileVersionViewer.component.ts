import {Component, Input} from '@angular/core';
import {FileService} from './file.service';
import {AutoEllipsesPipe} from './autoEllipses.pipe';

@Component(
{
  selector: 'fileVersionViewer',
  template: `
    <div>
      <code>{{ Filename | autoEllipses: 100 : true }}</code>
    </div>
    <div
      class='container-fluid'
      style='background-color: #e0e0e0'
      *ngIf=false>
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
  
  private _content: string = '';
  
  //---------------------------------------------------------------------------
  
  constructor( private _fileService: FileService )
  {
    
  }
  
  //---------------------------------------------------------------------------
  
  ngOnInit()
  {
    this._content = this._fileService.getFileContent( this.Filename );
  }
  
  //---------------------------------------------------------------------------  
}