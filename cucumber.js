// module.exports = {
//   default: `--format-options '{"snippetInterface": "synchronous"}'`,
// };

// {
//   "default": {
//   "paths": [
//     "features/**/*.feature"
//   ],
//       "parallel": 1,
//       "format": [
//     "html:cucumber-report.html"
//   ]
// }
// }

let common = [
  'features/**/*.feature',
  '--require-module ts-node/register',
  '--require features/step-definitions/**/*.ts',
  '--format html:cucumber-report.html',
].join(' ');

module.exports = {
  default: common,
  // More profiles can be added if desired
};
