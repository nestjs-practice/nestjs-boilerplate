import dateFns from 'date-fns';

export class DateUtil {
  static format(date: Date): string;
  static format(format: string): string;
  static format(date: Date, format: string): string;
  static format(date: Date | string, format?: string): string {
    [date, format] =
      typeof date === 'string' ? [new Date(), date] : [date, format || 'yyyy-MM-dd HH:mm:ss'];

    return dateFns.format(date, format);
  }

  static yyyymmddhhmmss(date: Date = new Date()): string {
    return this.format(date, 'yyyyMMddHHmmss');
  }
  static yyyymmddDash(date: Date = new Date()): string {
    return this.format(date, 'yyyy-MM-dd');
  }

  static afterDay(day: number, date?: Date): Date {
    date = date ? this.toStartAtDay(date) : this.today();

    date.setDate(date.getDate() + day);
    return date;
  }

  static beforeDay(day: number, date?: Date): Date {
    date = date ? this.toStartAtDay(date) : this.today();

    date.setDate(date.getDate() - day);
    return date;
  }

  static today(): Date {
    const date = new Date();
    return this.toStartAtDay(date);
  }

  static toStartAtDay(date: Date): Date {
    const result = new Date(date);
    result.setHours(0);
    result.setMinutes(0);
    result.setSeconds(0);
    result.setMilliseconds(0);
    return result;
  }
}
