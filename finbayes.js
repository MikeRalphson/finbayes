var classifier = require('classifier');
var bayes = new classifier.Bayesian();
 
bayes.train("The market has been unexpectedly turbulent", 'bear');
bayes.train("Results have outperformed expectations", 'bull');
 
var category = bayes.classify("in turbulent trading");   // "bear"
console.log(category);

var category = bayes.classify("results in line with expectations");   // "bull"
console.log(category);
