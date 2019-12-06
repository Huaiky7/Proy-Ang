import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../security/service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  salir() {
    this.authenticationService.logout();
  }
}
