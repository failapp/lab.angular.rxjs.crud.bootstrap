import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {

    //console.log('value -> ' + value.toLowerCase());
    if (value.toLowerCase().includes('female')) {
      return 'F';
    } else {
      return 'M';
    }
    
  }

}
