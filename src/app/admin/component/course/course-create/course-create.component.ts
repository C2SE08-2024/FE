import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CourseService } from "src/app/service/course/course.service";
import { UploadService } from "src/app/service/uploadFile/upload.service";


@Component({
  selector: "app-course-create",
  templateUrl: "./course-create.component.html",
  styleUrls: ["./course-create.component.css"],
})
export class CourseCreateComponent implements OnInit {
  addCourse: FormGroup;
  file: File | null = null;
  fileUrl: string | null = null;

  url:any;

  constructor(private formBuilder: FormBuilder,
              private courseService: CourseService,
              private uploadService: UploadService,
              private router: Router,
            ) {}
  
  ngOnInit(): void {
    this.buildCourseForm();
  }

  buildCourseForm() {
    this.addCourse = this.formBuilder.group({
      courseName: ["", [Validators.required, Validators.maxLength(45)]],
      coursePrice: [0,[Validators.required, Validators.min(1), Validators.max(1000000000)]],
      image: ["", [Validators.required]],
      status: [1, [Validators.required]],
    });
  }

  onFileSelected(event: any): void {
    this.file = event.target.files[0];
    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0])
      reader.onload=(e:any)=>{
        this.url=e.target.result;
      }
    }
  }

  reset() {
    this.addCourse.reset();
  }

  submit() {
    const file_data = this.file;
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset','app-bdcs');
    data.append('cloud_name','dhth53ukn');
    this.uploadService.uploadImage(data).subscribe(response => {
      if(response){
        console.log('response', response);
        this.fileUrl = response.secure_url;
        console.log('Image URL:', this.fileUrl);
        this.addCourse.patchValue({
          image: this.fileUrl,
        });
        console.log(this.addCourse.value);
        this.courseService.createCourse(this.addCourse.value).subscribe((courseData) => {
          console.log("Course created successfully:", courseData);
          const courseId = courseData.courseId;
          console.log('Course ID:', courseId);
          this.router.navigate([`/manage-binDev/course/${courseId}`]);
        });
      }
    });
  }
}
