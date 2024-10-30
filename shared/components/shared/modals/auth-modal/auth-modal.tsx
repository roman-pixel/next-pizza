'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import React, { useState } from 'react';

import { LoginForm } from './forms/login-form';
import { RegisterForm } from './forms/register-form';

import { Button, Dialog } from '@/shared/components/ui';
import { DialogContent } from '@/shared/components/ui/dialog';

interface Props {
	open: boolean;
	onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
	const [type, setType] = useState<'login' | 'register'>('login');

	const onSwitchType = () => {
		setType(type === 'login' ? 'register' : 'login');
	};

	const handleClose = () => {
		onClose();
	};

	return (
		<Dialog
			open={open}
			onOpenChange={handleClose}
		>
			<DialogContent className='w-[450px] bg-white p-10'>
				{type === 'login' ? (
					<LoginForm onClose={handleClose} />
				) : (
					<RegisterForm onClose={handleClose} />
				)}
				<hr />
				<div className='flex gap-2'>
					<Button
						variant='secondary'
						onClick={() =>
							signIn('github', { callbackUrl: '/', redirect: true })
						}
						type='button'
						className='h-12 flex-1 gap-2 p-2'
					>
						<Image
							src='/assets/images/github-logo.svg'
							alt='GitHub logo'
							width={24}
							height={24}
						/>
						<span>GitHub</span>
					</Button>

					<Button
						variant='secondary'
						onClick={() =>
							signIn('google', { callbackUrl: '/', redirect: true })
						}
						type='button'
						className='h-12 flex-1 gap-2 p-2'
					>
						<Image
							src='/assets/images/google-logo.svg'
							alt='Google logo'
							width={24}
							height={24}
						/>
						<span>Google</span>
					</Button>
				</div>

				<Button
					variant='outline'
					onClick={onSwitchType}
					type='button'
					className='h-12'
				>
					{type !== 'login' ? 'Войти' : 'Регистрация'}
				</Button>
			</DialogContent>
		</Dialog>
	);
};
