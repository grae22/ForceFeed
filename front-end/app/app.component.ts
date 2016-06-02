import {Component} from 'angular2/core';
import {Http, ConnectionBackend} from 'angular2/http';
import {ChangelistService} from './changelist.service';
import {ChangelistComponent} from './changelist.component';
import {SubmitterFilterComponent} from './submitterFilter.component';

@Component({
    selector: 'my-app',
    template: `
      <div>
        <submitterFilter (FilterChanged)='Refresh( $event )'></submitterFilter>
      </div>
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
    this.Refresh( { submitters: '' } );
  }
  
  //---------------------------------------------------------------------------
  
  public Refresh( event )
  {
    this._changelistService.getChangelists(
      this._http,
      event.submitters );
    
    this._changelistService.Changlists$.subscribe(
      changelists => this._changelists = changelists );
  }
  
  //---------------------------------------------------------------------------
}