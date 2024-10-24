import * as React from 'react';

interface Props {
	orderId: number;
	totalAmount: number;
	paymentUrl: string;
}

export const PayOrderTemplate: React.FC<Props> = ({
	orderId,
	totalAmount,
	paymentUrl
}) => (
	<div>
		<h1>Заказ #{orderId}</h1>

		<p>
			Оплатите заказ на сумму {totalAmount} ₽. Перейдите на{' '}
			<a href={paymentUrl}>страницу оплаты</a> для оформления заказа
		</p>
	</div>
);
