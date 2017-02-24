function gup(name) {
  name = name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
  var regexS = "[\?&;]"+name+"=([^&#;]*)"; // added semicolons for DART
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if(results == null) { return ''; }
  else { return results[1]; }
}