import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAnalytics, provideAnalytics, ScreenTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { HomePageComponent } from './ui/home-page/home-page.component';
import { GamePageComponent } from './ui/game-page/game-page.component';
import { BoardComponent } from './components/board/board.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    GamePageComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp({"projectId":"tic-tac-toe-51cff","appId":"1:7592516905:web:6faa58e0cf18011b39ab38","databaseURL":"https://tic-tac-toe-51cff-default-rtdb.europe-west1.firebasedatabase.app","storageBucket":"tic-tac-toe-51cff.appspot.com","locationId":"europe-west","apiKey":"AIzaSyCDPtuC_9NrXJJQPfvG6i7brWbPakl0Kk0","authDomain":"tic-tac-toe-51cff.firebaseapp.com","messagingSenderId":"7592516905","measurementId":"G-F4KVS30MBT"})),
    provideAnalytics(() => getAnalytics()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()),
    NgbModule
  ],
  providers: [
    provideClientHydration(),
    ScreenTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
