// Shared bounded priority queue for road and pedestrian routing.
export class MinHeap{
 constructor(){this.items=[];}
 get length(){return this.items.length;}
 push(item){const a=this.items;let i=a.length;a.push(item);while(i>0){const p=(i-1)>>1;if(a[p].f<=item.f)break;a[i]=a[p];i=p;}a[i]=item;}
 pop(){const a=this.items,first=a[0],last=a.pop();if(a.length){let i=0;while(true){let c=i*2+1;if(c>=a.length)break;if(c+1<a.length&&a[c+1].f<a[c].f)c++;if(a[c].f>=last.f)break;a[i]=a[c];i=c;}a[i]=last;}return first;}
}
export function dampAngle(current,target,rate,dt){const delta=Math.atan2(Math.sin(target-current),Math.cos(target-current));return current+delta*(1-Math.exp(-rate*dt));}

// Resolution adapts slowly to sustained load; text and controls stay at native CSS resolution.
export class AdaptiveResolution{
 constructor(max){this.max=max;this.ratio=max;this.changedAt=0;this.fastSince=0;}
 consider(now,stats){if(!['play','menu'].includes(stats.state)){this.fastSince=0;return null;}if(now-this.changedAt<6000)return null;
  const floor=Math.min(.8,this.max);if(stats.medianFrameMs>22&&stats.p95FrameMs>26&&this.ratio>floor){this.ratio=Math.max(floor,Math.round((this.ratio-.1)*100)/100);this.changedAt=now;this.fastSince=0;return this.ratio;}
  if(stats.medianFrameMs<18&&stats.p95CpuMs<10&&this.ratio<this.max){this.fastSince||=now;if(now-this.fastSince>20000){this.ratio=Math.min(this.max,Math.round((this.ratio+.05)*100)/100);this.changedAt=now;this.fastSince=0;return this.ratio;}}else this.fastSince=0;return null;
 }
}
