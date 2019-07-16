
// import { name, hobbies } from './name.mjs';
// console.log(name, hobbies); //William ["coding"]
// //name 和 hobbie 都会被模块内部的变化所影响
// setTimeout(() => {
//     console.log(name, hobbies); //Yvette ["coding", "writing"]
// }, 500); //Yvette
// function print(n){
//     setTimeout(()=>{
//         console.log(n)
//     },Math.floor(Math.random()*1000))
// }
// for(var i=0;i<100;i++){
//     print(i)
// }

// var a = [1,2,3];
// a.join=a.shift
// if(a == 1 && a == 2 && a == 3){
//  	console.log(144);
// }
// var a = {
//     b:1,
//     toString:function(){
//         return this.b++
//     }
// };
// if(a == 1 && a == 2 && a == 3){
//  	console.log(144);
// }
// function bc(){
//     // return 123
//     return new Promise((res1)=>{
//         setTimeout(function(){res1()},10000)
//     })
// }
// function *a(){
//     const n = yield bc();
//     console.log(n)
//     yield 2;
// }
// var b =a()
// console.log(b.next().value)
// console.log(b.next())
// console.log(b.next())
// console.log(b.next())

var length = 10 
function fn(){
console.log(this.length);
}
var obj = {
    length:5,
    me:function(fn){
        fn();
        console.log(typeof arguments)
        arguments[0]()
    }
}
obj.me(fn,1)