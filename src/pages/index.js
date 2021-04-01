import MDX from '@mdx-js/runtime';

const Apps = () => <b>test</b>;

const Home = ({ bgcolor, textcolor, mdx }) => {
	const style = `
		body {
			background-color: ${bgcolor};
			color: ${textcolor};
		}
		article {
			max-width: 80vw;
			margin-left: auto;
			margin-right: auto;
			margin-top: 10vh;
			font-size: max(2vh, 16px);
		}
`;

	return <>
		<style>{style}</style>
		<article>
			<MDX components={{ Apps }}>{mdx}</MDX>
		</article>
	</>
};

export default Home;

export async function getServerSideProps(context) {
	const defaultMdx = `
# Hello world

This is a test

## Apps

<Apps />
`;

	return {
		props: {
			bgcolor: process.env.bgcolor || "#EDEEC0",
			textcolor: process.env.textcolor || "#433E0E",
			mdx: process.env.mdx || defaultMdx,
		}
	}
}
