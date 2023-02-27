function prototypeProperties(destClass, propObj) {
  Object.keys(propObj).forEach(function(name) {
    destClass.prototype[name] = propObj[name];
  });
}

export default prototypeProperties