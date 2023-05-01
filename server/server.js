const apiServ = require('./pres/apiPres');
//const consolePres = require('./pres/consolePres');
const port = 3001;

function main(){
  //pour lancer l'api 
  apiServ.start(port);

  //pour lancer la pres console
  //consolePres.start();

}

main();