import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../Services/alertify.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  loggedinUser: string;

  constructor(private alertifyService: AlertifyService) { }

  ngOnInit() {
  }
  loggedin(){
    this.loggedinUser = localStorage.getItem('userName');
    return this.loggedinUser;
  }
  onLogout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.alertifyService.success('Log out successful');
  }
}
