import { useEffect } from 'react';

import { CartStateItem } from '../lib/get-cart-details';
import { CreateCartItemValues } from '../services/dto/cart.dto';
import { useCartStore } from '../store';

type ReturnProps = {
	totalAmount: number;
	items: CartStateItem[];
	updateItemQuantity: (id: number, quantity: number) => Promise<void>;
	removeCartItem: (id: number) => Promise<void>;
	addCartItem: (values: CreateCartItemValues) => Promise<void>;
	loading: boolean;
};

export function useCart(): ReturnProps {
	const cartState = useCartStore(state => state);

	useEffect(() => {
		cartState.fetchCartItems();
	}, []);

	return cartState;
}
