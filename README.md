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
// Same as console.log
logger.log('This is a log message');

// Info
logger.info('This is a info message');

// Warn
logger.warn('This is a warn message');

// Debug
logger.debug('This is a debug message');

// Ready
logger.ready('This is a ready message');

// Success
logger.success('This is a success message');

// Error
logger.error('This is a error message');
logger.error(new Error('This is a error message with stack'));
```
