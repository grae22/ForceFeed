import {Component, Inject} from 'angular2/core';

@Component(
{
  selector: 'submitterFilter',
  template: `
    <div>
      <span>Submitters: <input #box class='textbox' type='text' (keyup.enter)='setSubmitters( box.value )' /></span>
    </div>`
})
export class SubmitterFilterComponent
{
  public Submitters: string;
  
  private setSubmitters( submitters: string )
  {
    this.Submitters = submitters;
    //this._app.Refresh();
  }
}