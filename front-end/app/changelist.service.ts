import {Http, Headers, RequestOptions} from 'angular2/http';
import {Inject} from 'angular2/core';
import 'rxjs/Rx';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';
import {ChangelistComponent} from './changelist.component';
import {SettingsService} from './settings.service';
import {SubmitterFilterComponent} from './submitterFilter.component';

export class ChangelistService
{
  //---------------------------------------------------------------------------
  
  public Changlists$: Observable<Array<ChangelistComponent>>;
  
  private _changelistsObserver: Observer<ChangelistComponent[]>;
  
  //---------------------------------------------------------------------------
  
  constructor( @Inject(SettingsService) private _settingsService: SettingsService )
  {
    this.Changlists$ =
      new Observable( observer =>  this._changelistsObserver = observer ).share();
    
    this.Changlists$.subscribe( data => {} );
  }
  
  //---------------------------------------------------------------------------
  
  public getChangelists(
    http: Http,
    submitterFilter: SubmitterFilterComponent )
  {
    var responseData;
    
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });

    try
    {
      http.get(
        this._settingsService.ChangelistsHttpGetUrl + '?submitters=\'' + submitterFilter.Submitters + '\'',
        headers )
          .map( res => JSON.parse( res.text() ) )
          .subscribe(
            data => this._changelistsObserver.next( data ),
            err => console.error( 'ERR: ' + err ),
            () => console.log( 'INF: Get complete.' ) );
    }
    catch( error )
    {
      console.error( error );
    }
  }
  
  //---------------------------------------------------------------------------
}