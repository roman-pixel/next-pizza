import Image from 'next/image';
import React from 'react';

import { Title } from '.';
import { Button } from '../ui';

import { cn } from '@/lib/utils';

interface Props {
	imageUrl: string;
	name: string;
	onClickAdd?: VoidFunction;
	className?: string;
}

export const ChooseProductForm: React.FC<Props> = ({
	imageUrl,
	name,
	onClickAdd,
	className
}) => {
	const textDetails = '30 см, традиционное тесто 30';
	const totalPrice = 350;

	return (
		<div className={cn('flex flex-1', className)}>
			<div className='relative flex w-full flex-1 items-center justify-center'>
				<div className='relative left-2 top-2 z-10 h-[350px] w-[350px] transition-all duration-300'>
					<Image
						src={imageUrl}
						alt={name}
						fill
						sizes='100%'
					/>
				</div>
			</div>

			<div className='w-[490px] bg-[#f7f7f7] p-7'>
				<Title
					text={name}
					className='mb-1 font-extrabold'
				/>
				<p className='text-gray-400'>{textDetails}</p>

				<Button className='mt-10 h-[55px] w-full rounded-[18px] px-10 text-base'>
					Добавить в корзину за {totalPrice} ₽
				</Button>
			</div>
		</div>
	);
};
