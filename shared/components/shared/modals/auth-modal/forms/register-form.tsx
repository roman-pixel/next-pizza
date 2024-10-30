'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { TFormRegisterValues, registerFormSchema } from './schemas';

import { registerUser } from '@/app/actions';
import { FormInput } from '@/shared/components';
import { Button } from '@/shared/components/ui';

interface Props {
	onClose?: VoidFunction;
	onClickLogin?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose, onClickLogin }) => {
	const form = useForm<TFormRegisterValues>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			email: '',
			fullName: '',
			password: '',
			confirmPassword: ''
		}
	});

	const onSubmit = async (data: TFormRegisterValues) => {
		try {
			await registerUser({
				email: data.email,
				fullname: data.fullName,
				password: data.password
			});

			toast.success('Регистрация успешна 📝. Подтвердите свою почту');

			onClose?.();
		} catch (error) {
			return toast.error('Неверный E-Mail или пароль');
		}
	};

	return (
		<FormProvider {...form}>
			<form
				className='flex flex-col gap-5'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormInput
					name='email'
					label='E-Mail'
					required
				/>
				<FormInput
					name='fullName'
					label='Полное имя'
					required
				/>
				<FormInput
					name='password'
					label='Пароль'
					type='password'
					required
				/>
				<FormInput
					name='confirmPassword'
					label='Подтвердите пароль'
					type='password'
					required
				/>

				<Button
					loading={form.formState.isSubmitting}
					className='h-12 text-base'
					type='submit'
				>
					Зарегистрироваться
				</Button>
			</form>
		</FormProvider>
	);
};
