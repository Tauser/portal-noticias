function element(elem) {
  printElement(document.getElementById(elem));
}

function printElement(elem) {
  var domClone = elem.cloneNode(true);
  
  var $printSection = document.getElementById('printSection');
  
  if (!$printSection) {
      $printSection = document.createElement('div');
      $printSection.id = 'printSection';
      document.body.appendChild($printSection);
  }
  
  $printSection.innerHTML = '';
  $printSection.appendChild(domClone);
  window.print($printSection);
}