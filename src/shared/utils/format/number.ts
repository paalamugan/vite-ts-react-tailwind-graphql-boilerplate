import { locale } from './locale';

interface INumberIntl {
  format(value: number | string, options?: Intl.NumberFormatOptions): string;
}

interface INumberIntlOptions {
  locale: string;
  fallback?: string;
}

class NumberIntl implements INumberIntl {
  readonly locale: string;
  readonly fallback: string;

  constructor({ locale, fallback }: INumberIntlOptions) {
    this.locale = locale;
    this.fallback = fallback ?? '---';
  }

  public format(value: number | string, options: Intl.NumberFormatOptions = {}): string {
    if (!this.isValid(value)) return this.fallback;

    return new Intl.NumberFormat(this.locale, options).format(Number(value));
  }

  private isValid(value: number | string): boolean {
    if (!value || Number.isNaN(value) || Number.isNaN(Number(value))) {
      return false;
    }

    return true;
  }
}

export const numberIntl = new NumberIntl({ locale });
