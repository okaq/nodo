// live msg
console.log("start zodo");

// scene
const sce = {
    init() {
        sce.a = {};
    }
};

// loop
const loop = {
    start() {
        console.log("begin loop");
        loop.tick = 0;
    }
};

// main
(function() {
    console.log(THREE);
    subs = [dom,sce];
    subs.forEach(el => el.init());
    loop.start();
})();
