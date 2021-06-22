const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function Promise(executor){
  const self = this;
  self.status = PENDING;
  self.onFulfilled = [];
  self.onRejected = [];
  function resolve(value){
    if(self.status === PENDING){
      self.status = FULFILLED;
      self.value = value;
      self.onFulfilled.forEach(fn => fn());
    }
  }
  function reject(){
    if(self.status === PENDING){
      self.status = REJECTED;
      self.value = value;
      self.onRejected.forEach(fn => fn());
    }
  }
  try{
    executor(resolve, reject)
  }catch(e){
    reject(e)
  }
}

Promise.prototype.then = function(onFulfilled, onRejected){
  var promise2 = new Promise(()=>{})
  return promise2
}