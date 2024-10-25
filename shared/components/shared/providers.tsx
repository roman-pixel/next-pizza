'use client';

import { SessionProvider } from 'next-auth/react';
import NextTopLoader from 'nextjs-toploader';
import React, { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<SessionProvider>{children}</SessionProvider>
			<Toaster />
			<NextTopLoader />
		</>
	);
};
