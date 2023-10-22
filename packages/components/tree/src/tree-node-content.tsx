import { defineComponent, h, inject } from "vue";
import { treeNodeContentProps } from "./tree-node";
import { createNamespace } from "@storm/utils";
import { treeContextKey } from "./tree";

export default defineComponent({
  name: 'STreeNodeContent',
  props: treeNodeContentProps,
  setup(props) {
    const bem = createNamespace('tree')
    const tree = inject(treeContextKey, undefined)
    return () => {
      const node = props.node
      // 可能需要使用tree组件传递过来的插槽渲染
      return tree?.ctx?.slots.default ? tree.ctx.slots.default(node)
        : h('span', { class: bem.be('node', 'label') }, [node.label])
    }
  },
})