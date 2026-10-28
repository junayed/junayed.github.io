import * as T from '../vendor/three.module.js?v=932ddd9cb928';
import {part,textSign} from './models.js?v=932ddd9cb928';

// Staggered works pinch the carriageway while keeping a verified centre route open.
export function addStreetChallenges(town,point){
 town.chicanes=[];
 const seeds=[[-270,-150],[-160,-25],[-96,-68],[146,-177],[1095,-830],[1130,-675]];
 const sites=seeds.map(seed=>point(...seed));for(const r of town.roads){if(r.width<5||!['residential','tertiary','secondary','unclassified'].includes(r.type))continue;for(let i=1;i<r.points.length;i++){const a=r.points[i-1],b=r.points[i];if(Math.hypot(b[0]-a[0],b[1]-a[1])<30)continue;const p=[(a[0]+b[0])/2,(a[1]+b[1])/2];if(sites.length<24&&sites.every(q=>Math.hypot(p[0]-q[0],p[1]-q[1])>145))sites.push(p);}}
 for(const p of sites){let best=null;
  for(const r of town.roads){if(r.width<5||!['primary','secondary','tertiary','residential','unclassified','living_street'].includes(r.type))continue;
   for(let i=1;i<r.points.length;i++){const a=r.points[i-1],b=r.points[i],dx=b[0]-a[0],dz=b[1]-a[1],len=Math.hypot(dx,dz);if(len<24)continue;const t=Math.max(.25,Math.min(.75,((p[0]-a[0])*dx+(p[1]-a[1])*dz)/(len*len))),x=a[0]+dx*t,z=a[1]+dz*t,dist=Math.hypot(x-p[0],z-p[1]);if(dist>32||best&&best.dist<dist)continue;const angle=Math.atan2(dx,dz);if(Array.from({length:29},(_,j)=>j*.6-8.4).some(d=>town.collision.blocked(x+Math.sin(angle)*d,z+Math.cos(angle)*d,.95)))continue;best={x,z,angle,dist,width:Math.min(7.2,r.width)};}
  }
  if(!best)continue;const g=new T.Group();g.position.set(best.x,0,best.z);g.rotation.y=best.angle;town.scene.add(g);let placed=0;
  for(const side of[-1,1]){const x=side*(best.width/2-.1),z=side*4.5,w=1.8,d=3.2;
   const corners=[[-w/2,-d/2],[w/2,-d/2],[w/2,d/2],[-w/2,d/2]].map(([xx,zz])=>{const q=new T.Vector3(x+xx,0,z+zz);g.localToWorld(q);return[q.x,q.z];});
   if(corners.some(q=>town.collision.blocked(...q,.35)))continue;
   part(g,'#4a525b',x,.15,z,w,.3,d);part(g,'#e4a043',x,.65,z,w,.75,d);for(let j=0;j<4;j++)part(g,j%2?'#fff1c7':'#b96d31',x,.97,z-d/2+.35+j*.8,w+.05,.16,.35);
   const ring=[...corners,corners[0]];town.collision.addPolygon([ring]);placed++;
   const lamp=part(g,'#f2dba3',x,1.2,z,.22,.3,.22);lamp.material=lamp.material.clone();lamp.material.emissive.set('#ffbb47');lamp.material.emissiveIntensity=.8;
  }
  if(!placed){town.scene.remove(g);continue;}const sign=textSign('SINGLE FILE. NAE EXCUSES.',{width:3,height:.5,bg:'#e6b451',fg:'#342638'});sign.position.set(best.width/2+1.3,1.8,0);g.add(sign);part(g,'#52595b',best.width/2+1.3,.9,0,.08,1.8,.08);town.chicanes.push(best);
 }
}
