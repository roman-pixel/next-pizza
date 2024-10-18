import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import React from 'react';

import { ItemDetails, WhiteBlock } from '.';
import { Button } from '../ui';

const TAX_VALUE = 5;
const DELIVERY_PRICE = 250;

interface Props {
	totalAmount: number;
}

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount }) => {
	const totalTaxes = ((TAX_VALUE * totalAmount) / 100).toFixed(2);
	const totalPrice = totalAmount + DELIVERY_PRICE + Number(totalTaxes);

	return (
		<WhiteBlock className='sticky top-4 p-6'>
			<div className='flex flex-col gap-1'>
				<span className='text-xl'>Итого:</span>
				<span className='text-[34px] font-extrabold'>{totalPrice} ₽</span>
			</div>

			<ItemDetails
				title={
					<div className='flex items-center'>
						<Package
							size={16}
							className='mr-2 text-gray-400'
						/>
						Стоимость корзины:
					</div>
				}
				value={`${totalAmount} ₽`}
			/>
			<ItemDetails
				title={
					<div className='flex items-center'>
						<Percent
							size={16}
							className='mr-2 text-gray-400'
						/>
						Налоги:
					</div>
				}
				value={`${totalTaxes} ₽`}
			/>
			<ItemDetails
				title={
					<div className='flex items-center'>
						<Truck
							size={16}
							className='mr-2 text-gray-400'
						/>
						Доставка:
					</div>
				}
				value={`${DELIVERY_PRICE} ₽`}
			/>

			<Button
				type='submit'
				// disabled={!totalAmount || submiting}
				className='mt-6 h-14 w-full rounded-2xl text-base font-bold'
			>
				Перейти к оплате
				<ArrowRight className='ml-2 w-5' />
			</Button>
		</WhiteBlock>
	);
};
