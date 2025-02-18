import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { StudentCv } from 'src/app/model/DTO/student-cv';
import { CreateCvService } from 'src/app/service/CreateCv/create-cv.service';
import { StudentCvService } from 'src/app/service/student-cv/student-cv.service';
import { TokenStorageService } from 'src/app/service/token/token-storage.service';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/service/student/student.service';

@Component({
  selector: 'app-create-cv',
  templateUrl: './create-cv.component.html',
  styleUrls: ['./create-cv.component.css']
})
export class CreateCvComponent implements OnInit {
  currentStep: 'choose-template' | 'view-template' | 'edit-template' = 'choose-template';
  selectedTemplate: any = null;
  studentId: number ; // Biến lưu `studentId`
  cvData: any = {}; // Lưu thông tin mẫu CV đang chỉnh sửa
  cvs: StudentCv[] = [];

  // 4 mẫu CV
  templates = [
     {
      id: 1,
      name: 'Thanh lịch',
      fields: {
        name: 'Nguyễn Văn A',
        position: 'Chuyên Viên Đào Tạo',
        summary: '02 năm kinh nghiệm đào tạo kỹ năng mềm và bán hàng tại các doanh nghiệp lớn...',
        contact: {
          email: 'nguyenvana@gmail.com',
          phone: '0123 456 789',
          address: '123 Đường ABC, TP. HCM'
        },
        skills: ['Kỹ năng giao tiếp', 'Làm việc nhóm', 'Quản lý thời gian', 'Thuyết trình'],
        education: [
          { school: 'Đại học ABC', degree: 'Cử nhân Khoa học Máy tính', year: '2016 - 2020' }
        ],
        experiences: [
          {
            jobTitle: 'Chuyên Viên Đào Tạo',
            company: 'Công ty XYZ',
            duration: '2020 - 2023',
            description: 'Đào tạo nhân viên và xây dựng nội dung đào tạo.'
          }
        ],
        hobbies: ['Đọc sách', 'Chơi thể thao', 'Du lịch']
      }
    },
    {
      id: 2,
      name: 'Chuyên nghiệp',
      fields: {
        name: 'Trần Văn B',
        position: 'Kỹ Sư Phần Mềm',
        summary: 'Kỹ sư phần mềm với 5 năm kinh nghiệm làm việc tại các công ty công nghệ hàng đầu...',
        contact: {
          email: 'tranvanb@gmail.com',
          phone: '0987 654 321',
          address: '456 Đường DEF, Hà Nội'
        },
        skills: ['JavaScript', 'Node.js', 'Quản lý dự án', 'Phân tích hệ thống'],
        education: [
          { school: 'Đại học DEF', degree: 'Thạc sĩ Khoa học Máy tính', year: '2014 - 2016' }
        ],
        experiences: [
          {
            jobTitle: 'Kỹ Sư Phần Mềm',
            company: 'Công ty ABC',
            duration: '2016 - 2023',
            description: 'Phát triển và quản lý các ứng dụng web quy mô lớn.'
          }
        ],
        hobbies: ['Lập trình', 'Nghiên cứu công nghệ', 'Chơi game']
      }
    },
    {
      id: 3,
      name: 'Tối giản',
      fields: {
        name: 'Phạm Văn C',
        position: 'Nhân Viên Marketing',
        summary: 'Nhân viên Marketing với 3 năm kinh nghiệm về quảng cáo và tiếp thị trực tuyến...',
        contact: {
          email: 'phamvanc@gmail.com',
          phone: '0934 789 456',
          address: '789 Đường GHI, Đà Nẵng'
        },
        skills: ['Content Marketing', 'SEO', 'Social Media', 'Google Ads'],
        education: [
          { school: 'Đại học GHI', degree: 'Cử nhân Quản trị Marketing', year: '2015 - 2019' }
        ],
        experiences: [
          {
            jobTitle: 'Nhân Viên Marketing',
            company: 'Công ty MNO',
            duration: '2019 - 2023',
            description: 'Lên kế hoạch và triển khai các chiến dịch quảng cáo online.'
          }
        ],
        hobbies: ['Xem phim', 'Đọc sách', 'Tham gia sự kiện']
      }
    },
    {
      id: 4,
      name: 'Hiện đại',
      fields: {
        name: 'Lê Văn D',
        position: 'Trưởng Phòng Kinh Doanh',
        summary: 'Chuyên gia trong việc xây dựng và quản lý đội ngũ bán hàng hiệu quả...',
        contact: {
          email: 'levand@gmail.com',
          phone: '0912 345 678',
          address: '321 Đường JKL, TP. Hải Phòng'
        },
        skills: ['Kỹ năng lãnh đạo', 'Quản lý đội nhóm', 'Thuyết trình chuyên nghiệp', 'Đàm phán'],
        education: [
          { school: 'Đại học JKL', degree: 'Thạc sĩ Quản trị Kinh Doanh', year: '2013 - 2015' }
        ],
        experiences: [
          {
            jobTitle: 'Trưởng Phòng Kinh Doanh',
            company: 'Công ty PQR',
            duration: '2015 - 2023',
            description: 'Xây dựng chiến lược kinh doanh và quản lý đội ngũ bán hàng.'
          }
        ],
        hobbies: ['Chơi golf', 'Tham gia hội thảo kinh doanh', 'Đọc sách kỹ năng']
      }
    }
  ];


  constructor(private createCvService: CreateCvService,
              private studentCvService: StudentCvService,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              private studenService: StudentService


  ) {}

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
    console.log('Thông tin user:', user);
  
    if (user) {
      this.studenService.getStudentDetail().subscribe(
        (data) => {
          this.studentId = data.studentId;
          console.log('Student ID lấy được từ token:', this.studentId);
  
          // Chỉ gọi API sau khi `studentId` đã được gán giá trị
          this.loadStudentCvs();
        },
        (error) => {
          console.error('Lỗi khi lấy thông tin sinh viên:', error);
          alert('Không thể lấy thông tin sinh viên. Vui lòng thử lại.');
          this.router.navigate(['/login']);
        }
      );
    } else {
      console.error('Không tìm thấy thông tin user. Vui lòng đăng nhập lại.');
      alert('Không thể xác định thông tin người dùng. Vui lòng đăng nhập lại.');
      this.router.navigate(['/login']);
    }
  }
  

  saveCv(): void {
    if (!this.studentId) {
      console.error('Không thể tạo CV vì không có studentId.');
      alert('Không thể xác định ID sinh viên. Vui lòng đăng nhập lại.');
      return;
    }
  
    const request = {
      studentId: this.studentId,
      cvContent: JSON.stringify(this.cvData),
      filePath: '',
      cvType: this.selectedTemplate.name,
    };
  
    console.log('Request gửi lên API tạo CV:', request);
  
    this.createCvService.createCv(request).subscribe(
      (response) => {
        console.log('CV đã được tạo thành công:', response);
        alert('CV đã được lưu thành công!');
  
        // Thêm CV mới vào danh sách ngay lập tức
        const newCv: StudentCv = {
          studentCvId: response.studentCv.studentCvId,
          studentCvContent: response.studentCv.studentCvContent || '',
          filePath: response.studentCv.filePath || '',
          studentCvType: response.studentCv.studentCvType || '',
          uploadDate: response.studentCv.uploadDate || '',
          studentId: this.studentId, // Sử dụng studentId từ biến
        };
        this.cvs.push(newCv);
  
        // Log danh sách CV hiện tại
        console.log('Danh sách CV sau khi thêm:', this.cvs);
  
        // (Tùy chọn) Gọi lại API để làm mới danh sách từ backend
        this.loadStudentCvs();
      },
      (error) => {
        console.error('Lỗi khi lưu CV:', error);
        alert('Có lỗi xảy ra khi lưu CV. Vui lòng thử lại.');
      }
    );
  }
  
  
  
  
  
  
  loadStudentCvs(): void {
    if (!this.studentId) {
      console.error('Student ID chưa được xác định.');
      return;
    }
  
    this.studentCvService.getAllCvsByStudentId(this.studentId).subscribe(
      (data: StudentCv[]) => {
        console.log('Danh sách CV từ API:', data); // Log dữ liệu trả về
        this.cvs = data; // Gán danh sách CV vào biến hiển thị
      },
      (error) => {
        console.error('Lỗi khi tải danh sách CV:', error);
      }
    );
  }
  
  
  
  
  // Hàm cập nhật danh sách CV
  updateCvs(): void {
    this.studentCvService.getAllCvsByStudentId(this.studentId).subscribe(
      (data) => {
        console.log('Danh sách CV đã được cập nhật:', data);
      },
      (error) => {
        console.error('Error updating CV list:', error);
      }
    );
  }
  

  viewTemplate(template: any) {
    this.selectedTemplate = template;
    this.currentStep = 'view-template';
  }

  createCvWithTemplate() {
    this.cvData = JSON.parse(JSON.stringify(this.selectedTemplate.fields));
    this.currentStep = 'edit-template';
  }
  onPhotoChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.cvData.photo = reader.result as string; // Lưu ảnh đại diện dưới dạng Base64
      };
      reader.readAsDataURL(file);
    }
  }
  backToTemplates() {
    this.currentStep = 'choose-template';
  }

  addSkill() {
    this.cvData.skills.push('');
  }

  addEducation() {
    this.cvData.education.push({ school: '', degree: '', year: '' });
  }

  addExperience() {
    this.cvData.experiences.push({ jobTitle: '', company: '', duration: '', description: '' });
  }

  removeEducation(index: number) {
    this.cvData.education.splice(index, 1);
  }

  removeExperience(index: number) {
    this.cvData.experiences.splice(index, 1);
  }

  exportPDF() {
    const element = document.getElementById('cv-display'); // Lấy phần tử vùng hiển thị CV
    if (element) {
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 190; // Chiều rộng ảnh trong PDF
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        pdf.save(`${this.cvData.name || 'cv'}.pdf`);
      });
    }
  }

  
}