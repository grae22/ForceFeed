import {Component} from 'angular2/core';
import {Http, ConnectionBackend} from 'angular2/http';
import {ChangelistService} from './changelist.service';
import {ChangelistComponent} from './changelist.component';

@Component({
    selector: 'my-app',
    template: `
      <div *ngFor='#changelist of _changelists'>
        <changelist [data]='changelist'></changelist>
      </div>
    `,
    directives: [ChangelistComponent],
    providers: [ChangelistService, ConnectionBackend]
})
export class AppComponent
{
  //---------------------------------------------------------------------------
  
  private _changelists: ChangelistComponent[];
  
  //---------------------------------------------------------------------------
  
  constructor(
    private _changelistService: ChangelistService,
    http: Http )
  {
    _changelistService.getChangelists( http );
    
    _changelistService.Changlists$.subscribe( changelists => this._changelists = changelists );
  }
  
  //---------------------------------------------------------------------------
}