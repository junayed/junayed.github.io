import * as T from '../vendor/three.module.js';
import {part,textSign,material} from './models.js';

// Activity anchors share the ordinary crowd collision and pursuit system.
export function addNeighbourhoodLife(life){
 const town=life.town;life.activities=[];life.nightDecor=[];life.playBalls=[];life.warmLights=[];
 const sphere=new T.IcosahedronGeometry(1,1),cone=new T.ConeGeometry(1,1,8);
 const glowMat=life.glowMaterial=new T.ShaderMaterial({transparent:true,depthWrite:false,blending:T.AdditiveBlending,uniforms:{tint:{value:new T.Color('#ffc17b')}},vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'varying vec2 vUv;uniform vec3 tint;void main(){float d=length(vUv-.5)*2.;gl_FragColor=vec4(tint,pow(max(0.,1.-d),2.)*.45);}'});
 function anchor(g,x,y,z,kind='seated',phase=0){const marker=new T.Object3D();marker.position.set(x,y,z);marker.rotation.y=phase;g.add(marker);life.activities.push({marker,kind,phase});}
 function light(g,x,z){const pool=new T.Mesh(new T.PlaneGeometry(18,18),glowMat);pool.rotation.x=-Math.PI/2;pool.position.set(x,.21,z);g.add(pool);life.nightDecor.push(pool);}
 const sites=[[-261,-102,'THE FLY CUP','#658a80'],[-174,-25,'GRANITE & GROUNDS','#77618e'],[146,-153,'A WEE SCOOP','#c98691'],[1085,-775,'SEA SALT SCOOPS','#78a6b0'],[1096,-699,'THE COASTAL CUP','#638c82'],[1145,-599,'CONE ON THEN','#d29f5e']];
 for(let index=0;index<sites.length;index++){
  const[x,z,name,color]=sites[index],p=life.point(x,z),safe=town.safePoint(...p,2.5),g=new T.Group();g.position.set(safe.x,0,safe.z);g.rotation.y=.7458437691155841;life.scene.add(g);
  // Open carts and parasols leave sightlines to the civic and coastal landmarks.
  part(g,color,0,.8,0,3.1,1.5,1.3);part(g,'#f2dfb9',0,1.6,.1,3.4,.14,1.6);for(const xx of[-1.45,1.45])part(g,'#e2c9a3',xx,2.25,0,.07,1.4,.07);
  for(let i=0;i<7;i++)part(g,i%2?'#f6ecd1':color,-1.5+i*.5,2.9,0,.5,.13,2.1);
  const sign=textSign(name,{width:3.3,height:.48,bg:color,fg:'#fff1d1'});sign.position.set(0,2.55,.7);g.add(sign);
  if(index%2){for(const xx of[-.7,0,.7])part(g,['#e4b8ad','#d4c494','#a68a73'][Math.round((xx+.7)/.7)],xx,1.8,.15,.36,.3,.36,sphere);}else{part(g,'#b1b9b2',-.6,1.98,0,.7,.65,.55);part(g,'#2e4244',-.6,1.95,.3,.5,.25,.05);}
  for(let i=0;i<3;i++){const xx=(i-1)*3.3,zz=3.5+(i%2)*1.5;part(g,'#b88c64',xx,.85,zz,1.6,.13,1.2);part(g,'#3e5452',xx,.43,zz,.12,.85,.12);for(const side of[-1,1]){part(g,color,xx+side*1.15,.5,zz,.6,.12,.6);part(g,color,xx+side*1.38,.85,zz,.12,.75,.65);anchor(g,xx+side*1.15,-.42,zz,'seated',side<0?Math.PI/2:-Math.PI/2);}part(g,'#fff0d3',xx+.3,1.02,zz,.13,.24,.13);if(i===1){part(g,'#f0dcaa',xx,1.8,zz,.06,3.5,.06);part(g,color,xx,3.2,zz,2.6,.6,2.6,cone);}}
  for(const xx of[-5.5,5.5]){part(g,'#a98363',xx,.4,3,.9,.8,.9);part(g,'#5e805b',xx,1.05,3,.8,.9,.8,sphere);for(let j=0;j<4;j++)part(g,j%2?'#e7bc74':'#dba0b5',xx+Math.cos(j*1.57)*.25,1.45,3+Math.sin(j*1.57)*.25,.17,.17,.17,sphere);}
  light(g,0,3);anchor(g,0,0,-1,'vendor',Math.PI);anchor(g,2.2,0,1.9,'queue',0);
 }
 // More planting inside the mapped gardens, away from roads and solid footprints.
 let planted=0;
 for(let i=0;i<95;i++){const x=-482+(i%10)*13,z=-187+Math.floor(i/10)*16,p=life.point(x,z);if(!town.collision.blocked(...p,1.5)&&inGarden(x,z)&&roadClear(town,...p,3)){
  town.tree(p[0],p[1],.65+(i%4)*.13);planted++;
  for(let j=0;j<3;j++)town.box(['#73966c','#567b5d','#85a16f'][j],p[0]+j*.65,.4,p[1]+1.5,.9,.75,.9);
 }}
 // Small planted verges frame the promenade; keep the carriageway clear.
 for(let i=0;i<42;i++){const p=life.point(1060+(i%3)*8,-905+Math.floor(i/3)*23);if(!town.collision.blocked(...p,1.6)&&roadClear(town,...p,3.2)){town.tree(p[0],p[1],.62+i%3*.1);planted++;}}
 // Adults playing a small kickabout: a moving ball and gathering, not an empty lawn.
 for(const source of[[-448,-142],[1065,-820]]){const p=life.point(...source),safe=town.safePoint(...p,3),g=new T.Group();g.position.set(safe.x,0,safe.z);life.scene.add(g);const ball=part(g,'#f0debd',0,.35,0,.3,.3,.3,sphere);life.playBalls.push(ball);for(let i=0;i<5;i++)anchor(g,Math.sin(i*1.256)*4,0,Math.cos(i*1.256)*4,'play',i*1.256);}
 for(const source of[[-25,-315],[16,-285],[1080,-750],[1140,-605]]){const p=life.point(...source),lamp=new T.PointLight('#ffc88a',0,32,1.5);lamp.position.set(p[0],4,p[1]);life.scene.add(lamp);life.warmLights.push(lamp);}
 life.stats={cafes:sites.length,extraTrees:planted,activityAnchors:life.activities.length};
}
function inGarden(x,z){return x>-490&&x<-350&&z>-190&&z<-25&&Math.abs((z+173)-(x+489)*1.07)<34;}
function roadClear(town,x,z,margin){for(const r of town.roads){if(r.width<4)continue;for(let i=1;i<r.points.length;i++){const a=r.points[i-1],b=r.points[i],dx=b[0]-a[0],dz=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(z-a[1])*dz)/(dx*dx+dz*dz||1)));if(Math.hypot(x-a[0]-dx*t,z-a[1]-dz*t)<r.width/2+margin)return false;}}return true;}
