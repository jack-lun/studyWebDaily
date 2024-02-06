const fs = require('fs');

const preNumberObj = {};
for (let i = 1; i <= 35; i++) {
    const num = i < 10 ? ('0' + i) : (i + '');
    preNumberObj[num] = 0;
}
console.log(preNumberObj);

const nextNumberObj = {};
for (let i = 1; i <= 12; i++) {
    const num = i < 10 ? ('0' + i) : (i + '');
    nextNumberObj[num] = 0;
}
console.log('nextNumberObj', nextNumberObj);

// 读取JSON文件
fs.readFile('E:\\前端学习\\studyWebDaily\\vue_study\\daletou.json', 'utf8', (err, data) => {
    if (err) {
        console.error('读取文件时发生错误:', err);
        return;
    }

    // 解析JSON数据
    try {
        const jsonData = JSON.parse(data);
        const { list = [] } = jsonData.value;
        const result = list.map(item => item.lotteryDrawResult);
        result.forEach(item => {
            const tempPre = item.split(' ').slice(0, 5);
            const tempNext = item.split(' ').slice(5);
            tempPre.forEach(key => {
                preNumberObj[key] += 1;
            });
            tempNext.forEach(key => {
                nextNumberObj[key] += 1;
            })
        });

    } catch (parseError) {
        console.error('解析JSON时发生错误:', parseError);
    }
});