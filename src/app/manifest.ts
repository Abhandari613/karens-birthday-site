import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Karen\'s 40th Birthday',
        short_name: 'Karen 40',
        description: 'Celebrate Karen\'s 40th Birthday. Share photos, videos, and memories!',
        start_url: '/',
        display: 'standalone',
        background_color: '#0F172A',
        theme_color: '#FFCA28',
        icons: [
            {
                src: '/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}
