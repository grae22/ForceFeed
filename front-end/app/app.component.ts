import {Component, ViewChildren, QueryList, ViewChild} from '@angular/core';
import {Http, ConnectionBackend} from '@angular/http';
import {ChangelistService} from './changelist.service';
import {ChangelistComponent} from './changelist.component';
import {Observable} from 'rxjs/Rx';
import {SettingsService} from './settings.service';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {SubmitterListComponent} from './submitterList.component';

@Component(
{
  selector: 'my-app',
  templateUrl: './app/app.component.html',
  directives: [ChangelistComponent, SubmitterListComponent],
  providers: [
    ChangelistService,
    ConnectionBackend,
    SettingsService
  ]
})
export class AppComponent
{
  //---------------------------------------------------------------------------

  @ViewChildren( ChangelistComponent ) Changelists: QueryList<ChangelistComponent>;
  @ViewChild( SubmitterListComponent ) SubmitterList: SubmitterListComponent;
  
  private _changelistDatas: string[];
  private _submitters = [];
  private _isAnyChangelistComponentExpanded = false;
  private _paginationText = '0';
  private _paginationStartIndex = 0;
  private _paginationMaxCount = 30;
  private _paginationCounts = [ 20, 30, 40, 75, 100 ];
  private _paginationCountIndex = 1;
  
  //---------------------------------------------------------------------------
  
  constructor(
    private _changelistService: ChangelistService,
    private _http: Http,
    settings: SettingsService )
  {
    // Get the pagination count if there's one.
    var countIndex = parseInt( Cookie.get( 'paginationCountIndex' ) );

    if( countIndex != NaN &&
        countIndex > -1 &&
        countIndex < this._paginationCounts.length )
    {
      this.setPaginationMaxCount( countIndex );
    }
    
    // Refresh the changelists.
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
  
  private onSubmitterSelectionChanged( event: Event )
  {
    this._submitters = event.submitters;
    this.refresh();
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

  private paginationOnFirstClick()
  {
    this._paginationStartIndex = 0;
    this.refresh();
  }
  
  //---------------------------------------------------------------------------

  private paginationOnLessClick()
  {
    this.setPaginationMaxCount( this._paginationCountIndex - 1 );

    this.refresh();
  }
  
  //---------------------------------------------------------------------------

  private paginationOnMoreClick()
  {
    this.setPaginationMaxCount( this._paginationCountIndex + 1 );

    this.refresh();
  }
  
  //---------------------------------------------------------------------------
  
  private setPaginationMaxCount( index: number )
  {
    if( index > -1 && index < this._paginationCounts.length )
    {
      this._paginationCountIndex = index;
      this._paginationMaxCount = this._paginationCounts[ index ];

      Cookie.set(
        'paginationCountIndex',
        this._paginationCountIndex.toString(),
        100 );
    }
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