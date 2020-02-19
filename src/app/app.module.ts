import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FieldComponent } from './field/field.component';
import { BoxComponent } from './field/box/box.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FieldComponent,
    BoxComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
