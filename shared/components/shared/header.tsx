'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import {
	AuthModal,
	CartButton,
	Container,
	ProfileButton,
	SearchInput
} from '.';

import { cn } from '@/shared/lib/utils';

interface Props {
	hasSearch?: boolean;
	hasCart?: boolean;
	className?: string;
}

export const Header: React.FC<Props> = ({
	hasSearch = true,
	hasCart = true,
	className
}) => {
	const [openAuthModal, setOpenAuthModal] = useState(false);

	const searchParams = useSearchParams();
	const router = useRouter();

	useEffect(() => {
		let timeout: NodeJS.Timeout;
		let toastMessage = '';

		if (searchParams.has('paid')) {
			toastMessage = 'Заказ оплачён! Информация отправлена на почту';
		}

		if (searchParams.has('verified')) {
			toastMessage = 'Почта успешно подтверждена';
		}

		if (toastMessage) {
			timeout = setTimeout(() => {
				router.replace('/');
				toast.success(toastMessage);
			}, 200);
		}

		return () => {
			clearTimeout(timeout);
		};
	}, []);

	return (
		<div className={cn('border-b', className)}>
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

				{hasSearch && (
					<div className='mx-10 flex-1'>
						<SearchInput />
					</div>
				)}

				{/* RIGHT PART */}
				<div className='flex items-center gap-3'>
					<AuthModal
						open={openAuthModal}
						onClose={() => setOpenAuthModal(false)}
					/>
					<ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

					{hasCart && (
						<div>
							<CartButton />
						</div>
					)}
				</div>
			</Container>
		</div>
	);
};
