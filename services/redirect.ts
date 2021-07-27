const RedirectService = {
	redirect: (rows: any[]) => {
		let nearest: number = 0;

		for (let i = 0; i<rows.length; i++) {
			if (rows[i].elements[0].distance['value'] < rows[nearest].elements[0].distance['value']) {
				nearest = i;
			}
		}

		console.log(nearest);
	},
};

export default RedirectService;