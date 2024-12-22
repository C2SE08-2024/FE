import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LessonService } from '../../../../service/lesson/lesson.service';
import { Lesson } from 'src/app/model/Lesson/lesson';
import { LessonDTO } from 'src/app/model/DTO/lesson-dto';
import { UploadService } from 'src/app/service/uploadFile/upload.service';

@Component({
  selector: 'app-lesson-edit',
  templateUrl: './lesson-edit.component.html',
  styleUrls: ['./lesson-edit.component.css']
})
export class LessonEditComponent implements OnInit {

  @Input() lessonDTO: LessonDTO;
  file: File;
  editedlesson: LessonDTO;
  uploadedAvatar: any;
  isLoading: boolean = false;
  fileUrl: string;

  constructor(public activeModal: NgbActiveModal,
              private LessonService: LessonService,
              private uploadService: UploadService) { }

  ngOnInit(): void {
    this.editedlesson = { ...this.lessonDTO };
  }

  closeModal(): void {
    this.activeModal.close();
  }

  onFileSelected(event: any): void {
    this.file = event.target.files[0];
  }

  uploadVideo(videoPlayer: HTMLVideoElement): void {
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
          this.editedlesson.video = this.fileUrl,
          videoPlayer.load();
          this.isLoading = false;
        },
        error: (err) => {
          console.error("Error uploading video:", err)
          this.isLoading = false;;
        },
      });
    } else {
      alert("Chưa chọn video")
    }
  }

  //tính duration của video
  updateDuration(durationInSeconds: number): void {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    const formattedDuration = `${minutes}m${seconds}s`;

    // Gán giá trị vào lessonDuration trong form
    this.editedlesson.lessonDuration = formattedDuration
  }

  saveChanges(): void {
    this.LessonService.updateLesson(this.editedlesson.lessonId, this.editedlesson)
      .subscribe(updatedCourse => {
        console.log('Course updated:', updatedCourse);
        this.activeModal.close(this.editedlesson);
      });
  }

}
