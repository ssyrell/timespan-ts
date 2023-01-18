/**
 * Represents a time interval.
 */
export class TimeSpan {

    /**
     * Represents the number of milliseconds in 1 second.
     */
    public static readonly MillisecondsPerSecond = 1000;

    /**
     * Represents the number of milliseconds in 1 minute
     */
    public static readonly MillisecondsPerMinute = 60000;

    /**
     * Represents the number of milliseconds in 1 hour.
     */
    public static readonly MillisecondsPerHour = 3600000

    /**
     * Represents the number of milliseconds in 1 day.
     */
    public static readonly MillisecondsPerDay = 86400000;

    /**
     * Represents the maximum TimeSpan value. This field is read-only
     */
    public static readonly MaxValue = new TimeSpan(Number.MAX_SAFE_INTEGER);

    /**
     * Represents the minimum TimeSpan value. This field is read-only.
     */
    public static readonly MinValue = new TimeSpan(Number.MIN_SAFE_INTEGER);

    /**
     * Represents the zero TimeSpan value. This field is read-only.
     */
    public static readonly Zero = new TimeSpan(0);

    /**
     * Initializes a new instance of the TimeSpan class.
     * @param valueInMilliseconds The total number of milliseconds to use.
     * @throws {RangeError} if `valueInMilliseconds` is greater than `Number.MAX_SAFE_INTEGER` or less than `Number.MIN_SAFE_INTEGER`.
     */
    private constructor(private valueInMilliseconds: number) {
        if (valueInMilliseconds > Number.MAX_SAFE_INTEGER || valueInMilliseconds < Number.MIN_SAFE_INTEGER) {
            throw new RangeError("TimeSpan is too long");
        }
    }

    /**
     * Returns a TimeSpan that represents a specified number of milliseconds.
     * @param milliseconds A number of milliseconds.
     * @returns An object that represents `milliseconds`.
     * @throws {RangeError} if `milliseconds` is greater than `Number.MAX_SAFE_INTEGER` or less than `Number.MIN_SAFE_INTEGER`.
     */
    public static fromMilliseconds(milliseconds: number) {
        return this.fromTime(undefined, undefined, undefined, undefined, milliseconds);
    }

    /**
     * Returns a TimeSpan that represents a specified number of seconds, where the specification is accurate
     * to the nearest millisecond.
     * @param seconds A number of seconds, accurate to the nearest millisecond.
     * @returns An object that represents `seconds`.
     * @throws {RangeError} if the calculated millisecond value from `seconds` is greater than `Number.MAX_SAFE_INTEGER` or less than `Number.MIN_SAFE_INTEGER`.
     */
    public static fromSeconds(seconds: number) {
        return this.fromTime(undefined, undefined, undefined, seconds);
    }

    /**
     * Returns a TimeSpan that represents a specified number of minutes, where the specification is accurate
     * to the nearest millisecond.
     * @param minutes A number of minutes, accurate to the nearest millisecond.
     * @returns An object that represents `minutes`.
     * @throws {RangeError} if the calculated millisecond value from `minutes` is greater than `Number.MAX_SAFE_INTEGER` or less than `Number.MIN_SAFE_INTEGER`.
     */
    public static fromMinutes(minutes: number) {
        return this.fromTime(undefined, undefined, minutes);
    }

    /**
     * Returns a TimeSpan that represents a specified number of hours, where the specification is accurate
     * to the nearest millisecond.
     * @param hours A number of hours, accurate to the nearest millisecond.
     * @returns An object that represents `hours`.
     * @throws {RangeError} if the calculated millisecond value from `hours` is greater than `Number.MAX_SAFE_INTEGER` or less than `Number.MIN_SAFE_INTEGER`.
     */
    public static fromHours(hours: number) {
        return this.fromTime(undefined, hours);
    }

    /**
     * Returns a TimeSpan that represents a specified number of days, where the specification is accurate
     * to the nearest millisecond.
     * @param days A number of days, accurate to the nearest millisecond.
     * @returns An object that represents `days`.
     * @throws {RangeError} if the calculated millisecond value from `days` is greater than `Number.MAX_SAFE_INTEGER` or less than `Number.MIN_SAFE_INTEGER`.
     */
    public static fromDays(days: number) {
        return this.fromTime(days);
    }

    /**
    * 
    * @param hours A number of hours, accurate to the nearest millisecond.
    * @returns An object that represents `hours`.
    * @throws {RangeError} if the calculated millisecond value from `hours` is greater than `Number.MAX_SAFE_INTEGER` or less than `Number.MIN_SAFE_INTEGER`.
    */
    /**
     * Returns a TimeSpan that represents a specified number of days, hours, minutes, seconds, and milliseconds.
     * @param days Number of days.
     * @param hours Number of hours.
     * @param minutes Number of minutes.
     * @param seconds Number of seconds.
     * @param milliseconds Number of milliseconds.
     * @returns An object that represents the specified values.
     * @throws {RangeError} if the calculated total milliseconds is greater than `Number.MAX_SAFE_INTEGER` or less than `Number.MIN_SAFE_INTEGER`.
     */
    public static fromTime(days?: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number) {
        const daysMilliseconds = (days ?? 0) * TimeSpan.MillisecondsPerDay;
        const hourMilliseconds = (hours ?? 0) * TimeSpan.MillisecondsPerHour;
        const minuteMilliseconds = (minutes ?? 0) * TimeSpan.MillisecondsPerMinute;
        const secondMilliseconds = (seconds ?? 0) * TimeSpan.MillisecondsPerSecond;

        return new TimeSpan(daysMilliseconds + hourMilliseconds + minuteMilliseconds + secondMilliseconds + (milliseconds ?? 0));
    }

    /**
     * Gets the number of milliseconds that represent the value of this TimeSpan.
     */
    public get totalMilliseconds(): number {
        return this.valueInMilliseconds;
    }

    /**
     * Gets the value of this TimeSpan expressed in whole and fractional seconds.
     */
    public get totalSeconds(): number {

        return Number(this.valueInMilliseconds / TimeSpan.MillisecondsPerSecond);
    }

    /**
     * Gets the value of this TimeSpan expressed in whole and fractional minutes.
     */
    public get totalMinutes(): number {
        return Number(this.valueInMilliseconds / TimeSpan.MillisecondsPerMinute);
    }

    /**
     * Gets the value of this TimeSpan expressed in whole and fractional hours.
     */
    public get totalHours(): number {
        return Number(this.valueInMilliseconds / TimeSpan.MillisecondsPerHour);
    }

    /**
     * Gets the value of this TimeSpan expressed in whole and fractional days.
     */
    public get totalDays(): number {
        return Number(this.valueInMilliseconds / TimeSpan.MillisecondsPerDay);
    }

    /**
     * Gets the milliseconds component of the time interval represented by this TimeSpan.
     */
    public get milliseconds(): number {
        return Math.trunc(this.totalMilliseconds % 1000);
    }

    /**
     * Gets the seconds component of the time interval represented by this TimeSpan.
     */
    public get seconds(): number {
        return Math.trunc(this.totalSeconds % 60);
    }

    /**
     * Gets the minutes component of the time interval represented by this TimeSpan.
     */
    public get minutes(): number {
        return Math.trunc(this.totalMinutes % 60);
    }

    /**
     * Gets the hours component of the time interval represented by this TimeSpan.
     */
    public get hours(): number {
        return Math.trunc(this.totalHours % 24);
    }

    /**
     * Gets the days component of the time interval represented by this TimeSpan.
     */
    public get days(): number {
        return Math.trunc(this.totalDays);
    }

    /**
     * Compares two TimeSpan instances and returns an integer that indicates whether
     * the first value is shorter than, equal to, or longer than the second value.
     * @param t1 The first time interval to compare.
     * @param t2 The second time interval to compare.
     * @returns One of the following values:
     * | Value | Description               |
     * |:------|:--------------------------|
     * | -1    | `t1` is shorter than `t2` |
     * | 0     | `t1` is equal to `t2`     |
     * | 1     | `t1` is longer than `t2`  |
     */
    public compare(t1: TimeSpan, t2: TimeSpan): number {
        if (t1.valueOf < t2.valueOf) {
            return -1;
        }

        if (t1.valueOf === t2.valueOf) {
            return 0;
        }

        // t1 must be greater than t2
        return 1;
    }

    /**
     * Compares this instance to a specified TimeSpan object and returns an integer
     * that indicates whether this instance is shorter than, equal to, or longer than
     * the specified TimeSpan.
     * @param value A TimeSpan to compare to this instance.
     * @returns A signed number indicating the relative values of this instance and `value`
     * | Value               | Description                           |
     * |:--------------------|:--------------------------------------|
     * | A negative integer  | This instance is shorter than `value` |
     * | Zero                | This instance is equal to `value`     |
     * | A positive integer  | This instance is longer than `value`  |
     */
    public compareTo(value: TimeSpan): number {
        return this.compare(this, value);
    }

    /**
     * Gets the value of this instance in milliseconds.
     * @returns The value of this instance in milliseconds
     */
    public valueOf(): number {
        return this.valueInMilliseconds;
    }

    /**
     * Returns a new TimeSpan instance whose value is the sum of the
     * specified TimeSpan object and this instance.
     * @param ts The time interval to add.
     * @returns A new object that represents the value of this instance plus the value of `ts`
     * @throws {RangeError} if the resulting TimeSpan is less than TimeSpan.MinValue or greater than TimeSpan.MaxValue.
     */
    public add(ts: TimeSpan): TimeSpan {
        return new TimeSpan(this.valueOf() + ts.valueOf());
    }

    /**
     * Returns a new TimeSpan instance whose value is the difference between the
     * specified TimeSpan object and this instance.
     * @param ts The time interval to be subtracted.
     * @returns A new object that represents the value of this instance minus the value of `ts`
     * @throws {RangeError} if the resulting TimeSpan is less than TimeSpan.MinValue or greater than TimeSpan.MaxValue.
     */
    public subtract(ts: TimeSpan): TimeSpan {
        return new TimeSpan(this.valueOf() - ts.valueOf());
    }

    /**
     * Returns a new TimeSpan instance whose value is the result of multiplication between the
     * specified TimeSpan object and this instance.
     * @param ts The time interval to be multiplied by.
     * @returns A new object that represents the value of this instance multiplied by the value of `ts`
     * @throws {RangeError} if the resulting TimeSpan is less than TimeSpan.MinValue or greater than TimeSpan.MaxValue.
     */
    public multiply(ts: TimeSpan): TimeSpan {
        return new TimeSpan(this.valueOf() * ts.valueOf());
    }

    /**
     * Returns a new TimeSpan instance whose value is the result of division of the
     * specified TimeSpan object and this instance.
     * @param ts The time interval to be divided by.
     * @returns A new object that represents the value of this instance divided by the value of `ts`
     * @throws {RangeError} if the resulting TimeSpan is less than TimeSpan.MinValue or greater than TimeSpan.MaxValue.
     */
    public divide(ts: TimeSpan): TimeSpan {
        return new TimeSpan(this.valueOf() / ts.valueOf());
    }

    /**
     * Returns a new TimeSpan instance whose value is the absolute value of this TimeSpan instance.
     * @returns A new object whose value is the absolute value of this TimeSpan instance.
     */
    public duration(): TimeSpan {
        return new TimeSpan(Math.abs(this.valueOf()));
    }

    /**
     * Returns a new TimeSpan instance whose value is the negated value of this instance.
     * @returns A new object with the same numeric value as this instance, but with the opposite sign.
     */
    public negate(): TimeSpan {
        return new TimeSpan(this.valueOf() * -1);
    }

    /**
     * Converts the value of this TimeSpan instance to its equivalent string representation.
     * @returns The string representation of this TimeSpan value.
     */
    public toString(): string {
        return this.numberToPaddedString(this.days, 2, ":") +
            this.numberToPaddedString(this.hours, 2, ":") +
            this.numberToPaddedString(this.minutes, 2, ":") +
            this.numberToPaddedString(this.seconds, 2, ".") +
            this.numberToPaddedString(this.milliseconds, 3);
    }

    /**
     * Converts the specified numeric value to a string, prepends it with the
     * desired number of zeros, and appends the desired character to the end.
     * @param value The number value to stringify.
     * @param places The number of places to display in the string.
     * @param endingCharacter The character to append to the end of the value.
     * @returns The formatted number string or an empty string if `value` is 0.
     */
    private numberToPaddedString(value: number, places: number, endingCharacter?: string): string {
        if (value === 0) {
            return "";
        }

        let minFullPlacesValue = Math.pow(10, places - 1);
        let output = "";

        while (value < minFullPlacesValue && output.length < places - 1) {
            output += "0";
            minFullPlacesValue /= 10;
        }

        output += value;

        if (output.length > 0) {
            output += endingCharacter ?? "";
        }

        return output;
    }
}
