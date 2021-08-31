var EventConstructor = /** @class */ (function () {
    function EventConstructor(type) {
        this.type = type;
        this.timeStamp = new Date();
    }
    return EventConstructor;
}());
var Emitter = /** @class */ (function () {
    function Emitter() {
        this.events = {};
    }
    Emitter.prototype.on = function (type, handler) {
        if (this.events.hasOwnProperty(type)) {
            this.events[type].push(handler);
        }
        else {
            this.events[type] = [handler];
        }
        return this;
    };
    Emitter.prototype.off = function (type, handler) {
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
    };
    Emitter.prototype.trigger = function (event, args) {
        var newEvent = event instanceof EventConstructor ? event : new EventConstructor(event);
        return this.dispatch(newEvent, args);
    };
    Emitter.prototype.dispatch = function (event, args) {
        if (!this.events.hasOwnProperty(event.type))
            return this;
        args = args || [];
        // args.unshift(event);  Я вот хз зачем это тут
        var handlers = this.events[event.type] || [];
        handlers.forEach(function (handler) { return handler.apply(null, args); });
        return this;
    };
    Emitter.prototype.offByHandler = function (type, handler) {
        if (!this.events.hasOwnProperty(type))
            return this;
        var i = this.events[type].indexOf(handler);
        if (i > -1) {
            this.events[type].splice(i, 1);
        }
        return this;
    };
    Emitter.prototype.offByType = function (type) {
        if (this.events.hasOwnProperty(type)) {
            delete this.events[type];
        }
        return this;
    };
    Emitter.prototype.offAll = function () {
        this.events = {};
        return this;
    };
    Emitter.Event = EventConstructor;
    return Emitter;
}());
var emitter = new Emitter();
var bambucha = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return console.log('бамбуча', args);
};
var bambucha2 = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return console.log('бамбуча 2 вот так вот', args);
};
emitter.on('click', function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return console.log('жопа', args);
});
