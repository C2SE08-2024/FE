import { CartDetail } from './cart-detail.model'; // Đảm bảo đường dẫn đúng

export interface Payment {
  id: number;                  // ID của Payment
  cartId: number;              // ID của giỏ hàng liên quan đến Payment
  totalAmount: number;         // Tổng số tiền thanh toán
  cartDetails: CartDetail[];   // Danh sách chi tiết giỏ hàng
  tnxRef: string;              // Tham chiếu giao dịch (Transaction Reference)
  isPaid: boolean;             // Trạng thái thanh toán
}
