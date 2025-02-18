import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { LessonService } from "src/app/service/lesson/lesson.service";
import { UploadService } from "src/app/service/uploadFile/upload.service";

@Component({
  selector: "app-lesson-create",
  templateUrl: "./lesson-create.component.html",
  styleUrls: ["./lesson-create.component.css"],
})
export class LessonCreateComponent implements OnInit {
  lessonForm: FormGroup;
  courseId: number = null;

  file: File = null;
  fileUrl: string | null = null;
  url: any;

  //loading khi upload vieo
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private uploadService: UploadService,
    private lessonService: LessonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.courseId = +this.activeRoute.snapshot.paramMap.get("id");
    console.log(this.courseId);
    this.buildLessonForm();
  }

  buildLessonForm(): void {
    this.lessonForm = this.fb.group({
      lessonName: ["",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(255),
        ],
      ],
      lessonContent: ["", [Validators.required, Validators.maxLength(255)]],
      video: [""],
      lessonDuration: ["", [Validators.required]],
      courseId: [, [Validators.required]],
      testId: [null],
    });
  }

  onFileSelected(event: any): void {
    this.file = event.target.files[0];
  }

  uploadVideo(): void {
    if (this.file) {
      this.isLoading = true;
      const data = new FormData();
      data.append("file", this.file);
      data.append("upload_preset", "test123");
      this.uploadService.uploadVideo(data).subscribe({
        next: (response) => {
          console.log("Upload successful:", response);
          this.fileUrl = response.secure_url;
          console.log('Video URL:', this.fileUrl);
          this.updateDuration(response.duration);
          this.lessonForm.patchValue({
            video: this.fileUrl,
          });
          this.isLoading = false;
        },
        error: (err) => {
          console.error("Error uploading video:", err)
          this.isLoading = false;;
        },
      });
    }else{
      alert("Chưa chọn video")
    }
  }

  //tính duration của video
  updateDuration(durationInSeconds: number): void {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    const formattedDuration = `${minutes}m${seconds}s`;

    // Gán giá trị vào lessonDuration trong form
    this.lessonForm.patchValue({
      lessonDuration: formattedDuration
    });
  }

  onSubmit(): void {
    console.log(this.lessonForm.value);
    if(this.courseId){
      this.lessonForm.patchValue({
        courseId: this.courseId,
      });
      if (this.lessonForm.valid) {
        console.log(this.lessonForm.value);
        this.lessonService.createLesson(this.lessonForm.value).subscribe((data) => {
          alert("Course created successfully");
          const lessonId = data.lessonId;
          console.log('Course ID:', lessonId);
          this.router.navigate([`/manage-binDev/course/${this.courseId}/lesson`]);
        });
      }
    }
  }
}



