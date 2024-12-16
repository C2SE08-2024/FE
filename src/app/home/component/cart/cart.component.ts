import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart/cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];  // Danh sách các khóa học trong giỏ hàng
  totalAmount: number = 0; // Tổng tiền của các khóa học
  loading: boolean = true; // Trạng thái loading

  constructor(
    private cartService: CartService, // Dịch vụ giỏ hàng
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart(); // Tải giỏ hàng khi trang được mở
  }

  // Hàm tải giỏ hàng của người dùng
  loadCart(): void {
    this.cartService.getCart().subscribe(
      (data) => {
        console.log(data);
        this.cartItems = data;  
        // this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.course.coursePrice, 0);  // Tính tổng tiền
        this.loading = false;
      },
      (error) => {
        console.error('Lỗi khi tải giỏ hàng', error);
        this.loading = false;
      }
    );
  }

  // Thêm khóa học vào giỏ hàng
  addCourseToCart(courseId: number): void {
    this.cartService.addCourseToCart(courseId).subscribe(
      (data) => {
        console.log('Khóa học đã được thêm vào giỏ hàng');
        this.loadCart();  // Tải lại giỏ hàng sau khi thêm
      },
      (error) => {
        console.error('Lỗi khi thêm khóa học vào giỏ hàng', error);
      }
    );
  }

  // Thanh toán giỏ hàng
  proceedToPayment(): void {
    const cartWithDetail = {
      cart: { cartId: 0 },  // Thêm thông tin giỏ hàng nếu cần
      cartDetailList: this.cartItems.map(item => ({
        cartDetailId: item.cartDetailId,
        course: item.course,
        status: item.status
      }))
    };

    this.cartService.checkout(cartWithDetail).subscribe(
      (response) => {
        // Chuyển hướng đến trang thanh toán chi tiết
        this.router.navigate([`/paymentdetail/${cartWithDetail.cart.cartId}`]);
      },
      (error) => {
        console.error('Lỗi khi thanh toán giỏ hàng', error);
      }
    );
  }
}
