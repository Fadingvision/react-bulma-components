// type checking
const is = {
  string: s => typeof s === 'string',
  function: s => s instanceof Function,
  object: s => Object.prototype.toString.call(s) === '[object Object]',
  node: s => s.nodeType > 0, // eslint-disable-line
  array: s => Array.isArray(s),
  number: s => typeof s === 'number',
  // only works in modern browser such as IE9+, chrome, firefox etc.
  nodeList: s => s instanceof NodeList || s instanceof HTMLCollection,
  empty: s => s === null || typeof s === 'undefined' || s === ''
};

export default is;
