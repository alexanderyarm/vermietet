import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-invoice-list-item',
  templateUrl: './invoice-list-item.component.html',
  styleUrls: ['./invoice-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceListItemComponent implements OnInit {
  @Input() public invoice: Invoice;
  @Output() public onDelete: EventEmitter<number> = new EventEmitter();
  @Output() public onEdit: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  public get subject(): string {
    return this.isBankTransferConnected()
      ? this.invoice.bankTransfer.subject
      : this.invoice.subject;
  }

  public get amount(): number {
    return this.isBankTransferConnected()
      ? this.invoice.bankTransfer.amount
      : this.invoice.amount;
  }

  public get iban(): string {
    return this.isBankTransferConnected() ? this.invoice.bankTransfer.iban : '';
  }

  public isBankTransferConnected(): boolean {
    return Boolean(this.invoice.bankTransfer);
  }

  public handleEditClick(): void {
    this.onEdit.emit(this.invoice.id);
  }

  public handleDeleteClick(): void {
    // send request to the backend
    // show loading animation and hide it when recieve request response

    this.onDelete.emit(this.invoice.id);
  }
}
