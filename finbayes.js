// retrieve example documents from 
// http://www.investegate.co.uk/ArticlePrint.aspx?id=201511201730025235G

// uk share price info from
//http://www.google.com/finance/info?q=NASDAQ%3aGOOG
//https://www.google.co.uk/finance/info?q=UKX%3aRBS

// [ { "id": "14323395" ,"t" : "RBS" ,"e" : "LON" ,"l" : "311.35" ,"l_fix" : "311.35" ,"l_cur" : "GBX311.35" ,"s": "0" ,
//"ltt":"4:50p.m. GMT" ,"lt" : "Nov 20, 4:50p.m. GMT" ,"lt_dts" : "2015-11-20T16:50:39Z" ,"c" : "-3.85" ,"c_fix" : "-3.85" ,
//"cp" : "-1.22" ,"cp_fix" : "-1.22" ,"ccol" : "chr" ,"pcls_fix" : "315.2" } ]

// 1. Test text
// 2. Obtain current share price
// 3. Obtain closing share price
// 4. Retrain text

//var readline = require('readline');

//persistent localstorage https://www.npmjs.com/package/node-localstorage
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./localStorage');

var classifier = require('classifier'); //https://www.npmjs.com/package/classifier

var bayes = new classifier.Bayesian({
  backend: {
    type: 'LocalStorage',
    options: {
      //hostname: 'localhost', // default 
      //port: 6379,            // default 
      name: 'finbayes'      // namespace for persisting 
    }
  }
});

var state = localStorage.getItem('classifierState');
if (state) bayes.fromJSON(state);

bayes.train("The market has been unexpectedly turbulent", 'bear');
bayes.train("Results have outperformed market expectations", 'bull');
 
var category = bayes.classify("in turbulent trading");   // "bear"
console.log(category);

var category = bayes.classify("results in line with expectations");   // "bull"
console.log(category);

localStorage.setItem('classifierState',JSON.stringify(bayes.toJSON(), null, 2));

//var rl = readline.createInterface({
//  input: process.stdin,
//  output: process.stdout
//});

//console.log('Last time you typed: '+localStorage.getItem('closingMessage'));
//rl.question("Press enter to exit", function(answer) {
//  //console.log("Thank you for your valuable feedback:", answer);
//  localStorage.setItem('closingMessage', answer);
//  rl.close();
//});
