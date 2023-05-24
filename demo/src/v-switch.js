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

function toggleDefaultElement(binding, vnode, { show }) {
  const children = vnode.children
  for (let node of children) {
    if (node.data) { 
      if (containsDefault(node.data.directives)) {
        const display = show 
        ? node.elm.getAttribute("data-initial-display")
        : "none"
        node.elm.style.display = display
      }
    }
  }
}

function revealElementWithInitialDisplay(element) {
  const initialDisplay = element.getAttribute("data-initial-display")
  element.style.display = initialDisplay !== "none" 
    ? initialDisplay 
    : "block"
}

function processSwitch(el, binding, vnode, data) {
  let matched = false
  const children = vnode.children
  console.log(555,children)
  for (let node of children) {
    if (node.data) {
      const caseDirective = containsCase(node.data.directives, "case")
      if (caseDirective) {
        //TODO
        if (caseDirective.value.includes(data[binding.expression]) ) {
          revealElementWithInitialDisplay(node.elm)
          toggleDefaultElement(binding, vnode, { show: false })
          matched = true
        } else {
          node.elm.style.display = "none"
        }
      }
    }
  }

  if (!matched) {
    toggleDefaultElement(binding, vnode, { show: true })
  }
}

function saveInitialDsplayToDataAttr(elements) {
  for (let child of elements) {
    child.setAttribute("data-initial-display", child.style.display)
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
    saveInitialDsplayToDataAttr(el.children)
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

