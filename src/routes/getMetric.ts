import * as fs from 'fs';
import * as path from 'path';
import responseHandler from '../utils/responseHandler';
import * as moment from 'moment';

const logPath = path.resolve(__dirname, '../../assets/tracker.json');

export const getTotalMetric = (ctx: any, next: any) => {
  const { key } = ctx.params;
  const tracker = JSON.parse(fs.readFileSync(logPath,'utf8'));
  let sum: number = 0;

  const existed = Object.keys(tracker).find(metric => metric === key);
  if (!existed) {
    return responseHandler(
      ctx,
      {
        statusCode: 200,
        value: sum
      }
    );
  }
  tracker[key] = tracker[key].filter((record: {timeStamp: number, value: number}) => {
    if (moment.duration(moment().diff(moment(record.timeStamp))).get('hours') <= 1) {
      return record;
    }
  });
  tracker[key].forEach((record: {timeStamp: number, value: number}) => {
    sum += record.value
  })
  fs.writeFile(logPath, JSON.stringify(tracker), err => {
    if (err) throw err;
    console.log('Data has been updated.');
  });
  return responseHandler(
    ctx,
    {
      statusCode: 200,
      value: sum
    }
  );
}