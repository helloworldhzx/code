function a(n,k){
    let length = n.toString().length-1;
    let value = 1
    while(k>Math.pow(10,length)*value){
        value = value+1
    }
    console.log(value)
    return value
}

console.log(a(13,12))