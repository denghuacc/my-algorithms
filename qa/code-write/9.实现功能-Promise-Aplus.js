// 手动实现 Promise A+ 标准

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

const isPromise = (src) => src instanceof SelfPromise;
const isFunction = (src) => typeof src === "function";
const isObject = (src) => !!(src && typeof src === "object");
const isThenable = (src) => (isFunction(src) || isObject(src)) && "then" in src;

function SelfPromise(fn) {
  this.state = PENDING; // 默认是 pending 状态
  this.result = null; // 初始结果是 null 后续根据状态可能是 value 或者 reason
  this.callbacks = []; // 每次 then 方法收集的 callback 对象的集合

  const onFulfilled = (value) => transition(this, FULFILLED, value); // 切换状态，pending => fulfill
  const onRejected = (reason) => transition(this, REJECTED, reason); // 切换状态，pending => rejected

  // 保证 resolve / reject 函数只调用一次
  let ignore = false;
  const resolve = (value) => {
    if (ignore) return;
    ignore = true;
    resolvePromise(this, value, onFulfilled, onRejected);
  };

  const reject = (reason) => {
    if (ignore) return;
    ignore = true;
    onRejected(reason);
  };

  try {
    fn(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

// then 方法实现，返回一个新的 Promise
SelfPromise.prototype.then = function (onFulfilled, onRejected) {
  return new SelfPromise((resolve, reject) => {
    const callback = { onFulfilled, onRejected, resolve, reject };

    if (this.state === PENDING) {
      this.callbacks.push(callback); // 每次调用 then 方法把 callback 传入
    } else {
      setTimeout(() => handleCallback(callback, this.state, this.result), 0); // 状态转换时异步执行
    }
  });
};

// 处理 callback
const handleCallback = (callback, state, result) => {
  const { onFulfilled, onRejected, resolve, reject } = callback;

  try {
    if (state === FULFILLED) {
      isFunction(onFulfilled) ? resolve(onFulfilled(result)) : resolve(result); // 函数需要求值
    } else if (state === REJECTED) {
      isFunction(onRejected) ? resolve(onRejected(result)) : reject(result);
    }
  } catch (error) {
    reject(error);
  }
};

// 执行所有的 callback
const handleCallbacks = (callbacks, state, result) => {
  while (callbacks.length) handleCallback(callbacks.shift(), state, result);
};

// pending 时状态转换
const transition = (promise, state, result) => {
  if (promise.state !== PENDING) return;
  promise.state = state;
  promise.result = result;
  setTimeout(() => handleCallbacks(promise.callbacks, state, result), 0); // 状态变化时清空 callbacks
};

// 处理 result 的特殊值
const resolvePromise = (promise, result, resolve, reject) => {
  // 返回结果是 Promise 本身
  if (result === promise) {
    const reason = new TypeError("Can not fulfill promise with itself");
    return reject(reason);
  }

  // 返回结果是 Promise 实例
  if (isPromise(result)) {
    return result.then(resolve, reject);
  }

  // 返回结果是 thenable 对象
  if (isThenable(result)) {
    try {
      const then = result.then;
      if (isFunction(then)) {
        return new SelfPromise(then.bind(result)).then(resolve, reject);
      }
    } catch (error) {
      return reject(error);
    }
  }

  resolve(result);
};
