import type { Question, Operation, Level } from '../types/game';

// Amestecă un array (Fisher-Yates)
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i]!;
    a[i] = a[j]!;
    a[j] = tmp;
  }
  return a;
}

// Returnează un număr întreg aleatoriu în intervalul [min, max]
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Selectează un element aleatoriu dintr-un array
function randomFrom<T>(arr: T[]): T {
  const el = arr[Math.floor(Math.random() * arr.length)];
  if (el === undefined) throw new Error('Array gol');
  return el;
}

// Calculează rezultatul unei operații
function calculate(a: number, b: number, op: Operation): number {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return a / b;
  }
}

// Generează 4 variante de răspuns plauzibile (include răspunsul corect)
export function generateOptions(correct: number, maxNum: number): number[] {
  const options = new Set<number>([correct]);
  // Diferențe plauzibile față de răspunsul corect
  const deltas = [1, 2, 3, 5, 7, 10, 11, 15];
  let attempts = 0;

  while (options.size < 4 && attempts < 200) {
    attempts++;
    const delta = randomFrom(deltas) * (Math.random() > 0.5 ? 1 : -1);
    const candidate = correct + delta;
    // Variantele greșite trebuie să fie pozitive și rezonabile
    if (candidate > 0 && candidate <= maxNum * 2 && !options.has(candidate)) {
      options.add(candidate);
    }
  }

  // Fallback dacă nu am putut genera 4 variante unice
  let fallback = correct + 1;
  while (options.size < 4) {
    if (!options.has(fallback) && fallback > 0) options.add(fallback);
    fallback++;
  }

  return Array.from(options);
}

// Generează o întrebare completă pentru un nivel dat
export function generateQuestion(level: Level): Question {
  const operation = randomFrom(level.operations);
  let a: number;
  let b: number;

  if (operation === '/') {
    // Împărțire cu rezultat întreg pozitiv
    b = randomInt(1, Math.min(10, level.maxNumber));
    const maxQuotient = Math.floor(level.maxNumber / b);
    const quotient = randomInt(1, Math.max(1, maxQuotient));
    a = b * quotient;
  } else if (operation === '-' && !level.allowNegative) {
    // Scădere fără rezultat negativ pentru nivelurile 1-2
    a = randomInt(1, level.maxNumber);
    b = randomInt(1, a);
  } else {
    a = randomInt(1, level.maxNumber);
    b = randomInt(1, level.maxNumber);
  }

  const correctAnswer = calculate(a, b, operation);
  const options = generateOptions(correctAnswer, level.maxNumber);

  return {
    id: crypto.randomUUID(),
    operand1: a,
    operand2: b,
    operation,
    correctAnswer,
    options: shuffle(options),
  };
}
