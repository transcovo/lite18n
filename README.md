lite18n
=======

A dead simple i18n module

#TLDR;

```
var lite18n = require ('lite18n');
var __ = lite18n({ locales: require ('./locales.js') });

console.log (__ ('foo.bar', 'en'));
// => 'Foo Bar'
console.log (__ ('foo.bar', 'fr'));
// => 'Le Foo Bar'
```

`locales.js`:
```
module.exports = {
  'foo.bar': {
    en: 'Foo Bar',
    fr: 'Le Foo Bar'
  }
};
```

#Parameters

You can pass parameters to your string by using `{}` (a Pythony-ish way of formatting a string).

Example:
`locales.js`:
```
module.exports = {
  'car.en_route': {
    en: 'Your car is en route. It will arrive in {time} minutes.',
    fr: 'Votre voiture est en route. Elle sera là dans {time} minutes.'
  }
};
```

```
var lite18n = require ('lite18n');
var __ = lite18n({ locales: require ('./locales.js') });

console.log (__ ('car.en_route', 'en', { time: 5 }));
// => 'Your car is en route. It will arrive in 5 minutes.'
console.log (__ ('car.en_route', 'fr', { time: 5 }));
// => 'Votre voiture est en route. Elle sera là dans 5 minutes.'
```

#License
MIT
