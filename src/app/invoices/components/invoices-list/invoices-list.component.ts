import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-invoices-list',
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.scss']
})
export class InvoicesListComponent implements OnInit {
  @Input() public invoiceList: InvoiceList;
  @Output() public onEdit: EventEmitter<number> = new EventEmitter();
  @Output() public onDelete: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    console.log(this.invoiceList);
  }

  public handleEditClick(id: number): void {
    this.onEdit.emit(id);
  }

  public handleDeleteClick(id: number): void {
    this.onDelete.emit(id);
  }
}
