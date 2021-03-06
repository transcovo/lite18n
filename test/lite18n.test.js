'use strict';

var should = require ('should');

var lite18n;
var locales = {
  'smaug': {
    en: 'My armor is like tenfold shields, my teeth are swords, my claws spears, the shock of my tail a thunderbolt, my wings a hurricane, and my breath death!',
    // homemade translation
    fr: 'Mon armure est comme dix boucliers, mes dents des épées, mes griffes des lances, le choc de ma queue un éclair, mes ailes un ouragan, et mon souffle, la mort !'
  },
  'characters.bilbo': {
    en: 'Bilbo',
    fr: 'Bilbon'
  },
  'characters.gandalf': {
    en: 'Gandalf',
    fr: 'Gandalf'
  },
  'morning': {
    en: '"Good morning!" said { character }, and he meant it.',
    fr: '"Bonne journée!", dit { character }, et il le pensait vraiment.'
  },
  'bounty': {
    en: '{character}, there is a bounty on your {{head}}',
    fr: '{character}, votre {{tête}} a été mise à prix.'
  },
  'precious': {
    en: 'The {pieceOfJewelry}, it is {{ precious }} to you beyond measure.',
    fr: 'L\'{pieceOfJewelry}, elle vous est démesurément {precious}.'
  }
};

describe ('lite18n.js', function () {

  describe ('lite18n ()', function () {

    it ('should import the lite18n module', function (done) {
      lite18n = require ('../lite18n.js');  
      should.exist (lite18n);
      'function'.should.equal (typeof lite18n);
      done ();
    });

    it ('should create a lite18n object', function (done) {
      var err;
      try {
        lite18n = require ('../lite18n.js')({ locales: locales });  
      } catch (e) {
        err = e;
      }
      should.exist (lite18n);
      should.not.exist (err);
      'function'.should.equal (typeof lite18n);
      done ();
    });

    it ('should throw an error when no locale is passed to lite18n', function (done) {
      var err;
      try {
        lite18n = require ('../lite18n.js')({ locales: null });  
      } catch (e) {
        err = e;
      }
      should.exist (lite18n);
      should.exist (err);
      'function'.should.equal (typeof lite18n);
      err.toString ().should.match (/no locale ?(file)?/i);
      done ();
    });

  });

  describe ('__ ()', function () {
    var __;

    before (function (done) {
      lite18n = require ('../lite18n.js');  
      __ = lite18n ({ locales: locales });
      done ();
    });

    it ('should throw an error when no key is passed to the translation function', function (done) {
      var err;
      try {
        __ ();
      } catch (e) {
        err = e;
      }
      should.exist (err);
      err.toString ().should.match (/no.*?key/i);
      done ();
    });

    it ('should throw an error when an invalid string key is passed', function (done) {
      var err;
      try {
        __ ('foo.bar');
      } catch (e) {
        err = e;
      }
      should.exist (err);
      err.toString ().should.match (/unknown key.*foo\.bar/i);
      done ();
    });

    it ('should throw an error when no locale is passed and there is no default locale', function (done) {
      var err;
      try {
        __ ('smaug');
      } catch (e) {
        err = e;
      }
      should.exist (err);
      err.toString ().should.match (/no locale.*?no default/i);
      done ();
    });

    it ('should throw an error when no locale is passed and the default locale does not exist', function (done) {
      var err;
      __ = require ('../lite18n.js') ({ locales: locales, defaultLocale: 'de' });  
      try {
        __ ('smaug');
      } catch (e) {
        err = e;
      }
      should.exist (err);
      err.toString ().should.match (/no locale.*?default locale.*?exist/i);
      done ();
    });

    it ('should throw an error when an unknown locale is passed and the default locale does not exist', function (done) {
      var err;
      __ = require ('../lite18n.js') ({ locales: locales });  
      try {
        __ ('smaug', 'de');
      } catch (e) {
        err = e;
      }
      should.exist (err);
      err.toString ().should.match (/unknown locale.*?no default locale/i);
      done ();
    });

    it ('should translate the string to English and French', function (done) {
      var translatedString;
      __ = require ('../lite18n.js') ({ locales: locales });  

      translatedString = __ ('smaug', 'en');
      translatedString.should.equal (locales.smaug.en);

      translatedString = __ ('smaug', 'fr');
      translatedString.should.equal (locales.smaug.fr);
      done ();
    });

    it ('should translate the string to English (no German or Spanish available)', function (done) {
      var translatedString;
      __ = require ('../lite18n.js') ({ locales: locales, defaultLocale: 'en' });  

      translatedString = __ ('smaug', 'de');
      translatedString.should.equal (locales.smaug.en);

      translatedString = __ ('smaug', 'es');
      translatedString.should.equal (locales.smaug.en);
      done ();
    });

    it ('should translate the string to English and French and correctly pass the character name', function (done) {
      var translatedCharacter, translatedString;

      translatedCharacter = __ ('characters.bilbo', 'en');
      translatedString = __ ('morning', 'en', { character: translatedCharacter });
      translatedString.should.equal ('"Good morning!" said Bilbo, and he meant it.');

      translatedCharacter = __ ('characters.bilbo', 'fr');
      translatedString = __ ('morning', 'fr', { character: translatedCharacter });
      translatedString.should.equal ('"Bonne journée!", dit Bilbon, et il le pensait vraiment.');

      done ();
    });

    it ('should translate the string and escape the double curly-bracketted strings', function (done) {
      var translatedString = __ ('bounty', 'en', { character: 'Thorin' });
      translatedString.should.equal ('Thorin, there is a bounty on your {head}');

      translatedString = __ ('bounty', 'fr', { character: 'Thorin' });
      translatedString.should.equal ('Thorin, votre {tête} a été mise à prix.');

      done ();
    });

    it ('should translate the string and escape the double curly-bracketted strings', function (done) {
      var translatedString = __ ('precious', 'en', { pieceOfJewelry: 'Arkenstone' });
      translatedString.should.equal ('The Arkenstone, it is { precious } to you beyond measure.');

      var err;
      try {
        translatedString = __ ('precious', 'fr', { pieceOfJewelry: 'Arkenstone' });
      } catch (e) {
        err = e;
      }
      should.exist (err);
      err.toString ().should.match (/Format parameter "precious" has not been parsed/);

      done ();
    });

  });


});
