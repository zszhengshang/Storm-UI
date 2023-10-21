import { makeInstaller } from './make-installer'
import Components from './components'
// 生成所有组件的install方法
export default makeInstaller(Components)