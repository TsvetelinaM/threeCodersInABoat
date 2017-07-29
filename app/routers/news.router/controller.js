const ObjectId = require('mongodb').ObjectId;

const init = ({ news }) => {
    const controller = {
        displayNewsByCategory(req, res, next) {
            const category = req.query.categories;
            news.filter({
                key: { sectionId: category },
                sortKey: { webPublicationDate: -1 },
                fromItem: 0,
                items: 20,
            })
                .then((result) => {
                    return res.render('news-list', {
                        news: result,
                        category: category });
                });
        },

        displayNewsByCategoryAndDate(req, res, next) {
            const category = req.query.categories;
            const date = req.query.date || '*';
            const rgx = new RegExp(date);
            news.filter({
                key: { sectionId: category, webPublicationDate: { $regex: rgx } },
                sortKey: { webPublicationDate: -1 },
                fromItem: 0,
                items: 20,
                })
            .then((result) => {
                    return res.render('news-list-page', {
                        news: result,
                        date: date,
                        category: category });
                });
        },

        displayNewsBySearchedString(req, res) {
            const string = req.query.search;
            news.findByText(string)
                .then((result) => {
                    return res.render('search', {
                        news: result,
                        query: string,
                    });
                });
        },

        pagination(req, res, next) {
            const category = req.query.categories;
            const page = req.query.page;
            news.filter({
                key: { sectionId: category },
                sortKey: { webPublicationDate: -1 },
                fromItem: page * 20,
                items: 20,
            })
                .then((result) => {
                    res.render('news-list-page', {
                        news: result,
                        category: category });
                });
        },

        article(req, res, next) {
            const articleId = req.query.id;
            const id = new ObjectId(articleId);
            news.findOne({ _id: id })
                .then((result) => {
                    return res.render('news-article', { news: result });
                });
        },

        getArticleComments(req, res, next) {
            console.log('get comments');
        },

        setArticleComment(req, res, next) {
            console.log('set comment');
        },

        updateArticleComment(req, res, next) {
            console.log('update comment');
        },

        removeArticleComment(req, res, next) {
            console.log('delete comment');
        },
    };

    return controller;
};

module.exports = { init };
