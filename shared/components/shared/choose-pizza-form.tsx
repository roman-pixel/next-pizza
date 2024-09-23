import Image from 'next/image';
import React from 'react';

import { GroupVariants, PizzaImage, Title } from '.';
import { Button } from '../ui';

import { cn } from '@/shared/lib/utils';

interface Props {
	imageUrl: string;
	name: string;
	// TODO: CHANGE THE TYPE
	// ingredients?: IProduct['ingredients'];
	// variants?: IProduct['variants'];
	ingredients: any[];
	variants?: any[];
	onClickAdd?: VoidFunction;
	className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
	imageUrl,
	name,
	ingredients,
	variants,
	onClickAdd,
	className
}) => {
	const textDetails = '30 см, традиционное тесто 30';
	const totalPrice = 350;

	return (
		<div className={cn('flex flex-1', className)}>
			<PizzaImage
				src={imageUrl}
				alt={name}
				size={30}
			/>

			<div className='w-[490px] bg-[#f7f7f7] p-7'>
				<Title
					text={name}
					className='mb-1 font-extrabold'
				/>
				<p className='text-gray-400'>{textDetails}</p>

				<GroupVariants items={pizzaSizes} />

				<Button className='mt-10 h-[55px] w-full rounded-[18px] px-10 text-base'>
					Добавить в корзину за {totalPrice} ₽
				</Button>
			</div>
		</div>
	);
};
