"use strict";
class EventConstructor {
    constructor(type) {
        this.type = type;
        this.timeStamp = new Date();
    }
}
class Emitter {
    constructor() {
        this.events = {};
    }
    on(type, handler) {
        if (this.events.hasOwnProperty(type)) {
            this.events[type].push(handler);
        }
        else {
            this.events[type] = [handler];
        }
        return this;
    }
    off(type, handler) {
        if (arguments.length === 0) {
            return this.offAll();
        }
        if (handler === undefined && type) {
            return this.offByType(type);
        }
        if (type && handler) {
            return this.offByHandler(type, handler);
        }
        return this;
    }
    trigger(event, args) {
        const newEvent = event instanceof EventConstructor ? event : new EventConstructor(event);
        return this.dispatch(newEvent, args);
    }
    dispatch(event, args) {
        if (!this.events.hasOwnProperty(event.type))
            return this;
        args = args || [];
        // args.unshift(event);  Я вот хз зачем это тут
        const handlers = this.events[event.type] || [];
        handlers.forEach((handler) => handler.apply(null, args));
        return this;
    }
    offByHandler(type, handler) {
        if (!this.events.hasOwnProperty(type))
            return this;
        const i = this.events[type].indexOf(handler);
        if (i > -1) {
            this.events[type].splice(i, 1);
        }
        return this;
    }
    offByType(type) {
        if (this.events.hasOwnProperty(type)) {
            delete this.events[type];
        }
        return this;
    }
    offAll() {
        this.events = {};
        return this;
    }
}
Emitter.Event = EventConstructor;
