const msgPath = './.git/COMMIT_EDITMSG';
const fs = require('fs');

fs.open(msgPath, 'r', (err, fd) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.error('myfile does not exist');
      return;
    }

    throw err;
  }

  try {
    let msg = fs.readFileSync(msgPath, 'utf-8').trim();
    if (process.argv[2] === '--post-commmit') {
      msg = '';
    } else {
      msg = msg.split(':')[1] || msg;
    }
    fs.writeFileSync(msgPath, msg);
  } finally {
    fs.close(fd, (err) => {
      if (err) throw err;
    });
  }
});
