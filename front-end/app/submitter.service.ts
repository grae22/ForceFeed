import {Inject} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {SettingsService} from './settings.service';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';

export class SubmitterService
{
  //---------------------------------------------------------------------------
  
  public Submitters$: Observable<Array<string>>;

  private _submitters: Observer<string[]>;
    
  //-------------------------------------------------------------------------
    
  constructor(
    @Inject(Http) private _http: Http,
    @Inject(SettingsService) private _settings: SettingsService )
  {
    this.Submitters$ =
      new Observable( observer => this._submitters = observer ).share();
    
    this.Submitters$.subscribe( data => {} );
  }
  
  //---------------------------------------------------------------------------
  
  public getSubmitters()
  {
    // Set up and perform the request.
    let headers = new Headers({ 'Content-Type': 'text/plain; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });

    try
    {
      this._http.get(
        this._settings.SubmittersHttpGetUrl,
        headers )
          .map( res => JSON.parse( res.text() ) )
          .subscribe(
            data => this._submitters.next( data ),
            err => console.error( 'Submitter GET error(1): ' + err ),
            () => console.log( 'Submitter GET complete.' ) );
    }
    catch( error )
    {
      console.error( 'Submitter GET error(2): ' + error );
    }
  }
  
  //---------------------------------------------------------------------------  
}