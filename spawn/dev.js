const cp = require('child_process');
let exec = cp.exec;

var devSvr = exec('cd ' + __dirname + '/../vue&&npm run devVue', function (error, stdout, stderr) {
    if (error) {
        console.error('error: ' + error);
        return;
    }
    console.log(stdout);
});
devSvr.stdout.on('data', function (msg) {
    console.log(msg);
})
devSvr.stderr.on('data', function (msg) {
    console.log(msg);
})
devSvr.on('exit', function () {
    console.log('exit devSvr');
});

// let ele = exec('./node_modules/.bin/electron . --dev', function (error, stdout, stderr) {
//     if (error) {
//         console.error('error: ' + error);
//         return;
//     }
//     console.log(stdout);
// });
// ele.stdout.on('data', function (msg) {
//     console.log(msg);
// })
// ele.on('exit', function () {
//     console.log('exit ele');
// });

process.on('exit', function () {
    console.log('已退出');
    // devSvr.kill('SIGHUP');
    // devSvr._events.exit();
})
process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    if (chunk === 'exit\r\n') {
        devSvr.exit();
        process.exit();
    }
    else {
        if (chunk !== null) console.log('命令错误');
    }
});