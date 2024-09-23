import { ProductItem } from '@prisma/client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSet } from 'react-use';

import { Variant } from '../components/shared/group-variants';
import { PizzaSize, PizzaType } from '../constants/pizza';
import { getAvailablePizzaSizes } from '../lib';

interface ReturnProps {
	size: PizzaSize;
	type: PizzaType;
	setSize: (size: PizzaSize) => void;
	setType: (type: PizzaType) => void;
	availableSizes: Variant[];
	addIngredient: (id: number) => void;
	selectedIngredients: Set<number>;
}

export function usePizzaOptions(variants: ProductItem[]): ReturnProps {
	const [size, setSize] = useState<PizzaSize>(20);
	const [type, setType] = useState<PizzaType>(1);
	const [selectedIngredients, { toggle: addIngredient }] = useSet(
		new Set<number>([])
	);

	const availableSizes = getAvailablePizzaSizes(type, variants);

	useEffect(() => {
		const isAvailableSize = availableSizes?.find(
			item => Number(item.value) === size && !item.disabled
		);
		const availableSize = availableSizes?.find(item => !item.disabled);

		if (!isAvailableSize && availableSize) {
			setSize(Number(availableSize.value) as PizzaSize);
		}
	}, [type]);

	return {
		size,
		type,
		setSize,
		setType,
		availableSizes,
		addIngredient,
		selectedIngredients
	};
}
