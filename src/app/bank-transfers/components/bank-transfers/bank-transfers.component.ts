import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-bank-transfers',
  templateUrl: './bank-transfers.component.html',
  styleUrls: ['./bank-transfers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BankTransfersComponent implements OnInit {
  @Input() selected: BankTransfer;
  @Output() onBankTransferSelect: EventEmitter<
    BankTransfer
  > = new EventEmitter();

  public bankTransfersForm = this.fb.group({
    searchIban: ''
  });

  public transfers: BankTransfer[] = [
    {
      id: 1,
      amount: 200,
      iban: 'DE89-3704-0044-0532-0130-00',
      subject: 'January 2019'
    },
    {
      id: 2,
      amount: 300,
      iban: 'FR14-2004-1010-0505-0001-3M02-606',
      subject: 'February 2019'
    },
    {
      id: 3,
      amount: 100,
      iban: 'DE89-3704-0044-0532-0130-00',
      subject: 'February 2019'
    },
    {
      id: 4,
      amount: 200,
      iban: 'LU28-0019-4006-4475-0000',
      subject: 'March 2019'
    }
  ];

  private selectedTransfer: BankTransfer;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.selectedTransfer = this.selected;
  }

  public toggleTransfer(transfer: BankTransfer) {
    let newSelectedTransfer: BankTransfer = null;
    if (this.selectedTransfer !== transfer) {
      newSelectedTransfer = transfer;
    }

    this.selectedTransfer = newSelectedTransfer;
    this.onBankTransferSelect.emit(newSelectedTransfer);
  }

  public isSelected(transfer: BankTransfer): boolean {
    return this.selectedTransfer && this.selectedTransfer.id === transfer.id;
  }
}
