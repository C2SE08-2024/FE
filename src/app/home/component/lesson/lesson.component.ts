import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from 'src/app/service/lesson/lesson.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {
  courseId: number;             // ID của khóa học
  lessons: any[] = [];          // Danh sách bài học
  errorMessage: string = '';    // Biến lưu lỗi nếu có
  selectedLesson: number | null = null; // Bài học đang chọn

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService
  ) {}

  ngOnInit(): void {
    this.courseId = +this.route.snapshot.paramMap.get('id')!;
    this.loadLessons();
  }

  loadLessons(): void {
    this.lessonService.getLessonsByCourseId(this.courseId).subscribe(
      (data) => {
        this.lessons = data;
      },
      (error) => {
        this.errorMessage = 'Không thể tải bài học, vui lòng thử lại sau!';
      }
    );
  }

  isLessonUnlocked(index: number): boolean {
    if (index === 0) {
      return true; // Bài học đầu tiên luôn mở khóa
    }
    return this.lessons[index - 1]?.isCompletedByStudent; // Kiểm tra trạng thái của bài học trước
  }

  markAsCompleted(lesson: any): void {
    if (!lesson) {
      console.error('Không thể đánh dấu bài học. Dữ liệu bài học không hợp lệ.');
      return;
    }
    lesson.isCompletedByStudent = true;
    this.lessonService.updateLessonStatus(lesson.id, true).subscribe(
      (response) => {
        console.log('Bài học đã được đánh dấu hoàn thành');
      },
      (error) => {
        console.error('Không thể cập nhật trạng thái bài học');
      }
    );
  }
}
