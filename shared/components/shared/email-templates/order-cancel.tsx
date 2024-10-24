import * as React from 'react';

import { CartItemDTO } from '@/shared/services/dto/cart.dto';

interface Props {
	orderId: number;
	items: CartItemDTO[];
}

export const OrderCancelTemplate: React.FC<Props> = ({ orderId, items }) => (
	<div>
		<h1>Заказ #{orderId} отменен ❌</h1>

		<p>Ваш заказ #{orderId} был отменен.</p>
		<p>Список товаров:</p>

		<hr />

		<ul>
			{items.map(item => (
				<li key={item.id}>
					{item.productItem.product.name} | {item.productItem.price} ₽ x{' '}
					{item.quantity} шт. = {item.productItem.price * item.quantity} ₽
				</li>
			))}
		</ul>
	</div>
);
