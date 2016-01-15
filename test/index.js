import test from 'ava';
import PromisedLocation from '../dist/';
import {Promise as es6Promise} from 'es6-promise';

// mock out navigator.geolocation with a fake position
const position = {
	coords: {
		latitude: '37.0043',
		longitude: '-115.3026'
	}
};

const navigator = {
	geolocation: {
		getCurrentPosition(success, error, options = {}) {
			const noop = () => {
			};
			noop(options);
			setTimeout(() => success(position), 400);
		}
	}
};

test(async t => {
	t.plan(1);
	const pl = await new PromisedLocation({}, Promise, navigator);
	t.same(pl, position);
});

test(async t => {
	t.plan(2);
	t.ok(es6Promise);
	const pl = await new PromisedLocation({}, es6Promise, navigator);
	t.same(pl, position);
});
