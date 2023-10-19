import { spawn } from 'child_process'
import chalk from 'chalk'
import consola from 'consola'
import { projectRoot } from './paths'

// 在node使用子进程运行脚本
export const run = async (command: string, cwd: string = projectRoot) => {
  return new Promise(resolve => {
    const [cmd, ...args] = command.split(' ')
    consola.info(`run: ${chalk.green(`${cmd} ${args.join(' ')}`)}`)

    const app = spawn(cmd, args, {
      cwd, // 执行目录
      stdio: 'inherit', // 将子进程的输出共享给父进程
      shell: process.platform === 'win32', // linux和mac本身支持rm -rf
    })
    app.on('close', resolve)
  })
}