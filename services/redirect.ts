const RedirectService = {
	redirect: (rows: any[], originAddresses: string[]) => {
		let nearest: number = 0;

		for (let i = 0; i < rows.length; i++) {
			if (rows[i].elements[0].distance['value'] < rows[nearest].elements[0].distance['value']) {
				nearest = i;
			}
		}

		console.log(originAddresses[nearest]);
		alert(`La sucursal mas cercana es ${originAddresses[nearest]}`);
	},
};

export default RedirectService;