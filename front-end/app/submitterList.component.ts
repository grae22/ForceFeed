import {Component} from '@angular/core';
import {SubmitterService} from './submitter.service';

@Component(
{
  selector: 'submitterList',
  template: `
    <div class='container'>
      Submitters
      <div
        class='row'
        *ngFor='let submitter of _submitters'>
        
        {{ submitter }}
      </div>
    </div>
  `,
  styles: ['./app/submitterList.component.css'],
  providers: [SubmitterService]
})
export class SubmitterListComponent
{
  //---------------------------------------------------------------------------
  
  private _submitters: string[];
  
  //---------------------------------------------------------------------------
  
  constructor( private _submitterService: SubmitterService )
  {
    _submitterService.Submitters$.subscribe(
      submitters => this._submitters = submitters ); 
    
    _submitterService.getSubmitters();
  }
  
  //---------------------------------------------------------------------------
}