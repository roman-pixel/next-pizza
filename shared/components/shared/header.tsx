import { ArrowRight, ShoppingCart, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { CartButton, Container, SearchInput } from '.';
import { Button } from '../ui';

import { cn } from '@/shared/lib/utils';

interface Props {
	className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn('border border-b', className)}>
			<Container className='flex items-center justify-between py-8'>
				{/* LEFT PART */}
				<Link href='/'>
					<div className='flex items-center gap-4'>
						<Image
							src='/logo.png'
							alt='Logo'
							width={32}
							height={32}
						/>
						<div>
							<h1 className='text-2xl font-black uppercase'>Next Pizza</h1>
							<p className='text-sm leading-3 text-gray-400'>
								вкусней уже некуда
							</p>
						</div>
					</div>
				</Link>

				<div className='mx-10 flex-1'>
					<SearchInput />
				</div>

				{/* RIGHT PART */}
				<div className='flex items-center gap-3'>
					<Button
						variant='outline'
						className='flex items-center gap-1'
					>
						<User size={16} />
						<span>Войти</span>
					</Button>

					<div>
						<CartButton />
					</div>
				</div>
			</Container>
		</div>
	);
};
