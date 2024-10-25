import { z } from 'zod';

export const passwordSchema = z
	.string()
	.min(4, { message: 'Пароль должен содержать не менее 6 символов' });

export const loginFormSchema = z.object({
	email: z.string().email({ message: 'Введите корректный email' }),
	password: passwordSchema
});

export const registerFormSchema = loginFormSchema
	.merge(
		z.object({
			fullName: z
				.string()
				.min(2, { message: 'Введите корректные имя и фамилию' }),
			confirmPassword: passwordSchema
		})
	)
	.refine(data => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword']
	});

export type TFormLoginValues = z.infer<typeof loginFormSchema>;
export type TFormRegisterValues = z.infer<typeof registerFormSchema>;
