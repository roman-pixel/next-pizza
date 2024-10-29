import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { FormInput } from '../../../form';
import { Title } from '../../../title';
import { TFormLoginValues, loginFormSchema } from './schemas';

import { Button } from '@/shared/components/ui';

interface Props {
	onClose?: () => void;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
	const form = useForm<TFormLoginValues>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const onSubmit = async (data: TFormLoginValues) => {
		try {
			const resp = await signIn('credentials', {
				...data,
				redirect: false
			});

			if (!resp?.ok) {
				throw new Error('Не удалось войти в аккаунт');
			}

			toast.success('Вы успешно вошли в аккаунт');

			onClose?.();
		} catch (error) {
			console.error('ERROR [LOGIN]', error);
			toast.error('Не удалось войти в аккаунт');
		}
	};

	return (
		<FormProvider {...form}>
			<form
				className='flex flex-col gap-5'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<div className='flex items-center justify-between'>
					<div className='mr-2'>
						<Title
							text='Вход в аккаунт'
							size='md'
							className='font-bold'
						/>
						<p className='text-gray-400'>
							Введите свою почту, чтобы войти в аккаунт
						</p>
					</div>
				</div>

				<FormInput
					name='email'
					label='E-mail'
					required
				/>
				<FormInput
					name='password'
					label='Пароль'
					type='password'
					required
				/>

				<Button
					loading={form.formState.isSubmitting}
					className='h-12 text-base'
					type='submit'
				>
					Войти
				</Button>
			</form>
		</FormProvider>
	);
};
