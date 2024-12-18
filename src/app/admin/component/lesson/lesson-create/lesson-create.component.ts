import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LessonService } from 'src/app/service/lesson/lesson.service';
import { UploadService } from 'src/app/service/uploadFile/upload.service';

@Component({
  selector: 'app-lesson-create',
  templateUrl: './lesson-create.component.html',
  styleUrls: ['./lesson-create.component.css']
})
export class LessonCreateComponent implements OnInit {

  lessonForm: FormGroup;  
  courseId: number;

  file: File | null = null;
  fileUrl: string | null = null;
  url: any;


  constructor(private fb: FormBuilder,
              private activeRoute: ActivatedRoute,
              private uploadService: UploadService,
              private lessonService: LessonService,
              private router: Router,
  ) {}

  ngOnInit(): void {
    this.courseId = +this.activeRoute.parent.snapshot.paramMap.get('id');
    this.lessonForm = this.fb.group({
      lessonName: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(255)]],
      lessonContent: ['', [
        Validators.required,
        Validators.maxLength(255)]],
      video: ['',],
      lessonDuration: ['', [Validators.required,]],
      courseId: [this.courseId, [Validators.required]],
      testId: [null,]
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

  onSubmit(): void {
    const file_data = this.file;
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset','app-bdcs');
    data.append('cloud_name','dhth53ukn');
    this.uploadService.uploadVideo(data).subscribe(response => {
      if(response){
        console.log('response', response);
        this.fileUrl = response.secure_url;
        console.log('Video URL:', this.fileUrl);
        this.lessonForm.patchValue({
          video: this.fileUrl,
        });
        console.log(this.lessonForm.value);
        this.lessonService.createLesson(this.lessonForm.value).subscribe((data) => {
          console.log("Course created successfully:", data);
          const lessonId = data.lessonId;
          console.log('Course ID:', lessonId);
          this.router.navigate(['lesson',lessonId], { relativeTo: this.activeRoute });
          this.router.navigate([`/manage-binDev/course/${lessonId}`]);
        });
      }
    });
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
