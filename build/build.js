'use strict';
const { spawn } = require('child_process');
const { businessArray } = require('./modules.config');
const program = require('commander');
const { bgGreen, bgRed, red, cyan, black } = require('chalk');
const ora = require('ora');
const rimraf = require('rimraf');
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');

const { ERROR, SUCCESS } = {
  ERROR: bgRed(' ERROR '),
  SUCCESS: bgGreen(black(' SUCCESS ')),
};

program
  .option('-a, --all', '打包所有模块')
  .option('-m, --mode <mode>', '指定环境模式 (默认值：production)', 'production') // 添加 mode 参数
  .parse(process.argv);
// windows不支持program.all
const buidlAll = program.all || program.opts().all;

if (program.args.length === 0 && !buidlAll) {
  console.log(ERROR, red('请输入需要打包的模块名称或全部打包[--all]'));
  process.exit(0);
}

async function run(arr) {
  const chunkArr = businessArray.map((j) => j.chunk);
  for (const i of arr) {
    if (chunkArr.includes(i)) {
      await build(i, businessArray[chunkArr.indexOf(i)].root);
    } else {
      console.log(ERROR, red(`模块:${i.chunk}不存在`));
      process.exit(0);
    }
  }
}

function build(projectName, root = false) {
  const spinner = ora(`开始打包:${projectName}`);
  spinner.start();
  return new Promise((resolve, reject) => {
    const build = spawn('vue-cli-service', ['build', `--mode ${program.mode}` /*将命令中的参数透传给vue-cli-service*/], {
      env: {
        ...process.env,
        PROJECT_NAME: projectName,
        IS_ROOT: root ? 1 : 0,
      },
      shell: true,
    });
    let out = '';
    let err = '';
    build.stdout.on('data', (data) => {
      // console.log(greenBright(data.toString()))
      out += data;
    });

    build.stderr.on('data', (data) => {
      // console.log(ERROR, red(data.toString()))
      if (data !== '-  Building for production...') {
        err += data;
      }
    });

    build.on('close', () => {
      spinner.stop();
      if (!out && err) {
        process.stdout.write(
          err.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false,
          }),
        );
        // console.log(ERROR, red(err))
      } else {
        process.stdout.write(
          out.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false,
          }),
        );
        // console.log(greenBright(out))
        if (!fs.existsSync(path.join(__dirname, '../dist/zip'))) fs.mkdirSync(path.join(__dirname, '../dist/zip'));
        const output = fs.createWriteStream(path.join(__dirname, '../dist/zip', `${projectName}.zip`));
        const archive = archiver('zip', {
          zlib: { level: 9 }, // Sets the compression level.
        });
        output.on('close', function() {
          console.log(archive.pointer() + ' total bytes');
          console.log('archiver has been finalized and the output file descriptor has closed.');
          console.log(SUCCESS, cyan(`\n    🎉${projectName}打包结束`));
          resolve(out);
        });

        // This event is fired when the data source is drained no matter what was the data source.
        // It is not part of this library but rather from the NodeJS Stream API.
        // @see: https://nodejs.org/api/stream.html#stream_event_end
        output.on('end', function() {
          console.log('Data has been drained');
        });

        // good practice to catch warnings (ie stat failures and other non-blocking errors)
        archive.on('warning', function(err) {
          if (err.code === 'ENOENT') {
            // log warning
            console.log(err);
          } else {
            // throw error
            reject(err);
          }
        });

        // good practice to catch this error explicitly
        archive.on('error', function(err) {
          reject(err);
        });

        // pipe archive data to the file
        archive.pipe(output);
        archive.directory(path.join(__dirname, `../dist/web/${projectName}/`), projectName);
        archive.finalize();
      }
    });
  });
}

const pages = businessArray.map((i) => i.chunk);

if (buidlAll) {
  rm(path.resolve(__dirname, '../dist'))
    .then(() => {
      run(buidlAll ? pages : program.args).catch((err) => {
        throw err;
      });
    })
    .catch((err) => {
      throw new Error(err);
    });
} else {
  const dirs = [];
  program.args.forEach((item) => {
    if (businessArray[pages.indexOf(item)].root) {
      dirs.push(rm(path.resolve(__dirname, `../dist`)));
    } else {
      dirs.push(rm(path.resolve(__dirname, `../dist/${item}`)));
    }
  });
  Promise.all(dirs)
    .then(() => {
      run(buidlAll ? pages : program.args).catch((err) => {
        throw err;
      });
    })
    .catch((err) => {
      throw new Error(err);
    });
}

function rm(path) {
  return new Promise((resolve, reject) => {
    rimraf(path, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}
