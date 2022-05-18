import { Injectable } from '@angular/core';
import * as alertifyjs from 'alertifyjs';
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }
  success(message: string) {
    alertifyjs.dismissAll();
    alertifyjs.success(message);
  }
  warning(message: string) {
    alertifyjs.dismissAll();
    alertifyjs.warning(message);
  }
  error(message: string) {
    alertifyjs.dismissAll();
    alertifyjs.error(message);
  }
}
