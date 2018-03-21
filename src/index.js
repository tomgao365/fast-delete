const fs = require('fs-extra');

const [, , ...args] = process.argv;
if (args.length === 0) {
  console.log('请输入要删除出的文件夹路径');
  return;
}

try {
  console.log('被删除文件夹路径如下：');
  args.forEach((file) => {
    console.log(`  ${file}`);
    fs.removeSync(file);
  });
  console.log('删除工作完成');
} catch (error) {
  console.log(error.message || '删除失败！');
}
