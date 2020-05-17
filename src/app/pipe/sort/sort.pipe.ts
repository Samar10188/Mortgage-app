import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args === 'custName') {
      return value.sort((a: any, b: any) => {
        if (a.custName < b.custName) {
          return -1;
        } else if (a.custName > b.custName) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (args === 'village') {
      return value.sort((a: any, b: any) => {
        if (a.village < b.village) {
          return -1;
        } else if (a.village > b.village) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    return value;
  }
}
