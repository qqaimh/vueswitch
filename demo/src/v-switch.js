const _data = {}

function setValues(data, binding) {
  data[binding.expression] = binding.value
}

export function containsDirective(arr = [], directive) {
  for (let a in arr) {
    if (arr[a].name === directive)
      return arr[a]
  }
  return false
}

const containsCase = 
  (arr = []) => containsDirective(arr, "case")

const containsDefault = 
  (arr = []) => containsDirective(arr, "default")

function hideDefaultElement(vnode) {
  const children = vnode.children
  for (let node of children) {
    if (node.data) { 
      if (containsDefault(node.data.directives)) {
        createCommentToHide(node);
      }
    }
  }
}

function createCommentToHide(vnode) {
  // 创建一个注释元素
  const comment = document.createComment(' ');
  // 设置value值
  Object.defineProperty(comment, 'setAttribute', {
    value: () => undefined,
  });
  const orginElm = vnode.elm;
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
  if (orginElm.parentNode) {
    // 从 DOM 树中删除 node 节点，除非它已经被删除了。
    orginElm.parentNode.replaceChild(comment, orginElm);
  }
}

function processSwitch(el, binding, vnode, data) {
  let matched = false
  const children = vnode.children
  console.log(555,children)
  for (let node of children) {
    if (node.data) {
      const caseDirective = containsCase(node.data.directives, "case")
      if (caseDirective) {
        if (!caseDirective.value.includes(data[binding.expression]) ) {
          createCommentToHide(node)     
        } else {
          matched = true
          hideDefaultElement(vnode)
        }
      }
    }
  }
}

const vSwitch = {
  bind(el, binding) {
    console.log(1111, binding)
    setValues(_data, binding)
    console.log('1111After', _data)
  },

  inserted(el, binding, vnode) {
    console.log(2222,el,  binding, el.children)
    processSwitch(el, binding, vnode, _data)
    console.log('2222After',_data)
  },

  update(el, binding) {
    console.log(333,binding)
    setValues(_data, binding)
    console.log('333After',_data)
  },

  componentUpdated(el, binding, vnode) {
    console.log(4444,el, binding, vnode, _data)
    processSwitch(el, binding, vnode, _data)
    console.log('4444After',_data)
  }
}

const vCase = () => {}

const vDefault = () => {}

export { vSwitch, vCase, vDefault }

export default {
  install(Vue, options) {
    Vue.directive('switch', vSwitch)
    Vue.directive('case', vCase)
    Vue.directive('default', vDefault)
  }
}

