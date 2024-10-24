'use client';

import { useFormContext } from 'react-hook-form';

import { ClearButton, ErrorText } from '..';
import { Input } from '../../ui';
import { RequiredSymbol } from '../required-symbol';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label?: string;
	required?: boolean;
	className?: string;
}

export const FormInput: React.FC<Props> = ({
	name,
	label,
	required,
	className,
	...props
}) => {
	const {
		register,
		formState: { errors },
		watch,
		setValue
	} = useFormContext();

	const value = watch(name);
	const errorText = errors[name]?.message as string;

	const onCliclClear = () => {
		setValue(name, '', { shouldValidate: true });
	};

	return (
		<div className={className}>
			{label && (
				<p className='mb-2 font-medium'>
					{label} {required && <RequiredSymbol />}
				</p>
			)}

			<div className='relative'>
				<Input
					className='text-md h-12'
					{...register(name)}
					{...props}
				/>

				{value && <ClearButton onClick={onCliclClear} />}
			</div>

			{errorText && (
				<ErrorText
					text={errorText}
					className='mt-2'
				/>
			)}
		</div>
	);
};
