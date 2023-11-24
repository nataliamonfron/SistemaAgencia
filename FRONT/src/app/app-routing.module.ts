import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClienteListarComponent } from "./pages/cliente/cliente-listar/cliente-listar.component";
import { ClienteCadastrarComponent } from "./pages/cliente/cliente-cadastrar/cliente-cadastrar.component";
import { ClienteAlterarComponent } from "./pages/cliente/cliente-alterar/cliente-alterar.component";

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
    path: "pages/cliente/alterar",
    component: ClienteAlterarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
