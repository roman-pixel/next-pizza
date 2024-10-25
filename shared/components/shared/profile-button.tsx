import { CircleUser, User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Button, Skeleton } from '../ui';

import { cn } from '@/shared/lib/utils';

interface Props {
	onClickSignIn?: () => void;
	className?: string;
}

export const ProfileButton: React.FC<Props> = ({
	onClickSignIn,
	className
}) => {
	const { data: session, status } = useSession();

	if (status === 'loading') {
		return <Skeleton className='h-10 w-28' />;
	}

	return (
		<div className={cn(className)}>
			{!session ? (
				<Button
					variant='outline'
					className='flex items-center gap-1'
					onClick={onClickSignIn}
				>
					<User size={16} />
					<span>Войти</span>
				</Button>
			) : (
				<Link href='/profile'>
					<Button
						variant='secondary'
						className='flex items-center gap-2'
					>
						{session?.user?.image ? (
							<Image
								src={session?.user?.image}
								alt={`${session?.user?.name} avatar`}
								width={21}
								height={21}
								className='rounded-full'
							/>
						) : (
							<CircleUser size={18} />
						)}
						{session?.user?.name}
					</Button>
				</Link>
			)}
		</div>
	);
};
