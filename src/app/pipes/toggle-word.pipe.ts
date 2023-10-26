import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'toggleWord'
})

export class ToggleWordPipe implements PipeTransform {
    transform( value: string, toUpper: boolean = false ): string {
        return  toUpper ? value.toUpperCase():value.toLowerCase();
      }
}