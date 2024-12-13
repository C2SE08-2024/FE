import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from 'src/app/service/lesson/lesson.service';
import { UploadService } from 'src/app/service/uploadFile/upload.service';

@Component({
  selector: 'app-lesson-create',
  templateUrl: './lesson-create.component.html',
  styleUrls: ['./lesson-create.component.css']
})
export class LessonCreateComponent implements OnInit {

  lessonForm: FormGroup;  // FormGroup chứa các trường của lessonDTO
  courseId: number;

  selectedImage: File | null = null;
  uploadedImageUrl: string = '';

  constructor(private fb: FormBuilder,
              private activeRoute: ActivatedRoute,
              private uploadService: UploadService,
              private lessonService: LessonService,
  ) {}

  ngOnInit(): void {
    this.courseId = +this.activeRoute.parent.snapshot.paramMap.get('id');
    this.lessonForm = this.fb.group({
      lessonName: ['', [Validators.required]],  
      lessonContent: ['', [Validators.required]],  
      video: ['',],  
      lessonDuration: [null, [Validators.required, Validators.min(1)]],  
      courseId: [this.courseId, [Validators.required]],  
      testId: [null,] 
    });
  }

  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedImage) {
      this.uploadService.uploadImage(this.selectedImage).subscribe(
        (response) => {
          // Lấy URL ảnh từ Cloudinary
          this.uploadedImageUrl = response.secure_url;
          console.log('Image uploaded successfully!', this.uploadedImageUrl);
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.lessonForm.valid) {
      console.log('Lesson created successfully:', this.lessonForm.value);
      this.lessonService.createLesson(this.lessonForm.value).subscribe(
        (response) => {
          console.log('Lesson created successfully:', response);
        },
        (error) => {
          console.error('Error creating lesson:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

}
