import {Component, Inject, Output, EventEmitter} from 'angular2/core';

@Component(
{
  selector: 'submitterFilter',
  template: `
    <div>
      <span>
        <label for='submitters'>Submitters:</label>
        <input #box name='submitters' class='form-control' type='text' (keyup.enter)='setSubmitters( box.value )' />
      </span>
    </div>`
})
export class SubmitterFilterComponent
{
  //---------------------------------------------------------------------------
  
  @Output() FilterChanged = new EventEmitter();
  
  //---------------------------------------------------------------------------
  
  private setSubmitters( submitters: string )
  {
    this.FilterChanged.emit( { submitters: submitters } );
  }
  
  //---------------------------------------------------------------------------
}