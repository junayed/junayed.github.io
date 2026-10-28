import * as T from '../vendor/three.module.js';
import{part,material}from'./models.js';
const wheel=new T.CylinderGeometry(1,1,1,12),sphere=new T.IcosahedronGeometry(1,1),cone=new T.ConeGeometry(1,1,4);
export function createCar(color='#8b6771',police=false){const root=new T.Group(),body=new T.Group();root.add(body);
 part(body,police?'#e0e5dc':color,0,.65,0,1.85,.75,4.1);part(body,'#314956',0,1.18,-.1,1.6,.65,2.35);part(body,police?'#e5e7dd':color,0,1.53,-.15,1.65,.14,2.35);
 part(body,color,0,.97,1.4,1.78,.18,1.3);part(body,'#fff0bd',0,.64,2.08,1.5,.15,.04);part(body,'#c85d53',0,.64,-2.08,1.4,.15,.04);part(body,'#343947',0,.4,2.11,1.8,.16,.15);
 const wheels=[];for(const x of[-.94,.94])for(const z of[-1.35,1.35]){const m=part(body,'#262f36',x,.4,z,.36,.18,.36,wheel);m.rotation.z=Math.PI/2;wheels.push(m);}
 const lamps=[];if(police){for(const x of[-.94,.94])for(let z=-1.5;z<1.7;z+=.43)part(body,Math.round(z*10)%2?'#4267b0':'#e8d85c',x,.75,z,.03,.32,.42);part(body,'#303e4b',0,1.66,-.2,1.2,.14,.4);for(const x of[-.4,.4]){const m=part(body,'#4684ff',x,1.79,-.2,.35,.16,.28);m.material=new T.MeshBasicMaterial({color:'#4894ff'});lamps.push(m);}}
 return{root,body,wheels,lamps};
}
export function createCycle(color='#cd725a'){const root=new T.Group(),wheels=[];
 for(const z of[-.7,.7]){const m=part(root,'#2c3440',0,.36,z,.35,.08,.35,wheel);m.rotation.z=Math.PI/2;wheels.push(m);part(root,'#a8b1b2',0,.36,z,.29,.085,.29,wheel).rotation.z=Math.PI/2;}
 const tube=(x,y,z,w,h,d,rx=0)=>{const p=part(root,color,x,y,z,w,h,d);p.rotation.x=rx;};
 tube(0,.65,0,.08,.08,1.2);tube(0,.64,-.35,.07,.65,.07,-.8);tube(0,.64,.34,.07,.7,.07,.75);tube(0,.94,0,.08,.08,.85);tube(0,1,.62,.06,.8,.06,-.12);part(root,'#333943',0,1.05,-.37,.36,.1,.35);part(root,'#313b41',0,1.37,.66,.67,.07,.08);part(root,'#525764',0,.46,-.1,.45,.06,.08);return{root,wheels};
}
export function createAnimal(species='dog',color='#aa825e'){const root=new T.Group(),body=new T.Group();root.add(body);const cat=species==='cat',size=cat?.7:1;
 body.scale.setScalar(size);part(body,color,0,.45,0,.42,.38,.83,sphere);part(body,color,0,.68,.49,.35,.35,.38,sphere);part(body,cat?'#ead7c8':color,0,.6,.7,.26,.18,.29);part(body,'#272d36',0,.65,.86,.12,.1,.07);
 for(const x of[-.1,.1])part(body,'#1f2936',x,.76,.66,.045,.055,.035);
 for(const x of[-.17,.17]){const ear=part(body,cat?color:'#75563e',x,cat?.92:.71,.44,.17,cat?.25:.3,.19,cat?cone:sphere);if(!cat)ear.rotation.z=x<0?-.3:.3;}
 const legs=[];for(const x of[-.17,.17])for(const z of[-.27,.27])legs.push(part(body,color,x,.2,z,.11,.4,.12));const tail=part(body,color,0,.64,-.56,.1,.55,.1);tail.rotation.x=cat?-.2:-.65;
 part(body,'#6e3a92',0,.53,.37,.4,.1,.15);return{root,body,legs,tail,species};
}
const rainbow=['#e8585a','#ee9c43','#f5d94b','#68ad68','#4c8fd1','#9656bd'];
export function createFlag(kind='pride'){const root=new T.Group();part(root,'#b7b4ac',0,kind==='moneypot'?1.35:1.15,0,.035,kind==='moneypot'?2.7:2.3,.035);let geometry,mat;
 if((kind==='no-lez'||kind==='no-trump'||kind==='moneypot')&&typeof document!=='undefined'){const c=document.createElement('canvas');c.width=512;c.height=256;const ctx=c.getContext('2d');ctx.fillStyle=kind==='moneypot'?'#276e66':kind==='no-lez'?'#f2d453':'#f1e7cf';ctx.fillRect(0,0,512,256);ctx.strokeStyle=kind==='moneypot'?'#f5d77f':'#b73844';ctx.lineWidth=16;ctx.strokeRect(10,10,492,236);ctx.fillStyle='#30243c';ctx.font='800 84px "Open Sans",sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';if(kind==='moneypot'){ctx.fillStyle='#fff0c9';ctx.font='800 76px "Open Sans",sans-serif';ctx.fillText('MoneyPot',256,132,470);}else if(kind==='no-lez')ctx.fillText('NO LEZ',256,132,470);else{ctx.font='800 80px "Open Sans",sans-serif';ctx.fillText('TRUMP',256,87,470);ctx.fillText('NAE',256,181,470);}const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;geometry=new T.PlaneGeometry(kind==='moneypot'?2.1:1.45,kind==='moneypot'?.9:.75,12,6);geometry.translate(kind==='moneypot'?1.05:.73,kind==='moneypot'?2.2:1.95,0);mat=new T.MeshBasicMaterial({map:tex,side:T.DoubleSide});
 }else{const points=[],colors=[],bands=kind==='palestine'?['#22252b','#f4f0df','#438858']:rainbow;const push=(x,y,z,col)=>{points.push(x,y,z);const c=new T.Color(col);colors.push(c.r,c.g,c.b);};for(let band=0;band<bands.length;band++)for(let i=0;i<12;i++){const x=i*1.2/12,x1=(i+1)*1.2/12,y=2.28-band*.75/bands.length,y1=2.28-(band+1)*.75/bands.length;for(const p of[[x,y],[x,y1],[x1,y],[x1,y],[x,y1],[x1,y1]])push(...p,0,bands[band]);}if(kind==='palestine')for(const p of[[0,2.28],[.57,1.905],[0,1.53]])push(...p,.012,'#c94346');geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(points,3));geometry.setAttribute('color',new T.Float32BufferAttribute(colors,3));mat=new T.MeshBasicMaterial({vertexColors:true,side:T.DoubleSide});}
 const cloth=new T.Mesh(geometry,mat);cloth.userData.noSnow=true;root.add(cloth);return{root,cloth,base:geometry.attributes.position.array.slice(),kind};
}
export function createBottle(){const root=new T.Group();part(root,'#53846f',0,0,0,.105,.35,.105,wheel);part(root,'#51816c',0,.23,0,.055,.16,.055,wheel);part(root,'#c7aa6d',0,.33,0,.06,.04,.06,wheel);part(root,'#e8dfbb',0,-.02,.106,.13,.14,.012);return root;}
export function createExcavator(){const root=new T.Group();for(const x of[-.78,.78])part(root,'#353b3c',x,.35,0,.48,.6,2.6);part(root,'#e3af36',0,.85,0,1.9,.5,2.2);part(root,'#e8b745',.45,1.6,-.15,.95,1.2,1.3);part(root,'#35535f',.45,1.72,.52,.75,.7,.04);part(root,'#334a54',.94,1.72,-.15,.035,.7,.95);const boom=new T.Group();boom.position.set(-.45,1.1,.5);root.add(boom);const arm=part(boom,'#e9b33c',0,1.15,.7,.3,2.5,.3);arm.rotation.x=.6;const lower=part(boom,'#cba13a',0,1.9,2,.24,1.9,.24);lower.rotation.x=-.7;part(boom,'#59616a',0,1.2,2.6,.85,.55,.75);return{root,boom};}
