import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FastPayDialogService {
  private dialogTrigger = new Subject<any>();
  dialog$ = this.dialogTrigger.asObservable();

  openDialog(productId:string , quantity:number) {
    this.dialogTrigger.next({productId , quantity});
  }


}
