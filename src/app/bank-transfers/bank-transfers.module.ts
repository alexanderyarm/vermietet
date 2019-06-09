import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankTransfersComponent } from './components/bank-transfers/bank-transfers.component';
import { FilterByIBANPipe } from './pipes/filter-by-iban.pipe';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BankTransfersComponent, FilterByIBANPipe],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [BankTransfersComponent]
})
export class BankTransfersModule {}
