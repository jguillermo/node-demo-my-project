let common = [
  'test/features/**/*.feature',
  '--require-module ts-node/register',
  '--require test/features/step-definitions/**/*.ts',
  '--format html:cucumber-report.html',
  '--publish-quiet',
].join(' ');

module.exports = {
  default: common,
};
