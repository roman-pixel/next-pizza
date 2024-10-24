import React from 'react';

import { cn } from '@/shared/lib/utils';

interface Props {
	className?: string;
}

export const CheckoutItemSkeleton: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn('flex items-center justify-between', className)}>
			<div className='flex items-center gap-5'>
				<div className='h-[50px] w-[50px] animate-pulse rounded-sm bg-gray-200' />
				<h2 className='h-6 w-48 animate-pulse rounded-sm bg-gray-200' />
			</div>

			<div className='h-5 w-12 animate-pulse rounded-sm bg-gray-200' />
			<div className='h-8 w-[133px] animate-pulse rounded-sm bg-gray-200' />
		</div>
	);
};
