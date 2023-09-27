import { makeInstaller } from './make-installer'
import Components from './components'
// 导出的其实就是install方法
export default makeInstaller(Components)