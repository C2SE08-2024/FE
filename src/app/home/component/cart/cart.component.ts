import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart/cart.service';
import { Router } from '@angular/router';
import { Cart } from 'src/app/model/DTO/cart.model';
import { CartDetail } from 'src/app/model/DTO/cart-detail.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart = {
    cartId: 0,
    receiverName: '',
    receiverAddress: '',
    receiverPhone: '',
    receiverEmail: ''
  }; // Dữ liệu giỏ hàng mặc định
  details: CartDetail[] = []; // Chi tiết giỏ hàng mặc định là mảng rỗng
  totalAmount = 0; // Tổng tiền
  rf: FormGroup; // Form nhận thông tin khách hàng
 
  constructor(
    private cartService: CartService, // Dịch vụ giỏ hàng
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart(); // Tải giỏ hàng khi khởi động component
  }

  // Hàm tải giỏ hàng từ backend
  loadCart(): void {
    this.cartService.getCart().subscribe(
      (data) => {
        this.cart = data.cart || this.cart; // Gán dữ liệu giỏ hàng hoặc giữ mặc định
        this.details = data.cartDetailList || []; // Gán danh sách chi tiết giỏ hàng hoặc giữ mảng rỗng
        console.log('Cart Details:', this.details);
        this.totalAmount = this.calculateTotal(); // Tính tổng tiền
        this.formBuilder(); // Khởi tạo form
      },
      (error) => {
        console.error('Lỗi khi tải giỏ hàng:', error);
        alert('Không thể tải giỏ hàng, vui lòng thử lại.');
      }
    );
  }

  // Tính tổng tiền
  calculateTotal(): number {
    if (!this.details) return 0;
    return this.details.reduce((sum, item) => sum + item.course.coursePrice, 0);
  }

  // Khởi tạo form với dữ liệu từ giỏ hàng
  formBuilder(): void {
    this.rf = new FormGroup({
      receiverName: new FormControl(this.cart.receiverName, [
        Validators.required,
        Validators.pattern('^[A-Za-zÀ-ỹà-ỹ\\s]+(?:\\s[A-Za-zÀ-ỹà-ỹ]+)*$')
      ]),
      receiverAddress: new FormControl(this.cart.receiverAddress, [
        Validators.required,
        Validators.pattern('^[^!@#$%^&*()_+<>?\'\"{}~|/\\\\]+$')
      ]),
      receiverPhone: new FormControl(this.cart.receiverPhone, [
        Validators.required,
        Validators.pattern('^0\\d{9,10}$')
      ]),
      receiverEmail: new FormControl(this.cart.receiverEmail, [
        Validators.required,
        Validators.email
      ])
    });
  }

  // Xóa một sản phẩm khỏi giỏ hàng
  removeItem(cartDetailId: number): void {
    const updatedDetails = this.details.filter(
      (item) => item.cartDetailId !== cartDetailId
    );
    if (updatedDetails) {
      this.details = updatedDetails;
      this.totalAmount = this.calculateTotal(); // Cập nhật tổng tiền
      console.log(`Item with ID ${cartDetailId} removed.`);
    }
  }

  getTotalAmount() {
    let temp = 0;
    this.details.forEach(item => {
      if (item.status === true) {
        temp += item.course.coursePrice;
      }
    });
    this.totalAmount = temp;
  }

  // Xử lý thanh toán
  proceedToPayment(): void {
    if (this.rf.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    const cartWithDetail = {
      cart: {
        ...this.cart, // Dữ liệu giỏ hàng
        ...this.rf.value // Dữ liệu form
      },
      cartDetailList: this.details // Danh sách chi tiết giỏ hàng
    };

    this.cartService.checkout(cartWithDetail).subscribe(
      (response) => {
        alert('Payment successful! Redirecting to payment details.');
        this.router.navigate([`/paymentdetail/${cartWithDetail.cart.cartId}`]);
      },
      (error) => {
        console.error('Lỗi khi thanh toán:', error);
        alert('Thanh toán thất bại, vui lòng thử lại.');
      }
    );
  }
}
