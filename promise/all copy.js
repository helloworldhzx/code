const PENDING = 'pending';
const RESOLVE = 'resolve';
const REJECT = 'reject';

function Promise(fn){
  const that = this;
  that.status = PENDING;
  that.value = null;
  that.resolveCallbacks = [];
  that.rejectCallbacks = [];
  function resolve(value){
    if(value instanceof Promise){
      return value.then(resolve, reject)
    }
    if(that.status===PENDING){
      that.status = RESOLVE;
      that.value = value;
      that.resolveCallbacks.forEach(fn => fn(that.value))
    }
  };
  function reject(value){
    if(that.status===PENDING){
      that.status = REJECT;
      that.value = value;
      that.rejectCallbacks.forEach(fn => fn(that.value))
    }
  };
  try{
    fn(resolve, reject)
  }catch(e){
    reject(e)
  }
}

Promise.prototype.then = function(onFulfilled, onRejected){
  const that = this;
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled: v => v;
  onRejected = typeof onRejected === "function"? onRejected : e => { throw e };
  const promise2 = new Promise((resolve, reject)=>{
    if(that.status === PENDING){
      setTimeout(() => {

      })
      that.resolveCallbacks.push(() => {
        setTimeout(() => {
          try {
           const x = onFulfilled(that.value)
           resolvePromise(promise2, x, resolve, reject)
          } catch(e){
            reject(e)
          }
        })
      });
      that.rejectCallbacks.push(()=> {
        setTimeout(() => {
          try {
           const x = onRejected(that.value)
           resolvePromise(promise2, x, resolve, reject)
          } catch(e){
            reject(e)
          }
        })
      });
    }
    if(that.status === RESOLVE){
      setTimeout(() => {
        try {
         const x = onFulfilled(that.value)
         resolvePromise(promise2, x, resolve, reject)
        } catch(e){
          reject(e)
        }
      })
    }
    if(that.status === REJECT){
      setTimeout(() => {
        try {
         const x = onRejected(that.value)
         resolvePromise(promise2, x, resolve, reject)
        } catch(e){
          reject(e)
        }
      })
    }
  })
  return promise2
}

function resolvePromise(promise2, x, resolve, reject){
  if(promise2 === x){
    reject(new TypeError("error"))
  }
  if(x && typeof x === "object" || typeof x === "function"){
    let used = false
    try{
      const then = x.then;
    if(typeof then === "function"){
      then.call(x, y => {
        if(used) return;
        used = true;
        resolvePromise(promise2, y, resolve, reject)
      }, e => {
        if(used) return;
        used = true;
        reject(e);
      })
    } else {
      resolve(x);
    }
    } catch(e){
      if(used) return
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
