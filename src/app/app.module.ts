import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InvoicesModule } from './invoices/invoices.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, InvoicesModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
