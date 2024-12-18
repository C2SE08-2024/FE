import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/model/DTO/cart';
import { CartDetail } from 'src/app/model/DTO/cart-detail';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartWithDetail } from 'src/app/model/DTO/cart-with-detail';
import { PaymentService } from 'src/app/service/payment/payment.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart?: Cart; 
  details?: CartDetail[];
  totalAmount = 0; 
  rf: FormGroup; 
  paymentMethod = 'direct';
 
  constructor(private route: ActivatedRoute,
              private cartService: CartService,
              private paymentService: PaymentService,
              private router: Router) {}

  ngOnInit(): void {
    this.getCart(); 
  }

  // Hàm tải giỏ hàng từ backend
  getCart(): void {
    this.cartService.getCart().subscribe(
      (data) => {
        this.cart = data.cart;
        this.details = data.cartDetailList; 
        console.log('Cart Details:', this.details);
        this.totalAmount = this.calculateTotal();
        this.formBuilder();
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
  formBuilder() {
    this.rf = new FormGroup({
      receiverName: new FormControl(this.cart.receiverName, [Validators.required, Validators.pattern('^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+ [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+(?: [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*)*')]),
      receiverAddress: new FormControl(this.cart.receiverAddress, [Validators.required, Validators.pattern('^[^!@#$%^&*()_+<>?\'\"{}\\`~|/\\\\]+$')]),
      receiverPhone: new FormControl(this.cart.receiverPhone, [Validators.required, Validators.pattern('^0\\d{9,10}')]),
      receiverEmail: new FormControl(this.cart.receiverEmail, [Validators.required, Validators.email])
    });
  }
  

  removeItem(cartDetailId: number): void {
    if (confirm('Bạn có chắc chắn muốn khóa học này không?')) {
      const updatedDetails = this.details.map(item => {
        if (item.cartDetailId === cartDetailId) {
          return { ...item, status: true }; 
        }
        return item;
      });
  
      const cartWithDetail: CartWithDetail = {
        cart: this.cart,
        cartDetailList: updatedDetails
      };
  
      console.log('Payload to updateCart API:', cartWithDetail);
  
      this.cartService.updateCart(cartWithDetail).subscribe(
        (response) => {
          console.log('Backend response:', response);
  
          this.details = updatedDetails.filter(item => item.cartDetailId !== cartDetailId);
          this.totalAmount = this.calculateTotal();
          alert('Đã xóa mục thành công!');
        },
        (error) => {
          console.error('Error updating cart:', error);
          alert('Không xóa được mục. Vui lòng thử lại.');
        }
      );
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
    if (this.paymentMethod === 'direct') {
      this.cartService.checkout(this.prepareCartForSendingToBackend()).subscribe(
        () => {
          alert("Đã thanh toán thành công, xin cảm ơn!!!");
          this.router.navigateByUrl('/')
        },
        (error) => {
          console.error('Lỗi khi thanh toán trực tiếp:', error);
        }
      );
    } else {
      this.paymentService.getPaid(this.prepareCartForSendingToBackend()).subscribe(
        (response) => {
          if (response && response.url) {
            console.log('VNPay URL:', response.url);
            window.location.href = response.url;
          } else {
            alert('Không nhận được URL thanh toán từ server.');
          }
        },
        (error) => {
          console.error('Lỗi khi thanh toán qua VNPay:', error);
          alert('Thanh toán qua VNPay thất bại. Vui lòng thử lại.');
        }
      );
    }
  }
  
  prepareCartForSendingToBackend(): CartWithDetail {
    this.cart.receiverName = this.rf.value.receiverName;
    this.cart.receiverAddress = this.rf.value.receiverAddress;
    this.cart.receiverPhone = this.rf.value.receiverPhone;
    this.cart.receiverEmail = this.rf.value.receiverEmail;
    const cartWithDetail: CartWithDetail = {
      cart: this.cart,
      cartDetailList: this.details
    };
    cartWithDetail.cartDetailList = this.details;
    cartWithDetail.cart = this.cart;
    return cartWithDetail;
  }

  changeMethod(e) {
    this.paymentMethod = e.target.value;
  }
}
