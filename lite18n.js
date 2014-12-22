'use strict';

var lite18n = function (params) {
  params = params || {};
  var locales = params.locales;
  if (!locales) {
    throw new Error ('No locale file specified');
  }
  var defaultLocale = params.defaultLocale || null;

  var fn = function (phraseKey, phraseLang, phraseParams) {
    if (!phraseKey) {
      throw new Error ('No string key provided');
    }

    var phrase = locales[phraseKey];
    if (!phrase) {
      throw new Error ('Unknown key '+phraseKey);
    }

    if (!phraseLang) {
      if (!defaultLocale) {
        throw new Error ('No locale specified and no default locale set');
      } else {
        throw new Error ('No locale specified and default locale does not exist');
      }
    }
    var string = phrase[phraseLang] || phrase[defaultLocale];
    if (!string) {
      if (!defaultLocale) {
        throw new Error ('Unknown locale specified and no default locale set');
      } else {
        throw new Error ('Unknown locale specified and default locale does not exist');
      }
    }

    if ('object' !== typeof phraseParams) {
      phraseParams = {};
    }
    var paramKeys = Object.keys (phraseParams);
    paramKeys.forEach (function (key) {
      string = string.replace (new RegExp ('\\{ *?\\{ *?' + key + ' *?\\} *?\\}'), phraseParams[key]);
    });
    return string;
  };
  return fn;
};

module.exports = lite18n;
