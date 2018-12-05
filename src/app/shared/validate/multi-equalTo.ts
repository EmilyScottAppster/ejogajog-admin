import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidatorFn, Validator, FormControl } from '@angular/forms';



@Directive({
  selector: '[juriName][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: MultiEqualToValidator, multi: true }
  ]
})
export class MultiEqualToValidator implements Validator {
 @Input() juriName;
  validator: ValidatorFn;
  
  constructor() {
   
  }
  
  validate(c: FormControl) {
    var valueArr = this.juriName.map(function(item){ return item.email }).filter(String);
    console.log(valueArr);
    // var isDuplicate = valueArr.some(function(item, idx){ 
    //   console.log(item);
    //   console.log(idx);
    //   console.log(valueArr.indexOf(item) != idx );
    //     return valueArr.indexOf(item) != idx 
    // });
    // console.log(this.juriName);
    // console.log(isDuplicate);

    function countInArray(array, what) {
      var count = 0;
      for (var i = 0; i < array.length; i++) {
          if (array[i] === what) {
              count++;
          }
      }
      return count;
  }
 // console.log(countInArray(valueArr, c.value));
    if (countInArray(valueArr, c.value) <= 1) {
        return null;
      } else {
        return {
          juriName: {
            valid: false
          }
        };
      }
  }

}