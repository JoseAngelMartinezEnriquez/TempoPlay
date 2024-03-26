import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideFirebaseApp, initializeApp} from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { MainComponent } from './main/main';
import { RegistroComponent } from './registrousuario/registrousuario';
import { GeneralComponent } from './general/general';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbaruser.component';
import { reproductorComponent } from './reproductor/reproductor'
import { Mis_temposComponent } from './Mis_Tempos/Mis_Tempos';
import { PrincipalComponent } from './principal/principal';
import { HistorialComponent } from './historial/historial';
import { FavoritosComponent } from './favoritos/favoritos';
import { getStorage, provideStorage } from '@angular/fire/storage'

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RegistroComponent,
    GeneralComponent,
    NavbarComponent,
    reproductorComponent,
    Mis_temposComponent,
    PrincipalComponent,
    HistorialComponent,
    FavoritosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    AppRoutingModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
