import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-create-cv',
  templateUrl: './create-cv.component.html',
  styleUrls: ['./create-cv.component.css']
})
export class CreateCvComponent implements OnInit {
  cvForm: FormGroup;
  profileImageSrc: string | ArrayBuffer | null = null;
  @ViewChild('cvPreview', { static: false }) cvPreview!: ElementRef;

  constructor(private fb: FormBuilder) { 
    this.cvForm = this.fb.group({
      name: ['', Validators.required],
      title: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: [''],
      summary: [''],
      experiences: this.fb.array([]),
      education: this.fb.array([]),
      skills: this.fb.array([]),
      hobbies: this.fb.array([]),
      additionalInfo: [''] // Thêm trường "Những thông tin khác"
    });
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => this.profileImageSrc = e.target?.result;
      reader.readAsDataURL(file);
    }
  }

  get experiences(): FormArray {
    return this.cvForm.get('experiences') as FormArray;
  }

  addExperience() {
    this.experiences.push(this.fb.group({
      jobTitle: ['', Validators.required],
      company: [''],
      duration: [''],
      description: [''],
    }));
  }

  removeExperience(index: number) {
    this.experiences.removeAt(index);
  }

  get education(): FormArray {
    return this.cvForm.get('education') as FormArray;
  }

  addEducation() {
    this.education.push(this.fb.group({
      school: ['', Validators.required],
      degree: [''],
      year: [''],
    }));
  }

  removeEducation(index: number) {
    this.education.removeAt(index);
  }

  get skills(): FormArray {
    return this.cvForm.get('skills') as FormArray;
  }

  addSkill() {
    this.skills.push(this.fb.control('', Validators.required));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  get hobbies(): FormArray {
    return this.cvForm.get('hobbies') as FormArray;
  }

  addHobby() {
    this.hobbies.push(this.fb.control('', Validators.required));
  }

  removeHobby(index: number) {
    this.hobbies.removeAt(index);
  }

  exportPDF() {
    html2canvas(this.cvPreview.nativeElement, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
  
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('cv-topcv-style.pdf');
    }).catch(error => {
      console.error('Lỗi khi xuất PDF:', error);
    });
  }
  

  ngOnInit(): void {}
}
