import { getLocale, locale } from './locale';

interface IMoneyIntl {
  format(value: string | number, currency?: string): string;
}

interface IMoneyIntlOptions {
  locale: string;
  currency: string;
  fallback?: string;
}

class MoneyIntl implements IMoneyIntl {
  readonly locale: string;
  readonly currency: string;
  readonly fallback: string;

  constructor({ locale, currency, fallback }: IMoneyIntlOptions) {
    this.locale = locale;
    this.currency = currency;
    this.fallback = fallback ?? '---';
  }

  public format(value: number | string, currency = this.currency): string {
    if (!this.isValid(value)) return this.fallback;

    return new Intl.NumberFormat(this.locale, {
      currency,
      currencyDisplay: 'symbol',
      minimumFractionDigits: 2,
      style: 'currency',
    }).format(Number(value));
  }

  private isValid(value: number | string): boolean {
    if (!value || Number.isNaN(value) || Number.isNaN(Number(value))) {
      return false;
    }

    return true;
  }
}

export const moneyIntl = new MoneyIntl({
  currency: getLocale().defaultCurrency,
  locale,
});
