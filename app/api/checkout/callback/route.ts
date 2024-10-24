import { OrderStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { PaymentCallbackData } from '@/@types/yookassa';
import { prisma } from '@/prisma/prisma-client';
import { OrderSuccessTemplate } from '@/shared/components';
import { sendEmail } from '@/shared/lib';
import { CartItemDTO } from '@/shared/services/dto/cart.dto';

export async function POST(req: NextRequest) {
	try {
		const body = (await req.json()) as PaymentCallbackData;

		const order = await prisma.order.findFirst({
			where: {
				id: Number(body.object.metadata.order_id)
			}
		});

		if (!order) {
			return NextResponse.json('Order not found', { status: 404 });
		}

		const isSucceeded = body.object.status === 'succeeded';

		await prisma.order.update({
			where: {
				id: order.id
			},
			data: {
				status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED
			}
		});

		const items = JSON.parse(order?.items as string) as CartItemDTO[];

		if (isSucceeded) {
			await sendEmail(
				order.email,
				'Next Pizza / Ваш заказ успешно оформлен 🎉',
				OrderSuccessTemplate({ orderId: order.id, items })
			);
		} else {
			// TODO: SEND FAILED EMAIL
		}
	} catch (err) {
		console.error('[CHECKOUT_CALLBACK] Error', err);

		return NextResponse.json('Error', { status: 500 });
	}
}
