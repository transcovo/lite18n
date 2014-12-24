lite18n
=======

A dead simple i18n module

#TLDR;

```
var lite18n = require ('lite18n');

var locales = {
  'foo.bar': {
    en: 'Foo Bar',
    fr: 'Le Foo Bar'
  }
};
var __ = lite18n({ locales: locales });

console.log (__ ('foo.bar', 'en'));
// => 'Foo Bar'
console.log (__ ('foo.bar', 'fr'));
// => 'Le Foo Bar'
```

#lite18n parameters
You can pass parameters when you require the module; some of them or mandatory, others are optional:

 - `locales` (mandatory): the object describing your translations,
 - `defaultLocale`: a default locale to use whenever the requested locale does not exist.

Example:
```
var __ = require ('lite18n') ({ locales: require ('./locales.js'), defaultLocale: 'en' });
```

##The locales object
The `locales` parameter takes an object for value; it must be structured this way:
```
{
  'any.key.you.need': {
    lang1: '<Translation for language lang1>',
    lang2: '<Translation for language lang2>',
    // ...
  },
  'another.key': {
    // ...
  }
}
```

#String formatting
You can pass parameters to your string by using curly brackets `{}` (a Pythony-ish way of formatting a string).

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
var __ = lite18n({ locales: locales });

console.log (__ ('car.en_route', 'en', { time: 5 }));
// => 'Your car is en route. It will arrive in 5 minutes.'
console.log (__ ('car.en_route', 'fr', { time: 5 }));
// => 'Votre voiture est en route. Elle sera là dans 5 minutes.'
```

To escape curly brackets, just insert double curly brackets. Example:

```
// {character}, there is a bounty on your {{head}}
// => Thorin, there is a bounty on your {head}
```

#License
MIT
