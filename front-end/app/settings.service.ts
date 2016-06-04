import {Injectable} from '@angular/core';

@Injectable()
export class SettingsService
{
  //---------------------------------------------------------------------------
  
  //-- Names & addresses.
  
  //public WebServerName: string = 'graeme';
  public WebServerName: string = 'graemepc';
  public WebServerPort: string = '3010';
  public ChangelistsHttpGetUrl: string = 'http://' + this.WebServerName + ':' + this.WebServerPort + '/changelists';
  public FileHttpGetUrl: string = 'http://' + this.WebServerName + ':' + this.WebServerPort + '/file';
  
  //-- Behaviour.
  
  public RefreshChangelistsRateInSecs = 120;
  
  //--------------------------------------------------------------------------- 
}