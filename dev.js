const cp = require('child_process');
// const n = cp.fork('nrm ls');
let exec = cp.exec;
// 成功的例子
let devSvr = exec('cd vue&npm run dev', function (error, stdout, stderr) {
    if (error) {
        console.error('error: ' + error);
        return;
    }
    console.log(stdout);
});

devSvr.stdout.on('data', function (msg) {
    console.log(msg);
})

devSvr.on('exit', function () {
    console.log('exit devSvr');
});

process.on('exit', function () {
    console.log('已退出');
    devSvr.exit();
})

process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    if (chunk === 'exit\r\n') {

        process.exit();
    }
    else {
        if (chunk !== null) console.log('命令错误');
    }
});