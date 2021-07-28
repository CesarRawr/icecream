import CollectorService from './collector';

const links = [
	'https://rebrand.ly/BerdenzsPizzaPlazaMuseo',
	'https://rebrand.ly/BerdenzsPizzaMartiresDeChicago',
	'https://rebrand.ly/BerdenzsPizzaRafaelLucio'
];

const RedirectService = {
	redirect: async (rows: any[], data: any, coords: any) => {
		let nearest: number = 0;

		for (let i = 0; i < rows.length; i++) {
			if (rows[i].elements[0].distance['value'] < rows[nearest].elements[0].distance['value']) {
				nearest = i;
			}
		}

		await CollectorService.collect(data, links[nearest], coords);
		location.replace(links[nearest]);
	},
};

export default RedirectService;