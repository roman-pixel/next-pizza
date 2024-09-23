import { Ingredient, ProductItem } from '@prisma/client';
import React from 'react';

import {
	GroupVariants,
	Ingredient as IngredientItem,
	PizzaImage,
	Title
} from '.';
import { Button } from '../ui';

import {
	PizzaSize,
	PizzaType,
	mapPizzaType,
	pizzaTypes
} from '@/shared/constants/pizza';
import { usePizzaOptions } from '@/shared/hooks';
import {
	calcTotalPizzaPrice,
	getAvailablePizzaSizes,
	getPizzaDetails
} from '@/shared/lib';
import { cn } from '@/shared/lib/utils';

interface Props {
	imageUrl: string;
	name: string;
	ingredients: Ingredient[];
	variants: ProductItem[];
	onClickAddCart?: VoidFunction;
	className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
	imageUrl,
	name,
	ingredients,
	variants,
	onClickAddCart,
	className
}) => {
	const {
		size,
		setSize,
		type,
		setType,
		availableSizes,
		addIngredient,
		selectedIngredients
	} = usePizzaOptions(variants);

	const { textDetails, totalPrice } = getPizzaDetails(
		type,
		size,
		variants,
		ingredients,
		selectedIngredients
	);

	const handleClickAdd = () => {
		onClickAddCart?.();
		console.log({ size, type, ingredients: selectedIngredients });
	};

	return (
		<div className={cn('flex flex-1', className)}>
			<PizzaImage
				src={imageUrl}
				alt={name}
				size={size}
			/>

			<div className='w-[490px] bg-[#f7f7f7] p-7'>
				<Title
					text={name}
					className='mb-1 font-extrabold'
				/>
				<p className='text-gray-400'>{textDetails}</p>

				<div className='mt-5 flex flex-col gap-5'>
					<GroupVariants
						items={availableSizes}
						value={String(size)}
						onClick={value => setSize(Number(value) as PizzaSize)}
					/>

					<GroupVariants
						items={pizzaTypes}
						value={String(type)}
						onClick={value => setType(Number(value) as PizzaType)}
					/>
				</div>

				<div className='scrollbar mt-5 h-[420px] overflow-auto rounded-md bg-gray-50 p-5'>
					<div className='grid grid-cols-3 gap-3'>
						{ingredients.map(ingredient => (
							<IngredientItem
								key={ingredient.id}
								imageUrl={ingredient.imageUrl}
								name={ingredient.name}
								price={ingredient.price}
								isActive={selectedIngredients.has(ingredient.id)}
								onClick={() => addIngredient(ingredient.id)}
							/>
						))}
					</div>
				</div>

				<Button
					className='mt-10 h-[55px] w-full rounded-[18px] px-10 text-base'
					onClick={handleClickAdd}
					disabled={!totalPrice}
				>
					{totalPrice
						? `Добавить в корзину за ${totalPrice} ₽`
						: 'Временно недоступно'}
				</Button>
			</div>
		</div>
	);
};
