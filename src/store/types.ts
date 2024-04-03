export interface CurrencyRatesInterface {
  USD: {
    RUB: number;
  };
  RUB: {
    USD: number;
  };
}

export interface CurrencyStateInterface {
  rates: CurrencyRatesInterface;
}
