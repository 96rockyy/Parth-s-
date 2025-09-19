
export enum RateCategory {
  DOMESTIC = 'TDS - Domestic Transactions',
  FOREIGN = 'TDS - Foreign Transactions',
  TCS = 'TCS - Tax Collected at Source'
}

export interface TdsRate {
  id: string;
  category: RateCategory;
  section?: string;
  code?: string;
  natureOfPayment: string;
  threshold: string;
  rate1Label?: string;
  rate1Value: string;
  rate2Label?: string;
  rate2Value?: string;
}
