import {
	Container,
	Filters,
	ProductsGroupList,
	TopBar
} from '@/components/shared';
import { Title } from '@/components/shared';

export default function Home() {
	return (
		<>
			<Container className='mt-10'>
				<Title
					text='Все пиццы'
					size='lg'
					className='font-extrabold'
				/>
			</Container>

			<TopBar />

			<Container className='mt-10 pb-14'>
				<div className='flex gap-[60px]'>
					{/* FILTERS */}
					<div className='w-[250px]'>
						<Filters />
					</div>

					{/* PRODUCTS LIST */}
					<div className='flex-1'>
						<div className='flex flex-col gap-16'>
							<ProductsGroupList
								title='Пиццы'
								items={[
									{
										id: 1,
										name: 'Пепперони',
										imageUrl:
											'https://media.dodostatic.net/image/r:584x584/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
										price: 500,
										items: [{ price: 500 }]
									},
									{
										id: 2,
										name: 'Пепперони',
										imageUrl:
											'https://media.dodostatic.net/image/r:584x584/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
										price: 500,
										items: [{ price: 500 }]
									},
									{
										id: 3,
										name: 'Пепперони',
										imageUrl:
											'https://media.dodostatic.net/image/r:584x584/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
										price: 500,
										items: [{ price: 500 }]
									}
								]}
								categoryId={1}
							/>
							<ProductsGroupList
								title='Закуски'
								items={[
									{
										id: 1,
										name: 'Пепперони',
										imageUrl:
											'https://media.dodostatic.net/image/r:584x584/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
										price: 500,
										items: [{ price: 500 }]
									},
									{
										id: 2,
										name: 'Пепперони',
										imageUrl:
											'https://media.dodostatic.net/image/r:584x584/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
										price: 500,
										items: [{ price: 500 }]
									},
									{
										id: 3,
										name: 'Пепперони',
										imageUrl:
											'https://media.dodostatic.net/image/r:584x584/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
										price: 500,
										items: [{ price: 500 }]
									}
								]}
								categoryId={2}
							/>
							<ProductsGroupList
								title='Напитки'
								items={[
									{
										id: 1,
										name: 'Пепперони',
										imageUrl:
											'https://media.dodostatic.net/image/r:584x584/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
										price: 500,
										items: [{ price: 500 }]
									},
									{
										id: 2,
										name: 'Пепперони',
										imageUrl:
											'https://media.dodostatic.net/image/r:584x584/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
										price: 500,
										items: [{ price: 500 }]
									},
									{
										id: 3,
										name: 'Пепперони',
										imageUrl:
											'https://media.dodostatic.net/image/r:584x584/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
										price: 500,
										items: [{ price: 500 }]
									}
								]}
								categoryId={3}
							/>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
