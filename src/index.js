module.exports = function check(str, bracketsConfig) {
  let tempStr = str;

  let deleted = true;
  while (deleted) {
    deleted = false;
    for(let i = 0, confLen = bracketsConfig.length; i < confLen; i++){
      const doubleBrackets = bracketsConfig[i].join('');
      if( ~tempStr.indexOf(doubleBrackets) ) {
        tempStr = tempStr.replace(doubleBrackets, '' );
        deleted = true;
      }
    }
  }

  return tempStr === '';
}