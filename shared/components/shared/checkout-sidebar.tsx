import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import React from 'react';

import { CheckoutItemDetails, WhiteBlock } from '.';
import { Button, Skeleton } from '../ui';

import { cn } from '@/shared/lib/utils';

const TAX_VALUE = 5;
const DELIVERY_PRICE = 250;

interface Props {
	totalAmount: number;
	loading?: boolean;
	className?: string;
}

export const CheckoutSidebar: React.FC<Props> = ({
	totalAmount,
	loading,
	className
}) => {
	const totalTaxes = ((TAX_VALUE * totalAmount) / 100).toFixed(2);
	const totalPrice = totalAmount + DELIVERY_PRICE + Number(totalTaxes);

	return (
		<WhiteBlock className={cn('sticky top-4 p-6', className)}>
			<div className='flex flex-col gap-1'>
				<span className='text-xl'>Итого:</span>
				{loading ? (
					<Skeleton className='h-11 w-48' />
				) : (
					<span className='h-11 text-[34px] font-extrabold'>
						{totalPrice} ₽
					</span>
				)}
			</div>

			<CheckoutItemDetails
				title={
					<div className='flex items-center'>
						<Package
							size={16}
							className='mr-2 text-gray-400'
						/>
						Стоимость корзины:
					</div>
				}
				value={
					loading ? (
						<Skeleton className='h-7 w-20 rounded-[8px]' />
					) : (
						`${totalAmount} ₽`
					)
				}
			/>
			<CheckoutItemDetails
				title={
					<div className='flex items-center'>
						<Percent
							size={16}
							className='mr-2 text-gray-400'
						/>
						Налоги:
					</div>
				}
				value={
					loading ? (
						<Skeleton className='h-7 w-20 rounded-[8px]' />
					) : (
						` ${totalTaxes} ₽`
					)
				}
			/>
			<CheckoutItemDetails
				title={
					<div className='flex items-center'>
						<Truck
							size={16}
							className='mr-2 text-gray-400'
						/>
						Доставка:
					</div>
				}
				value={
					loading ? (
						<Skeleton className='h-7 w-20 rounded-[8px]' />
					) : (
						`${DELIVERY_PRICE} ₽`
					)
				}
			/>

			<Button
				type='submit'
				loading={loading}
				className='mt-6 h-14 w-full rounded-2xl text-base font-bold'
			>
				Оформить заказ
				<ArrowRight className='ml-2 w-5' />
			</Button>
		</WhiteBlock>
	);
};
