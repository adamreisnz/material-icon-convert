'use strict';

/**
 * Dependencies
 */
const replaceInFile = require('replace-in-file');
const icons = require('material-design-icon-chars');

/**
 * Helper to get character
 */
function getChar(ligature) {
  const icon = icons.find(icon => icon.id === ligature);
  return icon ? icon.unicode : '';
}

/**
 * Helper to get ligature
 */
function getLigature(char) {
  const icon = icons.find(icon => icon.unicode === char);
  return icon ? icon.id : '';
}

/**
 * Helper to create config options for replace in file
 */
function appendConfig(config) {

  //Use default class name
  if (!config.className) {
    config.className = 'material-icons';
  }

  //Get config
  const {className, inverse} = config;

  //Convert from character code to ligature
  if (inverse) {
    config.from = new RegExp(
      `(\\b${className}\\b(?:.*?))>&#x([a-z0-9]+);<`, 'ig'
    );
    config.to = function(match, prefix, char) {
      const ligature = getLigature(char);
      return `${prefix}>${ligature}<`;
    };
    return;
  }

  //Convert from ligature to character code
  config.from = new RegExp(
    `(\\b${className}\\b(?:.*?))>([a-z_]+)<`, 'g'
  );
  config.to = function(match, prefix, ligature) {
    const char = getChar(ligature);
    return `${prefix}>&#x${char};<`;
  };
}

/**
 * Converter
 */
function convert(config, cb) {

  //Append config for replace in file
  appendConfig(config);

  //Use replace in file API
  return replaceInFile(config, cb);
}

/**
 * Sync API
 */
convert.sync = function(config) {

  //Append config for replace in file
  appendConfig(config);

  //Use sync API
  return replaceInFile.sync(config);
};

//Export
module.exports = convert;
