import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from 'src/app/service/job/job.service';
import { JobApplicationService } from 'src/app/service/job-application/job-application.service';
import { StudentCvService } from 'src/app/service/student-cv/student-cv.service';
import { JobDTO } from 'src/app/model/Job/job';
import { StudentCv } from 'src/app/model/DTO/student-cv';
import { TokenStorageService } from 'src/app/service/token/token-storage.service';
import { StudentService } from 'src/app/service/student/student.service';

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
  selectedFile: File | null = null; // Biến lưu trữ file được chọn
  fileContentBase64: string | null = null; // Nội dung file ở dạng Base64

  loading: boolean = true;
  errorMessage: string | null = null;
  studentId: number ; // Giả sử bạn lấy được ID sinh viên từ trạng thái đăng nhập
  businessId: number | null = null; // ID doanh nghiệp lấy từ job

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private jobApplicationService: JobApplicationService,
    private studentCvService: StudentCvService,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private studenService: StudentService

  ) {}

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
    console.log('Thông tin user:', user);
    if (user) {
      this.studenService.getStudentDetail().subscribe(
        data => {
          this.studentId = data.studentId;
          console.log('Student ID lấy được từ token:', this.studentId);
        }
      )
    }
    const jobId = Number(this.route.snapshot.paramMap.get('jobId'));
    if (jobId) {
      this.loadJobDetails(jobId);
      this.loadStudentCvs();
    } else {
      this.errorMessage = 'Không tìm thấy ID công việc.';
      this.loading = false;
    }
    this.loadStudentCvs();

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
        console.log('Danh sách CV từ API:', data); // Log dữ liệu từ backend
        this.cvs = data;
        if (this.cvs.length === 0) {
          console.warn('Danh sách CV rỗng. Kiểm tra backend hoặc dữ liệu sinh viên.');
        }
      },
      (error) => {
        console.error('Lỗi khi tải danh sách CV:', error);
        this.errorMessage = 'Không thể tải danh sách CV.';
      }
    );
  }
  
  onSelectCv(cvId: number): void {
    if (cvId) {
      this.selectedCvId = cvId; // Cập nhật ID của CV được chọn
      console.log('CV đã chọn:', cvId); // Log để kiểm tra (tuỳ chọn)
    } else {
      console.warn('Không có CV nào được chọn.');
    }
  }
  // Cập nhật `filePath` khi người dùng chọn CV
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
  
      const reader = new FileReader();
      reader.onload = () => {
        this.fileContentBase64 = reader.result as string; // Chuyển file sang Base64
        console.log('File đã chọn và mã hóa Base64:', this.fileContentBase64);
      };
      reader.readAsDataURL(file);
    } else {
      this.selectedFile = null;
      this.fileContentBase64 = null;
      console.warn('Không có file nào được chọn.');
    }
  }
  

  uploadCvAndApply(): void {
    if (!this.selectedFile || !this.fileContentBase64) {
      alert('Vui lòng chọn file trước khi nộp.');
      return;
    }
  
    if (!this.job || !this.studentId) {
      alert('Thông tin công việc hoặc ID sinh viên không hợp lệ.');
      return;
    }
  
    const request = {
      studentId: this.studentId,
      businessId: this.job.businessId,
      jobId: this.job.jobId,
      filePath: this.fileContentBase64, // Gửi nội dung file dưới dạng Base64
      cvType: 'Uploaded File', // Đặt loại CV là "Uploaded File"
    };
  
    this.jobApplicationService.submitCv(
      request.studentId,
      request.businessId,
      request.jobId,
      request.filePath
    ).subscribe(
      (response) => {
        console.log('Tải lên và nộp CV thành công:', response);
        alert('CV đã được tải lên và nộp thành công!');
        this.router.navigate(['/jobs']);
      },
      (error) => {
        console.error('Lỗi khi nộp CV:', error);
        alert('Có lỗi xảy ra khi tải lên CV. Vui lòng thử lại.');
      }
    );
  }
  
    
  

  // Nộp CV
  applyForJob(): void {
    if (!this.selectedCvId) {
      alert('Vui lòng chọn một CV trước khi nộp.');
      return;
    }

    if (!this.job) {
      alert('Thông tin công việc không đầy đủ.');
      return;
    }

    this.jobApplicationService.submitCv(this.studentId, this.job.businessId, this.selectedCvId, this.job.jobId).subscribe(
      () => {
        alert('Nộp CV thành công!');
        this.router.navigate(['/jobs']);
      },
      (error) => {
        console.error('Error applying for job:', error);
        alert('Có lỗi xảy ra khi nộp CV.');
      }
    );
  }
  
}
