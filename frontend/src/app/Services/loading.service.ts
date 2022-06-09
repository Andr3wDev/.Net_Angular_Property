import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public spinner$: Subject<any>;

  constructor() {
    this.spinner$ = new Subject<any>();
  }

  showLoader() {
    this.spinner$.next(true);
  }

  hideLoader() {
    this.spinner$.next(false);
  }
}
