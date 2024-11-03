import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showScrollButton: boolean = false;

  @HostListener('window:scroll', [])
  
  onWindowScroll() {
    this.showScrollButton = window.scrollY > 200;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }
  constructor() { }

  ngOnInit(): void {
  }

}
