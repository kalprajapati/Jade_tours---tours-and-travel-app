"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertCircle, Banknote, RefreshCcw, Sparkles } from "lucide-react";
import {
  fetchTravelCurrencyRates,
  travelCurrencyDestinations,
} from "@/lib/currency";
import type { TravelCurrencyRateResult } from "@/types/currency";

const DEFAULT_INR_AMOUNT = "50000";

function formatTravelCurrency(value: number, currencyCode: string) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: currencyCode === "IDR" ? 0 : 2,
  }).format(value);
}

function formatLastUpdated(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function TravelCurrencyGuide() {
  const [amount, setAmount] = useState(DEFAULT_INR_AMOUNT);
  const [rateResult, setRateResult] = useState<TravelCurrencyRateResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const numericAmount = useMemo(() => {
    const parsed = Number(amount);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  }, [amount]);

  const loadRates = async (signal?: AbortSignal) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const result = await fetchTravelCurrencyRates(signal);
      setRateResult(result);

      if (result.isStale) {
        setErrorMessage("Live rates are unavailable, so showing the last saved estimate.");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      setErrorMessage("Currency estimates are temporarily unavailable. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    void loadRates(controller.signal);

    return () => controller.abort();
  }, []);

  return (
    <section id="currency-guide" className="py-16 lg:py-24 bg-[#FDFCF7]/30 scroll-mt-24 border-b border-gray-50">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 lg:mb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <Sparkles className="w-6 h-6 text-[#C1A67B] fill-[#C1A67B]/10" />
              <span className="text-[#C1A67B] font-sans font-bold uppercase tracking-[0.4em] text-[11px] lg:text-[12px]">
                Trip Planner
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-sans font-black text-gray-900 tracking-tight leading-tight">
              Travel Currency Guide
            </h2>
            <p className="text-[15px] lg:text-lg text-gray-500 leading-relaxed max-w-2xl font-medium mt-5 mb-0">
              Get an approximate idea of local currency value before planning your trip.
            </p>
          </div>

          <div className="bg-white p-4 lg:p-5 rounded-2xl lg:rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] w-full lg:max-w-sm">
            <label htmlFor="inr-amount" className="text-[9px] lg:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
              Amount in INR
            </label>
            <div className="relative mt-2">
              <Banknote className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary opacity-50" />
              <input
                id="inr-amount"
                name="inr-amount"
                type="number"
                min="0"
                inputMode="decimal"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                className="w-full bg-gray-50/50 border border-gray-100 rounded-[14px] h-12 pl-11 pr-4 text-sm font-black text-gray-950 focus:outline-none focus:border-primary/30 focus:bg-white transition-all placeholder:text-gray-400"
                placeholder="50000"
                aria-describedby="currency-guide-status"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {travelCurrencyDestinations.map((destination) => {
            const convertedValue = rateResult
              ? numericAmount * rateResult.rates[destination.currencyCode]
              : 0;

            return (
              <article
                key={destination.id}
                className="bg-white p-6 lg:p-8 rounded-2xl lg:rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-primary/20 transition-all duration-700 group"
              >
                <div className="flex items-start justify-between gap-5">
                  <div className="flex items-center gap-4">
                    <div
                      role="img"
                      aria-label={`${destination.country} flag`}
                      className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 shadow-sm bg-gray-50 bg-cover bg-center shrink-0"
                      style={{ backgroundImage: `url(${destination.flagSrc})` }}
                    />
                    <div>
                      <h3 className="text-xl lg:text-2xl font-black text-gray-950 tracking-tight group-hover:text-primary transition-colors duration-500 mb-1">
                        {destination.name}
                      </h3>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-0">
                        {destination.currencyCode}
                      </p>
                    </div>
                  </div>

                  {isLoading && (
                    <RefreshCcw className="w-4 h-4 text-primary animate-spin mt-1" aria-hidden="true" />
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">
                    Approximate value
                  </p>
                  <p className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight mb-0">
                    {rateResult ? formatTravelCurrency(convertedValue, destination.currencyCode) : "--"}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div
          id="currency-guide-status"
          className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] lg:text-xs font-bold text-gray-400"
          aria-live="polite"
        >
          <div className="flex items-center gap-2">
            {errorMessage && <AlertCircle className="w-4 h-4 text-[#E67E22]" aria-hidden="true" />}
            <span>
              {errorMessage ||
                (isLoading
                  ? "Fetching latest travel currency estimates..."
                  : "Values are estimates and may vary at the time of booking.")}
            </span>
          </div>

          {rateResult && (
            <span className="uppercase tracking-[0.18em]">
              Last updated: {formatLastUpdated(rateResult.lastUpdated)}
              {rateResult.fromCache ? " (cached)" : ""}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
