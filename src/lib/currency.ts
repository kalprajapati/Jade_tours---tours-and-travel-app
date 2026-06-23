import type {
  ExchangeRateApiResponse,
  TravelCurrencyDestination,
  TravelCurrencyRateResult,
  TravelCurrencyRates,
} from "@/types/currency";

const EXCHANGE_RATE_API_URL = "https://open.er-api.com/v6/latest/INR";
const CACHE_KEY = "jade-travel-currency-rates";
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

export const travelCurrencyDestinations: TravelCurrencyDestination[] = [
  {
    id: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    currencyCode: "AED",
    flagSrc: "https://flagcdn.com/ae.svg",
  },
  {
    id: "thailand",
    name: "Thailand",
    country: "Thailand",
    currencyCode: "THB",
    flagSrc: "https://flagcdn.com/th.svg",
  },
  {
    id: "singapore",
    name: "Singapore",
    country: "Singapore",
    currencyCode: "SGD",
    flagSrc: "https://flagcdn.com/sg.svg",
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    currencyCode: "IDR",
    flagSrc: "https://flagcdn.com/id.svg",
  },
  {
    id: "europe",
    name: "Europe",
    country: "European Union",
    currencyCode: "EUR",
    flagSrc: "https://flagcdn.com/eu.svg",
  },
  {
    id: "maldives",
    name: "Maldives",
    country: "Maldives",
    currencyCode: "MVR",
    flagSrc: "https://flagcdn.com/mv.svg",
  },
];

interface CachedCurrencyRates extends TravelCurrencyRateResult {
  cachedAt: number;
}

let memoryCache: CachedCurrencyRates | null = null;

function readCachedRates(): CachedCurrencyRates | null {
  if (memoryCache) {
    return memoryCache;
  }

  if (typeof window === "undefined") {
    return null;
  }

  try {
    const cached = window.localStorage.getItem(CACHE_KEY);
    if (!cached) {
      return null;
    }

    memoryCache = JSON.parse(cached) as CachedCurrencyRates;
    return memoryCache;
  } catch {
    window.localStorage.removeItem(CACHE_KEY);
    return null;
  }
}

function writeCachedRates(result: TravelCurrencyRateResult): CachedCurrencyRates {
  const cached: CachedCurrencyRates = {
    ...result,
    cachedAt: Date.now(),
  };

  memoryCache = cached;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(cached));
  }

  return cached;
}

function isCacheFresh(cached: CachedCurrencyRates): boolean {
  return Date.now() - cached.cachedAt < CACHE_TTL_MS;
}

function pickDestinationRates(rates: Record<string, number>): TravelCurrencyRates {
  return travelCurrencyDestinations.reduce((acc, destination) => {
    const rate = rates[destination.currencyCode];

    if (typeof rate !== "number") {
      throw new Error(`Missing ${destination.currencyCode} exchange rate`);
    }

    acc[destination.currencyCode] = rate;
    return acc;
  }, {} as TravelCurrencyRates);
}

export async function fetchTravelCurrencyRates(
  signal?: AbortSignal
): Promise<TravelCurrencyRateResult> {
  const cached = readCachedRates();

  if (cached && isCacheFresh(cached)) {
    return {
      rates: cached.rates,
      lastUpdated: cached.lastUpdated,
      fromCache: true,
      isStale: false,
    };
  }

  try {
    const response = await fetch(EXCHANGE_RATE_API_URL, {
      signal,
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Unable to fetch exchange rates");
    }

    const data = (await response.json()) as ExchangeRateApiResponse;

    if (data.result !== "success" || data.base_code !== "INR") {
      throw new Error("Unexpected exchange rate response");
    }

    const result: TravelCurrencyRateResult = {
      rates: pickDestinationRates(data.rates),
      lastUpdated: new Date(data.time_last_update_unix * 1000).toISOString(),
      fromCache: false,
      isStale: false,
    };

    return writeCachedRates(result);
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }

    if (cached) {
      return {
        rates: cached.rates,
        lastUpdated: cached.lastUpdated,
        fromCache: true,
        isStale: true,
      };
    }

    throw error;
  }
}
