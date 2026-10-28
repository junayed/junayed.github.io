export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const lerp=(a,b,t)=>a+(b-a)*t;
export function seeded(seed=12345){return()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};}
export const DISTRICTS={college:{name:'COLLEGE SQUARE',joke:'Mind the civic pride.'},homes:{name:'GARDEN BRAE',joke:'A quiet street. Was.'},coast:{name:'EAST PROM',joke:'Even the gulls are judging.'},shops:{name:'CLOCKGATE',joke:'Just popping to the shops.'}};
export function districtAt(x,z){return x<-150?'homes':x>145?'coast':z<-22?'college':'shops';}
export class RunState{
 constructor(){this.score=0;this.bill=0;this.heat=0;this.battery=100;this.stability=100;this.elapsed=0;this.combo=1;this.lastEvent=-10;this.hits=0;this.props=0;this.vehicles=0;this.riders=0;this.pets=0;this.jumps=0;this.boostPower=0;this.boostStock=0;this.escapes=0;this.peakHeat=0;this.cooldowns=new Map();this.districts={college:0,homes:0,coast:0,shops:0};}
 useBoost(){if(this.boostStock<=0||this.boostPower>0)return false;this.boostStock--;this.boostPower=8;return true;}
 event(kind,id,district='college'){
  const key=kind+':'+id,until=this.cooldowns.get(key)??-1;
  if(this.elapsed<until)return null;
  const rule=INCIDENTS[kind];if(!rule)return null;
  this.cooldowns.set(key,kind==='prop'?Infinity:this.elapsed+rule.cooldown);
  this.combo=this.elapsed-this.lastEvent<=3?Math.min(5,this.combo+1):1;
  this.lastEvent=this.elapsed;
  const points=rule.points*this.combo;
  this.score+=points;this.bill+=rule.bill;this.heat=clamp(this.heat+rule.heat,0,100);this.peakHeat=Math.max(this.peakHeat,this.heat);
  this[rule.counter]++;if(kind==='cyclist')this.hits++;this.districts[district]++;
  return{points,kind,combo:this.combo};
 }
 update(dt,{boost=false,moving=false,charging=false,chasing=false}={}){
  this.elapsed+=dt;this.boostPower=Math.max(0,this.boostPower-dt);
  if(this.elapsed-this.lastEvent>3)this.combo=1;
  this.battery=clamp(this.battery+dt*(charging?13:-(.25+(moving?.11:0)+(boost?1.0:0))),0,100);
  if(this.elapsed-this.lastEvent>5)this.heat=clamp(this.heat-dt*(chasing?.6:3.4),0,100);
  this.stability=clamp(this.stability+dt*(chasing?.15:.6),0,100);
 }
}
export const INCIDENTS={
 bus:{points:80,bill:350,heat:18,cooldown:12,counter:'vehicles'},
 skull:{points:45,bill:12,heat:8,cooldown:12,counter:'hits'},
 prop:{points:25,bill:85,heat:5,cooldown:Infinity,counter:'props'},
 person:{points:20,bill:12,heat:8,cooldown:10,counter:'hits'},
 cyclist:{points:30,bill:45,heat:10,cooldown:10,counter:'riders'},
 pet:{points:15,bill:5,heat:10,cooldown:10,counter:'pets'},
 vehicle:{points:40,bill:250,heat:14,cooldown:12,counter:'vehicles'}
};
export const wantedLevel=heat=>heat>=85?3:heat>=60?2:heat>=35?1:0;
export function hasClearThrow(collision,a,b){const n=Math.max(1,Math.ceil(Math.hypot(b.x-a.x,b.z-a.z)/.5));for(let i=1;i<n;i++)if(collision.blocked(a.x+(b.x-a.x)*i/n,a.z+(b.z-a.z)*i/n,.12))return false;return true;}
export function chooseHeadline(run,cause){
 if(cause==='battery')return 'LOW BATTERY BRINGS HIGH NONSENSE TO AN END';
 if(cause==='caught')return 'SILENT SCOOTER LOCATED BY EXTREMELY LOUD LOCALS';
 if(run.vehicles>=3)return 'BUS SERVICE DISRUPTED BY MUCH SMALLER VEHICLE';
 if(run.riders>=3)return 'CYCLE LANE NOW A RATHER PERSONAL ARGUMENT';
 if(run.props>=12)return "COUNCIL'S QUIET DAY LASTS FOUR MINUTES";
 const dominant=Object.entries(run.districts).sort((a,b)=>b[1]-a[1])[0];
 if(dominant[1]>0&&dominant[0]==='homes')return 'LOCAL HEDGE NOW A THROUGH ROAD';
 if(dominant[1]>0&&dominant[0]==='coast')return 'EVEN THE GULLS LOOKED DISAPPOINTED';
 if(run.score>300)return 'GRANITE SURVIVES. CIVIC PRIDE LESS FORTUNATE';
 return 'ONE WEE LAP FAILS TO BECOME ONE WEE LAP';
}

export function driveSpeed(speed,dt,{gas=false,brake=false,boost=false,powered=false}={}){if(brake)return speed>.3?Math.max(0,speed-dt*26):Math.max(-5.5,speed-dt*7);if(gas)return Math.min(powered?29:boost?23:14,speed+dt*(boost?18:10));return speed>=0?Math.max(0,speed-dt*4.2):Math.min(0,speed+dt*4.2);}
