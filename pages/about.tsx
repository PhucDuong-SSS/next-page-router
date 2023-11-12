import Header from '@/components/common/header'
import { AdminLayout } from '@/components/layout'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
// import dynamic from 'next/dynamic'
import { Box, Typography } from '@mui/material'
// import dynamic from 'next/dynamic'

// const Header = dynamic(() => import('@/components/common/header'), { ssr: false })
// const Header = dynamic(() => import('@/components/common/header'), { ssr: false })
export interface AboutPageProps {}

export default function AboutPage(props: AboutPageProps) {
	const [postList, setPostList] = useState([])
	// const [test, setTest] = useState([])
	const router = useRouter()

	console.log('About query: ', router.query)
	const page = router.query?.page

	useEffect(() => {
		// check page ban dau do query = {}
		if (!page) return
		;(async () => {
			const response = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=${page}`)
			const data = await response.json()

			setPostList(data.data)
		})()
	}, [page])
	// chi chay phia client
	// useEffect(() => {
	// 	;(async () => {
	// 		const response = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=${page}`)
	// 		const data = await response.json()
	// 		setTest(data.data)
	// 	})()
	// }, [])

	function handleNextClick() {
		router.push(
			{
				pathname: '/about',
				query: {
					page: (Number(page) || 1) + 1,
				},
			},
			undefined,
			{ shallow: true }
			// chi chay client
			// { shallow: true }
		)
	}

	return (
		<Box>
			<Typography component="h1" variant="h3" color="primary.main">
				About Page
			</Typography>

			<Header />
			{/* chi tra markup ul */}
			<ul className="post-list">
				{postList.map((post: any) => (
					<li key={post.id}>{post.title}</li>
				))}
			</ul>

			<button onClick={handleNextClick}>Next page</button>
		</Box>
	)
}

AboutPage.Layout = AdminLayout

export async function getStaticProps() {
	console.log('get static props')

	return {
		props: {},
	}
}

// export async function getServerSideProps() {
// 	return {
// 		props: {}, // will be passed to the page component as props
// 	}
// }
