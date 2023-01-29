//--Not necessary if you use the base UI, but you can put Javascript here if you want
//--If you want to have settings, this is where you will put the code

// tag passage 'noreturn' to avoid return loop errors
$(document).on(':passagestart', function (ev) {
    if (!ev.passage.tags.includes('noreturn')) {
        State.variables.return = ev.passage.title;
    }
});
// end noreturn