let name = 'William';
setTimeout(() => { name = 'Yvette'; hobbies.push('writing'); }, 300);
export { name };
export var hobbies = ['coding'];

function foo(){
    "use strict";
    err=1
    try{
        console.log("try")
        throw "hello"

    }catch(err){
        console.log(err)
    }
    console.log(err)
}