const { rimraf } = require("rimraf");
const ora = require("ora");

const [, , ...args] = process.argv;
if (args.length === 0) {
  console.log("请输入要删除出的文件夹路径");
  return;
}

console.log(`共计 ${args.length} 个删除选项`);
Promise.all(
  args.map(
    (file) =>
      new Promise(async (resolve, reject) => {
        const startData = new Date();
        const spinner = ora(`${file} 删除中...`).start();

        await rimraf(file, {
          maxBusyTries: 20,
        })
          .then(() => {
            spinner.succeed(
              `${file} 删除完成，耗时${
                (new Date().getTime() - startData.getTime()) / 1000
              }秒`
            );
            resolve();
          })
          .catch((error) => {
            spinner.fail(`${file} 删除失败: ${error.message}`);
            resolve();
          });
      })
  )
)
  .then(() => {
    console.log("全部删除完成！");
  })
  .catch((error) => {
    console.log(error.message || "删除失败！");
  });
