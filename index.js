/**
 * Wechaty - WeChat Bot SDK for Personal Account, Powered by TypeScript, Docker, and 💖
 *  - https://github.com/chatie/wechaty
 */
const { Wechaty } = require('wechaty')
const readFile = require('./readfile');
const filename="poemall.txt";
const schedule = require('node-schedule');
var poemarr = new Array();
readFile.readFile(filename,readFileCallback);
var jobArr = new Array();
var groupArr = new Array();
function readFileCallback(arr){
    poemarr=arr;
	let length=poemarr.length;
	let random=randomNum(1,length)
	console.log(arr[random])
   console.log(poemarr.length);
}
function onScan (qrcode, status) {
  require('qrcode-terminal').generate(qrcode, { small: true })  // show qrcode on console

  const qrcodeImageUrl = [
    'https://api.qrserver.com/v1/create-qr-code/?data=',
    encodeURIComponent(qrcode),
  ].join('')

  console.log(qrcodeImageUrl)
}

function onLogin (user) {
  console.log(`${user} login`)
}

function onLogout(user) {
  console.log(`${user} logout`)
}

async function onMessage (msg) {
  let room = msg.room()
  let sender=msg.from()
  let content=msg.text()
  let to = msg.to() 
  if (msg.self()) {
	  console.log('msg sended by myself')
	  if(content&&content.indexOf('添加白名单')>-1){
		  console.log('添加一个白名单');
          clearMsgJob(to.id);
	  }
	  if ('广告'===content) {
		console.log('对面是广告,开始反击')
		sendMsg(to)
	  }
	  return
  }
  if ( room) {
      console.log('message is inside a room.')
      return
  }
  let type = msg.type()
	 console.log('type==='+type);
   if (type=== bot.Message.Type.Text) {
	  console.log('message is a txt',content)
	  console.log(content)
	  //console.log(poemarr.length);
	  if ('我错了'===content) {
		  clearMsgJob(sender.id)
		  await sender.say('收到你的知错信息了,知道错了就行,停止了不发送了');
         console.log('收到了你发的取消信息');
         
	  }
	  
	  
   }else if(type=== bot.Message.Type.Url ||type=== bot.Message.Type.Unknown  ||type=== bot.Message.Type.Attachment
		  || type=== bot.Message.Type.MiniProgram){
	  console.log('收到一个广告,开始反击')
	  //sendMsg(sender)
   }
}
function clearMsgJob(id){
	//schedule.cancelJob( id)
    //并且移除jobarr对象
    let index=jobArr.indexOf(id);
	if (index > -1) {
		jobArr.splice(index, 1);
	}
	removeAaary(groupArr,id);
}
async function sendMsg(sender){
   if(isHaveJob(sender.id)){
	   console.log('已经存在定时任务了,暂时不用启动了');
	   return;
   }
   await sender.say('我收到了你的一个广告,比较讨厌广告,我将反击了,哼')
   await sender.say('我将每隔两秒给你发一首唐诗喔,要多学习.0~0')
   await sender.say('回复"我错了",我将停止发送,我要开始啦.')
   //await sender.say(getRandomPoem())
   addSendPoemArr(sender);
   console.log(jobArr);
   //schedule.scheduleJob(sender,'*/2 * * * * *', sendPoemMsg.bind(null,sender) );
}
function addSendPoemArr(sender){
   jobArr.push(sender.id);
   var obj={};
   obj.id=sender.id;
   obj.data=sender;
   groupArr.push(obj);
}

function getIndex (_arr,_id) {
	var len = _arr.length;
	for(var i = 0; i < len; i++)
	{
		if(_arr[i].id == _obj)
		{
			return parseInt(i);
		}
	}
	return -1;
}

/*删除数组中的某一个对象
_arr:数组
_obj:需删除的对象
*/
function removeAaary(_arr, id) {
    var length = _arr.length;
    for (var i = 0; i < length; i++) {
        if (_arr[i].id == id) {
            if (i == 0) {
                _arr.shift(); //删除并返回数组的第一个元素
                return _arr;
            }
            else if (i == length - 1) {
                _arr.pop();  //删除并返回数组的最后一个元素
                return _arr;
            }
            else {
                _arr.splice(i, 1); //删除下标为i的元素
                return _arr;
            }
        }
    }
}

function isHaveJob(id){
   return jobArr.indexOf(id)>-1;
}
function getRandomPoem(){
    let length=poemarr.length;
	let random=randomNum(1,length);
	return poemarr[random];
}
function sendPoemMsg(e){
	console.log('发送唐诗给用户');
	//console.log(e);
	e.say(getRandomPoem());
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
setInterval(function(){
  for (var index in  groupArr){
	sendPoemMsg(groupArr[index].data);
  }
},4000);
const bot = new Wechaty()
 
bot.on('scan',    onScan)
bot.on('login',   onLogin)
bot.on('logout',  onLogout)
bot.on('message', onMessage)

bot.start()
.then(() => console.log('Starter Bot Started.'))
.catch(e => console.error(e))
 