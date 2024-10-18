'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
	uid: string;
	onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ uid, onChange }) => {
	const token = process.env.NEXT_PUBLIC_DADATA_API_KEY as string;

	return (
		<AddressSuggestions
			uid={uid}
			token={token}
			onChange={data => onChange?.(data?.value)}
			suggestionClassName='rounded'
		/>
	);
};
