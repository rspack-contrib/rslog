# Rslog

A tiny, intuitive, type-friendly logger for Node.js.

- **Tiny**. [2kB gzipped](https://bundlephobia.com/package/rslog@1).
- **Clean**. Zero dependencies.
- **Intuitive**. Clear log prefix.
- **Type-friendly**. Written in TypeScript.

## Preview

![Artboard](https://github.com/rspack-contrib/rslog/assets/7237365/9677ecb3-eff1-4c0e-9392-9b61b248fe5c)

## Install

```bash
# with npm
npm add rslog

# with yarn
yarn add rslog

# with pnpm
pnpm add rslog

# with bun
bun add rslog
```

## Usage

- Require:

```js
// with require
const { logger } = require('rslog');

// with import
import { logger } from 'rslog';
```

- Log:

```js
// A gradient welcome log
logger.greet(`\n➜ Rslog v1.0.0\n`);

// Info
logger.info('This is a info message');

// Start
logger.start('This is a start message');

// Warn
logger.warn('This is a warn message');

// Ready
logger.ready('This is a ready message');

// Success
logger.success('This is a success message');

// Error
logger.error('This is a error message');
logger.error(new Error('This is a error message with stack'));

// Debug
logger.debug('This is a debug message');

// Same as console.log
logger.log('This is a log message');
```

## Log Level

You can create a new logger instance through `createLogger` and specify the log level:

```js
import { createLogger } from 'rslog';

const logger = createLogger({ level: 'warn' });

// Will print
logger.error('This is a error message');
logger.warn('This is a warn message');

// Will not print
logger.info('This is a info message');
logger.log('This is a log message');
```

You can also directly modify the level attribute of the logger instance:

```js
logger.level = 'verbose';
```

The log levels of each method are as follows:

| Level   | Method                              |
| ------- | ----------------------------------- |
| error   | `error`                             |
| warn    | `warn`                              |
| info    | `info`, `start`, `ready`, `success` |
| log     | `log`                               |
| verbose | `debug`                             |

## Override

You can use `logger.override` to override some or all methods of the default logger.

```js
import { logger } from 'rslog';

logger.override({
  log: message => {
    console.log(`[LOG] ${message}`);
  },
  info: message => {
    console.log(`[INFO] ${message}`);
  },
  warn: message => {
    console.log(`[WARN] ${message}`);
  },
  error: message => {
    console.log(`[ERROR] ${message}`);
  },
});
```

## Environment

Rslog provides both CommonJS and ESModule output and supports Node.js >= 14.

## Credits

Rslog is built with [Modern.js](https://github.com/web-infra-dev/modern.js).

The color implementation of Rslog are modified from [alexeyraspopov/picocolors](https://github.com/alexeyraspopov/picocolors).

## License

Rslog is [MIT licensed](https://github.com/rspack-contrib/rslog/blob/main/LICENSE).
