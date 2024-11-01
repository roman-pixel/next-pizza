import { redirect } from 'next/navigation';

import { InfoBlock } from '@/shared/components';
import { getUserSession } from '@/shared/lib/get-user-session';

export default async function NotFound() {
	const session = await getUserSession();

	if (session) {
		return redirect('/');
	}

	return (
		<div className='mt-40 flex flex-col items-center justify-center'>
			<InfoBlock
				title='Страница не найдена'
				text='Проверьте правильность введенного адреса или повторите попытку позже'
				imageUrl='/assets/images/not-found.png'
			/>
		</div>
	);
}
