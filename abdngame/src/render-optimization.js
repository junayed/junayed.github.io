import * as T from '../vendor/three.module.js?v=eab55fb4e400';
const nightMaterials=new Set(['f2dba3','3f5866','405a65','294f5b','3e5d6b','456373']);
const coloured=new T.MeshLambertMaterial({color:'#ffffff',vertexColors:true});

// Merge opaque static parts by location, preserving shaders, signs, transparent glass and animation.
export function mergeStaticParts(root,{cellSize=150,local=false,exclude=[]}={}){
 root.updateMatrixWorld(true);const inverse=new T.Matrix4().copy(root.matrixWorld).invert(),matrix=new T.Matrix4(),normalMatrix=new T.Matrix3(),p=new T.Vector3(),n=new T.Vector3(),groups=new Map(),removed=[],stop=new Set(exclude);
 const visit=o=>{if(stop.has(o)||o.userData.dynamic||o.userData.unbatchable)return;const m=o.material;if(o.isMesh&&!o.isInstancedMesh&&!Array.isArray(m)&&m?.isMeshLambertMaterial&&!m.map&&!m.transparent&&!m.vertexColors&&!nightMaterials.has(m.color.getHexString())&&m.onBeforeCompile===T.Material.prototype.onBeforeCompile){matrix.copy(o.matrixWorld);if(local)matrix.premultiply(inverse);normalMatrix.getNormalMatrix(matrix);p.setFromMatrixPosition(matrix);const key=`${Math.floor(p.x/cellSize)},${Math.floor(p.z/cellSize)},${+o.castShadow},${+o.receiveShadow}`;if(!groups.has(key))groups.set(key,{p:[],n:[],c:[],cast:o.castShadow,receive:o.receiveShadow});const a=groups.get(key),g=o.geometry,position=g.attributes.position,normal=g.attributes.normal,index=g.index,count=index?index.count:position.count;for(let i=0;i<count;i++){const j=index?index.getX(i):i;p.fromBufferAttribute(position,j).applyMatrix4(matrix);n.fromBufferAttribute(normal,j).applyNormalMatrix(normalMatrix);a.p.push(p.x,p.y,p.z);a.n.push(n.x,n.y,n.z);a.c.push(m.color.r,m.color.g,m.color.b);}removed.push(o);}for(const child of o.children)visit(child);};
 for(const child of root.children)visit(child);for(const o of removed)o.removeFromParent();for(const a of groups.values()){const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(a.p,3));g.setAttribute('normal',new T.Float32BufferAttribute(a.n,3));g.setAttribute('color',new T.Float32BufferAttribute(a.c,3));g.computeBoundingSphere();const mesh=new T.Mesh(g,coloured);mesh.castShadow=a.cast;mesh.receiveShadow=a.receive;root.add(mesh);}return{parts:removed.length,batches:groups.size};
}
export function freezeTransforms(root){const visit=o=>{if(o.userData.dynamic)return;if(o.isMesh||o.isGroup)o.matrixAutoUpdate=false;for(const c of o.children)visit(c);};root.updateMatrixWorld(true);visit(root);}
export function disableShadows(root){root.traverse(o=>{if(o.isMesh)o.castShadow=false;});}
export function contactShadow(root,width=1,length=1){const m=new T.Mesh(new T.CircleGeometry(1,12),new T.MeshBasicMaterial({color:'#202535',transparent:true,opacity:.18,depthWrite:false}));m.geometry.rotateX(-Math.PI/2);m.position.y=.17;m.scale.set(width,1,length);m.userData.dynamic=true;root.add(m);return m;}
export function optimizeTown(town){
 const mark=o=>{if(o)o.userData.dynamic=true;};for(const p of town.props)p.mesh.userData.unbatchable=true;for(const c of town.charges)mark(c.star);for(const b of town.traffic)mark(b.mesh);for(const g of town.gulls){mark(g.mesh);disableShadows(g.mesh);}mark(town.coastGroup);mark(town.festiveGroup);
 const life=town.cityLife;if(life){for(const f of life.flags)mark(f.root);for(const t of life.toys)mark(t.root);for(const s of life.ships)mark(s);for(const b of life.playBalls)mark(b);mark(life.digger?.root);}
 town.renderOptimization=mergeStaticParts(town.scene);freezeTransforms(town.scene);town.scene.matrixAutoUpdate=false;
}
