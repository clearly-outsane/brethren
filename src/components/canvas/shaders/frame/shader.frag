uniform float uTime;
uniform float uYBorder;
uniform float uOverallProgress;

varying vec2 vUv;
varying vec3 vPosition;


void main()
{

     float strength = step(uOverallProgress, max(abs(vUv.x - 0.49 )/1.15, abs(vUv.y - 0.5 )/(1.+uYBorder)));

    gl_FragColor = vec4(23./225.,23./225.,23./225.,strength);
} 