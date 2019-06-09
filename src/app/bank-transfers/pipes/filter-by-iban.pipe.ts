import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterByIban' })
export class FilterByIBANPipe implements PipeTransform {
  transform(transfers: BankTransfer[], iban: string) {
    return transfers.filter(transfer =>
      transfer.iban.toLowerCase().includes(iban.toLowerCase())
    );
  }
}
