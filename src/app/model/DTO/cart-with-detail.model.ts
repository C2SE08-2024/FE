import { Cart } from './cart.model';
import { CartDetail } from './cart-detail.model';

export interface CartWithDetail {
  cart: Cart;
  cartDetailList: CartDetail[];
}
