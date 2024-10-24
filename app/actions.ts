'use server';

import { OrderStatus } from '@prisma/client';
import { cookies } from 'next/headers';

import { prisma } from '@/prisma/prisma-client';
import { PayOrderTemplate } from '@/shared/components';
import { CheckoutFormValues } from '@/shared/constants';
import { createPayment, sendEmail } from '@/shared/lib';

export async function createOrder(data: CheckoutFormValues) {
	try {
		const cookieStore = cookies();
		const cartToken = cookieStore.get('cartToken')?.value;

		if (!cartToken) {
			throw new Error('Cart token not found');
		}

		// find cart by token
		const userCart = await prisma.cart.findFirst({
			include: {
				user: true,
				cartItem: {
					include: {
						ingredients: true,
						productItem: {
							include: {
								product: true
							}
						}
					}
				}
			},
			where: {
				token: cartToken
			}
		});

		// if cart not found throw error
		if (!userCart) {
			throw new Error('Cart not found');
		}

		// if cart is empty throw error
		if (userCart?.totalAmount === 0) {
			throw new Error('Cart is empty');
		}

		// create order
		const order = await prisma.order.create({
			data: {
				token: cartToken,
				// userId,
				fullname: data.firstName + ' ' + data.lastName,
				email: data.email,
				phone: data.phone,
				address: data.address,
				comment: data.comment,
				totalAmount: userCart.totalAmount,
				status: OrderStatus.PENDING,
				items: JSON.stringify(userCart.cartItem)
			}
		});

		// clear cart
		await prisma.cart.update({
			where: {
				id: userCart.id
			},
			data: {
				totalAmount: 0
			}
		});

		await prisma.cartItem.deleteMany({
			where: {
				cartId: userCart.id
			}
		});

		// create payment
		const paymentData = await createPayment({
			amount: order.totalAmount,
			orderId: order.id,
			description: `Оплата заказа #${order.id}`
		});

		if (!paymentData) {
			throw new Error('Payment data not found');
		}

		// update order
		await prisma.order.update({
			where: {
				id: order.id
			},
			data: {
				paymentId: paymentData.id
			}
		});

		const paymentUrl = paymentData.confirmation.confirmation_url;

		await sendEmail(
			data.email,
			`Next Pizza / Оплатите заказ #${order.id}`,
			PayOrderTemplate({
				orderId: order.id,
				totalAmount: order.totalAmount,
				paymentUrl
			})
		);

		return paymentUrl;
	} catch (err) {
		console.error('[ORDER_CREATE] Server error', err);
	}
}
