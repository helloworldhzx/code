/* const PENDING = 'pending';
const RESOLVE = 'resolve';
const REJECT = 'reject';

function MyPromise(fn){
  const that = this;
  that.status = PENDING;
  that.value = null;
  that.resolveCallbacks = [];
  that.rejectCallbacks = [];
  function resolve(value){
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

MyPromise.prototype.then = function(onFulfilled, onRejected){
  const that = this;
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled: v => v;
  onRejected = typeof onRejected === "function"? onRejected : e => { throw e };
  if(that.status === PENDING){
    that.resolveCallbacks.push(resolve);
    that.rejectCallbacks.push(reject);
  }

  if(that.status === RESOLVE){
    onFulfilled(that.value)
  }
  if(that.status === REJECT){
    onRejected(that.value)
  }
}


function debounce(fn, time){
  let timer = null
  return function(){
    clearTimeout(timer)
    timer = setTimeout(function(){
      fn(arguments)
    }, time)
  }
}

function throttle(fn, wait){
  let timer = null;
    return function(){
      if(timer){
        return;
      }
      timer = setTimeout(()=>{
        fn(...arguments)
        clearTimeout(timer)
      }, wait)
    }
}

class Parent{
  constructor(name){
    this.name = name;
  }
  getName(){
    console.log(this.name)
  }
}

class Children extends Parent{
  constructor(name){
    super(name)
  }
}

var zz = new Children("zz")

Function.prototype.call = function(content){
  content = content || window
  content.fn = this;
  const arg = [...arguments].splice(1)
  const result = content.fn(...arg)
  delete content.fn
  return result
}

Function.prototype.apply = function(content){
  if(typeof this !== "function"){
    throw new TypeError('Error')
  }
  content = content || window
  content.fn = this;
  let result
  if(arguments[1]){
     result = content.fn(...arguments[1])
  } else {
    result = content.fn()
  }
  delete content.fn
  return result
}

Function.prototype.bind = function(content){
  if(typeof this !== "function"){
    throw new TypeError('Error')
  }
  const _this = this;
  const arg = [...arguments].slice(1)
  return function F(){
    if(this instanceof F){
      return new _this(...arg, ...arguments)
    } else {
      _this.call(content, ...arg, ...arguments)
    }
  }
} */

/* function myNew(fn){
  const obj = {}
  obj.__proto__ = fn.prototype;
  const result = fn.apply(obj, arguments.splice(1))
  if(typeof result === "object" || typeof result === "function"){
    return result
  }
  return obj;
}
var bb = { b: 1, aa: function(){
  console.log(this)
} }
function aa(){
  console.log(this);
  return bb
}

var c = new aa();

function myInstanceof(left, right){
  const prototype = right.prototype;
  left = left.__proto__;
  while(true){
    if(left === null || left === undefined){
      return false
    } else if(prototype === left){
      return true
    }
    left = left.__proto__
  }
}
 */
// function bubblon(arr){
//   for(var i=0; i<arr.length;i++){
//     for(var j=0;j<arr.length-i;j++){
//       if(arr[j+1]<arr[j]){
//         var flg = arr[j];
//         arr[j] = arr[j+1];
//         arr[j+1] = flg;
//       }
//     }
//   }
//   return arr;
// }
// console.log(bubblon([5,7,98,4,65,7,8,9,3,6,7,88,9,0,45,6]));
/* function sort(array) {
  // if (!checkArray(array)) return
  mergeSort(array, 0, array.length - 1);
  return array;
}


function mergeSort(array, left, right) {
  // 左右索引相同说明已经只有一个数
  if (left === right) return;
  // 等同于 `left + (right - left) / 2`
  // 相比 `(left + right) / 2` 来说更加安全，不会溢出
  // 使用位运算是因为位运算比四则运算快
  let mid = parseInt(left + ((right - left) >> 1));
  mergeSort(array, left, mid);
  mergeSort(array, mid + 1, right);

  let help = [];
  let i = 0;
  let p1 = left;
  let p2 = mid + 1;
  while (p1 <= mid && p2 <= right) {
    help[i++] = array[p1] < array[p2] ? array[p1++] : array[p2++];
  }
  while (p1 <= mid) {
    help[i++] = array[p1++];
  }
  while (p2 <= right) {
    help[i++] = array[p2++];
  }
  for (let i = 0; i < help.length; i++) {
    array[left + i] = help[i];
  }
  return array;
}
console.log(sort([3, 1, 2, 8, 9, 7, 6])) */
function checkArray(array) {
  return Array.isArray(array)
}
function swap(array, left, right) {
  let rightValue = array[right]
  array[right] = array[left]
  array[left] = rightValue
}
// function swap(arr, i, j) {
//   var temp = arr[i];
//   arr[i] = arr[j];
//   arr[j] = temp;
// }

// function partition(a, l, r) {
//   var x = a[r], i = l - 1;
//   for (var j = l; j < r; ++j) {
//       if (a[j] <= x) {
//           swap(a, ++i, j);
//       }
//   }
//   swap(a, i + 1, r);
//   return i + 1;
// }

// function randomPartition(a, l, r) {
//   var i = parseInt(Math.random(r - l + 1)) + l;
//   swap(a, i, r);
//   return partition(a, l, r);
// }

// function quickSelect(a, l, r, index) {
//   var q = randomPartition(a, l, r);
//   if (q == index) {
//       return a[q];
//   } else {
//       return q < index ? quickSelect(a, q + 1, r, index) : quickSelect(a, l, q - 1, index);
//   }
// }
// function findKthLargest(nums, k) {
//   return quickSelect(nums, 0, nums.length - 1, nums.length - k);
// }

// console.log(findKthLargest([3, 1, 2, 8, 9, 7, 6], 2));

/* 
function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function findKthLargest(nums, k) {
  var heapSize = nums.length;
  buildMaxHeap(nums, heapSize);
  for (var i = nums.length - 1; i >= nums.length - k + 1; --i) {
      swap(nums, 0, i);
      --heapSize;
      maxHeapify(nums, 0, heapSize);
  }
  return nums[0];
}
function buildMaxHeap(a, heapSize) {
  for (var i = parseInt(heapSize / 2); i >= 0; --i) {
      maxHeapify(a, i, heapSize);
  } 
}
function maxHeapify(a, i, heapSize) {
  var l = i * 2 + 1, r = i * 2 + 2, largest = i;
  if (l < heapSize && a[l] > a[largest]) {
      largest = l;
  } 
  if (r < heapSize && a[r] > a[largest]) {
      largest = r;
  }
  if (largest != i) {
      swap(a, i, largest);
      maxHeapify(a, largest, heapSize);
  }
}
console.log(findKthLargest([3, 1, 2, 8, 9, 7, 6], 2)); */

function heap(array) {
  if (!checkArray(array)) return
  // 将最大值交换到首位
  for (let i = 0; i < array.length; i++) {
    heapInsert(array, i);
  }
  let size = array.length;
  // 交换首位和末尾
  swap(array, 0, --size);
  while (size > 0) {
    heapify(array, 0, size);
    swap(array, 0, --size);
  }
  return array;
}

function heapInsert(array, index) {
  // 如果当前节点比父节点大，就交换
  while (array[index] > array[parseInt((index - 1) / 2)]) {
    swap(array, index, parseInt((index - 1) / 2));
    // 将索引变成父节点
    index = parseInt((index - 1) / 2);
  }
}
function heapify(array, index, size) {
  let left = index * 2 + 1;
  while (left < size) {
    // 判断左右节点大小
    let largest =
      left + 1 < size && array[left] < array[left + 1] ? left + 1 : left;
    // 判断子节点和父节点大小
    largest = array[index] < array[largest] ? largest : index;
    if (largest === index) break;
    swap(array, index, largest);
    index = largest;
    left = index * 2 + 1;
  }
}

console.log(heap([3, 1, 2, 8, 9, 7, 6]));