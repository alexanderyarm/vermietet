import { Component, OnInit, ViewChild } from '@angular/core';
import { InvoiceDialogComponent } from '../invoice-dialog/invoice-dialog.component';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {
  public invoiceList: InvoiceList = [
    {
      id: 1,
      date: '2019-01-01',
      subject: 'Invoice #1',
      retrieveFromBankAccount: false,
      bankTransfer: null,
      amount: 300
    },
    {
      id: 2,
      date: '2019-01-02',
      retrieveFromBankAccount: true,
      bankTransfer: {
        id: 3,
        amount: 100,
        iban: 'DE89-3704-0044-0532-0130-00',
        subject: 'February 2019'
      }
    }
  ];

  public editInvoiceEntry: Invoice;

  @ViewChild(InvoiceDialogComponent)
  private invoiceDialog: InvoiceDialogComponent;

  constructor() {}

  public ngOnInit() {}

  public openDialog(): void {
    this.invoiceDialog.show();
  }

  public onDialogClose(): void {
    this.resetEditEntry();
  }

  public addNewInvoice(): void {
    this.resetEditEntry();
    this.openDialog();
  }

  public onInvoiceSubmit(submittedInvoice: Invoice): void {
    if (this.editInvoiceEntry) {
      this.invoiceList = this.invoiceList.map((invoice: Invoice) => {
        return invoice.id === submittedInvoice.id ? submittedInvoice : invoice;
      });
    } else {
      this.invoiceList.push(submittedInvoice);
      console.log(submittedInvoice);
    }

    this.invoiceDialog.hide();
  }

  public onEditInvoice(id: number): void {
    this.editInvoiceEntry = this.invoiceList
      .filter((invoice: Invoice) => invoice.id === id)
      .shift();

    this.openDialog();
  }

  public onDeleteInvoice(id: number): void {
    this.invoiceList = this.invoiceList.filter(
      (invoice: Invoice) => invoice.id !== id
    );
  }

  private resetEditEntry(): void {
    this.editInvoiceEntry = null;
  }
}
