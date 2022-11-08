
uniform float uTime;
uniform float uGrayMix;

varying vec2 vUv;
varying vec3 vPosition;

vec4 firstColor = vec4(228.0/225.,101.0/225.,65.0/225.,1.0);
vec4 middleColor =  vec4(18.0/225.,51.0/225.,96.0/225.,1.0); 
vec4 endColor =    vec4(171.0/225.,31.0/225.,117.0/225.,1.0);
vec4 defaultColor = vec4(23./255.,23./255.,23./255.,0.0);

//Noise
float mod289(float x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 perm(vec4 x){return mod289(((x*34.)+1.)*x);}

float noise(vec3 p){
    vec3 a=floor(p);
    vec3 d=p-a;
    d=d*d*(3.-2.*d);
    
    vec4 b=a.xxyy+vec4(0.,1.,0.,1.);
    vec4 k1=perm(b.xyxy);
    vec4 k2=perm(k1.xyxy+b.zzww);
    
    vec4 c=k2+a.zzzz;
    vec4 k3=perm(c);
    vec4 k4=perm(c+1.);
    
    vec4 o1=fract(k3*(1./41.));
    vec4 o2=fract(k4*(1./41.));
    
    vec4 o3=o2*d.z+o1*(1.-d.z);
    vec2 o4=o3.yw*d.x+o3.xz*(1.-d.x);
    
    return o4.y*d.y+o4.x*(1.-d.y);
}

mat2 rotate2D(float angle){
    return mat2(
        cos(angle),-sin(angle),
        sin(angle),cos(angle)
    );
}

void main()
{

   
    float n=noise(vPosition+uTime/2.);
    vec2 baseUv=rotate2D(n/2.*-1.1)*(vPosition.xy+0.8);

    vec2 xy = baseUv.xy;
    float h = 0.5; // adjust position of middleColor
    vec4 col = mix(mix(firstColor, middleColor, xy.x/h), mix(middleColor, endColor, (xy.x - h)/(1.0 - h)), step(h, xy.x));
    vec4 colWithGray = mix(col,defaultColor,uGrayMix);

    gl_FragColor=vec4(colWithGray);
  
}

