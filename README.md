# timespan-ts
A TypeScript version of dotnet's TimeSpan class.

# Installation
```
npm install timespan-ts
```

# Usage

Timespan-ts strives to recreate most of the functionality that is available in the dotnet TimeSpan class, with the main difference being that the smallest unit available in timespan-ts milliseconds vs ticks in dotnet's version.

## Initialization
A new TimeSpan instance can be created by using one of the static factory methods. TimeSpans can be created from any one individual unit of time from milliseconds to days:

```typescript
// Using individual units of time:
TimeSpan.fromMilliseconds(100);
TimeSpan.fromSeconds(100);
TimeSpan.fromMinutes(100);
TimeSpan.fromHours(100);
TimeSpan.fromDays(100);
```

TimeSpans can also be created from a combination of multiple units using the `TimeSpan.fromTime()` method:
```typescript
// Creates a TimeSpan instance of 1 day, 2 hours, 3 minutes, 4 seconds, and 5 milliseconds:
const days = 1;
const hours = 2;
const minutes = 3;
const seconds = 4;
const milliseconds = 5;
TimeSpan.fromTime(days, hours, minutes, seconds, milliseconds);
```

All parameters in `fromTime()` are optional, so you can pick and choose accordingly:
```typescript
// Creates a TimeSpan instance of 3 days, 50 hours, and 2 minutes:
TimeSpan.fromTime(3, 50, 2);
```

Lastly, a TimeSpan can also be created using the difference between two dates using the `TimeSpan.fromDateDiff()` convenience method.

**Warning** - you will end up with a negative value this way if the second date occurs after the first date.
```typescript
const date1 = Date.parse('05 Dec 1995 00:00:00 GMT');
const date2 = Date.parse('04 Dec 1995 00:00:00 GMT');

// Results in a TimeSpan of 1 day:
TimeSpan.fromDateDiff(date1, date2);

// Results in a TimeSpan of -1 day:
TimeSpan.fromDateDiff(date2, date1)
```

## Min/Max/Zero and Other Constant Values

TimeSpan calculates and stores the total span of time in milliseconds and will throw `RangeError` if any method call results in the total number of milliseconds being larger than `Number.MAX_SAFE_INTEGER` or smaller than `Number.MIN_SAFE_INTEGER`. 

Min/Max/Zero TimeSpan values are accessible as static constants:
```typescript
const tsZero = TimeSpan.Zero;
const tsMin = TimeSpan.MinValue;
const tsMax = TimeSpan.MaxValue;
```

Other constant values are available as well that may be useful in calculations:
```typescript
TimeSpan.MillisecondsPerSecond;
TimeSpan.MillisecondsPerMinute;
TimeSpan.MillisecondsPerHour;
TimeSpan.MillisecondsPerDay;
```

## Getting Values from a TimeSpan

A TimeSpan instance has methods that allow you to get either the total amount of a given time unit (using the `total*` properties) or get a unit's component value (using the time unit properties). For example:

```typescript
// Creates a TimeSpan of 1 hour and 5 minutes
const ts = TimeSpan.fromTime(0, 1, 15);

console.log(ts.totalDays)           // 0.052083333333333336
console.log(ts.totalHours);         // 1.25
console.log(ts.totalMinutes);       // 75
console.log(ts.totalSeconds);       // 4500
console.log(ts.totalMilliseconds);  // 4500000

console.log(ts.days)                // 0
console.log(ts.hours)               // 1
console.log(ts.minutes);            // 15
console.log(ts.seconds);            // 0
console.log(ts.milliseconds);       // 0
```

## Comparison

There are two methods available for comparing TimeSpan instances: `compare()`, which is a static method that compares two TimeSpan instances, and `compareTo()`, which is an instance method that compares the instance you're calling the method on with another provided TimeSpan instance. Both return integer values indicating how the TimeSpans compare to each other:

```typescript
const oneHour = TimeSpan.FromHours(1);
const twoHours = TimeSpan.FromHours(2);

// Using static compare:
const result = TimeSpan.compare(oneHour, twoHours); // -1

// Using instance compareTo:
const result2 = oneHour.compareTo(twoHours); // -1
```

## Math Operations

Methods are available for all basic math operations. All math methods return new TimeSpan instances with the result rather than modifying either existing instance:

```typescript
const twoHours = TimeSpan.FromHours(2);
const threeHours = TimeSpan.FromHours(3);

const fiveHours = twoHours.add(threeHours); 
const oneHour = threeHours.subtract(twoHours);
const fourHours = twoHours.multiply(twoHours);
const newTwoHours = fourHours.divide(twoHours); 

const negativeOneHour = twoHours.subtract(threeHours);
const absoluteValue = negativeHour.duration();
const negativeTwoHours = twoHours.negate();
```

## Printing

Lastly, TimeSpans can be printed in human readable form using `toString()`. Most-significant time components that are zero in value are not included in the output:
```typescript
const ts = TimeSpan.fromTime(1, 12, 25, 3, 400);
const ts2 = TimeSpan.fromTime(0, 12, 25, 3, 400);

console.log(ts.toString());     // "01:12:25:03.400" 
console.log(ts2.toString());    // "12:25:03.400" 
```


