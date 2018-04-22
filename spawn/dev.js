const cp = require('child_process');
let exec = cp.exec;

let devSvr = exec('cd ' + __dirname + '\\..\\vue&npm run dev', function (error, stdout, stderr) {
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

let ele = exec('cd ' + __dirname + '\\..&electron . --dev', function (error, stdout, stderr) {
    if (error) {
        console.error('error: ' + error);
        return;
    }
    console.log(stdout);
});
ele.stdout.on('data', function (msg) {
    console.log(msg);
})
ele.on('exit', function () {
    console.log('exit ele');
});

process.on('exit', function () {
    console.log('已退出');
    devSvr.exit();
    ele.exit();
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