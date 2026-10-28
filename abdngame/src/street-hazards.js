import * as T from '../vendor/three.module.js?v=932ddd9cb928';
import{part,textSign,material}from'./models.js?v=932ddd9cb928';
import{mergeStaticParts,disableShadows}from'./render-optimization.js?v=932ddd9cb928';

// Bounded, shared geometry: no debris allocation or extra lights during a ride.
export class StreetHazards{
 constructor(scene,town,hooks){this.scene=scene;this.town=town;this.hooks=hooks;this.scaffolds=[];this.drops=[];
  const prototype=new T.Group(),frame=new T.Group(),beam=new T.Group();prototype.add(frame,beam);beam.name='falling-beam';beam.position.set(0,3.1,0);
  for(const x of[-1.4,1.4])for(const z of[-.7,.7]){part(frame,'#667d80',x,1.7,z,.10,3.4,.10);part(frame,'#e4ad40',x,.2,z,.45,.2,.45);}
  for(const y of[.9,2,3.1]){part(frame,'#91a4a2',0,y,-.7,2.9,.09,.09);part(frame,'#9b8064',0,y+.06,0,3,.12,1.6);}
  for(const side of[-1,1]){const brace=part(frame,'#73938e',side*1.4,1.8,0,.07,2.4,.07);brace.rotation.x=.55;}
  part(beam,'#d8a348',0,0,0,3.4,.18,1.9);for(let i=0;i<5;i++)part(beam,i%2?'#fff0bc':'#403c3d',-1.35+i*.68,.12,.89,.5,.08,.06);
  const sign=textSign('MIND YER HEID',{width:2.8,height:.45,bg:'#e7b547',fg:'#342b37'});sign.position.set(0,1.55,.78);frame.add(sign);mergeStaticParts(frame,{local:true,cellSize:10000});mergeStaticParts(beam,{local:true,cellSize:10000});disableShadows(prototype);
  const samples=[],cells=new Set();for(const s of town.walkSegments||[]){const dx=s.b[0]-s.a[0],dz=s.b[1]-s.a[1],len=Math.hypot(dx,dz);if(len<15||s.width<3.5||s.type==='cycleway')continue;
   for(let d=8;d<len;d+=70){const side=samples.length%2?1:-1,off=Math.min(7.2,s.width)/2-.2,x=s.a[0]+dx*d/len-dz/len*off*side,z=s.a[1]+dz*d/len+dx/len*off*side,key=Math.floor(x/125)+','+Math.floor(z/125);if(cells.has(key)||town.collision.blocked(x,z,2.1)||(town.locations||[]).some(l=>Math.hypot(x-l.x,z-l.z)<28)||town.charges.some(c=>Math.hypot(x-c.target.x,z-c.target.z)<16))continue;cells.add(key);samples.push({x,z,angle:Math.atan2(dx,dz)});
   }
  }
  // Cover the playable core, coast and connecting streets before distant outskirts.
  samples.sort((a,b)=>Math.min(...town.locations.map(l=>Math.hypot(a.x-l.x,a.z-l.z)))-Math.min(...town.locations.map(l=>Math.hypot(b.x-l.x,b.z-l.z))));
  const warningGeometry=new T.RingGeometry(3.3,3.5,24).rotateX(-Math.PI/2),warningMaterial=new T.MeshBasicMaterial({color:'#ffb44f',transparent:true,opacity:.65,depthWrite:false});
  for(const q of samples.slice(0,44)){const root=prototype.clone(true);root.position.set(q.x,0,q.z);root.rotation.y=q.angle;scene.add(root);const warning=new T.Mesh(warningGeometry,warningMaterial);warning.position.set(q.x,.2,q.z);warning.visible=false;scene.add(warning);this.scaffolds.push({...q,id:this.scaffolds.length,root,beam:root.getObjectByName('falling-beam'),warning,age:-1,hit:false});}
  const dropGeometry=new T.IcosahedronGeometry(.2,0),dropMaterial=material('#fff2d2'),markGeometry=new T.RingGeometry(1.1,1.3,24).rotateX(-Math.PI/2),markMaterial=new T.MeshBasicMaterial({color:'#ffe256',transparent:true,opacity:.75,depthWrite:false});
  for(let i=0;i<3;i++){const mesh=new T.Mesh(dropGeometry,dropMaterial),mark=new T.Mesh(markGeometry,markMaterial);scene.add(mesh,mark);this.drops.push({mesh,mark,active:false});}this.reset();
 }
 reset(){this.broken=0;this.nextGull=10;for(const s of this.scaffolds){s.age=-1;s.hit=false;s.beam.rotation.set(0,0,0);s.beam.position.y=3.1;s.root.visible=true;s.warning.visible=false;}for(const p of this.drops){p.active=false;p.mesh.visible=p.mark.visible=false;}}
 strike(player,swipe=false){for(const s of this.scaffolds){if(s.age>=0||Math.hypot(player.x-s.x,player.z-s.z)>(swipe?4:2.15)||player.y>2)continue;s.age=0;s.warning.visible=true;this.broken++;this.hooks.scaffold(s,this.broken);return true;}return false;}
 update(dt,time,player,run){for(const s of this.scaffolds){s.root.visible=Math.hypot(s.x-player.x,s.z-player.z)<240;if(s.age<0||!run)continue;const old=s.age;s.age+=dt;s.beam.rotation.x=s.age<.7?Math.sin(s.age*40)*.035:Math.min(1.8,(s.age-.7)*2.8);s.beam.position.y=3.1-Math.min(2.4,Math.max(0,s.age-.7)*3);s.warning.visible=s.age<1.5;s.warning.scale.setScalar(.95+Math.sin(time*12)*.05);if(!s.hit&&old<1.15&&s.age>=1.15){s.hit=true;if(player.y<2&&Math.hypot(s.x-player.x,s.z-player.z)<3.5)this.hooks.damage(14,'THE SCAFFOLDING HAS A COMPLAINT TOO.');}}
  if(!run)return;
  if(run.elapsed>=this.nextGull){this.nextGull=run.elapsed+12+(Math.floor(run.elapsed)%7);const p=this.drops.find(p=>!p.active),x=player.x+Math.sin(player.angle)*(player.speed||0)*1.1,z=player.z+Math.cos(player.angle)*(player.speed||0)*1.1;
   if(p&&!this.town.cameraBlocked(x,z,12)){Object.assign(p,{active:true,age:0,x,z,y:14,vy:0});p.mark.position.set(x,.22,z);p.mark.visible=true;p.mesh.visible=false;this.hooks.gull(x,z);}
  }
  for(let i=0;i<this.drops.length;i++){const p=this.drops[i];if(!p.active)continue;p.age+=dt;const g=this.town.gulls[i];if(g){g.mesh.position.set(p.x,14,p.z);g.mesh.rotation.y=player.angle;}p.mark.scale.setScalar(1+Math.sin(time*10)*.08);if(p.age<1)continue;p.mesh.visible=true;p.vy-=14*dt;p.y+=p.vy*dt;p.mesh.position.set(p.x,p.y,p.z);if(p.y<1.9&&player.y<2&&Math.hypot(p.x-player.x,p.z-player.z)<1.15){p.active=false;this.hooks.splat(p.x,p.z);}if(p.y<.15)p.active=false;if(!p.active)p.mesh.visible=p.mark.visible=false;
  }
 }
}
