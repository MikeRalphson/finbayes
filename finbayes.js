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

var fs = require('fs');
var natural = require('natural');

var bayes = new natural.BayesClassifier();

var filename;
var classification;
var data;

if (process.argv.length>2) {
	filename = process.argv[2];
	data = fs.readFileSync(filename,'utf8');

	natural.BayesClassifier.load('classifier.json', null, function(err, classifier) {
		bayes = classifier;
		if (process.argv.length>3) {
			classification = process.argv[3];
			bayes.addDocument(data,classification);
			bayes.train();
			bayes.save('classifier.json', function(err, bayes) {
				// the classifier is saved to the classifier.json file
			});
		}
		else {
			console.log('Classification: '+bayes.classify(data));
		}
	});
}
else {
	console.log('Usage: '+process.argv[1]+' filename [classification]');
}