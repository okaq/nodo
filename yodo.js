// nodo
console.log("hello nodo");

// scene
const sce = {
    init() {
        sce.a = {};
        sce.a.r = [1920,1080,0,0];
        sce.a.c = dom.canvas(sce.a.r);
        dom.add(sce.a.c);
    }
};

// geometry
const geo = {
    init() {
        geo.a = {};
    }
};

// DOM
const dom = {
	init() {
		dom.a = document.getElementById("alpha");
		console.log(dom.a);
	},
	canvas(r0) {
		let c0 = {};

		c0.can = document.createElement("canvas");
		c0.can.width = r0[0];
		c0.can.height = r0[1];
		c0.can.style.position = "absolute";
		c0.can.style.top = r0[3] + "px";
		c0.can.style.left = r0[2] + "px";

		return c0;
	},
	add(c0) {
		dom.a.appendChild(c0.can);
	},
	remove(c0) {
		dom.a.appendChild(c0.can);
	}
};

// color
const rgba = {
	rb() {
		return (Math.random() * 255) >>> 0;
	}
};

// main
(function() {
    console.log(THREE);
    subs = [dom,sce,geo];
    subs.forEach(el => el.init());
    loop.start();
})();

