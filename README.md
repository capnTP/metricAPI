# metricAPI
 A lightweight API server to handle metric logging and report
 
 Please find hosting link [here](https://metric-reporting.herokuapp.com/)
 
 **To run server locally**
 1) clone repo with `git clone`
 2) `cd clonedDirectory/`
 3) `npm install`
 4) `npm run dev`
 
 **To run built version**
 1) clone repo with `git clone`
 2) `cd clonedDirectory/`
 3) `npm install`
 4) `npm run build`
 5) `npm start`

## Available Endpoints

### POST metric - Post value to key metric
[POST] /metric/:key - where key can be anything that you want to track
Body: 
```
{
   "value": 9  // value must be a number... status 400 can be expected if no value provided or value is not a number
}
```

### GET metric - Retrieve total value by key metric (only display a total within recent hour)
[GET] /metric/:key/sum - where key can be anything that you want to track
Body: 
```
{
   "value": 9  // value: 0 can be expected if there's no available key
}
```
