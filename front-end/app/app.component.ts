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
  templateUrl: './app/app.component.html',
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
  private _paginationText = '0';
  private _paginationStartIndex = 0;
  private _paginationMaxCount = 30;
  
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
      this._submitters,
      this._paginationStartIndex,
      this._paginationMaxCount );
    
    this._changelistService.ChanglistDatas.subscribe(
      changelists => this._changelistDatas = changelists );

    this.updatePaginationText();
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

  private paginationOnNextClick()
  {
    if( this._changelistDatas.length < this._paginationMaxCount )
    {
      return;
    }

    this._paginationStartIndex += this._paginationMaxCount;
    this.refresh();
  }

  //---------------------------------------------------------------------------

  private paginationOnPreviousClick()
  {
    this._paginationStartIndex -= this._paginationMaxCount;

    if( this._paginationStartIndex < 0 )
    {
      this._paginationStartIndex = 0;
    }

    this.refresh();
  }

  //---------------------------------------------------------------------------

  private updatePaginationText()
  {
    this._paginationText =
      ( this._paginationStartIndex + 1 ) + ' to ' +
      ( this._paginationStartIndex + this._paginationMaxCount );
  }

  //---------------------------------------------------------------------------
}