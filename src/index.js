module.exports = function check(str, bracketsConfig) {
  var split = str.split('');

  if(split.length % 2 != 0) return false;

  var stack = [];

  // Вернёт тип и вид скобки - [0, 1] - Первый вид, закрывающая скобка
  function getBracketIndex(bracket){
    for( var i = 0; i < bracketsConfig.length; i++){
      if( bracketsConfig[i].indexOf(bracket) == - 1) continue;
      return [i, bracketsConfig[i].indexOf(bracket)];
    }
  }

  for(var i = 0; i < split.length; i++){

    var bracket = getBracketIndex(split[i]);

    if(bracket[1] == 0){ //Если скобка открывается   

      // Отк. и закр. скобки одинаковы?
      if( bracketsConfig[ bracket[0] ][0] == 
        bracketsConfig[ bracket[0] ][1]) {

          //Тогда проверим есть ли уже такая скобка
          //Если уже есть такая скобка - то закр

          //Поиск скобки в стеке
          var index = -1;
          for(var j = 0; j < stack.length; j++){
            if( stack[j][0] == bracket[0] && 
              stack[j][1] == bracket[1]){
              index = j;
              break;
            }
          }

          if( index != -1 ){
            //значит скобка закр.
            if( stack[ stack.length - 1 ][1] == 0 && // последняя добавленная скобка открывающаяся?
              stack[ stack.length - 1 ][0] == bracket[0]  ){ // такого же типа?
              stack.pop();
            } else {
              return false;
            }
          } else {
            stack.push( bracket )
          }
      } else {
        stack.push( bracket )
      }

    } else {
      if( stack.length > 0 && // не просто закрывающая скобка?
        stack[ stack.length - 1 ][1] == 0 && // последняя добавленная скобка открывающаяся?
        stack[ stack.length - 1 ][0] == bracket[0]  ){ // такого же типа?
        stack.pop();
      } else {
        return false;
      }
    }
  }

  if(stack.length != 0) return false;

  return true;
}