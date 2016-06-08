import {Component, Inject, Output, EventEmitter} from '@angular/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Component(
{
  selector: 'submitterFilter',
  template: `
    <form class='form-horizontal'>
      <div class='form-group form-group-sm'>
        <label class='col-sm-1 control-label' for='submitters'><b>Submitters:</b></label>
        <div class='col-sm-10'>
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
  
  private _submitters: string = '';
  
  //---------------------------------------------------------------------------
  
  constructor()
  {
    let submitters: string = Cookie.get( 'submitters' );
     
    this._submitters = ( submitters == null ? '' : submitters ); 
  }
  
  //---------------------------------------------------------------------------
  
  private setSubmitters( submitters: string )
  {
    this._submitters = submitters;
    
    Cookie.set( 'submitters', submitters );
    
    this.FilterChanged.emit( { submitters: submitters } );
  }
  
  //---------------------------------------------------------------------------
  
  public getSubmitters() : string
  {
    return this._submitters;
  }
  
  //---------------------------------------------------------------------------
}