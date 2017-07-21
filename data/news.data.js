const BaseData = require('./base/base.data');
const News = require('../models/news');

class NewsData extends BaseData {
    constructor(db) {
        super(db, News);
    }

    newsApiRequest() {
        const https = require('https');
        const url = 'https://content.guardianapis.com/search?api-key=f93068f8-2f5e-43b5-8f2b-b76905e4ab38&page-size=50&show-fields=headline,trailText,thumbnail,bodyText';
        let body = '';
        return new Promise((res, rej) => {
            https.get(url, (resp) => {
                resp
                    .on('data', (chunk) => {
                        body += chunk;
                    })
                    .on('end', () => {
                        body = JSON.parse(body);
                        const result = body.response.results
                            .filter((item) => item.type === 'article')
                            .filter(
                            (item) => {
                                return item.sectionId === 'enviroment'
                                    || item.sectionId === 'world'
                                    || item.sectionId === 'sport'
                                    || item.sectionId === 'politics'
                                    || item.sectionId === 'business'
                                    || item.sectionId === 'lifeandstyle';
                            });
                        res(result);
                    });
            });
        });
    }

    updateNews() {
        this.newsApiRequest()
            .then((result) => {
                result.forEach((element) => {
                    this.findOne({ id: element.id })
                        .then((item) => {
                            if (item) {
                                return;
                            }
                            this.create(element);
                        });
                });
            });
    }
}

module.exports = NewsData;
