import { redirect } from 'next/navigation';

import { InfoBlock } from '@/shared/components';
import { getUserSession } from '@/shared/lib/get-user-session';

export default async function ProfilePage() {
	const session = await getUserSession();

	if (session) {
		return redirect('/');
	}

	return (
		<div className='mt-40 flex flex-col items-center justify-center'>
			<InfoBlock
				title='Доступ запрещен'
				text='Данную страницу могут видеть только авторизованные пользователи'
				imageUrl='/assets/images/lock.png'
			/>
		</div>
	);
}
