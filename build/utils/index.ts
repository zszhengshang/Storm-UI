import { TaskFunction } from 'gulp'
import { spawn } from 'child_process'
import chalk from 'chalk'
import consola from 'consola'
import { projectRoot } from './paths'

export const withTaskName = <T extends TaskFunction>(name: string, fn: T) =>
  Object.assign(fn, { displayName: name })

// 在node使用子进程运行脚本
export const run = async (command: string) => {
  // rm -rf
  return new Promise(resolve => {
    const [cmd, ...args] = command.split(' ')
    consola.info(`run: ${chalk.green(`${cmd} ${args.join(' ')}`)}`)

    const app = spawn(cmd, args, {
      cwd: projectRoot, // 在根目录执行
      stdio: 'inherit', // 将子进程的输出共享给父进程
      shell: process.platform === 'win32', // linux和mac本身支持rm -rf
    })
    app.on('close', resolve)
  })
}

export const excludeFiles = (files: string[]) => {
  const excludes = ['node_modules', 'gulpfile', 'dist']
  return files.filter(
    (path) => !excludes.some((exclude) => path.includes(exclude))
  )
}