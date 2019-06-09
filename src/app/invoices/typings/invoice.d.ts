declare interface Invoice {
  id: number;
  date: string;
  subject?: string;
  retrieveFromBankAccount: boolean;
  amount?: number;
  bankTransfer: BankTransfer;
}

declare type InvoiceList = Invoice[];
