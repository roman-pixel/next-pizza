import { Trash2Icon } from 'lucide-react';
import React from 'react';

import * as CartItem from './cart-item-details';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import { CountButton } from './count-button';

import { cn } from '@/shared/lib/utils';

interface Props extends CartItemProps {
	className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({
	id,
	imageUrl,
	name,
	price,
	quantity,
	details,
	className
}) => {
	return (
		<div className={cn('flex gap-6 bg-white p-5', className)}>
			<CartItem.Image src={imageUrl} />

			<div className='flex-1'>
				<CartItem.Info
					name={name}
					details={details}
				/>

				<hr className='my-3' />

				<div className='flex items-center justify-between'>
					<CountButton
						onClick={type => console.log(type)}
						value={quantity}
					/>

					<div className='flex items-center gap-3'>
						<CartItem.Price value={price} />
						<Trash2Icon
							className='cursor-pointer text-gray-400 hover:text-gray-600'
							size={16}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
