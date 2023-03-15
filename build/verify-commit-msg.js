const colors = require('colors');
const msgPath = './.git/COMMIT_EDITMSG';
const msg = require('fs')
  .readFileSync(msgPath, 'utf-8')
  .trim();

const commitRE = /^((revert: )?(feat|fix|polish|docs|style|refactor|perf|test|workflow|ci|chore|types|build)(\(.+\))?: .{1,100})|^(Merge branch)/;

if (!commitRE.test(msg)) {
  console.error(
    `  ${colors.bgRed.white(' ERROR ')} ${colors.red('提交信息格式错误')}\n\n` +
      colors.red('  git commit需要正确的信息格式。\n\n') +
      colors.red(`  你可以运行 ${colors.cyan('npm run commit')} 或 ${colors.cyan('yarn commit')} \n  进行交互式生成提交信息。\n`),
  );
  process.exit(1);
}
