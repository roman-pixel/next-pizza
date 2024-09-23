'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { ChooseProductForm } from '..';
import { ChoosePizzaForm } from '../choose-pizza-form';

import { ProductWithRelations } from '@/@types/prisma';
import { Dialog, DialogContent } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';

interface Props {
	product: ProductWithRelations;
	className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter();
	console.log(product);
	const isPizzaForm = Boolean(product.variants[0].pizzaType);

	return (
		<Dialog
			open={Boolean(product)}
			onOpenChange={() => router.back()}
		>
			<DialogContent
				className={cn(
					'min-h-[500px] w-[1060px] max-w-[1060px] overflow-hidden bg-white p-0'
				)}
			>
				{isPizzaForm ? (
					<ChoosePizzaForm
						imageUrl={product.imageUrl}
						name={product.name}
						ingredients={[]}
					/>
				) : (
					<ChooseProductForm
						imageUrl={product.imageUrl}
						name={product.name}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
};
