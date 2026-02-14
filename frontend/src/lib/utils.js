export const resolveImageUrl = (url) => {
    if (!url || typeof url !== 'string') return '';
    if (url.startsWith('http')) return url;

    // If it starts with /assets, it's a frontend asset, so return as is
    if (url.startsWith('/assets') || url.startsWith('assets/')) {
        return url.startsWith('/') ? url : `/${url}`;
    }

    // For local uploads starting with /uploads
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';

    // Ensure url starts with / if it's a relative path
    const sanitizedPath = url.startsWith('/') ? url : `/${url}`;
    return `${baseUrl}${sanitizedPath}`;
};
