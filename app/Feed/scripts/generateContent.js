window.onload = function() {
  var content = ['abc', '123', 'strings galore']

  var makeDIVS = function(array) {
    var list = document.createElement('div');

    for (var i = 0; i < array.length; i++) {
      var item = document.createElement('div');
      // item.classname = 'container-fluid';
      item.appendChild(document.createTextNode(array[i]));
      list.appendChild(item);
    }
    return list;
  }
  document.appendElementById('feed').appendChild(makeDIVS(content));
}
