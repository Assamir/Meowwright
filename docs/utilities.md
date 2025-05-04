# Utility Classes

This document describes the utility classes available in the Meowwright framework.

## Overview

Meowwright provides a set of utility classes for common operations, making it easier to perform tasks like string manipulation, date handling, random data generation, object/array manipulation, URL handling, and validation.

## Available Utility Classes

### StringUtils

The `StringUtils` class provides methods for common string operations:

```typescript
import { StringUtils } from '../utils';

// Check if a string is empty
StringUtils.isEmpty(''); // true
StringUtils.isEmpty('hello'); // false

// Truncate a string
StringUtils.truncate('This is a long string', 10); // 'This is...'

// Capitalize a string
StringUtils.capitalize('hello'); // 'Hello'

// Convert to different cases
StringUtils.toCamelCase('hello world'); // 'helloWorld'
StringUtils.toSnakeCase('helloWorld'); // 'hello_world'
StringUtils.toKebabCase('helloWorld'); // 'hello-world'

// Strip HTML
StringUtils.stripHtml('<p>Hello</p>'); // 'Hello'

// Format a string
StringUtils.format('Hello, {0}!', 'world'); // 'Hello, world!'
```

### DateUtils

The `DateUtils` class provides methods for common date operations:

```typescript
import { DateUtils } from '../utils';

// Format a date
DateUtils.format(new Date(), 'YYYY-MM-DD'); // '2023-05-15'

// Add time to a date
const tomorrow = DateUtils.addDays(new Date(), 1);
const nextMonth = DateUtils.addMonths(new Date(), 1);
const nextYear = DateUtils.addYears(new Date(), 1);

// Get difference between dates
DateUtils.diffInDays(new Date(), tomorrow); // 1

// Check date properties
DateUtils.isToday(new Date()); // true
DateUtils.isPast(yesterday); // true
DateUtils.isFuture(tomorrow); // true

// Get start/end of day
const startOfDay = DateUtils.startOfDay(new Date()); // 00:00:00.000
const endOfDay = DateUtils.endOfDay(new Date()); // 23:59:59.999

// Parse a date string
DateUtils.parse('2023-05-15'); // Date object

// Get relative time
DateUtils.getRelativeTime(yesterday); // '1 day ago'
```

### RandomUtils

The `RandomUtils` class provides methods for generating random data:

```typescript
import { RandomUtils } from '../utils';

// Generate random numbers
RandomUtils.integer(1, 10); // Random integer between 1 and 10
RandomUtils.float(0, 1, 2); // Random float with 2 decimal places

// Generate random boolean
RandomUtils.boolean(); // true or false with 50% probability
RandomUtils.boolean(0.8); // true with 80% probability

// Generate random strings
RandomUtils.string(10); // Random 10-character string
RandomUtils.alphanumeric(10); // Random 10-character alphanumeric string
RandomUtils.alphabetic(10); // Random 10-character alphabetic string
RandomUtils.numeric(10); // Random 10-character numeric string

// Generate random web data
RandomUtils.email(); // Random email address
RandomUtils.url(); // Random URL
RandomUtils.ipAddress(); // Random IP address

// Generate random date
RandomUtils.date(); // Random date within the last 10 years

// Pick random elements from arrays
RandomUtils.element(['a', 'b', 'c']); // Random element from array
RandomUtils.elements(['a', 'b', 'c'], 2); // Random 2 elements from array

// Generate random identifiers
RandomUtils.uuid(); // Random UUID
RandomUtils.hexColor(); // Random hex color
RandomUtils.rgbColor(); // Random RGB color
```

### ObjectUtils

The `ObjectUtils` class provides methods for common object and array operations:

```typescript
import { ObjectUtils } from '../utils';

// Type checking
ObjectUtils.isNullOrUndefined(null); // true
ObjectUtils.isObject({}); // true
ObjectUtils.isArray([]); // true

// Check if empty
ObjectUtils.isEmptyObject({}); // true
ObjectUtils.isEmptyArray([]); // true

// Deep clone and merge
const clone = ObjectUtils.deepClone(obj);
const merged = ObjectUtils.deepMerge(obj1, obj2);

// Access nested properties
ObjectUtils.getByPath(obj, 'user.address.city'); // Get nested property
ObjectUtils.setByPath(obj, 'user.address.city', 'New York'); // Set nested property
ObjectUtils.removeByPath(obj, 'user.address.city'); // Remove nested property

// Pick and omit properties
ObjectUtils.pick(obj, ['name', 'email']); // New object with only name and email
ObjectUtils.omit(obj, ['password']); // New object without password

// Flatten and unflatten objects
const flat = ObjectUtils.flatten(obj); // { 'user.address.city': 'New York' }
const nested = ObjectUtils.unflatten(flat); // { user: { address: { city: 'New York' } } }

// Deep equality
ObjectUtils.isEqual(obj1, obj2); // true if deeply equal

// Array operations
ObjectUtils.groupBy(users, 'role'); // Group users by role
ObjectUtils.sortBy(users, 'name'); // Sort users by name
ObjectUtils.filterBy(users, user => user.active); // Filter active users
ObjectUtils.mapBy(users, user => user.name); // Map users to names
ObjectUtils.findBy(users, user => user.id === 1); // Find user with id 1
```

### UrlUtils

The `UrlUtils` class provides methods for common URL operations:

```typescript
import { UrlUtils } from '../utils';

// Parse URL
const parsedUrl = UrlUtils.parse('https://example.com/path?query=value');

// Query parameters
UrlUtils.getQueryParams('https://example.com?a=1&b=2'); // { a: '1', b: '2' }
UrlUtils.getQueryParam('https://example.com?a=1', 'a'); // '1'
UrlUtils.addQueryParams('https://example.com', { a: '1' }); // 'https://example.com?a=1'
UrlUtils.removeQueryParams('https://example.com?a=1&b=2', ['a']); // 'https://example.com?b=2'

// Path operations
UrlUtils.getPathSegments('https://example.com/a/b/c'); // ['a', 'b', 'c']
UrlUtils.join('https://example.com', 'path', 'to', 'resource'); // 'https://example.com/path/to/resource'
UrlUtils.normalize('https://example.com/a/../b'); // 'https://example.com/b'

// URL parts
UrlUtils.getBaseUrl('https://example.com/path'); // 'https://example.com'
UrlUtils.getDomain('https://example.com/path'); // 'example.com'

// URL type checking
UrlUtils.isAbsolute('https://example.com'); // true
UrlUtils.isRelative('/path'); // true
UrlUtils.toAbsolute('/path', 'https://example.com'); // 'https://example.com/path'

// Encoding/decoding
UrlUtils.encodeComponent('a b'); // 'a%20b'
UrlUtils.decodeComponent('a%20b'); // 'a b'

// Build URL
UrlUtils.build({
  protocol: 'https',
  hostname: 'example.com',
  pathname: '/path',
  search: { query: 'value' }
}); // 'https://example.com/path?query=value'
```

### ValidationUtils

The `ValidationUtils` class provides methods for common validation operations:

```typescript
import { ValidationUtils } from '../utils';

// Validate web data
ValidationUtils.isValidEmail('user@example.com'); // true
ValidationUtils.isValidUrl('https://example.com'); // true
ValidationUtils.isValidPhone('+1 (123) 456-7890'); // true
ValidationUtils.isValidCreditCard('4111 1111 1111 1111'); // true

// Validate passwords
ValidationUtils.isStrongPassword('Password123!'); // true
ValidationUtils.isStrongPassword('weak', { minLength: 4, requireSpecialChars: false }); // true

// Validate dates
ValidationUtils.isValidDate('2023-05-15'); // true
ValidationUtils.isFutureDate('2030-01-01'); // true
ValidationUtils.isPastDate('2020-01-01'); // true

// Validate numbers
ValidationUtils.isNumber('123'); // true
ValidationUtils.isInteger('123'); // true
ValidationUtils.isPositive('123'); // true
ValidationUtils.isNegative('-123'); // true
ValidationUtils.isInRange('5', 1, 10); // true

// Validate strings
ValidationUtils.matchesPattern('abc123', /^[a-z0-9]+$/); // true
ValidationUtils.isAlpha('abc'); // true
ValidationUtils.isAlphanumeric('abc123'); // true
ValidationUtils.isNumeric('123'); // true

// Type validation
ValidationUtils.isBoolean(true); // true
ValidationUtils.isArray([]); // true
ValidationUtils.isObject({}); // true
ValidationUtils.isNullOrUndefined(null); // true

// Empty validation
ValidationUtils.isEmpty(''); // true
ValidationUtils.isNotEmpty('hello'); // true
```

## Importing Utilities

You can import individual utility classes:

```typescript
import { StringUtils, DateUtils } from '../utils';
```

Or import all utilities:

```typescript
import * as Utils from '../utils';

Utils.StringUtils.capitalize('hello');
Utils.DateUtils.format(new Date());
```

The logger is also available as the default export for backward compatibility:

```typescript
import logger from '../utils';

logger.info('This is an info message');
```