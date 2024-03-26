import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main';
import { RegistroComponent } from './registrousuario/registrousuario';
import { GeneralComponent } from './general/general';
import { NavbarComponent } from './navbar/navbaruser.component';
import { reproductorComponent} from './reproductor/reproductor';
import { Mis_temposComponent } from './Mis_Tempos/Mis_Tempos';
import { PrincipalComponent } from './principal/principal';
import { HistorialComponent } from './historial/historial';
import { FavoritosComponent } from './favoritos/favoritos';

const routes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'general', component: GeneralComponent},
  {path: 'reproductor', component: reproductorComponent},
  {path: 'Mis_Tempos', component:Mis_temposComponent},
  {path: 'principal', component:PrincipalComponent},
  {path: 'historial', component:HistorialComponent},
  {path: 'favoritos', component:FavoritosComponent},
  {path: '**', redirectTo: '/main'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
