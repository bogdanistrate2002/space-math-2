// Mesaje motivaționale afișate la răspuns corect (în română)
export const CORRECT_MESSAGES: string[] = [
  'Bravo! Ești un geniu!',
  'Fantastic! Continuă!',
  'Corect! Ești pe drumul cel bun!',
  'Superb! Zbori spre stele!',
  'Excelent! Astronaut adevărat!',
  'Perfect! Misiunea continuă!',
  'Wow! Incredibil!',
  'Ești de neoprit! Așa da!',
  'Magnific! Universul te aplaudă!',
  'Minunat! Calculele tale sunt perfecte!',
];

// Mesaje la finalizarea unui nivel
export const LEVEL_COMPLETE_MESSAGES: string[] = [
  'Nivel completat cu brio!',
  'Misiune îndeplinită, comandante!',
  'Extraordinar! Nivelul următor te așteaptă!',
  'Ești o rachetă! Mai departe!',
  'Victorie cosmică! Felicitări!',
];

// Mesaje la pierderea vieții
export const WRONG_MESSAGES: string[] = [
  'Ups! Mai încearcă!',
  'Nu-i bai! Continuă!',
  'Aproape! Data viitoare reușești!',
  'Greșit, dar nu te opri!',
];

// Funcție helper pentru mesaj aleatoriu
export function randomMessage(messages: string[]): string {
  const idx = Math.floor(Math.random() * messages.length);
  return messages[idx] ?? messages[0] ?? '';
}
