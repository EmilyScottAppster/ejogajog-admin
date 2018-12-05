
import {Injectable} from '@angular/core'
import {BehaviorSubject} from 'rxjs/Rx';
@Injectable()
export class SharedService {
    userInfo: BehaviorSubject<Array<{}>> = new BehaviorSubject(undefined);
    teamList: BehaviorSubject<Array<{}>> = new BehaviorSubject(undefined);
}
