// live msg
console.log("start zodo");

// scene
const sce = {
    init() {
		sce.a = {};
		sce.a.r = [1920,1080,0,0];
		sce.a.c = dom.canvas(sce.a.r);
		dom.add(sce.a.c);
		// console.log(sce.a);
		// webgl
		sce.b = new THREE.Scene();
		// cam
		sce.c = new THREE.OrthographicCamera(0,1920,1080,0,-1000,1000);
		// render
		sce.d = new THREE.WebGLRenderer({canvas:sce.a.c.can,alpha:true});
		c0 = new THREE.Color(0xf0f000);
		sce.d.setClearColor(c0,1);
		sce.d.clearColor();
		sce.b.background = c0;
		// debug
		console.log(sce.d.info);
		console.log(sce.d.getContext());
		sce.d.render(sce.b, sce.c);
		// program not valid
	},
	pop() {
		// generate grid
		geo.init2();
		geo.buff2();
		geo.mat();
		geo.mesh();

		sce.b.add(geo.d.a);
	}
};

// loop
const loop = {
    start() {
        console.log("begin loop");
		loop.tick = 0;
		loop.max = 16;

		// populate scene
		sce.pop();
		
		loop.id = window.setInterval(loop.frame, 1000);
	},
	frame() {
		console.log(`tick count: ${loop.tick}`);
		if (loop.tick >= loop.max) {
			console.log("anim done");
			window.clearInterval(loop.id);
			return;
		}
		// update
		// mesh.materials.uniforms.time = window.performance.now();
		// mesh.position.y = velocity * window.performance.now() + offset;
		// render scene
		// sce.b.add(mesh);
		sce.d.render(sce.b,sce.c);
		loop.tick = loop.tick + 1;
	}
};

// geometry
const geo = {
	init() {
		geo.a = {};
		// single background plane at z = 0
		geo.a.a = new THREE.BufferGeometry();
		// vert
		geo.a.b = [];
		v0 = [];
		for (let i = 0; i < 4; i++) {
			x0 = i % 2;
			y0 = (i / 2) >>> 0;
			x1 = 1024 * x0 - 512;
			y1 = 1024 * y0 - 512;
			z0 = 0;
			// geo.a.b.push(x1,y1,z0);
			// two triangle two pairs of three vertices
			v0.push(x1,y1,z0);
			if (i == 3) {
				v0.push(x1,y1,z0);
			}
		}
		v0.push(v0[3],v0[4],v0[5]);
		geo.a.b.concat(v0);
		// update for CCW triangle winding
		// in webgl face culling
		// color
		geo.a.c = [];
		for (let i = 0; i < 4; i++) {
			i0 = i * 4;
			geo.a.c[i0+0] = rgba.rb();
			geo.a.c[i0+1] = rgba.rb();
			geo.a.c[i0+2] = rgba.rb();
			geo.a.c[i0+3] = 255;
		}
		console.log(geo.a);
	},
	init2() {
		geo.b = {};
		// bkgd quad
		geo.b.a = new THREE.BufferGeometry();
		// vert
		geo.b.b = [];
		// explicit ccw triangle 
		// first one
		geo.b.b.concat([-512,-512,0]);
		geo.b.b.concat([512,512,0]);
		geo.b.b.concat([-512,512,0]);
		// second two
		geo.b.b.concat([-512,-512,0]);
		geo.b.b.concat([512,-512,0]);
		geo.b.b.concat([512,512,0]);
		// color
		geo.b.c = [];
		for (let i = 0; i < 4; i++) {
			i0 = i * 4;
			geo.b.c[i0+0] = rgba.rb();
			geo.b.c[i0+1] = rgba.rb();
			geo.b.c[i0+2] = rgba.rb();
			geo.b.c[i0+3] = 255;
		}
		console.log(geo.b);
	},
	buff() {
		// vert
		geo.a.d = new THREE.Float32BufferAttribute(geo.a.b, 3);

		// color
		geo.a.e = new THREE.Uint8BufferAttribute(geo.a.c, 4);
		geo.a.e.normalized = true;

		// set
		geo.a.a.setAttribute('position', geo.a.d);
		geo.a.a.setAttribute('color', geo.a.e);
	},
	buff2() {
		geo.b.d = new THREE.Float32BufferAttribute(geo.b.b, 3);

		// color
		geo.b.e = new THREE.Uint8BufferAttribute(geo.b.c, 4);
		geo.b.e.normalized = true;

		// set
		geo.b.a.setAttribute('position', geo.b.d);
		geo.b.a.setAttribute('color', geo.b.e);
	},
	mat() {
		// material
		geo.c = {};
		geo.c.a = {
			"vertexShader": vs,
			"fragmentShader": fs,
			"uniforms": {time:1.0},
			"transparent": true,
			"side": THREE.DoubleSide
		};
		geo.c.b = new THREE.RawShaderMaterial(geo.c.a);
	},
	mesh() {
		geo.d = {};
		geo.d.a = new THREE.Mesh(geo.b.a,geo.c.b);
	}
}

// fragment shader
const fs = `
	precision mediump float;
	precision mediump int;

	uniform float time;

	varying vec3 vPosition;
	varying vec3 vColor;

	void main() {
		vec4 color = vec4(vColor);
		color.r += sin(vPosition.x*10*time) * 0.5;

		gl_FragColor = color;
	}
`;


// vertex shader
const vs = `
	precision mediump float;
	precision mediump int;

	uniform mat4 modelViewMatrix;
	uniform mat4 projectionMatrix;

	attribute vec3 vPosition;
	attribute vec4 vColor;

	void main() {
		vPosition = position;
		vColor = color;

		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	}
`;

// shader compiler
const frag = {
	init() {
		// do it in material
	}
}

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

