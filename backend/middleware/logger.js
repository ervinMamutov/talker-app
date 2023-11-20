import chalk from 'chalk';

const logger = (req, res, next) => {
  const timestamp = new Date().toUTCString();
  console.log(`
  url: ${chalk.green(req.url)} 
  --- method: ${chalk.blue(req.method)} 
  --- status: ${chalk.yellow(res.statusCode)} 
  --- date: ${chalk.red(timestamp)}`);
  next();
};

export default logger;
