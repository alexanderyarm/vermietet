import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { InvoicesListComponent } from './components/invoices-list/invoices-list.component';
import { InvoiceListItemComponent } from './components/invoice-list-item/invoice-list-item.component';
import { InvoiceDialogComponent } from './components/invoice-dialog/invoice-dialog.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { BankTransfersModule } from '../bank-transfers/bank-transfers.module';

@NgModule({
  declarations: [
    InvoicesComponent,
    InvoicesListComponent,
    InvoiceListItemComponent,
    InvoiceDialogComponent,
    InvoiceFormComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, BankTransfersModule],
  exports: [InvoicesComponent]
})
export class InvoicesModule {}
