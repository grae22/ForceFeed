import {Component, ViewChildren, QueryList} from '@angular/core';
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
    <!-- Entire page -->
    <div
      class='row'
      style='padding: 5px 0px 0px 0px'>

      <!-- Left pane -->
      <div class='col-sm-2'>
        <i
          class='glyphicon glyphicon-grain'
          style='font-size: 40px; color: white;'>
        </i>
        <b style='font-size: 14px'><font size="+1">F</font>orce<font size="+1">F</font>eed</b>
      </div>
      <!-- Right pane -->
      <div
        class='container col-sm-8'
        style='padding: 20px 0px 0px 0px'>

        <!-- Submitter filter -->
        <div>
          <submitterFilter (FilterChanged)='setSubmitters( $event )'></submitterFilter>
        </div>
        <!-- Changelists -->
        <div>
          <div
            style='padding: 0px 0px 10px 0px'
            class='container'>
            <span>&nbsp;</span>
            <span
              style='cursor: pointer;'
              *ngIf='_isAnyChangelistComponentExpanded == true'
              (click)='refresh()'>

              <i class='glyphicon glyphicon-refresh'></i>
              <span
                class='text-center'
                style='color: #606060;'>
                  Changelists will not be refreshed while any changelist is expanded.
              </span>
            </span>
          </div>
          <div
            class='container'
            *ngFor='let changelistData of _changelistDatas'>
              <changelist [data]='changelistData'></changelist>
          </div>
        </div>
      </div>
    </div>
  `,
  directives: [ChangelistComponent, SubmitterFilterComponent],
  providers: [ChangelistService, ConnectionBackend, SubmitterFilterComponent, SettingsService]
})
export class AppComponent
{
  //---------------------------------------------------------------------------

  @ViewChildren( ChangelistComponent ) Changelists: QueryList<ChangelistComponent>;
  
  private _changelistDatas: string[];
  private _submitters = '';
  private _isAnyChangelistComponentExpanded = false;
  
  //---------------------------------------------------------------------------
  
  constructor(
    private _changelistService: ChangelistService,
    private _http: Http,
    submitterFilter: SubmitterFilterComponent,
    settings: SettingsService )
  {
    this._submitters = submitterFilter.getSubmitters();
   
    this.refresh();

    // Set up an periodic check if any changelist components are expanded.
    Observable.interval( 500 ).subscribe( () => this.checkForExpandedChangelistComponents() )

    // Set up an auto refresh routine.    
    Observable.interval( settings.RefreshChangelistsRateInSecs * 1000 )
      .subscribe( () => this.autoRefresh() );
  }
  
  //---------------------------------------------------------------------------
  
  public setSubmitters( event )
  {
    this._submitters = event.submitters;
    this.refresh();
  }
  
  //---------------------------------------------------------------------------
  
  private refresh()
  {
    this._changelistService.getChangelists(
      this._http,
      this._submitters );
    
    this._changelistService.ChanglistDatas.subscribe(
      changelists => this._changelistDatas = changelists );
  }
  
  //---------------------------------------------------------------------------

  private checkForExpandedChangelistComponents()
  {
    this._isAnyChangelistComponentExpanded = false;

    for( var changelistComponent of this.Changelists.toArray() )
    {
      if( changelistComponent._isExpanded )
      {
        this._isAnyChangelistComponentExpanded = true;
        break;
      }
    }
  }

  //---------------------------------------------------------------------------

  private autoRefresh()
  {
    // Don't refresh if any changelists are expanded.
    if( this._isAnyChangelistComponentExpanded == false )
    {
      this.refresh();
    }
  }

  //---------------------------------------------------------------------------
}