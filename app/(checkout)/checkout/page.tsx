'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { createOrder } from '@/app/actions';
import {
	CheckoutAddressForm,
	CheckoutCart,
	CheckoutPersonalForm,
	CheckoutSidebar,
	Container,
	Title
} from '@/shared/components';
import { CheckoutFormValues, checkoutFormSchema } from '@/shared/constants';
import { useCart } from '@/shared/hooks';
import { cn } from '@/shared/lib/utils';
import { Api } from '@/shared/services/api-client';

export default function CheckoutPage() {
	const [submitting, setSubmitting] = useState(false);
	const { totalAmount, items, updateItemQuantity, removeCartItem, loading } =
		useCart();
	const { data: session } = useSession();

	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: '',
			firstName: '',
			lastName: '',
			phone: '',
			address: '',
			comment: ''
		}
	});

	useEffect(() => {
		async function fetchUserInfo() {
			const data = await Api.auth.getMe();
			const [firstName, lastName] = data.fullname.split(' ');

			form.setValue('firstName', firstName);
			form.setValue('lastName', lastName);
			form.setValue('email', data.email);
		}

		if (session) {
			fetchUserInfo();
		}
	}, [session]);

	const onSubmit: SubmitHandler<CheckoutFormValues> = async (
		data: CheckoutFormValues
	) => {
		try {
			setSubmitting(true);
			const url = await createOrder(data);

			toast.success('Заказ успешно оформлен! Переход на оплату...');

			if (url) {
				location.href = url;
			}
		} catch (err) {
			toast.error('Не удалось создать заказ');
			console.error(err);
			setSubmitting(false);
		}
	};

	const onClickCountButton = (
		id: number,
		quantity: number,
		type: 'plus' | 'minus'
	) => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
		updateItemQuantity(id, newQuantity);
	};

	return (
		<Container className='mt-5'>
			<Title
				text='Оформление заказа'
				className='mb-8 font-extrabold'
				size='lg'
			/>

			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='flex gap-40'>
						{/* LEFT BLOCK */}
						<div className='mb-20 flex flex-1 flex-col gap-10'>
							<CheckoutCart
								items={items}
								onClickCountButton={onClickCountButton}
								removeCartItem={removeCartItem}
								loading={loading}
							/>

							<CheckoutPersonalForm
								className={cn({ 'pointer-events-none opacity-50': loading })}
							/>

							<CheckoutAddressForm
								className={cn({ 'pointer-events-none opacity-50': loading })}
							/>
						</div>

						{/* RIGHT BLOCK */}
						<div className='w-[450px]'>
							<CheckoutSidebar
								totalAmount={totalAmount}
								loading={loading || submitting}
							/>
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	);
}
