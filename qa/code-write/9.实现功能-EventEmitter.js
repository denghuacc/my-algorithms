// 手动实现事件派发机制 EventEmitter

class EventEmitter {
  constructor() {
    this._events = new Map();
    this._maxListeners = 10;
  }

  emit(type, ...args) {
    const handler = this._events.get(type);
    const self = this;
    if (handler) {
      Array.isArray(handler)
        ? handler.forEach((h) => applyHandler(h))
        : applyHandler(handler);
      return true;
    } else {
      return false;
    }

    function applyHandler(handler) {
      args.length > 0 ? handler.apply(self, args) : handler.apply(self);
    }
  }

  addListener(type, fn) {
    const handler = this._events.get(type);
    if (!handler) {
      this._events.set(type, fn); // 新值
    } else if (handler && typeof handler === "function") {
      this._events.set(type, [handler, fn]); // 变成数组
    } else {
      handler.push(fn); // 添加到数组
    }
  }

  removeListener(type, fn) {
    const handler = this._events.get(type);
    if (handler && typeof handler === "function") {
      this._events.delete(type);
    } else {
      const position = handler.findIndex((f) => f === fn);
      if (position !== -1) {
        handler.splice(position, 1);
        if (handler.length === 1) this._events.set(type, handler[0]);
      } else {
        return this;
      }
    }
  }
}

// test
const event = new EventEmitter();
function fn1(title) {
  console.log(title);
}
function fn2() {
  console.log("event");
}
event.addListener("msg", fn1);
event.addListener("msg", fn2);
event.emit("msg", "hello");

event.removeListener("msg", fn2);
event.emit("msg", "hello");
