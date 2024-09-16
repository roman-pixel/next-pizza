'use client';

import React, { useState } from 'react';

import { FilterCheckbox } from '.';
import { Input } from '../ui';
import { FilterCheckboxProps } from './filter-checkbox';

import { cn } from '@/lib/utils';

type Item = FilterCheckboxProps;

interface Props {
	title: string;
	items: Item[];
	defaultItems: Item[];
	limit?: number;
	searchInputPlaceholder?: string;
	onCheckedChange?: (values: string[]) => void;
	defaultValue?: string[];
	className?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
	title,
	items,
	defaultItems,
	limit = 5,
	searchInputPlaceholder = 'Поиск...',
	onCheckedChange,
	defaultValue,
	className
}) => {
	const [showAll, setShowAll] = useState(false);
	const [seachValue, setSearchValue] = useState('');

	const onChangeSeatchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	const list = showAll
		? items.filter(item =>
				item.text.toLowerCase().includes(seachValue.toLowerCase())
			)
		: defaultItems?.slice(0, limit);

	return (
		<div className={className}>
			<p className='mb-3 font-bold'>{title}</p>
			<div className='mb-5'>
				{showAll && (
					<Input
						onChange={onChangeSeatchInput}
						placeholder={searchInputPlaceholder}
						className='border-none bg-gray-50'
					/>
				)}
			</div>

			<div className='scrollbar flex max-h-96 flex-col gap-4 overflow-auto pr-2'>
				{list.map((item, index) => (
					<FilterCheckbox
						key={index}
						value={item.value}
						text={item.text}
						endAdornment={item.endAdornment}
						checked={false}
						onCheckedChange={ids => console.log(ids)}
					/>
				))}
			</div>

			{items.length > limit && (
				<div
					className={cn(showAll ? 'mt-4 border-t border-t-neutral-100' : '')}
				>
					<button
						onClick={() => setShowAll(!showAll)}
						className='mt-3 text-primary'
					>
						{showAll ? 'Скрыть' : '+ Показать все'}
					</button>
				</div>
			)}
		</div>
	);
};
