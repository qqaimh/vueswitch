export default {
	install: (Vue) => {
		Vue.directive('myIf', // 下面每个方法都是一个钩子函数
			// el代表 当前绑定的dom元素
			(el, binding, vnode) => {
				// 判断传过来的值是为true 如果是false取反不显示
				if (!(binding.value)) {
					// 创建一个注释元素
					const comment = document.createComment(' ');
					// 设置value值
					Object.defineProperty(comment, 'setAttribute', {
						value: () => undefined,
			      });
					// 用注释节点替换 当前页面元素  
					vnode.elm = comment;
                    // 下面作为初始化操作 赋值为空
					vnode.text = ' ';
					vnode.isComment = true;
					vnode.context = undefined;
					vnode.tag = undefined;
					vnode.data.directives = undefined;
 
					// 判断当前元素是否是组件  如果是组件的话也替换成 注释元素
					if (vnode.componentInstance) {
						vnode.componentInstance.$el = comment;
					}
 
					// 判断当前元素是否是文档节点或者是文档碎片节点 
					if (el.parentNode) {
						// 从 DOM 树中删除 node 节点，除非它已经被删除了。
						el.parentNode.replaceChild(comment, el);
					}
				}
				console.log('bind:只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。')
			})
	}
}