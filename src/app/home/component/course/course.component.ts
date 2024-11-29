import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  courses = [
    { id: 1, name: 'Machine Learning', description: 'Học Machine Learning với Python.', price: 5000000, image: 'https://img.icons8.com/color/452/ai.png' },
    { id: 2, name: 'Data Science', description: 'Học Data Science toàn diện.', price: 4000000, image: 'https://img.icons8.com/external-flat-juicy-fish/452/external-data-science-data-science-flat-flat-juicy-fish.png' },
    { id: 3, name: 'AI Nâng Cao', description: 'Khám phá công nghệ AI tiên tiến.', price: 6000000, image: 'https://img.icons8.com/color/452/artificial-intelligence.png' },
  ];
  
  constructor(private router: Router) { }

  goToDetail(courseId: number) {
    this.router.navigate(['/course', courseId]);
  }

  ngOnInit(): void {
  }

}
