'use client';

import {
	CheckoutItem,
	CheckoutSidebar,
	Container,
	Title,
	WhiteBlock
} from '@/shared/components/shared';
import { Input, Textarea } from '@/shared/components/ui';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { useCart } from '@/shared/hooks';
import { getCartItemDetails } from '@/shared/lib';

export default function CheckoutPage() {
	const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart();

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

			<div className='flex gap-40'>
				{/* LEFT BLOCK */}
				<div className='mb-20 flex flex-1 flex-col gap-10'>
					<WhiteBlock title='1. Корзина'>
						<div className='flex flex-col gap-5'>
							{items.map(item => (
								<CheckoutItem
									key={item.id}
									id={item.id}
									name={item.name}
									imageUrl={item.imageUrl}
									price={item.price}
									quantity={item.quantity}
									details={getCartItemDetails(
										item.ingredients,
										item.pizzaType as PizzaType,
										item.pizzaSize as PizzaSize
									)}
									disabled={item.disabled}
									onClickCountButton={type =>
										onClickCountButton(item.id, item.quantity, type)
									}
									onClickRemove={() => removeCartItem(item.id)}
								/>
							))}
						</div>
					</WhiteBlock>

					<WhiteBlock title='2. Персональные данные'>
						<div className='grid grid-cols-2 gap-5'>
							<Input
								name='firstName'
								className='text-base'
								placeholder='Имя'
							/>
							<Input
								name='lastName'
								className='text-base'
								placeholder='Фамилия'
							/>
							<Input
								name='email'
								className='text-base'
								placeholder='E-mail'
							/>
							<Input
								name='phone'
								className='text-base'
								placeholder='Телефон'
							/>
						</div>
					</WhiteBlock>

					<WhiteBlock title='3. Адрес доставки'>
						<div className='flex flex-col gap-5'>
							<Input
								name='address'
								className='text-base'
								placeholder='Введите адрес'
							/>
							<Textarea
								name='comment'
								rows={5}
								className='text-base'
								placeholder='Комментарий к заказу'
							/>
						</div>
					</WhiteBlock>
				</div>

				{/* RIGHT BLOCK */}
				<div className='w-[450px]'>
					<CheckoutSidebar totalAmount={totalAmount} />
				</div>
			</div>
		</Container>
	);
}
