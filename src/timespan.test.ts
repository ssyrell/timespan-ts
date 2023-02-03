import { TimeSpan } from "./timespan";

const MinSeconds = Math.ceil(Number.MIN_SAFE_INTEGER / TimeSpan.MillisecondsPerSecond);
const MinMinutes = Math.ceil(Number.MIN_SAFE_INTEGER / TimeSpan.MillisecondsPerMinute);
const MinHours = Math.ceil(Number.MIN_SAFE_INTEGER / TimeSpan.MillisecondsPerHour);
const MinDays = Math.ceil(Number.MIN_SAFE_INTEGER / TimeSpan.MillisecondsPerDay);

const MaxSeconds = Math.floor(Number.MAX_SAFE_INTEGER / TimeSpan.MillisecondsPerSecond);
const MaxMinutes = Math.floor(Number.MAX_SAFE_INTEGER / TimeSpan.MillisecondsPerMinute);
const MaxHours = Math.floor(Number.MAX_SAFE_INTEGER / TimeSpan.MillisecondsPerHour);
const MaxDays = Math.floor(Number.MAX_SAFE_INTEGER / TimeSpan.MillisecondsPerDay);

describe("TimeSpan", () => {
    test("Static Properties", () => {
        expect(TimeSpan.MillisecondsPerSecond).toBe(1000);
        expect(TimeSpan.MillisecondsPerMinute).toBe(60000);
        expect(TimeSpan.MillisecondsPerHour).toBe(3600000);
        expect(TimeSpan.MillisecondsPerDay).toBe(86400000)
        expect(TimeSpan.MinValue.totalMilliseconds).toBe(Number.MIN_SAFE_INTEGER);
        expect(TimeSpan.MaxValue.totalMilliseconds).toBe(Number.MAX_SAFE_INTEGER);
        expect(TimeSpan.Zero.totalMilliseconds).toBe(0);
    });

    describe("Factory Methods", () => {
        describe("fromMilliseconds()", () => {
            test("Min safe integer", () => {
                const ts = TimeSpan.fromMilliseconds(Number.MIN_SAFE_INTEGER);
                expect(ts.totalMilliseconds).toBe(Number.MIN_SAFE_INTEGER);
            });

            test("Max safe integer", () => {
                const ts = TimeSpan.fromMilliseconds(Number.MAX_SAFE_INTEGER);
                expect(ts.totalMilliseconds).toBe(Number.MAX_SAFE_INTEGER);
            });

            test("Zero", () => {
                const ts = TimeSpan.fromMilliseconds(0);
                expect(ts.totalMilliseconds).toBe(0);
            });

            test("One", () => {
                const ts = TimeSpan.fromMilliseconds(1);
                expect(ts.totalMilliseconds).toBe(1);
            });

            test("Value less than min safe integer throws RangeError", () => {
                expect(() => {
                    TimeSpan.fromMilliseconds(Number.MIN_SAFE_INTEGER - 1);
                }).toThrow(RangeError);
            });

            test("Value greater than max safe integer throws RangeError", () => {
                expect(() => {
                    TimeSpan.fromMilliseconds(Number.MAX_SAFE_INTEGER + 1);
                }).toThrow(RangeError);
            });
        });

        describe("fromSeconds", () => {
            test("Minimum safe seconds", () => {
                const ts = TimeSpan.fromSeconds(MinSeconds);
                expect(ts.totalSeconds).toBe(MinSeconds);
                expect(ts.totalMilliseconds).toBe(MinSeconds * TimeSpan.MillisecondsPerSecond);
            });

            test("Maximum safe seconds", () => {
                const ts = TimeSpan.fromSeconds(MaxSeconds);
                expect(ts.totalSeconds).toBe(MaxSeconds);
                expect(ts.totalMilliseconds).toBe(MaxSeconds * TimeSpan.MillisecondsPerSecond);
            });

            test("Zero", () => {
                const ts = TimeSpan.fromSeconds(0);
                expect(ts.totalSeconds).toBe(0);
                expect(ts.totalMilliseconds).toBe(0);
            });

            test("One", () => {
                const ts = TimeSpan.fromSeconds(1);
                expect(ts.totalSeconds).toBe(1);
                expect(ts.totalMilliseconds).toBe(TimeSpan.MillisecondsPerSecond);
            });

            test("Value less than minimum seconds throws RangeError", () => {
                expect(() => {
                    TimeSpan.fromSeconds(MinSeconds - 1);
                }).toThrow(RangeError);
            });

            test("Value greater than maximum seconds throws RangeError", () => {
                expect(() => {
                    TimeSpan.fromSeconds(MaxSeconds + 1);
                }).toThrow(RangeError);
            });
        });

        describe("fromMinutes", () => {
            test("Minimum safe minutes", () => {
                const ts = TimeSpan.fromMinutes(MinMinutes);
                expect(ts.totalMinutes).toBe(MinMinutes);
                expect(ts.totalSeconds).toBe(MinMinutes * 60);
                expect(ts.totalMilliseconds).toBe(MinMinutes * TimeSpan.MillisecondsPerMinute);
            });

            test("Maximum safe minutes", () => {
                const ts = TimeSpan.fromMinutes(MaxMinutes);
                expect(ts.totalMinutes).toBe(MaxMinutes);
                expect(ts.totalSeconds).toBe(MaxMinutes * 60);
                expect(ts.totalMilliseconds).toBe(MaxMinutes * TimeSpan.MillisecondsPerMinute);
            });

            test("Zero", () => {
                const ts = TimeSpan.fromMinutes(0);
                expect(ts.totalMinutes).toBe(0);
                expect(ts.totalSeconds).toBe(0);
                expect(ts.totalMilliseconds).toBe(0);
            });

            test("One", () => {
                const ts = TimeSpan.fromMinutes(1);
                expect(ts.totalMinutes).toBe(1);
                expect(ts.totalSeconds).toBe(60);
                expect(ts.totalMilliseconds).toBe(TimeSpan.MillisecondsPerMinute);
            });

            test("Value less than minimum minutes throws RangeError", () => {
                expect(() => {
                    TimeSpan.fromMinutes(MinMinutes - 1);
                }).toThrow(RangeError);
            });

            test("Value greater than maximum minutes throws RangeError", () => {
                expect(() => {
                    TimeSpan.fromMinutes(MaxMinutes + 1);
                }).toThrow(RangeError);
            });
        });

        describe("fromHours", () => {
            test("Minimum safe hours", () => {
                const ts = TimeSpan.fromHours(MinHours);
                expect(ts.totalHours).toBe(MinHours);
                expect(ts.totalMinutes).toBe(MinHours * 60);
                expect(ts.totalSeconds).toBe(MinHours * 3600);
                expect(ts.totalMilliseconds).toBe(MinHours * TimeSpan.MillisecondsPerHour);
            });

            test("Maximum safe hours", () => {
                const ts = TimeSpan.fromHours(MaxHours);
                expect(ts.totalHours).toBe(MaxHours);
                expect(ts.totalMinutes).toBe(MaxHours * 60);
                expect(ts.totalSeconds).toBe(MaxHours * 3600);
                expect(ts.totalMilliseconds).toBe(MaxHours * TimeSpan.MillisecondsPerHour);
            });

            test("Zero", () => {
                const ts = TimeSpan.fromHours(0);
                expect(ts.totalHours).toBe(0);
                expect(ts.totalMinutes).toBe(0);
                expect(ts.totalSeconds).toBe(0);
                expect(ts.totalMilliseconds).toBe(0);
            });

            test("One", () => {
                const ts = TimeSpan.fromHours(1);
                expect(ts.totalHours).toBe(1);
                expect(ts.totalMinutes).toBe(60);
                expect(ts.totalSeconds).toBe(3600);
                expect(ts.totalMilliseconds).toBe(TimeSpan.MillisecondsPerHour);
            });

            test("Value less than minimum hours throws RangeError", () => {
                expect(() => {
                    TimeSpan.fromHours(MinHours - 1);
                }).toThrow(RangeError);
            });

            test("Value greater than maximum hours throws RangeError", () => {
                expect(() => {
                    TimeSpan.fromHours(MaxHours + 1);
                }).toThrow(RangeError);
            });
        });

        describe("fromDays", () => {
            test("Minimum safe days", () => {
                const ts = TimeSpan.fromDays(MinDays);
                expect(ts.totalDays).toBe(MinDays);
                expect(ts.totalHours).toBe(MinDays * 24);
                expect(ts.totalMinutes).toBe(MinDays * 1440);
                expect(ts.totalSeconds).toBe(MinDays * 86400);
                expect(ts.totalMilliseconds).toBe(MinDays * TimeSpan.MillisecondsPerDay);
            });

            test("Maximum safe days", () => {
                const ts = TimeSpan.fromDays(MaxDays);
                expect(ts.totalDays).toBe(MaxDays);
                expect(ts.totalHours).toBe(MaxDays * 24);
                expect(ts.totalMinutes).toBe(MaxDays * 1440);
                expect(ts.totalSeconds).toBe(MaxDays * 86400);
                expect(ts.totalMilliseconds).toBe(MaxDays * TimeSpan.MillisecondsPerDay);
            });

            test("Zero", () => {
                const ts = TimeSpan.fromDays(0);
                expect(ts.totalDays).toBe(0);
                expect(ts.totalHours).toBe(0);
                expect(ts.totalMinutes).toBe(0);
                expect(ts.totalSeconds).toBe(0);
                expect(ts.totalMilliseconds).toBe(0);
            });

            test("One", () => {
                const ts = TimeSpan.fromDays(1);
                expect(ts.totalDays).toBe(1);
                expect(ts.totalHours).toBe(24);
                expect(ts.totalMinutes).toBe(1440);
                expect(ts.totalSeconds).toBe(86400);
                expect(ts.totalMilliseconds).toBe(TimeSpan.MillisecondsPerDay);
            });

            test("Value less than minimum hours throws RangeError", () => {
                expect(() => {
                    TimeSpan.fromDays(MinDays - 1);
                }).toThrow(RangeError);
            });

            test("Value greater than maximum hours throws RangeError", () => {
                expect(() => {
                    TimeSpan.fromDays(MaxDays + 1);
                }).toThrow(RangeError);
            });
        });

        describe("fromTime", () => {
            test("Default values are 0", () => {
                const ts = TimeSpan.fromTime();
                expect(ts.totalMilliseconds).toBe(0);
            });

            test("Individual components are respected", () => {
                const ts = TimeSpan.fromTime(1, 2, 3, 4, 5);
                const expectedTotal = TimeSpan.MillisecondsPerDay +
                    2 * TimeSpan.MillisecondsPerHour +
                    3 * TimeSpan.MillisecondsPerMinute +
                    4 * TimeSpan.MillisecondsPerSecond +
                    5;

                expect(ts.totalMilliseconds).toBe(expectedTotal);
            });
        });
    });
});