import * as Router from '@koa/router';

const {postMetric} = require('./routes/postMetric');
const {getTotalMetric} = require('./routes/getMetric');


const router = new Router();
router.post('/metric/:key', postMetric);
router.get('/metric/:key/sum', getTotalMetric);

module.exports = router;