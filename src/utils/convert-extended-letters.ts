export function convertExtendedLetter(char: string) {
  const extended = {
    ü: 'u',
    ö: 'o',
    ğ: 'g',
    ə: 'e',
    ı: 'i',
    ş: 's',
    ç: 'c',
    Ü: 'U',
    İ: 'I',
    Ö: 'O',
    Ğ: 'G',
    Ə: 'E',
    Ş: 'S',
    Ç: 'C',
  };

  if (Object.prototype.hasOwnProperty.call(extended, char)) {
    return extended[char as keyof typeof extended];
  }

  return char;
}

export function convertExtendedLetters(str: string) {
  return str.split('').map(convertExtendedLetter).join('');
}
