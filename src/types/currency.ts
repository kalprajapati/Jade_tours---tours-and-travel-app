export type TravelCurrencyCode = "AED" | "THB" | "SGD" | "IDR" | "EUR" | "MVR";

export interface TravelCurrencyDestination {
  id: string;
  name: string;
  country: string;
  currencyCode: TravelCurrencyCode;
  flagSrc: string;
}

export type TravelCurrencyRates = Record<TravelCurrencyCode, number>;

export interface TravelCurrencyRateResult {
  rates: TravelCurrencyRates;
  lastUpdated: string;
  fromCache: boolean;
  isStale: boolean;
}

export interface ExchangeRateApiResponse {
  result: "success" | "error";
  base_code: string;
  time_last_update_unix: number;
  rates: Record<string, number>;
}
