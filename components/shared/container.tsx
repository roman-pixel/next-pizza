import React from 'react';

import { cn } from '@/lib/utils';

interface Props {
	className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({
	className,
	children
}) => {
	return (
		<div className={cn('xl::px-0 mx-auto max-w-[1280px] px-3', className)}>
			{children}
		</div>
	);
};
