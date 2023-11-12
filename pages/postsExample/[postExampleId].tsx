import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/dist/client/router'
import * as React from 'react'

export interface PostPageProps {
	post: any
}

export default function PostDetailExamplePage(props: PostPageProps) {
	const router = useRouter()
	return (
		<div>
			<h1>Post Detail Page</h1>

			<p>{JSON.stringify(router.query)}</p>
		</div>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	console.log('get STATIC paths')

	const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1')
	const data = await response.json()

	return {
		paths: data.data.map((item: any) => ({ params: { postExampleId: item.id } })),
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps<PostPageProps> = async (
	context: GetStaticPropsContext
) => {
	console.log('\nGET STATIC PROPS', context.params?.postExampleId)
	const postExampleId = context.params?.postExampleId

	if (!postExampleId) {
		return { notFound: true }
	}

	const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postExampleId}`)
	const data = await response.json()

	return {
		props: {
			post: data,
		},
		revalidate: 300,
	}
}
