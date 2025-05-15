const figlet = require('figlet');

async function getChalk() {
  return (await import('chalk')).default;
}

async function printBanner() {
  const chalk = await getChalk();
  console.log(
    chalk.cyan(
      figlet.textSync('Beamify Server', { horizontalLayout: 'full' })
    )
  );
  console.log(chalk.green('Server is starting up...\n'));
}

async function printMongoConnected() {
  const chalk = await getChalk();
  console.log(chalk.green('✔ Connected to MongoDB'));
}

async function printSwaggerDocsUrl(port = 3021, path = '/v1/docs') {
  const chalk = await getChalk();
  console.log(chalk.blueBright(`📚 Swagger API docs available at: http://localhost:${port}${path}`));
}

module.exports = {
  printBanner,
  printMongoConnected,
  printSwaggerDocsUrl,
}; 
