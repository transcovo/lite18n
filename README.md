lite18n
=======

A dead simple i18n module

#TLDR;

```
var lite18n = require ('lite18n')
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
#License
MIT
