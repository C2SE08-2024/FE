import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CourseService } from "src/app/service/course/course.service";
import { GgDriveService } from '../../../../service/uploadFile/gg-drive.service';


@Component({
  selector: "app-course-create",
  templateUrl: "./course-create.component.html",
  styleUrls: ["./course-create.component.css"],
})
export class CourseCreateComponent implements OnInit {
  addCourse: FormGroup;
  file: File | null = null;
  fileUrl: string | null = null;
  selectedFile: File | null = null;

  constructor(private formBuilder: FormBuilder,
              private courseService: CourseService,
              private ggDriveService: GgDriveService,
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.ggDriveService.initializeGoogleClient();
  }

  buildForm() {
    this.addCourse = this.formBuilder.group({
      courseName: ["", [Validators.required, Validators.maxLength(45)]],
      coursePrice: [0,[Validators.required, Validators.min(1), Validators.max(1000000000)]],
      image: ["", [Validators.required]],
      status: [1, [Validators.required]],
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.file = file;
      this.uploadImageToDrive(file);  // Gọi hàm upload image
    }
  }

  // Upload hình ảnh lên Google Drive và cập nhật URL vào form
  uploadImageToDrive(file: File): void {
    this.ggDriveService.uploadFile(file).then((url: string) => {
      console.log('Image uploaded to Google Drive:', url);
      this.addCourse.patchValue({
        image: url,  // Cập nhật URL vào trường image
      });
    }).catch((error) => {
      console.error('Upload failed:', error);
    });
  }

  reset() {
    this.addCourse.reset();
  }

  submit() {
    console.log(this.addCourse.value);
    this.courseService.createCourse(this.addCourse.value).subscribe(() => {
      console.log("successful:");
      this.reset();
    });
  }

}
