/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');

const supportedLangs = ['en', 'es'];
const lang_PATH = '../../src';
const i18n_PATH = '../../src/i18n';

const removeExistingi18n = () => {
  if (fs.existsSync(path.join(__dirname, i18n_PATH))) {
    fs.rmSync(path.join(__dirname, i18n_PATH), { recursive: true });
  }
};

const getFileLocale = (_path) => {
  const pathElements = _path.split('.').reverse();
  return pathElements[0] === 'json' && supportedLangs.includes(pathElements[1])
    ? pathElements[1]
    : null;
};

const getPrefixFromFileName = (fileName) => {
  const prefixEl = fileName.split('.').reverse()[2];
  return prefixEl ? prefixEl.replace('-', '.') : '';
};

const readTranslationsFromFile = (_path, fileName, locale, translationsObj) => {
  const prefix = getPrefixFromFileName(fileName);

  const fileObj = JSON.parse(
    fs.readFileSync(path.join(__dirname, _path), 'utf8')
  );

  const newObj = {};

  Object.keys(fileObj).forEach((key) => {
    newObj[`${prefix}${prefix ? '.' : ''}${key}`] = fileObj[key];
  });

  translationsObj[locale] = {
    ...translationsObj[locale],
    ...newObj
  };
};

const sortObjectProps = (obj) => {
  const sortedObj = {};

  Object.keys(obj)
    .sort()
    .forEach((key) => {
      sortedObj[key] =
        typeof obj[key] === 'object' ? sortObjectProps(obj[key]) : obj[key];
    });

  return sortedObj;
};

const generateNewLangFiles = (translationsObj) => {
  if (!fs.existsSync(path.join(__dirname, i18n_PATH))) {
    fs.mkdirSync(path.join(__dirname, i18n_PATH));
  }
  Object.keys(translationsObj).forEach((key) => {
    fs.writeFileSync(
      path.join(__dirname, i18n_PATH, `${key}.json`),
      JSON.stringify(translationsObj[key]),
      'utf8'
    );
  });
};

const build18n = () => {
  console.log('Building i18n...');

  removeExistingi18n();

  const translationsObj = {};

  const checkDirectory = (_path) => {
    const directoryPath = path.join(__dirname, _path);

    fs.readdirSync(directoryPath).forEach((p) => {
      const locale = getFileLocale(p);
      if (!locale && !p.includes('.')) {
        checkDirectory(`${_path}/${p}`);
      } else if (locale) {
        readTranslationsFromFile(`${_path}/${p}`, p, locale, translationsObj);
      }
    });
  };

  checkDirectory(lang_PATH);
  generateNewLangFiles(sortObjectProps(translationsObj));
  console.log('i18n build completed!');
};

build18n();
