import CollectorService from './collector';

const links = [
	'https://cutt.ly/BerdenzsPizzaPlazaMuseo',
	'https://cutt.ly/BerdenzsPizzaMartiresDeChicago',
	'https://cutt.ly/BerdenzsPizzaRafaelLucio'
];

const RedirectService = {
	redirect: (rows: any[], data: any, coords: any) => {
		let nearest: number = 0;

		for (let i = 0; i < rows.length; i++) {
			if (rows[i].elements[0].distance['value'] < rows[nearest].elements[0].distance['value']) {
				nearest = i;
			}
		}

		CollectorService.collect(data, links[nearest], coords);
		location.replace(links[nearest]);
	},
};

export default RedirectService;