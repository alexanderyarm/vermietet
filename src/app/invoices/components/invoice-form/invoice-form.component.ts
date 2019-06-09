import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';

type InvoiceTabs = 'INFO' | 'PAYMENT';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceFormComponent implements OnInit {
  @Input() public invoice: Invoice;
  @Output() public onInvoiceSubmit: EventEmitter<Invoice> = new EventEmitter();
  public currentStep: InvoiceTabs = 'INFO';

  public invoiceForm = this.fb.group({
    date: ['', [Validators.required]],
    subject: ['', [Validators.required]],
    retrieveFromBankAccount: false,
    amount: [null, [this.amountValidator.bind(this)]],
    bankTransfer: [null, [this.bankTransferValidator.bind(this)]]
  });

  constructor(public fb: FormBuilder) {}

  ngOnInit() {
    this.invoiceForm
      .get('retrieveFromBankAccount')
      .valueChanges.subscribe(this.onRetrieveFromBankAccountChange.bind(this));

    if (this.invoice) {
      const subject = this.invoice.retrieveFromBankAccount
        ? this.invoice.bankTransfer.subject
        : this.invoice.subject;
      const amount = this.invoice.retrieveFromBankAccount
        ? this.invoice.bankTransfer.amount
        : this.invoice.amount;

      this.invoiceForm.patchValue({
        date: this.invoice.date,
        retrieveFromBankAccount: this.invoice.retrieveFromBankAccount,
        bankTransfer: this.invoice.bankTransfer,
        subject,
        amount
      });
    }
  }

  public submit(): void {
    if (!this.invoiceForm.valid) {
      return null;
    }

    const id = this.invoice
      ? this.invoice.id
      : Math.floor(Math.random() * 1000000);

    this.onInvoiceSubmit.emit({
      id,
      date: this.invoiceForm.get('date').value,
      subject: this.invoiceForm.get('subject').value,
      retrieveFromBankAccount: this.invoiceForm.get('retrieveFromBankAccount')
        .value,
      amount: this.invoiceForm.get('amount').value,
      bankTransfer: this.invoiceForm.get('bankTransfer').value
    });
  }

  public goToTab(tabName: InvoiceTabs): void {
    this.currentStep = tabName;
  }

  public onBankTransferSelect(bankTransfer: BankTransfer): void {
    this.invoiceForm.patchValue({
      bankTransfer
    });
  }

  public showTabContent(tabName: InvoiceTabs): boolean {
    return this.currentStep === tabName;
  }

  public isTabActive(tabName): boolean {
    return this.currentStep === tabName;
  }

  public isRetrieveFromBankAccount(): boolean {
    return this.invoiceForm.get('retrieveFromBankAccount').value;
  }

  public showNextButton(): boolean {
    return this.currentStep === 'INFO' && this.isRetrieveFromBankAccount();
  }

  public showDoneButton(): boolean {
    return (
      (this.currentStep === 'INFO' && !this.isRetrieveFromBankAccount()) ||
      this.currentStep === 'PAYMENT'
    );
  }

  private onRetrieveFromBankAccountChange(value: boolean): void {
    if (!value) {
      this.invoiceForm.patchValue({
        bankTransfer: null
      });
    }

    this.invoiceForm.get('amount').updateValueAndValidity();
    this.invoiceForm.get('bankTransfer').updateValueAndValidity();
  }

  private amountValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    if (
      this.invoiceForm &&
      !this.isRetrieveFromBankAccount() &&
      !this.invoiceForm.get('amount').value
    ) {
      return {
        required: true
      };
    }

    return null;
  }

  private bankTransferValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    if (
      this.invoiceForm &&
      this.isRetrieveFromBankAccount() &&
      !this.invoiceForm.get('bankTransfer').value
    ) {
      return {
        required: true
      };
    }

    return null;
  }
}
