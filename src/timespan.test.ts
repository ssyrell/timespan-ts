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

            test("Negative zero", () => {
                const ts = TimeSpan.fromMilliseconds(-0);
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

            test("Negative zero", () => {
                const ts = TimeSpan.fromSeconds(-0);
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

            test("Negative zero", () => {
                const ts = TimeSpan.fromMinutes(-0);
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

            test("Negative zero", () => {
                const ts = TimeSpan.fromHours(-0);
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

            test("Negative zero", () => {
                const ts = TimeSpan.fromDays(-0);
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
                expect(ts.days).toBe(1);
                expect(ts.hours).toBe(2);
                expect(ts.minutes).toBe(3);
                expect(ts.seconds).toBe(4);
                expect(ts.milliseconds).toBe(5);
            });
        });

        describe("fromDateDiff", () => {
            test("1 day later results in expected positive value", () => {
                const today = new Date();
                const tomorrow = new Date(today.valueOf() + TimeSpan.MillisecondsPerDay);
                const ts = TimeSpan.fromDateDiff(today, tomorrow);

                expect(ts.totalMilliseconds).toBe(TimeSpan.MillisecondsPerDay);
            });

            test("1 day earlier results in expected negative value", () => {
                const today = new Date();
                const yesterday = new Date(today.valueOf() - TimeSpan.MillisecondsPerDay);
                const ts = TimeSpan.fromDateDiff(today, yesterday);

                expect(ts.totalMilliseconds).toBe(TimeSpan.MillisecondsPerDay * -1);
            });

            test("Same time results in zero", () => {
                const now = new Date();
                const ts = TimeSpan.fromDateDiff(now, now);

                expect(ts.totalMilliseconds).toBe(0);
            });
        });
    });

    describe("Properties", () => {
        test("Negative initial value", () => {
            const ts = TimeSpan.fromTime(-1, -2, -3, -4, -5)
            const expectedTotalMilliseconds = -1 * TimeSpan.MillisecondsPerDay +
                -2 * TimeSpan.MillisecondsPerHour +
                -3 * TimeSpan.MillisecondsPerMinute +
                -4 * TimeSpan.MillisecondsPerSecond +
                -5;
            expect(ts.totalMilliseconds).toBe(expectedTotalMilliseconds);
            expect(ts.totalSeconds).toBe(expectedTotalMilliseconds / TimeSpan.MillisecondsPerSecond);
            expect(ts.totalMinutes).toBe(expectedTotalMilliseconds / TimeSpan.MillisecondsPerMinute);
            expect(ts.totalHours).toBe(expectedTotalMilliseconds / TimeSpan.MillisecondsPerHour);
            expect(ts.totalDays).toBe(expectedTotalMilliseconds / TimeSpan.MillisecondsPerDay);

            expect(ts.milliseconds).toBe(Math.trunc(expectedTotalMilliseconds % 1000));
            expect(ts.seconds).toBe(Math.trunc((expectedTotalMilliseconds / TimeSpan.MillisecondsPerSecond) % 60));
            expect(ts.minutes).toBe(Math.trunc((expectedTotalMilliseconds / TimeSpan.MillisecondsPerMinute) % 60));
            expect(ts.hours).toBe(Math.trunc((expectedTotalMilliseconds / TimeSpan.MillisecondsPerHour) % 24));
            expect(ts.days).toBe(Math.trunc(expectedTotalMilliseconds / TimeSpan.MillisecondsPerDay));
        });

        test("Positive initial value", () => {
            const ts = TimeSpan.fromTime(1, 2, 3, 4, 5)
            const expectedTotalMilliseconds = TimeSpan.MillisecondsPerDay +
                2 * TimeSpan.MillisecondsPerHour +
                3 * TimeSpan.MillisecondsPerMinute +
                4 * TimeSpan.MillisecondsPerSecond +
                5;
            expect(ts.totalMilliseconds).toBe(expectedTotalMilliseconds);
            expect(ts.totalSeconds).toBe(expectedTotalMilliseconds / TimeSpan.MillisecondsPerSecond);
            expect(ts.totalMinutes).toBe(expectedTotalMilliseconds / TimeSpan.MillisecondsPerMinute);
            expect(ts.totalHours).toBe(expectedTotalMilliseconds / TimeSpan.MillisecondsPerHour);
            expect(ts.totalDays).toBe(expectedTotalMilliseconds / TimeSpan.MillisecondsPerDay);

            expect(ts.milliseconds).toBe(Math.trunc(expectedTotalMilliseconds % 1000));
            expect(ts.seconds).toBe(Math.trunc((expectedTotalMilliseconds / TimeSpan.MillisecondsPerSecond) % 60));
            expect(ts.minutes).toBe(Math.trunc((expectedTotalMilliseconds / TimeSpan.MillisecondsPerMinute) % 60));
            expect(ts.hours).toBe(Math.trunc((expectedTotalMilliseconds / TimeSpan.MillisecondsPerHour) % 24));
            expect(ts.days).toBe(Math.trunc(expectedTotalMilliseconds / TimeSpan.MillisecondsPerDay));
        });
    });

    describe("Comparison", () => {
        describe("compareTo", () => {
            test("Shorter", () => {
                const ts1 = TimeSpan.fromHours(1);
                const ts2 = TimeSpan.fromHours(2);

                expect(ts1.compareTo(ts2)).toBe(-1);
            });

            test("Equal", () => {
                const ts1 = TimeSpan.fromHours(1);
                const ts2 = TimeSpan.fromHours(1);

                expect(ts1.compareTo(ts2)).toBe(0);
            });

            test("Longer", () => {
                const ts1 = TimeSpan.fromHours(2);
                const ts2 = TimeSpan.fromHours(1);

                expect(ts1.compareTo(ts2)).toBe(1);
            });
        });

        describe("compare", () => {
            test("Shorter", () => {
                const ts1 = TimeSpan.fromHours(1);
                const ts2 = TimeSpan.fromHours(2);

                expect(TimeSpan.compare(ts1, ts2)).toBe(-1);
            });

            test("Equal", () => {
                const ts1 = TimeSpan.fromHours(1);
                const ts2 = TimeSpan.fromHours(1);

                expect(TimeSpan.compare(ts1, ts2)).toBe(0);
            });

            test("Longer", () => {
                const ts1 = TimeSpan.fromHours(2);
                const ts2 = TimeSpan.fromHours(1);

                expect(TimeSpan.compare(ts1, ts2)).toBe(1);
            });
        });
    });

    describe("Math Operations", () => {
        test("add", () => {
            const ts1 = TimeSpan.fromHours(1);
            const ts2 = TimeSpan.fromHours(2);
            const sum = ts1.add(ts2);

            expect(ts1.totalHours).toBe(1);
            expect(ts2.totalHours).toBe(2);
            expect(sum.totalHours).toBe(3);
        });

        test("subtract", () => {
            const ts1 = TimeSpan.fromHours(1);
            const ts2 = TimeSpan.fromHours(2);
            const difference = ts1.subtract(ts2);

            expect(ts1.totalHours).toBe(1);
            expect(ts2.totalHours).toBe(2);
            expect(difference.totalHours).toBe(-1);
        });

        test("multiply", () => {
            const ts = TimeSpan.fromHours(2);
            const product = ts.multiply(3);

            expect(ts.totalHours).toBe(2);
            expect(product.totalHours).toBe(6);
        });

        test("divide", () => {
            const ts1 = TimeSpan.fromHours(6);
            const quotient = ts1.divide(2);

            expect(ts1.totalHours).toBe(6);
            expect(quotient.totalHours).toBe(3);
        });

        test("duration", () => {
            const ts1 = TimeSpan.fromHours(1);
            const ts2 = TimeSpan.fromHours(-1);

            const ts1Duration = ts1.duration();
            const ts2Duration = ts2.duration();

            expect(ts1.totalHours).toBe(1);
            expect(ts2.totalHours).toBe(-1);
            expect(ts1Duration.totalHours).toBe(1);
            expect(ts2Duration.totalHours).toBe(1);
        });

        test("negate", () => {
            const negative = TimeSpan.fromHours(-1);
            const positive = TimeSpan.fromHours(1);

            const negatedNegative = negative.negate();
            const negatedPositive = positive.negate();

            expect(negative.totalHours).toBe(-1);
            expect(positive.totalHours).toBe(1);
            expect(negatedNegative.totalHours).toBe(1);
            expect(negatedPositive.totalHours).toBe(-1);
        });
    });

    describe("toString", () => {
        test("All components are single-digit non-zero values", () => {
            const ts1 = TimeSpan.fromTime(1, 2, 3, 4, 5);
            expect(ts1.toString()).toBe("01:02:03:04.005");

            const ts2 = TimeSpan.fromTime(-1, -2, -3, -4, -5);
            expect(ts2.toString()).toBe("-01:02:03:04.005");
        });

        test("All components are double-digit non-zero values", () => {
            const ts1 = TimeSpan.fromTime(11, 22, 33, 44, 55);
            expect(ts1.toString()).toBe("11:22:33:44.055");

            const ts2 = TimeSpan.fromTime(-11, -22, -33, -44, -55);
            expect(ts2.toString()).toBe("-11:22:33:44.055");
        });

        test("Zero", () => {
            const ts1 = TimeSpan.fromMilliseconds(0);
            expect(ts1.toString()).toBe("000");

            const ts2 = TimeSpan.fromMilliseconds(-0);
            expect(ts2.toString()).toBe("000");
        });

        test("Most-significant components that are zero are not included", () => {
            const ts1 = TimeSpan.fromTime(0, 0, 1, 2, 3);
            expect(ts1.toString()).toBe("01:02.003");

            const ts2 = TimeSpan.fromTime(0, 0, -1, -2, -3);
            expect(ts2.toString()).toBe("-01:02.003");
        });

        test("Zero-value components following non-zero components are included", () => {
            const ts1 = TimeSpan.fromTime(1, 0, 0, 0, 0);
            expect(ts1.toString()).toBe("01:00:00:00.000");

            const ts2 = TimeSpan.fromTime(0, 1, 0, 2, 0);
            expect(ts2.toString()).toBe("01:00:02.000");

            const ts3 = TimeSpan.fromTime(1, 0, 2, 0, 3);
            expect(ts3.toString()).toBe("01:00:02:00.003");

            const ts4 = TimeSpan.fromTime(-1, 0, 0, 0, 0);
            expect(ts4.toString()).toBe("-01:00:00:00.000");

            const ts5 = TimeSpan.fromTime(0, -1, 0, -2, 0);
            expect(ts5.toString()).toBe("-01:00:02.000");

            const ts6 = TimeSpan.fromTime(-1, 0, -2, 0, -3);
            expect(ts6.toString()).toBe("-01:00:02:00.003");
        });
    });
});