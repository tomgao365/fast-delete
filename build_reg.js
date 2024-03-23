const path = require('path');
const fs = require('fs-extra');
const iconv = require('iconv-lite');

const installPath = path.resolve(__dirname, 'build/install.reg');
const installClosePath = path.resolve(__dirname, 'build/install-close.reg');
const uninstallPath = path.resolve(__dirname, 'build/uninstall.reg');

function getInstallReg(canClose = false) {
  const option = canClose ? '/c' : '/k';
  const cmd = `cmd.exe ${option} node ${__dirname.replace(/\\/g, '\\\\')} \\"%V\\"`;
  return `Windows Registry Editor Version 5.00

  [HKEY_CLASSES_ROOT\\*\\shell\\FastDelete]
  @="快速删除"

  [HKEY_CLASSES_ROOT\\*\\shell\\FastDelete\\command]
  @="${cmd}"

  [HKEY_CLASSES_ROOT\\Folder\\shell\\FastDelete]
  @="快速删除"

  [HKEY_CLASSES_ROOT\\Folder\\shell\\FastDelete\\command]
  @="${cmd}"`;
}

function getUninstallReg() {
  return `Windows Registry Editor Version 5.00

  [-HKEY_CLASSES_ROOT\\Folder\\shell\\FastDelete]
  [-HKEY_CLASSES_ROOT\\Folder\\shell\\FastDelete\\command]`
}

fs.outputFileSync(installPath, iconv.encode(getInstallReg(), 'GBK'));
fs.outputFileSync(installClosePath, iconv.encode(getInstallReg(true), 'GBK'));
fs.outputFileSync(uninstallPath, iconv.encode(getUninstallReg(), 'GBK'));
