import {Component} from '@angular/core';
import {Http, ConnectionBackend} from '@angular/http';
import {ChangelistService} from './changelist.service';
import {ChangelistComponent} from './changelist.component';
import {SubmitterFilterComponent} from './submitterFilter.component';
import {Observable} from 'rxjs/Rx';
import {SettingsService} from './settings.service';

@Component(
{
  selector: 'my-app',
  template: `
    <div class='container'>
      <submitterFilter (FilterChanged)='setSubmitters( $event )'></submitterFilter>
    </div>
    <div class='container' *ngFor='let changelist of _changelists'>
      <changelist [data]='changelist'></changelist>
    </div>
  `,
  directives: [ChangelistComponent, SubmitterFilterComponent],
  providers: [ChangelistService, ConnectionBackend, SubmitterFilterComponent, SettingsService]
})
export class AppComponent
{
  //---------------------------------------------------------------------------
  
  private _changelists: ChangelistComponent[];
  private _submitters: string = '';
  
  //---------------------------------------------------------------------------
  
  constructor(
    private _changelistService: ChangelistService,
    private _http: Http,
    submitterFilter: SubmitterFilterComponent,
    settings: SettingsService )
  {
    this._submitters = submitterFilter.getSubmitters();
   
    this.refresh();

    // Set up an auto refresh routine.    
    Observable.interval( settings.RefreshChangelistsRateInSecs * 1000 )
      .subscribe( () => { this.refresh(); } );
  }
  
  //---------------------------------------------------------------------------
  
  public setSubmitters( event )
  {
    this._submitters = event.submitters;
    this.refresh();
  }
  
  //---------------------------------------------------------------------------
  
  public refresh()
  {
    this._changelistService.getChangelists(
      this._http,
      this._submitters );
    
    this._changelistService.Changlists$.subscribe(
      changelists => this._changelists = changelists );
  }
  
  //---------------------------------------------------------------------------
}