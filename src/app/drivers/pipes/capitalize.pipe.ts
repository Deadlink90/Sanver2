import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
})

export class CapitalizePipe implements PipeTransform {
  transform(value: any): string {
    if (!value) return 'No proporcionado';

    const words = value.split(' ');

    const capitalizedWords = words.map((word: any) => {
      const firstLetter = word.charAt(0).toUpperCase();
      const restOfWord = word.slice(1).toLowerCase();
      return firstLetter + restOfWord;
    });

    // Concatena las palabras modificadas en una nueva cadena
    const capitalizedStr = capitalizedWords.join(' ');

    return capitalizedStr;
  }
}
