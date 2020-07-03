import * as fs from 'fs';
import * as path from 'path';
import responseHandler from '../utils/responseHandler';

const logPath = path.resolve(__dirname, '../../assets/tracker.json');

export const postMetric = (ctx: any, next: any) => {
  const { key } = ctx.params;
  const { value } = ctx.request.body;
  
  if (!value) {
    return responseHandler(
      ctx,
      {
        statusCode: 400,
        message: 'Value is missing. Please provide.'
      }
    );
  }
  if (typeof value !== 'number') {
    return responseHandler(
      ctx,
      {
        statusCode: 400,
        message: 'Value is not a number.'
      }
    );
  }

  const tracker = JSON.parse(fs.readFileSync(logPath,'utf8'));
  const existed = Object.keys(tracker).find(metric => metric === key);
  if (existed) {
    tracker[existed].push({
      timeStamp: Date.now(),
      value: Math.round(value)
    })
  } else {
    tracker[key] = [{
      timeStamp: Date.now(),
      value: Math.round(value)
    }]
  }

  fs.writeFile(logPath, JSON.stringify(tracker), err => {
    if (err) throw err;
    console.log('Data has been recorded.');
  });

  return responseHandler(
    ctx,
    {
      statusCode: 200
    }
  );
}