import { Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Title } from '.';
import { Button } from '../ui';

import { cn } from '@/lib/utils';

interface Props {
	id: number;
	name: string;
	price: number;
	imageUrl: string;
	className?: string;
}

export const ProductCard: React.FC<Props> = ({
	id,
	name,
	price,
	imageUrl,
	className
}) => {
	return (
		<div className={cn(className)}>
			<Link href={`/product/${id}`}>
				<div className='flex h-[260px] justify-center rounded-lg bg-secondary p-6'>
					<Image
						width={215}
						height={215}
						src={imageUrl}
						alt={name}
					/>
				</div>

				<Title
					text={name}
					className='mb-1 mt-3 font-bold'
					size='sm'
				/>

				{/* TODO: CHANGE INGREDIENTS */}
				<p className='text-sm text-gray-400'>
					Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус
					альфредо, чеснок
				</p>

				<div className='mt-4 flex items-center justify-between'>
					<span className='text-[20px]'>
						от <b>{price} ₽</b>
					</span>

					<Button
						variant='secondary'
						className='text-base font-bold'
					>
						<Plus
							className='mr-1'
							size={20}
						/>
					</Button>
				</div>
			</Link>
		</div>
	);
};
