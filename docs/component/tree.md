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
