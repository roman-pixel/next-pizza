'use client';

import React, { useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';

import { useCategoryStore } from '@/store/category';

import { ProductCard } from './product-card';
import { Title } from './title';

import { cn } from '@/lib/utils';

interface Props {
	title: string;
	items: any[];
	listClassName?: string;
	categoryId: number;
	className?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
	title,
	items,
	listClassName,
	categoryId,
	className
}) => {
	const setActiveCategoryId = useCategoryStore(state => state.setActiveId);
	const intersectionRef = useRef(null);
	const intersection = useIntersection(intersectionRef, {
		threshold: 0.4
	});

	useEffect(() => {
		if (intersection?.isIntersecting) {
			setActiveCategoryId(categoryId);
		}
	}, [categoryId, intersection?.isIntersecting, title]);

	return (
		<div
			className={cn(className)}
			id={title}
			ref={intersectionRef}
		>
			<Title
				text={title}
				size='lg'
				className='mb-5 font-extrabold'
			/>

			<div className={cn('grid grid-cols-3 gap-[60px]', listClassName)}>
				{items.map(product => (
					<ProductCard
						key={product.id}
						id={product.id}
						name={product.name}
						imageUrl={product.imageUrl}
						price={product.items[0].price}
					/>
				))}
			</div>
		</div>
	);
};
