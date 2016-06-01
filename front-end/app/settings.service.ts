import {Injectable} from 'angular2/core';

@Injectable()
export class SettingsService
{
  //---------------------------------------------------------------------------
  
  public WebServerName: string = 'graeme';
  public WebServerPort: string = '3010';
  public ChangelistsHttpGetUrl: string = 'http://' + this.WebServerName + ':' + this.WebServerPort + '/changelists';
  
  //--------------------------------------------------------------------------- 
}