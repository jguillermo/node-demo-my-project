let common = [
  'test/features/**/*.feature',
  //'test/features/user/delete.feature',
  '--require-module ts-node/register',
  '--require test/features/step-definitions/**/*.ts',
  '--format html:cucumber-report.html',
  '--publish-quiet',
].join(' ');

module.exports = {
  default: common,
};
