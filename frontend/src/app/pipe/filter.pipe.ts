import { removeSummaryDuplicates } from '@angular/compiler';
import { Pipe, PipeTransform } from '@angular/core';
import { fromEventPattern } from 'rxjs';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: string, propName: string): any[] {

    const resultArray = [];
    if (value){
        if (value.length === 0 || filterString === '' || propName === '') {
          return value;
        }

        for (const item of value) {
          if (item[propName] === filterString) {
              resultArray.push(item);
          }
        }
    }
    return resultArray;
  }
}
