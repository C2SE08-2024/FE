import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BinDev ';
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.checkScroll();
}
checkScroll(): void {
  const fadeInElements = document.querySelectorAll('.fade-in');
  fadeInElements.forEach((el: any) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('show');
    }
  });
}
}
