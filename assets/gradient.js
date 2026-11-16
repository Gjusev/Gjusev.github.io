// Animated grain gradient for the closing field, after a ShaderGradient preset
// (plane, colors #ff5005 / #dbba95 / #d0bce1, density 1.3, frequency 5.5, speed 0.4, rotation 50deg, grain on).
// Plain WebGL, about 1 KB of shader. Renders only while on screen; a slower drift under reduced motion.
(() => {
  document.querySelectorAll("canvas.grad").forEach(canvas => {
  const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
  if (!gl) return; // the CSS sand background stays
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const vs = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
  const fs = `precision mediump float;
uniform vec2 r;uniform float t;
const vec3 c1=vec3(1.,.314,.02),c2=vec3(.859,.729,.584),c3=vec3(.816,.737,.882);
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1,0)),u.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p*=2.03;a*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/r;vec2 p=(uv-.5)*vec2(r.x/r.y,1.);
  float a=.873;p=mat2(cos(a),-sin(a),sin(a),cos(a))*p+vec2(-.35,0.);
  float s=t*.4;
  float q=fbm(p*1.3+vec2(s*.12,-s*.09));
  float w=sin((p.x+q*1.8)*5.5*.55+s)*.5+.5;
  vec3 col=mix(c2,c1,smoothstep(.2,.9,w));
  col=mix(col,c3,smoothstep(.5,.95,fbm(p*1.3*1.4-vec2(s*.07))));
  col*=1.06;
  col+=(h(gl_FragCoord.xy+fract(t*7.))-.5)*.09;
  gl_FragColor=vec4(col,1.);
}`;
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
  const prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const uR = gl.getUniformLocation(prog, "r"), uT = gl.getUniformLocation(prog, "t");

  const size = () => {
    const k = Math.min(devicePixelRatio, 1) * .6; // grain hides the low resolution
    canvas.width = Math.max(1, canvas.clientWidth * k | 0); canvas.height = Math.max(1, canvas.clientHeight * k | 0);
    gl.viewport(0, 0, canvas.width, canvas.height); gl.uniform2f(uR, canvas.width, canvas.height);
  };
  const draw = time => { gl.uniform1f(uT, time); gl.drawArrays(gl.TRIANGLES, 0, 3); };
  size(); addEventListener("resize", size);
  canvas.classList.add("on");
  const speed = reduce ? .35 : 1; // a slow colour drift stays: it does not move anything across the screen

  let raf = 0, t0 = performance.now() - 8000;
  const loop = now => { draw((now - t0) / 1000 * speed); raf = requestAnimationFrame(loop); };
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !raf) raf = requestAnimationFrame(loop);
    else if (!e.isIntersecting && raf) { cancelAnimationFrame(raf); raf = 0; }
  }).observe(canvas);
  });
})();
