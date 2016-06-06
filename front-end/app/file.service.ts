import {Inject} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {SettingsService} from './settings.service';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';

export class FileService
{
  //---------------------------------------------------------------------------
  
  public Content: Observable<string>;

  private _content: Observer<string>;
    
  //-------------------------------------------------------------------------
    
  constructor(
    @Inject(Http) private _http: Http,
    @Inject(SettingsService) private _settings: SettingsService )
  {
    this.Content =
      new Observable( observer => this._content = observer ).share();
    
    this.Content.subscribe( data => {} );
  }
  
  //---------------------------------------------------------------------------
  
  public getFileContent( filename: string )
  {
    var responseData;
    
    let headers = new Headers({ 'Content-Type': 'text/plain; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });

    try
    {
      this._http.get(
        this._settings.FileHttpGetUrl + '?file=' + filename + ',1,2',
        headers )
          .map( res => res.text() )
          .subscribe(
            data => this._content.next( data ),
            err => console.error( 'File GET error(1): ' + err ),
            () => console.log( 'File GET complete.' ) );
    }
    catch( error )
    {
      console.error( 'File GET error(2): ' + error );
    }
  }
  
  //---------------------------------------------------------------------------
}