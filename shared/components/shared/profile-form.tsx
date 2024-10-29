'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Button } from '../ui';
import { Container } from './container';
import { FormInput } from './form';
import {
	TFormRegisterValues,
	registerFormSchema
} from './modals/auth-modal/forms/schemas';
import { Title } from './title';

import { updateUserInfo } from '@/app/actions';

interface Props {
	data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
	const form = useForm({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			fullName: data.fullname,
			email: data.email,
			password: '',
			confirmPassword: ''
		}
	});

	const onSubmit = async (data: TFormRegisterValues) => {
		try {
			await updateUserInfo({
				fullname: data.fullName,
				email: data.email,
				password: data.password
			});

			toast.success('Данные обновлены');
		} catch (error) {
			console.error(error);
			toast.error('Ошибка при обновлении данных');
		}
	};

	const onClickSignOut = async () => {
		signOut({
			callbackUrl: '/'
		});
	};

	return (
		<Container className='my-10'>
			<Title
				text='Личные данные'
				size='md'
				className='font-bold'
			/>

			<FormProvider {...form}>
				<form
					className='mt-10 flex w-96 flex-col gap-5'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormInput
						name='email'
						label='E-mail'
						required
					/>
					<FormInput
						name='fullName'
						label='Полное имя'
						required
					/>

					<FormInput
						type='password'
						name='password'
						label='Новый пароль'
						required
					/>
					<FormInput
						type='password'
						name='confirmPassword'
						label='Подтвердите пароль'
						required
					/>

					<Button
						disabled={form.formState.isSubmitting}
						className='mt-10 text-base'
						type='submit'
					>
						Сохранить
					</Button>

					<Button
						onClick={onClickSignOut}
						variant='secondary'
						className='text-base'
						type='button'
					>
						Выйти
					</Button>
				</form>
			</FormProvider>
		</Container>
	);
};
