import{Vector3}from'../vendor/three.module.js';
export class ComicWords{
 constructor(container){this.container=container;this.words=[];this.point=new Vector3();}
 add(x,z,text='OOFT!',color='yellow'){if(this.words.length>=8)this.remove(this.words[0]);const el=document.createElement('span');el.className='comic-word '+color;el.textContent=text;this.container.append(el);this.words.push({x,z,el,life:.85,total:.85});}
 remove(w){w.el.remove();this.words.splice(this.words.indexOf(w),1);}
 update(dt,camera,reduced){for(const w of [...this.words]){w.life-=dt;if(w.life<=0){this.remove(w);continue;}const t=1-w.life/w.total;this.point.set(w.x,2.7+(reduced?0:t*2),w.z).project(camera);w.el.hidden=this.point.z>1||this.point.z< -1;w.el.style.left=(this.point.x*.5+.5)*100+'%';w.el.style.top=(-this.point.y*.5+.5)*100+'%';w.el.style.opacity=Math.min(1,w.life*4);w.el.style.transform=`translate(-50%,-50%) rotate(-9deg) scale(${reduced?1:Math.min(1.2,.65+t*4)})`;}}
 clear(){for(const w of [...this.words])this.remove(w);}
}
