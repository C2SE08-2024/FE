import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from 'src/app/service/job/job.service';
import { JobApplicationService } from 'src/app/service/job-application/job-application.service';
import { StudentCvService } from 'src/app/service/student-cv/student-cv.service';
import { JobDTO } from 'src/app/model/Job/job';
import { StudentCv } from 'src/app/model/DTO/student-cv';

@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.css']
})
export class JobApplicationComponent implements OnInit {
  job: JobDTO | null = null;
  cvs: StudentCv[] = [];
  selectedCvId: number | null = null; // ID của CV được chọn
  selectedFilePath: string | null = null; // Đường dẫn của CV được chọn
  loading: boolean = true;
  errorMessage: string | null = null;
  studentId: number = 1; // Giả sử bạn lấy được ID sinh viên từ trạng thái đăng nhập
  businessId: number | null = null; // ID doanh nghiệp lấy từ job

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private jobApplicationService: JobApplicationService,
    private studentCvService: StudentCvService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const jobId = Number(this.route.snapshot.paramMap.get('jobId'));
    if (jobId) {
      this.loadJobDetails(jobId);
      this.loadStudentCvs();
    } else {
      this.errorMessage = 'Không tìm thấy ID công việc.';
      this.loading = false;
    }
  }

  // Lấy thông tin công việc
  loadJobDetails(jobId: number): void {
    this.jobService.getJobById(jobId).subscribe(
      (data: JobDTO) => {
        if (data && data.businessId) {
          this.job = data;
          this.businessId = data.businessId;
        } else {
          this.errorMessage = 'Thông tin công việc không hợp lệ.';
        }
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Không thể tải thông tin công việc. Vui lòng thử lại sau.';
        this.loading = false;
      }
    );
  }

  // Lấy danh sách CV của sinh viên
  loadStudentCvs(): void {
    this.studentCvService.getAllCvsByStudentId(this.studentId).subscribe(
      (data: StudentCv[]) => {
        this.cvs = data;
      },
      (error) => {
        this.errorMessage = 'Không thể tải danh sách CV.';
      }
    );
  }

  // Cập nhật `filePath` khi người dùng chọn CV
  onSelectCv(cvId: number): void {
    const selectedCv = this.cvs.find(cv => cv.studentCvId === cvId);
    if (selectedCv) {
      this.selectedCvId = selectedCv.studentCvId;
      this.selectedFilePath = selectedCv.filePath;
    }
  }

  // Nộp CV
  applyForJob(): void {
    if (!this.selectedCvId || !this.selectedFilePath) {
      alert('Vui lòng chọn một CV trước khi nộp đơn.');
      return;
    }

    if (!this.job || !this.businessId) {
      console.error('Thông tin công việc không đầy đủ', this.job, this.businessId);
      alert('Thông tin công việc không đầy đủ. Không thể nộp đơn.');
      return;
    }

    this.jobApplicationService.submitCv(this.studentId, this.businessId, this.selectedCvId, this.job.jobId).subscribe(
      () => {
        alert('Nộp CV thành công!');
        this.router.navigate(['/jobs']);
      },
      (error) => {
        console.error('Error applying for job', error);
        alert('Có lỗi xảy ra khi nộp đơn. Vui lòng thử lại.');
      }
    );
  }
}
