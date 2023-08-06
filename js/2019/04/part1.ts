export default (input: string) => {
	const [min, max] = input.split('-').map(Number);

	console.log(min, max);
};
