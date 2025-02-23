import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'squarePipe',
})
export class SquarePipeForLab implements PipeTransform {
  transform(value: number | string): number | string {
    // If it's a number, square it
    if (typeof value === 'number') {
      return value * value;
    }

    // If it's a string that contains anything other than digits, return 'not a number'
    if (!/^\d+$/.test(value)) {
      return 'not a number';
    }

    // Convert string to number and square it
    const num = parseInt(value);
    return num * num;
  }
}
