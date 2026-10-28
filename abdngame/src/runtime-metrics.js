// Bounded, local-only frame diagnostics. No network or gameplay-facing UI.
export class RuntimeMetrics{
 constructor(canvas){this.canvas=canvas;this.frames=new Float32Array(240);this.cpu=new Float32Array(240);this.count=0;this.index=0;this.last=0;this.next=0;this.longFrames=0;this.totalFrames=0;}
 sample(now,cpu,info,state,actors){
  if(this.last&&now-this.last<1000&&['play','menu','caught'].includes(state)){this.totalFrames++;if(now-this.last>50)this.longFrames++;this.frames[this.index]=now-this.last;this.cpu[this.index]=cpu;this.index=(this.index+1)%this.frames.length;this.count=Math.min(this.count+1,this.frames.length);}this.last=now;
  if(now<this.next||this.count<60)return null;this.next=now+2000;const a=Array.from(this.frames.subarray(0,this.count)).sort((x,y)=>x-y),c=Array.from(this.cpu.subarray(0,this.count)).sort((x,y)=>x-y);
  const stats={samples:this.count,totalFrames:this.totalFrames,longFrames:this.longFrames,maxFrameMs:+a.at(-1).toFixed(2),maxCpuMs:+c.at(-1).toFixed(2),medianFrameMs:+a[Math.floor(a.length*.5)].toFixed(2),p95FrameMs:+a[Math.floor(a.length*.95)].toFixed(2),medianCpuMs:+c[Math.floor(c.length*.5)].toFixed(2),p95CpuMs:+c[Math.floor(c.length*.95)].toFixed(2),drawCalls:info.render.calls,triangles:info.render.triangles,geometries:info.memory.geometries,textures:info.memory.textures,activePeople:actors,state};this.canvas.dataset.performance=JSON.stringify(stats);return stats;
 }
}
