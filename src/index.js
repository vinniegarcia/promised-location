const defaults = {
	enableHighAccuracy: false,
	timeout: Infinity,
	maximumAge: 0
};

const PromisedLocation =
	(options = defaults, PromiseImpl = Promise, nav = navigator) =>
		new PromiseImpl((resolve, reject) => {
			if (!nav.geolocation || !nav.geolocation.getCurrentPosition) {
				return reject(new Error('Geolocation not supported!'));
			}

			nav.geolocation.getCurrentPosition(resolve, reject, options);
		});

export default PromisedLocation;
