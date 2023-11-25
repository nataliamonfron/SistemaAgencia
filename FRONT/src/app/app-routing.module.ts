import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClienteListarComponent } from "./pages/cliente/cliente-listar/cliente-listar.component";
import { ClienteCadastrarComponent } from "./pages/cliente/cliente-cadastrar/cliente-cadastrar.component";
import { ClienteAlterarComponent } from "./pages/cliente/cliente-alterar/cliente-alterar.component";
import { PacoteListarComponent } from "./pages/pacote/pacote-listar/pacote-listar.component";

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
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
