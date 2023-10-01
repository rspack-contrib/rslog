# Rslog

A tiny, intuitive, type-friendly logger for Node.js.

- **Tiny**. 1.5kB gzipped.
- **Clean**. Zero dependencies.
- **Intuitive**. Clear log prefix.
- **Type-friendly**. Written in TypeScript.

## Preview

![Artboard](https://github.com/rspack-contrib/rslog/assets/7237365/436d6364-550d-4e0d-bc0f-9df1327c46b3)

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
const { createLogger } = require('rslog');

const logger = createLogger({ level: 'warn' });

// Will print
logger.error('This is a error message');
logger.warn('This is a warn message');

// Will not print
logger.info('This is a info message');
logger.log('This is a log message');
```

The log levels of each method are as follows:

| Level   | Method                              |
| ------- | ----------------------------------- |
| error   | `error`                             |
| warn    | `warn`                              |
| info    | `info`, `start`, `ready`, `success` |
| log     | `log`                               |
| verbose | `debug`                             |
