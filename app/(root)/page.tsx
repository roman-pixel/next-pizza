import { Suspense } from 'react';

import { prisma } from '@/prisma/prisma-client';
import {
	Container,
	Filters,
	ProductsGroupList,
	TopBar
} from '@/shared/components/shared';
import { Title } from '@/shared/components/shared';

export default async function Home() {
	const categories = await prisma.category.findMany({
		include: {
			products: {
				include: {
					ingredients: true,
					variants: true
				}
			}
		}
	});

	return (
		<>
			<Container className='mt-10'>
				<Title
					text='Все пиццы'
					size='lg'
					className='font-extrabold'
				/>
			</Container>

			<TopBar
				categories={categories.filter(category => category.products.length > 0)}
			/>

			<Container className='mt-10 pb-14'>
				<div className='flex gap-[60px]'>
					{/* FILTERS */}
					<div className='w-[250px]'>
						<Suspense>
							<Filters />
						</Suspense>
					</div>

					{/* PRODUCTS LIST */}
					<div className='flex-1'>
						<div className='flex flex-col gap-16'>
							{categories.map(category => (
								<ProductsGroupList
									key={category.id}
									title={category.name}
									items={category.products}
									categoryId={category.id}
								/>
							))}
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
