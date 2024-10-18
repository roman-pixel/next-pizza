'use client';

import { X } from 'lucide-react';
import React from 'react';

import * as CartItemDetails from './cart-item-details';
import { CartItemProps } from './cart-item-details/cart-item-details.types';

import { cn } from '@/shared/lib/utils';

interface Props extends CartItemProps {
	onClickCountButton?: (type: 'plus' | 'minus') => void;
	onClickRemove?: () => void;
	className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
	name,
	price,
	imageUrl,
	quantity,
	details,
	disabled,
	onClickCountButton,
	onClickRemove,
	className
}) => {
	return (
		<div
			className={cn(
				'flex items-center justify-between transition-all duration-300',
				{ 'pointer-events-none opacity-60 grayscale': disabled },
				className
			)}
		>
			<div className='flex flex-1 items-center gap-5'>
				<CartItemDetails.Image src={imageUrl} />
				<CartItemDetails.Info
					name={name}
					details={details}
				/>
			</div>

			<CartItemDetails.Price value={price} />

			<div className='ml-20 flex items-center gap-5'>
				<CartItemDetails.CountButton
					onClick={onClickCountButton}
					value={quantity}
				/>
				<button onClick={onClickRemove}>
					<X className='cursor-pointer text-gray-400 hover:text-gray-600' />
				</button>
			</div>
		</div>
	);
};
