import {Http, Headers, RequestOptions} from '@angular/http';
import {Inject} from '@angular/core';
import 'rxjs/Rx';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';
import {ChangelistComponent} from './changelist.component';
import {SettingsService} from './settings.service';

export class ChangelistService
{
  //---------------------------------------------------------------------------
  
  public ChanglistDatas: Observable<Array<string>>;
  
  private _changelistDatasObserver: Observer<string[]>;
  
  //---------------------------------------------------------------------------
  
  constructor( @Inject(SettingsService) private _settingsService: SettingsService )
  {
    this.ChanglistDatas =
      new Observable( observer => this._changelistDatasObserver = observer ).share();
    
    this.ChanglistDatas.subscribe( data => {} );
  }
  
  //---------------------------------------------------------------------------
  
  public getChangelists(
    http: Http,
    submittters: string[],
    startIndex: number,
    maxCount: number  )
  {
    var responseData;
    
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });

    try
    {
      var whitespaceSeparatedSubmitters = '';
      submittters.forEach( s => whitespaceSeparatedSubmitters += s + ' ' );
      
      http.get(
        this._settingsService.ChangelistsHttpGetUrl +
          '?submitters=\'' + whitespaceSeparatedSubmitters + '\'' +
          '?startIndex=' + startIndex + '?maxCount=' + maxCount,
        headers )
          .map( res => JSON.parse( res.text() ) )
          .subscribe(
            data => this._changelistDatasObserver.next( data ),
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