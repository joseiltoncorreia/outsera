module.exports = {
  default: {
    requireModule: ['@babel/register'],
    require: ['cypress/e2e/**/*.js'],
    format: ['progress-bar', 'html:cypress/reports/cucumber-report.html'],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    publishQuiet: true,
    parallel: 2
  }
};
