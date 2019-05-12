/**node schedule */
const schedule = require('node-schedule');

function a(e){
	console.log(e.a);
}
 
function addSchedule(){
	var params={a:1,b:2}
	schedule.scheduleJob('1111job','*/2 * * * * *', function a(e){
		//console.log(e.a);
	}.bind(null,params) );
}
/*addSchedule();
setTimeout(function(){
	console.log('cancel 1111job')
	schedule.cancelJob('1111job')
},50000);
*/
const { Wechaty } = require('wechaty')
const bot = new Wechaty()
//console.log(bot.Message.Type);


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

var group = new Array();
var obj={};
obj.id=33
obj.data={};
group.push(obj);
var obj1={};
obj1.id=44
obj1.data={};
group.push(obj1);
console.log(group);

removeAaary(group,33);
console.log(group);
