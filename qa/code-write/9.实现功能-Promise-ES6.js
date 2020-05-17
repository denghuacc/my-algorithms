// 手动实现 Promise ES6 标准

const PENDING = Symbol("pending");
const FULFILLED = Symbol("fulfilled");
const REJECTED = Symbol("rejected");

const isPromise = (src) => src instanceof SelfPromise;
const isFunction = (src) => typeof src === "function";
const isObject = (src) =>
  Object.prototype.toString.call(src) === "[object Object]";
const isThenable = (src) => (isFunction(src) || isObject(src)) && "then" in src;
const delay = (fn, time = 0) => (value) => setTimeout(() => fn(value), time);

const notify = (handler, state, result) => {
  let { onFulfilled, onRejected, resolve, reject } = handler;

  try {
    if (state === FULFILLED) {
      isFunction(onFulfilled) ? resolve(onFulfilled(result)) : resolve(result);
    } else if (state === REJECTED) {
      isFunction(onRejected) ? resolve(onRejected(result)) : reject(result);
    }
  } catch (error) {
    reject(error);
  }
};

const notifyAll = delay((promise) => {
  let { handlers, state, result } = promise;
  while (handlers.length) notify(handlers.shift(), state, result);
});

const transition = (promise, state, result) => {
  if (promise.state !== PENDING) return;
  promise.state = state;
  promise.result = result;
  notifyAll(promise);
};

const checkValue = (promise, value, onFulfilled, onRejected) => {
  if (value === promise) {
    let reason = new TypeError("Can not fulfill promise with itself");
    return onRejected(reason);
  }

  if (isPromise(value)) {
    return value.then(onFulfilled, onRejected);
  }

  if (isThenable(value)) {
    try {
      let then = value.then;
      if (isFunction(then)) {
        return new SelfPromise(then.bind(value)).then(onFulfilled, onRejected);
      }
    } catch (error) {
      return onRejected(error);
    }
  }

  onFulfilled(value);
};

function SelfPromise(fn) {
  this.state = PENDING;
  this.handlers = [];

  let onFulfilled = (value) => transition(this, FULFILLED, value);
  let onRejected = (reason) => transition(this, REJECTED, reason);

  let ignore = false;
  let resolve = (value) => {
    if (ignore) return;
    ignore = true;
    checkValue(this, value, onFulfilled, onRejected);
  };

  let reject = (reason) => {
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

SelfPromise.prototype.then = function (onFulfilled, onRejected) {
  return new SelfPromise((resolve, reject) => {
    this.handlers.push({ onFulfilled, onRejected, resolve, reject });
    this.state !== PENDING && notifyAll(this);
  });
};

// catch 方法也是 then 的方法，把异常处理函数放入到 then 的第二个参数中
SelfPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

// 静态方法 resolve 和 reject 也是 Promise 的灵活运用，都返回一个 Promise
SelfPromise.resolve = (value) => new SelfPromise((resolve) => resolve(value));
SelfPromise.reject = (reason) => new SelfPromise((_, reject) => reject(reason));

// all 方法还是返回一个 Promise
SelfPromise.all = (promises = []) => {
  return new SelfPromise((resolve, reject) => {
    let count = 0;
    let values = new Array(promises.length);
    let collectValue = (index) => (value) => {
      values[index] = value;
      count += 1;
      count === promises.length && resolve(values);
    };
    promises.forEach((promise, index) => {
      if (isPromise(promise)) {
        promise.then(collectValue(index), reject);
      } else {
        collectValue(index)(promise);
      }
    });
  });
};

// race 方法还是返回一个 Promise
SelfPromise.race = (promises = []) => {
  return new SelfPromise((resolve, reject) => {
    return promises.forEach((promise) => {
      if (isPromise(promise)) {
        promise.then(resolve, reject);
      } else {
        resolve(promise);
      }
    });
  });
};
