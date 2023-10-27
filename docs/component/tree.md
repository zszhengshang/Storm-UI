# Tree 树形控件

用清晰的层级结构展示信息，可展开或折叠。

## 基础用法

基础的树形结构展示

```vue preview
<template>
	<s-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></s-tree>
</template>
<script setup>
const handleNodeClick = data => {
	console.log(data)
}
const data = [
	{
		label: "Level one 1",
		children: [
			{
				label: "Level two 1-1",
				children: [
					{
						label: "Level three 1-1-1"
					}
				]
			}
		]
	},
	{
		label: "Level one 2",
		children: [
			{
				label: "Level two 2-1",
				children: [
					{
						label: "Level three 2-1-1"
					}
				]
			},
			{
				label: "Level two 2-2",
				children: [
					{
						label: "Level three 2-2-1"
					}
				]
			}
		]
	},
	{
		label: "Level one 3",
		children: [
			{
				label: "Level two 3-1",
				children: [
					{
						label: "Level three 3-1-1"
					}
				]
			},
			{
				label: "Level two 3-2",
				children: [
					{
						label: "Level three 3-2-1"
					}
				]
			}
		]
	}
]

const defaultProps = {
	children: "children",
	label: "label",
	value: "label"
}
</script>
```

## 可选择

适用于需要选择层级时使用。

```vue preview
<template>
	<s-tree :data="data" :props="defaultProps" show-checkbox @check-change="handleCheckChange"></s-tree>
</template>
<script setup>
const handleCheckChange = (data, checked) => {
	console.log(data, checked)
}
const data = [
	{
		label: "Level one 1",
		children: [
			{
				label: "Level two 1-1",
				children: [
					{
						label: "Level three 1-1-1"
					}
				]
			}
		]
	},
	{
		label: "Level one 2",
		children: [
			{
				label: "Level two 2-1",
				children: [
					{
						label: "Level three 2-1-1"
					}
				]
			},
			{
				label: "Level two 2-2",
				children: [
					{
						label: "Level three 2-2-1"
					}
				]
			}
		]
	},
	{
		label: "Level one 3",
		children: [
			{
				label: "Level two 3-1",
				children: [
					{
						label: "Level three 3-1-1"
					}
				]
			},
			{
				label: "Level two 3-2",
				children: [
					{
						label: "Level three 3-2-1"
					}
				]
			}
		]
	}
]

const defaultProps = {
	children: "children",
	label: "label",
	value: "label"
}
</script>
```

## 懒加载自定义叶子节点

由于在点击节点时才进行该层数据的获取，默认情况下 Tree 无法预知某个节点是否为叶子节点， 所以会为每个节点添加一个下拉按钮，如果节点没有下层数据，则点击后下拉按钮会消失。 同时，你也可以提前告知 Tree 某个节点是否为叶子节点，从而避免在叶子节点前渲染下拉按钮。

```vue preview
<template>
	<s-tree :data="data" :load="loadNode" lazy show-checkbox />
</template>
<script setup>
const data = [
	{
		id: 1,
		label: "region"
	}
]

const loadNode = (node, resolve) => {
	let id = 1
	if (node.level > 0) return resolve([])

	setTimeout(() => {
		const data = [
			{
				label: "leaf",
				id: ++id,
				isLeaf: true
			},
			{
				id: ++id,
				label: "zone"
			}
		]

		resolve(data)
	}, 500)
}
</script>
```

## 禁用复选框

节点的复选框可以设置为禁用。

```vue preview
<template>
	<s-tree :data="data" show-checkbox />
</template>
<script setup>
const data = [
	{
		id: 1,
		label: "Level one 1",
		children: [
			{
				id: 3,
				label: "Level two 2-1",
				children: [
					{
						id: 4,
						label: "Level three 3-1-1"
					},
					{
						id: 5,
						label: "Level three 3-1-2",
						disabled: true
					}
				]
			},
			{
				id: 2,
				label: "Level two 2-2",
				disabled: true,
				children: [
					{
						id: 6,
						label: "Level three 3-2-1"
					},
					{
						id: 7,
						label: "Level three 3-2-2",
						disabled: true
					}
				]
			}
		]
	}
]
</script>
```

## 默认展开以及默认选中

树节点可以在初始化阶段被设置为展开和选中。

分别通过 default-expanded-keys 和 default-checked-keys 设置默认展开和默认选中的节点。

```vue preview
<template>
	<s-tree :data="data" show-checkbox :default-expanded-keys="[2, 3]" :default-checked-keys="[5]" />
</template>
<script setup>
const data = [
	{
		id: 1,
		label: "Level one 1",
		children: [
			{
				id: 4,
				label: "Level two 1-1",
				children: [
					{
						id: 9,
						label: "Level three 1-1-1"
					},
					{
						id: 10,
						label: "Level three 1-1-2"
					}
				]
			}
		]
	},
	{
		id: 2,
		label: "Level one 2",
		children: [
			{
				id: 5,
				label: "Level two 2-1"
			},
			{
				id: 6,
				label: "Level two 2-2"
			}
		]
	},
	{
		id: 3,
		label: "Level one 3",
		children: [
			{
				id: 7,
				label: "Level two 3-1"
			},
			{
				id: 8,
				label: "Level two 3-2"
			}
		]
	}
]
</script>
```

## 树节点的选择

本例展示如何获取和设置选中节点。 获取和设置各有两种方式：通过 node 或通过 key。

```vue preview
<template>
	<s-tree ref="treeRef" :data="data" show-checkbox />
	<s-button @click="getCheckedNodes">get by node</s-button>
	<s-button @click="getCheckedKeys">get by key</s-button>
	<s-button @click="setCheckedKeys">set by keys</s-button>
	<s-button @click="setChecked">set by key</s-button>
</template>
<script setup>
import { ref } from "vue"
const treeRef = ref()
const getCheckedNodes = () => {
	const nodes = treeRef.value.getCheckedNodes()
	console.log(nodes)
}
const getCheckedKeys = () => {
	const keys = treeRef.value.getCheckedKeys()
	console.log(keys)
}
const setCheckedKeys = () => {
	treeRef.value.setCheckedKeys([1, 3])
}
const setChecked = () => {
	treeRef.value.setChecked(1, false)
	treeRef.value.setChecked(3, false)
	treeRef.value.setChecked(2, true)
}
const data = [
	{
		id: 1,
		label: "Level one 1",
		children: [
			{
				id: 4,
				label: "Level two 1-1",
				children: [
					{
						id: 9,
						label: "Level three 1-1-1"
					},
					{
						id: 10,
						label: "Level three 1-1-2"
					}
				]
			}
		]
	},
	{
		id: 2,
		label: "Level one 2",
		children: [
			{
				id: 5,
				label: "Level two 2-1"
			},
			{
				id: 6,
				label: "Level two 2-2"
			}
		]
	},
	{
		id: 3,
		label: "Level one 3",
		children: [
			{
				id: 7,
				label: "Level two 3-1"
			},
			{
				id: 8,
				label: "Level two 3-2"
			}
		]
	}
]
</script>
```

## 自定义节点内容

节点的内容支持自定义，可以在节点区添加按钮或图标等内容

```vue preview
<template>
	<s-tree :data="data" show-checkbox :default-expanded-keys="[1, 2, 3, 4]">
		<template #default="node"> 自定义的节点 + {{ node.label }} </template>
	</s-tree>
</template>
<script setup>
const data = [
	{
		id: 1,
		label: "Level one 1",
		children: [
			{
				id: 4,
				label: "Level two 1-1",
				children: [
					{
						id: 9,
						label: "Level three 1-1-1"
					},
					{
						id: 10,
						label: "Level three 1-1-2"
					}
				]
			}
		]
	},
	{
		id: 2,
		label: "Level one 2",
		children: [
			{
				id: 5,
				label: "Level two 2-1"
			},
			{
				id: 6,
				label: "Level two 2-2"
			}
		]
	},
	{
		id: 3,
		label: "Level one 3",
		children: [
			{
				id: 7,
				label: "Level two 3-1"
			},
			{
				id: 8,
				label: "Level two 3-2"
			}
		]
	}
]
</script>
```

## 树节点过滤

树节点是可以被过滤的

调用 Tree 实例对象的 `filter` 方法来过滤树节点。 方法的参数就是过滤关键字。 需要注意的是，此时需要设置 `filter-node-method` 属性，其值为过滤函数。

```vue preview
<template>
	<s-input v-model="filterText" placeholder="Filter keyword" />
	<s-tree ref="treeRef" :data="data" show-checkbox :filter-method="filterNode" />
</template>
<script setup>
import { ref, watch } from "vue"
const treeRef = ref()
const filterText = ref("")

watch(filterText, val => {
	treeRef.value.filter(val)
})

const filterNode = (value, data) => {
	if (!value) return true
	return data.label.includes(value)
}

const data = [
	{
		id: 1,
		label: "Level one 1",
		children: [
			{
				id: 4,
				label: "Level two 1-1",
				children: [
					{
						id: 9,
						label: "Level three 1-1-1"
					},
					{
						id: 10,
						label: "Level three 1-1-2"
					}
				]
			}
		]
	},
	{
		id: 2,
		label: "Level one 2",
		children: [
			{
				id: 5,
				label: "Level two 2-1"
			},
			{
				id: 6,
				label: "Level two 2-2"
			}
		]
	},
	{
		id: 3,
		label: "Level one 3",
		children: [
			{
				id: 7,
				label: "Level two 3-1"
			},
			{
				id: 8,
				label: "Level two 3-2"
			}
		]
	}
]
</script>
```

## Tree API

### Attributes

| 属性名                | 说明                                                                                       | 类型                    | 默认值   |
| :-------------------- | :----------------------------------------------------------------------------------------- | :---------------------- | -------- |
| data                  | 展示数据                                                                                   | `array`                 | --       |
| empty-text            | 内容为空的时候展示的文本                                                                   | `string`                | 暂无数据 |
| props                 | 配置选项，具体看下表                                                                       | `object`                | --       |
| default-expanded-keys | 默认展开的节点的 key 的数组                                                                | `array`                 | --       |
| show-checkbox         | 节点是否可被选择                                                                           | `boolean`               | false    |
| default-checked-keys  | 默认勾选的节点的 key 的数组                                                                | `array`                 | --       |
| filter-method         | 对树节点进行筛选时执行的方法，返回 `true` 这个节点可以显示， 返回 `false` 这个节点会被隐藏 | `Function(value, data)` | --       |
| indent                | 相邻级节点间的水平缩进，单位为像素                                                         | `number`                | 16       |

### props

| 属性名   | 说明                                                     | 类型                | 默认值   |
| :------- | :------------------------------------------------------- | :------------------ | -------- |
| value    | 每个树节点用来作为唯一标识的属性，在整棵树中应该是唯一的 | `string` / `number` | id       |
| label    | 指定节点标签为节点对象的某个属性值                       | `string`            | label    |
| children | 指定子树为节点对象的某个属性值                           | `string`            | children |
| disabled | 指定节点选择框是否禁用为节点对象的某个属性值             | `string`            | disabled |

### Exposes

| 属性名              | 说明                                                                                                   | 参数                               |
| :------------------ | :----------------------------------------------------------------------------------------------------- | :--------------------------------- |
| filter              | 对树节点进行筛选操作                                                                                   | `(query: string)`                  |
| getCheckedNodes     | `show-checkbox`为 `true`，则返回目前被选中的节点所组成的数组                                           | `(leafOnly: boolean)`              |
| getCheckedKeys      | `show-checkbox`为 `true`，则返回目前被选中的节点的 key 所组成的数组                                    | `(leafOnly: boolean)`              |
| setCheckedKeys      | 通过 keys 设置目前勾选的节点                                                                           | `(keys: TreeKey[])`                |
| setChecked          | 通过 key 设置某个节点的勾选状态                                                                        | `(key: TreeKey, checked: boolean)` |
| setExpandedKeys     | 设置当前展开的节点                                                                                     | `(keys: TreeKey[])`                |
| getHalfCheckedNodes | `show-checkbox`为 `true`，则返回当前半选中的节点组成的数组                                             | --                                 |
| getHalfCheckedKeys  | `show-checkbox`为 `true`，则返回目前半选中的节点的 key 所组成的数组                                    | --                                 |
| getNode             | 通过 key 或 data 获取节点                                                                              | `(data: TreeKey \| TreeNodeData)`  |
| expandNode          | 展开指定节点                                                                                           | `(node: TreeNode)`                 |
| collapseNode        | 折叠指定节点                                                                                           | `(node: TreeNode)`                 |
| setData             | 当数据量非常庞大的时候，总是使用响应式数据将导致性能表现不佳，所以提供一种显式设置的方式来避免此种情况 | `(data: TreeData)`                 |

### Events

| 属性名        | 说明                         | 参数                                                  |
| :------------ | :--------------------------- | :---------------------------------------------------- |
| node-click    | 当节点被点击的时候触发       | `(data: TreeNodeData, node: TreeNode, e: MouseEvent)` |
| check-change  | 节点选中状态发生变化时的回调 | `(data: TreeNodeData, checked: boolean)`              |
| node-expand   | 节点被展开时触发的事件       | `(data: TreeNodeData, node: TreeNode)`                |
| node-collapse | 节点被收起时触发的事件       | `(data: TreeNodeData, node: TreeNode)`                |

### Slots

| 属性名  | 说明                                   |
| :------ | :------------------------------------- |
| default | 自定义树节点的内容。 作用域参数为 node |
