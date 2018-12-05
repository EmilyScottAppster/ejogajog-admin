import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/Rx';
@Injectable()
export class SpinnerService {
  showLoader: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() { }
  
  

}
