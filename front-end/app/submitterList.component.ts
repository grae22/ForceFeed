import {Component, Output, EventEmitter, ViewChildren, QueryList} from '@angular/core';
import {SubmitterService} from './submitter.service';
import {CheckboxComponent} from './checkbox.component';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Component(
{
  selector: 'submitterList',
  template: `
    <div class='container'>      
      <h1>Submitters:</h1>
      <div
        class='checkbox'
        *ngFor='let submitter of _submitters'>
        
        <checkbox
          [Id]='submitter'
          [Text]='submitter'
          (Changed)='onChange()'>
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
    // We want the submitters so we can populate the checkboxes, the
    // _submitters array is bound to the template to do this.
    _submitterService.Submitters$.subscribe(
      submitters => this._submitters = submitters.sort() ); 
    
    // Make the call that will result in us receiving submitters from the
    // service which we subscribe to.
    _submitterService.getSubmitters();
  }
  
  //---------------------------------------------------------------------------
  
  ngAfterViewInit()
  {
    // We want to know when the checkboxes have actually been created so
    // that we can set their states from the cookie.
    this.Checkboxes.changes.subscribe( () => this.afterCheckboxesCreated() );
  }
  
  //---------------------------------------------------------------------------
  
  // Should be called after the checkboxes have been created so we can set
  // their values from what was previously stored in the cookie.

  private afterCheckboxesCreated()
  {
    var selectedSubmitters = JSON.parse( Cookie.get( 'selectedSubmitters' ) );

    if( selectedSubmitters != null &&
        this.Checkboxes != null )
    {
      // Check each checkbox - if it belongs to a submitter that was
      // previously check, set it as checked it now.
      this.Checkboxes.forEach(
        box =>
          {
            // Is the current box for a previsouly selected submitter?
            selectedSubmitters.forEach(
              id => 
                {
                  if( box.Id == id )
                  {
                    box.setChecked( true );
                  }
                });
          });
          
      // Raise the event to indicate the selected items have changed.
      this.onChange();
    }
  }
  
  //---------------------------------------------------------------------------
  
  // Should be called when a checkbox changes state.
  
  private onChange()
  {
    // Create an array of selected checkboxes.
    var submitters = [];

    this.Checkboxes.forEach(
      box =>
        {
          if( box.IsChecked )
          {
            submitters.push( box.Id );
          }
        });
    
    // Store the selected submitters in the cookie.
    Cookie.set(
      'selectedSubmitters',
      JSON.stringify( submitters ),
      100 );

    // Raise an event with the currently selected submitters.
    this.SelectionChanged.emit( { submitters: submitters } );
  }
  
  //---------------------------------------------------------------------------
}