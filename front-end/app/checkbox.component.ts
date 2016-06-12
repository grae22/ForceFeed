import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component(
{
  selector: 'checkbox',
  template: `
    <div class='checkbox'>
      <label> 
        <input
          #submitterCheckbox
          type='checkbox'
          (change)='onChange( $event )' />
          
          {{ Text }}
      </label>
    </div>
  `
})
export class CheckboxComponent
{
  //---------------------------------------------------------------------------
  
  @Input() Id: string;
  @Input() Text: string;
  @Output() Changed = new EventEmitter();
  
  public IsChecked = false;
  
  //---------------------------------------------------------------------------
  
  private onChange( event: Event )
  {
    this.IsChecked = event.target.checked;
    
    this.Changed.emit(
    {
      id: this.Id,
      checked: event.target.checked
    });
  }
  
  //---------------------------------------------------------------------------
}