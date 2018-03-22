const fs = require('fs-extra');

const [, , ...args] = process.argv;
if (args.length === 0) {
  console.log('请输入要删除出的文件夹路径');
  return;
}

try {
  console.log('被删除文件夹路径如下：');
  const startData = new Date();
  args.forEach((file) => {
    console.log(`  ${file}`);
    fs.removeSync(file);
  });
  const endData = new Date();
  console.log(`删除工作完成，耗时${(endData.getTime()-startData.getTime())/1000}秒`);
} catch (error) {
  console.log(error.message || '删除失败！');
}
