import {bootstrap}    from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {AppComponent} from './app.component';
import {SettingsService} from './settings.service';

bootstrap( AppComponent, [HTTP_PROVIDERS, SettingsService] );