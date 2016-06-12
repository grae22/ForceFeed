import {Component, Output, EventEmitter, ViewChildren, QueryList} from '@angular/core';
import {SubmitterService} from './submitter.service';
import {CheckboxComponent} from './checkbox.component';

@Component(
{
  selector: 'submitterList',
  template: `
    <div class='container'>      
      <u>Submitters</u>
      <div
        class='checkbox'
        *ngFor='let submitter of _submitters'>
        
        <checkbox
          [Id]='submitter'
          [Text]='submitter'
          (Changed)='onChange( $event )'>
        </checkbox>        
      </div>
    </div>
  `,
  styleUrls: ['./app/submitterList.component.css'],
  directives: [CheckboxComponent],
  providers: [SubmitterService]
})
export class SubmitterListComponent
{
  //---------------------------------------------------------------------------
  
  @Output() SelectionChanged = new EventEmitter();
  @ViewChildren( CheckboxComponent ) Checkboxes = new QueryList();
  
  private _submitters: string[];
  
  //---------------------------------------------------------------------------
  
  constructor( private _submitterService: SubmitterService )
  {
    _submitterService.Submitters$.subscribe(
      submitters => this._submitters = submitters ); 
    
    _submitterService.getSubmitters();
  }
  
  //---------------------------------------------------------------------------
  
  private onChange( event: Event )
  {
    var submitters = [];

    this.Checkboxes.forEach(
      box =>
        {
          if( box.IsChecked )
          {
            submitters.push( box.Id );
          }
        });

    this.SelectionChanged.emit( { submitters: submitters } );
  }
  
  //---------------------------------------------------------------------------
  
  public getSelected() : string[]
  {
    let selected: string[];
    
    
    
    return selected;
  }
  
  //---------------------------------------------------------------------------
}