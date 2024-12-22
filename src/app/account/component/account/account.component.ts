import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/service/token/token-storage.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  role: any;

  constructor(private tokenStorageService: TokenStorageService,) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.role = this.tokenStorageService.getRole();
    }
  }
}
