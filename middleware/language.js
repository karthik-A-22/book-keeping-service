const i18next = require('i18next');
const i18nextHttpMiddleware = require('i18next-http-middleware');
const Backend = require('i18next-node-fs-backend');

i18next
    .use(Backend)
    .use(i18nextHttpMiddleware.LanguageDetector)
    .init({
        fallbackLng: 'en',
        preload: ['en', 'hi'],
        backend: {
            loadPath: './locales/{{lng}}/{{ns}}.json',
        },
    });

module.exports = i18next
