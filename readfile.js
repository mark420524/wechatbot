const fs=require('fs');
const readline=require('readline');
var readFile=function (filename,callback){
	let fileRead=fs.createReadStream(filename);
	let contentReadLine=readline.createInterface({input:fileRead});
	let arr = new Array();
	contentReadLine.on('line',function(line){
		arr.push(line);
	});
	contentReadLine.on('close',function(){
		callback(arr);
	});
}

var readcb=function(arr){
	 
    console.log('读取文件完成');
	 
}
var randomNum=function (minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
}
let filename="poemall.txt";
//readFile(filename,readcb)
exports.readFile=readFile;
//@09ef688f5f02d88c81514da77466801237d46ce287c1f371256ad14e01f7b078