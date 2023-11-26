import { ReservaCadastrarComponent } from './pages/reserva/reserva-cadastrar/reserva-cadastrar.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClienteListarComponent } from "./pages/cliente/cliente-listar/cliente-listar.component";
import { ClienteCadastrarComponent } from "./pages/cliente/cliente-cadastrar/cliente-cadastrar.component";
import { ClienteAlterarComponent } from "./pages/cliente/cliente-alterar/cliente-alterar.component";
import { PacoteListarComponent } from "./pages/pacote/pacote-listar/pacote-listar.component";
import { ReservaListarComponent } from "./pages/reserva/reserva-listar/reserva-listar.component";
import { PacoteCadastrarComponent } from "./pages/pacote/pacote-cadastrar/pacote-cadastrar.component";
import { PacoteAlterarComponent } from "./pages/pacote/pacote-alterar/pacote-alterar.component";
import { ReservaAlterarComponent } from './pages/reserva/reserva-alterar/reserva-alterar.component';

const routes: Routes = [
  {
    path: "",
    component: ClienteListarComponent,
  },
  {
    path:"pages/cliente/listar",
    component: ClienteListarComponent,
  },
  {
    path: "pages/cliente/cadastrar",
    component: ClienteCadastrarComponent,
  },
  {
    path: "pages/cliente/alterar/:id",
    component: ClienteAlterarComponent,
  },
  {
    path:"pages/pacote/listar",
    component: PacoteListarComponent,
  },
  {
    path:"pages/pacote/cadastrar",
    component: PacoteCadastrarComponent,
  },
  {
    path:"pages/pacote/alterar/:id",
    component: PacoteAlterarComponent,
  },
  {
    path:"pages/reserva/listar",
    component: ReservaListarComponent,
  },
  {
    path:"pages/reserva/cadastrar",
    component: ReservaCadastrarComponent,
  },
  {
    path:"pages/reserva/alterar/:id",
    component: ReservaAlterarComponent,
  },

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
