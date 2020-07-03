interface Context {
  status?: number,
  body?: any,
}

interface Res {
  statusCode: number,
  value?: number,
  message?: string,
}

export default (ctx: any, res: Res) => {
  const {statusCode, message, value} = res;
  let context: Context = ctx;
  context.status = statusCode;
  if (statusCode === 400) {
    context.body = {
      statusCode,
      errorMessage: message
    };
  }
  if (value || value === 0) {
    context.body = {
      value
    }
  }
}