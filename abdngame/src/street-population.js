// Fixed-size street extras fill the gaps between the original landmark crowds.
// Replacements enter behind the rider; visible actors and pursuers never teleport.
export class StreetPopulation {
 constructor(town){this.town=town;this.cells=new Map();this.next=0;this.initial=true;
  for(const s of town.walkSegments||[]){const dx=s.b[0]-s.a[0],dz=s.b[1]-s.a[1],length=Math.hypot(dx,dz);if(length<4)continue;
   const motor=['primary','secondary','tertiary','residential','unclassified','living_street'].includes(s.type),offset=motor?Math.min(7.2,s.width)*.5+.65:Math.min(1.4,s.width*.22);
   for(let d=2;d<length;d+=18)for(const side of[-1,1]){const x=s.a[0]+dx*d/length-dz/length*offset*side,z=s.a[1]+dz*d/length+dx/length*offset*side;if(town.collision.blocked(x,z,.65))continue;
    const p={x,z,angle:Math.atan2(dx,dz),route:s,side,offset};const key=this.key(x,z);if(!this.cells.has(key))this.cells.set(key,[]);this.cells.get(key).push(p);
   }
  }
 }
 key(x,z){return Math.floor(x/100)+','+Math.floor(z/100);}
 occluded(a,b){const n=Math.ceil(Math.hypot(b.x-a.x,b.z-a.z)/3);for(let i=1;i<n;i++)if(this.town.collision.blocked(a.x+(b.x-a.x)*i/n,a.z+(b.z-a.z)*i/n,.12))return true;return false;}
 reset(){this.next=0;this.initial=true;}
 candidates(player){const ix=Math.floor(player.x/100),iz=Math.floor(player.z/100),out=[];for(let x=ix-2;x<=ix+2;x++)for(let z=iz-2;z<=iz+2;z++)for(const p of this.cells.get(x+','+z)||[]){const dx=p.x-player.x,dz=p.z-player.z,d=Math.hypot(dx,dz);if(d<(this.initial?105:180)&&d>12&&(this.initial||d>164||d>60&&((dx*Math.sin(player.angle||0)+dz*Math.cos(player.angle||0))<0||this.occluded(player,p))))out.push(p);}const fx=Math.sin(player.angle||0),fz=Math.cos(player.angle||0),score=p=>{const dx=p.x-player.x,dz=p.z-player.z,ahead=dx*fx+dz*fz,side=Math.abs(dx*fz-dz*fx);return Math.abs(ahead-(this.initial?50:140))+side*3+(ahead<0?100:0);};out.sort((a,b)=>score(a)-score(b));return out;}
 target(p,rnd){const s=p.route,dx=s.b[0]-s.a[0],dz=s.b[1]-s.a[1],l=Math.hypot(dx,dz),t=Math.max(.08,Math.min(.92,((p.x-s.a[0])*dx+(p.z-s.a[1])*dz)/(l*l)+(rnd()<.5?-1:1)*Math.min(.65,22/l))),x=s.a[0]+dx*t-dz/l*p.offset*p.side,z=s.a[1]+dz*t+dx/l*p.offset*p.side;return this.town.collision.blocked(x,z,.5)?{x:p.x,z:p.z}:{x,z};}
 update(time,people,player,rnd,busy=true){if(time<this.next)return;this.next=time+.8;
  const local=people.filter(p=>!p.dormant&&p.visible!==false&&Math.hypot(p.x-player.x,p.z-player.z)<100),nearby=local.length,special=local.filter(p=>['dog','cow'].includes(p.role)).length,need=Math.max(0,(busy?42:30)-nearby,special<2?8:0),candidates=this.candidates(player);
  let added=0;for(const p of people){if(!p.reserve||p.state==='chase'||p.down>0||!p.dormant&&Math.hypot(p.x-player.x,p.z-player.z)<185)continue;if(added>=Math.min(need,this.initial?48:6)||!candidates.length)break;
   for(let i=0;i<30&&candidates.length;i++){const q=candidates.splice(Math.floor(rnd()*Math.min(18,candidates.length)),1)[0];if(people.some(a=>!a.dormant&&Math.hypot(a.x-q.x,a.z-q.z)<2.2))continue;
    Object.assign(p,q,{dormant:false,visible:true,active:true,renderX:undefined,renderZ:undefined,area:{x:q.x,z:q.z,w:35,d:35},state:'walk',path:[],nextPath:0,windup:0,strike:0,canSee:false,lastSeen:time,down:0,pause:0});p.target=this.target(p,rnd);added++;break;
   }
  }this.initial=false;
 }
}
