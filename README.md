# promised-location
Promise-compatible version of navigator.geolocation. Compatible with react native!

## Usage

`PromisedLocation` works like [`navigator.geolocation.getCurrentPosition`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition), except instead of supplying callbacks for the `success` and `error` scenarios, you handle a standard `Promise`. Call `new PromisedLocation` with [`PositionOptions`](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions), then handle like any other promise with `then` and `catch`.

```javascript
var PromisedLocation = require('promised-location');

var options = {
	enableHighAccuracy: true,
	timeout: 10000,
	maximumAge: 60000
};

var locator = new PromisedLocation(options);
locator
	.then(function (position) {
		console.log(position.coords);
	})
	.catch(function (err) {
		console.error('Position Error ', err.toString());
	});
```

## FAQ

1. _What if my browser/environment doesn't support geolocation?_

  The returned `Promise` will be rejected.

2. _What are the default values for `PositionOptions`?_

  Default `PositionOptions` are the same as the Web API, namely:
  ```javascript
  {
	enableHighAccuracy: false,
	timeout: Infinity,
	maximumAge: 0
  }
  ```

## Questions? Comments? Fixes?

File an [issue](https://github.com/vinniegarcia/promised-location/issues) or submit a [pull request](https://github.com/vinniegarcia/promised-location/pulls)!