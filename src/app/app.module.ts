import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import localeEsAr from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { interceptorProvider } from './shared/http.interceptor';


registerLocaleData( localeEsAr );


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    SharedModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-Ar' },interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
