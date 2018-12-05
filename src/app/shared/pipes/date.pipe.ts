import { Pipe, PipeTransform } from '@angular/core'
import * as moment from 'moment'

@Pipe({
   name: 'formatTime'
})
export class OrdinalPipe implements PipeTransform {
   transform(time: any, args?: any): any {
//    return time.substr(10, 9);
    return moment(time).format('Do MMMM YYYY h:mma')

   }
}