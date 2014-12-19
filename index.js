'use strict';

var lite18n = function (params) {
  var locales = params.locales;

  var fn = function (phraseKey, phraseLang, phraseParams) {
    var string = locales[phraseKey][phraseLang];
    var paramKeys = Object.keys (phraseParams);
    paramKeys.forEach (function (key) {
      string = string.replace (new RegExp ('\\{\\{' + key + '\\}\\}'), phraseParams[key]);
    });
    return string;
  };
  return fn;
};

module.exports = lite18n;
