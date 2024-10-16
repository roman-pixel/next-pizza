import { Minus, Plus } from 'lucide-react';

import { Button } from '../ui/button';
import { CountButtonProps } from './count-button';

import { cn } from '@/shared/lib/utils';

interface IconButtonProps {
	size?: CountButtonProps['size'];
	disabled?: boolean;
	type?: 'plus' | 'minus';
	onClick?: () => void;
}

export const CountIconButton: React.FC<IconButtonProps> = ({
	size = 'sm',
	disabled,
	type,
	onClick
}) => {
	return (
		<Button
			variant='outline'
			disabled={disabled}
			onClick={onClick}
			type='button'
			className={cn(
				'p-0 hover:bg-primary hover:text-white disabled:border-gray-400 disabled:bg-white disabled:text-gray-400',
				size === 'sm'
					? 'h-[30px] w-[30px] rounded-[10px]'
					: 'h-[38px] w-[38px] rounded-md'
			)}
		>
			{type === 'plus' ? (
				<Plus className={size === 'sm' ? 'h-4' : 'h-5'} />
			) : (
				<Minus className={size === 'sm' ? 'h-4' : 'h-5'} />
			)}
		</Button>
	);
};