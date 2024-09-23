import { notFound } from 'next/navigation';

import { prisma } from '@/prisma/prisma-client';
import {
	Container,
	GroupVariants,
	PizzaImage,
	Title
} from '@/shared/components/shared';

export default async function ProductPage({
	params: { id }
}: {
	params: { id: string };
}) {
	const product = await prisma.product.findFirst({
		where: {
			id: Number(id)
		}
	});

	if (!product) return notFound();

	return (
		<Container className='my-10 flex flex-col'>
			<div className='flex flex-1'>
				<PizzaImage
					src={product.imageUrl}
					alt={product.name}
					size={40}
				/>

				<div className='w-[490px] bg-[#fcfcfc] p-7'>
					<Title
						text={product.name}
						size='md'
						className='mb-1 font-extrabold'
					/>

					<p className='text-gray-400'>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta
						nisi quas odit ipsa nesciunt rerum odio molestiae quos explicabo
						enim itaque voluptatum nihil ratione deleniti totam quis, eius iure
						repellat.
					</p>

					<GroupVariants
						selectedValue='3'
						items={[
							{
								name: 'Маленькая',
								value: '1'
							},
							{
								name: 'Средняя',
								value: '2',
								disabled: true
							},
							{
								name: 'Большая',
								value: '3'
							}
						]}
					/>
				</div>
			</div>
		</Container>
	);
}
