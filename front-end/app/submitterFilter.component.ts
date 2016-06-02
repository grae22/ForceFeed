import {Component, Inject, Output, EventEmitter} from 'angular2/core';

@Component(
{
  selector: 'submitterFilter',
  template: `
    <form class='form-horizontal'>
      <div class='form-group form-group-sm'>
        <label class='col-sm-1 control-label' for='submitters'>Submitters:</label>
        <div class='col-sm-11'>
          <input #box name='submitters' class='form-control' type='text' (keyup.enter)='setSubmitters( box.value )' />
        </div>
      </div>
    </form>`
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