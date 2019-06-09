import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  TemplateRef
} from '@angular/core';

@Component({
  selector: 'app-invoice-dialog',
  templateUrl: './invoice-dialog.component.html',
  styleUrls: ['./invoice-dialog.component.scss']
})
export class InvoiceDialogComponent implements OnInit {
  public isVisible = false;
  @Input() public invoice: Invoice;
  @Input() templateRef: TemplateRef<void>;
  @Output() public onClose: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  public show(): void {
    this.isVisible = true;
  }

  public hide(): void {
    this.isVisible = false;
    this.onClose.emit();
  }

  public toggle(): void {
    this.isVisible = !this.isVisible;
  }

  public handleCloseClick(): void {
    this.hide();
  }
}
