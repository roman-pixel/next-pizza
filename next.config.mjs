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
			}
		]
	}
};

export default nextConfig;
