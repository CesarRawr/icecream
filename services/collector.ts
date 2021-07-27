const CollectorService = {
	collect: (data: any, link: string, coords: any) => {

		let d = new Date();
		let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
		let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
		let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
		let ho = new Intl.DateTimeFormat('en', { hour12: true }).format(d);
		let min = new Intl.DateTimeFormat('en', { minute: "2-digit" }).format(d);
		let seg = new Intl.DateTimeFormat('en', { second: "2-digit" }).format(d);

		const info = {
			data,
			link,
			coords,
			date: `${da}-${mo}-${ye} at ${ho}:${min}:${seg}`,
		}

		console.log(info);
	},
};

export default CollectorService;