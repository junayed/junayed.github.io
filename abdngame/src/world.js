import * as T from '../vendor/three.module.js?v=eab55fb4e400';
import{createChargingBay}from'./charging-bay.js?v=eab55fb4e400';
import{Batch,material,part,textSign,propModel,createBus}from'./models.js?v=eab55fb4e400';
import{buildCollege}from'./college.js?v=eab55fb4e400';
import{COLLEGE,HOMES}from'./city-source-data.js?v=eab55fb4e400';
import{CollisionWorld,Pathfinder}from'./collision.js?v=eab55fb4e400';
import{seeded,districtAt}from'./rules.js?v=eab55fb4e400';
const treeGeo=new T.IcosahedronGeometry(1,1),poleGeo=new T.CylinderGeometry(1,1,1,7);
export class Town{
 constructor(scene){this.scene=scene;this.collision=new CollisionWorld();this.batch=new Batch(scene);this.random=seeded(5644);this.props=[];this.buildings=[];this.lamps=[];this.charges=[{x:-46,z:-42},{x:-218,z:139},{x:190,z:118}];this.traffic=[];this.gulls=[];
 this.roads=[{points:[[-145,-180],[-145,155],[185,155],[185,-78],[-145,-78]],width:12},{points:[[-220,-180],[-220,155],[-145,155]],width:11},{points:[[-220,-180],[-145,-180]],width:11},{points:[[0,-78],[0,155]],width:12},{points:[[-145,46],[185,46]],width:11},{points:[[151,-170],[151,-78]],width:10}];
 this.buildGround();this.buildCollege();this.buildBlocks();this.buildProm();this.streetLife();this.buildChargePoints();this.batch.finish();this.pathfinder=new Pathfinder(this.collision);this.busRoute=[[-141,-74],[180,-74],[180,150],[-141,150],[-141,-74]];
 for(let i=0;i<4;i++){const mesh=createBus(['#725388','#9c684d','#4d8276','#9c575e'][i]);scene.add(mesh);this.traffic.push({mesh,d:i*430,speed:6+i,x:0,z:0,angle:0});}
 this.makeGulls();this.spawnAreas=[{x:0,z:-60,w:115,d:74,count:65},{x:0,z:49,w:250,d:30,count:23},{x:188,z:22,w:24,d:220,count:29},{x:-220,z:0,w:28,d:270,count:25}];
 }
 box(color,x,y,z,w,h,d,angle=0,geometry){this.batch.add(color,x,y,z,w,h,d,angle,geometry);}
 solid(x,z,w,d){this.collision.addBox(x,z,w,d);this.buildings.push({x,z,w,d});}
 plane(color,x,z,w,d,y=0){this.box(color,x,y,z,w,.08,d);}
 buildGround(){this.plane('#8e9b83',-25,-25,610,620,-.2);this.plane('#c0beb0',-30,-20,490,470,-.12);
  for(const r of this.roads)for(let i=1;i<r.points.length;i++){const a=r.points[i-1],b=r.points[i],len=Math.hypot(b[0]-a[0],b[1]-a[1]),angle=-Math.atan2(b[1]-a[1],b[0]-a[0]);this.box('#c8c6b7',(a[0]+b[0])/2,.025,(a[1]+b[1])/2,len+7,.12,r.width+7,angle);this.box('#656d73',(a[0]+b[0])/2,.10,(a[1]+b[1])/2,len+1,.06,r.width,angle);for(let s=4;s<len;s+=10){const x=a[0]+(b[0]-a[0])*s/len,z=a[1]+(b[1]-a[1])*s/len;this.box('#ded9bd',x,.14,z,3,.02,.13,angle);}}
  this.plane('#c4c1ae',0,-63,155,98,.12);for(let x=-75;x<=75;x+=6)this.box('#b8b6a5',x,.17,-63,.07,.02,95);for(let z=-108;z<-15;z+=6)this.box('#b8b6a5',0,.17,z,150,.02,.07);
  // White crossings remain easy to see from the arcade camera.
  for(const[x,z,rotate]of[[0,-77,0],[-145,46,1],[0,46,0],[185,46,1]])for(let j=-4;j<=4;j+=1.5)this.box('#eee8d2',x+(rotate?0:j),.18,z+(rotate?j:0),rotate?4:.65,.03,rotate?.65:4);
  // The seafront has a broad promenade and a separate sandy edge.
  this.plane('#d9c89e',233,-10,35,500,-.02);this.plane('#b7b5a7',201,-15,27,490,.13);for(let z=-245;z<205;z+=5)this.box('#9c9d96',202,.19,z,25,.02,.06);
  const waterG=new T.PlaneGeometry(420,850,50,60);waterG.rotateX(-Math.PI/2);this.waterBase=waterG.attributes.position.array.slice();this.water=new T.Mesh(waterG,new T.MeshPhongMaterial({color:'#6f9faa',shininess:80,specular:'#d2e7db',transparent:true,opacity:.95}));this.water.position.set(454,-.3,-25);this.water.receiveShadow=true;this.scene.add(this.water);
  const foam=new T.Mesh(new T.PlaneGeometry(1.6,500),new T.MeshBasicMaterial({color:'#e6eee1',transparent:true,opacity:.5}));foam.rotation.x=-Math.PI/2;foam.position.set(246,.02,-25);this.scene.add(foam);
 }
 buildCollege(){const group=new T.Group(),result=buildCollege(group,COLLEGE),target=new T.Vector3(result.view.target[0],0,result.view.target[1]),front=new T.Vector3(result.view.front[0],0,result.view.front[1]),dir=front.clone().sub(target),angle=-Math.atan2(dir.x,dir.z);group.rotation.y=angle;target.applyAxisAngle(new T.Vector3(0,1,0),angle);group.position.set(-target.x,0,-154-target.z);this.scene.add(group);group.updateMatrixWorld(true);const bounds=new T.Box3().setFromObject(group);this.solid((bounds.min.x+bounds.max.x)/2,(bounds.min.z+bounds.max.z)/2,bounds.max.x-bounds.min.x,bounds.max.z-bounds.min.z);this.college=group;
  const sign=textSign('CIVIC PRIDE DAY',{width:16,height:1.4,bg:'#502270',fg:'#ffdc19'});sign.position.set(0,3.1,-106);this.scene.add(sign);for(const x of[-8,8])this.box('#3e414b',x,1.5,-106,.08,3,.08);
 }
 roof(x,z,w,d,h,color='#4a525e'){const s=new T.Shape();s.moveTo(-w/2,0);s.lineTo(0,Math.min(4,w*.32));s.lineTo(w/2,0);s.closePath();const g=new T.ExtrudeGeometry(s,{depth:d,bevelEnabled:false});g.translate(x,h,z-d/2);const mesh=new T.Mesh(g,material(color));mesh.castShadow=true;this.scene.add(mesh);}
 home(x,z,index){const data=HOMES[index%HOMES.length],ring=data[0][0],xs=ring.map(p=>p[0]),zs=ring.map(p=>p[1]),minX=Math.min(...xs),maxX=Math.max(...xs),minZ=Math.min(...zs),maxZ=Math.max(...zs),scale=18/Math.max(maxX-minX,maxZ-minZ),w=(maxX-minX)*scale,d=(maxZ-minZ)*scale,h=6+(index%3)*1.6;const pts=ring.map(p=>new T.Vector2((p[0]-(minX+maxX)/2)*scale,-(p[1]-(minZ+maxZ)/2)*scale));const g=new T.ExtrudeGeometry(new T.Shape(pts),{depth:h,bevelEnabled:false});g.rotateX(-Math.PI/2);g.translate(x,0,z);const m=new T.Mesh(g,material(['#a5aaa3','#c0bdb1','#b1b0a5'][index%3]));m.castShadow=true;m.receiveShadow=true;this.scene.add(m);this.solid(x,z,w,d);this.roof(x,z,w+1,d+1,h);this.facade(x,z,w,d,h,index);this.box('#8d8171',x+w*.27,h+2,z,1,3,1);this.box('#d6cdbb',x+w*.27,h+3.5,z,1.3,.2,1.2);return{w,d,h};}
 facade(x,z,w,d,h,i){for(const side of[-1,1])for(let xx=-w/2+2;xx<w/2-1;xx+=3.5)for(let y=2;y<h-1;y+=3){this.box('#3f5866',x+xx,y,z+side*(d/2+.04),1.2,1.6,.08);this.box('#ddd5c1',x+xx,y-.9,z+side*(d/2+.12),1.5,.12,.25);this.box('#c8c6b5',x+xx,y,z+side*(d/2+.1),.07,1.6,.08);}for(const side of[-1,1])for(let zz=-d/2+2;zz<d/2-1;zz+=3.5)for(let y=2;y<h-1;y+=3)this.box('#405a65',x+side*(w/2+.04),y,z+zz,.08,1.6,1.2);this.box('#443f48',x,1.25,z+d/2+.07,1.1,2.5,.13);}
 shop(x,z,w,d,h,name,color='#592c73'){this.box('#aaa99e',x,h/2,z,w,h,d);this.solid(x,z,w,d);this.roof(x,z,w,d,h);this.facade(x,z,w,d,h,0);this.box('#294f5b',x,1.8,z+d/2+.08,w-1,3,.1);const sign=textSign(name,{width:w-1,height:1.1,bg:color});sign.position.set(x,3.5,z+d/2+.17);this.scene.add(sign);this.box(color,x,3.8,z+d/2+1.1,w+1,.16,2.4);}
 tree(x,z,size=1){this.box('#756958',x,2*size,z,.3*size,4*size,.3*size);for(const[dx,dy,dz,c]of[[0,0,0,'#64835a'],[-.9,-.5,.2,'#799364'],[.8,-.2,.4,'#54774f']])this.box(c,x+dx*size,(4.6+dy)*size,z+dz*size,1.8*size,2*size,1.7*size,0,treeGeo);}
 buildBlocks(){for(let i=0;i<11;i++){const z=-150+i*26;for(const[x,k]of[[-251,0],[-184,11]]){const h=this.home(x,z,i+k);const front=x<-220?x+13:x-13;this.box('#a0a58d',front,.2,z,7,.3,19);this.box('#7b8f59',front,.8,z-8,6,1.3,1);this.box('#a6a590',front,.55,z+9,7,1.1,.6);if(i%2===0)this.tree(front,z-4,.7);}}
  const names=['THE FLY CUP','NAE BOTHER BAKERY','A FINE PIECE','THE WEE SHOP','CLOCKGATE BOOKS','ODDS & SODS','THE DAILY BREAD','SALT & VINEGAR'];let i=0;for(const z of[2,108])for(const x of[-105,-65,58,105]){this.shop(x,z,28,33,8+(i%3)*2.5,names[i%names.length],['#493b66','#61796b','#a86861'][i%3]);i++;}
  // Perimeter granite blocks frame the skyline, without filling unused map area.
  for(const x of[-119,-75,95,137]){this.shop(x,-224,30,35,13+(x%3)*2,'', '#68766e');}
  this.plane('#8d9f76',-101,-124,49,39,.15);for(const x of[-118,-87]){this.tree(x,-128,1.1);this.tree(x,-111,.85);}
  for(const z of[-42,8,85])this.tree(153,z,.9);
 }
 buildProm(){this.shop(155,-137,43,31,9,'THE PAVILION','#627f82');this.box('#bec0b4',155,10,-137,46,1,34);const dome=new T.Mesh(new T.SphereGeometry(9,14,8,0,Math.PI*2,0,Math.PI/2),material('#87989a'));dome.position.set(155,10.5,-137);dome.scale.set(1,.6,1);this.scene.add(dome);
  for(let z=-215;z<200;z+=18){this.box('#5b656d',214,1,z,.09,2,.09);this.box('#6e7a80',214,1.9,z+9,.07,.08,18);this.box('#6e7a80',214,.95,z+9,.07,.07,18);}
  for(let z=-90;z<145;z+=40){this.box('#896b50',203,.6,z,3,.16,.65);this.box('#896b50',203,.98,z+.3,3,.6,.12);for(const x of[202,204])this.box('#505b5b',x,.28,z,.12,.55,.55);}
  // A distant amusement silhouette sells the coast without a whole second city.
  const wheel=new T.Group();wheel.position.set(160,17,-210);wheel.rotation.y=.3;this.scene.add(wheel);const ring=new T.Mesh(new T.TorusGeometry(13,.18,5,32),material('#d6b797'));wheel.add(ring);for(let i=0;i<12;i++){const a=i*Math.PI/6,x=Math.cos(a)*13,y=Math.sin(a)*13;const spoke=part(wheel,'#d8d0ba',x/2,y/2,0,13,.06,.06);spoke.rotation.z=a;part(wheel,['#ecbd54','#b75b87','#6e9e91'][i%3],x,y-1,0,1.8,1.3,1.6);}this.wheel=wheel;for(const x of[155,165]){const leg=part(this.scene,'#949c96',x,7,-210,.4,20,.6);leg.rotation.z=x<160?-.25:.25;}
  const harbour=new T.Group();harbour.position.set(282,0,130);part(harbour,'#4d5c68',0,.5,0,12,3,30);part(harbour,'#d5d3c1',0,4,-5,8,5,10);part(harbour,'#485d6e',0,5,1,7,1.2,.1);part(harbour,'#b4aa8e',0,12,-4,.25,15,.25);this.scene.add(harbour);
 }
 lamp(x,z){this.box('#4d5963',x,2.7,z,.12,5.4,.12);this.box('#434f58',x,5.35,z,.7,.15,.7);this.box('#f2dba3',x,5.0,z,.4,.55,.4);this.lamps.push({x,z});}
 addProp(type,x,z){if(this.collision.blocked(x,z,1.2))return;const mesh=propModel(type);mesh.position.set(x,.16,z);mesh.rotation.y=this.random()*Math.PI*2;this.scene.add(mesh);this.props.push({id:this.props.length,type,x,z,r:type==='barrier'?1.15:type==='table'?1:.65,mesh,alive:true,district:districtAt(x,z)});}
 streetLife(){for(let z=-170;z<=160;z+=23){this.lamp(-153,z);this.lamp(194,z);}for(let x=-130;x<175;x+=27){this.lamp(x,38);this.lamp(x,163);}for(const x of[-66,66])for(const z of[-96,-35])this.lamp(x,z);
  // Stalls, bunting and props concentrate activity in the civic forecourt.
  for(const[x,c]of[[-47,'#ce726f'],[-24,'#b3904a'],[24,'#638980'],[48,'#775384']]){this.box('#806d56',x,1,-94,8,2,3);this.box(c,x,3,-94,9,.2,4);for(const side of[-1,1])this.box('#624e4d',x+side*3.7,1.6,-94,.1,3.2,.1);this.addProp('crate',x,-90);}
  for(let i=0;i<20;i++){const x=-65+i*6.8;this.box('#b1a993',x,5.1-Math.sin(i/19*Math.PI)*.8,-83,7,.035,.035);const tri=new T.Mesh(new T.ConeGeometry(.55,1.2,3),material(i%2?'#f4ca37':'#7e427f'));tri.rotation.z=Math.PI;tri.position.set(x,4.5-Math.sin(i/19*Math.PI)*.8,-83);this.scene.add(tri);}
  for(const[x,z]of[[12,-57],[15,-60],[18,-62],[-31,-56],[43,-65],[-56,-40],[60,-43]])this.addProp('cone',x,z);
  for(let i=0;i<30;i++){const x=-58+this.random()*116,z=-85+this.random()*59;this.addProp(['planter','table','crate','sign'][i%4],x,z);}
  for(let z=-85;z<147;z+=20){this.addProp(z%40?'table':'sign',198,z);this.addProp('planter',-211,z);}
  for(const x of[-128,-88,-48,30,75,125])for(const z of[28,64])this.addProp('sign',x,z);
  for(let i=0;i<20;i++){const x=20+i*6;this.box('#48565e',x,.5,174,.07,1,.07);this.box('#48565e',x,1,174,4.6,.06,.07);}
 }
 buildChargePoints(){for(const c of this.charges){const group=new T.Group();group.position.set(c.x,0,c.z);group.rotation.y=c.angle||0;part(group,'#55266d',0,1.4,0,1.2,2.8,.65);part(group,'#ffdc19',0,1.8,.36,.9,1,.06);part(group,'#263746',0,1.6,.41,.45,.45,.04);part(group,'#b5e6b1',0,2.75,0,1.3,.15,.75);const sign=textSign('CHARGE',{width:4.3,height:1,bg:'#315c49',fg:'#fff1b4',font:60});sign.position.set(0,4.4,0);group.add(sign);const starShape=new T.Shape();for(let i=0;i<10;i++){const a=Math.PI/2+i*Math.PI/5,r=i%2?.38:.85;i?starShape.lineTo(Math.cos(a)*r,Math.sin(a)*r):starShape.moveTo(Math.cos(a)*r,Math.sin(a)*r);}starShape.closePath();const star=new T.Mesh(new T.ExtrudeGeometry(starShape,{depth:.12,bevelEnabled:false}),new T.MeshBasicMaterial({color:'#ffdc19'}));star.position.set(0,5.9,0);group.add(star);c.star=star;this.scene.add(group);const ring=new T.Mesh(new T.RingGeometry(3.5,4.1,48),new T.MeshBasicMaterial({color:'#bcf58f',side:T.DoubleSide,transparent:true,opacity:.75}));ring.rotation.x=-Math.PI/2;ring.position.set(c.bayTarget?.x??c.x+Math.sin(c.angle||0)*3,.23,c.bayTarget?.z??c.z+Math.cos(c.angle||0)*3);this.scene.add(ring);c.ring=ring;c.target={x:ring.position.x,z:ring.position.z};c.paint=createChargingBay(c,this.scene);}}

 makeGulls(){for(let i=0;i<28;i++){const g=new T.Group();part(g,'#edead8',0,0,0,.3,.14,.55);const wings=[part(g,'#f6f2de',-.45,.06,0,.7,.05,.22),part(g,'#f6f2de',.45,.06,0,.7,.05,.22)];this.scene.add(g);this.gulls.push({mesh:g,wings,phase:i*2.1});}}
 reset(){for(const p of this.props){p.alive=true;p.mesh.visible=true;}this.traffic.forEach((b,i)=>b.d=i*430);}
 nearestCharge(x,z){return this.charges.reduce((best,c)=>Math.hypot(x-c.target.x,z-c.target.z)<Math.hypot(x-best.target.x,z-best.target.z)?c:best);}
 update(time,dt){if(this.water){const a=this.water.geometry.attributes.position;for(let i=0;i<a.count;i++){const x=this.waterBase[i*3],z=this.waterBase[i*3+2];a.array[i*3+1]=Math.sin(x*.09+time*1.2)*.16+Math.cos(z*.13+time*.8)*.09;}a.needsUpdate=true;}this.wheel.rotation.z=time*.025;
  for(const b of this.managedTraffic?[]:this.traffic){b.d+=b.speed*dt;const len=this.busRoute.slice(1).reduce((s,p,i)=>s+Math.hypot(p[0]-this.busRoute[i][0],p[1]-this.busRoute[i][1]),0);let d=b.d%len;for(let i=1;i<this.busRoute.length;i++){const a=this.busRoute[i-1],c=this.busRoute[i],l=Math.hypot(c[0]-a[0],c[1]-a[1]);if(d>l){d-=l;continue;}b.x=a[0]+(c[0]-a[0])*d/l;b.z=a[1]+(c[1]-a[1])*d/l;b.angle=Math.atan2(c[0]-a[0],c[1]-a[1]);b.mesh.position.set(b.x,0,b.z);b.mesh.rotation.y=b.angle;break;}}
  for(const g of this.gulls){const a=time*.11+g.phase;g.mesh.position.set(202+Math.cos(a)*38,18+Math.sin(a*1.8)*3,-40+Math.sin(a)*160);g.mesh.rotation.y=-a;g.wings[0].rotation.z=Math.sin(time*4+g.phase)*.35;g.wings[1].rotation.z=-Math.sin(time*4+g.phase)*.35;}
  for(const c of this.charges){c.ring.material.opacity=.27+Math.sin(time*2)*.08;if(c.paint)c.paint.material.uniforms.time.value=time;if(c.star)c.star.rotation.y=time*.7;}
 }
}
