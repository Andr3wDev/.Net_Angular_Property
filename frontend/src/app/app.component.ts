import { Component } from '@angular/core';
import { LoadingService } from './Services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'property';
  showLoader = false;

  constructor(private spinnerService: LoadingService) {
    this.spinnerService.spinner$.subscribe((data: boolean) => {
      setTimeout(() => {
        this.showLoader = data ? data : false;
      });
    });
  }
}
