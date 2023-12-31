
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ClienteListarComponent } from "./pages/cliente/cliente-listar/cliente-listar.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";
import { ClienteCadastrarComponent } from "./pages/cliente/cliente-cadastrar/cliente-cadastrar.component";
import { ClienteAlterarComponent } from "./pages/cliente/cliente-alterar/cliente-alterar.component";

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { PacoteListarComponent } from "./pages/pacote/pacote-listar/pacote-listar.component";
import { PacoteCadastrarComponent } from "./pages/pacote/pacote-cadastrar/pacote-cadastrar.component";
import { PacoteAlterarComponent } from "./pages/pacote/pacote-alterar/pacote-alterar.component";
import { ReservaListarComponent } from "./pages/reserva/reserva-listar/reserva-listar.component";
import { ReservaCadastrarComponent } from "./pages/reserva/reserva-cadastrar/reserva-cadastrar.component";
import { ReservaAlterarComponent } from "./pages/reserva/reserva-alterar/reserva-alterar.component";
import {MatButtonToggleModule} from '@angular/material/button-toggle';



import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppComponent,
    ClienteListarComponent,
    ClienteCadastrarComponent,
    ClienteAlterarComponent,
    PacoteListarComponent,
    PacoteCadastrarComponent,
    PacoteAlterarComponent,
    ReservaCadastrarComponent,
    ReservaListarComponent,
    ReservaAlterarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatToolbarModule, 
    MatIconModule,
    MatButtonToggleModule, 
    MatIconModule,

    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {}
