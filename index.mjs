
// import { name, hobbies } from './name.mjs';
// console.log(name, hobbies); //William ["coding"]
// //name 和 hobbie 都会被模块内部的变化所影响
// setTimeout(() => {
//     console.log(name, hobbies); //Yvette ["coding", "writing"]
// }, 500); //Yvette
function print(n){
    setTimeout(()=>{
        console.log(n)
    },Math.floor(Math.random()*1000))
}
for(var i=0;i<100;i++){
    print(i)
}