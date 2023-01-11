const colors: string[] = [
	'#F7B2BD',
	'#A6B1E1',
	'#EEEFA8',
	'#C8B8DB',
	'#B8DBD9',
	'#F5EE9E',
	'#B7FFD8',
	'#EAEFD3',
	'#B6B8D6'
];


const vegatableNames = [
	'Carrots',
	'Potatoes',
	'Cucumbers',
	'Corns',
	'Tomatoes',
] as const

const fruitNames = [
	'Bananas',
	'Apples',
	'Kiwies',
	'Oranges',
	'Pears',
] as const

const categoryNames = [
	'Drinks',
	'Diary',
	'Sauces',
	'Rice',
	'Pulses',
	'Oils',
] as const
const  allProductNames = [...fruitNames, ...vegatableNames] 

type ImagesNamespaceType = typeof vegatableNames[number] | typeof fruitNames[number] | typeof categoryNames[number]

export {
  fruitNames, vegatableNames, categoryNames, colors, allProductNames, ImagesNamespaceType
};