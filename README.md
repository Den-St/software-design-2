# Software Design 2 Library

## Опис бібліотеки

Невелика навчальна бібліотека для роботи з рядками, числами та логуванням.
Вона містить базові утиліти (`add`, `capitalize`), роботу з форматуванням чисел (`formatNumber`), а також клас `Logger` з рівнями логування.
Проєкт демонструє еволюцію бібліотеки від простих функцій до додавання конфігурації та класів.

---

## Файли

### `index.ts`

```ts
import { config } from './config';

// базові функції
export function add(values: number[]): number {
  return values.reduce((acc, x) => acc + x, 0);
}
console.log('sum(2.0 ok):', add([2, 3, 4]));

export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// складний тип і форматер (дефолт з APP_PRECISION)
export type NumberFormatOptions = {
  precision?: number;
  locale?: string;
};

export function formatNumber(value: number, options?: NumberFormatOptions): string {
  const precision = options?.precision ?? config.APP_PRECISION;
  return value.toFixed(precision);
}

// НОВЕ: клас Logger з літеральним типом рівня логування
export type LogLevel = 'silent' | 'info' | 'debug';
export class Logger {
  constructor(private level: LogLevel) {}

  info(msg: string): void {
    if (this.level !== 'silent') {
      console.log('[INFO]', msg);
    }
  }

  debug(msg: string): void {
    if (this.level === 'debug') {
      console.log('[DEBUG]', msg);
    }
  }
}
```

### `demo.ts`

```ts
import { add, capitalize, formatNumber, Logger, type LogLevel } from './index';
import { config } from './config';

console.log('sum(typed):', add([2, 3]));
console.log('capitalize(typed):', capitalize('hello'));
console.log('format(ok):', formatNumber(123.456)); // precision береться з APP_PRECISION

// ПОМИЛКА ТИПІВ (НАВМИСНО): 'verbose' не входить у 'silent' | 'info' | 'debug'
const logger = new Logger(config.LOG_LEVEL as LogLevel); // значення з .env пройшло валідацію zod

logger.info('Application started');
logger.debug('Extra debug info');
```

### `.env`

```ini
APP_PRECISION=3
LOG_LEVEL=debug
```

---

## Семантичне версіонування

| Версія | Зміни                                                                                             |
| ------ | ------------------------------------------------------------------------------------------------- |
| 0.1.0  | прості функції з any                                                                              |
| 0.2.0  | ті самі функції з базовими типами (сумісність збережено)                                          |
| 0.3.0  | нова функція зі складним типом (сумісність збережено)                                             |
| 0.4.0  | інтерфейси + groupBy<T> (сумісність збережено)                                                    |
| 0.5.0  | клас Logger + .env/zod, formatNumber бере точність з APP_PRECISION (сумісність збережено)         |
| 1.0.0  | «стабілізація API»: експорти, посилений ESLint, збірка                                            |
| 2.0.0  | breaking change: зміна сигнатури add на прийом number\[]; у demo.ts показано виправлення викликів |

---

## Приклади використання

```ts
import { add, capitalize, formatNumber, Logger, type LogLevel } from 'software-design-2';

// Базові функції
console.log(add([2, 3, 4])); // 9
console.log(capitalize('hello')); // "Hello"

// Форматування чисел
console.log(formatNumber(3.14159)); // "3.142" (precision з .env)

// Клас Logger
const logger = new Logger('debug');
logger.info('App started'); // [INFO] App started
logger.debug('Debug message'); // [DEBUG] Debug message
```

---

## Налаштування `.env`

```ini
APP_PRECISION=3   # кількість знаків після коми для formatNumber
LOG_LEVEL=debug   # рівень логування: silent | info | debug
```

---

## Коміти (історія)

```
feat(logger): add signature to accept number
2.0.0
chore: stabilize public API; forbid any; add package exports
1.5.0
feat: add Logger class and env config via zod; formatNumber uses APP_PRECISION
1.4.0
feat: add User interface and generic groupBy
1.3.0
feat: add formatNumber with NumberFormatOptions
1.2.0
feat: add basic types for utils (number/string)
1.1.0
feat: basic utils with any (add, capitalize)
chore: project scaffolding (npm, tsconfig, eslint, prettier, husky, commitlint, scripts)
```

---

## Перевірка перед здачею

- Репозиторій доступний і містить усі описані файли/конфіги.
- Husky-хуки спрацьовують локально.
- `npm run typecheck`, `npm run lint`, `npm run format:check` проходять без помилок.
- Є теги та послідовність комітів, що відображає кроки завдання.
- `npm run build` створює `dist/` з CJS/ESM та `.d.ts`.
- У коді немає `any` у версії 1.0.0+.
- Видимий breaking change у 2.0.0 і виправлення викликів у `demo.ts`.

```

```

## Посилання на теги релізів

- [v1.1.0](https://github.com/Den-St/software-design-2/releases/tag/v1.1.0)
- [v1.2.0](https://github.com/Den-St/software-design-2/releases/tag/v1.2.0)
- [v1.3.0](https://github.com/Den-St/software-design-2/releases/tag/v1.3.0)
- [v1.4.0](https://github.com/Den-St/software-design-2/releases/tag/v1.4.0)
- [v1.5.0](https://github.com/Den-St/software-design-2/releases/tag/v1.5.0)
- [v2.0.0](https://github.com/Den-St/software-design-2/releases/tag/v2.0.0)
- [v3.0.0](https://github.com/Den-St/software-design-2/releases/tag/v3.0.0)
