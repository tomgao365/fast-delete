const path = require('path');
const fs = require('fs-extra');
const iconv = require('iconv-lite');

const installPath = path.resolve(__dirname, '../build/install.reg');
const installClosePath = path.resolve(__dirname, '../build/install-close.reg');
const uninstallPath = path.resolve(__dirname, '../build/uninstall.reg');

const installReg = `Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\\Folder\\shell\\FastDelete]
@="快速删除"

[HKEY_CLASSES_ROOT\\Folder\\shell\\FastDelete\\command]
@="cmd.exe /k node ${__dirname.replace(/\\/g, '\\\\')} \\"%V\\" "`;

const installCloseReg = `Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\\Folder\\shell\\FastDelete]
@="快速删除"

[HKEY_CLASSES_ROOT\\Folder\\shell\\FastDelete\\command]
@="cmd.exe /c node ${__dirname.replace(/\\/g, '\\\\')} \\"%V\\" "`;

const uninstallReg = `Windows Registry Editor Version 5.00

[-HKEY_CLASSES_ROOT\\Folder\\shell\\FastDelete]
[-HKEY_CLASSES_ROOT\\Folder\\shell\\FastDelete\\command]`;

fs.outputFileSync(installPath, iconv.encode(installReg, 'GBK'));
fs.outputFileSync(installClosePath, iconv.encode(installCloseReg, 'GBK'));
fs.outputFileSync(uninstallPath, iconv.encode(uninstallReg, 'GBK'));
