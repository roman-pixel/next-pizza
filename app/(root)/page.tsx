import { Suspense } from 'react';

import {
	Container,
	Filters,
	ProductsGroupList,
	TopBar
} from '@/shared/components/shared';
import { Title } from '@/shared/components/shared';
import { GetSearchParams, findPizzas } from '@/shared/lib/find-pizzas';

export default async function Home({
	searchParams
}: {
	searchParams: GetSearchParams;
}) {
	const categories = await findPizzas(searchParams);

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
							{categories.map(
								category =>
									category.products.length > 0 && (
										<ProductsGroupList
											key={category.id}
											title={category.name}
											items={category.products}
											categoryId={category.id}
										/>
									)
							)}
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
