import * as T from '../vendor/three.module.js?v=932ddd9cb928';

// Locally generated, scale-aware material detail: no network textures.
export function graniteMaterial(material,{strength=.46,joints=false}={}){
 const original=material.onBeforeCompile,cache=material.customProgramCacheKey();
 material.onBeforeCompile=shader=>{
  original.call(material,shader);
  shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vGraniteP; varying vec3 vGraniteN;').replace('#include <begin_vertex>',`#include <begin_vertex>
   vec4 graniteP=vec4(position,1.0);vec3 graniteN=normal;
   #ifdef USE_INSTANCING
   graniteP=instanceMatrix*graniteP;graniteN=mat3(instanceMatrix)*graniteN;
   #endif
   vGraniteP=(modelMatrix*graniteP).xyz;vGraniteN=normalize(mat3(modelMatrix)*graniteN);`);
  shader.fragmentShader=shader.fragmentShader.replace('#include <common>',`#include <common>
   varying vec3 vGraniteP; varying vec3 vGraniteN;
   float graniteHash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
   float graniteNoise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(graniteHash(i),graniteHash(i+vec2(1.,0.)),f.x),mix(graniteHash(i+vec2(0.,1.)),graniteHash(i+vec2(1.,1.)),f.x),f.y);}`)
   .replace('#include <color_fragment>',`#include <color_fragment>
    float graniteDetail=1.0-smoothstep(95.,480.,distance(cameraPosition,vGraniteP));
    if(graniteDetail>.001&&abs(vGraniteN.y)<.8){
     vec2 stoneUV=vec2(abs(vGraniteN.x)>.6?vGraniteP.z:vGraniteP.x,vGraniteP.y);
     float crystals=graniteNoise(stoneUV*52.),flecks=graniteHash(floor(stoneUV*120.));
     float mottling=graniteNoise(stoneUV*3.4),mica=smoothstep(.65,.84,crystals),quartz=1.-smoothstep(.2,.36,crystals);
     vec3 mineral=vec3(.87,.87,.83)*(1.-mica*.41)+quartz*.13+vec3(.075,.027,.018)*mottling;
     mineral+=step(.985,flecks)*.18*(1.-smoothstep(10.,55.,distance(cameraPosition,vGraniteP)));
     diffuseColor.rgb*=mix(vec3(1.),mineral,${strength.toFixed(3)}*graniteDetail);
     ${joints?`vec2 joint=fract(stoneUV/vec2(.83,.39)+vec2(floor(stoneUV.y/.39)*.5,0.));float grout=max(1.-smoothstep(.0,.025,joint.y),1.-smoothstep(.0,.014,joint.x));diffuseColor.rgb*=1.-grout*.12*graniteDetail;`:''}
    }`);
 };
 material.customProgramCacheKey=()=>cache+'-granite-crystals-v1-'+strength+'-'+joints;
 return material;
}

let leafMap;
export function foliageMaterial(){
 if(!leafMap){
  const canvas=document.createElement('canvas');canvas.width=canvas.height=256;const c=canvas.getContext('2d');
  // A repeating leaf cluster gives crowns speckled light and irregular leaf edges.
  c.fillStyle='#a4af93';c.fillRect(0,0,256,256);let seed=71483;
  const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
  for(let i=0;i<1400;i++){const x=rnd()*256,y=rnd()*256,light=86+Math.floor(rnd()*90);c.save();c.translate(x,y);c.rotate(rnd()*6.28);c.fillStyle=`rgb(${light-12},${light+12},${light-25})`;c.beginPath();c.ellipse(0,0,2+rnd()*3,1+rnd()*1.7,0,0,6.28);c.fill();if(i%5===0){c.strokeStyle='#bfc7a5';c.lineWidth=.5;c.beginPath();c.moveTo(-2,0);c.lineTo(2,0);c.stroke()}c.restore();}
  leafMap=new T.CanvasTexture(canvas);leafMap.colorSpace=T.SRGBColorSpace;leafMap.wrapS=leafMap.wrapT=T.RepeatWrapping;leafMap.repeat.set(2,2);leafMap.anisotropy=2;
 }
 const mat=new T.MeshLambertMaterial({map:leafMap,color:'#d3e0c0'});
 mat.userData.foliage=true;
 mat.onBeforeCompile=s=>{
  s.uniforms.leafTime={value:0};mat.userData.leafUniform=s.uniforms.leafTime;
  s.vertexShader='uniform float leafTime;\n'+s.vertexShader;
  s.vertexShader=s.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>
   #ifdef USE_INSTANCING
   float treePhase=instanceMatrix[3].x*.17+instanceMatrix[3].z*.11;
   transformed.x+=sin(leafTime*.9+treePhase+position.y*3.)*.026;
   transformed.z+=cos(leafTime*.7+treePhase)*.017;
   #endif`);
 };
 mat.customProgramCacheKey=()=> 'leaf-cluster-wind-v1';return mat;
}
export function barkMaterial(){
 const mat=new T.MeshLambertMaterial({color:'#756a57'});
 mat.onBeforeCompile=s=>{s.vertexShader=s.vertexShader.replace('#include <common>','#include <common>\nvarying vec2 barkUV;').replace('#include <uv_vertex>','#include <uv_vertex>\nbarkUV=uv;');s.fragmentShader=s.fragmentShader.replace('#include <common>','#include <common>\nvarying vec2 barkUV;').replace('#include <color_fragment>',`#include <color_fragment>
 float furrow=sin(barkUV.x*150.+sin(barkUV.y*16.)*1.8)*.5+.5;
 float rough=fract(sin(dot(floor(barkUV*vec2(200.,80.)),vec2(13.1,73.7)))*43758.5);
 diffuseColor.rgb*=.67+furrow*.30+rough*.17;`)};
 mat.customProgramCacheKey=()=> 'bark-furrows-v1';return mat;
}
