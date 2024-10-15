'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React, { PropsWithChildren, useEffect } from 'react';

import { Button } from '../ui';
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '../ui/sheet';
import { CartDrawerItem } from './cart-drawer-item';

import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { getCartItemDetails } from '@/shared/lib';
import { useCartStore } from '@/shared/store';

export const CartDrawer: React.FC<PropsWithChildren> = ({ children }) => {
	const [
		totalAmount,
		fetchCartItems,
		updateItemQuantity,
		removeCartItem,
		items,
		loading
	] = useCartStore(state => [
		state.totalAmount,
		state.fetchCartItems,
		state.updateItemQuantity,
		state.removeCartItem,
		state.items,
		state.loading
	]);

	useEffect(() => {
		fetchCartItems();
	}, []);

	const onClickCountButton = (
		id: number,
		quantity: number,
		type: 'plus' | 'minus'
	) => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
		updateItemQuantity(id, newQuantity);
	};

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className='flex flex-col justify-between bg-[#f4f1ee] pb-0'>
				<SheetHeader>
					<SheetTitle>
						В корзине <span className='font-bold'>{items.length} товара</span>
					</SheetTitle>
				</SheetHeader>

				<div className='-mx-6 mt-5 flex-1 overflow-auto'>
					{items.map(item => (
						<div
							key={item.id}
							className='mb-2'
						>
							<CartDrawerItem
								id={item.id}
								imageUrl={item.imageUrl}
								name={item.name}
								price={item.price}
								quantity={item.quantity}
								loading={loading}
								details={
									item.pizzaSize && item.pizzaType
										? getCartItemDetails(
												item.ingredients,
												item.pizzaType as PizzaType,
												item.pizzaSize as PizzaSize
											)
										: ''
								}
								onClickCountButton={type =>
									onClickCountButton(item.id, item.quantity, type)
								}
								onClickRemove={() => removeCartItem(item.id)}
							/>
						</div>
					))}
				</div>

				<SheetFooter className='-mx-6 bg-white p-8'>
					<div className='w-full'>
						<div className='mb-4 flex'>
							<span className='flex flex-1 text-lg text-neutral-500'>
								Итого
								<div className='relative -top-1 mx-2 flex-1 border-b border-dashed border-b-neutral-200' />
							</span>

							<span className='text-lg font-bold'>{totalAmount} ₽</span>
						</div>

						<Link href='/cart'>
							<Button
								type='submit'
								className='h-12 w-full text-base'
							>
								Оформить заказ
								<ArrowRight className='ml-5 w-5' />
							</Button>
						</Link>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};
