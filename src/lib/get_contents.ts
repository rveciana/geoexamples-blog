import { data } from '$lib/data.json';
import type { PostSummary } from './model';

export const getContents = (num_posts: string | undefined): PostSummary[] =>
	Object.values(data)
		.filter((value) => value.layout === 'post')
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, num_posts ? parseInt(num_posts) : undefined)
		.map((post) => {
			const postDate = new Date(post.date);

			const htmlPath = post.meta.relativePath
				.replace(/\\/g, '/')
				.split('/')
				.pop()
				.split('-')
				.slice(3)
				.join('-');
			return {
				title: post.title,
				date: post.date,
				tags: post.tags,
				categories: post.categories,
				teaser: post.teaser,

				slug: `/${post.categories}/${postDate.getFullYear()}/${postDate.toLocaleDateString(
					'en-US',
					{
						month: '2-digit'
					}
				)}/${postDate.toLocaleDateString('en-US', { day: '2-digit' })}/${htmlPath}`
			};
		});
