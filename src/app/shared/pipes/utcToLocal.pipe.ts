import { Pipe, PipeTransform } from '@angular/core';
declare var moment: any;
@Pipe({name: 'utcToLocal'})
export class UTCtoLocal implements PipeTransform {
  transform(input: string): any {
    const time = moment.utc(input);
    const localTime = time.local().format('MM-DD-YYYY h:mm A');
    return localTime;
  }
}