var _elm_lang$lazy$Native_Lazy = function() {

// mutates inside a JS Closure so Elm can't see it.  IIFE helps Chrome speed.
var memoize = function() {
    return function(thunk, value) {
        var _tu;
        if (value === undefined)
            _tu = { ctor: 'Unevaluated', _0: thunk }
        else
            _tu = { ctor: 'Evaluated', _0: value };
        return function () {
            var tag = _tu.ctor;
            var v = _tu._0;
            if (tag === 'Evaluating')
                throw Error("Lazy.force:  recursive evaluation detected!!!");
            if (tag == 'Unevaluated') {
                _tu.ctor = 'Evaluating';
                v = v();
                _tu = { ctor: 'Evaluated', _0: v };
            }
            return v;
        }
    };
}();

function lazy(thunk) {
    return { ctor: 'Lazy', _0: memoize(thunk, undefined) };
}

function lazyFromValue(v) {
    return { ctor: 'Lazy', _0: memoize(undefined, v) };
}

return {
    lazy: lazy,
    lazyFromValue: lazyFromValue
};

}();
