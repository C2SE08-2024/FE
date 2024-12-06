import { Component, OnInit } from '@angular/core';
import { accData } from './account-data';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  showDeletePopup = false;
  deletePetId: number;
  accData = accData;
  // selectedBreedId: number;
  // filterPet: Pet[];
  // originalPetList: Pet[];
  // petList: Pet[];
  // BreedList: Breed[];
  // displayedPets: Pet[];
  // showAll = false;
  // show = true;
  // totalPets: number = 0;
  // petsPerPage: number = 10;
  // currentPage: number = 1;
  // sortType: string ='';
  // sortOrder: string = '';
  // selectedBreed: number;
  // searchTerm : string ='';
  
  // constructor( private petService : PetService,
  //              private Breed : BreedService,
  //              private modalService: NgbModal) { }

  ngOnInit(): void {
    // this.Breed.getAllBreed().subscribe((data) => {
    //   this.BreedList = data
    // })
    // this.loadPet();
  }

  // loadPet(): void {
  //   this.petService.getAllPet().subscribe((data) => {
  //     this.originalPetList = data; // Lưu trữ danh sách sản phẩm gốc
  //     this.petList = [...this.originalPetList]; // Clone danh sách để không ảnh hưởng đến danh sách gốc
  //     this.petList.sort((a, b) => b.petId - a.petId);
  //     this.totalPets = this.petList.length;
  //     this.displayedPets = this.getPetSlice();
  //     this.currentPage = 1;
  //   });
  // }

  // filterPets() {
  //   if (this.selectedBreed) {
  //     this.petService.getByBreedId(this.selectedBreed).subscribe((data) => {
  //       this.originalPetList = data; // Lưu trữ danh sách sản phẩm gốc
  //     this.petList = [...this.originalPetList]; // Clone danh sách để không ảnh hưởng đến danh sách gốc
  //     this.petList.sort((a, b) => b.petId - a.petId);
  //       this.totalPets = this.petList.length;
  //       this.displayedPets = this.getPetSlice();
  //       this.currentPage = 1;
  //     });
  //   }
  //   else {
  //     this.loadPet();
  //   }
  // }

  // getPetSlice(): Pet[] {
  //   const startIndex = (this.currentPage - 1 ) * this.petsPerPage;
  //   const endIndex = startIndex + this.petsPerPage;
  //   return this.petList.slice(startIndex, endIndex);
  // }

  // changePage(page: number): void {
  //   console.log('Changing to page:', page);
  //   this.currentPage = page;
  //   this.displayedPets = this.getPetSlice();
  // }

  // getPageArray(): number[] {
  //   const pageCount = Math.ceil(this.totalPets / this.petsPerPage);
  //   return Array.from({ length: pageCount }, (_, i) => i + 1);
  // }

  // confirmDelete(id: number): void {
  //   this.showDeletePopup = true;
  //   this.deletePetId = id;
  // }
  
  // closeDeletePopup(): void {
  //   this.showDeletePopup = false;
  //   this.deletePetId = null;
  // }

  // deletePetAtId(): void {
  //   this.petService.deletePetAtId(this.deletePetId)
  //     .subscribe(() => {
  //       // Handle successful deletion
  //       console.log('Pet deleted successfully');
  //       this.loadPet();
  //       this.closeDeletePopup();
  //     }, error => {
  //       // Handle errors
  //       console.error('Error deleting Pet:', error);
  //     });
  // }

  // openPetDetailModal(pet: Pet): void {
  //   const modalRef = this.modalService.open(PetDetailComponent, {
  //     size: 'lg', 
  //   });
  //   modalRef.componentInstance.pet = pet; 
  // }

  // openPetEditModal(pet: Pet): void {
  //   const modalRef = this.modalService.open(PetEditComponent, {
  //     size: 'lg',
  //   });
  //   modalRef.componentInstance.pet = pet;
  //   modalRef.result.then((result) => {
  //     console.log('Edit successful:', result);
  //   }, (reason) => {
  //     console.log('Fail to edit:', reason);
  //   });
  // }

  // search(): void {
  //   this.petList = [...this.originalPetList]; // Khôi phục danh sách gốc trước khi tìm kiếm
  //   this.petList.sort((a, b) => b.petId - a.petId);
  //   this.petList = this.petList.filter((product) =>
  //     product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  //   );
  //   this.totalPets = this.petList.length;
  //   this.displayedPets = this.getPetSlice();
  //   this.currentPage = 1;
  // }

  onEnter(){
    // this.search();
  }

}
