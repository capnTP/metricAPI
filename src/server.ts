import * as Koa from 'koa';
const bodyParser = require('koa-bodyparser');
const dotenv = require('dotenv');
dotenv.config();

const app = new Koa();
const router = require('./router');
app.use(bodyParser());

//logger
app.use(async (ctx: any, next: any) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx: any, next: any) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
  });

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(process.env.PORT);