'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

import { ChooseProductForm } from '..';
import { ChoosePizzaForm } from '../choose-pizza-form';

import { ProductWithRelations } from '@/@types/prisma';
import { Dialog, DialogContent } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import { useCartStore } from '@/shared/store';

interface Props {
	product: ProductWithRelations;
	className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter();
	const firstItem = product.variants[0];
	const isPizzaForm = Boolean(product.variants[0].pizzaType);
	const [loading, addCartItem] = useCartStore(state => [
		state.loading,
		state.addCartItem
	]);

	const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
		try {
			const itemId = productItemId ?? firstItem.id;

			await addCartItem({
				productItemId: itemId,
				ingredients
			});

			toast.success(`Добавлено: ${product.name}`);
		} catch (error) {
			console.error(error);
			toast.error(`Не удалось добавить ${product.name}`);
		} finally {
			router.back();
		}
	};

	return (
		<Dialog
			open={Boolean(product)}
			onOpenChange={() => router.back()}
		>
			<DialogContent
				className={cn(
					'min-h-[550px] w-[1060px] max-w-[1060px] overflow-hidden bg-white p-0'
				)}
			>
				{isPizzaForm ? (
					<ChoosePizzaForm
						imageUrl={product.imageUrl}
						name={product.name}
						ingredients={product.ingredients}
						variants={product.variants}
						onSubmit={onSubmit}
						loading={loading}
					/>
				) : (
					<ChooseProductForm
						imageUrl={product.imageUrl}
						name={product.name}
						onSubmit={onSubmit}
						price={firstItem.price}
						loading={loading}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
};
