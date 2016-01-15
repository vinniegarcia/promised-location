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

// base case/happy path
test(async t => {
	t.plan(1);
	const pl = await new PromisedLocation({}, Promise, navigator);
	t.same(pl, position, 'Position returned is correct (native Promise)');
});

// Alternate promise implementation
// using es6-promise
test(async t => {
	t.plan(2);
	t.ok(es6Promise, 'Alternate promise impl is ok');
	const pl = await new PromisedLocation({}, es6Promise, navigator);
	t.same(pl, position, 'Position returned is correct (es6-promise)');
});

// missing environment
test(async t => {
	t.plan(1);
	const badNavigator = {
		geolocation: null
	};
	t.throws(new PromisedLocation({}, Promise, badNavigator),
		Error,
		'Throws geolocation error when environment not sufficient');
});
