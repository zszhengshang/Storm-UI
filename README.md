- build 负责打包的文件夹 gulp 编译 ts 打包样式、工具方法和单文件组件
- dist 最终打包出来的结果
- packages 组件代码 monorepo
- play 调试代码用的
- typings 放类型声明文件
- .npmrc 配置允许幽灵依赖

## packages

components 存放所有组件 最终通过 index.ts 导出所有组件
theme-chalk BEM 样式
utils 工具方法

## build 打包模块 gulp 来控制流程

## dist es/common 两种规范

最终发布的就是 dist

## storm-ui 是组件库整合入口
