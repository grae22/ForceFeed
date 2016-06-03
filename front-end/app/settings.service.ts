import {Injectable} from '@angular/core';

@Injectable()
export class SettingsService
{
  //---------------------------------------------------------------------------
  
  public WebServerName: string = 'graeme';
  //public WebServerName: string = 'graemepc';
  public WebServerPort: string = '3010';
  public ChangelistsHttpGetUrl: string = 'http://' + this.WebServerName + ':' + this.WebServerPort + '/changelists';
  
  //--------------------------------------------------------------------------- 
}