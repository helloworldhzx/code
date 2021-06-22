const PENDING = "pending"
const FULFILLED = "fulfilled"
const REJECTED = "rejected"
function Promise(fn){
  const that = this;
  that.status = PENDING;
  that.value = null;
  that.resolveCallbacks = []
  that.rejectCallbacks = []
  function resolve(value){
    if(value instanceof Promise){
      return value.then(resolve, reject)
    }
    if(that.status === PENDING){
      that.value = value;
      that.status = FULFILLED;
      that.resolveCallbacks.forEach(fn => fn(that.value))
    }
  }
  function reject(value){
    if(that.status === PENDING){
      that.value = value;
      that.status = REJECTED;
      that.rejectCallbacks.forEach(fn => fn(that.value))
    }
  }
  try{
    fn(resolve, reject)
  }catch(e){
    reject(e)
  }
}

Promise.prototype.then = function(onFulfilled, onRejected){
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
  onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };
  const that = this;
  const promise2 = new Promise((resolve, reject) => {
    if(that.status === PENDING){
      that.resolveCallbacks.push(() => {
        setTimeout(()=>{
          try{
            const x = onFulfilled(that.value)
            resolutionProcedure(promise2, x, resolve, reject)
          }catch(e){
            reject(e)
          } 
        })
      })
      that.rejectCallbacks.push(() => {
        setTimeout(()=>{
          try{
            const x = onRejected(that.value)
            resolutionProcedure(promise2, x, resolve, reject)
          }catch(e){
            reject(e)
          } 
        })
      })
    }
  
    if(that.status === FULFILLED){
      setTimeout(()=>{
        try{
          const x = onFulfilled(that.value)
          resolutionProcedure(promise2, x, resolve, reject)
        }catch(e){
          reject(e)
        } 
      })
      
    }
    if(that.status === REJECTED){
      setTimeout(()=>{
        try{
          const x = onRejected(that.value)
          resolutionProcedure(promise2, x, resolve, reject)
        }catch(e){
          reject(e)
        } 
      })
    }
  })
  return promise2
}

function resolutionProcedure(promise2, x, resolve, reject){
  if(promise2 === x){
    reject(new TypeError("error"))
  }
  if(x && typeof x === "object" || typeof x === "function"){
  let used = false
    try{
      const then = x.then;
      if(typeof then === "function"){
        then.call(x, y=>{
          if(used) return;
          used = true
          resolutionProcedure(promise2, y, resolve, reject)
        }, r=>{ 
          if(used) return;
          used = true
          reject(r)
        })
      } else {
        if(used) return;
          used = true
        resolve(x)
      }
    }catch(e){
      if(used) return;
      used = true
      reject(e)
    }

  } else {
    resolve(x)
  }
}

Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
      dfd.resolve = resolve;
      dfd.reject = reject;
  });
  return dfd;
}
 module.exports = Promise;

//  promises-aplus-tests promise.js
