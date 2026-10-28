import * as T from '../vendor/three.module.js?v=eab55fb4e400';
// Painted dashed bay, charging bolt and flowing approach chevrons; no textures or lights.
export function createChargingBay(c,scene){const p=[],colour=[],flow=[],cream=new T.Color('#fff0bc'),gold=new T.Color('#ffd86b');
 const tri=(a,b,d,tint=cream,animate=0)=>{for(const q of[a,b,d]){p.push(q[0],0,q[1]);colour.push(tint.r,tint.g,tint.b);flow.push(animate);}};
 const rect=(x,z,w,d)=>{const a=[x-w/2,z-d/2],b=[x+w/2,z-d/2],e=[x-w/2,z+d/2],f=[x+w/2,z+d/2];tri(a,e,b,gold);tri(b,e,f,gold);};
 for(const side of[-1,1]){for(let z=-2.35;z<=2.4;z+=.85)rect(side*3.15,z,.12,.56);for(let x=-2.6;x<=2.7;x+=.9)rect(x,side*2.8,.6,.12);}
 for(const z of[-1.55,-.15,1.25])for(const side of[-1,1]){const a=[side*.2,z-.3],b=[side*1.15,z+.45],d=[side*1.15,z+.67],e=[side*.2,z-.08];tri(a,b,d,cream,1);tri(a,d,e,cream,1);}
 const bolt=[[-.1,-1.7],[-.75,-.6],[-.2,-.6],[-.45,.6],[.75,-.95],[.18,-.95]],boltGeometry=new T.ShapeGeometry(new T.Shape(bolt.map(([x,z])=>new T.Vector2(x,z)))),bp=boltGeometry.attributes.position,bi=boltGeometry.index;for(let i=0;i<bi.count;i+=3){const v=j=>[bp.getX(bi.getX(i+j)),bp.getY(bi.getX(i+j))];tri(v(0),v(1),v(2),gold,0);}boltGeometry.dispose();
 const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(p,3));geometry.setAttribute('color',new T.Float32BufferAttribute(colour,3));geometry.setAttribute('paintFlow',new T.Float32BufferAttribute(flow,1));geometry.computeBoundingSphere();
 const material=new T.ShaderMaterial({transparent:true,depthWrite:false,side:T.DoubleSide,uniforms:{time:{value:0},charging:{value:0}},vertexShader:'attribute vec3 color;attribute float paintFlow;varying vec3 vColor;varying float vFlow;varying float vZ;void main(){vColor=color;vFlow=paintFlow;vZ=position.z;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'uniform float time;uniform float charging;varying vec3 vColor;varying float vFlow;varying float vZ;void main(){float pulse=.7+.25*sin(time*3.6+vZ*2.6);vec3 tint=mix(vColor,vec3(.58,1.,.72),charging*.45);gl_FragColor=vec4(tint,mix(.88,pulse,vFlow));}'});
 const mesh=new T.Mesh(geometry,material);mesh.position.set(c.target.x,.245,c.target.z);mesh.rotation.y=c.angle||0;scene.add(mesh);return mesh;
}
