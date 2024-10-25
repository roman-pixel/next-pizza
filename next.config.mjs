/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'media.dodostatic.net' // для картинок с dodo
			},
			{
				protocol: 'https',
				hostname: 'cdn.dodostatic.net' // для картинок с dodo
			},
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com' // для картинок с GitHub
			}
		]
	},
	reactStrictMode: false
};

export default nextConfig;
