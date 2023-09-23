import { TaskFunction } from "gulp"
import { spawn } from 'child_process'
import { projectRoot } from "./paths"

export const withTaskName = <T extends TaskFunction>(name: string, fn: T) =>
  Object.assign(fn, { displayName: name })
// 在node中使用子进程来运行脚本
export const run = async (command: string, cwd: string = projectRoot) => {
  //rm -rf
  return new Promise(resolve => {
    const [cmd, ...args] = command.split(' ')
    // 开启子进程
    const app = spawn(cmd, args, {
      cwd, // 执行目录
      stdio: 'inherit', // 直接将子进程的输出共享给父进程
      shell: process.platform === 'win32', // 默认情况linux才支持rm -rf （windows里安装了git bash可以调用）
    })
    // 执行完成后调用成功
    app.on('close', resolve)
  })
}