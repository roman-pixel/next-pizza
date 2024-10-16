'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { ProductForm } from '..';

import { ProductWithRelations } from '@/@types/prisma';
import { Dialog, DialogContent } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';

interface Props {
	product: ProductWithRelations;
}

export const ChooseProductModal: React.FC<Props> = ({ product }) => {
	const router = useRouter();

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
				<ProductForm
					product={product}
					_onSubmit={() => router.back()}
				/>
			</DialogContent>
		</Dialog>
	);
};
