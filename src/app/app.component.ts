import { Component, OnInit } from '@angular/core';
import { authService } from './shared/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'angularTask3';

  constructor(private authService: authService){

  }
  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
