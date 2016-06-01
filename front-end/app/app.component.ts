import {Component} from 'angular2/core';
import {Http, ConnectionBackend} from 'angular2/http';
import {ChangelistService} from './changelist.service';
import {ChangelistComponent} from './changelist.component';
import {SubmitterFilterComponent} from './submitterFilter.component';

@Component({
    selector: 'my-app',
    template: `
      <submitterFilter></submitterFilter>
      <div *ngFor='#changelist of _changelists'>
        <changelist [data]='changelist'></changelist>
      </div>
    `,
    directives: [ChangelistComponent, SubmitterFilterComponent],
    providers: [ChangelistService, SubmitterFilterComponent, ConnectionBackend]
})
export class AppComponent
{
  //---------------------------------------------------------------------------
  
  private _changelists: ChangelistComponent[];
  
  //---------------------------------------------------------------------------
  
  constructor(
    private _changelistService: ChangelistService,
    private _submitterFilter: SubmitterFilterComponent,
    private _http: Http )
  {
    this.Refresh();
  }
  
  //---------------------------------------------------------------------------
  
  public Refresh()
  {
    this._changelistService.getChangelists(
      this._http,
      this._submitterFilter );
    
    this._changelistService.Changlists$.subscribe(
      changelists => this._changelists = changelists );
  }
  
  //---------------------------------------------------------------------------
}