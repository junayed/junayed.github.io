// Adapted locally from the supplied city source; see PROVENANCE.md.
import * as T from '../vendor/three.module.js?v=fbce123b9ec4';
import {COAST} from './coast-data.js?v=fbce123b9ec4';

// Location/footprint data: © OpenStreetMap contributors, ODbL.
// Reference guided, deliberately lightweight architecture, not a surveyed reconstruction.
// Ballroom form: Historic Environment Scotland, LB20314:
// https://portal.historicenvironment.scot/designation/LB20314
// Ride vocabulary: https://www.codonas.com/info (Grampian Eye, Apple Coaster,
// Galleon, Waltzers). Ride centres from the bounded OSM attraction extract,
// including https://www.openstreetmap.org/node/6554930254 (Grampian Eye).
// Shapes remain approximate. Generic building=yes polygons wholly within the
// amusement park describe ride enclosures/supports, so receive venue models.
export const COAST_SKIP_IDS=new Set([COAST.ballroom.id,COAST.arcade.id,COAST.waltzer.id,...COAST.cottages.map(b=>b.id),...COAST.rideBuildings.map(b=>b.id)]);
const project=p=>[(p[0]+2.097)*111320*Math.cos(57.146*Math.PI/180),-(p[1]-57.146)*111320];
const UP=new T.Vector3(0,1,0);
function builder(){
 const arrays=new Map(),matrix=new T.Matrix4(),quaternion=new T.Quaternion(),scale=new T.Vector3(1,1,1),colour=new T.Color();
 const materials={solid:new T.MeshLambertMaterial({vertexColors:true}),glass:new T.MeshPhongMaterial({vertexColors:true,shininess:75,specular:0xabc8d3}),glow:new T.MeshBasicMaterial({vertexColors:true})};
 function add(geometry,color,pos=[0,0,0],rotation=0,kind='solid',quat=null){
  quaternion.copy(quat||new T.Quaternion().setFromAxisAngle(UP,rotation));matrix.compose(new T.Vector3(...pos),quaternion,scale);geometry.applyMatrix4(matrix);
  if(geometry.index){const old=geometry;geometry=geometry.toNonIndexed();old.dispose()}
  let a=arrays.get(kind);if(!a){a={p:[],n:[],c:[]};arrays.set(kind,a)}colour.set(color);
  const ps=geometry.attributes.position.array,ns=geometry.attributes.normal.array;
  for(let i=0;i<ps.length;i+=3){a.p.push(ps[i],ps[i+1],ps[i+2]);a.n.push(ns[i],ns[i+1],ns[i+2]);a.c.push(colour.r,colour.g,colour.b)}geometry.dispose();
 }
 const box=(color,x,y,z,w,h,d,angle=0,kind='solid')=>add(new T.BoxGeometry(w,h,d),color,[x,y,z],angle,kind);
 const cyl=(color,x,y,z,r,h,rt=r,segments=10)=>add(new T.CylinderGeometry(rt,r,h,segments),color,[x,y,z]);
 function beam(color,a,b,r=.12){const av=new T.Vector3(...a),bv=new T.Vector3(...b),diff=bv.clone().sub(av);add(new T.CylinderGeometry(r,r,diff.length(),5),color,av.add(bv).multiplyScalar(.5).toArray(),0,'solid',new T.Quaternion().setFromUnitVectors(UP,diff.normalize()))}
 function poly(ring,h,color,y=0){const shape=new T.Shape(ring.map(p=>new T.Vector2(p[0],-p[1])));const g=new T.ExtrudeGeometry(shape,{depth:h,bevelEnabled:false,curveSegments:1});g.rotateX(-Math.PI/2);add(g,color,[0,y,0])}
 function finish(parent){let triangles=0,drawCalls=0;for(const [kind,a] of arrays){const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(a.p,3));g.setAttribute('normal',new T.Float32BufferAttribute(a.n,3));g.setAttribute('color',new T.Float32BufferAttribute(a.c,3));g.computeBoundingSphere();const m=new T.Mesh(g,materials[kind]);m.castShadow=true;m.receiveShadow=true;m.userData.coastal=true;parent.add(m);triangles+=a.p.length/9;drawCalls++}return {triangles,drawCalls}}
 return {add,box,cyl,beam,poly,finish};
}
function local(B,origin,angle=0){const c=Math.cos(angle),s=Math.sin(angle),point=(x,z)=>[origin[0]+c*x+s*z,origin[1]-s*x+c*z];return {point,angle,box:(color,x,y,z,w,h,d,kind='solid')=>{const p=point(x,z);B.box(color,p[0],y,p[1],w,h,d,angle,kind)},beam:(col,a,b,r)=>{const p=point(a[0],a[2]),q=point(b[0],b[2]);B.beam(col,[p[0],a[1],p[1]],[q[0],b[1],q[1]],r)}}}
function bounds(ring){let a,b,len=0;for(let i=1;i<ring.length;i++){const p=ring[i-1],q=ring[i],l=Math.hypot(p[0]-q[0],p[1]-q[1]);if(l>len){a=p;b=q;len=l}}const angle=-Math.atan2(b[1]-a[1],b[0]-a[0]),c=Math.cos(angle),s=Math.sin(angle),pts=ring.map(p=>[p[0]*c-p[1]*s,p[0]*s+p[1]*c]),xs=pts.map(p=>p[0]),zs=pts.map(p=>p[1]),x=(Math.min(...xs)+Math.max(...xs))/2,z=(Math.min(...zs)+Math.max(...zs))/2;return {origin:[x*c+z*s,-x*s+z*c],angle,w:Math.max(...xs)-Math.min(...xs),d:Math.max(...zs)-Math.min(...zs)}}
function gable(B,L,w,d,y,rise,color='#536372'){
 const vertices=[-w/2,0,-d/2,w/2,0,-d/2,w/2,0,d/2,-w/2,0,d/2,-w/2,rise,0,w/2,rise,0];
 const indices=[0,4,5,0,5,1,3,2,5,3,5,4,0,3,4,1,5,2];
 const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(vertices,3));g.setIndex(indices);g.computeVertexNormals();B.add(g,color,[L.point(0,0)[0],y,L.point(0,0)[1]],L.angle);
}
function sign(scene,text,position,width,height,bg='#215d66',angle=0){const c=document.createElement('canvas');c.width=1024;c.height=128;const x=c.getContext('2d');x.fillStyle=bg;x.fillRect(0,0,1024,128);x.strokeStyle='#eed8ac';x.lineWidth=7;x.strokeRect(8,8,1008,112);x.font='400 62px "Super Chips"';x.textAlign='center';x.textBaseline='middle';x.fillStyle='#fff6da';x.fillText(text,512,67,970);const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;const m=new T.Mesh(new T.PlaneGeometry(width,height),new T.MeshBasicMaterial({map:tex,side:T.DoubleSide}));m.position.set(...position);m.rotation.y=angle;scene.add(m)}
function cottages(B){
 const painted=['#e8e2ca','#d3d6c7','#d7cbb2','#b9ccd0','#cfc0b4','#d3b998','#e7d9ca'];let count=0;
 for(const b of COAST.cottages){const g=bounds(b.ring),isShed=b.type==='shed'||b.type==='garage'||g.w*g.d<24,h=isShed?2.05:3.65,rise=isShed?.85:1.85,L=local(B,g.origin,g.angle);B.poly(b.ring,h,painted[count%painted.length]);gable(B,L,g.w+.25,g.d+.3,h,rise,count%7===0?'#9c654e':'#4b5961');
  for(const side of [-1,1]){const F=local(B,L.point(0,side*g.d/2),side<0?g.angle+Math.PI:g.angle);F.box('#7b8985',0,.17,.06,g.w,.34,.16);F.box('#cbd0ca',0,h-.12,.1,g.w,.18,.28);if(isShed){F.box(['#337a80','#b96846','#586b4c','#d8ad61'][count%4],0,.9,.12,Math.min(1.2,g.w*.6),1.8,.15)}else{const n=Math.max(1,Math.floor(g.w/3.8));for(let i=0;i<n;i++){const x=-g.w/2+(i+.5)*g.w/n;if(i===Math.floor(n/2)&&side>0){F.box(['#406d7b','#9b4e3d','#294f42'][count%3],x,1.18,.12,1.05,2.35,.2);F.box('#c5c7bc',x,2.4,.17,1.35,.18,.35);F.box('#c6b581',x+.35,1.15,.24,.07,.1,.04)}else{F.box('#e9e5d5',x,1.98,.11,1.25,1.5,.14);F.box('#446576',x,1.98,.2,1.04,1.26,.05,'glass');F.box('#e3ded0',x,1.98,.25,.07,1.3,.06);F.box('#e3ded0',x,1.98,.25,1.1,.07,.06);F.box('#d2d4c9',x,1.18,.21,1.42,.13,.4)}}}
  }
  if(!isShed&&g.w>5){L.box('#b2afa2',g.w*.28,h+rise-.1,0,.65,1.8,.7);L.box('#d4ccbb',g.w*.28,h+rise+.83,0,.85,.16,.9);for(const dx of [-.16,.16]){const p=L.point(g.w*.28+dx,0);B.cyl('#8d5b47',p[0],h+rise+1.1,p[1],.1,.5,.11,6)}}count++;
 }
 return count;
}
function ballroom(B,scene){const ring=COAST.ballroom.ring;B.poly(ring,6.1,'#cfc8ac');B.poly(ring,.65,'#8d9691');
 // Octagonal central hall, terracotta pyramidal roof and open arcaded lantern.
 const centre=project([-2.079733,57.155229]);B.cyl('#ded3ad',centre[0],7.2,centre[1],18.8,3.1,18.8,8);B.cyl('#ece2c5',centre[0],8.8,centre[1],19.5,.3,19.5,8);B.cyl('#98573b',centre[0],12.5,centre[1],18.7,7.1,4.5,8);B.cyl('#c9c3a8',centre[0],16.2,centre[1],4.5,.45,4.5,8);B.cyl('#9a5842',centre[0],19.3,centre[1],5.1,1.8,0,8);
 for(let i=0;i<8;i++){const a=i*Math.PI/4,x=centre[0]+Math.sin(a)*3.7,z=centre[1]+Math.cos(a)*3.7;B.cyl('#e0d5b8',x,17.6,z,.23,2.6,.23,6);B.beam('#74554a',[centre[0]+Math.sin(a)*18.6,9,centre[1]+Math.cos(a)*18.6],[centre[0]+Math.sin(a)*4.6,16.1,centre[1]+Math.cos(a)*4.6],.07)}
 for(let i=1;i<ring.length;i++){const a=ring[i-1],b=ring[i],len=Math.hypot(b[0]-a[0],b[1]-a[1]);if(len<3)continue;const L=local(B,a,-Math.atan2(b[1]-a[1],b[0]-a[0]));L.box('#e8dfc3',len/2,6.25,0,len,.35,.5);for(let x=1.3;x<len-.8;x+=3){L.box('#b1aa90',x,3.8,.1,1.75,2.75,.2);L.box('#546b71',x,3.8,.23,1.5,2.5,.07,'glass');for(const yy of [2.95,3.8,4.65])L.box('#d2cfba',x,yy,.29,1.5,.065,.07);L.box('#d2cfba',x,3.8,.3,.07,2.5,.07)}}
 const south=project([-2.07966,57.15494]);for(const dx of [-6,-3,3,6])B.cyl('#e6dfc5',south[0]+dx,3.8,south[1]+1,.35,5.8,.35,10);B.box('#e0d6b9',south[0],6.8,south[1]+1.4,16,.65,3);B.box('#344c56',south[0],2.6,south[1]+.3,4.3,4.4,.25,0,'glass');for(let i=0;i<4;i++)B.box('#a8aaa0',south[0],.12+i*.13,south[1]+4-i*.6,17-i*.4,.24,1.3);sign(scene,'EAST PROM BALLROOM',[south[0],6.7,south[1]+3],13,1.2,'#696954');return {name:'Beach Ballroom',front:[south[0],south[1]+24],target:centre,height:18};}
function amusement(B,scene){
 B.poly(COAST.arcade.ring,7.4,'#c2c8c1');const ring=COAST.arcade.ring;
 for(let i=1;i<ring.length;i++){const a=ring[i-1],b=ring[i],len=Math.hypot(b[0]-a[0],b[1]-a[1]);if(len<6)continue;const L=local(B,a,-Math.atan2(b[1]-a[1],b[0]-a[0]));L.box('#2c7787',len/2,6.6,.15,len,1.15,.5);L.box('#b45b49',len/2,7.45,0,len,.3,1);for(let x=2;x<len-1;x+=4){L.box('#405e68',x,2.6,.15,3.1,4.6,.15,'glass');L.box('#ded8c4',x-1.7,3.3,.3,.18,6.1,.35);L.box('#dbb86a',x,4.8,.35,3.3,.3,.6)}}
 const gate=project([-2.08025,57.1506]);sign(scene,'WEE FUNFAIR',[gate[0],7.2,gate[1]+1],27,3,'#306c85');
 const wheelPos=COAST.rides['Grampian Eye'].point,rotor=new T.Group();rotor.position.set(wheelPos[0],16.4,wheelPos[1]);rotor.rotation.y=Math.PI/2;scene.add(rotor);const R=14,wb=builder();
 for(const z of [-1.25,1.25]){const torus=new T.TorusGeometry(R,.2,5,56);wb.add(torus,'#ece7cc',[0,0,z]);for(let i=0;i<18;i++){const a=i*Math.PI/9;wb.beam('#c2c9c5',[0,0,z],[Math.cos(a)*R,Math.sin(a)*R,z],.075)}}wb.add(new T.CylinderGeometry(.75,.75,4.2,12),'#dbb75b',[0,0,0],0,'solid',new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),Math.PI/2));const rotorStats=wb.finish(rotor);
 const wheelBase=local(B,wheelPos,Math.PI/2);for(const side of [-1,1])for(const dx of [-7,7])wheelBase.beam('#e2e0ca',[dx,0,side*4],[0,16.4,side*1.65],.32);wheelBase.box('#a9b2ac',0,.25,0,18,.5,9);
 const cabGeo=new T.BoxGeometry(2.15,2.2,2.5),cabMat=new T.MeshLambertMaterial({color:'#c65745'}),cabins=new T.InstancedMesh(cabGeo,cabMat,18),cabM=new T.Matrix4();cabins.instanceMatrix.setUsage(T.DynamicDrawUsage);scene.add(cabins);const cabColors=['#ce5d49','#daae4c','#377f91','#7b9c66'];for(let i=0;i<18;i++)cabins.setColorAt(i,new T.Color(cabColors[i%4]));
 const waltzer=project([-2.079645,57.151767]);B.poly(COAST.waltzer.ring,1,'#a08b68');B.cyl('#d4b956',waltzer[0],1.25,waltzer[1],10,.6,10,24);B.cyl('#b94f48',waltzer[0],7.3,waltzer[1],11,3,0,24);for(let i=0;i<12;i++){const a=i*Math.PI/6,x=waltzer[0]+Math.cos(a)*9,z=waltzer[1]+Math.sin(a)*9;B.cyl('#e4d9b1',x,3.9,z,.14,5.2,.14,6);B.box('#568595',waltzer[0]+Math.cos(a)*6,1.9,waltzer[1]+Math.sin(a)*6,2.5,1.2,2,a)}
 // Small family coaster: double rails, cross sleepers and trestles, not a giant track mesh.
 const coasterBuilding=COAST.rideBuildings.find(b=>b.id==='way/1137687213'),coasterBounds=bounds(coasterBuilding.ring),coasterL=local(B,coasterBounds.origin,coasterBounds.angle);const curve=new T.CatmullRomCurve3(Array.from({length:18},(_,i)=>{const a=i*Math.PI/9,p=coasterL.point(Math.cos(a)*(coasterBounds.w/2-2),Math.sin(a)*(coasterBounds.d/2-2));return new T.Vector3(p[0],2.4+Math.pow((Math.sin(a)+1)/2,3)*5.7,p[1])}),true,'catmullrom',.45);const track=curve.getPoints(130);
 for(let i=1;i<track.length;i++){const a=track[i-1],b=track[i],side=new T.Vector3(-(b.z-a.z),0,b.x-a.x).normalize().multiplyScalar(.62);for(const s of [-1,1])B.beam('#bc5541',a.clone().addScaledVector(side,s).toArray(),b.clone().addScaledVector(side,s).toArray(),.1);if(i%3===0){B.beam('#686f68',[b.x,b.y,b.z],[b.x,.1,b.z],.13);B.beam('#9b8c60',[b.x-side.x,b.y-.15,b.z-side.z],[b.x+side.x,b.y-.15,b.z+side.z],.11)}}
 const coasterCar=new T.Group(),cb=builder();cb.box('#8ea54f',0,.5,0,2.6,1.2,1.65);cb.box('#4e6c48',0,1.2,0,1.5,.4,1.5);cb.box('#d8b856',0,1.35,-.45,1.6,.7,.15);const carStats=cb.finish(coasterCar);scene.add(coasterCar);
 // Pirate galleon with curved hull, masts, rigging and striped canopy.
 const ship=COAST.rides['The Galleon'].point;for(let i=0;i<7;i++)B.box('#825a3d',ship[0]+(i-3)*1.8,3.1+Math.abs(i-3)*.24,ship[1],1.9,2.7-Math.abs(i-3)*.25,4.8-Math.abs(i-3)*.65);for(const x of [-3,3]){B.beam('#675645',[ship[0]+x,4,ship[1]],[ship[0]+x,12,ship[1]],.14);B.beam('#e0d3aa',[ship[0]+x,10,ship[1]],[ship[0]+x,6,ship[1]+4],.045)}B.box('#d4c69f',ship[0],7.7,ship[1],8,3.5,.1);for(const x of [-8,8])B.beam('#8b764f',[ship[0]+x,0,ship[1]-4],[ship[0],15,ship[1]],.3);
 // These low timber huts, karting canopy and raised rope-course decks are
 // venue structures, not the ten-metre residential fallback used elsewhere.
 for(const b of COAST.rideBuildings){if(b.id===coasterBuilding.id)continue;const g=bounds(b.ring),L=local(B,g.origin,g.angle),raised=!!b.raised;B.poly(b.ring,raised?.5:2.5,raised?'#9f8f67':'#a6a899',raised?5.5:0);if(raised){for(const x of [-g.w*.35,g.w*.35])for(const z of [-g.d*.35,g.d*.35])L.beam('#8d8567',[x,0,z],[x,6,z],.16)}else{gable(B,L,g.w+.1,g.d+.1,2.5,.65,'#627b78');L.box('#436b76',0,1.5,g.d/2+.05,Math.min(g.w*.65,4),1.3,.1,'glass')}}
 const drop=COAST.rides["Dead Man's Drop Tower"].point;for(const dx of [-1,1]){B.beam('#c4b76e',[drop[0]+dx,0,drop[1]],[drop[0]+dx,24,drop[1]],.14);B.box('#b75242',drop[0]+dx,9,drop[1]+.5,1.3,1.4,1.2)}B.beam('#cfbb6a',[drop[0]-1,24,drop[1]],[drop[0]+1,24,drop[1]],.17);
 return {view:{name:"Codona's & Beach",front:[wheelPos[0]-18,wheelPos[1]+27],target:wheelPos,height:30.5},stats:{triangles:rotorStats.triangles+carStats.triangles+18*12,drawCalls:rotorStats.drawCalls+carStats.drawCalls+1},update:t=>{rotor.rotation.z=t*.065;for(let i=0;i<18;i++){const a=t*.065+i*Math.PI/9;cabM.makeRotationY(Math.PI/2);cabM.setPosition(wheelPos[0],15.3+Math.sin(a)*R,wheelPos[1]-Math.cos(a)*R);cabins.setMatrixAt(i,cabM)}cabins.instanceMatrix.needsUpdate=true;const f=(t*.022)%1,p=curve.getPointAt(f),tangent=curve.getTangentAt(f);coasterCar.position.copy(p);coasterCar.rotation.y=Math.atan2(tangent.x,tangent.z);}};
}
function boats(B){const anchors=[[-2.0826,57.14212],[-2.0849,57.14252],[-2.0880,57.1419],[-2.0753,57.14282]];let i=0;for(const ll of anchors){const p=project(ll),L=local(B,p,i++===3?.35:-.65),w=i===3?5.5:7.5,len=i===3?17:28;for(let n=0;n<6;n++){const z=-len/2+(n+.5)*len/6,width=w*Math.min(1,.45+n*.18);L.box(i%2?'#3e5e6c':'#4e6880',0,.75,z,width,1.6,len/6+.05)}L.box('#d5d1b9',0,2.6,-3,w*.8,2.4,len*.3);L.box('#dee2d7',0,4.6,-3,w*.7,1.6,len*.25);L.box('#476876',0,4.8,-len*.125-3-.06,w*.58,.8,.1,'glass');L.box('#bb7e46',0,2.1,len*.27,w*.8,.2,len*.35);L.beam('#bcc8c2',[0,5,-3],[0,11,-3],.1);L.beam('#c5cfca',[-3,9,-3],[3,9,-3],.06);for(const x of [-w/2,w/2])for(let z=-len*.35;z<len*.4;z+=3)L.box('#172c31',x,1.4,z,.45,.75,.8)}return anchors.length;}
export function addCoast(scene,MAP){const B=builder(),n=cottages(B),ballBuilder=builder(),ballGroup=new T.Group(),ball=ballroom(ballBuilder,ballGroup);ballBuilder.finish(ballGroup);ballGroup.position.set(-5,0,280);scene.add(ballGroup);const rides=amusement(B,scene),boatBuilder=builder(),boatCount=boats(boatBuilder),boatGroup=new T.Group(),boatStats=boatBuilder.finish(boatGroup),stats=B.finish(scene),fittie=project([-2.07165,57.14365]),harbour=project([-2.0748,57.1423]);boatGroup.userData.noTerrain=true;scene.add(boatGroup);return {update:rides.update,views:{codonas:rides.view,ballroom:ball,footdee:{name:'Footdee / Fittie',front:[fittie[0]-18,fittie[1]+10],target:fittie,height:9},harbour:{name:'Harbour mouth',front:[harbour[0]+20,harbour[1]+30],target:harbour,height:20}},stats:{triangles:stats.triangles+boatStats.triangles+rides.stats.triangles,drawCalls:stats.drawCalls+boatStats.drawCalls+rides.stats.drawCalls+2,cottages:n,boats:boatCount},skipIds:COAST_SKIP_IDS};}
