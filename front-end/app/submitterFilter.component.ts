import {Component, Inject, Output, EventEmitter} from 'angular2/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Component(
{
  selector: 'submitterFilter',
  template: `
    <form class='form-horizontal'>
      <div class='form-group form-group-sm'>
        <label class='col-sm-1 control-label' for='submitters'>Submitters:</label>
        <div class='col-sm-11'>
          <input
            #box
            name='submitters'
            class='form-control'
            type='text'
            (keyup.enter)='setSubmitters( box.value )'
            value='{{ _submitters }}' />
        </div>
      </div>
    </form>`
})
export class SubmitterFilterComponent
{
  //---------------------------------------------------------------------------
  
  @Output() FilterChanged = new EventEmitter();
  
  private _submitters: string = "";
  
  //---------------------------------------------------------------------------
  
  constructor()
  {
    this._submitters = Cookie.get( 'submitters' );
  }
  
  //---------------------------------------------------------------------------
  
  private setSubmitters( submitters: string )
  {
    Cookie.set( 'submitters', submitters );
    
    this.FilterChanged.emit( { submitters: submitters } );
  }
  
  //---------------------------------------------------------------------------
}