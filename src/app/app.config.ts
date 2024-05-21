import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, RouterModule, provideRouter, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreModule, provideState, provideStore } from '@ngrx/store';
import { TaskReducer } from '../../Store/Task/Task.Reducer';
import { provideEffects } from '@ngrx/effects';
import { TaskEffects } from '../../Store/Task/Task.Effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),provideHttpClient(withFetch()), provideAnimationsAsync(),provideStore(),provideState({name:'task',reducer:TaskReducer}),provideEffects(TaskEffects),  StoreDevtoolsModule]
};
