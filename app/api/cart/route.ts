import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/prisma/prisma-client';

export async function GET(req: NextRequest) {
	try {
		// const token = req.cookies.get('cartToken')?.value;
		const token = '11111';

		if (!token) {
			return NextResponse.json({ totalAmount: 0, items: [] });
		}

		const userCart = await prisma.cart.findFirst({
			where: {
				OR: [
					{
						token
					}
				]
			},
			include: {
				cartItem: {
					orderBy: {
						createdAt: 'desc'
					},
					include: {
						productItem: {
							include: {
								product: true
							}
						},
						ingredients: true
					}
				}
			}
		});

		return NextResponse.json(userCart);
	} catch (error) {
		console.error('[CART_GET] Server error', error);
		return NextResponse.json(
			{ message: 'Не удалось получить корзину' },
			{ status: 500 }
		);
	}
}
