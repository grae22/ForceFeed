import {bootstrap}    from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {AppComponent} from './app.component';
import {SettingsService} from './settings.service';

bootstrap( AppComponent, [HTTP_PROVIDERS, SettingsService, AppComponent] );