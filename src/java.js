//--Not necessary if you use the base UI, but you can put Javascript here if you want
//--If you want to have settings, this is where you will put the code

// tag passage 'noreturn' to avoid return loop errors
$(document).on(':passagestart', function (ev) {
    if (!ev.passage.tags.includes('noreturn')) {
        State.variables.return = ev.passage.title;
    }
});
// end noreturn

(function () {
    'use strict';
    // v1.0.0
    // preload images prior to story startup

    function preloadImage (url, cb) {
        var img = new Image();
        img.onload = cb;
        img.onerror = cb;
        img.src = url;
    }

    function preloadAll (urls, cb) {
        var loaded = 0;
        var toBeLoaded = urls.length;
        if (toBeLoaded === 0) {
            throw new Error("No URLs to preload!");
        }
        urls.forEach( function (url) {
            preloadImage( url, function () {
                loaded++;
                if (loaded === toBeLoaded) {
                    cb();
                }
            });
        });
    }

    function isInit () {
        return State.length <= 0;
    }


    function preload () {
        var list = [].slice.call(arguments).flatten();
        var id = isInit() ? LoadScreen.lock() : false;
        preloadAll( list, function () {
            if (id) {
                LoadScreen.unlock(id);
            }
        });
        return id;
    }

    setup.preload = preload;
    setup.preload.force = false;

    /* <<preload imageUrls...>> */
    Macro.add('preload', {
        handler : function () {
            if (!isInit() && !setup.preload.force) {
                return this.error("Attempting to preload images outside of `StoryInit` or similar can cause performance issues. Set `setup.preload.force` to `true` if you want to do it anyway.");
            }
            preload(this.args.flatten().filter( function (url) {
                return typeof url === 'string';
            }));
        }
    });
}());