import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detailcourse',
  templateUrl: './detailcourse.component.html',
  styleUrls: ['./detailcourse.component.css']
})
export class DetailcourseComponent implements OnInit {
  course: any;

  courses = [
    { id: 1, name: 'Machine Learning', description: 'Học Machine Learning với Python.', price: 5000000, image: 'https://img.icons8.com/color/452/ai.png' },
    { id: 2, name: 'Data Science', description: 'Học Data Science toàn diện.', price: 4000000, image: 'https://img.icons8.com/external-flat-juicy-fish/452/external-data-science-data-science-flat-flat-juicy-fish.png' },
    { id: 3, name: 'AI Nâng Cao', description: 'Khám phá công nghệ AI tiên tiến.', price: 6000000, image: 'https://img.icons8.com/color/452/artificial-intelligence.png' },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.course = this.courses.find(course => course.id === id);
  }

  goToPayment() {
    this.router.navigate(['/payment', this.course.id]);
  }
}