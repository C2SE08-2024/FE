import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from 'src/app/model/Job/job';
import { BusinessService } from 'src/app/service/business/business.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {

  @Input() job: Job;

  errorMessage: string;

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private businessService: BusinessService,
              // public activeModal: NgbActiveModal,
  ) {}

  ngOnInit(): void {
    if (this.job) {
      // this.loadTests();
    } else {
      const courseId = +this.activeRoute.snapshot.paramMap.get('id');
      // this.businessService.getJobById(courseId).subscribe(
      //   (data) => {
      //     this.job = data;
      //     // this.loadTests();
      //   },
      //   (error) => {
      //     console.error('Error fetching course detail:', error);
      //   }
      // );
    }  
  }

  // loadTests(): void {
  //   this.testService.getTestsByCourse(this.job.courseId).subscribe(
  //     (tests) => {
  //       this.tests = tests;
  //     },
  //     (error) => {
  //       console.error('Error fetching tests:', error);
  //       this.errorMessage = 'Không thể tải danh sách bài kiểm tra';
  //     }
  //   );
  // }

  // goToTestQuestion( testId: number): void {
  //   this.router.navigate(['manage-binDev/course', this.course.courseId, 'test', testId, 'test-question']);
  // }

}
