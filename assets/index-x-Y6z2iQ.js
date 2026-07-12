const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./cloud-CN4s79Nz.js","./fb-NqU_KbOr.js","./friends-CnzVyoR-.js"])))=>i.map(i=>d[i]);
var Jf=Object.defineProperty;var Kf=i=>{throw TypeError(i)};var Qf=(i,t,e)=>t in i?Jf(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var R=(i,t,e)=>Qf(i,typeof t!="symbol"?t+"":t,e);var fs=(i,t,e)=>t.has(i)?Kf("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(i):t.set(i,e);function td(i,t){for(var e=0;e<t.length;e++){const n=t[e];if(typeof n!="string"&&!Array.isArray(n)){for(const s in n)if(s!=="default"&&!(s in i)){const r=Object.getOwnPropertyDescriptor(n,s);r&&Object.defineProperty(i,s,r.get?r:{enumerable:!0,get:()=>n[s]})}}}return Object.freeze(Object.defineProperty(i,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const ed="modulepreload",nd=function(i,t){return new URL(i,t).href},il={},mc=function(t,e,n){let s=Promise.resolve();if(e&&e.length>0){const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),c=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));s=Promise.allSettled(e.map(l=>{if(l=nd(l,n),l in il)return;il[l]=!0;const h=l.endsWith(".css"),u=h?'[rel="stylesheet"]':"";if(!!n)for(let g=o.length-1;g>=0;g--){const _=o[g];if(_.href===l&&(!h||_.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${l}"]${u}`))return;const d=document.createElement("link");if(d.rel=h?"stylesheet":ed,h||(d.as="script"),d.crossOrigin="",d.href=l,c&&d.setAttribute("nonce",c),document.head.appendChild(d),h)return new Promise((g,_)=>{d.addEventListener("load",g),d.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})};class id{constructor(){R(this,"ctx",null)}unlock(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}const t=window.AudioContext||window.webkitAudioContext;t&&(this.ctx=new t)}noise(t,e,n,s,r="bandpass"){const o=this.ctx;if(!o)return;const a=o.currentTime,c=Math.max(1,Math.floor(o.sampleRate*t)),l=o.createBuffer(1,c,o.sampleRate),h=l.getChannelData(0);for(let g=0;g<c;g++)h[g]=Math.random()*2-1;const u=o.createBufferSource();u.buffer=l;const f=o.createBiquadFilter();f.type=r,f.frequency.value=e,f.Q.value=n;const d=o.createGain();d.gain.setValueAtTime(s,a),d.gain.exponentialRampToValueAtTime(1e-4,a+t),u.connect(f).connect(d).connect(o.destination),u.start(a)}tone(t,e,n,s="sine",r=0){const o=this.ctx;if(!o)return;const a=o.currentTime+r,c=o.createOscillator();c.type=s,c.frequency.value=t;const l=o.createGain();l.gain.setValueAtTime(n,a),l.gain.exponentialRampToValueAtTime(1e-4,a+e),c.connect(l).connect(o.destination),c.start(a),c.stop(a+e)}hit(){this.noise(.07,1600,1.2,.35,"highpass"),this.tone(240,.09,.22,"triangle")}smash(){this.noise(.1,1100,1,.5,"highpass"),this.tone(150,.18,.28,"sawtooth"),this.tone(300,.1,.18,"triangle")}bounce(){this.tone(130,.09,.16,"sine"),this.noise(.05,500,1,.1,"lowpass")}net(){this.noise(.16,320,.8,.25,"lowpass")}whoosh(){this.noise(.12,900,.7,.08,"bandpass")}point(){this.noise(.9,1100,.4,.18,"bandpass"),this.tone(660,.18,.1,"triangle")}fault(){this.tone(220,.16,.14,"square"),this.tone(165,.22,.12,"square")}rlTick(t=.5){this.tone(750+650*t,.035,.045+.07*t,"square")}rlFanfare(){[523,659,784,1047].forEach((e,n)=>this.tone(e,.32,.15,"triangle",n*.11)),this.tone(1319,.5,.1,"triangle",.44),this.noise(1.1,1200,.4,.14,"bandpass")}rlHeart(){this.tone(64,.14,.3,"sine"),this.tone(52,.16,.18,"sine",.03)}rlThud(){this.tone(110,.5,.28,"sawtooth"),this.tone(82,.75,.24,"sawtooth",.14),this.noise(.45,190,.8,.25,"lowpass")}}const He=new id,sl={apiKey:"AIzaSyBSIjJ-iKtZVW45Oc2aNkUNa38x8QohT7w",authDomain:"lucky-smash-e9b2c.firebaseapp.com",projectId:"lucky-smash-e9b2c",storageBucket:"lucky-smash-e9b2c.firebasestorage.app",messagingSenderId:"379532269721",appId:"1:379532269721:web:1feef732337374e0580008",measurementId:"G-PNKPZJGRRV"};function zs(){return sl.apiKey!==""&&sl.projectId!==""}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const gc="170",sd=0,rl=1,rd=2,Wh=1,Xh=2,Cn=3,Kn=0,Ne=1,Ve=2,jn=0,vi=1,Is=2,ol=3,al=4,od=5,ui=100,ad=101,cd=102,ld=103,hd=104,ud=200,fd=201,dd=202,pd=203,oa=204,aa=205,md=206,gd=207,_d=208,vd=209,xd=210,yd=211,Sd=212,Md=213,bd=214,ca=0,la=1,ha=2,Ki=3,ua=4,fa=5,da=6,pa=7,$h=0,Ed=1,Td=2,Zn=0,Cd=1,Ad=2,wd=3,qh=4,Rd=5,Pd=6,Ld=7,Yh=300,Qi=301,ts=302,ma=303,ga=304,ao=306,Ds=1e3,mi=1001,_a=1002,ln=1003,Id=1004,Zs=1005,gn=1006,yo=1007,gi=1008,Nn=1009,jh=1010,Zh=1011,Us=1012,_c=1013,Si=1014,wn=1015,Hs=1016,vc=1017,xc=1018,es=1020,Jh=35902,Kh=1021,Qh=1022,cn=1023,tu=1024,eu=1025,ji=1026,ns=1027,nu=1028,yc=1029,iu=1030,Sc=1031,Mc=1033,Ir=33776,Dr=33777,Ur=33778,Nr=33779,va=35840,xa=35841,ya=35842,Sa=35843,Ma=36196,ba=37492,Ea=37496,Ta=37808,Ca=37809,Aa=37810,wa=37811,Ra=37812,Pa=37813,La=37814,Ia=37815,Da=37816,Ua=37817,Na=37818,Fa=37819,Oa=37820,Ba=37821,Fr=36492,ka=36494,za=36495,su=36283,Ha=36284,Va=36285,Ga=36286,Dd=3200,Ud=3201,ru=0,Nd=1,$n="",De="srgb",as="srgb-linear",co="linear",te="srgb",wi=7680,cl=519,Fd=512,Od=513,Bd=514,ou=515,kd=516,zd=517,Hd=518,Vd=519,Wa=35044,ll="300 es",Rn=2e3,$r=2001;class cs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Ce=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],So=Math.PI/180,Xa=180/Math.PI;function Dn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ce[i&255]+Ce[i>>8&255]+Ce[i>>16&255]+Ce[i>>24&255]+"-"+Ce[t&255]+Ce[t>>8&255]+"-"+Ce[t>>16&15|64]+Ce[t>>24&255]+"-"+Ce[e&63|128]+Ce[e>>8&255]+"-"+Ce[e>>16&255]+Ce[e>>24&255]+Ce[n&255]+Ce[n>>8&255]+Ce[n>>16&255]+Ce[n>>24&255]).toLowerCase()}function Me(i,t,e){return Math.max(t,Math.min(e,i))}function Gd(i,t){return(i%t+t)%t}function Mo(i,t,e){return(1-e)*i+e*t}function mn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ee(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class ht{constructor(t=0,e=0){ht.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Me(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ft{constructor(t,e,n,s,r,o,a,c,l){Ft.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],g=n[8],_=s[0],m=s[3],p=s[6],E=s[1],M=s[4],v=s[7],F=s[2],C=s[5],A=s[8];return r[0]=o*_+a*E+c*F,r[3]=o*m+a*M+c*C,r[6]=o*p+a*v+c*A,r[1]=l*_+h*E+u*F,r[4]=l*m+h*M+u*C,r[7]=l*p+h*v+u*A,r[2]=f*_+d*E+g*F,r[5]=f*m+d*M+g*C,r[8]=f*p+d*v+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,f=a*c-h*r,d=l*r-o*c,g=e*u+n*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(s*l-h*n)*_,t[2]=(a*n-s*o)*_,t[3]=f*_,t[4]=(h*e-s*c)*_,t[5]=(s*r-a*e)*_,t[6]=d*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(bo.makeScale(t,e)),this}rotate(t){return this.premultiply(bo.makeRotation(-t)),this}translate(t,e){return this.premultiply(bo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const bo=new Ft;function au(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function qr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Wd(){const i=qr("canvas");return i.style.display="block",i}const hl={};function Ms(i){i in hl||(hl[i]=!0,console.warn(i))}function Xd(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function $d(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function qd(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Yt={enabled:!0,workingColorSpace:as,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===te&&(i.r=Un(i.r),i.g=Un(i.g),i.b=Un(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===te&&(i.r=Zi(i.r),i.g=Zi(i.g),i.b=Zi(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===$n?co:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Un(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Zi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const ul=[.64,.33,.3,.6,.15,.06],fl=[.2126,.7152,.0722],dl=[.3127,.329],pl=new Ft().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ml=new Ft().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Yt.define({[as]:{primaries:ul,whitePoint:dl,transfer:co,toXYZ:pl,fromXYZ:ml,luminanceCoefficients:fl,workingColorSpaceConfig:{unpackColorSpace:De},outputColorSpaceConfig:{drawingBufferColorSpace:De}},[De]:{primaries:ul,whitePoint:dl,transfer:te,toXYZ:pl,fromXYZ:ml,luminanceCoefficients:fl,outputColorSpaceConfig:{drawingBufferColorSpace:De}}});let Ri;class Yd{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ri===void 0&&(Ri=qr("canvas")),Ri.width=t.width,Ri.height=t.height;const n=Ri.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ri}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=qr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Un(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Un(e[n]/255)*255):e[n]=Un(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let jd=0;class cu{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:jd++}),this.uuid=Dn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Eo(s[o].image)):r.push(Eo(s[o]))}else r=Eo(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Eo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Yd.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Zd=0;class Fe extends cs{constructor(t=Fe.DEFAULT_IMAGE,e=Fe.DEFAULT_MAPPING,n=mi,s=mi,r=gn,o=gi,a=cn,c=Nn,l=Fe.DEFAULT_ANISOTROPY,h=$n){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Zd++}),this.uuid=Dn(),this.name="",this.source=new cu(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ht(0,0),this.repeat=new ht(1,1),this.center=new ht(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ft,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Yh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ds:t.x=t.x-Math.floor(t.x);break;case mi:t.x=t.x<0?0:1;break;case _a:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ds:t.y=t.y-Math.floor(t.y);break;case mi:t.y=t.y<0?0:1;break;case _a:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Fe.DEFAULT_IMAGE=null;Fe.DEFAULT_MAPPING=Yh;Fe.DEFAULT_ANISOTROPY=1;class fe{constructor(t=0,e=0,n=0,s=1){fe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(l+1)/2,v=(d+1)/2,F=(p+1)/2,C=(h+f)/4,A=(u+_)/4,P=(g+m)/4;return M>v&&M>F?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=C/n,r=A/n):v>F?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=C/s,r=P/s):F<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(F),n=A/r,s=P/r),this.set(n,s,r,e),this}let E=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(E)<.001&&(E=1),this.x=(m-g)/E,this.y=(u-_)/E,this.z=(f-h)/E,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Jd extends cs{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new fe(0,0,t,e),this.scissorTest=!1,this.viewport=new fe(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:gn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Fe(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new cu(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Mi extends Jd{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class lu extends Fe{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Kd extends Fe{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Vs{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3];const f=r[o+0],d=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=_;return}if(u!==_||c!==f||l!==d||h!==g){let m=1-a;const p=c*f+l*d+h*g+u*_,E=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const F=Math.sqrt(M),C=Math.atan2(F,p*E);m=Math.sin(m*C)/F,a=Math.sin(a*C)/F}const v=a*E;if(c=c*m+f*v,l=l*m+d*v,h=h*m+g*v,u=u*m+_*v,m===1-a){const F=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=F,l*=F,h*=F,u*=F}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],f=r[o+1],d=r[o+2],g=r[o+3];return t[e]=a*g+h*u+c*d-l*f,t[e+1]=c*g+h*f+l*u-a*d,t[e+2]=l*g+h*d+a*f-c*u,t[e+3]=h*g-a*u-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),f=c(n/2),d=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"YZX":this._x=f*h*u+l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u-f*d*g;break;case"XZY":this._x=f*h*u-l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(n>a&&n>u){const d=2*Math.sqrt(1+n-a-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>u){const d=2*Math.sqrt(1+a-n-u);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+h)/d}else{const d=2*Math.sqrt(1+u-n-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Me(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,f=Math.sin(e*h)/l;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(t=0,e=0,n=0){L.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(gl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(gl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return To.copy(this).projectOnVector(t),this.sub(To)}reflect(t){return this.sub(To.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Me(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const To=new L,gl=new Vs;class Gs{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(sn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(sn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=sn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,sn):sn.fromBufferAttribute(r,o),sn.applyMatrix4(t.matrixWorld),this.expandByPoint(sn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Js.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Js.copy(n.boundingBox)),Js.applyMatrix4(t.matrixWorld),this.union(Js)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,sn),sn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ds),Ks.subVectors(this.max,ds),Pi.subVectors(t.a,ds),Li.subVectors(t.b,ds),Ii.subVectors(t.c,ds),Bn.subVectors(Li,Pi),kn.subVectors(Ii,Li),ii.subVectors(Pi,Ii);let e=[0,-Bn.z,Bn.y,0,-kn.z,kn.y,0,-ii.z,ii.y,Bn.z,0,-Bn.x,kn.z,0,-kn.x,ii.z,0,-ii.x,-Bn.y,Bn.x,0,-kn.y,kn.x,0,-ii.y,ii.x,0];return!Co(e,Pi,Li,Ii,Ks)||(e=[1,0,0,0,1,0,0,0,1],!Co(e,Pi,Li,Ii,Ks))?!1:(Qs.crossVectors(Bn,kn),e=[Qs.x,Qs.y,Qs.z],Co(e,Pi,Li,Ii,Ks))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,sn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(sn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Sn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Sn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Sn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Sn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Sn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Sn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Sn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Sn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Sn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Sn=[new L,new L,new L,new L,new L,new L,new L,new L],sn=new L,Js=new Gs,Pi=new L,Li=new L,Ii=new L,Bn=new L,kn=new L,ii=new L,ds=new L,Ks=new L,Qs=new L,si=new L;function Co(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){si.fromArray(i,r);const a=s.x*Math.abs(si.x)+s.y*Math.abs(si.y)+s.z*Math.abs(si.z),c=t.dot(si),l=e.dot(si),h=n.dot(si);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const Qd=new Gs,ps=new L,Ao=new L;class Ws{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Qd.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ps.subVectors(t,this.center);const e=ps.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ps,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ao.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ps.copy(t.center).add(Ao)),this.expandByPoint(ps.copy(t.center).sub(Ao))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Mn=new L,wo=new L,tr=new L,zn=new L,Ro=new L,er=new L,Po=new L;class bc{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Mn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Mn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Mn.copy(this.origin).addScaledVector(this.direction,e),Mn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){wo.copy(t).add(e).multiplyScalar(.5),tr.copy(e).sub(t).normalize(),zn.copy(this.origin).sub(wo);const r=t.distanceTo(e)*.5,o=-this.direction.dot(tr),a=zn.dot(this.direction),c=-zn.dot(tr),l=zn.lengthSq(),h=Math.abs(1-o*o);let u,f,d,g;if(h>0)if(u=o*c-a,f=o*a-c,g=r*h,u>=0)if(f>=-g)if(f<=g){const _=1/h;u*=_,f*=_,d=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(wo).addScaledVector(tr,f),d}intersectSphere(t,e){Mn.subVectors(t.center,this.origin);const n=Mn.dot(this.direction),s=Mn.dot(Mn)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Mn)!==null}intersectTriangle(t,e,n,s,r){Ro.subVectors(e,t),er.subVectors(n,t),Po.crossVectors(Ro,er);let o=this.direction.dot(Po),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;zn.subVectors(this.origin,t);const c=a*this.direction.dot(er.crossVectors(zn,er));if(c<0)return null;const l=a*this.direction.dot(Ro.cross(zn));if(l<0||c+l>o)return null;const h=-a*zn.dot(Po);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class oe{constructor(t,e,n,s,r,o,a,c,l,h,u,f,d,g,_,m){oe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,u,f,d,g,_,m)}set(t,e,n,s,r,o,a,c,l,h,u,f,d,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new oe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Di.setFromMatrixColumn(t,0).length(),r=1/Di.setFromMatrixColumn(t,1).length(),o=1/Di.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=o*h,d=o*u,g=a*h,_=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=d+g*l,e[5]=f-_*l,e[9]=-a*c,e[2]=_-f*l,e[6]=g+d*l,e[10]=o*c}else if(t.order==="YXZ"){const f=c*h,d=c*u,g=l*h,_=l*u;e[0]=f+_*a,e[4]=g*a-d,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-g,e[6]=_+f*a,e[10]=o*c}else if(t.order==="ZXY"){const f=c*h,d=c*u,g=l*h,_=l*u;e[0]=f-_*a,e[4]=-o*u,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*h,e[9]=_-f*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const f=o*h,d=o*u,g=a*h,_=a*u;e[0]=c*h,e[4]=g*l-d,e[8]=f*l+_,e[1]=c*u,e[5]=_*l+f,e[9]=d*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const f=o*c,d=o*l,g=a*c,_=a*l;e[0]=c*h,e[4]=_-f*u,e[8]=g*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=d*u+g,e[10]=f-_*u}else if(t.order==="XZY"){const f=o*c,d=o*l,g=a*c,_=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+_,e[5]=o*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=a*h,e[10]=_*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(tp,t,ep)}lookAt(t,e,n){const s=this.elements;return $e.subVectors(t,e),$e.lengthSq()===0&&($e.z=1),$e.normalize(),Hn.crossVectors(n,$e),Hn.lengthSq()===0&&(Math.abs(n.z)===1?$e.x+=1e-4:$e.z+=1e-4,$e.normalize(),Hn.crossVectors(n,$e)),Hn.normalize(),nr.crossVectors($e,Hn),s[0]=Hn.x,s[4]=nr.x,s[8]=$e.x,s[1]=Hn.y,s[5]=nr.y,s[9]=$e.y,s[2]=Hn.z,s[6]=nr.z,s[10]=$e.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],E=n[3],M=n[7],v=n[11],F=n[15],C=s[0],A=s[4],P=s[8],b=s[12],S=s[1],w=s[5],H=s[9],B=s[13],V=s[2],J=s[6],W=s[10],tt=s[14],G=s[3],q=s[7],Q=s[11],rt=s[15];return r[0]=o*C+a*S+c*V+l*G,r[4]=o*A+a*w+c*J+l*q,r[8]=o*P+a*H+c*W+l*Q,r[12]=o*b+a*B+c*tt+l*rt,r[1]=h*C+u*S+f*V+d*G,r[5]=h*A+u*w+f*J+d*q,r[9]=h*P+u*H+f*W+d*Q,r[13]=h*b+u*B+f*tt+d*rt,r[2]=g*C+_*S+m*V+p*G,r[6]=g*A+_*w+m*J+p*q,r[10]=g*P+_*H+m*W+p*Q,r[14]=g*b+_*B+m*tt+p*rt,r[3]=E*C+M*S+v*V+F*G,r[7]=E*A+M*w+v*J+F*q,r[11]=E*P+M*H+v*W+F*Q,r[15]=E*b+M*B+v*tt+F*rt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+r*c*u-s*l*u-r*a*f+n*l*f+s*a*d-n*c*d)+_*(+e*c*d-e*l*f+r*o*f-s*o*d+s*l*h-r*c*h)+m*(+e*l*u-e*a*d-r*o*u+n*o*d+r*a*h-n*l*h)+p*(-s*a*h-e*c*u+e*a*f+s*o*u-n*o*f+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],_=t[13],m=t[14],p=t[15],E=u*m*l-_*f*l+_*c*d-a*m*d-u*c*p+a*f*p,M=g*f*l-h*m*l-g*c*d+o*m*d+h*c*p-o*f*p,v=h*_*l-g*u*l+g*a*d-o*_*d-h*a*p+o*u*p,F=g*u*c-h*_*c-g*a*f+o*_*f+h*a*m-o*u*m,C=e*E+n*M+s*v+r*F;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/C;return t[0]=E*A,t[1]=(_*f*r-u*m*r-_*s*d+n*m*d+u*s*p-n*f*p)*A,t[2]=(a*m*r-_*c*r+_*s*l-n*m*l-a*s*p+n*c*p)*A,t[3]=(u*c*r-a*f*r-u*s*l+n*f*l+a*s*d-n*c*d)*A,t[4]=M*A,t[5]=(h*m*r-g*f*r+g*s*d-e*m*d-h*s*p+e*f*p)*A,t[6]=(g*c*r-o*m*r-g*s*l+e*m*l+o*s*p-e*c*p)*A,t[7]=(o*f*r-h*c*r+h*s*l-e*f*l-o*s*d+e*c*d)*A,t[8]=v*A,t[9]=(g*u*r-h*_*r-g*n*d+e*_*d+h*n*p-e*u*p)*A,t[10]=(o*_*r-g*a*r+g*n*l-e*_*l-o*n*p+e*a*p)*A,t[11]=(h*a*r-o*u*r-h*n*l+e*u*l+o*n*d-e*a*d)*A,t[12]=F*A,t[13]=(h*_*s-g*u*s+g*n*f-e*_*f-h*n*m+e*u*m)*A,t[14]=(g*a*s-o*_*s-g*n*c+e*_*c+o*n*m-e*a*m)*A,t[15]=(o*u*s-h*a*s+h*n*c-e*u*c-o*n*f+e*a*f)*A,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,f=r*l,d=r*h,g=r*u,_=o*h,m=o*u,p=a*u,E=c*l,M=c*h,v=c*u,F=n.x,C=n.y,A=n.z;return s[0]=(1-(_+p))*F,s[1]=(d+v)*F,s[2]=(g-M)*F,s[3]=0,s[4]=(d-v)*C,s[5]=(1-(f+p))*C,s[6]=(m+E)*C,s[7]=0,s[8]=(g+M)*A,s[9]=(m-E)*A,s[10]=(1-(f+_))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Di.set(s[0],s[1],s[2]).length();const o=Di.set(s[4],s[5],s[6]).length(),a=Di.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],rn.copy(this);const l=1/r,h=1/o,u=1/a;return rn.elements[0]*=l,rn.elements[1]*=l,rn.elements[2]*=l,rn.elements[4]*=h,rn.elements[5]*=h,rn.elements[6]*=h,rn.elements[8]*=u,rn.elements[9]*=u,rn.elements[10]*=u,e.setFromRotationMatrix(rn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Rn){const c=this.elements,l=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s);let d,g;if(a===Rn)d=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===$r)d=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Rn){const c=this.elements,l=1/(e-t),h=1/(n-s),u=1/(o-r),f=(e+t)*l,d=(n+s)*h;let g,_;if(a===Rn)g=(o+r)*u,_=-2*u;else if(a===$r)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Di=new L,rn=new oe,tp=new L(0,0,0),ep=new L(1,1,1),Hn=new L,nr=new L,$e=new L,_l=new oe,vl=new Vs;class _n{constructor(t=0,e=0,n=0,s=_n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Me(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Me(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Me(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Me(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Me(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Me(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return _l.makeRotationFromQuaternion(t),this.setFromRotationMatrix(_l,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return vl.setFromEuler(this),this.setFromQuaternion(vl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}_n.DEFAULT_ORDER="XYZ";class hu{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let np=0;const xl=new L,Ui=new Vs,bn=new oe,ir=new L,ms=new L,ip=new L,sp=new Vs,yl=new L(1,0,0),Sl=new L(0,1,0),Ml=new L(0,0,1),bl={type:"added"},rp={type:"removed"},Ni={type:"childadded",child:null},Lo={type:"childremoved",child:null};class me extends cs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:np++}),this.uuid=Dn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=me.DEFAULT_UP.clone();const t=new L,e=new _n,n=new Vs,s=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new oe},normalMatrix:{value:new Ft}}),this.matrix=new oe,this.matrixWorld=new oe,this.matrixAutoUpdate=me.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new hu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ui.setFromAxisAngle(t,e),this.quaternion.multiply(Ui),this}rotateOnWorldAxis(t,e){return Ui.setFromAxisAngle(t,e),this.quaternion.premultiply(Ui),this}rotateX(t){return this.rotateOnAxis(yl,t)}rotateY(t){return this.rotateOnAxis(Sl,t)}rotateZ(t){return this.rotateOnAxis(Ml,t)}translateOnAxis(t,e){return xl.copy(t).applyQuaternion(this.quaternion),this.position.add(xl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(yl,t)}translateY(t){return this.translateOnAxis(Sl,t)}translateZ(t){return this.translateOnAxis(Ml,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(bn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ir.copy(t):ir.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ms.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bn.lookAt(ms,ir,this.up):bn.lookAt(ir,ms,this.up),this.quaternion.setFromRotationMatrix(bn),s&&(bn.extractRotation(s.matrixWorld),Ui.setFromRotationMatrix(bn),this.quaternion.premultiply(Ui.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(bl),Ni.child=t,this.dispatchEvent(Ni),Ni.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(rp),Lo.child=t,this.dispatchEvent(Lo),Lo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),bn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),bn.multiply(t.parent.matrixWorld)),t.applyMatrix4(bn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(bl),Ni.child=t,this.dispatchEvent(Ni),Ni.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ms,t,ip),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ms,sp,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}me.DEFAULT_UP=new L(0,1,0);me.DEFAULT_MATRIX_AUTO_UPDATE=!0;me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const on=new L,En=new L,Io=new L,Tn=new L,Fi=new L,Oi=new L,El=new L,Do=new L,Uo=new L,No=new L,Fo=new fe,Oo=new fe,Bo=new fe;class Ke{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),on.subVectors(t,e),s.cross(on);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){on.subVectors(s,e),En.subVectors(n,e),Io.subVectors(t,e);const o=on.dot(on),a=on.dot(En),c=on.dot(Io),l=En.dot(En),h=En.dot(Io),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(l*c-a*h)*f,g=(o*h-a*c)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Tn)===null?!1:Tn.x>=0&&Tn.y>=0&&Tn.x+Tn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Tn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Tn.x),c.addScaledVector(o,Tn.y),c.addScaledVector(a,Tn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return Fo.setScalar(0),Oo.setScalar(0),Bo.setScalar(0),Fo.fromBufferAttribute(t,e),Oo.fromBufferAttribute(t,n),Bo.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Fo,r.x),o.addScaledVector(Oo,r.y),o.addScaledVector(Bo,r.z),o}static isFrontFacing(t,e,n,s){return on.subVectors(n,e),En.subVectors(t,e),on.cross(En).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return on.subVectors(this.c,this.b),En.subVectors(this.a,this.b),on.cross(En).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ke.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Ke.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Ke.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Ke.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ke.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;Fi.subVectors(s,n),Oi.subVectors(r,n),Do.subVectors(t,n);const c=Fi.dot(Do),l=Oi.dot(Do);if(c<=0&&l<=0)return e.copy(n);Uo.subVectors(t,s);const h=Fi.dot(Uo),u=Oi.dot(Uo);if(h>=0&&u<=h)return e.copy(s);const f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(Fi,o);No.subVectors(t,r);const d=Fi.dot(No),g=Oi.dot(No);if(g>=0&&d<=g)return e.copy(r);const _=d*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(Oi,a);const m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return El.subVectors(r,s),a=(u-h)/(u-h+(d-g)),e.copy(s).addScaledVector(El,a);const p=1/(m+_+f);return o=_*p,a=f*p,e.copy(n).addScaledVector(Fi,o).addScaledVector(Oi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const uu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vn={h:0,s:0,l:0},sr={h:0,s:0,l:0};function ko(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Vt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=De){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Yt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=Yt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Yt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=Yt.workingColorSpace){if(t=Gd(t,1),e=Me(e,0,1),n=Me(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=ko(o,r,t+1/3),this.g=ko(o,r,t),this.b=ko(o,r,t-1/3)}return Yt.toWorkingColorSpace(this,s),this}setStyle(t,e=De){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=De){const n=uu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Un(t.r),this.g=Un(t.g),this.b=Un(t.b),this}copyLinearToSRGB(t){return this.r=Zi(t.r),this.g=Zi(t.g),this.b=Zi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=De){return Yt.fromWorkingColorSpace(Ae.copy(this),t),Math.round(Me(Ae.r*255,0,255))*65536+Math.round(Me(Ae.g*255,0,255))*256+Math.round(Me(Ae.b*255,0,255))}getHexString(t=De){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Yt.workingColorSpace){Yt.fromWorkingColorSpace(Ae.copy(this),e);const n=Ae.r,s=Ae.g,r=Ae.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Yt.workingColorSpace){return Yt.fromWorkingColorSpace(Ae.copy(this),e),t.r=Ae.r,t.g=Ae.g,t.b=Ae.b,t}getStyle(t=De){Yt.fromWorkingColorSpace(Ae.copy(this),t);const e=Ae.r,n=Ae.g,s=Ae.b;return t!==De?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Vn),this.setHSL(Vn.h+t,Vn.s+e,Vn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Vn),t.getHSL(sr);const n=Mo(Vn.h,sr.h,e),s=Mo(Vn.s,sr.s,e),r=Mo(Vn.l,sr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ae=new Vt;Vt.NAMES=uu;let op=0;class ti extends cs{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:op++}),this.uuid=Dn(),this.name="",this.blending=vi,this.side=Kn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=oa,this.blendDst=aa,this.blendEquation=ui,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Vt(0,0,0),this.blendAlpha=0,this.depthFunc=Ki,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=cl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=wi,this.stencilZFail=wi,this.stencilZPass=wi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==vi&&(n.blending=this.blending),this.side!==Kn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==oa&&(n.blendSrc=this.blendSrc),this.blendDst!==aa&&(n.blendDst=this.blendDst),this.blendEquation!==ui&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ki&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==cl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==wi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==wi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==wi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class hn extends ti{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Vt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.combine=$h,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const de=new L,rr=new ht;class Ge{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Wa,this.updateRanges=[],this.gpuType=wn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)rr.fromBufferAttribute(this,e),rr.applyMatrix3(t),this.setXY(e,rr.x,rr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)de.fromBufferAttribute(this,e),de.applyMatrix3(t),this.setXYZ(e,de.x,de.y,de.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)de.fromBufferAttribute(this,e),de.applyMatrix4(t),this.setXYZ(e,de.x,de.y,de.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)de.fromBufferAttribute(this,e),de.applyNormalMatrix(t),this.setXYZ(e,de.x,de.y,de.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)de.fromBufferAttribute(this,e),de.transformDirection(t),this.setXYZ(e,de.x,de.y,de.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=mn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ee(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=mn(e,this.array)),e}setX(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=mn(e,this.array)),e}setY(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=mn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=mn(e,this.array)),e}setW(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),s=ee(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),s=ee(s,this.array),r=ee(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Wa&&(t.usage=this.usage),t}}class fu extends Ge{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class du extends Ge{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Qt extends Ge{constructor(t,e,n){super(new Float32Array(t),e,n)}}let ap=0;const Ze=new oe,zo=new me,Bi=new L,qe=new Gs,gs=new Gs,ye=new L;class ge extends cs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ap++}),this.uuid=Dn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(au(t)?du:fu)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ft().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ze.makeRotationFromQuaternion(t),this.applyMatrix4(Ze),this}rotateX(t){return Ze.makeRotationX(t),this.applyMatrix4(Ze),this}rotateY(t){return Ze.makeRotationY(t),this.applyMatrix4(Ze),this}rotateZ(t){return Ze.makeRotationZ(t),this.applyMatrix4(Ze),this}translate(t,e,n){return Ze.makeTranslation(t,e,n),this.applyMatrix4(Ze),this}scale(t,e,n){return Ze.makeScale(t,e,n),this.applyMatrix4(Ze),this}lookAt(t){return zo.lookAt(t),zo.updateMatrix(),this.applyMatrix4(zo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bi).negate(),this.translate(Bi.x,Bi.y,Bi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Qt(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Gs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];qe.setFromBufferAttribute(r),this.morphTargetsRelative?(ye.addVectors(this.boundingBox.min,qe.min),this.boundingBox.expandByPoint(ye),ye.addVectors(this.boundingBox.max,qe.max),this.boundingBox.expandByPoint(ye)):(this.boundingBox.expandByPoint(qe.min),this.boundingBox.expandByPoint(qe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ws);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){const n=this.boundingSphere.center;if(qe.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];gs.setFromBufferAttribute(a),this.morphTargetsRelative?(ye.addVectors(qe.min,gs.min),qe.expandByPoint(ye),ye.addVectors(qe.max,gs.max),qe.expandByPoint(ye)):(qe.expandByPoint(gs.min),qe.expandByPoint(gs.max))}qe.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)ye.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(ye));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)ye.fromBufferAttribute(a,l),c&&(Bi.fromBufferAttribute(t,l),ye.add(Bi)),s=Math.max(s,n.distanceToSquared(ye))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ge(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let P=0;P<n.count;P++)a[P]=new L,c[P]=new L;const l=new L,h=new L,u=new L,f=new ht,d=new ht,g=new ht,_=new L,m=new L;function p(P,b,S){l.fromBufferAttribute(n,P),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,S),f.fromBufferAttribute(r,P),d.fromBufferAttribute(r,b),g.fromBufferAttribute(r,S),h.sub(l),u.sub(l),d.sub(f),g.sub(f);const w=1/(d.x*g.y-g.x*d.y);isFinite(w)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(w),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(w),a[P].add(_),a[b].add(_),a[S].add(_),c[P].add(m),c[b].add(m),c[S].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let P=0,b=E.length;P<b;++P){const S=E[P],w=S.start,H=S.count;for(let B=w,V=w+H;B<V;B+=3)p(t.getX(B+0),t.getX(B+1),t.getX(B+2))}const M=new L,v=new L,F=new L,C=new L;function A(P){F.fromBufferAttribute(s,P),C.copy(F);const b=a[P];M.copy(b),M.sub(F.multiplyScalar(F.dot(b))).normalize(),v.crossVectors(C,b);const w=v.dot(c[P])<0?-1:1;o.setXYZW(P,M.x,M.y,M.z,w)}for(let P=0,b=E.length;P<b;++P){const S=E[P],w=S.start,H=S.count;for(let B=w,V=w+H;B<V;B+=3)A(t.getX(B+0)),A(t.getX(B+1)),A(t.getX(B+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ge(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new L,r=new L,o=new L,a=new L,c=new L,l=new L,h=new L,u=new L;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),_=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ye.fromBufferAttribute(t,e),ye.normalize(),t.setXYZ(e,ye.x,ye.y,ye.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h);let d=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?d=c[_]*a.data.stride+a.offset:d=c[_]*h;for(let p=0;p<h;p++)f[g++]=l[d++]}return new Ge(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ge,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const f=l[h],d=t(f,n);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){const d=l[u];h.push(d.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Tl=new oe,ri=new bc,or=new Ws,Cl=new L,ar=new L,cr=new L,lr=new L,Ho=new L,hr=new L,Al=new L,ur=new L;class Tt extends me{constructor(t=new ge,e=new hn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){hr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(Ho.fromBufferAttribute(u,t),o?hr.addScaledVector(Ho,h):hr.addScaledVector(Ho.sub(e),h))}e.add(hr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),or.copy(n.boundingSphere),or.applyMatrix4(r),ri.copy(t.ray).recast(t.near),!(or.containsPoint(ri.origin)===!1&&(ri.intersectSphere(or,Cl)===null||ri.origin.distanceToSquared(Cl)>(t.far-t.near)**2))&&(Tl.copy(r).invert(),ri.copy(t.ray).applyMatrix4(Tl),!(n.boundingBox!==null&&ri.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ri)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],E=Math.max(m.start,d.start),M=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let v=E,F=M;v<F;v+=3){const C=a.getX(v),A=a.getX(v+1),P=a.getX(v+2);s=fr(this,p,t,n,l,h,u,C,A,P),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const E=a.getX(m),M=a.getX(m+1),v=a.getX(m+2);s=fr(this,o,t,n,l,h,u,E,M,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],E=Math.max(m.start,d.start),M=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let v=E,F=M;v<F;v+=3){const C=v,A=v+1,P=v+2;s=fr(this,p,t,n,l,h,u,C,A,P),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const E=m,M=m+1,v=m+2;s=fr(this,o,t,n,l,h,u,E,M,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function cp(i,t,e,n,s,r,o,a){let c;if(t.side===Ne?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Kn,a),c===null)return null;ur.copy(a),ur.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(ur);return l<e.near||l>e.far?null:{distance:l,point:ur.clone(),object:i}}function fr(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,ar),i.getVertexPosition(c,cr),i.getVertexPosition(l,lr);const h=cp(i,t,e,n,ar,cr,lr,Al);if(h){const u=new L;Ke.getBarycoord(Al,ar,cr,lr,u),s&&(h.uv=Ke.getInterpolatedAttribute(s,a,c,l,u,new ht)),r&&(h.uv1=Ke.getInterpolatedAttribute(r,a,c,l,u,new ht)),o&&(h.normal=Ke.getInterpolatedAttribute(o,a,c,l,u,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new L,materialIndex:0};Ke.getNormal(ar,cr,lr,f.normal),h.face=f,h.barycoord=u}return h}class Qe extends ge{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Qt(l,3)),this.setAttribute("normal",new Qt(h,3)),this.setAttribute("uv",new Qt(u,2));function g(_,m,p,E,M,v,F,C,A,P,b){const S=v/A,w=F/P,H=v/2,B=F/2,V=C/2,J=A+1,W=P+1;let tt=0,G=0;const q=new L;for(let Q=0;Q<W;Q++){const rt=Q*w-B;for(let xt=0;xt<J;xt++){const Dt=xt*S-H;q[_]=Dt*E,q[m]=rt*M,q[p]=V,l.push(q.x,q.y,q.z),q[_]=0,q[m]=0,q[p]=C>0?1:-1,h.push(q.x,q.y,q.z),u.push(xt/A),u.push(1-Q/P),tt+=1}}for(let Q=0;Q<P;Q++)for(let rt=0;rt<A;rt++){const xt=f+rt+J*Q,Dt=f+rt+J*(Q+1),$=f+(rt+1)+J*(Q+1),et=f+(rt+1)+J*Q;c.push(xt,Dt,et),c.push(Dt,$,et),G+=6}a.addGroup(d,G,b),d+=G,f+=tt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qe(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function is(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ie(i){const t={};for(let e=0;e<i.length;e++){const n=is(i[e]);for(const s in n)t[s]=n[s]}return t}function lp(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function pu(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Yt.workingColorSpace}const hp={clone:is,merge:Ie};var up=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,fp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Qn extends ti{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=up,this.fragmentShader=fp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=is(t.uniforms),this.uniformsGroups=lp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class mu extends me{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new oe,this.projectionMatrix=new oe,this.projectionMatrixInverse=new oe,this.coordinateSystem=Rn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Gn=new L,wl=new ht,Rl=new ht;class Je extends mu{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Xa*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(So*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Xa*2*Math.atan(Math.tan(So*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Gn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Gn.x,Gn.y).multiplyScalar(-t/Gn.z),Gn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Gn.x,Gn.y).multiplyScalar(-t/Gn.z)}getViewSize(t,e){return this.getViewBounds(t,wl,Rl),e.subVectors(Rl,wl)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(So*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ki=-90,zi=1;class dp extends me{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Je(ki,zi,t,e);s.layers=this.layers,this.add(s);const r=new Je(ki,zi,t,e);r.layers=this.layers,this.add(r);const o=new Je(ki,zi,t,e);o.layers=this.layers,this.add(o);const a=new Je(ki,zi,t,e);a.layers=this.layers,this.add(a);const c=new Je(ki,zi,t,e);c.layers=this.layers,this.add(c);const l=new Je(ki,zi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===Rn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===$r)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class gu extends Fe{constructor(t,e,n,s,r,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:Qi,super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class pp extends Mi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new gu(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:gn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Qe(5,5,5),r=new Qn({name:"CubemapFromEquirect",uniforms:is(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ne,blending:jn});r.uniforms.tEquirect.value=e;const o=new Tt(s,r),a=e.minFilter;return e.minFilter===gi&&(e.minFilter=gn),new dp(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}const Vo=new L,mp=new L,gp=new Ft;class li{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Vo.subVectors(n,e).cross(mp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Vo),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||gp.getNormalMatrix(t),s=this.coplanarPoint(Vo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const oi=new Ws,dr=new L;class Ec{constructor(t=new li,e=new li,n=new li,s=new li,r=new li,o=new li){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Rn){const n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],f=s[7],d=s[8],g=s[9],_=s[10],m=s[11],p=s[12],E=s[13],M=s[14],v=s[15];if(n[0].setComponents(c-r,f-l,m-d,v-p).normalize(),n[1].setComponents(c+r,f+l,m+d,v+p).normalize(),n[2].setComponents(c+o,f+h,m+g,v+E).normalize(),n[3].setComponents(c-o,f-h,m-g,v-E).normalize(),n[4].setComponents(c-a,f-u,m-_,v-M).normalize(),e===Rn)n[5].setComponents(c+a,f+u,m+_,v+M).normalize();else if(e===$r)n[5].setComponents(a,u,_,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),oi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),oi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(oi)}intersectsSprite(t){return oi.center.set(0,0,0),oi.radius=.7071067811865476,oi.applyMatrix4(t.matrixWorld),this.intersectsSphere(oi)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(dr.x=s.normal.x>0?t.max.x:t.min.x,dr.y=s.normal.y>0?t.max.y:t.min.y,dr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(dr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function _u(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function _p(i){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){const g=u[f],_=u[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,u[f]=_)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){const _=u[d];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}class tn extends ge{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=t/a,f=e/c,d=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const E=p*f-o;for(let M=0;M<l;M++){const v=M*u-r;g.push(v,-E,0),_.push(0,0,1),m.push(M/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let E=0;E<a;E++){const M=E+l*p,v=E+l*(p+1),F=E+1+l*(p+1),C=E+1+l*p;d.push(M,v,C),d.push(v,F,C)}this.setIndex(d),this.setAttribute("position",new Qt(g,3)),this.setAttribute("normal",new Qt(_,3)),this.setAttribute("uv",new Qt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new tn(t.width,t.height,t.widthSegments,t.heightSegments)}}var vp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,xp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,yp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Sp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Mp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,bp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ep=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Tp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Cp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Ap=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,wp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Rp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Pp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Lp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ip=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Dp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Up=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Np=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Fp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Op=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Bp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,kp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,zp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Hp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Vp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Gp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Wp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Xp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,$p=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,qp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Yp="gl_FragColor = linearToOutputTexel( gl_FragColor );",jp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Zp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Jp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Kp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Qp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,tm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,em=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,nm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,im=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,sm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,rm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,om=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,am=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,cm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,hm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,um=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,fm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,dm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,pm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,mm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,gm=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,_m=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,vm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,xm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ym=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Sm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Em=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Tm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Cm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Am=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Rm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Pm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Lm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Im=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Dm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Um=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Nm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Fm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Om=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,km=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,zm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Hm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Vm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Gm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Wm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Xm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,$m=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,qm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ym=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,jm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Zm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Jm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Km=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Qm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,tg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,eg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ng=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ig=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,sg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,rg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,og=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,ag=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,cg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,lg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,hg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ug=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,fg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,dg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,pg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,mg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,gg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const _g=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,vg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Eg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Tg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Cg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Ag=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,wg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Pg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Lg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Ig=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ug=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ng=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Fg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Og=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Bg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,kg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Vg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,$g=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,qg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,jg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Zg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,kt={alphahash_fragment:vp,alphahash_pars_fragment:xp,alphamap_fragment:yp,alphamap_pars_fragment:Sp,alphatest_fragment:Mp,alphatest_pars_fragment:bp,aomap_fragment:Ep,aomap_pars_fragment:Tp,batching_pars_vertex:Cp,batching_vertex:Ap,begin_vertex:wp,beginnormal_vertex:Rp,bsdfs:Pp,iridescence_fragment:Lp,bumpmap_pars_fragment:Ip,clipping_planes_fragment:Dp,clipping_planes_pars_fragment:Up,clipping_planes_pars_vertex:Np,clipping_planes_vertex:Fp,color_fragment:Op,color_pars_fragment:Bp,color_pars_vertex:kp,color_vertex:zp,common:Hp,cube_uv_reflection_fragment:Vp,defaultnormal_vertex:Gp,displacementmap_pars_vertex:Wp,displacementmap_vertex:Xp,emissivemap_fragment:$p,emissivemap_pars_fragment:qp,colorspace_fragment:Yp,colorspace_pars_fragment:jp,envmap_fragment:Zp,envmap_common_pars_fragment:Jp,envmap_pars_fragment:Kp,envmap_pars_vertex:Qp,envmap_physical_pars_fragment:hm,envmap_vertex:tm,fog_vertex:em,fog_pars_vertex:nm,fog_fragment:im,fog_pars_fragment:sm,gradientmap_pars_fragment:rm,lightmap_pars_fragment:om,lights_lambert_fragment:am,lights_lambert_pars_fragment:cm,lights_pars_begin:lm,lights_toon_fragment:um,lights_toon_pars_fragment:fm,lights_phong_fragment:dm,lights_phong_pars_fragment:pm,lights_physical_fragment:mm,lights_physical_pars_fragment:gm,lights_fragment_begin:_m,lights_fragment_maps:vm,lights_fragment_end:xm,logdepthbuf_fragment:ym,logdepthbuf_pars_fragment:Sm,logdepthbuf_pars_vertex:Mm,logdepthbuf_vertex:bm,map_fragment:Em,map_pars_fragment:Tm,map_particle_fragment:Cm,map_particle_pars_fragment:Am,metalnessmap_fragment:wm,metalnessmap_pars_fragment:Rm,morphinstance_vertex:Pm,morphcolor_vertex:Lm,morphnormal_vertex:Im,morphtarget_pars_vertex:Dm,morphtarget_vertex:Um,normal_fragment_begin:Nm,normal_fragment_maps:Fm,normal_pars_fragment:Om,normal_pars_vertex:Bm,normal_vertex:km,normalmap_pars_fragment:zm,clearcoat_normal_fragment_begin:Hm,clearcoat_normal_fragment_maps:Vm,clearcoat_pars_fragment:Gm,iridescence_pars_fragment:Wm,opaque_fragment:Xm,packing:$m,premultiplied_alpha_fragment:qm,project_vertex:Ym,dithering_fragment:jm,dithering_pars_fragment:Zm,roughnessmap_fragment:Jm,roughnessmap_pars_fragment:Km,shadowmap_pars_fragment:Qm,shadowmap_pars_vertex:tg,shadowmap_vertex:eg,shadowmask_pars_fragment:ng,skinbase_vertex:ig,skinning_pars_vertex:sg,skinning_vertex:rg,skinnormal_vertex:og,specularmap_fragment:ag,specularmap_pars_fragment:cg,tonemapping_fragment:lg,tonemapping_pars_fragment:hg,transmission_fragment:ug,transmission_pars_fragment:fg,uv_pars_fragment:dg,uv_pars_vertex:pg,uv_vertex:mg,worldpos_vertex:gg,background_vert:_g,background_frag:vg,backgroundCube_vert:xg,backgroundCube_frag:yg,cube_vert:Sg,cube_frag:Mg,depth_vert:bg,depth_frag:Eg,distanceRGBA_vert:Tg,distanceRGBA_frag:Cg,equirect_vert:Ag,equirect_frag:wg,linedashed_vert:Rg,linedashed_frag:Pg,meshbasic_vert:Lg,meshbasic_frag:Ig,meshlambert_vert:Dg,meshlambert_frag:Ug,meshmatcap_vert:Ng,meshmatcap_frag:Fg,meshnormal_vert:Og,meshnormal_frag:Bg,meshphong_vert:kg,meshphong_frag:zg,meshphysical_vert:Hg,meshphysical_frag:Vg,meshtoon_vert:Gg,meshtoon_frag:Wg,points_vert:Xg,points_frag:$g,shadow_vert:qg,shadow_frag:Yg,sprite_vert:jg,sprite_frag:Zg},at={common:{diffuse:{value:new Vt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ft}},envmap:{envMap:{value:null},envMapRotation:{value:new Ft},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ft}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ft}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ft},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ft},normalScale:{value:new ht(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ft},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ft}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ft}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ft}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Vt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Vt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0},uvTransform:{value:new Ft}},sprite:{diffuse:{value:new Vt(16777215)},opacity:{value:1},center:{value:new ht(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}}},dn={basic:{uniforms:Ie([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:kt.meshbasic_vert,fragmentShader:kt.meshbasic_frag},lambert:{uniforms:Ie([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Vt(0)}}]),vertexShader:kt.meshlambert_vert,fragmentShader:kt.meshlambert_frag},phong:{uniforms:Ie([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Vt(0)},specular:{value:new Vt(1118481)},shininess:{value:30}}]),vertexShader:kt.meshphong_vert,fragmentShader:kt.meshphong_frag},standard:{uniforms:Ie([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new Vt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag},toon:{uniforms:Ie([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new Vt(0)}}]),vertexShader:kt.meshtoon_vert,fragmentShader:kt.meshtoon_frag},matcap:{uniforms:Ie([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:kt.meshmatcap_vert,fragmentShader:kt.meshmatcap_frag},points:{uniforms:Ie([at.points,at.fog]),vertexShader:kt.points_vert,fragmentShader:kt.points_frag},dashed:{uniforms:Ie([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:kt.linedashed_vert,fragmentShader:kt.linedashed_frag},depth:{uniforms:Ie([at.common,at.displacementmap]),vertexShader:kt.depth_vert,fragmentShader:kt.depth_frag},normal:{uniforms:Ie([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:kt.meshnormal_vert,fragmentShader:kt.meshnormal_frag},sprite:{uniforms:Ie([at.sprite,at.fog]),vertexShader:kt.sprite_vert,fragmentShader:kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ft},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:kt.background_vert,fragmentShader:kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ft}},vertexShader:kt.backgroundCube_vert,fragmentShader:kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:kt.cube_vert,fragmentShader:kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:kt.equirect_vert,fragmentShader:kt.equirect_frag},distanceRGBA:{uniforms:Ie([at.common,at.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:kt.distanceRGBA_vert,fragmentShader:kt.distanceRGBA_frag},shadow:{uniforms:Ie([at.lights,at.fog,{color:{value:new Vt(0)},opacity:{value:1}}]),vertexShader:kt.shadow_vert,fragmentShader:kt.shadow_frag}};dn.physical={uniforms:Ie([dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ft},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ft},clearcoatNormalScale:{value:new ht(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ft},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ft},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ft},sheen:{value:0},sheenColor:{value:new Vt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ft},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ft},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ft},transmissionSamplerSize:{value:new ht},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ft},attenuationDistance:{value:0},attenuationColor:{value:new Vt(0)},specularColor:{value:new Vt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ft},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ft},anisotropyVector:{value:new ht},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ft}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag};const pr={r:0,b:0,g:0},ai=new _n,Jg=new oe;function Kg(i,t,e,n,s,r,o){const a=new Vt(0);let c=r===!0?0:1,l,h,u=null,f=0,d=null;function g(E){let M=E.isScene===!0?E.background:null;return M&&M.isTexture&&(M=(E.backgroundBlurriness>0?e:t).get(M)),M}function _(E){let M=!1;const v=g(E);v===null?p(a,c):v&&v.isColor&&(p(v,1),M=!0);const F=i.xr.getEnvironmentBlendMode();F==="additive"?n.buffers.color.setClear(0,0,0,1,o):F==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(E,M){const v=g(M);v&&(v.isCubeTexture||v.mapping===ao)?(h===void 0&&(h=new Tt(new Qe(1,1,1),new Qn({name:"BackgroundCubeMaterial",uniforms:is(dn.backgroundCube.uniforms),vertexShader:dn.backgroundCube.vertexShader,fragmentShader:dn.backgroundCube.fragmentShader,side:Ne,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(F,C,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ai.copy(M.backgroundRotation),ai.x*=-1,ai.y*=-1,ai.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(ai.y*=-1,ai.z*=-1),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Jg.makeRotationFromEuler(ai)),h.material.toneMapped=Yt.getTransfer(v.colorSpace)!==te,(u!==v||f!==v.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=v,f=v.version,d=i.toneMapping),h.layers.enableAll(),E.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new Tt(new tn(2,2),new Qn({name:"BackgroundMaterial",uniforms:is(dn.background.uniforms),vertexShader:dn.background.vertexShader,fragmentShader:dn.background.fragmentShader,side:Kn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=Yt.getTransfer(v.colorSpace)!==te,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||f!==v.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=v,f=v.version,d=i.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null))}function p(E,M){E.getRGB(pr,pu(i)),n.buffers.color.setClear(pr.r,pr.g,pr.b,M,o)}return{getClearColor:function(){return a},setClearColor:function(E,M=1){a.set(E),c=M,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(E){c=E,p(a,c)},render:_,addToRenderList:m}}function Qg(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function a(S,w,H,B,V){let J=!1;const W=u(B,H,w);r!==W&&(r=W,l(r.object)),J=d(S,B,H,V),J&&g(S,B,H,V),V!==null&&t.update(V,i.ELEMENT_ARRAY_BUFFER),(J||o)&&(o=!1,v(S,w,H,B),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function c(){return i.createVertexArray()}function l(S){return i.bindVertexArray(S)}function h(S){return i.deleteVertexArray(S)}function u(S,w,H){const B=H.wireframe===!0;let V=n[S.id];V===void 0&&(V={},n[S.id]=V);let J=V[w.id];J===void 0&&(J={},V[w.id]=J);let W=J[B];return W===void 0&&(W=f(c()),J[B]=W),W}function f(S){const w=[],H=[],B=[];for(let V=0;V<e;V++)w[V]=0,H[V]=0,B[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:w,enabledAttributes:H,attributeDivisors:B,object:S,attributes:{},index:null}}function d(S,w,H,B){const V=r.attributes,J=w.attributes;let W=0;const tt=H.getAttributes();for(const G in tt)if(tt[G].location>=0){const Q=V[G];let rt=J[G];if(rt===void 0&&(G==="instanceMatrix"&&S.instanceMatrix&&(rt=S.instanceMatrix),G==="instanceColor"&&S.instanceColor&&(rt=S.instanceColor)),Q===void 0||Q.attribute!==rt||rt&&Q.data!==rt.data)return!0;W++}return r.attributesNum!==W||r.index!==B}function g(S,w,H,B){const V={},J=w.attributes;let W=0;const tt=H.getAttributes();for(const G in tt)if(tt[G].location>=0){let Q=J[G];Q===void 0&&(G==="instanceMatrix"&&S.instanceMatrix&&(Q=S.instanceMatrix),G==="instanceColor"&&S.instanceColor&&(Q=S.instanceColor));const rt={};rt.attribute=Q,Q&&Q.data&&(rt.data=Q.data),V[G]=rt,W++}r.attributes=V,r.attributesNum=W,r.index=B}function _(){const S=r.newAttributes;for(let w=0,H=S.length;w<H;w++)S[w]=0}function m(S){p(S,0)}function p(S,w){const H=r.newAttributes,B=r.enabledAttributes,V=r.attributeDivisors;H[S]=1,B[S]===0&&(i.enableVertexAttribArray(S),B[S]=1),V[S]!==w&&(i.vertexAttribDivisor(S,w),V[S]=w)}function E(){const S=r.newAttributes,w=r.enabledAttributes;for(let H=0,B=w.length;H<B;H++)w[H]!==S[H]&&(i.disableVertexAttribArray(H),w[H]=0)}function M(S,w,H,B,V,J,W){W===!0?i.vertexAttribIPointer(S,w,H,V,J):i.vertexAttribPointer(S,w,H,B,V,J)}function v(S,w,H,B){_();const V=B.attributes,J=H.getAttributes(),W=w.defaultAttributeValues;for(const tt in J){const G=J[tt];if(G.location>=0){let q=V[tt];if(q===void 0&&(tt==="instanceMatrix"&&S.instanceMatrix&&(q=S.instanceMatrix),tt==="instanceColor"&&S.instanceColor&&(q=S.instanceColor)),q!==void 0){const Q=q.normalized,rt=q.itemSize,xt=t.get(q);if(xt===void 0)continue;const Dt=xt.buffer,$=xt.type,et=xt.bytesPerElement,pt=$===i.INT||$===i.UNSIGNED_INT||q.gpuType===_c;if(q.isInterleavedBufferAttribute){const ot=q.data,Ct=ot.stride,Rt=q.offset;if(ot.isInstancedInterleavedBuffer){for(let Ot=0;Ot<G.locationSize;Ot++)p(G.location+Ot,ot.meshPerAttribute);S.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let Ot=0;Ot<G.locationSize;Ot++)m(G.location+Ot);i.bindBuffer(i.ARRAY_BUFFER,Dt);for(let Ot=0;Ot<G.locationSize;Ot++)M(G.location+Ot,rt/G.locationSize,$,Q,Ct*et,(Rt+rt/G.locationSize*Ot)*et,pt)}else{if(q.isInstancedBufferAttribute){for(let ot=0;ot<G.locationSize;ot++)p(G.location+ot,q.meshPerAttribute);S.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let ot=0;ot<G.locationSize;ot++)m(G.location+ot);i.bindBuffer(i.ARRAY_BUFFER,Dt);for(let ot=0;ot<G.locationSize;ot++)M(G.location+ot,rt/G.locationSize,$,Q,rt*et,rt/G.locationSize*ot*et,pt)}}else if(W!==void 0){const Q=W[tt];if(Q!==void 0)switch(Q.length){case 2:i.vertexAttrib2fv(G.location,Q);break;case 3:i.vertexAttrib3fv(G.location,Q);break;case 4:i.vertexAttrib4fv(G.location,Q);break;default:i.vertexAttrib1fv(G.location,Q)}}}}E()}function F(){P();for(const S in n){const w=n[S];for(const H in w){const B=w[H];for(const V in B)h(B[V].object),delete B[V];delete w[H]}delete n[S]}}function C(S){if(n[S.id]===void 0)return;const w=n[S.id];for(const H in w){const B=w[H];for(const V in B)h(B[V].object),delete B[V];delete w[H]}delete n[S.id]}function A(S){for(const w in n){const H=n[w];if(H[S.id]===void 0)continue;const B=H[S.id];for(const V in B)h(B[V].object),delete B[V];delete H[S.id]}}function P(){b(),o=!0,r!==s&&(r=s,l(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:P,resetDefaultState:b,dispose:F,releaseStatesOfGeometry:C,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:m,disableUnusedAttributes:E}}function t0(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];e.update(d,n,1)}function c(l,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)o(l[g],h[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*f[_];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function e0(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==cn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const P=A===Hs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Nn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==wn&&!P)}function c(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),F=g>0,C=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:E,maxVaryings:M,maxFragmentUniforms:v,vertexTextures:F,maxSamples:C}}function n0(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new li,a=new Ft,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const E=r?0:n,M=E*4;let v=p.clippingState||null;c.value=v,v=h(g,f,M,d);for(let F=0;F!==M;++F)v[F]=e[F];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=E}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=d+_*4,E=f.matrixWorldInverse;a.getNormalMatrix(E),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,v=d;M!==_;++M,v+=4)o.copy(u[M]).applyMatrix4(E,a),o.normal.toArray(m,v),m[v+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function i0(i){let t=new WeakMap;function e(o,a){return a===ma?o.mapping=Qi:a===ga&&(o.mapping=ts),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===ma||a===ga)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new pp(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class vu extends mu{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const qi=4,Pl=[.125,.215,.35,.446,.526,.582],fi=20,Go=new vu,Ll=new Vt;let Wo=null,Xo=0,$o=0,qo=!1;const hi=(1+Math.sqrt(5))/2,Hi=1/hi,Il=[new L(-hi,Hi,0),new L(hi,Hi,0),new L(-Hi,0,hi),new L(Hi,0,hi),new L(0,hi,-Hi),new L(0,hi,Hi),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)];class Dl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Wo=this._renderer.getRenderTarget(),Xo=this._renderer.getActiveCubeFace(),$o=this._renderer.getActiveMipmapLevel(),qo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Fl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Nl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Wo,Xo,$o),this._renderer.xr.enabled=qo,t.scissorTest=!1,mr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Qi||t.mapping===ts?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Wo=this._renderer.getRenderTarget(),Xo=this._renderer.getActiveCubeFace(),$o=this._renderer.getActiveMipmapLevel(),qo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:gn,minFilter:gn,generateMipmaps:!1,type:Hs,format:cn,colorSpace:as,depthBuffer:!1},s=Ul(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ul(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=s0(r)),this._blurMaterial=r0(r,t,e)}return s}_compileMaterial(t){const e=new Tt(this._lodPlanes[0],t);this._renderer.compile(e,Go)}_sceneToCubeUV(t,e,n,s){const a=new Je(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Ll),h.toneMapping=Zn,h.autoClear=!1;const d=new hn({name:"PMREM.Background",side:Ne,depthWrite:!1,depthTest:!1}),g=new Tt(new Qe,d);let _=!1;const m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,_=!0):(d.color.copy(Ll),_=!0);for(let p=0;p<6;p++){const E=p%3;E===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):E===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const M=this._cubeSize;mr(s,E*M,p>2?M:0,M,M),h.setRenderTarget(s),_&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Qi||t.mapping===ts;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Fl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Nl());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Tt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;mr(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Go)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Il[(s-r-1)%Il.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Tt(this._lodPlanes[s],l),f=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*fi-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):fi;m>fi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${fi}`);const p=[];let E=0;for(let A=0;A<fi;++A){const P=A/_,b=Math.exp(-P*P/2);p.push(b),A===0?E+=b:A<m&&(E+=2*b)}for(let A=0;A<p.length;A++)p[A]=p[A]/E;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:M}=this;f.dTheta.value=g,f.mipInt.value=M-n;const v=this._sizeLods[s],F=3*v*(s>M-qi?s-M+qi:0),C=4*(this._cubeSize-v);mr(e,F,C,3*v,2*v),c.setRenderTarget(e),c.render(u,Go)}}function s0(i){const t=[],e=[],n=[];let s=i;const r=i-qi+1+Pl.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let c=1/a;o>i-qi?c=Pl[o-i+qi-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,_=3,m=2,p=1,E=new Float32Array(_*g*d),M=new Float32Array(m*g*d),v=new Float32Array(p*g*d);for(let C=0;C<d;C++){const A=C%3*2/3-1,P=C>2?0:-1,b=[A,P,0,A+2/3,P,0,A+2/3,P+1,0,A,P,0,A+2/3,P+1,0,A,P+1,0];E.set(b,_*g*C),M.set(f,m*g*C);const S=[C,C,C,C,C,C];v.set(S,p*g*C)}const F=new ge;F.setAttribute("position",new Ge(E,_)),F.setAttribute("uv",new Ge(M,m)),F.setAttribute("faceIndex",new Ge(v,p)),t.push(F),s>qi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Ul(i,t,e){const n=new Mi(i,t,e);return n.texture.mapping=ao,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function mr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function r0(i,t,e){const n=new Float32Array(fi),s=new L(0,1,0);return new Qn({name:"SphericalGaussianBlur",defines:{n:fi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Tc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:jn,depthTest:!1,depthWrite:!1})}function Nl(){return new Qn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Tc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:jn,depthTest:!1,depthWrite:!1})}function Fl(){return new Qn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Tc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:jn,depthTest:!1,depthWrite:!1})}function Tc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function o0(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===ma||c===ga,h=c===Qi||c===ts;if(l||h){let u=t.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Dl(i)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const d=a.image;return l&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new Dl(i)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function a0(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Ms("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function c0(i,t,e,n){const s={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)t.remove(_[m])}f.removeEventListener("dispose",o),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function c(u){const f=u.attributes;for(const g in f)t.update(f[g],i.ARRAY_BUFFER);const d=u.morphAttributes;for(const g in d){const _=d[g];for(let m=0,p=_.length;m<p;m++)t.update(_[m],i.ARRAY_BUFFER)}}function l(u){const f=[],d=u.index,g=u.attributes.position;let _=0;if(d!==null){const E=d.array;_=d.version;for(let M=0,v=E.length;M<v;M+=3){const F=E[M+0],C=E[M+1],A=E[M+2];f.push(F,C,C,A,A,F)}}else if(g!==void 0){const E=g.array;_=g.version;for(let M=0,v=E.length/3-1;M<v;M+=3){const F=M+0,C=M+1,A=M+2;f.push(F,C,C,A,A,F)}}else return;const m=new(au(f)?du:fu)(f,1);m.version=_;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function l0(i,t,e){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,d){i.drawElements(n,d,r,f*o),e.update(d,n,1)}function l(f,d,g){g!==0&&(i.drawElementsInstanced(n,d,r,f*o,g),e.update(d,n,g))}function h(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,n,1)}function u(f,d,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)l(f[p]/o,d[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,_,0,g);let p=0;for(let E=0;E<g;E++)p+=d[E]*_[E];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function h0(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function u0(i,t,e){const n=new WeakMap,s=new fe;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(a);if(f===void 0||f.count!==u){let b=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",b)};f!==void 0&&f.texture.dispose();const d=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],E=a.morphAttributes.color||[];let M=0;d===!0&&(M=1),g===!0&&(M=2),_===!0&&(M=3);let v=a.attributes.position.count*M,F=1;v>t.maxTextureSize&&(F=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);const C=new Float32Array(v*F*4*u),A=new lu(C,v,F,u);A.type=wn,A.needsUpdate=!0;const P=M*4;for(let S=0;S<u;S++){const w=m[S],H=p[S],B=E[S],V=v*F*4*S;for(let J=0;J<w.count;J++){const W=J*P;d===!0&&(s.fromBufferAttribute(w,J),C[V+W+0]=s.x,C[V+W+1]=s.y,C[V+W+2]=s.z,C[V+W+3]=0),g===!0&&(s.fromBufferAttribute(H,J),C[V+W+4]=s.x,C[V+W+5]=s.y,C[V+W+6]=s.z,C[V+W+7]=0),_===!0&&(s.fromBufferAttribute(B,J),C[V+W+8]=s.x,C[V+W+9]=s.y,C[V+W+10]=s.z,C[V+W+11]=B.itemSize===4?s.w:1)}}f={count:u,texture:A,size:new ht(v,F)},n.set(a,f),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let d=0;for(let _=0;_<l.length;_++)d+=l[_];const g=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function f0(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}class xu extends Fe{constructor(t,e,n,s,r,o,a,c,l,h=ji){if(h!==ji&&h!==ns)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===ji&&(n=Si),n===void 0&&h===ns&&(n=es),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:ln,this.minFilter=c!==void 0?c:ln,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const yu=new Fe,Ol=new xu(1,1),Su=new lu,Mu=new Kd,bu=new gu,Bl=[],kl=[],zl=new Float32Array(16),Hl=new Float32Array(9),Vl=new Float32Array(4);function ls(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Bl[s];if(r===void 0&&(r=new Float32Array(s),Bl[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function ve(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function xe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function lo(i,t){let e=kl[t];e===void 0&&(e=new Int32Array(t),kl[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function d0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function p0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;i.uniform2fv(this.addr,t),xe(e,t)}}function m0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ve(e,t))return;i.uniform3fv(this.addr,t),xe(e,t)}}function g0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;i.uniform4fv(this.addr,t),xe(e,t)}}function _0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ve(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),xe(e,t)}else{if(ve(e,n))return;Vl.set(n),i.uniformMatrix2fv(this.addr,!1,Vl),xe(e,n)}}function v0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ve(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),xe(e,t)}else{if(ve(e,n))return;Hl.set(n),i.uniformMatrix3fv(this.addr,!1,Hl),xe(e,n)}}function x0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ve(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),xe(e,t)}else{if(ve(e,n))return;zl.set(n),i.uniformMatrix4fv(this.addr,!1,zl),xe(e,n)}}function y0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function S0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;i.uniform2iv(this.addr,t),xe(e,t)}}function M0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ve(e,t))return;i.uniform3iv(this.addr,t),xe(e,t)}}function b0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;i.uniform4iv(this.addr,t),xe(e,t)}}function E0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function T0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;i.uniform2uiv(this.addr,t),xe(e,t)}}function C0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ve(e,t))return;i.uniform3uiv(this.addr,t),xe(e,t)}}function A0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;i.uniform4uiv(this.addr,t),xe(e,t)}}function w0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ol.compareFunction=ou,r=Ol):r=yu,e.setTexture2D(t||r,s)}function R0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Mu,s)}function P0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||bu,s)}function L0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Su,s)}function I0(i){switch(i){case 5126:return d0;case 35664:return p0;case 35665:return m0;case 35666:return g0;case 35674:return _0;case 35675:return v0;case 35676:return x0;case 5124:case 35670:return y0;case 35667:case 35671:return S0;case 35668:case 35672:return M0;case 35669:case 35673:return b0;case 5125:return E0;case 36294:return T0;case 36295:return C0;case 36296:return A0;case 35678:case 36198:case 36298:case 36306:case 35682:return w0;case 35679:case 36299:case 36307:return R0;case 35680:case 36300:case 36308:case 36293:return P0;case 36289:case 36303:case 36311:case 36292:return L0}}function D0(i,t){i.uniform1fv(this.addr,t)}function U0(i,t){const e=ls(t,this.size,2);i.uniform2fv(this.addr,e)}function N0(i,t){const e=ls(t,this.size,3);i.uniform3fv(this.addr,e)}function F0(i,t){const e=ls(t,this.size,4);i.uniform4fv(this.addr,e)}function O0(i,t){const e=ls(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function B0(i,t){const e=ls(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function k0(i,t){const e=ls(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function z0(i,t){i.uniform1iv(this.addr,t)}function H0(i,t){i.uniform2iv(this.addr,t)}function V0(i,t){i.uniform3iv(this.addr,t)}function G0(i,t){i.uniform4iv(this.addr,t)}function W0(i,t){i.uniform1uiv(this.addr,t)}function X0(i,t){i.uniform2uiv(this.addr,t)}function $0(i,t){i.uniform3uiv(this.addr,t)}function q0(i,t){i.uniform4uiv(this.addr,t)}function Y0(i,t,e){const n=this.cache,s=t.length,r=lo(e,s);ve(n,r)||(i.uniform1iv(this.addr,r),xe(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||yu,r[o])}function j0(i,t,e){const n=this.cache,s=t.length,r=lo(e,s);ve(n,r)||(i.uniform1iv(this.addr,r),xe(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Mu,r[o])}function Z0(i,t,e){const n=this.cache,s=t.length,r=lo(e,s);ve(n,r)||(i.uniform1iv(this.addr,r),xe(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||bu,r[o])}function J0(i,t,e){const n=this.cache,s=t.length,r=lo(e,s);ve(n,r)||(i.uniform1iv(this.addr,r),xe(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Su,r[o])}function K0(i){switch(i){case 5126:return D0;case 35664:return U0;case 35665:return N0;case 35666:return F0;case 35674:return O0;case 35675:return B0;case 35676:return k0;case 5124:case 35670:return z0;case 35667:case 35671:return H0;case 35668:case 35672:return V0;case 35669:case 35673:return G0;case 5125:return W0;case 36294:return X0;case 36295:return $0;case 36296:return q0;case 35678:case 36198:case 36298:case 36306:case 35682:return Y0;case 35679:case 36299:case 36307:return j0;case 35680:case 36300:case 36308:case 36293:return Z0;case 36289:case 36303:case 36311:case 36292:return J0}}class Q0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=I0(e.type)}}class t_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=K0(e.type)}}class e_{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Yo=/(\w+)(\])?(\[|\.)?/g;function Gl(i,t){i.seq.push(t),i.map[t.id]=t}function n_(i,t,e){const n=i.name,s=n.length;for(Yo.lastIndex=0;;){const r=Yo.exec(n),o=Yo.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Gl(e,l===void 0?new Q0(a,i,t):new t_(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new e_(a),Gl(e,u)),e=u}}}class Or{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);n_(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Wl(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const i_=37297;let s_=0;function r_(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Xl=new Ft;function o_(i){Yt._getMatrix(Xl,Yt.workingColorSpace,i);const t=`mat3( ${Xl.elements.map(e=>e.toFixed(4))} )`;switch(Yt.getTransfer(i)){case co:return[t,"LinearTransferOETF"];case te:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function $l(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+r_(i.getShaderSource(t),o)}else return s}function a_(i,t){const e=o_(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function c_(i,t){let e;switch(t){case Cd:e="Linear";break;case Ad:e="Reinhard";break;case wd:e="Cineon";break;case qh:e="ACESFilmic";break;case Pd:e="AgX";break;case Ld:e="Neutral";break;case Rd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const gr=new L;function l_(){Yt.getLuminanceCoefficients(gr);const i=gr.x.toFixed(4),t=gr.y.toFixed(4),e=gr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function h_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(bs).join(`
`)}function u_(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function f_(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function bs(i){return i!==""}function ql(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Yl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const d_=/^[ \t]*#include +<([\w\d./]+)>/gm;function $a(i){return i.replace(d_,m_)}const p_=new Map;function m_(i,t){let e=kt[t];if(e===void 0){const n=p_.get(t);if(n!==void 0)e=kt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return $a(e)}const g_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function jl(i){return i.replace(g_,__)}function __(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Zl(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function v_(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Wh?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Xh?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Cn&&(t="SHADOWMAP_TYPE_VSM"),t}function x_(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Qi:case ts:t="ENVMAP_TYPE_CUBE";break;case ao:t="ENVMAP_TYPE_CUBE_UV";break}return t}function y_(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ts:t="ENVMAP_MODE_REFRACTION";break}return t}function S_(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case $h:t="ENVMAP_BLENDING_MULTIPLY";break;case Ed:t="ENVMAP_BLENDING_MIX";break;case Td:t="ENVMAP_BLENDING_ADD";break}return t}function M_(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function b_(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=v_(e),l=x_(e),h=y_(e),u=S_(e),f=M_(e),d=h_(e),g=u_(r),_=s.createProgram();let m,p,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(bs).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(bs).join(`
`),p.length>0&&(p+=`
`)):(m=[Zl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(bs).join(`
`),p=[Zl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Zn?"#define TONE_MAPPING":"",e.toneMapping!==Zn?kt.tonemapping_pars_fragment:"",e.toneMapping!==Zn?c_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",kt.colorspace_pars_fragment,a_("linearToOutputTexel",e.outputColorSpace),l_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(bs).join(`
`)),o=$a(o),o=ql(o,e),o=Yl(o,e),a=$a(a),a=ql(a,e),a=Yl(a,e),o=jl(o),a=jl(a),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===ll?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ll?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=E+m+o,v=E+p+a,F=Wl(s,s.VERTEX_SHADER,M),C=Wl(s,s.FRAGMENT_SHADER,v);s.attachShader(_,F),s.attachShader(_,C),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function A(w){if(i.debug.checkShaderErrors){const H=s.getProgramInfoLog(_).trim(),B=s.getShaderInfoLog(F).trim(),V=s.getShaderInfoLog(C).trim();let J=!0,W=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(J=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,F,C);else{const tt=$l(s,F,"vertex"),G=$l(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+H+`
`+tt+`
`+G)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(B===""||V==="")&&(W=!1);W&&(w.diagnostics={runnable:J,programLog:H,vertexShader:{log:B,prefix:m},fragmentShader:{log:V,prefix:p}})}s.deleteShader(F),s.deleteShader(C),P=new Or(s,_),b=f_(s,_)}let P;this.getUniforms=function(){return P===void 0&&A(this),P};let b;this.getAttributes=function(){return b===void 0&&A(this),b};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(_,i_)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=s_++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=F,this.fragmentShader=C,this}let E_=0;class T_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new C_(t),e.set(t,n)),n}}class C_{constructor(t){this.id=E_++,this.code=t,this.usedTimes=0}}function A_(i,t,e,n,s,r,o){const a=new hu,c=new T_,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return l.add(b),b===0?"uv":`uv${b}`}function m(b,S,w,H,B){const V=H.fog,J=B.geometry,W=b.isMeshStandardMaterial?H.environment:null,tt=(b.isMeshStandardMaterial?e:t).get(b.envMap||W),G=tt&&tt.mapping===ao?tt.image.height:null,q=g[b.type];b.precision!==null&&(d=s.getMaxPrecision(b.precision),d!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));const Q=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,rt=Q!==void 0?Q.length:0;let xt=0;J.morphAttributes.position!==void 0&&(xt=1),J.morphAttributes.normal!==void 0&&(xt=2),J.morphAttributes.color!==void 0&&(xt=3);let Dt,$,et,pt;if(q){const Kt=dn[q];Dt=Kt.vertexShader,$=Kt.fragmentShader}else Dt=b.vertexShader,$=b.fragmentShader,c.update(b),et=c.getVertexShaderID(b),pt=c.getFragmentShaderID(b);const ot=i.getRenderTarget(),Ct=i.state.buffers.depth.getReversed(),Rt=B.isInstancedMesh===!0,Ot=B.isBatchedMesh===!0,ne=!!b.map,zt=!!b.matcap,ie=!!tt,D=!!b.aoMap,Be=!!b.lightMap,Ht=!!b.bumpMap,Gt=!!b.normalMap,wt=!!b.displacementMap,ae=!!b.emissiveMap,At=!!b.metalnessMap,T=!!b.roughnessMap,x=b.anisotropy>0,O=b.clearcoat>0,j=b.dispersion>0,K=b.iridescence>0,Y=b.sheen>0,bt=b.transmission>0,lt=x&&!!b.anisotropyMap,mt=O&&!!b.clearcoatMap,qt=O&&!!b.clearcoatNormalMap,nt=O&&!!b.clearcoatRoughnessMap,gt=K&&!!b.iridescenceMap,Pt=K&&!!b.iridescenceThicknessMap,Lt=Y&&!!b.sheenColorMap,_t=Y&&!!b.sheenRoughnessMap,Xt=!!b.specularMap,Bt=!!b.specularColorMap,se=!!b.specularIntensityMap,I=bt&&!!b.transmissionMap,ct=bt&&!!b.thicknessMap,X=!!b.gradientMap,Z=!!b.alphaMap,dt=b.alphaTest>0,ut=!!b.alphaHash,Ut=!!b.extensions;let ue=Zn;b.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(ue=i.toneMapping);const Te={shaderID:q,shaderType:b.type,shaderName:b.name,vertexShader:Dt,fragmentShader:$,defines:b.defines,customVertexShaderID:et,customFragmentShaderID:pt,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:Ot,batchingColor:Ot&&B._colorsTexture!==null,instancing:Rt,instancingColor:Rt&&B.instanceColor!==null,instancingMorph:Rt&&B.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ot===null?i.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:as,alphaToCoverage:!!b.alphaToCoverage,map:ne,matcap:zt,envMap:ie,envMapMode:ie&&tt.mapping,envMapCubeUVHeight:G,aoMap:D,lightMap:Be,bumpMap:Ht,normalMap:Gt,displacementMap:f&&wt,emissiveMap:ae,normalMapObjectSpace:Gt&&b.normalMapType===Nd,normalMapTangentSpace:Gt&&b.normalMapType===ru,metalnessMap:At,roughnessMap:T,anisotropy:x,anisotropyMap:lt,clearcoat:O,clearcoatMap:mt,clearcoatNormalMap:qt,clearcoatRoughnessMap:nt,dispersion:j,iridescence:K,iridescenceMap:gt,iridescenceThicknessMap:Pt,sheen:Y,sheenColorMap:Lt,sheenRoughnessMap:_t,specularMap:Xt,specularColorMap:Bt,specularIntensityMap:se,transmission:bt,transmissionMap:I,thicknessMap:ct,gradientMap:X,opaque:b.transparent===!1&&b.blending===vi&&b.alphaToCoverage===!1,alphaMap:Z,alphaTest:dt,alphaHash:ut,combine:b.combine,mapUv:ne&&_(b.map.channel),aoMapUv:D&&_(b.aoMap.channel),lightMapUv:Be&&_(b.lightMap.channel),bumpMapUv:Ht&&_(b.bumpMap.channel),normalMapUv:Gt&&_(b.normalMap.channel),displacementMapUv:wt&&_(b.displacementMap.channel),emissiveMapUv:ae&&_(b.emissiveMap.channel),metalnessMapUv:At&&_(b.metalnessMap.channel),roughnessMapUv:T&&_(b.roughnessMap.channel),anisotropyMapUv:lt&&_(b.anisotropyMap.channel),clearcoatMapUv:mt&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:qt&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:nt&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:gt&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:Pt&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:Lt&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:_t&&_(b.sheenRoughnessMap.channel),specularMapUv:Xt&&_(b.specularMap.channel),specularColorMapUv:Bt&&_(b.specularColorMap.channel),specularIntensityMapUv:se&&_(b.specularIntensityMap.channel),transmissionMapUv:I&&_(b.transmissionMap.channel),thicknessMapUv:ct&&_(b.thicknessMap.channel),alphaMapUv:Z&&_(b.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(Gt||x),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!J.attributes.uv&&(ne||Z),fog:!!V,useFog:b.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Ct,skinning:B.isSkinnedMesh===!0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:rt,morphTextureStride:xt,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&w.length>0,shadowMapType:i.shadowMap.type,toneMapping:ue,decodeVideoTexture:ne&&b.map.isVideoTexture===!0&&Yt.getTransfer(b.map.colorSpace)===te,decodeVideoTextureEmissive:ae&&b.emissiveMap.isVideoTexture===!0&&Yt.getTransfer(b.emissiveMap.colorSpace)===te,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Ve,flipSided:b.side===Ne,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Ut&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ut&&b.extensions.multiDraw===!0||Ot)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Te.vertexUv1s=l.has(1),Te.vertexUv2s=l.has(2),Te.vertexUv3s=l.has(3),l.clear(),Te}function p(b){const S=[];if(b.shaderID?S.push(b.shaderID):(S.push(b.customVertexShaderID),S.push(b.customFragmentShaderID)),b.defines!==void 0)for(const w in b.defines)S.push(w),S.push(b.defines[w]);return b.isRawShaderMaterial===!1&&(E(S,b),M(S,b),S.push(i.outputColorSpace)),S.push(b.customProgramCacheKey),S.join()}function E(b,S){b.push(S.precision),b.push(S.outputColorSpace),b.push(S.envMapMode),b.push(S.envMapCubeUVHeight),b.push(S.mapUv),b.push(S.alphaMapUv),b.push(S.lightMapUv),b.push(S.aoMapUv),b.push(S.bumpMapUv),b.push(S.normalMapUv),b.push(S.displacementMapUv),b.push(S.emissiveMapUv),b.push(S.metalnessMapUv),b.push(S.roughnessMapUv),b.push(S.anisotropyMapUv),b.push(S.clearcoatMapUv),b.push(S.clearcoatNormalMapUv),b.push(S.clearcoatRoughnessMapUv),b.push(S.iridescenceMapUv),b.push(S.iridescenceThicknessMapUv),b.push(S.sheenColorMapUv),b.push(S.sheenRoughnessMapUv),b.push(S.specularMapUv),b.push(S.specularColorMapUv),b.push(S.specularIntensityMapUv),b.push(S.transmissionMapUv),b.push(S.thicknessMapUv),b.push(S.combine),b.push(S.fogExp2),b.push(S.sizeAttenuation),b.push(S.morphTargetsCount),b.push(S.morphAttributeCount),b.push(S.numDirLights),b.push(S.numPointLights),b.push(S.numSpotLights),b.push(S.numSpotLightMaps),b.push(S.numHemiLights),b.push(S.numRectAreaLights),b.push(S.numDirLightShadows),b.push(S.numPointLightShadows),b.push(S.numSpotLightShadows),b.push(S.numSpotLightShadowsWithMaps),b.push(S.numLightProbes),b.push(S.shadowMapType),b.push(S.toneMapping),b.push(S.numClippingPlanes),b.push(S.numClipIntersection),b.push(S.depthPacking)}function M(b,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),b.push(a.mask)}function v(b){const S=g[b.type];let w;if(S){const H=dn[S];w=hp.clone(H.uniforms)}else w=b.uniforms;return w}function F(b,S){let w;for(let H=0,B=h.length;H<B;H++){const V=h[H];if(V.cacheKey===S){w=V,++w.usedTimes;break}}return w===void 0&&(w=new b_(i,S,b,r),h.push(w)),w}function C(b){if(--b.usedTimes===0){const S=h.indexOf(b);h[S]=h[h.length-1],h.pop(),b.destroy()}}function A(b){c.remove(b)}function P(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:F,releaseProgram:C,releaseShaderCache:A,programs:h,dispose:P}}function w_(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function R_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Jl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Kl(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,f,d,g,_,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),t++,p}function a(u,f,d,g,_,m){const p=o(u,f,d,g,_,m);d.transmission>0?n.push(p):d.transparent===!0?s.push(p):e.push(p)}function c(u,f,d,g,_,m){const p=o(u,f,d,g,_,m);d.transmission>0?n.unshift(p):d.transparent===!0?s.unshift(p):e.unshift(p)}function l(u,f){e.length>1&&e.sort(u||R_),n.length>1&&n.sort(f||Jl),s.length>1&&s.sort(f||Jl)}function h(){for(let u=t,f=i.length;u<f;u++){const d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function P_(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Kl,i.set(n,[o])):s>=r.length?(o=new Kl,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function L_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new Vt};break;case"SpotLight":e={position:new L,direction:new L,color:new Vt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new Vt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new Vt,groundColor:new Vt};break;case"RectAreaLight":e={color:new Vt,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function I_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let D_=0;function U_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function N_(i){const t=new L_,e=I_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);const s=new L,r=new oe,o=new oe;function a(l){let h=0,u=0,f=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,E=0,M=0,v=0,F=0,C=0,A=0;l.sort(U_);for(let b=0,S=l.length;b<S;b++){const w=l[b],H=w.color,B=w.intensity,V=w.distance,J=w.shadow&&w.shadow.map?w.shadow.map.texture:null;if(w.isAmbientLight)h+=H.r*B,u+=H.g*B,f+=H.b*B;else if(w.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(w.sh.coefficients[W],B);A++}else if(w.isDirectionalLight){const W=t.get(w);if(W.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){const tt=w.shadow,G=e.get(w);G.shadowIntensity=tt.intensity,G.shadowBias=tt.bias,G.shadowNormalBias=tt.normalBias,G.shadowRadius=tt.radius,G.shadowMapSize=tt.mapSize,n.directionalShadow[d]=G,n.directionalShadowMap[d]=J,n.directionalShadowMatrix[d]=w.shadow.matrix,E++}n.directional[d]=W,d++}else if(w.isSpotLight){const W=t.get(w);W.position.setFromMatrixPosition(w.matrixWorld),W.color.copy(H).multiplyScalar(B),W.distance=V,W.coneCos=Math.cos(w.angle),W.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),W.decay=w.decay,n.spot[_]=W;const tt=w.shadow;if(w.map&&(n.spotLightMap[F]=w.map,F++,tt.updateMatrices(w),w.castShadow&&C++),n.spotLightMatrix[_]=tt.matrix,w.castShadow){const G=e.get(w);G.shadowIntensity=tt.intensity,G.shadowBias=tt.bias,G.shadowNormalBias=tt.normalBias,G.shadowRadius=tt.radius,G.shadowMapSize=tt.mapSize,n.spotShadow[_]=G,n.spotShadowMap[_]=J,v++}_++}else if(w.isRectAreaLight){const W=t.get(w);W.color.copy(H).multiplyScalar(B),W.halfWidth.set(w.width*.5,0,0),W.halfHeight.set(0,w.height*.5,0),n.rectArea[m]=W,m++}else if(w.isPointLight){const W=t.get(w);if(W.color.copy(w.color).multiplyScalar(w.intensity),W.distance=w.distance,W.decay=w.decay,w.castShadow){const tt=w.shadow,G=e.get(w);G.shadowIntensity=tt.intensity,G.shadowBias=tt.bias,G.shadowNormalBias=tt.normalBias,G.shadowRadius=tt.radius,G.shadowMapSize=tt.mapSize,G.shadowCameraNear=tt.camera.near,G.shadowCameraFar=tt.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=J,n.pointShadowMatrix[g]=w.shadow.matrix,M++}n.point[g]=W,g++}else if(w.isHemisphereLight){const W=t.get(w);W.skyColor.copy(w.color).multiplyScalar(B),W.groundColor.copy(w.groundColor).multiplyScalar(B),n.hemi[p]=W,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=at.LTC_FLOAT_1,n.rectAreaLTC2=at.LTC_FLOAT_2):(n.rectAreaLTC1=at.LTC_HALF_1,n.rectAreaLTC2=at.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const P=n.hash;(P.directionalLength!==d||P.pointLength!==g||P.spotLength!==_||P.rectAreaLength!==m||P.hemiLength!==p||P.numDirectionalShadows!==E||P.numPointShadows!==M||P.numSpotShadows!==v||P.numSpotMaps!==F||P.numLightProbes!==A)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=v+F-C,n.spotLightMap.length=F,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=A,P.directionalLength=d,P.pointLength=g,P.spotLength=_,P.rectAreaLength=m,P.hemiLength=p,P.numDirectionalShadows=E,P.numPointShadows=M,P.numSpotShadows=v,P.numSpotMaps=F,P.numLightProbes=A,n.version=D_++)}function c(l,h){let u=0,f=0,d=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,E=l.length;p<E;p++){const M=l[p];if(M.isDirectionalLight){const v=n.directional[u];v.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),u++}else if(M.isSpotLight){const v=n.spot[d];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),d++}else if(M.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),o.identity(),r.copy(M.matrixWorld),r.premultiply(m),o.extractRotation(r),v.halfWidth.set(M.width*.5,0,0),v.halfHeight.set(0,M.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(M.isPointLight){const v=n.point[f];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(M.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function Ql(i){const t=new N_(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function F_(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Ql(i),t.set(s,[a])):r>=o.length?(a=new Ql(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class O_ extends ti{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Dd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class B_ extends ti{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const k_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,z_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function H_(i,t,e){let n=new Ec;const s=new ht,r=new ht,o=new fe,a=new O_({depthPacking:Ud}),c=new B_,l={},h=e.maxTextureSize,u={[Kn]:Ne,[Ne]:Kn,[Ve]:Ve},f=new Qn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ht},radius:{value:4}},vertexShader:k_,fragmentShader:z_}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new ge;g.setAttribute("position",new Ge(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Tt(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Wh;let p=this.type;this.render=function(C,A,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const b=i.getRenderTarget(),S=i.getActiveCubeFace(),w=i.getActiveMipmapLevel(),H=i.state;H.setBlending(jn),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const B=p!==Cn&&this.type===Cn,V=p===Cn&&this.type!==Cn;for(let J=0,W=C.length;J<W;J++){const tt=C[J],G=tt.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",tt,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const q=G.getFrameExtents();if(s.multiply(q),r.copy(G.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/q.x),s.x=r.x*q.x,G.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/q.y),s.y=r.y*q.y,G.mapSize.y=r.y)),G.map===null||B===!0||V===!0){const rt=this.type!==Cn?{minFilter:ln,magFilter:ln}:{};G.map!==null&&G.map.dispose(),G.map=new Mi(s.x,s.y,rt),G.map.texture.name=tt.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();const Q=G.getViewportCount();for(let rt=0;rt<Q;rt++){const xt=G.getViewport(rt);o.set(r.x*xt.x,r.y*xt.y,r.x*xt.z,r.y*xt.w),H.viewport(o),G.updateMatrices(tt,rt),n=G.getFrustum(),v(A,P,G.camera,tt,this.type)}G.isPointLightShadow!==!0&&this.type===Cn&&E(G,P),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(b,S,w)};function E(C,A){const P=t.update(_);f.defines.VSM_SAMPLES!==C.blurSamples&&(f.defines.VSM_SAMPLES=C.blurSamples,d.defines.VSM_SAMPLES=C.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Mi(s.x,s.y)),f.uniforms.shadow_pass.value=C.map.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(A,null,P,f,_,null),d.uniforms.shadow_pass.value=C.mapPass.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(A,null,P,d,_,null)}function M(C,A,P,b){let S=null;const w=P.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(w!==void 0)S=w;else if(S=P.isPointLight===!0?c:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const H=S.uuid,B=A.uuid;let V=l[H];V===void 0&&(V={},l[H]=V);let J=V[B];J===void 0&&(J=S.clone(),V[B]=J,A.addEventListener("dispose",F)),S=J}if(S.visible=A.visible,S.wireframe=A.wireframe,b===Cn?S.side=A.shadowSide!==null?A.shadowSide:A.side:S.side=A.shadowSide!==null?A.shadowSide:u[A.side],S.alphaMap=A.alphaMap,S.alphaTest=A.alphaTest,S.map=A.map,S.clipShadows=A.clipShadows,S.clippingPlanes=A.clippingPlanes,S.clipIntersection=A.clipIntersection,S.displacementMap=A.displacementMap,S.displacementScale=A.displacementScale,S.displacementBias=A.displacementBias,S.wireframeLinewidth=A.wireframeLinewidth,S.linewidth=A.linewidth,P.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const H=i.properties.get(S);H.light=P}return S}function v(C,A,P,b,S){if(C.visible===!1)return;if(C.layers.test(A.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&S===Cn)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,C.matrixWorld);const B=t.update(C),V=C.material;if(Array.isArray(V)){const J=B.groups;for(let W=0,tt=J.length;W<tt;W++){const G=J[W],q=V[G.materialIndex];if(q&&q.visible){const Q=M(C,q,b,S);C.onBeforeShadow(i,C,A,P,B,Q,G),i.renderBufferDirect(P,null,B,Q,C,G),C.onAfterShadow(i,C,A,P,B,Q,G)}}}else if(V.visible){const J=M(C,V,b,S);C.onBeforeShadow(i,C,A,P,B,J,null),i.renderBufferDirect(P,null,B,J,C,null),C.onAfterShadow(i,C,A,P,B,J,null)}}const H=C.children;for(let B=0,V=H.length;B<V;B++)v(H[B],A,P,b,S)}function F(C){C.target.removeEventListener("dispose",F);for(const P in l){const b=l[P],S=C.target.uuid;S in b&&(b[S].dispose(),delete b[S])}}}const V_={[ca]:la,[ha]:da,[ua]:pa,[Ki]:fa,[la]:ca,[da]:ha,[pa]:ua,[fa]:Ki};function G_(i,t){function e(){let I=!1;const ct=new fe;let X=null;const Z=new fe(0,0,0,0);return{setMask:function(dt){X!==dt&&!I&&(i.colorMask(dt,dt,dt,dt),X=dt)},setLocked:function(dt){I=dt},setClear:function(dt,ut,Ut,ue,Te){Te===!0&&(dt*=ue,ut*=ue,Ut*=ue),ct.set(dt,ut,Ut,ue),Z.equals(ct)===!1&&(i.clearColor(dt,ut,Ut,ue),Z.copy(ct))},reset:function(){I=!1,X=null,Z.set(-1,0,0,0)}}}function n(){let I=!1,ct=!1,X=null,Z=null,dt=null;return{setReversed:function(ut){if(ct!==ut){const Ut=t.get("EXT_clip_control");ct?Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.ZERO_TO_ONE_EXT):Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.NEGATIVE_ONE_TO_ONE_EXT);const ue=dt;dt=null,this.setClear(ue)}ct=ut},getReversed:function(){return ct},setTest:function(ut){ut?ot(i.DEPTH_TEST):Ct(i.DEPTH_TEST)},setMask:function(ut){X!==ut&&!I&&(i.depthMask(ut),X=ut)},setFunc:function(ut){if(ct&&(ut=V_[ut]),Z!==ut){switch(ut){case ca:i.depthFunc(i.NEVER);break;case la:i.depthFunc(i.ALWAYS);break;case ha:i.depthFunc(i.LESS);break;case Ki:i.depthFunc(i.LEQUAL);break;case ua:i.depthFunc(i.EQUAL);break;case fa:i.depthFunc(i.GEQUAL);break;case da:i.depthFunc(i.GREATER);break;case pa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Z=ut}},setLocked:function(ut){I=ut},setClear:function(ut){dt!==ut&&(ct&&(ut=1-ut),i.clearDepth(ut),dt=ut)},reset:function(){I=!1,X=null,Z=null,dt=null,ct=!1}}}function s(){let I=!1,ct=null,X=null,Z=null,dt=null,ut=null,Ut=null,ue=null,Te=null;return{setTest:function(Kt){I||(Kt?ot(i.STENCIL_TEST):Ct(i.STENCIL_TEST))},setMask:function(Kt){ct!==Kt&&!I&&(i.stencilMask(Kt),ct=Kt)},setFunc:function(Kt,en,xn){(X!==Kt||Z!==en||dt!==xn)&&(i.stencilFunc(Kt,en,xn),X=Kt,Z=en,dt=xn)},setOp:function(Kt,en,xn){(ut!==Kt||Ut!==en||ue!==xn)&&(i.stencilOp(Kt,en,xn),ut=Kt,Ut=en,ue=xn)},setLocked:function(Kt){I=Kt},setClear:function(Kt){Te!==Kt&&(i.clearStencil(Kt),Te=Kt)},reset:function(){I=!1,ct=null,X=null,Z=null,dt=null,ut=null,Ut=null,ue=null,Te=null}}}const r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,E=null,M=null,v=null,F=null,C=null,A=new Vt(0,0,0),P=0,b=!1,S=null,w=null,H=null,B=null,V=null;const J=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,tt=0;const G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?(tt=parseFloat(/^WebGL (\d)/.exec(G)[1]),W=tt>=1):G.indexOf("OpenGL ES")!==-1&&(tt=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),W=tt>=2);let q=null,Q={};const rt=i.getParameter(i.SCISSOR_BOX),xt=i.getParameter(i.VIEWPORT),Dt=new fe().fromArray(rt),$=new fe().fromArray(xt);function et(I,ct,X,Z){const dt=new Uint8Array(4),ut=i.createTexture();i.bindTexture(I,ut),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ut=0;Ut<X;Ut++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(ct,0,i.RGBA,1,1,Z,0,i.RGBA,i.UNSIGNED_BYTE,dt):i.texImage2D(ct+Ut,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,dt);return ut}const pt={};pt[i.TEXTURE_2D]=et(i.TEXTURE_2D,i.TEXTURE_2D,1),pt[i.TEXTURE_CUBE_MAP]=et(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),pt[i.TEXTURE_2D_ARRAY]=et(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),pt[i.TEXTURE_3D]=et(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ot(i.DEPTH_TEST),o.setFunc(Ki),Ht(!1),Gt(rl),ot(i.CULL_FACE),D(jn);function ot(I){h[I]!==!0&&(i.enable(I),h[I]=!0)}function Ct(I){h[I]!==!1&&(i.disable(I),h[I]=!1)}function Rt(I,ct){return u[I]!==ct?(i.bindFramebuffer(I,ct),u[I]=ct,I===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ct),I===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ct),!0):!1}function Ot(I,ct){let X=d,Z=!1;if(I){X=f.get(ct),X===void 0&&(X=[],f.set(ct,X));const dt=I.textures;if(X.length!==dt.length||X[0]!==i.COLOR_ATTACHMENT0){for(let ut=0,Ut=dt.length;ut<Ut;ut++)X[ut]=i.COLOR_ATTACHMENT0+ut;X.length=dt.length,Z=!0}}else X[0]!==i.BACK&&(X[0]=i.BACK,Z=!0);Z&&i.drawBuffers(X)}function ne(I){return g!==I?(i.useProgram(I),g=I,!0):!1}const zt={[ui]:i.FUNC_ADD,[ad]:i.FUNC_SUBTRACT,[cd]:i.FUNC_REVERSE_SUBTRACT};zt[ld]=i.MIN,zt[hd]=i.MAX;const ie={[ud]:i.ZERO,[fd]:i.ONE,[dd]:i.SRC_COLOR,[oa]:i.SRC_ALPHA,[xd]:i.SRC_ALPHA_SATURATE,[_d]:i.DST_COLOR,[md]:i.DST_ALPHA,[pd]:i.ONE_MINUS_SRC_COLOR,[aa]:i.ONE_MINUS_SRC_ALPHA,[vd]:i.ONE_MINUS_DST_COLOR,[gd]:i.ONE_MINUS_DST_ALPHA,[yd]:i.CONSTANT_COLOR,[Sd]:i.ONE_MINUS_CONSTANT_COLOR,[Md]:i.CONSTANT_ALPHA,[bd]:i.ONE_MINUS_CONSTANT_ALPHA};function D(I,ct,X,Z,dt,ut,Ut,ue,Te,Kt){if(I===jn){_===!0&&(Ct(i.BLEND),_=!1);return}if(_===!1&&(ot(i.BLEND),_=!0),I!==od){if(I!==m||Kt!==b){if((p!==ui||v!==ui)&&(i.blendEquation(i.FUNC_ADD),p=ui,v=ui),Kt)switch(I){case vi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Is:i.blendFunc(i.ONE,i.ONE);break;case ol:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case al:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case vi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Is:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case ol:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case al:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}E=null,M=null,F=null,C=null,A.set(0,0,0),P=0,m=I,b=Kt}return}dt=dt||ct,ut=ut||X,Ut=Ut||Z,(ct!==p||dt!==v)&&(i.blendEquationSeparate(zt[ct],zt[dt]),p=ct,v=dt),(X!==E||Z!==M||ut!==F||Ut!==C)&&(i.blendFuncSeparate(ie[X],ie[Z],ie[ut],ie[Ut]),E=X,M=Z,F=ut,C=Ut),(ue.equals(A)===!1||Te!==P)&&(i.blendColor(ue.r,ue.g,ue.b,Te),A.copy(ue),P=Te),m=I,b=!1}function Be(I,ct){I.side===Ve?Ct(i.CULL_FACE):ot(i.CULL_FACE);let X=I.side===Ne;ct&&(X=!X),Ht(X),I.blending===vi&&I.transparent===!1?D(jn):D(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),o.setFunc(I.depthFunc),o.setTest(I.depthTest),o.setMask(I.depthWrite),r.setMask(I.colorWrite);const Z=I.stencilWrite;a.setTest(Z),Z&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),ae(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?ot(i.SAMPLE_ALPHA_TO_COVERAGE):Ct(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ht(I){S!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),S=I)}function Gt(I){I!==sd?(ot(i.CULL_FACE),I!==w&&(I===rl?i.cullFace(i.BACK):I===rd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ct(i.CULL_FACE),w=I}function wt(I){I!==H&&(W&&i.lineWidth(I),H=I)}function ae(I,ct,X){I?(ot(i.POLYGON_OFFSET_FILL),(B!==ct||V!==X)&&(i.polygonOffset(ct,X),B=ct,V=X)):Ct(i.POLYGON_OFFSET_FILL)}function At(I){I?ot(i.SCISSOR_TEST):Ct(i.SCISSOR_TEST)}function T(I){I===void 0&&(I=i.TEXTURE0+J-1),q!==I&&(i.activeTexture(I),q=I)}function x(I,ct,X){X===void 0&&(q===null?X=i.TEXTURE0+J-1:X=q);let Z=Q[X];Z===void 0&&(Z={type:void 0,texture:void 0},Q[X]=Z),(Z.type!==I||Z.texture!==ct)&&(q!==X&&(i.activeTexture(X),q=X),i.bindTexture(I,ct||pt[I]),Z.type=I,Z.texture=ct)}function O(){const I=Q[q];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function j(){try{i.compressedTexImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function K(){try{i.compressedTexImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Y(){try{i.texSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function bt(){try{i.texSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function lt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function mt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function qt(){try{i.texStorage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function nt(){try{i.texStorage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function gt(){try{i.texImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Pt(){try{i.texImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Lt(I){Dt.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),Dt.copy(I))}function _t(I){$.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),$.copy(I))}function Xt(I,ct){let X=l.get(ct);X===void 0&&(X=new WeakMap,l.set(ct,X));let Z=X.get(I);Z===void 0&&(Z=i.getUniformBlockIndex(ct,I.name),X.set(I,Z))}function Bt(I,ct){const Z=l.get(ct).get(I);c.get(ct)!==Z&&(i.uniformBlockBinding(ct,Z,I.__bindingPointIndex),c.set(ct,Z))}function se(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},q=null,Q={},u={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,E=null,M=null,v=null,F=null,C=null,A=new Vt(0,0,0),P=0,b=!1,S=null,w=null,H=null,B=null,V=null,Dt.set(0,0,i.canvas.width,i.canvas.height),$.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ot,disable:Ct,bindFramebuffer:Rt,drawBuffers:Ot,useProgram:ne,setBlending:D,setMaterial:Be,setFlipSided:Ht,setCullFace:Gt,setLineWidth:wt,setPolygonOffset:ae,setScissorTest:At,activeTexture:T,bindTexture:x,unbindTexture:O,compressedTexImage2D:j,compressedTexImage3D:K,texImage2D:gt,texImage3D:Pt,updateUBOMapping:Xt,uniformBlockBinding:Bt,texStorage2D:qt,texStorage3D:nt,texSubImage2D:Y,texSubImage3D:bt,compressedTexSubImage2D:lt,compressedTexSubImage3D:mt,scissor:Lt,viewport:_t,reset:se}}function th(i,t,e,n){const s=W_(n);switch(e){case Kh:return i*t;case tu:return i*t;case eu:return i*t*2;case nu:return i*t/s.components*s.byteLength;case yc:return i*t/s.components*s.byteLength;case iu:return i*t*2/s.components*s.byteLength;case Sc:return i*t*2/s.components*s.byteLength;case Qh:return i*t*3/s.components*s.byteLength;case cn:return i*t*4/s.components*s.byteLength;case Mc:return i*t*4/s.components*s.byteLength;case Ir:case Dr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ur:case Nr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case xa:case Sa:return Math.max(i,16)*Math.max(t,8)/4;case va:case ya:return Math.max(i,8)*Math.max(t,8)/2;case Ma:case ba:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ea:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ta:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ca:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Aa:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case wa:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Ra:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Pa:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case La:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Ia:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Da:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Ua:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Na:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Fa:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Oa:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ba:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Fr:case ka:case za:return Math.ceil(i/4)*Math.ceil(t/4)*16;case su:case Ha:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Va:case Ga:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function W_(i){switch(i){case Nn:case jh:return{byteLength:1,components:1};case Us:case Zh:case Hs:return{byteLength:2,components:1};case vc:case xc:return{byteLength:2,components:4};case Si:case _c:case wn:return{byteLength:4,components:1};case Jh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function X_(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ht,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,x){return d?new OffscreenCanvas(T,x):qr("canvas")}function _(T,x,O){let j=1;const K=At(T);if((K.width>O||K.height>O)&&(j=O/Math.max(K.width,K.height)),j<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const Y=Math.floor(j*K.width),bt=Math.floor(j*K.height);u===void 0&&(u=g(Y,bt));const lt=x?g(Y,bt):u;return lt.width=Y,lt.height=bt,lt.getContext("2d").drawImage(T,0,0,Y,bt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+Y+"x"+bt+")."),lt}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),T;return T}function m(T){return T.generateMipmaps}function p(T){i.generateMipmap(T)}function E(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(T,x,O,j,K=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let Y=x;if(x===i.RED&&(O===i.FLOAT&&(Y=i.R32F),O===i.HALF_FLOAT&&(Y=i.R16F),O===i.UNSIGNED_BYTE&&(Y=i.R8)),x===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(Y=i.R8UI),O===i.UNSIGNED_SHORT&&(Y=i.R16UI),O===i.UNSIGNED_INT&&(Y=i.R32UI),O===i.BYTE&&(Y=i.R8I),O===i.SHORT&&(Y=i.R16I),O===i.INT&&(Y=i.R32I)),x===i.RG&&(O===i.FLOAT&&(Y=i.RG32F),O===i.HALF_FLOAT&&(Y=i.RG16F),O===i.UNSIGNED_BYTE&&(Y=i.RG8)),x===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&(Y=i.RG8UI),O===i.UNSIGNED_SHORT&&(Y=i.RG16UI),O===i.UNSIGNED_INT&&(Y=i.RG32UI),O===i.BYTE&&(Y=i.RG8I),O===i.SHORT&&(Y=i.RG16I),O===i.INT&&(Y=i.RG32I)),x===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),O===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),O===i.UNSIGNED_INT&&(Y=i.RGB32UI),O===i.BYTE&&(Y=i.RGB8I),O===i.SHORT&&(Y=i.RGB16I),O===i.INT&&(Y=i.RGB32I)),x===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),O===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),O===i.UNSIGNED_INT&&(Y=i.RGBA32UI),O===i.BYTE&&(Y=i.RGBA8I),O===i.SHORT&&(Y=i.RGBA16I),O===i.INT&&(Y=i.RGBA32I)),x===i.RGB&&O===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),x===i.RGBA){const bt=K?co:Yt.getTransfer(j);O===i.FLOAT&&(Y=i.RGBA32F),O===i.HALF_FLOAT&&(Y=i.RGBA16F),O===i.UNSIGNED_BYTE&&(Y=bt===te?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function v(T,x){let O;return T?x===null||x===Si||x===es?O=i.DEPTH24_STENCIL8:x===wn?O=i.DEPTH32F_STENCIL8:x===Us&&(O=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Si||x===es?O=i.DEPTH_COMPONENT24:x===wn?O=i.DEPTH_COMPONENT32F:x===Us&&(O=i.DEPTH_COMPONENT16),O}function F(T,x){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==ln&&T.minFilter!==gn?Math.log2(Math.max(x.width,x.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?x.mipmaps.length:1}function C(T){const x=T.target;x.removeEventListener("dispose",C),P(x),x.isVideoTexture&&h.delete(x)}function A(T){const x=T.target;x.removeEventListener("dispose",A),S(x)}function P(T){const x=n.get(T);if(x.__webglInit===void 0)return;const O=T.source,j=f.get(O);if(j){const K=j[x.__cacheKey];K.usedTimes--,K.usedTimes===0&&b(T),Object.keys(j).length===0&&f.delete(O)}n.remove(T)}function b(T){const x=n.get(T);i.deleteTexture(x.__webglTexture);const O=T.source,j=f.get(O);delete j[x.__cacheKey],o.memory.textures--}function S(T){const x=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(x.__webglFramebuffer[j]))for(let K=0;K<x.__webglFramebuffer[j].length;K++)i.deleteFramebuffer(x.__webglFramebuffer[j][K]);else i.deleteFramebuffer(x.__webglFramebuffer[j]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[j])}else{if(Array.isArray(x.__webglFramebuffer))for(let j=0;j<x.__webglFramebuffer.length;j++)i.deleteFramebuffer(x.__webglFramebuffer[j]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let j=0;j<x.__webglColorRenderbuffer.length;j++)x.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[j]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const O=T.textures;for(let j=0,K=O.length;j<K;j++){const Y=n.get(O[j]);Y.__webglTexture&&(i.deleteTexture(Y.__webglTexture),o.memory.textures--),n.remove(O[j])}n.remove(T)}let w=0;function H(){w=0}function B(){const T=w;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),w+=1,T}function V(T){const x=[];return x.push(T.wrapS),x.push(T.wrapT),x.push(T.wrapR||0),x.push(T.magFilter),x.push(T.minFilter),x.push(T.anisotropy),x.push(T.internalFormat),x.push(T.format),x.push(T.type),x.push(T.generateMipmaps),x.push(T.premultiplyAlpha),x.push(T.flipY),x.push(T.unpackAlignment),x.push(T.colorSpace),x.join()}function J(T,x){const O=n.get(T);if(T.isVideoTexture&&wt(T),T.isRenderTargetTexture===!1&&T.version>0&&O.__version!==T.version){const j=T.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(O,T,x);return}}e.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+x)}function W(T,x){const O=n.get(T);if(T.version>0&&O.__version!==T.version){$(O,T,x);return}e.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+x)}function tt(T,x){const O=n.get(T);if(T.version>0&&O.__version!==T.version){$(O,T,x);return}e.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+x)}function G(T,x){const O=n.get(T);if(T.version>0&&O.__version!==T.version){et(O,T,x);return}e.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+x)}const q={[Ds]:i.REPEAT,[mi]:i.CLAMP_TO_EDGE,[_a]:i.MIRRORED_REPEAT},Q={[ln]:i.NEAREST,[Id]:i.NEAREST_MIPMAP_NEAREST,[Zs]:i.NEAREST_MIPMAP_LINEAR,[gn]:i.LINEAR,[yo]:i.LINEAR_MIPMAP_NEAREST,[gi]:i.LINEAR_MIPMAP_LINEAR},rt={[Fd]:i.NEVER,[Vd]:i.ALWAYS,[Od]:i.LESS,[ou]:i.LEQUAL,[Bd]:i.EQUAL,[Hd]:i.GEQUAL,[kd]:i.GREATER,[zd]:i.NOTEQUAL};function xt(T,x){if(x.type===wn&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===gn||x.magFilter===yo||x.magFilter===Zs||x.magFilter===gi||x.minFilter===gn||x.minFilter===yo||x.minFilter===Zs||x.minFilter===gi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,q[x.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,q[x.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,q[x.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,Q[x.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,Q[x.minFilter]),x.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,rt[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===ln||x.minFilter!==Zs&&x.minFilter!==gi||x.type===wn&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const O=t.get("EXT_texture_filter_anisotropic");i.texParameterf(T,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function Dt(T,x){let O=!1;T.__webglInit===void 0&&(T.__webglInit=!0,x.addEventListener("dispose",C));const j=x.source;let K=f.get(j);K===void 0&&(K={},f.set(j,K));const Y=V(x);if(Y!==T.__cacheKey){K[Y]===void 0&&(K[Y]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,O=!0),K[Y].usedTimes++;const bt=K[T.__cacheKey];bt!==void 0&&(K[T.__cacheKey].usedTimes--,bt.usedTimes===0&&b(x)),T.__cacheKey=Y,T.__webglTexture=K[Y].texture}return O}function $(T,x,O){let j=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(j=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(j=i.TEXTURE_3D);const K=Dt(T,x),Y=x.source;e.bindTexture(j,T.__webglTexture,i.TEXTURE0+O);const bt=n.get(Y);if(Y.version!==bt.__version||K===!0){e.activeTexture(i.TEXTURE0+O);const lt=Yt.getPrimaries(Yt.workingColorSpace),mt=x.colorSpace===$n?null:Yt.getPrimaries(x.colorSpace),qt=x.colorSpace===$n||lt===mt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,qt);let nt=_(x.image,!1,s.maxTextureSize);nt=ae(x,nt);const gt=r.convert(x.format,x.colorSpace),Pt=r.convert(x.type);let Lt=M(x.internalFormat,gt,Pt,x.colorSpace,x.isVideoTexture);xt(j,x);let _t;const Xt=x.mipmaps,Bt=x.isVideoTexture!==!0,se=bt.__version===void 0||K===!0,I=Y.dataReady,ct=F(x,nt);if(x.isDepthTexture)Lt=v(x.format===ns,x.type),se&&(Bt?e.texStorage2D(i.TEXTURE_2D,1,Lt,nt.width,nt.height):e.texImage2D(i.TEXTURE_2D,0,Lt,nt.width,nt.height,0,gt,Pt,null));else if(x.isDataTexture)if(Xt.length>0){Bt&&se&&e.texStorage2D(i.TEXTURE_2D,ct,Lt,Xt[0].width,Xt[0].height);for(let X=0,Z=Xt.length;X<Z;X++)_t=Xt[X],Bt?I&&e.texSubImage2D(i.TEXTURE_2D,X,0,0,_t.width,_t.height,gt,Pt,_t.data):e.texImage2D(i.TEXTURE_2D,X,Lt,_t.width,_t.height,0,gt,Pt,_t.data);x.generateMipmaps=!1}else Bt?(se&&e.texStorage2D(i.TEXTURE_2D,ct,Lt,nt.width,nt.height),I&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,nt.width,nt.height,gt,Pt,nt.data)):e.texImage2D(i.TEXTURE_2D,0,Lt,nt.width,nt.height,0,gt,Pt,nt.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Bt&&se&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ct,Lt,Xt[0].width,Xt[0].height,nt.depth);for(let X=0,Z=Xt.length;X<Z;X++)if(_t=Xt[X],x.format!==cn)if(gt!==null)if(Bt){if(I)if(x.layerUpdates.size>0){const dt=th(_t.width,_t.height,x.format,x.type);for(const ut of x.layerUpdates){const Ut=_t.data.subarray(ut*dt/_t.data.BYTES_PER_ELEMENT,(ut+1)*dt/_t.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,X,0,0,ut,_t.width,_t.height,1,gt,Ut)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,X,0,0,0,_t.width,_t.height,nt.depth,gt,_t.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,X,Lt,_t.width,_t.height,nt.depth,0,_t.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Bt?I&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,X,0,0,0,_t.width,_t.height,nt.depth,gt,Pt,_t.data):e.texImage3D(i.TEXTURE_2D_ARRAY,X,Lt,_t.width,_t.height,nt.depth,0,gt,Pt,_t.data)}else{Bt&&se&&e.texStorage2D(i.TEXTURE_2D,ct,Lt,Xt[0].width,Xt[0].height);for(let X=0,Z=Xt.length;X<Z;X++)_t=Xt[X],x.format!==cn?gt!==null?Bt?I&&e.compressedTexSubImage2D(i.TEXTURE_2D,X,0,0,_t.width,_t.height,gt,_t.data):e.compressedTexImage2D(i.TEXTURE_2D,X,Lt,_t.width,_t.height,0,_t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Bt?I&&e.texSubImage2D(i.TEXTURE_2D,X,0,0,_t.width,_t.height,gt,Pt,_t.data):e.texImage2D(i.TEXTURE_2D,X,Lt,_t.width,_t.height,0,gt,Pt,_t.data)}else if(x.isDataArrayTexture)if(Bt){if(se&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ct,Lt,nt.width,nt.height,nt.depth),I)if(x.layerUpdates.size>0){const X=th(nt.width,nt.height,x.format,x.type);for(const Z of x.layerUpdates){const dt=nt.data.subarray(Z*X/nt.data.BYTES_PER_ELEMENT,(Z+1)*X/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Z,nt.width,nt.height,1,gt,Pt,dt)}x.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,gt,Pt,nt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Lt,nt.width,nt.height,nt.depth,0,gt,Pt,nt.data);else if(x.isData3DTexture)Bt?(se&&e.texStorage3D(i.TEXTURE_3D,ct,Lt,nt.width,nt.height,nt.depth),I&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,gt,Pt,nt.data)):e.texImage3D(i.TEXTURE_3D,0,Lt,nt.width,nt.height,nt.depth,0,gt,Pt,nt.data);else if(x.isFramebufferTexture){if(se)if(Bt)e.texStorage2D(i.TEXTURE_2D,ct,Lt,nt.width,nt.height);else{let X=nt.width,Z=nt.height;for(let dt=0;dt<ct;dt++)e.texImage2D(i.TEXTURE_2D,dt,Lt,X,Z,0,gt,Pt,null),X>>=1,Z>>=1}}else if(Xt.length>0){if(Bt&&se){const X=At(Xt[0]);e.texStorage2D(i.TEXTURE_2D,ct,Lt,X.width,X.height)}for(let X=0,Z=Xt.length;X<Z;X++)_t=Xt[X],Bt?I&&e.texSubImage2D(i.TEXTURE_2D,X,0,0,gt,Pt,_t):e.texImage2D(i.TEXTURE_2D,X,Lt,gt,Pt,_t);x.generateMipmaps=!1}else if(Bt){if(se){const X=At(nt);e.texStorage2D(i.TEXTURE_2D,ct,Lt,X.width,X.height)}I&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,gt,Pt,nt)}else e.texImage2D(i.TEXTURE_2D,0,Lt,gt,Pt,nt);m(x)&&p(j),bt.__version=Y.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function et(T,x,O){if(x.image.length!==6)return;const j=Dt(T,x),K=x.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+O);const Y=n.get(K);if(K.version!==Y.__version||j===!0){e.activeTexture(i.TEXTURE0+O);const bt=Yt.getPrimaries(Yt.workingColorSpace),lt=x.colorSpace===$n?null:Yt.getPrimaries(x.colorSpace),mt=x.colorSpace===$n||bt===lt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,mt);const qt=x.isCompressedTexture||x.image[0].isCompressedTexture,nt=x.image[0]&&x.image[0].isDataTexture,gt=[];for(let Z=0;Z<6;Z++)!qt&&!nt?gt[Z]=_(x.image[Z],!0,s.maxCubemapSize):gt[Z]=nt?x.image[Z].image:x.image[Z],gt[Z]=ae(x,gt[Z]);const Pt=gt[0],Lt=r.convert(x.format,x.colorSpace),_t=r.convert(x.type),Xt=M(x.internalFormat,Lt,_t,x.colorSpace),Bt=x.isVideoTexture!==!0,se=Y.__version===void 0||j===!0,I=K.dataReady;let ct=F(x,Pt);xt(i.TEXTURE_CUBE_MAP,x);let X;if(qt){Bt&&se&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ct,Xt,Pt.width,Pt.height);for(let Z=0;Z<6;Z++){X=gt[Z].mipmaps;for(let dt=0;dt<X.length;dt++){const ut=X[dt];x.format!==cn?Lt!==null?Bt?I&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,dt,0,0,ut.width,ut.height,Lt,ut.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,dt,Xt,ut.width,ut.height,0,ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Bt?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,dt,0,0,ut.width,ut.height,Lt,_t,ut.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,dt,Xt,ut.width,ut.height,0,Lt,_t,ut.data)}}}else{if(X=x.mipmaps,Bt&&se){X.length>0&&ct++;const Z=At(gt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ct,Xt,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(nt){Bt?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,gt[Z].width,gt[Z].height,Lt,_t,gt[Z].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Xt,gt[Z].width,gt[Z].height,0,Lt,_t,gt[Z].data);for(let dt=0;dt<X.length;dt++){const Ut=X[dt].image[Z].image;Bt?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,dt+1,0,0,Ut.width,Ut.height,Lt,_t,Ut.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,dt+1,Xt,Ut.width,Ut.height,0,Lt,_t,Ut.data)}}else{Bt?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Lt,_t,gt[Z]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Xt,Lt,_t,gt[Z]);for(let dt=0;dt<X.length;dt++){const ut=X[dt];Bt?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,dt+1,0,0,Lt,_t,ut.image[Z]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,dt+1,Xt,Lt,_t,ut.image[Z])}}}m(x)&&p(i.TEXTURE_CUBE_MAP),Y.__version=K.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function pt(T,x,O,j,K,Y){const bt=r.convert(O.format,O.colorSpace),lt=r.convert(O.type),mt=M(O.internalFormat,bt,lt,O.colorSpace),qt=n.get(x),nt=n.get(O);if(nt.__renderTarget=x,!qt.__hasExternalTextures){const gt=Math.max(1,x.width>>Y),Pt=Math.max(1,x.height>>Y);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?e.texImage3D(K,Y,mt,gt,Pt,x.depth,0,bt,lt,null):e.texImage2D(K,Y,mt,gt,Pt,0,bt,lt,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),Gt(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,K,nt.__webglTexture,0,Ht(x)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,j,K,nt.__webglTexture,Y),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ot(T,x,O){if(i.bindRenderbuffer(i.RENDERBUFFER,T),x.depthBuffer){const j=x.depthTexture,K=j&&j.isDepthTexture?j.type:null,Y=v(x.stencilBuffer,K),bt=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=Ht(x);Gt(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,lt,Y,x.width,x.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,lt,Y,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,Y,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,bt,i.RENDERBUFFER,T)}else{const j=x.textures;for(let K=0;K<j.length;K++){const Y=j[K],bt=r.convert(Y.format,Y.colorSpace),lt=r.convert(Y.type),mt=M(Y.internalFormat,bt,lt,Y.colorSpace),qt=Ht(x);O&&Gt(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,qt,mt,x.width,x.height):Gt(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,qt,mt,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,mt,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ct(T,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=n.get(x.depthTexture);j.__renderTarget=x,(!j.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),J(x.depthTexture,0);const K=j.__webglTexture,Y=Ht(x);if(x.depthTexture.format===ji)Gt(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0);else if(x.depthTexture.format===ns)Gt(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Rt(T){const x=n.get(T),O=T.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==T.depthTexture){const j=T.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),j){const K=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,j.removeEventListener("dispose",K)};j.addEventListener("dispose",K),x.__depthDisposeCallback=K}x.__boundDepthTexture=j}if(T.depthTexture&&!x.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");Ct(x.__webglFramebuffer,T)}else if(O){x.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[j]),x.__webglDepthbuffer[j]===void 0)x.__webglDepthbuffer[j]=i.createRenderbuffer(),ot(x.__webglDepthbuffer[j],T,!1);else{const K=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=x.__webglDepthbuffer[j];i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,Y)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),ot(x.__webglDepthbuffer,T,!1);else{const j=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,K)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ot(T,x,O){const j=n.get(T);x!==void 0&&pt(j.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&Rt(T)}function ne(T){const x=T.texture,O=n.get(T),j=n.get(x);T.addEventListener("dispose",A);const K=T.textures,Y=T.isWebGLCubeRenderTarget===!0,bt=K.length>1;if(bt||(j.__webglTexture===void 0&&(j.__webglTexture=i.createTexture()),j.__version=x.version,o.memory.textures++),Y){O.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer[lt]=[];for(let mt=0;mt<x.mipmaps.length;mt++)O.__webglFramebuffer[lt][mt]=i.createFramebuffer()}else O.__webglFramebuffer[lt]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer=[];for(let lt=0;lt<x.mipmaps.length;lt++)O.__webglFramebuffer[lt]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(bt)for(let lt=0,mt=K.length;lt<mt;lt++){const qt=n.get(K[lt]);qt.__webglTexture===void 0&&(qt.__webglTexture=i.createTexture(),o.memory.textures++)}if(T.samples>0&&Gt(T)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let lt=0;lt<K.length;lt++){const mt=K[lt];O.__webglColorRenderbuffer[lt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[lt]);const qt=r.convert(mt.format,mt.colorSpace),nt=r.convert(mt.type),gt=M(mt.internalFormat,qt,nt,mt.colorSpace,T.isXRRenderTarget===!0),Pt=Ht(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Pt,gt,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,O.__webglColorRenderbuffer[lt])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),ot(O.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Y){e.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),xt(i.TEXTURE_CUBE_MAP,x);for(let lt=0;lt<6;lt++)if(x.mipmaps&&x.mipmaps.length>0)for(let mt=0;mt<x.mipmaps.length;mt++)pt(O.__webglFramebuffer[lt][mt],T,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,mt);else pt(O.__webglFramebuffer[lt],T,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);m(x)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(bt){for(let lt=0,mt=K.length;lt<mt;lt++){const qt=K[lt],nt=n.get(qt);e.bindTexture(i.TEXTURE_2D,nt.__webglTexture),xt(i.TEXTURE_2D,qt),pt(O.__webglFramebuffer,T,qt,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,0),m(qt)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let lt=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(lt=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(lt,j.__webglTexture),xt(lt,x),x.mipmaps&&x.mipmaps.length>0)for(let mt=0;mt<x.mipmaps.length;mt++)pt(O.__webglFramebuffer[mt],T,x,i.COLOR_ATTACHMENT0,lt,mt);else pt(O.__webglFramebuffer,T,x,i.COLOR_ATTACHMENT0,lt,0);m(x)&&p(lt),e.unbindTexture()}T.depthBuffer&&Rt(T)}function zt(T){const x=T.textures;for(let O=0,j=x.length;O<j;O++){const K=x[O];if(m(K)){const Y=E(T),bt=n.get(K).__webglTexture;e.bindTexture(Y,bt),p(Y),e.unbindTexture()}}}const ie=[],D=[];function Be(T){if(T.samples>0){if(Gt(T)===!1){const x=T.textures,O=T.width,j=T.height;let K=i.COLOR_BUFFER_BIT;const Y=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,bt=n.get(T),lt=x.length>1;if(lt)for(let mt=0;mt<x.length;mt++)e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,bt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,bt.__webglFramebuffer);for(let mt=0;mt<x.length;mt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),lt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,bt.__webglColorRenderbuffer[mt]);const qt=n.get(x[mt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,qt,0)}i.blitFramebuffer(0,0,O,j,0,0,O,j,K,i.NEAREST),c===!0&&(ie.length=0,D.length=0,ie.push(i.COLOR_ATTACHMENT0+mt),T.depthBuffer&&T.resolveDepthBuffer===!1&&(ie.push(Y),D.push(Y),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,D)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ie))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),lt)for(let mt=0;mt<x.length;mt++){e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.RENDERBUFFER,bt.__webglColorRenderbuffer[mt]);const qt=n.get(x[mt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.TEXTURE_2D,qt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,bt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){const x=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function Ht(T){return Math.min(s.maxSamples,T.samples)}function Gt(T){const x=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function wt(T){const x=o.render.frame;h.get(T)!==x&&(h.set(T,x),T.update())}function ae(T,x){const O=T.colorSpace,j=T.format,K=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||O!==as&&O!==$n&&(Yt.getTransfer(O)===te?(j!==cn||K!==Nn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),x}function At(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=B,this.resetTextureUnits=H,this.setTexture2D=J,this.setTexture2DArray=W,this.setTexture3D=tt,this.setTextureCube=G,this.rebindTextures=Ot,this.setupRenderTarget=ne,this.updateRenderTargetMipmap=zt,this.updateMultisampleRenderTarget=Be,this.setupDepthRenderbuffer=Rt,this.setupFrameBufferTexture=pt,this.useMultisampledRTT=Gt}function $_(i,t){function e(n,s=$n){let r;const o=Yt.getTransfer(s);if(n===Nn)return i.UNSIGNED_BYTE;if(n===vc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===xc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Jh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===jh)return i.BYTE;if(n===Zh)return i.SHORT;if(n===Us)return i.UNSIGNED_SHORT;if(n===_c)return i.INT;if(n===Si)return i.UNSIGNED_INT;if(n===wn)return i.FLOAT;if(n===Hs)return i.HALF_FLOAT;if(n===Kh)return i.ALPHA;if(n===Qh)return i.RGB;if(n===cn)return i.RGBA;if(n===tu)return i.LUMINANCE;if(n===eu)return i.LUMINANCE_ALPHA;if(n===ji)return i.DEPTH_COMPONENT;if(n===ns)return i.DEPTH_STENCIL;if(n===nu)return i.RED;if(n===yc)return i.RED_INTEGER;if(n===iu)return i.RG;if(n===Sc)return i.RG_INTEGER;if(n===Mc)return i.RGBA_INTEGER;if(n===Ir||n===Dr||n===Ur||n===Nr)if(o===te)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ir)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ur)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Nr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ir)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Dr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ur)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Nr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===va||n===xa||n===ya||n===Sa)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===va)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===xa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ya)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Sa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ma||n===ba||n===Ea)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ma||n===ba)return o===te?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ea)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ta||n===Ca||n===Aa||n===wa||n===Ra||n===Pa||n===La||n===Ia||n===Da||n===Ua||n===Na||n===Fa||n===Oa||n===Ba)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ta)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ca)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Aa)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===wa)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ra)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Pa)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===La)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ia)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Da)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ua)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Na)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Fa)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Oa)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ba)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Fr||n===ka||n===za)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Fr)return o===te?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ka)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===za)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===su||n===Ha||n===Va||n===Ga)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Fr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ha)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Va)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ga)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===es?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class q_ extends Je{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Ue extends me{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Y_={type:"move"};class jo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ue,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ue,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ue,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Y_)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Ue;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const j_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Z_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class J_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Fe,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Qn({vertexShader:j_,fragmentShader:Z_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Tt(new tn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class K_ extends cs{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,g=null;const _=new J_,m=e.getContextAttributes();let p=null,E=null;const M=[],v=[],F=new ht;let C=null;const A=new Je;A.viewport=new fe;const P=new Je;P.viewport=new fe;const b=[A,P],S=new q_;let w=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let et=M[$];return et===void 0&&(et=new jo,M[$]=et),et.getTargetRaySpace()},this.getControllerGrip=function($){let et=M[$];return et===void 0&&(et=new jo,M[$]=et),et.getGripSpace()},this.getHand=function($){let et=M[$];return et===void 0&&(et=new jo,M[$]=et),et.getHandSpace()};function B($){const et=v.indexOf($.inputSource);if(et===-1)return;const pt=M[et];pt!==void 0&&(pt.update($.inputSource,$.frame,l||o),pt.dispatchEvent({type:$.type,data:$.inputSource}))}function V(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",J);for(let $=0;$<M.length;$++){const et=v[$];et!==null&&(v[$]=null,M[$].disconnect(et))}w=null,H=null,_.reset(),t.setRenderTarget(p),d=null,f=null,u=null,s=null,E=null,Dt.stop(),n.isPresenting=!1,t.setPixelRatio(C),t.setSize(F.width,F.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",V),s.addEventListener("inputsourceschange",J),m.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(F),s.renderState.layers===void 0){const et={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,et),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),E=new Mi(d.framebufferWidth,d.framebufferHeight,{format:cn,type:Nn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let et=null,pt=null,ot=null;m.depth&&(ot=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,et=m.stencil?ns:ji,pt=m.stencil?es:Si);const Ct={colorFormat:e.RGBA8,depthFormat:ot,scaleFactor:r};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer(Ct),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),E=new Mi(f.textureWidth,f.textureHeight,{format:cn,type:Nn,depthTexture:new xu(f.textureWidth,f.textureHeight,pt,void 0,void 0,void 0,void 0,void 0,void 0,et),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Dt.setContext(s),Dt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function J($){for(let et=0;et<$.removed.length;et++){const pt=$.removed[et],ot=v.indexOf(pt);ot>=0&&(v[ot]=null,M[ot].disconnect(pt))}for(let et=0;et<$.added.length;et++){const pt=$.added[et];let ot=v.indexOf(pt);if(ot===-1){for(let Rt=0;Rt<M.length;Rt++)if(Rt>=v.length){v.push(pt),ot=Rt;break}else if(v[Rt]===null){v[Rt]=pt,ot=Rt;break}if(ot===-1)break}const Ct=M[ot];Ct&&Ct.connect(pt)}}const W=new L,tt=new L;function G($,et,pt){W.setFromMatrixPosition(et.matrixWorld),tt.setFromMatrixPosition(pt.matrixWorld);const ot=W.distanceTo(tt),Ct=et.projectionMatrix.elements,Rt=pt.projectionMatrix.elements,Ot=Ct[14]/(Ct[10]-1),ne=Ct[14]/(Ct[10]+1),zt=(Ct[9]+1)/Ct[5],ie=(Ct[9]-1)/Ct[5],D=(Ct[8]-1)/Ct[0],Be=(Rt[8]+1)/Rt[0],Ht=Ot*D,Gt=Ot*Be,wt=ot/(-D+Be),ae=wt*-D;if(et.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(ae),$.translateZ(wt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Ct[10]===-1)$.projectionMatrix.copy(et.projectionMatrix),$.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{const At=Ot+wt,T=ne+wt,x=Ht-ae,O=Gt+(ot-ae),j=zt*ne/T*At,K=ie*ne/T*At;$.projectionMatrix.makePerspective(x,O,j,K,At,T),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function q($,et){et===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(et.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let et=$.near,pt=$.far;_.texture!==null&&(_.depthNear>0&&(et=_.depthNear),_.depthFar>0&&(pt=_.depthFar)),S.near=P.near=A.near=et,S.far=P.far=A.far=pt,(w!==S.near||H!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),w=S.near,H=S.far),A.layers.mask=$.layers.mask|2,P.layers.mask=$.layers.mask|4,S.layers.mask=A.layers.mask|P.layers.mask;const ot=$.parent,Ct=S.cameras;q(S,ot);for(let Rt=0;Rt<Ct.length;Rt++)q(Ct[Rt],ot);Ct.length===2?G(S,A,P):S.projectionMatrix.copy(A.projectionMatrix),Q($,S,ot)};function Q($,et,pt){pt===null?$.matrix.copy(et.matrixWorld):($.matrix.copy(pt.matrixWorld),$.matrix.invert(),$.matrix.multiply(et.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(et.projectionMatrix),$.projectionMatrixInverse.copy(et.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Xa*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function($){c=$,f!==null&&(f.fixedFoveation=$),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=$)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(S)};let rt=null;function xt($,et){if(h=et.getViewerPose(l||o),g=et,h!==null){const pt=h.views;d!==null&&(t.setRenderTargetFramebuffer(E,d.framebuffer),t.setRenderTarget(E));let ot=!1;pt.length!==S.cameras.length&&(S.cameras.length=0,ot=!0);for(let Rt=0;Rt<pt.length;Rt++){const Ot=pt[Rt];let ne=null;if(d!==null)ne=d.getViewport(Ot);else{const ie=u.getViewSubImage(f,Ot);ne=ie.viewport,Rt===0&&(t.setRenderTargetTextures(E,ie.colorTexture,f.ignoreDepthValues?void 0:ie.depthStencilTexture),t.setRenderTarget(E))}let zt=b[Rt];zt===void 0&&(zt=new Je,zt.layers.enable(Rt),zt.viewport=new fe,b[Rt]=zt),zt.matrix.fromArray(Ot.transform.matrix),zt.matrix.decompose(zt.position,zt.quaternion,zt.scale),zt.projectionMatrix.fromArray(Ot.projectionMatrix),zt.projectionMatrixInverse.copy(zt.projectionMatrix).invert(),zt.viewport.set(ne.x,ne.y,ne.width,ne.height),Rt===0&&(S.matrix.copy(zt.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),ot===!0&&S.cameras.push(zt)}const Ct=s.enabledFeatures;if(Ct&&Ct.includes("depth-sensing")){const Rt=u.getDepthInformation(pt[0]);Rt&&Rt.isValid&&Rt.texture&&_.init(t,Rt,s.renderState)}}for(let pt=0;pt<M.length;pt++){const ot=v[pt],Ct=M[pt];ot!==null&&Ct!==void 0&&Ct.update(ot,et,l||o)}rt&&rt($,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),g=null}const Dt=new _u;Dt.setAnimationLoop(xt),this.setAnimationLoop=function($){rt=$},this.dispose=function(){}}}const ci=new _n,Q_=new oe;function tv(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,pu(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,E,M,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,v)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,E,M):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ne&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ne&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const E=t.get(p),M=E.envMap,v=E.envMapRotation;M&&(m.envMap.value=M,ci.copy(v),ci.x*=-1,ci.y*=-1,ci.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(ci.y*=-1,ci.z*=-1),m.envMapRotation.value.setFromMatrix4(Q_.makeRotationFromEuler(ci)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,E,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*E,m.scale.value=M*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,E){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ne&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const E=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function ev(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,M){const v=M.program;n.uniformBlockBinding(E,v)}function l(E,M){let v=s[E.id];v===void 0&&(g(E),v=h(E),s[E.id]=v,E.addEventListener("dispose",m));const F=M.program;n.updateUBOMapping(E,F);const C=t.render.frame;r[E.id]!==C&&(f(E),r[E.id]=C)}function h(E){const M=u();E.__bindingPointIndex=M;const v=i.createBuffer(),F=E.__size,C=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,F,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,v),v}function u(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(E){const M=s[E.id],v=E.uniforms,F=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let C=0,A=v.length;C<A;C++){const P=Array.isArray(v[C])?v[C]:[v[C]];for(let b=0,S=P.length;b<S;b++){const w=P[b];if(d(w,C,b,F)===!0){const H=w.__offset,B=Array.isArray(w.value)?w.value:[w.value];let V=0;for(let J=0;J<B.length;J++){const W=B[J],tt=_(W);typeof W=="number"||typeof W=="boolean"?(w.__data[0]=W,i.bufferSubData(i.UNIFORM_BUFFER,H+V,w.__data)):W.isMatrix3?(w.__data[0]=W.elements[0],w.__data[1]=W.elements[1],w.__data[2]=W.elements[2],w.__data[3]=0,w.__data[4]=W.elements[3],w.__data[5]=W.elements[4],w.__data[6]=W.elements[5],w.__data[7]=0,w.__data[8]=W.elements[6],w.__data[9]=W.elements[7],w.__data[10]=W.elements[8],w.__data[11]=0):(W.toArray(w.__data,V),V+=tt.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,H,w.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(E,M,v,F){const C=E.value,A=M+"_"+v;if(F[A]===void 0)return typeof C=="number"||typeof C=="boolean"?F[A]=C:F[A]=C.clone(),!0;{const P=F[A];if(typeof C=="number"||typeof C=="boolean"){if(P!==C)return F[A]=C,!0}else if(P.equals(C)===!1)return P.copy(C),!0}return!1}function g(E){const M=E.uniforms;let v=0;const F=16;for(let A=0,P=M.length;A<P;A++){const b=Array.isArray(M[A])?M[A]:[M[A]];for(let S=0,w=b.length;S<w;S++){const H=b[S],B=Array.isArray(H.value)?H.value:[H.value];for(let V=0,J=B.length;V<J;V++){const W=B[V],tt=_(W),G=v%F,q=G%tt.boundary,Q=G+q;v+=q,Q!==0&&F-Q<tt.storage&&(v+=F-Q),H.__data=new Float32Array(tt.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=v,v+=tt.storage}}}const C=v%F;return C>0&&(v+=F-C),E.__size=v,E.__cache={},this}function _(E){const M={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(M.boundary=4,M.storage=4):E.isVector2?(M.boundary=8,M.storage=8):E.isVector3||E.isColor?(M.boundary=16,M.storage=12):E.isVector4?(M.boundary=16,M.storage=16):E.isMatrix3?(M.boundary=48,M.storage=48):E.isMatrix4?(M.boundary=64,M.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),M}function m(E){const M=E.target;M.removeEventListener("dispose",m);const v=o.indexOf(M.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function p(){for(const E in s)i.deleteBuffer(s[E]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}class nv{constructor(t={}){const{canvas:e=Wd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const E=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=De,this.toneMapping=Zn,this.toneMappingExposure=1;const v=this;let F=!1,C=0,A=0,P=null,b=-1,S=null;const w=new fe,H=new fe;let B=null;const V=new Vt(0);let J=0,W=e.width,tt=e.height,G=1,q=null,Q=null;const rt=new fe(0,0,W,tt),xt=new fe(0,0,W,tt);let Dt=!1;const $=new Ec;let et=!1,pt=!1;const ot=new oe,Ct=new oe,Rt=new L,Ot=new fe,ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let zt=!1;function ie(){return P===null?G:1}let D=n;function Be(y,U){return e.getContext(y,U)}try{const y={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${gc}`),e.addEventListener("webglcontextlost",Z,!1),e.addEventListener("webglcontextrestored",dt,!1),e.addEventListener("webglcontextcreationerror",ut,!1),D===null){const U="webgl2";if(D=Be(U,y),D===null)throw Be(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let Ht,Gt,wt,ae,At,T,x,O,j,K,Y,bt,lt,mt,qt,nt,gt,Pt,Lt,_t,Xt,Bt,se,I;function ct(){Ht=new a0(D),Ht.init(),Bt=new $_(D,Ht),Gt=new e0(D,Ht,t,Bt),wt=new G_(D,Ht),Gt.reverseDepthBuffer&&f&&wt.buffers.depth.setReversed(!0),ae=new h0(D),At=new w_,T=new X_(D,Ht,wt,At,Gt,Bt,ae),x=new i0(v),O=new o0(v),j=new _p(D),se=new Qg(D,j),K=new c0(D,j,ae,se),Y=new f0(D,K,j,ae),Lt=new u0(D,Gt,T),nt=new n0(At),bt=new A_(v,x,O,Ht,Gt,se,nt),lt=new tv(v,At),mt=new P_,qt=new F_(Ht),Pt=new Kg(v,x,O,wt,Y,d,c),gt=new H_(v,Y,Gt),I=new ev(D,ae,Gt,wt),_t=new t0(D,Ht,ae),Xt=new l0(D,Ht,ae),ae.programs=bt.programs,v.capabilities=Gt,v.extensions=Ht,v.properties=At,v.renderLists=mt,v.shadowMap=gt,v.state=wt,v.info=ae}ct();const X=new K_(v,D);this.xr=X,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const y=Ht.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=Ht.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(y){y!==void 0&&(G=y,this.setSize(W,tt,!1))},this.getSize=function(y){return y.set(W,tt)},this.setSize=function(y,U,k=!0){if(X.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=y,tt=U,e.width=Math.floor(y*G),e.height=Math.floor(U*G),k===!0&&(e.style.width=y+"px",e.style.height=U+"px"),this.setViewport(0,0,y,U)},this.getDrawingBufferSize=function(y){return y.set(W*G,tt*G).floor()},this.setDrawingBufferSize=function(y,U,k){W=y,tt=U,G=k,e.width=Math.floor(y*k),e.height=Math.floor(U*k),this.setViewport(0,0,y,U)},this.getCurrentViewport=function(y){return y.copy(w)},this.getViewport=function(y){return y.copy(rt)},this.setViewport=function(y,U,k,z){y.isVector4?rt.set(y.x,y.y,y.z,y.w):rt.set(y,U,k,z),wt.viewport(w.copy(rt).multiplyScalar(G).round())},this.getScissor=function(y){return y.copy(xt)},this.setScissor=function(y,U,k,z){y.isVector4?xt.set(y.x,y.y,y.z,y.w):xt.set(y,U,k,z),wt.scissor(H.copy(xt).multiplyScalar(G).round())},this.getScissorTest=function(){return Dt},this.setScissorTest=function(y){wt.setScissorTest(Dt=y)},this.setOpaqueSort=function(y){q=y},this.setTransparentSort=function(y){Q=y},this.getClearColor=function(y){return y.copy(Pt.getClearColor())},this.setClearColor=function(){Pt.setClearColor.apply(Pt,arguments)},this.getClearAlpha=function(){return Pt.getClearAlpha()},this.setClearAlpha=function(){Pt.setClearAlpha.apply(Pt,arguments)},this.clear=function(y=!0,U=!0,k=!0){let z=0;if(y){let N=!1;if(P!==null){const it=P.texture.format;N=it===Mc||it===Sc||it===yc}if(N){const it=P.texture.type,ft=it===Nn||it===Si||it===Us||it===es||it===vc||it===xc,yt=Pt.getClearColor(),St=Pt.getClearAlpha(),It=yt.r,Nt=yt.g,Mt=yt.b;ft?(g[0]=It,g[1]=Nt,g[2]=Mt,g[3]=St,D.clearBufferuiv(D.COLOR,0,g)):(_[0]=It,_[1]=Nt,_[2]=Mt,_[3]=St,D.clearBufferiv(D.COLOR,0,_))}else z|=D.COLOR_BUFFER_BIT}U&&(z|=D.DEPTH_BUFFER_BIT),k&&(z|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Z,!1),e.removeEventListener("webglcontextrestored",dt,!1),e.removeEventListener("webglcontextcreationerror",ut,!1),mt.dispose(),qt.dispose(),At.dispose(),x.dispose(),O.dispose(),Y.dispose(),se.dispose(),I.dispose(),bt.dispose(),X.dispose(),X.removeEventListener("sessionstart",jc),X.removeEventListener("sessionend",Zc),ni.stop()};function Z(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),F=!0}function dt(){console.log("THREE.WebGLRenderer: Context Restored."),F=!1;const y=ae.autoReset,U=gt.enabled,k=gt.autoUpdate,z=gt.needsUpdate,N=gt.type;ct(),ae.autoReset=y,gt.enabled=U,gt.autoUpdate=k,gt.needsUpdate=z,gt.type=N}function ut(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Ut(y){const U=y.target;U.removeEventListener("dispose",Ut),ue(U)}function ue(y){Te(y),At.remove(y)}function Te(y){const U=At.get(y).programs;U!==void 0&&(U.forEach(function(k){bt.releaseProgram(k)}),y.isShaderMaterial&&bt.releaseShaderCache(y))}this.renderBufferDirect=function(y,U,k,z,N,it){U===null&&(U=ne);const ft=N.isMesh&&N.matrixWorld.determinant()<0,yt=Yf(y,U,k,z,N);wt.setMaterial(z,ft);let St=k.index,It=1;if(z.wireframe===!0){if(St=K.getWireframeAttribute(k),St===void 0)return;It=2}const Nt=k.drawRange,Mt=k.attributes.position;let jt=Nt.start*It,re=(Nt.start+Nt.count)*It;it!==null&&(jt=Math.max(jt,it.start*It),re=Math.min(re,(it.start+it.count)*It)),St!==null?(jt=Math.max(jt,0),re=Math.min(re,St.count)):Mt!=null&&(jt=Math.max(jt,0),re=Math.min(re,Mt.count));const ce=re-jt;if(ce<0||ce===1/0)return;se.setup(N,z,yt,k,St);let ke,Zt=_t;if(St!==null&&(ke=j.get(St),Zt=Xt,Zt.setIndex(ke)),N.isMesh)z.wireframe===!0?(wt.setLineWidth(z.wireframeLinewidth*ie()),Zt.setMode(D.LINES)):Zt.setMode(D.TRIANGLES);else if(N.isLine){let Et=z.linewidth;Et===void 0&&(Et=1),wt.setLineWidth(Et*ie()),N.isLineSegments?Zt.setMode(D.LINES):N.isLineLoop?Zt.setMode(D.LINE_LOOP):Zt.setMode(D.LINE_STRIP)}else N.isPoints?Zt.setMode(D.POINTS):N.isSprite&&Zt.setMode(D.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)Zt.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(Ht.get("WEBGL_multi_draw"))Zt.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const Et=N._multiDrawStarts,yn=N._multiDrawCounts,Jt=N._multiDrawCount,nn=St?j.get(St).bytesPerElement:1,Ai=At.get(z).currentProgram.getUniforms();for(let Xe=0;Xe<Jt;Xe++)Ai.setValue(D,"_gl_DrawID",Xe),Zt.render(Et[Xe]/nn,yn[Xe])}else if(N.isInstancedMesh)Zt.renderInstances(jt,ce,N.count);else if(k.isInstancedBufferGeometry){const Et=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,yn=Math.min(k.instanceCount,Et);Zt.renderInstances(jt,ce,yn)}else Zt.render(jt,ce)};function Kt(y,U,k){y.transparent===!0&&y.side===Ve&&y.forceSinglePass===!1?(y.side=Ne,y.needsUpdate=!0,js(y,U,k),y.side=Kn,y.needsUpdate=!0,js(y,U,k),y.side=Ve):js(y,U,k)}this.compile=function(y,U,k=null){k===null&&(k=y),p=qt.get(k),p.init(U),M.push(p),k.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),y!==k&&y.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();const z=new Set;return y.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const it=N.material;if(it)if(Array.isArray(it))for(let ft=0;ft<it.length;ft++){const yt=it[ft];Kt(yt,k,N),z.add(yt)}else Kt(it,k,N),z.add(it)}),M.pop(),p=null,z},this.compileAsync=function(y,U,k=null){const z=this.compile(y,U,k);return new Promise(N=>{function it(){if(z.forEach(function(ft){At.get(ft).currentProgram.isReady()&&z.delete(ft)}),z.size===0){N(y);return}setTimeout(it,10)}Ht.get("KHR_parallel_shader_compile")!==null?it():setTimeout(it,10)})};let en=null;function xn(y){en&&en(y)}function jc(){ni.stop()}function Zc(){ni.start()}const ni=new _u;ni.setAnimationLoop(xn),typeof self<"u"&&ni.setContext(self),this.setAnimationLoop=function(y){en=y,X.setAnimationLoop(y),y===null?ni.stop():ni.start()},X.addEventListener("sessionstart",jc),X.addEventListener("sessionend",Zc),this.render=function(y,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(X.cameraAutoUpdate===!0&&X.updateCamera(U),U=X.getCamera()),y.isScene===!0&&y.onBeforeRender(v,y,U,P),p=qt.get(y,M.length),p.init(U),M.push(p),Ct.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),$.setFromProjectionMatrix(Ct),pt=this.localClippingEnabled,et=nt.init(this.clippingPlanes,pt),m=mt.get(y,E.length),m.init(),E.push(m),X.enabled===!0&&X.isPresenting===!0){const it=v.xr.getDepthSensingMesh();it!==null&&xo(it,U,-1/0,v.sortObjects)}xo(y,U,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(q,Q),zt=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,zt&&Pt.addToRenderList(m,y),this.info.render.frame++,et===!0&&nt.beginShadows();const k=p.state.shadowsArray;gt.render(k,y,U),et===!0&&nt.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=m.opaque,N=m.transmissive;if(p.setupLights(),U.isArrayCamera){const it=U.cameras;if(N.length>0)for(let ft=0,yt=it.length;ft<yt;ft++){const St=it[ft];Kc(z,N,y,St)}zt&&Pt.render(y);for(let ft=0,yt=it.length;ft<yt;ft++){const St=it[ft];Jc(m,y,St,St.viewport)}}else N.length>0&&Kc(z,N,y,U),zt&&Pt.render(y),Jc(m,y,U);P!==null&&(T.updateMultisampleRenderTarget(P),T.updateRenderTargetMipmap(P)),y.isScene===!0&&y.onAfterRender(v,y,U),se.resetDefaultState(),b=-1,S=null,M.pop(),M.length>0?(p=M[M.length-1],et===!0&&nt.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,E.pop(),E.length>0?m=E[E.length-1]:m=null};function xo(y,U,k,z){if(y.visible===!1)return;if(y.layers.test(U.layers)){if(y.isGroup)k=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(U);else if(y.isLight)p.pushLight(y),y.castShadow&&p.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||$.intersectsSprite(y)){z&&Ot.setFromMatrixPosition(y.matrixWorld).applyMatrix4(Ct);const ft=Y.update(y),yt=y.material;yt.visible&&m.push(y,ft,yt,k,Ot.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||$.intersectsObject(y))){const ft=Y.update(y),yt=y.material;if(z&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Ot.copy(y.boundingSphere.center)):(ft.boundingSphere===null&&ft.computeBoundingSphere(),Ot.copy(ft.boundingSphere.center)),Ot.applyMatrix4(y.matrixWorld).applyMatrix4(Ct)),Array.isArray(yt)){const St=ft.groups;for(let It=0,Nt=St.length;It<Nt;It++){const Mt=St[It],jt=yt[Mt.materialIndex];jt&&jt.visible&&m.push(y,ft,jt,k,Ot.z,Mt)}}else yt.visible&&m.push(y,ft,yt,k,Ot.z,null)}}const it=y.children;for(let ft=0,yt=it.length;ft<yt;ft++)xo(it[ft],U,k,z)}function Jc(y,U,k,z){const N=y.opaque,it=y.transmissive,ft=y.transparent;p.setupLightsView(k),et===!0&&nt.setGlobalState(v.clippingPlanes,k),z&&wt.viewport(w.copy(z)),N.length>0&&Ys(N,U,k),it.length>0&&Ys(it,U,k),ft.length>0&&Ys(ft,U,k),wt.buffers.depth.setTest(!0),wt.buffers.depth.setMask(!0),wt.buffers.color.setMask(!0),wt.setPolygonOffset(!1)}function Kc(y,U,k,z){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[z.id]===void 0&&(p.state.transmissionRenderTarget[z.id]=new Mi(1,1,{generateMipmaps:!0,type:Ht.has("EXT_color_buffer_half_float")||Ht.has("EXT_color_buffer_float")?Hs:Nn,minFilter:gi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Yt.workingColorSpace}));const it=p.state.transmissionRenderTarget[z.id],ft=z.viewport||w;it.setSize(ft.z,ft.w);const yt=v.getRenderTarget();v.setRenderTarget(it),v.getClearColor(V),J=v.getClearAlpha(),J<1&&v.setClearColor(16777215,.5),v.clear(),zt&&Pt.render(k);const St=v.toneMapping;v.toneMapping=Zn;const It=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),p.setupLightsView(z),et===!0&&nt.setGlobalState(v.clippingPlanes,z),Ys(y,k,z),T.updateMultisampleRenderTarget(it),T.updateRenderTargetMipmap(it),Ht.has("WEBGL_multisampled_render_to_texture")===!1){let Nt=!1;for(let Mt=0,jt=U.length;Mt<jt;Mt++){const re=U[Mt],ce=re.object,ke=re.geometry,Zt=re.material,Et=re.group;if(Zt.side===Ve&&ce.layers.test(z.layers)){const yn=Zt.side;Zt.side=Ne,Zt.needsUpdate=!0,Qc(ce,k,z,ke,Zt,Et),Zt.side=yn,Zt.needsUpdate=!0,Nt=!0}}Nt===!0&&(T.updateMultisampleRenderTarget(it),T.updateRenderTargetMipmap(it))}v.setRenderTarget(yt),v.setClearColor(V,J),It!==void 0&&(z.viewport=It),v.toneMapping=St}function Ys(y,U,k){const z=U.isScene===!0?U.overrideMaterial:null;for(let N=0,it=y.length;N<it;N++){const ft=y[N],yt=ft.object,St=ft.geometry,It=z===null?ft.material:z,Nt=ft.group;yt.layers.test(k.layers)&&Qc(yt,U,k,St,It,Nt)}}function Qc(y,U,k,z,N,it){y.onBeforeRender(v,U,k,z,N,it),y.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),N.onBeforeRender(v,U,k,z,y,it),N.transparent===!0&&N.side===Ve&&N.forceSinglePass===!1?(N.side=Ne,N.needsUpdate=!0,v.renderBufferDirect(k,U,z,N,y,it),N.side=Kn,N.needsUpdate=!0,v.renderBufferDirect(k,U,z,N,y,it),N.side=Ve):v.renderBufferDirect(k,U,z,N,y,it),y.onAfterRender(v,U,k,z,N,it)}function js(y,U,k){U.isScene!==!0&&(U=ne);const z=At.get(y),N=p.state.lights,it=p.state.shadowsArray,ft=N.state.version,yt=bt.getParameters(y,N.state,it,U,k),St=bt.getProgramCacheKey(yt);let It=z.programs;z.environment=y.isMeshStandardMaterial?U.environment:null,z.fog=U.fog,z.envMap=(y.isMeshStandardMaterial?O:x).get(y.envMap||z.environment),z.envMapRotation=z.environment!==null&&y.envMap===null?U.environmentRotation:y.envMapRotation,It===void 0&&(y.addEventListener("dispose",Ut),It=new Map,z.programs=It);let Nt=It.get(St);if(Nt!==void 0){if(z.currentProgram===Nt&&z.lightsStateVersion===ft)return el(y,yt),Nt}else yt.uniforms=bt.getUniforms(y),y.onBeforeCompile(yt,v),Nt=bt.acquireProgram(yt,St),It.set(St,Nt),z.uniforms=yt.uniforms;const Mt=z.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Mt.clippingPlanes=nt.uniform),el(y,yt),z.needsLights=Zf(y),z.lightsStateVersion=ft,z.needsLights&&(Mt.ambientLightColor.value=N.state.ambient,Mt.lightProbe.value=N.state.probe,Mt.directionalLights.value=N.state.directional,Mt.directionalLightShadows.value=N.state.directionalShadow,Mt.spotLights.value=N.state.spot,Mt.spotLightShadows.value=N.state.spotShadow,Mt.rectAreaLights.value=N.state.rectArea,Mt.ltc_1.value=N.state.rectAreaLTC1,Mt.ltc_2.value=N.state.rectAreaLTC2,Mt.pointLights.value=N.state.point,Mt.pointLightShadows.value=N.state.pointShadow,Mt.hemisphereLights.value=N.state.hemi,Mt.directionalShadowMap.value=N.state.directionalShadowMap,Mt.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Mt.spotShadowMap.value=N.state.spotShadowMap,Mt.spotLightMatrix.value=N.state.spotLightMatrix,Mt.spotLightMap.value=N.state.spotLightMap,Mt.pointShadowMap.value=N.state.pointShadowMap,Mt.pointShadowMatrix.value=N.state.pointShadowMatrix),z.currentProgram=Nt,z.uniformsList=null,Nt}function tl(y){if(y.uniformsList===null){const U=y.currentProgram.getUniforms();y.uniformsList=Or.seqWithValue(U.seq,y.uniforms)}return y.uniformsList}function el(y,U){const k=At.get(y);k.outputColorSpace=U.outputColorSpace,k.batching=U.batching,k.batchingColor=U.batchingColor,k.instancing=U.instancing,k.instancingColor=U.instancingColor,k.instancingMorph=U.instancingMorph,k.skinning=U.skinning,k.morphTargets=U.morphTargets,k.morphNormals=U.morphNormals,k.morphColors=U.morphColors,k.morphTargetsCount=U.morphTargetsCount,k.numClippingPlanes=U.numClippingPlanes,k.numIntersection=U.numClipIntersection,k.vertexAlphas=U.vertexAlphas,k.vertexTangents=U.vertexTangents,k.toneMapping=U.toneMapping}function Yf(y,U,k,z,N){U.isScene!==!0&&(U=ne),T.resetTextureUnits();const it=U.fog,ft=z.isMeshStandardMaterial?U.environment:null,yt=P===null?v.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:as,St=(z.isMeshStandardMaterial?O:x).get(z.envMap||ft),It=z.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Nt=!!k.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Mt=!!k.morphAttributes.position,jt=!!k.morphAttributes.normal,re=!!k.morphAttributes.color;let ce=Zn;z.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(ce=v.toneMapping);const ke=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,Zt=ke!==void 0?ke.length:0,Et=At.get(z),yn=p.state.lights;if(et===!0&&(pt===!0||y!==S)){const je=y===S&&z.id===b;nt.setState(z,y,je)}let Jt=!1;z.version===Et.__version?(Et.needsLights&&Et.lightsStateVersion!==yn.state.version||Et.outputColorSpace!==yt||N.isBatchedMesh&&Et.batching===!1||!N.isBatchedMesh&&Et.batching===!0||N.isBatchedMesh&&Et.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Et.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Et.instancing===!1||!N.isInstancedMesh&&Et.instancing===!0||N.isSkinnedMesh&&Et.skinning===!1||!N.isSkinnedMesh&&Et.skinning===!0||N.isInstancedMesh&&Et.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Et.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Et.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Et.instancingMorph===!1&&N.morphTexture!==null||Et.envMap!==St||z.fog===!0&&Et.fog!==it||Et.numClippingPlanes!==void 0&&(Et.numClippingPlanes!==nt.numPlanes||Et.numIntersection!==nt.numIntersection)||Et.vertexAlphas!==It||Et.vertexTangents!==Nt||Et.morphTargets!==Mt||Et.morphNormals!==jt||Et.morphColors!==re||Et.toneMapping!==ce||Et.morphTargetsCount!==Zt)&&(Jt=!0):(Jt=!0,Et.__version=z.version);let nn=Et.currentProgram;Jt===!0&&(nn=js(z,U,N));let Ai=!1,Xe=!1,hs=!1;const le=nn.getUniforms(),un=Et.uniforms;if(wt.useProgram(nn.program)&&(Ai=!0,Xe=!0,hs=!0),z.id!==b&&(b=z.id,Xe=!0),Ai||S!==y){wt.buffers.depth.getReversed()?(ot.copy(y.projectionMatrix),$d(ot),qd(ot),le.setValue(D,"projectionMatrix",ot)):le.setValue(D,"projectionMatrix",y.projectionMatrix),le.setValue(D,"viewMatrix",y.matrixWorldInverse);const Fn=le.map.cameraPosition;Fn!==void 0&&Fn.setValue(D,Rt.setFromMatrixPosition(y.matrixWorld)),Gt.logarithmicDepthBuffer&&le.setValue(D,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&le.setValue(D,"isOrthographic",y.isOrthographicCamera===!0),S!==y&&(S=y,Xe=!0,hs=!0)}if(N.isSkinnedMesh){le.setOptional(D,N,"bindMatrix"),le.setOptional(D,N,"bindMatrixInverse");const je=N.skeleton;je&&(je.boneTexture===null&&je.computeBoneTexture(),le.setValue(D,"boneTexture",je.boneTexture,T))}N.isBatchedMesh&&(le.setOptional(D,N,"batchingTexture"),le.setValue(D,"batchingTexture",N._matricesTexture,T),le.setOptional(D,N,"batchingIdTexture"),le.setValue(D,"batchingIdTexture",N._indirectTexture,T),le.setOptional(D,N,"batchingColorTexture"),N._colorsTexture!==null&&le.setValue(D,"batchingColorTexture",N._colorsTexture,T));const us=k.morphAttributes;if((us.position!==void 0||us.normal!==void 0||us.color!==void 0)&&Lt.update(N,k,nn),(Xe||Et.receiveShadow!==N.receiveShadow)&&(Et.receiveShadow=N.receiveShadow,le.setValue(D,"receiveShadow",N.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(un.envMap.value=St,un.flipEnvMap.value=St.isCubeTexture&&St.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&U.environment!==null&&(un.envMapIntensity.value=U.environmentIntensity),Xe&&(le.setValue(D,"toneMappingExposure",v.toneMappingExposure),Et.needsLights&&jf(un,hs),it&&z.fog===!0&&lt.refreshFogUniforms(un,it),lt.refreshMaterialUniforms(un,z,G,tt,p.state.transmissionRenderTarget[y.id]),Or.upload(D,tl(Et),un,T)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Or.upload(D,tl(Et),un,T),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&le.setValue(D,"center",N.center),le.setValue(D,"modelViewMatrix",N.modelViewMatrix),le.setValue(D,"normalMatrix",N.normalMatrix),le.setValue(D,"modelMatrix",N.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const je=z.uniformsGroups;for(let Fn=0,On=je.length;Fn<On;Fn++){const nl=je[Fn];I.update(nl,nn),I.bind(nl,nn)}}return nn}function jf(y,U){y.ambientLightColor.needsUpdate=U,y.lightProbe.needsUpdate=U,y.directionalLights.needsUpdate=U,y.directionalLightShadows.needsUpdate=U,y.pointLights.needsUpdate=U,y.pointLightShadows.needsUpdate=U,y.spotLights.needsUpdate=U,y.spotLightShadows.needsUpdate=U,y.rectAreaLights.needsUpdate=U,y.hemisphereLights.needsUpdate=U}function Zf(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(y,U,k){At.get(y.texture).__webglTexture=U,At.get(y.depthTexture).__webglTexture=k;const z=At.get(y);z.__hasExternalTextures=!0,z.__autoAllocateDepthBuffer=k===void 0,z.__autoAllocateDepthBuffer||Ht.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(y,U){const k=At.get(y);k.__webglFramebuffer=U,k.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(y,U=0,k=0){P=y,C=U,A=k;let z=!0,N=null,it=!1,ft=!1;if(y){const St=At.get(y);if(St.__useDefaultFramebuffer!==void 0)wt.bindFramebuffer(D.FRAMEBUFFER,null),z=!1;else if(St.__webglFramebuffer===void 0)T.setupRenderTarget(y);else if(St.__hasExternalTextures)T.rebindTextures(y,At.get(y.texture).__webglTexture,At.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const Mt=y.depthTexture;if(St.__boundDepthTexture!==Mt){if(Mt!==null&&At.has(Mt)&&(y.width!==Mt.image.width||y.height!==Mt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(y)}}const It=y.texture;(It.isData3DTexture||It.isDataArrayTexture||It.isCompressedArrayTexture)&&(ft=!0);const Nt=At.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Nt[U])?N=Nt[U][k]:N=Nt[U],it=!0):y.samples>0&&T.useMultisampledRTT(y)===!1?N=At.get(y).__webglMultisampledFramebuffer:Array.isArray(Nt)?N=Nt[k]:N=Nt,w.copy(y.viewport),H.copy(y.scissor),B=y.scissorTest}else w.copy(rt).multiplyScalar(G).floor(),H.copy(xt).multiplyScalar(G).floor(),B=Dt;if(wt.bindFramebuffer(D.FRAMEBUFFER,N)&&z&&wt.drawBuffers(y,N),wt.viewport(w),wt.scissor(H),wt.setScissorTest(B),it){const St=At.get(y.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+U,St.__webglTexture,k)}else if(ft){const St=At.get(y.texture),It=U||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,St.__webglTexture,k||0,It)}b=-1},this.readRenderTargetPixels=function(y,U,k,z,N,it,ft){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let yt=At.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ft!==void 0&&(yt=yt[ft]),yt){wt.bindFramebuffer(D.FRAMEBUFFER,yt);try{const St=y.texture,It=St.format,Nt=St.type;if(!Gt.textureFormatReadable(It)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Gt.textureTypeReadable(Nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=y.width-z&&k>=0&&k<=y.height-N&&D.readPixels(U,k,z,N,Bt.convert(It),Bt.convert(Nt),it)}finally{const St=P!==null?At.get(P).__webglFramebuffer:null;wt.bindFramebuffer(D.FRAMEBUFFER,St)}}},this.readRenderTargetPixelsAsync=async function(y,U,k,z,N,it,ft){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let yt=At.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ft!==void 0&&(yt=yt[ft]),yt){const St=y.texture,It=St.format,Nt=St.type;if(!Gt.textureFormatReadable(It))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Gt.textureTypeReadable(Nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=y.width-z&&k>=0&&k<=y.height-N){wt.bindFramebuffer(D.FRAMEBUFFER,yt);const Mt=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Mt),D.bufferData(D.PIXEL_PACK_BUFFER,it.byteLength,D.STREAM_READ),D.readPixels(U,k,z,N,Bt.convert(It),Bt.convert(Nt),0);const jt=P!==null?At.get(P).__webglFramebuffer:null;wt.bindFramebuffer(D.FRAMEBUFFER,jt);const re=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Xd(D,re,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Mt),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,it),D.deleteBuffer(Mt),D.deleteSync(re),it}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(y,U=null,k=0){y.isTexture!==!0&&(Ms("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,y=arguments[1]);const z=Math.pow(2,-k),N=Math.floor(y.image.width*z),it=Math.floor(y.image.height*z),ft=U!==null?U.x:0,yt=U!==null?U.y:0;T.setTexture2D(y,0),D.copyTexSubImage2D(D.TEXTURE_2D,k,0,0,ft,yt,N,it),wt.unbindTexture()},this.copyTextureToTexture=function(y,U,k=null,z=null,N=0){y.isTexture!==!0&&(Ms("WebGLRenderer: copyTextureToTexture function signature has changed."),z=arguments[0]||null,y=arguments[1],U=arguments[2],N=arguments[3]||0,k=null);let it,ft,yt,St,It,Nt,Mt,jt,re;const ce=y.isCompressedTexture?y.mipmaps[N]:y.image;k!==null?(it=k.max.x-k.min.x,ft=k.max.y-k.min.y,yt=k.isBox3?k.max.z-k.min.z:1,St=k.min.x,It=k.min.y,Nt=k.isBox3?k.min.z:0):(it=ce.width,ft=ce.height,yt=ce.depth||1,St=0,It=0,Nt=0),z!==null?(Mt=z.x,jt=z.y,re=z.z):(Mt=0,jt=0,re=0);const ke=Bt.convert(U.format),Zt=Bt.convert(U.type);let Et;U.isData3DTexture?(T.setTexture3D(U,0),Et=D.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(T.setTexture2DArray(U,0),Et=D.TEXTURE_2D_ARRAY):(T.setTexture2D(U,0),Et=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,U.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,U.unpackAlignment);const yn=D.getParameter(D.UNPACK_ROW_LENGTH),Jt=D.getParameter(D.UNPACK_IMAGE_HEIGHT),nn=D.getParameter(D.UNPACK_SKIP_PIXELS),Ai=D.getParameter(D.UNPACK_SKIP_ROWS),Xe=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,ce.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ce.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,St),D.pixelStorei(D.UNPACK_SKIP_ROWS,It),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Nt);const hs=y.isDataArrayTexture||y.isData3DTexture,le=U.isDataArrayTexture||U.isData3DTexture;if(y.isRenderTargetTexture||y.isDepthTexture){const un=At.get(y),us=At.get(U),je=At.get(un.__renderTarget),Fn=At.get(us.__renderTarget);wt.bindFramebuffer(D.READ_FRAMEBUFFER,je.__webglFramebuffer),wt.bindFramebuffer(D.DRAW_FRAMEBUFFER,Fn.__webglFramebuffer);for(let On=0;On<yt;On++)hs&&D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,At.get(y).__webglTexture,N,Nt+On),y.isDepthTexture?(le&&D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,At.get(U).__webglTexture,N,re+On),D.blitFramebuffer(St,It,it,ft,Mt,jt,it,ft,D.DEPTH_BUFFER_BIT,D.NEAREST)):le?D.copyTexSubImage3D(Et,N,Mt,jt,re+On,St,It,it,ft):D.copyTexSubImage2D(Et,N,Mt,jt,re+On,St,It,it,ft);wt.bindFramebuffer(D.READ_FRAMEBUFFER,null),wt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else le?y.isDataTexture||y.isData3DTexture?D.texSubImage3D(Et,N,Mt,jt,re,it,ft,yt,ke,Zt,ce.data):U.isCompressedArrayTexture?D.compressedTexSubImage3D(Et,N,Mt,jt,re,it,ft,yt,ke,ce.data):D.texSubImage3D(Et,N,Mt,jt,re,it,ft,yt,ke,Zt,ce):y.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,N,Mt,jt,it,ft,ke,Zt,ce.data):y.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,N,Mt,jt,ce.width,ce.height,ke,ce.data):D.texSubImage2D(D.TEXTURE_2D,N,Mt,jt,it,ft,ke,Zt,ce);D.pixelStorei(D.UNPACK_ROW_LENGTH,yn),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Jt),D.pixelStorei(D.UNPACK_SKIP_PIXELS,nn),D.pixelStorei(D.UNPACK_SKIP_ROWS,Ai),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Xe),N===0&&U.generateMipmaps&&D.generateMipmap(Et),wt.unbindTexture()},this.copyTextureToTexture3D=function(y,U,k=null,z=null,N=0){return y.isTexture!==!0&&(Ms("WebGLRenderer: copyTextureToTexture3D function signature has changed."),k=arguments[0]||null,z=arguments[1]||null,y=arguments[2],U=arguments[3],N=arguments[4]||0),Ms('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(y,U,k,z,N)},this.initRenderTarget=function(y){At.get(y).__webglFramebuffer===void 0&&T.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?T.setTextureCube(y,0):y.isData3DTexture?T.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?T.setTexture2DArray(y,0):T.setTexture2D(y,0),wt.unbindTexture()},this.resetState=function(){C=0,A=0,P=null,wt.reset(),se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Rn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Yt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Yt._getUnpackColorSpace()}}class Cc{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Vt(t),this.near=e,this.far=n}clone(){return new Cc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class iv extends me{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _n,this.environmentIntensity=1,this.environmentRotation=new _n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class sv{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Wa,this.updateRanges=[],this.version=0,this.uuid=Dn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Le=new L;class Yr{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyMatrix4(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyNormalMatrix(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.transformDirection(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=mn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ee(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=mn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=mn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=mn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=mn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),s=ee(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),s=ee(s,this.array),r=ee(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Ge(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Yr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class jr extends ti{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new Vt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Vi;const _s=new L,Gi=new L,Wi=new L,Xi=new ht,vs=new ht,Eu=new oe,_r=new L,xs=new L,vr=new L,eh=new ht,Zo=new ht,nh=new ht;class qa extends me{constructor(t=new jr){if(super(),this.isSprite=!0,this.type="Sprite",Vi===void 0){Vi=new ge;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new sv(e,5);Vi.setIndex([0,1,2,0,2,3]),Vi.setAttribute("position",new Yr(n,3,0,!1)),Vi.setAttribute("uv",new Yr(n,2,3,!1))}this.geometry=Vi,this.material=t,this.center=new ht(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Gi.setFromMatrixScale(this.matrixWorld),Eu.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Wi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Gi.multiplyScalar(-Wi.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;xr(_r.set(-.5,-.5,0),Wi,o,Gi,s,r),xr(xs.set(.5,-.5,0),Wi,o,Gi,s,r),xr(vr.set(.5,.5,0),Wi,o,Gi,s,r),eh.set(0,0),Zo.set(1,0),nh.set(1,1);let a=t.ray.intersectTriangle(_r,xs,vr,!1,_s);if(a===null&&(xr(xs.set(-.5,.5,0),Wi,o,Gi,s,r),Zo.set(0,1),a=t.ray.intersectTriangle(_r,vr,xs,!1,_s),a===null))return;const c=t.ray.origin.distanceTo(_s);c<t.near||c>t.far||e.push({distance:c,point:_s.clone(),uv:Ke.getInterpolation(_s,_r,xs,vr,eh,Zo,nh,new ht),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function xr(i,t,e,n,s,r){Xi.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(vs.x=r*Xi.x-s*Xi.y,vs.y=s*Xi.x+r*Xi.y):vs.copy(Xi),i.copy(t),i.x+=vs.x,i.y+=vs.y,i.applyMatrix4(Eu)}class Ac extends ti{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Vt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Zr=new L,Jr=new L,ih=new oe,ys=new bc,yr=new Ws,Jo=new L,sh=new L;class Tu extends me{constructor(t=new ge,e=new Ac){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Zr.fromBufferAttribute(e,s-1),Jr.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Zr.distanceTo(Jr);t.setAttribute("lineDistance",new Qt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),yr.copy(n.boundingSphere),yr.applyMatrix4(s),yr.radius+=r,t.ray.intersectsSphere(yr)===!1)return;ih.copy(s).invert(),ys.copy(t.ray).applyMatrix4(ih);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const d=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=l){const p=h.getX(_),E=h.getX(_+1),M=Sr(this,t,ys,c,p,E);M&&e.push(M)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(d),p=Sr(this,t,ys,c,_,m);p&&e.push(p)}}else{const d=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=l){const p=Sr(this,t,ys,c,_,_+1);p&&e.push(p)}if(this.isLineLoop){const _=Sr(this,t,ys,c,g-1,d);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Sr(i,t,e,n,s,r){const o=i.geometry.attributes.position;if(Zr.fromBufferAttribute(o,s),Jr.fromBufferAttribute(o,r),e.distanceSqToSegment(Zr,Jr,Jo,sh)>n)return;Jo.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Jo);if(!(c<t.near||c>t.far))return{distance:c,point:sh.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}class Cu extends ti{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Vt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const rh=new oe,Ya=new bc,Mr=new Ws,br=new L;class rv extends me{constructor(t=new ge,e=new Cu){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Mr.copy(n.boundingSphere),Mr.applyMatrix4(s),Mr.radius+=r,t.ray.intersectsSphere(Mr)===!1)return;rh.copy(s).invert(),Ya.copy(t.ray).applyMatrix4(rh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){const f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let g=f,_=d;g<_;g++){const m=l.getX(g);br.fromBufferAttribute(u,m),oh(br,m,c,s,t,e,this)}}else{const f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let g=f,_=d;g<_;g++)br.fromBufferAttribute(u,g),oh(br,g,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function oh(i,t,e,n,s,r,o){const a=Ya.distanceSqToPoint(i);if(a<e){const c=new L;Ya.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Xs extends Fe{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class vn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const h=n[s],f=n[s+1]-h,d=(o-h)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new ht:new L);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new L,s=[],r=[],o=[],a=new L,c=new oe;for(let d=0;d<=t;d++){const g=d/t;s[d]=this.getTangentAt(g,new L)}r[0]=new L,o[0]=new L;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Me(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,g))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(Me(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],d*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class wc extends vn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new ht){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*h-d*u+this.aX,l=f*u+d*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class ov extends wc{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Rc(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let f=(o-r)/l-(a-r)/(l+h)+(a-o)/h,d=(a-o)/h-(c-o)/(h+u)+(c-a)/u;f*=h,d*=h,s(o,a,f,d)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const Er=new L,Ko=new Rc,Qo=new Rc,ta=new Rc;class av extends vn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new L){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(Er.subVectors(s[0],s[1]).add(s[0]),l=Er);const u=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Er.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Er),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),d),_=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Ko.initNonuniformCatmullRom(l.x,u.x,f.x,h.x,g,_,m),Qo.initNonuniformCatmullRom(l.y,u.y,f.y,h.y,g,_,m),ta.initNonuniformCatmullRom(l.z,u.z,f.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(Ko.initCatmullRom(l.x,u.x,f.x,h.x,this.tension),Qo.initCatmullRom(l.y,u.y,f.y,h.y,this.tension),ta.initCatmullRom(l.z,u.z,f.z,h.z,this.tension));return n.set(Ko.calc(c),Qo.calc(c),ta.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new L().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function ah(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function cv(i,t){const e=1-i;return e*e*t}function lv(i,t){return 2*(1-i)*i*t}function hv(i,t){return i*i*t}function Cs(i,t,e,n){return cv(i,t)+lv(i,e)+hv(i,n)}function uv(i,t){const e=1-i;return e*e*e*t}function fv(i,t){const e=1-i;return 3*e*e*i*t}function dv(i,t){return 3*(1-i)*i*i*t}function pv(i,t){return i*i*i*t}function As(i,t,e,n,s){return uv(i,t)+fv(i,e)+dv(i,n)+pv(i,s)}class Au extends vn{constructor(t=new ht,e=new ht,n=new ht,s=new ht){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new ht){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(As(t,s.x,r.x,o.x,a.x),As(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class mv extends vn{constructor(t=new L,e=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new L){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(As(t,s.x,r.x,o.x,a.x),As(t,s.y,r.y,o.y,a.y),As(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class wu extends vn{constructor(t=new ht,e=new ht){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ht){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ht){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class gv extends vn{constructor(t=new L,e=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new L){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new L){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ru extends vn{constructor(t=new ht,e=new ht,n=new ht){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ht){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Cs(t,s.x,r.x,o.x),Cs(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class _v extends vn{constructor(t=new L,e=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new L){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Cs(t,s.x,r.x,o.x),Cs(t,s.y,r.y,o.y),Cs(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Pu extends vn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ht){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(ah(a,c.x,l.x,h.x,u.x),ah(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new ht().fromArray(s))}return this}}var ch=Object.freeze({__proto__:null,ArcCurve:ov,CatmullRomCurve3:av,CubicBezierCurve:Au,CubicBezierCurve3:mv,EllipseCurve:wc,LineCurve:wu,LineCurve3:gv,QuadraticBezierCurve:Ru,QuadraticBezierCurve3:_v,SplineCurve:Pu});class vv extends vn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ch[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new ch[s.type]().fromJSON(s))}return this}}class ja extends vv{constructor(t){super(),this.type="Path",this.currentPoint=new ht,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new wu(this.currentPoint.clone(),new ht(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new Ru(this.currentPoint.clone(),new ht(t,e),new ht(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){const a=new Au(this.currentPoint.clone(),new ht(t,e),new ht(n,s),new ht(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Pu(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){const l=new wc(t,e,n,s,r,o,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Pc extends ge{constructor(t=[new ht(0,-.5),new ht(.5,0),new ht(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Me(s,0,Math.PI*2);const r=[],o=[],a=[],c=[],l=[],h=1/e,u=new L,f=new ht,d=new L,g=new L,_=new L;let m=0,p=0;for(let E=0;E<=t.length-1;E++)switch(E){case 0:m=t[E+1].x-t[E].x,p=t[E+1].y-t[E].y,d.x=p*1,d.y=-m,d.z=p*0,_.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case t.length-1:c.push(_.x,_.y,_.z);break;default:m=t[E+1].x-t[E].x,p=t[E+1].y-t[E].y,d.x=p*1,d.y=-m,d.z=p*0,g.copy(d),d.x+=_.x,d.y+=_.y,d.z+=_.z,d.normalize(),c.push(d.x,d.y,d.z),_.copy(g)}for(let E=0;E<=e;E++){const M=n+E*h*s,v=Math.sin(M),F=Math.cos(M);for(let C=0;C<=t.length-1;C++){u.x=t[C].x*v,u.y=t[C].y,u.z=t[C].x*F,o.push(u.x,u.y,u.z),f.x=E/e,f.y=C/(t.length-1),a.push(f.x,f.y);const A=c[3*C+0]*v,P=c[3*C+1],b=c[3*C+0]*F;l.push(A,P,b)}}for(let E=0;E<e;E++)for(let M=0;M<t.length-1;M++){const v=M+E*t.length,F=v,C=v+t.length,A=v+t.length+1,P=v+1;r.push(F,C,P),r.push(A,P,C)}this.setIndex(r),this.setAttribute("position",new Qt(o,3)),this.setAttribute("uv",new Qt(a,2)),this.setAttribute("normal",new Qt(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pc(t.points,t.segments,t.phiStart,t.phiLength)}}class di extends Pc{constructor(t=1,e=1,n=4,s=8){const r=new ja;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:s}}static fromJSON(t){return new di(t.radius,t.length,t.capSegments,t.radialSegments)}}class ss extends ge{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],c=[],l=new L,h=new ht;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const d=n+u/e*s;l.x=t*Math.cos(d),l.y=t*Math.sin(d),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[f]/t+1)/2,h.y=(o[f+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Qt(o,3)),this.setAttribute("normal",new Qt(a,3)),this.setAttribute("uv",new Qt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ss(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class pn extends ge{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],d=[];let g=0;const _=[],m=n/2;let p=0;E(),o===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new Qt(u,3)),this.setAttribute("normal",new Qt(f,3)),this.setAttribute("uv",new Qt(d,2));function E(){const v=new L,F=new L;let C=0;const A=(e-t)/n;for(let P=0;P<=r;P++){const b=[],S=P/r,w=S*(e-t)+t;for(let H=0;H<=s;H++){const B=H/s,V=B*c+a,J=Math.sin(V),W=Math.cos(V);F.x=w*J,F.y=-S*n+m,F.z=w*W,u.push(F.x,F.y,F.z),v.set(J,A,W).normalize(),f.push(v.x,v.y,v.z),d.push(B,1-S),b.push(g++)}_.push(b)}for(let P=0;P<s;P++)for(let b=0;b<r;b++){const S=_[b][P],w=_[b+1][P],H=_[b+1][P+1],B=_[b][P+1];(t>0||b!==0)&&(h.push(S,w,B),C+=3),(e>0||b!==r-1)&&(h.push(w,H,B),C+=3)}l.addGroup(p,C,0),p+=C}function M(v){const F=g,C=new ht,A=new L;let P=0;const b=v===!0?t:e,S=v===!0?1:-1;for(let H=1;H<=s;H++)u.push(0,m*S,0),f.push(0,S,0),d.push(.5,.5),g++;const w=g;for(let H=0;H<=s;H++){const V=H/s*c+a,J=Math.cos(V),W=Math.sin(V);A.x=b*W,A.y=m*S,A.z=b*J,u.push(A.x,A.y,A.z),f.push(0,S,0),C.x=J*.5+.5,C.y=W*.5*S+.5,d.push(C.x,C.y),g++}for(let H=0;H<s;H++){const B=F+H,V=w+H;v===!0?h.push(V,V+1,B):h.push(V+1,V,B),P+=3}l.addGroup(p,P,v===!0?1:2),p+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Lu extends ja{constructor(t){super(t),this.uuid=Dn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new ja().fromJSON(s))}return this}}const xv={triangulate:function(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=Iu(i,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,u,f,d;if(n&&(r=Ev(i,t,r,e)),i.length>80*e){a=l=i[0],c=h=i[1];for(let g=e;g<s;g+=e)u=i[g],f=i[g+1],u<a&&(a=u),f<c&&(c=f),u>l&&(l=u),f>h&&(h=f);d=Math.max(l-a,h-c),d=d!==0?32767/d:0}return Ns(r,o,e,a,c,d,0),o}};function Iu(i,t,e,n,s){let r,o;if(s===Nv(i,t,e,n)>0)for(r=t;r<e;r+=n)o=lh(r,i[r],i[r+1],o);else for(r=e-n;r>=t;r-=n)o=lh(r,i[r],i[r+1],o);return o&&ho(o,o.next)&&(Os(o),o=o.next),o}function bi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(ho(e,e.next)||he(e.prev,e,e.next)===0)){if(Os(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ns(i,t,e,n,s,r,o){if(!i)return;!o&&r&&Rv(i,n,s,r);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?Sv(i,n,s,r):yv(i)){t.push(c.i/e|0),t.push(i.i/e|0),t.push(l.i/e|0),Os(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=Mv(bi(i),t,e),Ns(i,t,e,n,s,r,2)):o===2&&bv(i,t,e,n,s,r):Ns(bi(i),t,e,n,s,r,1);break}}}function yv(i){const t=i.prev,e=i,n=i.next;if(he(t,e,n)>=0)return!1;const s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=s<r?s<o?s:o:r<o?r:o,u=a<c?a<l?a:l:c<l?c:l,f=s>r?s>o?s:o:r>o?r:o,d=a>c?a>l?a:l:c>l?c:l;let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=d&&Yi(s,a,r,c,o,l,g.x,g.y)&&he(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Sv(i,t,e,n){const s=i.prev,r=i,o=i.next;if(he(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,f=o.y,d=a<c?a<l?a:l:c<l?c:l,g=h<u?h<f?h:f:u<f?u:f,_=a>c?a>l?a:l:c>l?c:l,m=h>u?h>f?h:f:u>f?u:f,p=Za(d,g,t,e,n),E=Za(_,m,t,e,n);let M=i.prevZ,v=i.nextZ;for(;M&&M.z>=p&&v&&v.z<=E;){if(M.x>=d&&M.x<=_&&M.y>=g&&M.y<=m&&M!==s&&M!==o&&Yi(a,h,c,u,l,f,M.x,M.y)&&he(M.prev,M,M.next)>=0||(M=M.prevZ,v.x>=d&&v.x<=_&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&Yi(a,h,c,u,l,f,v.x,v.y)&&he(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;M&&M.z>=p;){if(M.x>=d&&M.x<=_&&M.y>=g&&M.y<=m&&M!==s&&M!==o&&Yi(a,h,c,u,l,f,M.x,M.y)&&he(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;v&&v.z<=E;){if(v.x>=d&&v.x<=_&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&Yi(a,h,c,u,l,f,v.x,v.y)&&he(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function Mv(i,t,e){let n=i;do{const s=n.prev,r=n.next.next;!ho(s,r)&&Du(s,n,n.next,r)&&Fs(s,r)&&Fs(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),Os(n),Os(n.next),n=i=r),n=n.next}while(n!==i);return bi(n)}function bv(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Iv(o,a)){let c=Uu(o,a);o=bi(o,o.next),c=bi(c,c.next),Ns(o,t,e,n,s,r,0),Ns(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function Ev(i,t,e,n){const s=[];let r,o,a,c,l;for(r=0,o=t.length;r<o;r++)a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=Iu(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(Lv(l));for(s.sort(Tv),r=0;r<s.length;r++)e=Cv(s[r],e);return e}function Tv(i,t){return i.x-t.x}function Cv(i,t){const e=Av(i,t);if(!e)return t;const n=Uu(e,i);return bi(n,n.next),bi(e,e.next)}function Av(i,t){let e=t,n=-1/0,s;const r=i.x,o=i.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const f=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=r&&f>n&&(n=f,s=e.x<e.next.x?e:e.next,f===r))return s}e=e.next}while(e!==t);if(!s)return null;const a=s,c=s.x,l=s.y;let h=1/0,u;e=s;do r>=e.x&&e.x>=c&&r!==e.x&&Yi(o<l?r:n,o,c,l,o<l?n:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),Fs(e,i)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&wv(s,e)))&&(s=e,h=u)),e=e.next;while(e!==a);return s}function wv(i,t){return he(i.prev,i,t.prev)<0&&he(t.next,i,i.next)<0}function Rv(i,t,e,n){let s=i;do s.z===0&&(s.z=Za(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Pv(s)}function Pv(i){let t,e,n,s,r,o,a,c,l=1;do{for(e=i,i=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<l&&(a++,n=n.nextZ,!!n);t++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,a--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,l*=2}while(o>1);return i}function Za(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Lv(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Yi(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function Iv(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!Dv(i,t)&&(Fs(i,t)&&Fs(t,i)&&Uv(i,t)&&(he(i.prev,i,t.prev)||he(i,t.prev,t))||ho(i,t)&&he(i.prev,i,i.next)>0&&he(t.prev,t,t.next)>0)}function he(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function ho(i,t){return i.x===t.x&&i.y===t.y}function Du(i,t,e,n){const s=Cr(he(i,t,e)),r=Cr(he(i,t,n)),o=Cr(he(e,n,i)),a=Cr(he(e,n,t));return!!(s!==r&&o!==a||s===0&&Tr(i,e,t)||r===0&&Tr(i,n,t)||o===0&&Tr(e,i,n)||a===0&&Tr(e,t,n))}function Tr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Cr(i){return i>0?1:i<0?-1:0}function Dv(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Du(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Fs(i,t){return he(i.prev,i,i.next)<0?he(i,t,i.next)>=0&&he(i,i.prev,t)>=0:he(i,t,i.prev)<0||he(i,i.next,t)<0}function Uv(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Uu(i,t){const e=new Ja(i.i,i.x,i.y),n=new Ja(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function lh(i,t,e,n){const s=new Ja(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Os(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Ja(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Nv(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class ws{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return ws.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];hh(t),uh(n,t);let o=t.length;e.forEach(hh);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,uh(n,e[c]);const a=xv.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function hh(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function uh(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class uo extends ge{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],c=[],l=[],h=[];let u=t;const f=(e-t)/s,d=new L,g=new ht;for(let _=0;_<=s;_++){for(let m=0;m<=n;m++){const p=r+m/n*o;d.x=u*Math.cos(p),d.y=u*Math.sin(p),c.push(d.x,d.y,d.z),l.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,h.push(g.x,g.y)}u+=f}for(let _=0;_<s;_++){const m=_*(n+1);for(let p=0;p<n;p++){const E=p+m,M=E,v=E+n+1,F=E+n+2,C=E+1;a.push(M,v,C),a.push(v,F,C)}}this.setIndex(a),this.setAttribute("position",new Qt(c,3)),this.setAttribute("normal",new Qt(l,3)),this.setAttribute("uv",new Qt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new uo(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Lc extends ge{constructor(t=new Lu([new ht(0,.5),new ht(-.5,-.5),new ht(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],s=[],r=[],o=[];let a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new Qt(s,3)),this.setAttribute("normal",new Qt(r,3)),this.setAttribute("uv",new Qt(o,2));function l(h){const u=s.length/3,f=h.extractPoints(e);let d=f.shape;const g=f.holes;ws.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,p=g.length;m<p;m++){const E=g[m];ws.isClockWise(E)===!0&&(g[m]=E.reverse())}const _=ws.triangulateShape(d,g);for(let m=0,p=g.length;m<p;m++){const E=g[m];d=d.concat(E)}for(let m=0,p=d.length;m<p;m++){const E=d[m];s.push(E.x,E.y,0),r.push(0,0,1),o.push(E.x,E.y)}for(let m=0,p=_.length;m<p;m++){const E=_[m],M=E[0]+u,v=E[1]+u,F=E[2]+u;n.push(M,v,F),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return Fv(e,t)}static fromJSON(t,e){const n=[];for(let s=0,r=t.shapes.length;s<r;s++){const o=e[t.shapes[s]];n.push(o)}return new Lc(n,t.curveSegments)}}function Fv(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){const s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}class qn extends ge{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new L,f=new L,d=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const E=[],M=p/n;let v=0;p===0&&o===0?v=.5/e:p===n&&c===Math.PI&&(v=-.5/e);for(let F=0;F<=e;F++){const C=F/e;u.x=-t*Math.cos(s+C*r)*Math.sin(o+M*a),u.y=t*Math.cos(o+M*a),u.z=t*Math.sin(s+C*r)*Math.sin(o+M*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),m.push(C+v,1-M),E.push(l++)}h.push(E)}for(let p=0;p<n;p++)for(let E=0;E<e;E++){const M=h[p][E+1],v=h[p][E],F=h[p+1][E],C=h[p+1][E+1];(p!==0||o>0)&&d.push(M,v,C),(p!==n-1||c<Math.PI)&&d.push(v,F,C)}this.setIndex(d),this.setAttribute("position",new Qt(g,3)),this.setAttribute("normal",new Qt(_,3)),this.setAttribute("uv",new Qt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qn(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Kr extends ge{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],c=[],l=[],h=new L,u=new L,f=new L;for(let d=0;d<=n;d++)for(let g=0;g<=s;g++){const _=g/s*r,m=d/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(_),u.y=(t+e*Math.cos(m))*Math.sin(_),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),f.subVectors(u,h).normalize(),c.push(f.x,f.y,f.z),l.push(g/s),l.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=s;g++){const _=(s+1)*d+g-1,m=(s+1)*(d-1)+g-1,p=(s+1)*(d-1)+g,E=(s+1)*d+g;o.push(_,m,E),o.push(m,p,E)}this.setIndex(o),this.setAttribute("position",new Qt(a,3)),this.setAttribute("normal",new Qt(c,3)),this.setAttribute("uv",new Qt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Kr(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class We extends ti{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Vt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Vt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ru,this.normalScale=new ht(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Nu extends me{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Vt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Ov extends Nu{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(me.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Vt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const ea=new oe,fh=new L,dh=new L;class Bv{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ht(512,512),this.map=null,this.mapPass=null,this.matrix=new oe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ec,this._frameExtents=new ht(1,1),this._viewportCount=1,this._viewports=[new fe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;fh.setFromMatrixPosition(t.matrixWorld),e.position.copy(fh),dh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(dh),e.updateMatrixWorld(),ea.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ea),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ea)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class kv extends Bv{constructor(){super(new vu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ph extends Nu{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(me.DEFAULT_UP),this.updateMatrix(),this.target=new me,this.shadow=new kv}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class zv{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=mh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=mh();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function mh(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:gc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=gc);const Qr=9.81,Wt={LENGTH:23.77,HALF_L:11.885,HALF_SW:4.115,HALF_DW:5.485,SERVICE_LINE:6.4,NET_HEIGHT:.95,NET_POST_X:5.02,LINE_MARGIN:.08},we={R:.033,VISUAL_R:.075,RESTITUTION:.88,FRICTION:.78,DRAG:.045},Ye={SPEED:7.4,REACH:2.1,MAX_HIT_Y:3,BOUND_X:7,BOUND_Z_NEAR:1.2,BOUND_Z_FAR:16,SWING_TIME:.35,SMASH_MIN_Y:1.35},xi={STAND_Z:Wt.HALF_L+.5,STAND_X_MIN:.25,STAND_X_MAX:Wt.HALF_SW-.3,DIST_MIN:5,DIST_RANGE:18},gh={INTERVAL:1/30},Hv=4;class fo{constructor(){R(this,"p",{x:0,y:1,z:0});R(this,"v",{x:0,y:0,z:0});R(this,"active",!1)}set(t,e){this.p={...t},this.v={...e},this.active=!0}hold(t,e,n){this.p={x:t,y:e,z:n},this.v={x:0,y:0,z:0},this.active=!1}step(t){const e={bounce:null,netHit:!1,crossedNet:!1};if(!this.active)return e;const n=this.p.x,s=this.p.y,r=this.p.z;this.v.y-=Qr*t;const o=Math.max(0,1-we.DRAG*t);if(this.v.x*=o,this.v.z*=o,this.p.x+=this.v.x*t,this.p.y+=this.v.y*t,this.p.z+=this.v.z*t,r!==0&&Math.sign(r)!==Math.sign(this.p.z)&&this.p.z!==0){const a=r/(r-this.p.z),c=n+(this.p.x-n)*a,l=s+(this.p.y-s)*a;l<Wt.NET_HEIGHT+we.R&&Math.abs(c)<Wt.NET_POST_X?(this.p.x=c,this.p.y=Math.max(l,.15),this.p.z=Math.sign(r)*.07,this.v.z*=-.12,this.v.x*=.3,this.v.y=Math.min(this.v.y,0)*.3,e.netHit=!0):e.crossedNet=!0}return this.p.y<=we.R&&this.v.y<0&&(this.p.y=we.R,e.bounce={x:this.p.x,z:this.p.z},this.v.y=-this.v.y*we.RESTITUTION,this.v.x*=we.FRICTION,this.v.z*=we.FRICTION,this.v.y<.8&&(this.v.y=0)),e}}function _h(i,t,e,n){return{x:(t-i.x)/n,y:(we.R-i.y)/n+.5*Qr*n,z:(e-i.z)/n}}function vh(i,t,e,n,s){let r=n,o=_h(i,t,e,r);for(let a=0;a<8;a++){if(Math.sign(i.z)===Math.sign(e)||o.z===0)return o;const c=(0-i.z)/o.z,l=i.y+o.y*c-.5*Qr*c*c,h=o.y-Qr*c,u=Math.abs(h)*c*c*we.DRAG*.5,f=Wt.NET_HEIGHT+we.R+u+s;if(l>=f)return o;r+=.08,o=_h(i,t,e,r)}return o}function Vv(i,t,e=1/90,n=3){const s=new fo;s.set(i,t);const r=[{...i}];for(let o=0;o<n;o+=e){const a=s.step(e);if(r.push({...s.p}),a.bounce||a.netHit)break}return r}function Fu(i,t){const e=new fo;e.set(i,t);const n=1/240;for(let s=0;s<4;s+=n){const r=e.step(n);if(r.netHit)return null;if(r.bounce)return r.bounce}return null}function Ka(i,t,e,n,s){let r=t,o=e,a=vh(i,r,o,n,s);for(let c=0;c<3;c++){const l=Fu(i,a);if(!l)return a;r+=t-l.x,o+=e-l.z,a=vh(i,r,o,n,s)}return a}function to(i){return{points:[0,0],games:[0,0],server:i,finished:!1,winner:null}}function Gv(i,t,e){if(i.finished)return;if(e===0){i.points[t]++,i.games[t]++,i.finished=!0,i.winner=t;return}i.points[t]++;const[n,s]=i.points,r=Math.abs(n-s);if((n>=4||s>=4)&&r>=2){const o=n>s?0:1;i.games[o]++,i.points=[0,0],i.server=i.server===0?1:0,i.games[o]>=e&&(i.finished=!0,i.winner=o)}}function Wv(i){const t=["0","15","30","40"],[e,n]=i.points;return e>=3&&n>=3?e===n?["40","40"]:e>n?["Ad","–"]:["–","Ad"]:[t[Math.min(e,3)],t[Math.min(n,3)]]}const Ic=(i,t,e)=>Math.min(e,Math.max(t,i)),An=i=>i===0?1:-1;function po(i,t){const e=An(i),s=((t[0]+t[1])%2===0?1:-1)*e,r=s*xi.STAND_X_MIN,o=s*xi.STAND_X_MAX;return{z:e*xi.STAND_Z,x0:Math.min(r,o),x1:Math.max(r,o)}}const xh=4,Xv=22,$v=.8;function Ou(i,t){const e=Math.hypot(i.dirX,i.dirY);let n=e>1e-6?i.dirX/e:0,s=e>1e-6?i.dirY/e:1;s<t&&(s=t),n*=$v;const r=Math.hypot(n,s);return{ux:n/r,uy:s/r}}function Bu(i,t,e){const n=Ic(e.power,0,1),{ux:s,uy:r}=Ou(e,.18),o=xh+n*(Xv-xh),a=i.x+s*t*o,c=i.z-r*t*o,l=e.kind==="drive"&&i.y>Ye.SMASH_MIN_Y;let h,u;return e.kind==="lob"?(h=2-.5*n,u=1.7):l?(h=.8-.3*n,u=.05):(h=1.2-.5*n,u=.42-.3*n),{tx:a,tz:c,t:h,margin:u,smash:l}}function ku(i,t,e){const n=Ic(e.power,0,1),{ux:s,uy:r}=Ou(e,.3),o=xi.DIST_MIN+n*xi.DIST_RANGE;return{tx:i.x+s*t*o,tz:i.z-r*t*o,t:1.1-.42*n,margin:.2}}function qv(i,t,e,n){const s=An(i),r=po(i,t),o=-Math.sign(r.x0+r.x1)||1,a=Wt.LINE_MARGIN;return Math.sign(n)!==-s||Math.abs(n)>Wt.SERVICE_LINE+a||Math.abs(e)>Wt.HALF_SW+a?!1:Math.sign(e||o)===o}class Yv{constructor(t,e){R(this,"ball",new fo);R(this,"score");R(this,"phase","between");R(this,"players",[{x:0,z:Wt.HALF_L+1,swing:0},{x:0,z:-12.885,swing:0}]);R(this,"fx",{hit:0,smash:0,bounce:0,net:0,point:0,fault:0});R(this,"msgSeq",0);R(this,"msgText","");R(this,"resetSeq",0);R(this,"lastHitter",0);R(this,"bouncesSinceHit",0);R(this,"canSwingArr",[!1,!1]);R(this,"serving",!1);R(this,"serveNum",1);R(this,"serveBoxXSign",1);R(this,"timer",1.2);R(this,"pendingSwing",[null,null]);R(this,"gamesToWin");this.gamesToWin=e,this.score=to(t),this.say("スタート！")}restart(){this.score=to(Math.random()<.5?0:1),this.serveNum=1,this.phase="between",this.timer=1.2,this.say("スタート！")}say(t){this.msgSeq++,this.msgText=t}setupPoint(){const t=this.score.server,e=1-t,n=An(t),o=((this.score.points[0]+this.score.points[1])%2===0?1:-1)*n*1.3;this.players[t].x=o,this.players[t].z=n*(Wt.HALF_L+.5),this.players[e].x=-Math.sign(o)*1.8,this.players[e].z=-n*(Wt.HALF_L+.7),this.players[t].swing=0,this.players[e].swing=0,this.ball.hold(o,1.35,n*(Wt.HALF_L+.3)),this.serving=!1,this.bouncesSinceHit=0,this.canSwingArr=[!1,!1],this.pendingSwing=[null,null],this.phase="await-serve",this.clampServer(),this.resetSeq++,this.serveNum===2&&this.say("セカンドサーブ")}clampServer(){const t=this.score.server,e=po(t,this.score.points),n=this.players[t];n.z=e.z,n.x=Ic(n.x,e.x0,e.x1),this.serveBoxXSign=-Math.sign(e.x0+e.x1)||1}canHit(t){if(this.phase!=="rally"||!this.canSwingArr[t])return!1;const e=this.ball.p,n=this.players[t];return Math.sign(e.z)!==An(t)&&Math.abs(e.z)>.4||e.y>Ye.MAX_HIT_Y?!1:Math.hypot(e.x-n.x,e.z-n.z)<=Ye.REACH}swingDirFor(t){return(this.ball.p.x-this.players[t].x)*An(t)>=0?1:-1}trySwing(t,e){return this.phase==="await-serve"&&t===this.score.server?(this.players[t].swing=this.swingDirFor(t),this.doServe(e),!0):this.canHit(t)?(this.players[t].swing=this.swingDirFor(t),this.doHit(t,e),!0):(this.phase==="rally"&&this.canSwingArr[t]&&(this.pendingSwing[t]={cmd:e,timer:.9}),!1)}doServe(t){const e=this.score.server;this.clampServer();const n=this.players[e],s={x:n.x,y:2.75,z:n.z},r=ku(n,An(e),t),o=Ka(s,r.tx,r.tz,r.t,r.margin);this.ball.set(s,o),this.serving=!0,this.lastHitter=e,this.bouncesSinceHit=0,this.canSwingArr[e]=!1,this.canSwingArr[1-e]=!0,this.phase="rally",this.fx.hit++}doHit(t,e){const n=An(t),s=this.ball.p,r={x:s.x,y:Math.max(s.y,.45),z:s.z},o=Bu(s,n,e);o.smash&&(this.fx.smash++,this.say("スマッシュ！"));const a=Ka(r,o.tx,o.tz,o.t,o.margin);this.ball.set(r,a),this.serving=!1,this.lastHitter=t,this.bouncesSinceHit=0,this.canSwingArr[t]=!1,this.canSwingArr[1-t]=!0,this.fx.hit++}update(t){for(const n of this.players)n.swing=Math.sign(n.swing)*Math.max(0,Math.abs(n.swing)-t/Ye.SWING_TIME);if(this.phase==="between"){this.timer-=t,this.timer<=0&&(this.score.finished?this.phase="over":this.setupPoint());return}if(this.phase==="await-serve"){this.clampServer(),this.ball.p.x=this.players[this.score.server].x;return}if(this.phase!=="rally")return;for(const n of[0,1]){const s=this.pendingSwing[n];s&&(s.timer-=t,s.timer<=0?this.pendingSwing[n]=null:this.canHit(n)&&(this.pendingSwing[n]=null,this.players[n].swing=this.swingDirFor(n),this.doHit(n,s.cmd)))}const e=this.ball.step(t);if(e.netHit&&(this.fx.net++,this.serving)){this.fault();return}if(!(e.bounce&&(this.fx.bounce++,this.onBounce(e.bounce.x,e.bounce.z),this.phase!=="rally"))){if(this.ball.active&&this.ball.p.y<=.06&&Math.abs(this.ball.v.y)<.4&&this.bouncesSinceHit>=1){this.pointTo(this.lastHitter,"ナイスショット！");return}(Math.abs(this.ball.p.x)>35||Math.abs(this.ball.p.z)>45)&&this.pointTo(1-this.lastHitter,"アウト！")}}onBounce(t,e){const n=e>=0?0:1;if(this.bouncesSinceHit++,this.serving&&this.bouncesSinceHit===1){if(this.inServiceBox(t,e)){this.serving=!1;return}this.fault();return}if(this.bouncesSinceHit===1){if(n===this.lastHitter){this.pointTo(1-this.lastHitter,"ミス！");return}if(!this.inSingles(t,e)){this.pointTo(1-this.lastHitter,"アウト！");return}return}this.pointTo(this.lastHitter,"ナイスショット！")}inSingles(t,e){const n=Wt.LINE_MARGIN;return Math.abs(t)<=Wt.HALF_SW+n&&Math.abs(e)<=Wt.HALF_L+n}inServiceBox(t,e){const n=Wt.LINE_MARGIN,s=An(this.score.server);return Math.sign(e)!==-s||Math.abs(e)>Wt.SERVICE_LINE+n||Math.abs(t)>Wt.HALF_SW+n?!1:Math.sign(t||this.serveBoxXSign)===this.serveBoxXSign}fault(){if(this.ball.active=!1,this.fx.fault++,this.serveNum===1)this.serveNum=2,this.say("フォルト！"),this.phase="between",this.timer=1.5;else{this.serveNum=1;const t=1-this.score.server;this.pointTo(t,"ダブルフォルト")}}pointTo(t,e){this.ball.active=!1,this.serveNum=1;const n=this.score.games[0]+this.score.games[1];Gv(this.score,t,this.gamesToWin),this.fx.point++;const s=this.score.games[0]+this.score.games[1];this.say(s>n?`${e}　ゲーム！`:e),this.phase="between",this.timer=this.score.finished?1.2:2.2}}const Wn=1,jv=-11.285,Zv={1:{speed:.6,reactMin:.25,reactVar:.3,aimErr:.5,powMin:.3,powVar:.3,smart:!1},2:{speed:.88,reactMin:.1,reactVar:.18,aimErr:.25,powMin:.4,powVar:.4,smart:!1},3:{speed:1.02,reactMin:.04,reactVar:.1,aimErr:.1,powMin:.55,powVar:.35,smart:!0}};class Jv{constructor(t=2){R(this,"p");R(this,"serveTimer",0);R(this,"reactTimer",0);R(this,"planned",!1);R(this,"aim",0);R(this,"power",.6);R(this,"lob",!1);this.p=Zv[t]}update(t,e){const n=e.players[Wn],s=An(Wn);if(e.phase==="await-serve"){this.planned=!1,e.score.server===Wn&&(this.serveTimer+=t,this.serveTimer>.9+Math.random()*.5&&(this.serveTimer=0,this.serve(e,s)));return}if(this.serveTimer=0,e.phase!=="rally")return;const r=e.ball,o=r.v.z*s>0||Math.sign(r.p.z)===s;let a=0,c=jv;if(o&&Math.abs(r.v.z)>.5){const d=(n.z-r.p.z)/r.v.z;d>0&&(a=r.p.x+r.v.x*d),a=Math.max(-4.115,Math.min(Wt.HALF_SW,a)),Math.sign(r.p.z)===s&&Math.abs(r.p.z)<Math.abs(n.z)-1.5&&(c=-Math.max(Math.abs(r.p.z),Ye.BOUND_Z_NEAR+.8))}const l=Ye.SPEED*this.p.speed,h=a-n.x,u=c-n.z,f=Math.hypot(h,u);if(f>.05){const d=Math.min(f,l*t);n.x+=h/f*d,n.z+=u/f*d}if(e.canHit(Wn)){if(!this.planned){if(this.planned=!0,this.reactTimer=this.p.reactMin+Math.random()*this.p.reactVar,this.power=this.p.powMin+Math.random()*this.p.powVar,this.lob=Math.random()<.14,this.p.smart){const d=e.players[0].x;this.aim=-Math.sign(d||1)*s*(.5+Math.random()*.4)}else this.aim=(Math.random()*2-1)*.7;this.aim+=(Math.random()*2-1)*this.p.aimErr}this.reactTimer-=t,this.reactTimer<=0&&(this.planned=!1,e.trySwing(Wn,{kind:this.lob?"lob":"drive",dirX:this.aim,dirY:1,power:this.power}))}else this.planned=!1}serve(t,e){const n=t.players[Wn],s=po(Wn,t.score.points),o=(-Math.sign(s.x0+s.x1)||1)*(1.4+Math.random()*1.6)+(Math.random()*2-1)*this.p.aimErr*2,a=-e*(3+Math.random()*2.5),c=o-n.x,l=a-n.z,h=Math.hypot(c,l)*(1+(Math.random()*2-1)*this.p.aimErr*.2),u=Math.max(.15,Math.min(1,(h-xi.DIST_MIN)/xi.DIST_RANGE));t.trySwing(Wn,{kind:"drive",dirX:c*e,dirY:-l*e,power:u})}}const Ar=60,Kv=8,Qv=24,tx=330;class ex{constructor(){R(this,"state",{x:0,y:0});R(this,"onShot",()=>{});R(this,"live",{active:!1,dirX:0,dirY:1,power:0});R(this,"keys",new Set);R(this,"keysVec",{x:0,y:0});R(this,"joyPointer",null);R(this,"joyOrigin",{x:0,y:0});R(this,"joyVec",{x:0,y:0});R(this,"flickPointer",null);R(this,"start",{x:0,y:0,t:0});R(this,"joyZone",document.getElementById("joy-zone"));R(this,"joyBase",document.getElementById("joy-base"));R(this,"joyKnob",document.getElementById("joy-knob"));R(this,"flickZone",document.getElementById("swipe-zone"));R(this,"onKeyDown",t=>{if(t.repeat){t.code==="Space"&&t.preventDefault();return}this.keys.add(t.code),t.code==="Space"||t.code==="KeyZ"?(t.preventDefault(),this.onShot({kind:"drive",dirX:this.state.x*.55,dirY:1,power:.7})):(t.code==="KeyX"||t.code==="ShiftLeft")&&this.onShot({kind:"lob",dirX:this.state.x*.55,dirY:1,power:.7}),this.updateKeyboard()});R(this,"onKeyUp",t=>{this.keys.delete(t.code),this.updateKeyboard()});R(this,"onJoyDown",t=>{this.joyPointer===null&&(this.joyPointer=t.pointerId,this.joyOrigin={x:t.clientX,y:t.clientY},this.joyVec={x:0,y:0},this.joyBase.hidden=!1,this.joyBase.style.left=`${t.clientX}px`,this.joyBase.style.top=`${t.clientY}px`,this.setKnob(0,0),this.joyZone.setPointerCapture(t.pointerId))});R(this,"onJoyMove",t=>{if(t.pointerId!==this.joyPointer)return;let e=t.clientX-this.joyOrigin.x,n=t.clientY-this.joyOrigin.y;const s=Math.hypot(e,n);if(s<Kv)this.joyVec={x:0,y:0};else{const r=Math.min(s,Ar);e=e/s*r,n=n/s*r,this.joyVec={x:e/Ar,y:-n/Ar}}this.setKnob(e,n),this.apply()});R(this,"onJoyUp",t=>{t.pointerId===this.joyPointer&&(this.joyPointer=null,this.joyVec={x:0,y:0},this.joyBase.hidden=!0,this.apply())});R(this,"onFlickDown",t=>{this.flickPointer===null&&(this.flickPointer=t.pointerId,this.start={x:t.clientX,y:t.clientY,t:performance.now()},this.live={active:!0,dirX:0,dirY:1,power:.1},this.flickZone.setPointerCapture(t.pointerId))});R(this,"onFlickMove",t=>{if(t.pointerId!==this.flickPointer)return;const e=this.metrics(t.clientX-this.start.x,t.clientY-this.start.y);this.live={active:!0,...e}});R(this,"onFlickUp",t=>{if(t.pointerId!==this.flickPointer)return;this.flickPointer=null,this.live={active:!1,dirX:0,dirY:1,power:0};const e=t.clientX-this.start.x,n=t.clientY-this.start.y,s=Math.hypot(e,n),r=Math.max(.03,(performance.now()-this.start.t)/1e3);if(s<Qv){this.onShot({kind:"drive",dirX:0,dirY:1,power:.5});return}const o=this.metrics(e,n),a=s/r<tx?"lob":"drive";this.onShot({kind:a,...o})});window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp),this.joyZone.addEventListener("pointerdown",this.onJoyDown),this.joyZone.addEventListener("pointermove",this.onJoyMove),this.joyZone.addEventListener("pointerup",this.onJoyUp),this.joyZone.addEventListener("pointercancel",this.onJoyUp),this.flickZone.addEventListener("pointerdown",this.onFlickDown),this.flickZone.addEventListener("pointermove",this.onFlickMove),this.flickZone.addEventListener("pointerup",this.onFlickUp),this.flickZone.addEventListener("pointercancel",this.onFlickUp)}updateKeyboard(){const t=this.keys;let e=0,n=0;(t.has("KeyA")||t.has("ArrowLeft"))&&(e-=1),(t.has("KeyD")||t.has("ArrowRight"))&&(e+=1),(t.has("KeyW")||t.has("ArrowUp"))&&(n+=1),(t.has("KeyS")||t.has("ArrowDown"))&&(n-=1);const s=Math.hypot(e,n);this.keysVec=s>1?{x:e/s,y:n/s}:{x:e,y:n},this.apply()}apply(){this.joyPointer!==null?this.state={...this.joyVec}:this.state={...this.keysVec}}setKnob(t,e){const n=Math.hypot(t,e),s=Math.min(n,Ar),r=n>0?t/n:0,o=n>0?e/n:0;this.joyKnob.style.transform=`translate(${r*s}px, ${o*s}px)`}metrics(t,e){const n=Math.hypot(t,e),s=Math.max(.1,Math.min(1,n/(Math.min(window.innerWidth,window.innerHeight)*.48)));return{dirX:t,dirY:-e,power:s}}dispose(){window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp),this.joyZone.removeEventListener("pointerdown",this.onJoyDown),this.joyZone.removeEventListener("pointermove",this.onJoyMove),this.joyZone.removeEventListener("pointerup",this.onJoyUp),this.joyZone.removeEventListener("pointercancel",this.onJoyUp),this.flickZone.removeEventListener("pointerdown",this.onFlickDown),this.flickZone.removeEventListener("pointermove",this.onFlickMove),this.flickZone.removeEventListener("pointerup",this.onFlickUp),this.flickZone.removeEventListener("pointercancel",this.onFlickUp),this.joyBase.hidden=!0}}const Se=i=>document.getElementById(i);class nx{constructor(){R(this,"msgTimer");R(this,"root",Se("hud"));R(this,"msg",Se("msg"));R(this,"serveHint",Se("serve-hint"));R(this,"flickMeter",Se("flick-meter"));R(this,"flickMeterFill",Se("flick-meter-fill"));R(this,"result",Se("result"));R(this,"resultTitle",Se("result-title"));R(this,"resultDetail",Se("result-detail"))}show(t,e,n=!1){Se("sb-name-me").textContent=t,Se("sb-name-opp").textContent=e,Se("spectating").hidden=!n,this.root.hidden=!1,this.result.hidden=!0,this.msg.classList.remove("show"),this.serveHint.hidden=!0,this.flickMeter.hidden=!0}hide(){this.root.hidden=!0}setScore(t,e){const n=Wv(t),s=1-e;Se("sb-games-me").textContent=String(t.games[e]),Se("sb-games-opp").textContent=String(t.games[s]),Se("sb-points-me").textContent=n[e],Se("sb-points-opp").textContent=n[s],Se("sb-row-me").classList.toggle("serving",t.server===e),Se("sb-row-opp").classList.toggle("serving",t.server===s)}flash(t,e=1600){this.msg.textContent=t,this.msg.classList.add("show"),window.clearTimeout(this.msgTimer),this.msgTimer=window.setTimeout(()=>this.msg.classList.remove("show"),e)}setServeHint(t){this.serveHint.hidden=!t}setFlickPower(t){this.flickMeter.hidden=t===null,t!==null&&(this.flickMeterFill.style.width=`${Math.round(t*100)}%`,this.flickMeterFill.style.background=`hsl(${Math.round(120*(1-t))}, 90%, 55%)`)}showResult(t,e){this.resultTitle.textContent=t?"WIN":"LOSE",this.resultTitle.className=t?"win":"lose",this.resultDetail.textContent=e,this.result.hidden=!1}hideResult(){this.result.hidden=!0}}const wr=22,yh=16;function ix(){const i=document.createElement("canvas");i.width=64,i.height=64;const t=i.getContext("2d"),e=t.createRadialGradient(32,32,0,32,32,32);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.4,"rgba(255,255,255,0.55)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),new Xs(i)}class sx{constructor(t){R(this,"mesh");R(this,"blob");R(this,"trail");R(this,"trailPos");R(this,"trailCount",0);R(this,"rings",[]);R(this,"scene");R(this,"glow");R(this,"ghosts",[]);R(this,"ghostHead",0);R(this,"prev",{x:0,y:0,z:0});R(this,"squash",0);this.scene=t;const e=ix();this.glow=new qa(new jr({map:e,color:14217802,transparent:!0,opacity:.4,depthWrite:!1,blending:Is})),this.glow.scale.setScalar(.5),t.add(this.glow);for(let s=0;s<yh;s++){const r=new qa(new jr({map:e,color:16771179,transparent:!0,opacity:0,depthWrite:!1,blending:Is}));r.scale.setScalar(.24),t.add(r),this.ghosts.push(r)}this.mesh=new Tt(new qn(we.VISUAL_R,18,14),new We({color:14217802,roughness:.55,emissive:5597970,emissiveIntensity:.5})),this.mesh.castShadow=!0,t.add(this.mesh),this.blob=new Tt(new ss(we.VISUAL_R*1.3,16),new hn({color:0,transparent:!0,opacity:.35})),this.blob.rotation.x=-Math.PI/2,this.blob.position.y=.011,t.add(this.blob),this.trailPos=new Float32Array(wr*3);const n=new ge;n.setAttribute("position",new Ge(this.trailPos,3)),this.trail=new Tu(n,new Ac({color:13300284,transparent:!0,opacity:.4})),this.trail.frustumCulled=!1,t.add(this.trail)}update(t,e,n,s,r){this.mesh.position.set(e,Math.max(n,we.VISUAL_R),s);const o=t>0?Math.hypot(e-this.prev.x,n-this.prev.y,s-this.prev.z)/t:0;this.prev={x:e,y:n,z:s},this.squash=Math.max(0,this.squash-t*7);const a=this.squash;this.mesh.scale.set(1+.35*a,1-.5*a,1+.35*a);const c=Math.min(1,Math.max(0,(o-8)/22));this.glow.position.copy(this.mesh.position),this.glow.scale.setScalar(.4+c*.9);const l=this.glow.material;if(l.opacity=r?.3+c*.5:.18,l.color.setHSL(.16-c*.12,1,.6+c*.15),r&&o>6){const f=this.ghosts[this.ghostHead];this.ghostHead=(this.ghostHead+1)%yh,f.position.set(e,Math.max(n,we.VISUAL_R),s),f.material.opacity=.28+c*.3,f.scale.setScalar(.18+c*.22),f.material.color.setHSL(.14-c*.1,1,.6)}for(const f of this.ghosts)f.material.opacity>0&&(f.material.opacity=Math.max(0,f.material.opacity-t*1.8),f.scale.multiplyScalar(Math.max(0,1-t*1.2)));this.blob.position.x=e,this.blob.position.z=s;const h=Math.max(0,n),u=Math.max(.4,1-h*.06);if(this.blob.scale.setScalar(u),this.blob.material.opacity=Math.max(.08,.35-h*.02),r){for(let f=wr-1;f>0;f--)this.trailPos[f*3]=this.trailPos[(f-1)*3],this.trailPos[f*3+1]=this.trailPos[(f-1)*3+1],this.trailPos[f*3+2]=this.trailPos[(f-1)*3+2];this.trailPos[0]=e,this.trailPos[1]=Math.max(n,we.VISUAL_R),this.trailPos[2]=s,this.trailCount=Math.min(wr,this.trailCount+1)}else{this.trailCount=0;for(let f=0;f<wr;f++)this.trailPos[f*3]=e,this.trailPos[f*3+1]=Math.max(n,we.VISUAL_R),this.trailPos[f*3+2]=s}this.trail.geometry.attributes.position.needsUpdate=!0,this.trail.material.opacity=this.trailCount>3?.4:0;for(let f=this.rings.length-1;f>=0;f--){const d=this.rings[f];d.life-=t;const g=1-Math.max(0,d.life)/.45;d.mesh.scale.setScalar(.3+g*1.6),d.mesh.material.opacity=.5*(1-g),d.life<=0&&(this.scene.remove(d.mesh),d.mesh.geometry.dispose(),d.mesh.material.dispose(),this.rings.splice(f,1))}}bounceAt(t,e){this.squash=1;const n=new Tt(new uo(.16,.24,24),new hn({color:14676586,transparent:!0,opacity:.5,side:Ve}));n.rotation.x=-Math.PI/2,n.position.set(t,.015,e),this.scene.add(n),this.rings.push({mesh:n,life:.45})}}const Sh={shirt:15222060,shorts:1712176,skin:15250570,accent:16765500},Mh={shirt:2602984,shorts:1318958,skin:13208931,accent:13434675};function rx(){const i=document.createElement("canvas");i.width=64,i.height=64;const t=i.getContext("2d");t.clearRect(0,0,64,64),t.strokeStyle="rgba(235,242,252,0.9)",t.lineWidth=1.4;for(let n=4;n<64;n+=6)t.beginPath(),t.moveTo(n,0),t.lineTo(n,64),t.stroke(),t.beginPath(),t.moveTo(0,n),t.lineTo(64,n),t.stroke();const e=new Xs(i);return e.colorSpace=De,e}class bh{constructor(t,e,n,s,r){R(this,"group",new Ue);R(this,"body",new Ue);R(this,"legL");R(this,"legR");R(this,"armL");R(this,"armSwing",new Ue);R(this,"runPhase",0);R(this,"idlePhase",Math.random()*Math.PI*2);R(this,"posX");R(this,"posZ");this.posX=s,this.posZ=r;const o=(rt,xt=.75)=>new We({color:rt,roughness:xt}),a=o(e.shirt),c=o(e.shorts),l=o(e.skin,.6),h=o(e.accent,.5),u=o(15988475,.7),f=o(1514276,.6),d=rt=>{const xt=new Ue,Dt=new Tt(new di(.088,.2,4,10),c);Dt.position.y=-.12;const $=new Tt(new di(.062,.2,4,10),l);$.position.y=-.36;const et=new Tt(new pn(.066,.07,.09,10),u);et.position.y=-.5;const pt=new Tt(new Qe(.13,.075,.25),u);pt.position.set(0,-.585,.045);const ot=new Tt(new Qe(.135,.028,.26),h);return ot.position.set(0,-.635,.045),xt.add(Dt,$,et,pt,ot),xt.position.set(.11*rt,.62,0),xt};this.legL=d(-1),this.legR=d(1);const g=new Tt(new pn(.185,.2,.2,14),c);g.position.y=.68;const _=new Tt(new di(.185,.38,4,14),a);_.position.y=.95;const m=new Tt(new Kr(.085,.02,8,16),h);m.rotation.x=Math.PI/2,m.position.y=1.245;const p=new Tt(new ss(.03,12),new hn({color:e.accent}));p.position.set(.09,1.08,.175);const E=new Tt(new qn(.12,16,14),l);E.position.y=1.36;const M=new qn(.017,8,8),v=new Tt(M,f);v.position.set(-.045,1.385,.105);const F=new Tt(M,f);F.position.set(.045,1.385,.105);const C=new Tt(new qn(.127,16,8,0,Math.PI*2,0,Math.PI*.55),a);C.position.y=1.39;const A=new Tt(new Qe(.16,.02,.12),h);A.position.set(0,1.425,.15),A.rotation.x=.14;const P=new Tt(new qn(.018,8,8),h);P.position.y=1.515;const b=()=>{const rt=new Ue,xt=new Tt(new di(.062,.08,4,8),a);xt.position.y=-.05;const Dt=new Tt(new di(.05,.22,4,8),l);return Dt.position.y=-.22,rt.add(xt,Dt),rt};this.armL=b(),this.armL.position.set(-.26,1.16,0),this.armL.rotation.z=.35;const S=b(),w=new Tt(new pn(.056,.056,.05,10),h);w.position.y=-.36;const H=new Ue,B=new Tt(new pn(.02,.022,.28,8),f);B.position.y=-.5;const V=new Tt(new pn(.026,.026,.03,8),h);V.position.y=-.375;const J=new pn(.012,.012,.16,6),W=o(14476530,.4),tt=new Tt(J,W);tt.position.set(-.05,-.62,0),tt.rotation.z=.42;const G=new Tt(J,W);G.position.set(.05,-.62,0),G.rotation.z=-.42;const q=new Tt(new Kr(.14,.016,8,24),h);q.position.y=-.82,q.scale.y=1.15;const Q=new Tt(new ss(.128,20),new hn({map:rx(),transparent:!0,opacity:.85,side:Ve}));Q.position.y=-.82,Q.scale.y=1.15,H.add(B,V,tt,G,q,Q),H.position.y=-.1,this.armSwing.add(S,w,H),this.armSwing.position.set(.26,1.16,0),this.armSwing.rotation.z=-.4,this.body.add(this.legL,this.legR,g,_,m,p,E,v,F,C,A,P,this.armL,this.armSwing),this.body.traverse(rt=>{rt instanceof Tt&&(rt.castShadow=!0)}),this.group.add(this.body),this.group.rotation.y=n?Math.PI:0,this.group.position.set(s,0,r),t.add(this.group)}update(t,e,n,s,r=!1){const o=r?1:Math.min(1,t*14),a=this.posX,c=this.posZ;this.posX+=(e-this.posX)*o,this.posZ+=(n-this.posZ)*o,this.group.position.set(this.posX,0,this.posZ);const l=Math.hypot(this.posX-a,this.posZ-c)/Math.max(t,1e-4),h=Math.min(1,l/Ye.SPEED);this.runPhase+=t*(4+9*h),this.idlePhase+=t*2;const u=Math.sin(this.runPhase)*.7*h;this.legL.rotation.x=u,this.legR.rotation.x=-u,this.body.rotation.x=.14*h,this.body.position.y=Math.abs(Math.sin(this.runPhase))*.05*h+Math.sin(this.idlePhase)*.012*(1-h);const f=Math.abs(s),d=s<0?-1:1;if(f>0){const g=1-f,_=Math.sin(Math.min(1,g*1.15)*Math.PI);this.armSwing.position.x=.26*d,this.armSwing.rotation.z=d*(-.4-1.5*_),this.armSwing.rotation.y=d*(g-.4)*2.6,this.armSwing.rotation.x=-_*.8,this.body.rotation.y=d*_*.35,this.armL.visible=d>0,this.armL.rotation.x=0}else this.armSwing.position.x=.26,this.armSwing.rotation.set(0,0,-.4),this.body.rotation.y=0,this.armL.visible=!0,this.armL.rotation.x=-u*.9}}const Eh=.55;class ox{constructor(t){R(this,"group",new Ue);R(this,"mat");R(this,"shaft");R(this,"head");this.mat=new hn({color:13434675,transparent:!0,opacity:.8,side:Ve,depthWrite:!1}),this.shaft=new Tt(new tn(1,.16),this.mat),this.shaft.rotation.x=-Math.PI/2;const e=new Lu;e.moveTo(0,-.32),e.lineTo(0,.32),e.lineTo(Eh,0),e.closePath(),this.head=new Tt(new Lc(e),this.mat),this.head.rotation.x=-Math.PI/2,this.group.add(this.shaft,this.head),this.group.position.y=.03,this.group.visible=!1,t.add(this.group)}update(t,e,n=.5,s=13434675){if(!t||!e){this.group.visible=!1;return}const r=e.x-t.x,o=e.z-t.z;if(Math.hypot(r,o)<.01){this.group.visible=!1;return}const c=1.3+n*2.4-Eh;this.shaft.scale.x=c,this.shaft.position.x=c/2,this.head.position.x=c,this.group.position.set(t.x,.03,t.z),this.group.rotation.y=Math.atan2(-o,r),this.mat.color.set(s),this.group.visible=!0}}function ax(){const i=document.createElement("canvas");i.width=64,i.height=64;const t=i.getContext("2d"),e=t.createRadialGradient(32,32,0,32,32,32);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.35,"rgba(255,255,255,0.7)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),new Xs(i)}function cx(){const i=document.createElement("canvas");i.width=16,i.height=16;const t=i.getContext("2d");return t.fillStyle="#fff",t.fillRect(2,4,12,8),new Xs(i)}const Th=[13434675,16766720,3991712,2602984,15883418,16777215],lx=260;class hx{constructor(t){R(this,"particles",[]);R(this,"glowTex",ax());R(this,"rectTex",cx());this.scene=t}spawn(t,e,n,s,r,o,a,c=0){if(this.particles.length>=lx)return;const l=new jr({map:n?this.glowTex:this.rectTex,color:e,transparent:!0,depthWrite:!1,blending:n?Is:vi,rotation:Math.random()*Math.PI}),h=new qa(l);h.position.set(t.x,t.y,t.z),h.scale.setScalar(o),this.scene.add(h),this.particles.push({sprite:h,vx:s.x,vy:s.y,vz:s.z,life:r,maxLife:r,gravity:a,size:o,spin:c})}burst(t,e,n,s,r=.35){for(let o=0;o<n;o++){const a=Math.random()*Math.PI*2,c=Math.random()*Math.PI,l=s*(.35+Math.random()*.65);this.spawn(t,e,!0,{x:Math.sin(c)*Math.cos(a)*l,y:Math.abs(Math.cos(c))*l*.8+1,z:Math.sin(c)*Math.sin(a)*l},.3+Math.random()*.25,r*(.6+Math.random()*.8),6)}}dust(t,e=7){for(let n=0;n<e;n++){const s=Math.random()*Math.PI*2,r=1+Math.random()*2;this.spawn({x:t.x,y:.05,z:t.z},10469631,!0,{x:Math.cos(s)*r,y:.6+Math.random()*1.2,z:Math.sin(s)*r},.35+Math.random()*.2,.22+Math.random()*.18,2.2)}}confetti(t,e=60){for(let n=0;n<e;n++){const s=Math.random()*Math.PI*2,r=2.5+Math.random()*5;this.spawn(t,Th[Math.floor(Math.random()*Th.length)],!1,{x:Math.cos(s)*r*.7,y:3.5+Math.random()*4,z:Math.sin(s)*r*.7},1.4+Math.random()*.9,.16+Math.random()*.12,7,(Math.random()*2-1)*6)}}update(t){for(let e=this.particles.length-1;e>=0;e--){const n=this.particles[e];if(n.life-=t,n.life<=0){this.scene.remove(n.sprite),n.sprite.material.dispose(),this.particles.splice(e,1);continue}n.vy-=n.gravity*t;const s=n.spin!==0?Math.max(0,1-1.6*t):1;n.vx*=s,n.vz*=s,n.spin!==0&&n.vy<-2.2&&(n.vy=-2.2),n.sprite.position.x+=n.vx*t,n.sprite.position.y+=n.vy*t,n.sprite.position.z+=n.vz*t,n.sprite.position.y<.02&&(n.sprite.position.y=.02);const r=n.life/n.maxLife;n.sprite.material.opacity=Math.min(1,r*1.6),n.sprite.material.rotation+=n.spin*t,n.sprite.scale.setScalar(n.size*(n.spin!==0?1:.4+r*.6))}}}class Ch{constructor(t,e={}){R(this,"group",new Ue);R(this,"ringMat");R(this,"dotMat");R(this,"color",new Vt);R(this,"fixedColor");R(this,"baseScale");R(this,"t",0);this.fixedColor=e.color!==void 0?new Vt(e.color):null,this.baseScale=e.scale??1;const n=e.opacity??.95;this.ringMat=new hn({transparent:!0,opacity:n,side:Ve,depthWrite:!1}),this.dotMat=new hn({transparent:!0,opacity:n*.55,depthWrite:!1});const s=new Tt(new uo(.3,.44,40),this.ringMat),r=new Tt(new ss(.13,24),this.dotMat);this.group.add(s,r),this.group.rotation.x=-Math.PI/2,this.group.position.y=.02,this.group.visible=!1,t.add(this.group)}update(t,e,n){if(!e){this.group.visible=!1;return}this.t+=t,this.group.visible=!0,this.group.position.set(e.x,.02,e.z),this.group.scale.setScalar(this.baseScale*(1+.12*Math.sin(this.t*7))),n!==void 0?this.color.set(n):this.fixedColor?this.color.copy(this.fixedColor):this.color.setHSL(.33*(1-e.power),.95,.55),this.ringMat.color.copy(this.color),this.dotMat.color.copy(this.color)}}const Ah=300;class ux{constructor(t){R(this,"line");R(this,"positions");R(this,"material");this.positions=new Float32Array(Ah*3);const e=new ge;e.setAttribute("position",new Ge(this.positions,3)),e.setDrawRange(0,0),this.material=new Ac({color:13434675,transparent:!0,opacity:.85}),this.line=new Tu(e,this.material),this.line.frustumCulled=!1,this.line.visible=!1,t.add(this.line)}update(t,e=13434675){if(!t||t.length<2){this.line.visible=!1,this.line.geometry.setDrawRange(0,0);return}const n=Math.min(t.length,Ah);for(let r=0;r<n;r++)this.positions[r*3]=t[r].x,this.positions[r*3+1]=Math.max(t[r].y,.03),this.positions[r*3+2]=t[r].z;const s=this.line.geometry;s.attributes.position.needsUpdate=!0,s.setDrawRange(0,n),this.material.color.set(e),this.line.visible=!0}}const an=.05,fx=.012;function mo(i,t,e){const n=document.createElement("canvas");n.width=i,n.height=t;const s=n.getContext("2d");e(s);const r=new Xs(n);return r.colorSpace=De,r}function Xn(i,t,e,n,s){const r=new tn(n,s),o=new We({color:15922943,roughness:.8}),a=new Tt(r,o);a.rotation.x=-Math.PI/2,a.position.set(t,fx,e),a.receiveShadow=!0,i.add(a)}function dx(i){const t=new Ue,e=new Tt(new tn(90,70),new We({color:858160,roughness:1}));e.rotation.x=-Math.PI/2,e.position.y=-.02,e.receiveShadow=!0,t.add(e);const n=new Tt(new tn(26,38),new We({color:1327503,roughness:.92}));n.rotation.x=-Math.PI/2,n.position.y=0,n.receiveShadow=!0,t.add(n);const s=new Tt(new tn(Wt.HALF_DW*2+.6,Wt.LENGTH+.6),new We({color:2450895,roughness:.9}));s.rotation.x=-Math.PI/2,s.position.y=.006,s.receiveShadow=!0,t.add(s);const r=Wt.HALF_L,o=Wt.HALF_SW,a=Wt.HALF_DW,c=Wt.SERVICE_LINE;Xn(t,0,r,a*2+an,an*1.6),Xn(t,0,-r,a*2+an,an*1.6);for(const l of[-a,-o,o,a])Xn(t,l,0,an,r*2+an);Xn(t,0,c,o*2,an),Xn(t,0,-c,o*2,an),Xn(t,0,0,an,c*2),Xn(t,0,r-.2,an,.4),Xn(t,0,-11.685,an,.4),i.add(t)}function px(i){const t=new Ue,e=new pn(.045,.045,1.07,10),n=new We({color:1053720,roughness:.5,metalness:.6});for(const a of[-5.02,Wt.NET_POST_X]){const c=new Tt(e,n);c.position.set(a,1.07/2,0),c.castShadow=!0,t.add(c)}const s=mo(64,64,a=>{a.clearRect(0,0,64,64),a.strokeStyle="rgba(228,236,248,0.85)",a.lineWidth=1.6;for(let c=0;c<=64;c+=8)a.beginPath(),a.moveTo(c,0),a.lineTo(c,64),a.stroke(),a.beginPath(),a.moveTo(0,c),a.lineTo(64,c),a.stroke()});s.wrapS=Ds,s.wrapT=Ds,s.repeat.set(46,5);const r=new Tt(new tn(Wt.NET_POST_X*2,Wt.NET_HEIGHT),new We({map:s,transparent:!0,side:Ve,roughness:.9,alphaTest:.15}));r.position.set(0,Wt.NET_HEIGHT/2,0),t.add(r);const o=new Tt(new Qe(Wt.NET_POST_X*2,.07,.02),new We({color:16119802,roughness:.7}));o.position.set(0,Wt.NET_HEIGHT-.035,0),o.castShadow=!0,t.add(o),i.add(t)}function mx(){return mo(512,192,i=>{i.fillStyle="#0c1226",i.fillRect(0,0,512,192);for(let t=0;t<8;t++){const e=12+t*22;i.fillStyle="rgba(255,255,255,0.05)",i.fillRect(0,e+14,512,2);for(let n=0;n<60;n++){if(Math.random()<.25)continue;const s=4+n*8.5+Math.random()*3,r=Math.floor(Math.random()*360),o=40+Math.random()*35;i.fillStyle=`hsl(${r} 35% ${o}%)`,i.beginPath(),i.arc(s,e+Math.random()*4,2.6,0,Math.PI*2),i.fill()}}})}function gx(i){const t=mx(),e=new We({map:t,roughness:1,emissive:2239039,emissiveIntensity:.35,emissiveMap:t}),n=new We({color:659234,roughness:1}),s=l=>{const h=new Ue,u=new Tt(new tn(l,9),e);u.rotation.x=-Math.PI/2+1.05,u.position.y=3.4,h.add(u);const f=new Tt(new Qe(l,1.1,.4),n);return f.position.set(0,.55,4.1),h.add(f),h},r=s(46);r.position.set(-16.5,0,0),r.rotation.y=-Math.PI/2,i.add(r);const o=s(46);o.position.set(16.5,0,0),o.rotation.y=Math.PI/2,i.add(o);const a=s(38);a.position.set(0,0,-22.5),i.add(a);const c=s(38);c.position.set(0,0,22.5),c.rotation.y=Math.PI,i.add(c)}function _x(i){const t=mo(1024,64,l=>{l.fillStyle="#0f2a5e",l.fillRect(0,0,1024,64),l.fillStyle="#ccff33",l.font="italic 900 34px system-ui, sans-serif",l.textBaseline="middle";for(let h=40;h<1024;h+=340)l.fillText("LUCKY SMASH",h,34)}),e=new We({map:t,roughness:.8}),n=new We({color:529971,roughness:.9}),s=l=>{const h=new Tt(new Qe(l,.9,.12),n.clone()),u=new Tt(new tn(l,.9),e);return u.position.z=.062,h.add(u),h.position.y=.45,h.castShadow=!0,h},r=s(24);r.position.set(0,.45,-17.2),i.add(r);const o=s(24);o.position.set(0,.45,17.2),o.rotation.y=Math.PI,i.add(o);const a=s(32);a.position.set(-12.6,.45,0),a.rotation.y=Math.PI/2,i.add(a);const c=s(32);c.position.set(12.6,.45,0),c.rotation.y=-Math.PI/2,i.add(c)}function vx(i){const t=new We({color:2305087,roughness:.6,metalness:.5}),e=new hn({color:15988735});for(const[n,s]of[[-14,-19],[14,-19],[-14,19],[14,19]]){const r=new Tt(new pn(.16,.22,13,8),t);r.position.set(n,6.5,s),i.add(r);const o=new Tt(new Qe(2.6,1.2,.4),e);o.position.set(n,13.2,s),o.lookAt(0,0,0),i.add(o)}}function xx(i){const e=new Float32Array(780);for(let r=0;r<260;r++){const o=Math.random()*Math.PI*2,a=Math.random()*Math.PI*.42,c=95;e[r*3]=Math.sin(a)*Math.cos(o)*c,e[r*3+1]=Math.cos(a)*c*.6+8,e[r*3+2]=Math.sin(a)*Math.sin(o)*c}const n=new ge;n.setAttribute("position",new Ge(e,3));const s=new rv(n,new Cu({color:12571903,size:.45,transparent:!0,opacity:.85,sizeAttenuation:!0}));i.add(s)}function yx(i){const t=mo(16,256,n=>{const s=n.createLinearGradient(0,0,0,256);s.addColorStop(0,"#040817"),s.addColorStop(.55,"#0a1330"),s.addColorStop(.8,"#14264f"),s.addColorStop(1,"#1d3563"),n.fillStyle=s,n.fillRect(0,0,16,256)}),e=new Tt(new qn(130,24,16),new hn({map:t,side:Ne,fog:!1}));i.add(e)}function Sx(){const i=new iv;i.fog=new Cc(660006,45,120),yx(i),dx(i),px(i),gx(i),_x(i),vx(i),xx(i);const t=new Ov(9679592,659230,.55);i.add(t);const e=new ph(16774109,2.4);e.position.set(12,20,9),e.castShadow=!0,e.shadow.mapSize.set(2048,2048),e.shadow.camera.left=-18,e.shadow.camera.right=18,e.shadow.camera.top=20,e.shadow.camera.bottom=-20,e.shadow.camera.near=5,e.shadow.camera.far=55,e.shadow.bias=-5e-4,i.add(e);const n=new ph(12571903,.8);return n.position.set(-13,16,-8),i.add(n),i}const Rr=(i,t,e)=>Math.min(e,Math.max(t,i));class Dc{constructor(t){R(this,"opts");R(this,"playerIdx");R(this,"s");R(this,"renderer");R(this,"scene");R(this,"camera");R(this,"camPos",new L);R(this,"views");R(this,"ballView");R(this,"landView");R(this,"returnAimView");R(this,"trajectoryView");R(this,"arrowView");R(this,"fxView");R(this,"shake",0);R(this,"landTarget",null);R(this,"landVKey","");R(this,"landTimer",0);R(this,"controls");R(this,"hud",new nx);R(this,"clock",new zv);R(this,"sim",null);R(this,"ai",null);R(this,"matchOverFired",!1);R(this,"localBall",new fo);R(this,"clientPhase","between");R(this,"p0Target",[0,0,0]);R(this,"p1Target",[0,0,0]);R(this,"lastScore",null);R(this,"meX",0);R(this,"meZ",0);R(this,"mySwing",0);R(this,"lastResetSeq",0);R(this,"lastFx",{hit:0,smash:0,bounce:0,net:0,point:0,fault:0});R(this,"lastMsgSeq",0);R(this,"lastScoreKey","");R(this,"resultShown",!1);R(this,"serveHintShown",!1);R(this,"sendTimer",0);R(this,"onResize",()=>{this.camera.aspect=window.innerWidth/window.innerHeight,this.applyFov(),this.renderer.setSize(window.innerWidth,window.innerHeight)});this.opts=t,this.playerIdx=t.playerIdx,this.s=this.playerIdx===1?-1:1,this.playerIdx!==null&&(this.meZ=this.s*(Wt.HALF_L+1)),t.authority&&(this.sim=new Yv(Math.random()<.5?0:1,t.gamesToWin),t.practice&&(this.ai=new Jv(t.aiLevel))),this.renderer=new nv({antialias:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Xh,this.renderer.outputColorSpace=De,this.renderer.toneMapping=qh,this.renderer.toneMappingExposure=1.15,document.getElementById("app").appendChild(this.renderer.domElement),this.scene=Sx();const e=this.playerIdx??0,n=new bh(this.scene,e===0?Sh:Mh,!0,0,Wt.HALF_L+1),s=new bh(this.scene,e===1?Sh:Mh,!1,0,-12.885);this.views=[n,s],this.ballView=new sx(this.scene),this.landView=new Ch(this.scene,{color:4891647,scale:.75,opacity:.8}),this.returnAimView=new Ch(this.scene,{color:13434675,scale:.6,opacity:.7}),this.trajectoryView=new ux(this.scene),this.arrowView=new ox(this.scene),this.fxView=new hx(this.scene),this.camera=new Je(52,window.innerWidth/window.innerHeight,.1,260),this.applyFov(),this.playerIdx!==null?(this.camPos.set(0,8,this.s*(Wt.HALF_L+9.6)),this.camera.position.copy(this.camPos),this.camera.lookAt(0,0,-this.s*1)):(this.camPos.set(-14.5,10,0),this.camera.position.copy(this.camPos),this.camera.lookAt(2.5,0,0)),this.playerIdx!==null?(this.controls=new ex,this.controls.onShot=c=>this.swing(c)):this.controls=null;const r=this.playerIdx??0,o=t.names[r],a=t.names[1-r];this.hud.show(o,a,this.playerIdx===null),window.addEventListener("resize",this.onResize),this.renderer.setAnimationLoop(()=>this.frame())}applyFov(){this.camera.fov=this.camera.aspect<1?66:52,this.camera.updateProjectionMatrix()}swing(t){if(this.playerIdx===null)return;He.unlock();const e=this.sim?this.sim.ball.p.x:this.localBall.p.x;this.mySwing=(e-this.meX)*this.s>=0?1:-1,this.sim?this.sim.trySwing(this.playerIdx,{kind:t.kind,dirX:t.dirX,dirY:t.dirY,power:t.power}):this.opts.net&&this.opts.net.send({t:"swing",kind:t.kind,dx:t.dirX,dy:t.dirY,pw:t.power})}applyRemoteInput(t,e){this.sim&&(e.t==="pos"?(this.sim.players[t].x=e.p[0],this.sim.players[t].z=e.p[1],this.sim.players[t].swing=e.sw):e.t==="swing"&&this.sim.trySwing(t,{kind:e.kind,dirX:e.dx,dirY:e.dy,power:e.pw}))}applySnapshot(t){if(this.sim)return;if(this.clientPhase=t.ph,this.p0Target=t.hp,this.p1Target=t.cp,this.playerIdx!==null&&t.reset!==this.lastResetSeq){this.lastResetSeq=t.reset;const c=this.playerIdx===0?t.hp:t.cp;this.meX=c[0],this.meZ=c[1],this.views[this.playerIdx].update(0,this.meX,this.meZ,0,!0)}const[e,n,s,r,o,a]=t.b;if(t.ba&&t.ph==="rally"){const c=Math.hypot(this.localBall.p.x-e,this.localBall.p.y-n,this.localBall.p.z-s);!this.localBall.active||c>.7?this.localBall.set({x:e,y:n,z:s},{x:r,y:o,z:a}):(this.localBall.p.x+=(e-this.localBall.p.x)*.35,this.localBall.p.y+=(n-this.localBall.p.y)*.35,this.localBall.p.z+=(s-this.localBall.p.z)*.35,this.localBall.v={x:r,y:o,z:a})}else this.localBall.hold(e,n,s);this.consumeShared(t.sc,t.ph,t.msg,t.fx,!1)}frame(){const t=Math.min(this.clock.getDelta(),.05);this.moveSelf(t),this.mySwing=Math.sign(this.mySwing)*Math.max(0,Math.abs(this.mySwing)-t/Ye.SWING_TIME),this.sim?this.frameAuthority(t):this.frameClient(t),this.updateRallyMarkers(t),this.fxView.update(t),this.frameCamera(t),this.renderer.render(this.scene,this.camera)}addShake(t){this.shake=Math.min(.8,this.shake+t)}updateRallyMarkers(t){var h;const e=this.sim?this.sim.ball:this.localBall,n=this.sim?this.sim.phase:this.clientPhase,s=n==="rally"&&e.active;if(s){const u=`${e.v.x.toFixed(1)},${e.v.y.toFixed(1)},${e.v.z.toFixed(1)}`;this.landTimer-=t,(u!==this.landVKey||this.landTimer<=0)&&(this.landVKey=u,this.landTimer=.25,this.landTarget=Fu(e.p,e.v))}else this.landTarget=null,this.landVKey="";this.landView.update(t,this.landTarget?{...this.landTarget,power:0}:null);let r=null,o,a=null;const c=(h=this.controls)==null?void 0:h.live,l=this.sim?this.sim.score:this.lastScore;if(this.playerIdx!==null&&(c!=null&&c.active)&&l){const u={kind:"drive",dirX:c.dirX,dirY:c.dirY,power:c.power};let f=null,d=null,g=!1;if(s){if(Math.sign(e.p.z)===this.s||e.v.z*this.s>0){f=Bu(e.p,this.s,u),d={x:e.p.x,y:Math.max(e.p.y,.45),z:e.p.z};const m=Wt.LINE_MARGIN;g=Math.abs(f.tx)>Wt.HALF_SW+m||Math.abs(f.tz)>Wt.HALF_L+m}}else if(n==="await-serve"&&l.server===this.playerIdx){const _=ku({x:this.meX,z:this.meZ},this.s,u);f={..._,smash:!1},d={x:this.meX,y:2.75,z:this.meZ},g=!qv(this.playerIdx,l.points,_.tx,_.tz)}if(f&&d){const _=Ka(d,f.tx,f.tz,f.t,f.margin);a=Vv(d,_),r={x:f.tx,z:f.tz,power:0},o=g?16732240:void 0,this.arrowView.update(d,{x:f.tx,z:f.tz},c.power,o??13434675)}else this.arrowView.update(null)}else this.arrowView.update(null);this.returnAimView.update(t,r,o),this.trajectoryView.update(a,o??13434675),this.playerIdx!==null&&this.controls&&this.hud.setFlickPower(this.controls.live.active?this.controls.live.power:null)}moveSelf(t){if(this.playerIdx===null||!this.controls)return;const e=this.controls.state;this.meX+=e.x*this.s*Ye.SPEED*t,this.meZ+=-e.y*this.s*Ye.SPEED*t,this.meX=Rr(this.meX,-7,Ye.BOUND_X),this.s>0?this.meZ=Rr(this.meZ,Ye.BOUND_Z_NEAR,Ye.BOUND_Z_FAR):this.meZ=Rr(this.meZ,-16,-1.2);const n=this.sim?this.sim.phase:this.clientPhase,s=this.sim?this.sim.score:this.lastScore;if(n==="await-serve"&&s&&s.server===this.playerIdx){const r=po(this.playerIdx,s.points);this.meX=Rr(this.meX,r.x0,r.x1),this.meZ=r.z}}frameAuthority(t){var s,r,o;const e=this.sim;if(this.playerIdx!==null){const a=e.players[this.playerIdx];a.x=this.meX,a.z=this.meZ,Math.abs(this.mySwing)>Math.abs(a.swing)&&(a.swing=this.mySwing)}(s=this.ai)==null||s.update(t,e),e.update(t),this.playerIdx!==null&&e.resetSeq!==this.lastResetSeq&&(this.lastResetSeq=e.resetSeq,this.meX=e.players[this.playerIdx].x,this.meZ=e.players[this.playerIdx].z,this.views[this.playerIdx].update(0,this.meX,this.meZ,0,!0)),this.opts.net&&(this.sendTimer+=t,this.sendTimer>=gh.INTERVAL&&(this.sendTimer=0,this.opts.net.broadcast(this.buildSnapshot(e))));const n=e.ball;this.consumeShared(e.score,e.phase,[e.msgSeq,e.msgText],e.fx,!0,n.p.x,n.p.z),e.phase==="over"&&!this.matchOverFired&&e.score.winner!==null&&(this.matchOverFired=!0,(o=(r=this.opts).onMatchOver)==null||o.call(r,e.score.winner,e.score));for(const a of[0,1]){const c=a===this.playerIdx||this.opts.practice,l=e.players[a],h=a===this.playerIdx?this.mySwingOr(l.swing):l.swing;this.views[a].update(t,l.x,l.z,h,c)}this.ballView.update(t,n.p.x,n.p.y,n.p.z,n.active)}mySwingOr(t){return Math.abs(this.mySwing)>Math.abs(t)?this.mySwing:t}frameClient(t){if(this.clientPhase==="rally"){const n=this.localBall.step(t);n.bounce&&(He.bounce(),this.ballView.bounceAt(n.bounce.x,n.bounce.z),this.fxView.dust({x:n.bounce.x,y:0,z:n.bounce.z}))}this.playerIdx!==null&&this.opts.net&&(this.sendTimer+=t,this.sendTimer>=gh.INTERVAL&&(this.sendTimer=0,this.opts.net.send({t:"pos",p:[this.meX,this.meZ],sw:this.mySwing})));for(const n of[0,1])if(n===this.playerIdx)this.views[n].update(t,this.meX,this.meZ,this.mySwing,!0);else{const s=n===0?this.p0Target:this.p1Target;this.views[n].update(t,s[0],s[1],s[2])}const e=this.localBall;this.ballView.update(t,e.p.x,e.p.y,e.p.z,e.active)}consumeShared(t,e,n,s,r,o=0,a=0){const c=this.playerIdx??0;this.lastScore=t;const l=`${t.points[0]},${t.points[1]},${t.games[0]},${t.games[1]},${t.server}`;l!==this.lastScoreKey&&(this.lastScoreKey=l,this.hud.setScore(t,c)),n[0]!==this.lastMsgSeq&&(this.lastMsgSeq=n[0],n[1]&&this.hud.flash(n[1]));const h=this.sim?this.sim.ball.p:this.localBall.p;s.smash>this.lastFx.smash?(He.smash(),this.fxView.burst(h,16757568,26,10,.5),this.addShake(.5)):s.hit>this.lastFx.hit&&(He.hit(),this.fxView.burst(h,16777215,9,5,.28)),s.net>this.lastFx.net&&(He.net(),this.fxView.burst(h,10465996,8,3,.25),this.addShake(.15)),s.point>this.lastFx.point&&(He.point(),this.fxView.confetti({x:0,y:4,z:0},70),this.addShake(.2)),s.fault>this.lastFx.fault&&(He.fault(),this.fxView.burst(h,16739179,8,3,.3)),r&&s.bounce>this.lastFx.bounce&&(He.bounce(),this.ballView.bounceAt(o,a),this.fxView.dust({x:o,y:0,z:a})),this.lastFx={...s};const u=e==="await-serve"&&this.playerIdx!==null&&t.server===this.playerIdx;if(u!==this.serveHintShown&&(this.serveHintShown=u,this.hud.setServeHint(u)),this.opts.practice)if(e==="over"&&!this.resultShown){this.resultShown=!0;const f=t.winner===c,d=1-c;this.hud.showResult(f,`ゲームカウント ${t.games[c]} - ${t.games[d]}`)}else e!=="over"&&this.resultShown&&(this.resultShown=!1,this.hud.hideResult())}buildSnapshot(t){const e=t.ball;return{t:"s",b:[e.p.x,e.p.y,e.p.z,e.v.x,e.v.y,e.v.z],ba:e.active,hp:[t.players[0].x,t.players[0].z,t.players[0].swing],cp:[t.players[1].x,t.players[1].z,t.players[1].swing],ph:t.phase,sc:{points:[t.score.points[0],t.score.points[1]],games:[t.score.games[0],t.score.games[1]],server:t.score.server,finished:t.score.finished,winner:t.score.winner},msg:[t.msgSeq,t.msgText],fx:{...t.fx},reset:t.resetSeq}}frameCamera(t){if(this.playerIdx!==null){const e=Math.min(1,t*3.5),n=this.meX*.3;this.camPos.x+=(n-this.camPos.x)*e,this.camera.position.copy(this.camPos),this.camera.lookAt(this.camPos.x*.4,0,-this.s*1)}else this.camera.position.copy(this.camPos),this.camera.lookAt(2.5,0,0);if(this.shake>0){this.shake=Math.max(0,this.shake-t*1.7);const e=this.shake*.16;this.camera.position.x+=(Math.random()*2-1)*e,this.camera.position.y+=(Math.random()*2-1)*e}}authScore(){return this.sim?this.sim.score:null}rematch(){this.sim&&this.sim.phase==="over"&&(this.matchOverFired=!1,this.sim.restart())}dispose(){var t;this.renderer.setAnimationLoop(null),window.removeEventListener("resize",this.onResize),(t=this.controls)==null||t.dispose(),this.hud.hide(),this.renderer.domElement.remove(),this.renderer.dispose()}}function Mx(i=2,t=Hv){const e={1:"CPU よわい",2:"CPU ふつう",3:"CPU つよい"};return new Dc({authority:!0,playerIdx:0,names:["あなた",e[i]],gamesToWin:t,practice:!0,aiLevel:i,net:null})}const wh=300,zu="touch-smash-party-v2",Rh="touch-smash-party-v1",Hu="touch-smash-name",Vu="みんな";function ei(){try{const i=localStorage.getItem(zu);if(i)return JSON.parse(i);const t=localStorage.getItem(Rh);if(t){const e=JSON.parse(t),n={groups:{[Vu]:e.players}};return $s(n),localStorage.removeItem(Rh),n}}catch{}return{groups:{}}}function $s(i){try{localStorage.setItem(zu,JSON.stringify(i))}catch{}}function bx(){return Object.keys(ei().groups).sort()}function Ex(i,t){var n;const e=(n=ei().groups[i])==null?void 0:n[t];return e?{...e}:{pts:0,wins:0,losses:0}}const na=100;function Tx(i,t){var s;const e=ei(),n=(s=e.groups)[i]??(s[i]={});return n[t]||(n[t]={pts:na,wins:0,losses:0},Uc(e,i,{t:Date.now(),name:t,d:na,why:"参加ボーナス",after:na}),$s(e)),{...n[t]}}function Gu(i,t,e,n){var c;const s=ei(),r=(c=s.groups)[i]??(c[i]={}),o=r[t]??(r[t]={pts:0,wins:0,losses:0}),a=o.pts;return n(o),o.pts=Math.max(0,Math.round(o.pts)),o.pts!==a&&Uc(s,i,{t:Date.now(),name:t,d:o.pts-a,why:e,after:o.pts}),$s(s),{...o}}function Uc(i,t,e){const n=i.logs??(i.logs={}),s=n[t]??(n[t]=[]);s.unshift(e),s.length>wh&&(s.length=wh)}function Cx(i,t,e,n,s=n?"勝利":"敗北"){return Gu(i,t,s,r=>{r.pts+=e,n?r.wins+=1:r.losses+=1})}function Ax(i,t,e,n="手動調整"){return Gu(i,t,n,s=>{s.pts+=e})}function wx(i,t=60){var e;return(((e=ei().logs)==null?void 0:e[i])??[]).slice(0,t)}function Rx(i){const t=ei().groups[i];return t?Object.entries(t).map(([e,n])=>({name:e,...n})).sort((e,n)=>n.pts-e.pts):[]}function Px(i,t){const e=ei(),n=e.groups[i];n&&(delete n[t],$s(e))}function Lx(i,t){const e=ei(),n=e.groups[i];if(n){for(const s of t)n[s]&&n[s].pts!==0&&(Uc(e,i,{t:Date.now(),name:s,d:-n[s].pts,why:"リセット",after:0}),n[s].pts=0);$s(e)}}const Wu="lucky-smash-ledgers";function Xu(){try{const i=localStorage.getItem(Wu);return i?JSON.parse(i):[]}catch{return[]}}function Ix(i){try{const t=Xu().filter(e=>e.id!==i.id);t.unshift({id:i.id,name:i.name}),localStorage.setItem(Wu,JSON.stringify(t.slice(0,30)))}catch{}}function Dx(){return localStorage.getItem(Hu)??""}function Ux(i){try{localStorage.setItem(Hu,i)}catch{}}const Nc="local:";function Fc(i){return!i.id.startsWith(Nc)}class $u{constructor(t){R(this,"ref");R(this,"group");this.group=t,this.ref={id:Nc+t,name:t}}ensureMember(t){return Promise.resolve(Tx(this.group,t))}getStats(t){return Promise.resolve(Ex(this.group,t))}addResult(t,e,n,s){return Promise.resolve(Cx(this.group,t,e,n,s))}adjustPoints(t,e,n){return Promise.resolve(Ax(this.group,t,e,n))}resetPoints(t){return Lx(this.group,t),Promise.resolve()}listMembers(){return Promise.resolve(Rx(this.group))}listHistory(t){return Promise.resolve(wx(this.group,t))}removeMember(t){return Px(this.group,t),Promise.resolve()}}async function qs(i){if(Fc(i)&&zs())try{return await(await mc(()=>import("./cloud-CN4s79Nz.js"),__vite__mapDeps([0,1]),import.meta.url)).openCloudLedger(i)}catch{}return new $u(i.name)}async function Nx(i){if(zs())try{return await(await mc(()=>import("./cloud-CN4s79Nz.js"),__vite__mapDeps([0,1]),import.meta.url)).createCloudLedger(i)}catch{}return new $u(i)}function Fx(){const i=zs()?Xu():[],t=bx().map(e=>({id:Nc+e,name:e}));return[...i,...t]}class Ox{constructor(){this.encoder=new TextEncoder,this._pieces=[],this._parts=[]}append_buffer(t){this.flush(),this._parts.push(t)}append(t){this._pieces.push(t)}flush(){if(this._pieces.length>0){const t=new Uint8Array(this._pieces);this._parts.push(t),this._pieces=[]}}toArrayBuffer(){const t=[];for(const e of this._parts)t.push(e);return Bx(t).buffer}}function Bx(i){let t=0;for(const s of i)t+=s.byteLength;const e=new Uint8Array(t);let n=0;for(const s of i){const r=new Uint8Array(s.buffer,s.byteOffset,s.byteLength);e.set(r,n),n+=s.byteLength}return e}function qu(i){return new kx(i).unpack()}function Yu(i){const t=new zx,e=t.pack(i);return e instanceof Promise?e.then(()=>t.getBuffer()):t.getBuffer()}class kx{constructor(t){this.index=0,this.dataBuffer=t,this.dataView=new Uint8Array(this.dataBuffer),this.length=this.dataBuffer.byteLength}unpack(){const t=this.unpack_uint8();if(t<128)return t;if((t^224)<32)return(t^224)-32;let e;if((e=t^160)<=15)return this.unpack_raw(e);if((e=t^176)<=15)return this.unpack_string(e);if((e=t^144)<=15)return this.unpack_array(e);if((e=t^128)<=15)return this.unpack_map(e);switch(t){case 192:return null;case 193:return;case 194:return!1;case 195:return!0;case 202:return this.unpack_float();case 203:return this.unpack_double();case 204:return this.unpack_uint8();case 205:return this.unpack_uint16();case 206:return this.unpack_uint32();case 207:return this.unpack_uint64();case 208:return this.unpack_int8();case 209:return this.unpack_int16();case 210:return this.unpack_int32();case 211:return this.unpack_int64();case 212:return;case 213:return;case 214:return;case 215:return;case 216:return e=this.unpack_uint16(),this.unpack_string(e);case 217:return e=this.unpack_uint32(),this.unpack_string(e);case 218:return e=this.unpack_uint16(),this.unpack_raw(e);case 219:return e=this.unpack_uint32(),this.unpack_raw(e);case 220:return e=this.unpack_uint16(),this.unpack_array(e);case 221:return e=this.unpack_uint32(),this.unpack_array(e);case 222:return e=this.unpack_uint16(),this.unpack_map(e);case 223:return e=this.unpack_uint32(),this.unpack_map(e)}}unpack_uint8(){const t=this.dataView[this.index]&255;return this.index++,t}unpack_uint16(){const t=this.read(2),e=(t[0]&255)*256+(t[1]&255);return this.index+=2,e}unpack_uint32(){const t=this.read(4),e=((t[0]*256+t[1])*256+t[2])*256+t[3];return this.index+=4,e}unpack_uint64(){const t=this.read(8),e=((((((t[0]*256+t[1])*256+t[2])*256+t[3])*256+t[4])*256+t[5])*256+t[6])*256+t[7];return this.index+=8,e}unpack_int8(){const t=this.unpack_uint8();return t<128?t:t-256}unpack_int16(){const t=this.unpack_uint16();return t<32768?t:t-65536}unpack_int32(){const t=this.unpack_uint32();return t<2**31?t:t-2**32}unpack_int64(){const t=this.unpack_uint64();return t<2**63?t:t-2**64}unpack_raw(t){if(this.length<this.index+t)throw new Error(`BinaryPackFailure: index is out of range ${this.index} ${t} ${this.length}`);const e=this.dataBuffer.slice(this.index,this.index+t);return this.index+=t,e}unpack_string(t){const e=this.read(t);let n=0,s="",r,o;for(;n<t;)r=e[n],r<160?(o=r,n++):(r^192)<32?(o=(r&31)<<6|e[n+1]&63,n+=2):(r^224)<16?(o=(r&15)<<12|(e[n+1]&63)<<6|e[n+2]&63,n+=3):(o=(r&7)<<18|(e[n+1]&63)<<12|(e[n+2]&63)<<6|e[n+3]&63,n+=4),s+=String.fromCodePoint(o);return this.index+=t,s}unpack_array(t){const e=new Array(t);for(let n=0;n<t;n++)e[n]=this.unpack();return e}unpack_map(t){const e={};for(let n=0;n<t;n++){const s=this.unpack();e[s]=this.unpack()}return e}unpack_float(){const t=this.unpack_uint32(),e=t>>31,n=(t>>23&255)-127,s=t&8388607|8388608;return(e===0?1:-1)*s*2**(n-23)}unpack_double(){const t=this.unpack_uint32(),e=this.unpack_uint32(),n=t>>31,s=(t>>20&2047)-1023,o=(t&1048575|1048576)*2**(s-20)+e*2**(s-52);return(n===0?1:-1)*o}read(t){const e=this.index;if(e+t<=this.length)return this.dataView.subarray(e,e+t);throw new Error("BinaryPackFailure: read index out of range")}}class zx{getBuffer(){return this._bufferBuilder.toArrayBuffer()}pack(t){if(typeof t=="string")this.pack_string(t);else if(typeof t=="number")Math.floor(t)===t?this.pack_integer(t):this.pack_double(t);else if(typeof t=="boolean")t===!0?this._bufferBuilder.append(195):t===!1&&this._bufferBuilder.append(194);else if(t===void 0)this._bufferBuilder.append(192);else if(typeof t=="object")if(t===null)this._bufferBuilder.append(192);else{const e=t.constructor;if(t instanceof Array){const n=this.pack_array(t);if(n instanceof Promise)return n.then(()=>this._bufferBuilder.flush())}else if(t instanceof ArrayBuffer)this.pack_bin(new Uint8Array(t));else if("BYTES_PER_ELEMENT"in t){const n=t;this.pack_bin(new Uint8Array(n.buffer,n.byteOffset,n.byteLength))}else if(t instanceof Date)this.pack_string(t.toString());else{if(t instanceof Blob)return t.arrayBuffer().then(n=>{this.pack_bin(new Uint8Array(n)),this._bufferBuilder.flush()});if(e==Object||e.toString().startsWith("class")){const n=this.pack_object(t);if(n instanceof Promise)return n.then(()=>this._bufferBuilder.flush())}else throw new Error(`Type "${e.toString()}" not yet supported`)}}else throw new Error(`Type "${typeof t}" not yet supported`);this._bufferBuilder.flush()}pack_bin(t){const e=t.length;if(e<=15)this.pack_uint8(160+e);else if(e<=65535)this._bufferBuilder.append(218),this.pack_uint16(e);else if(e<=4294967295)this._bufferBuilder.append(219),this.pack_uint32(e);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(t)}pack_string(t){const e=this._textEncoder.encode(t),n=e.length;if(n<=15)this.pack_uint8(176+n);else if(n<=65535)this._bufferBuilder.append(216),this.pack_uint16(n);else if(n<=4294967295)this._bufferBuilder.append(217),this.pack_uint32(n);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(e)}pack_array(t){const e=t.length;if(e<=15)this.pack_uint8(144+e);else if(e<=65535)this._bufferBuilder.append(220),this.pack_uint16(e);else if(e<=4294967295)this._bufferBuilder.append(221),this.pack_uint32(e);else throw new Error("Invalid length");const n=s=>{if(s<e){const r=this.pack(t[s]);return r instanceof Promise?r.then(()=>n(s+1)):n(s+1)}};return n(0)}pack_integer(t){if(t>=-32&&t<=127)this._bufferBuilder.append(t&255);else if(t>=0&&t<=255)this._bufferBuilder.append(204),this.pack_uint8(t);else if(t>=-128&&t<=127)this._bufferBuilder.append(208),this.pack_int8(t);else if(t>=0&&t<=65535)this._bufferBuilder.append(205),this.pack_uint16(t);else if(t>=-32768&&t<=32767)this._bufferBuilder.append(209),this.pack_int16(t);else if(t>=0&&t<=4294967295)this._bufferBuilder.append(206),this.pack_uint32(t);else if(t>=-2147483648&&t<=2147483647)this._bufferBuilder.append(210),this.pack_int32(t);else if(t>=-9223372036854776e3&&t<=9223372036854776e3)this._bufferBuilder.append(211),this.pack_int64(t);else if(t>=0&&t<=18446744073709552e3)this._bufferBuilder.append(207),this.pack_uint64(t);else throw new Error("Invalid integer")}pack_double(t){let e=0;t<0&&(e=1,t=-t);const n=Math.floor(Math.log(t)/Math.LN2),s=t/2**n-1,r=Math.floor(s*2**52),o=2**32,a=e<<31|n+1023<<20|r/o&1048575,c=r%o;this._bufferBuilder.append(203),this.pack_int32(a),this.pack_int32(c)}pack_object(t){const e=Object.keys(t),n=e.length;if(n<=15)this.pack_uint8(128+n);else if(n<=65535)this._bufferBuilder.append(222),this.pack_uint16(n);else if(n<=4294967295)this._bufferBuilder.append(223),this.pack_uint32(n);else throw new Error("Invalid length");const s=r=>{if(r<e.length){const o=e[r];if(t.hasOwnProperty(o)){this.pack(o);const a=this.pack(t[o]);if(a instanceof Promise)return a.then(()=>s(r+1))}return s(r+1)}};return s(0)}pack_uint8(t){this._bufferBuilder.append(t)}pack_uint16(t){this._bufferBuilder.append(t>>8),this._bufferBuilder.append(t&255)}pack_uint32(t){const e=t&4294967295;this._bufferBuilder.append((e&4278190080)>>>24),this._bufferBuilder.append((e&16711680)>>>16),this._bufferBuilder.append((e&65280)>>>8),this._bufferBuilder.append(e&255)}pack_uint64(t){const e=t/4294967296,n=t%2**32;this._bufferBuilder.append((e&4278190080)>>>24),this._bufferBuilder.append((e&16711680)>>>16),this._bufferBuilder.append((e&65280)>>>8),this._bufferBuilder.append(e&255),this._bufferBuilder.append((n&4278190080)>>>24),this._bufferBuilder.append((n&16711680)>>>16),this._bufferBuilder.append((n&65280)>>>8),this._bufferBuilder.append(n&255)}pack_int8(t){this._bufferBuilder.append(t&255)}pack_int16(t){this._bufferBuilder.append((t&65280)>>8),this._bufferBuilder.append(t&255)}pack_int32(t){this._bufferBuilder.append(t>>>24&255),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255)}pack_int64(t){const e=Math.floor(t/4294967296),n=t%2**32;this._bufferBuilder.append((e&4278190080)>>>24),this._bufferBuilder.append((e&16711680)>>>16),this._bufferBuilder.append((e&65280)>>>8),this._bufferBuilder.append(e&255),this._bufferBuilder.append((n&4278190080)>>>24),this._bufferBuilder.append((n&16711680)>>>16),this._bufferBuilder.append((n&65280)>>>8),this._bufferBuilder.append(n&255)}constructor(){this._bufferBuilder=new Ox,this._textEncoder=new TextEncoder}}let ju=!0,Zu=!0;function Es(i,t,e){const n=i.match(t);return n&&n.length>=e&&parseFloat(n[e],10)}function Ei(i,t,e){if(!i.RTCPeerConnection)return;if(!Object.getOwnPropertyDescriptor(EventTarget.prototype,"addEventListener").writable){Oc("Unable to polyfill events");return}const s=i.RTCPeerConnection.prototype,r=s.addEventListener;s.addEventListener=function(a,c){if(a!==t)return r.apply(this,arguments);const l=h=>{const u=e(h);u&&(c.handleEvent?c.handleEvent(u):c(u))};return this._eventMap=this._eventMap||{},this._eventMap[t]||(this._eventMap[t]=new Map),this._eventMap[t].set(c,l),r.apply(this,[a,l])};const o=s.removeEventListener;s.removeEventListener=function(a,c){if(a!==t||!this._eventMap||!this._eventMap[t])return o.apply(this,arguments);if(!this._eventMap[t].has(c))return o.apply(this,arguments);const l=this._eventMap[t].get(c);return this._eventMap[t].delete(c),this._eventMap[t].size===0&&delete this._eventMap[t],Object.keys(this._eventMap).length===0&&delete this._eventMap,o.apply(this,[a,l])},Object.defineProperty(s,"on"+t,{get(){return this["_on"+t]},set(a){this["_on"+t]&&(this.removeEventListener(t,this["_on"+t]),delete this["_on"+t]),a&&this.addEventListener(t,this["_on"+t]=a)},enumerable:!0,configurable:!0})}function Hx(i){return typeof i!="boolean"?new Error("Argument type: "+typeof i+". Please use a boolean."):(ju=i,i?"adapter.js logging disabled":"adapter.js logging enabled")}function Vx(i){return typeof i!="boolean"?new Error("Argument type: "+typeof i+". Please use a boolean."):(Zu=!i,"adapter.js deprecation warnings "+(i?"disabled":"enabled"))}function Oc(){if(typeof window=="object"){if(ju)return;typeof console<"u"&&typeof console.log=="function"&&console.log.apply(console,arguments)}}function Bc(i,t){Zu&&console.warn(i+" is deprecated, please use "+t+" instead.")}function Gx(i){const t={browser:null,version:null};if(typeof i>"u"||!i.navigator||!i.navigator.userAgent)return t.browser="Not a browser.",t;const{navigator:e}=i;if(e.userAgentData&&e.userAgentData.brands){const n=e.userAgentData.brands.find(s=>s.brand==="Chromium");if(n){const s=parseInt(n.version,10);if(s>=90)return{browser:"chrome",version:s}}}if(e.mozGetUserMedia)t.browser="firefox",t.version=parseInt(Es(e.userAgent,/Firefox\/(\d+)\./,1));else if(e.webkitGetUserMedia||i.isSecureContext===!1&&i.webkitRTCPeerConnection)t.browser="chrome",t.version=parseInt(Es(e.userAgent,/Chrom(e|ium)\/(\d+)\./,2))||null;else if(i.RTCPeerConnection&&e.userAgent.match(/AppleWebKit\/(\d+)\./))t.browser="safari",t.version=parseInt(Es(e.userAgent,/AppleWebKit\/(\d+)\./,1)),t.supportsUnifiedPlan=i.RTCRtpTransceiver&&"currentDirection"in i.RTCRtpTransceiver.prototype,t._safariVersion=Es(e.userAgent,/Version\/(\d+(\.?\d+))/,1);else return t.browser="Not a supported browser.",t;return t}function Ph(i){return Object.prototype.toString.call(i)==="[object Object]"}function Ju(i){return Ph(i)?Object.keys(i).reduce(function(t,e){const n=Ph(i[e]),s=n?Ju(i[e]):i[e],r=n&&!Object.keys(s).length;return s===void 0||r?t:Object.assign(t,{[e]:s})},{}):i}function Qa(i,t,e){!t||e.has(t.id)||(e.set(t.id,t),Object.keys(t).forEach(n=>{n.endsWith("Id")?Qa(i,i.get(t[n]),e):n.endsWith("Ids")&&t[n].forEach(s=>{Qa(i,i.get(s),e)})}))}function Lh(i,t,e){const n=e?"outbound-rtp":"inbound-rtp",s=new Map;if(t===null)return s;const r=[];return i.forEach(o=>{o.type==="track"&&o.trackIdentifier===t.id&&r.push(o)}),r.forEach(o=>{i.forEach(a=>{a.type===n&&a.trackId===o.id&&Qa(i,a,s)})}),s}const Ih=Oc;function Ku(i,t){if(t.version>=64)return;const e=i&&i.navigator;if(!e.mediaDevices)return;const n=function(a){if(typeof a!="object"||a.mandatory||a.optional)return a;const c={};return Object.keys(a).forEach(l=>{if(l==="require"||l==="advanced"||l==="mediaSource")return;const h=typeof a[l]=="object"?a[l]:{ideal:a[l]};h.exact!==void 0&&typeof h.exact=="number"&&(h.min=h.max=h.exact);const u=function(f,d){return f?f+d.charAt(0).toUpperCase()+d.slice(1):d==="deviceId"?"sourceId":d};if(h.ideal!==void 0){c.optional=c.optional||[];let f={};typeof h.ideal=="number"?(f[u("min",l)]=h.ideal,c.optional.push(f),f={},f[u("max",l)]=h.ideal,c.optional.push(f)):(f[u("",l)]=h.ideal,c.optional.push(f))}h.exact!==void 0&&typeof h.exact!="number"?(c.mandatory=c.mandatory||{},c.mandatory[u("",l)]=h.exact):["min","max"].forEach(f=>{h[f]!==void 0&&(c.mandatory=c.mandatory||{},c.mandatory[u(f,l)]=h[f])})}),a.advanced&&(c.optional=(c.optional||[]).concat(a.advanced)),c},s=function(a,c){if(t.version>=61)return c(a);if(a=JSON.parse(JSON.stringify(a)),a&&typeof a.audio=="object"){const l=function(h,u,f){u in h&&!(f in h)&&(h[f]=h[u],delete h[u])};a=JSON.parse(JSON.stringify(a)),l(a.audio,"autoGainControl","googAutoGainControl"),l(a.audio,"noiseSuppression","googNoiseSuppression"),a.audio=n(a.audio)}if(a&&typeof a.video=="object"){let l=a.video.facingMode;l=l&&(typeof l=="object"?l:{ideal:l});const h=t.version<66;if(l&&(l.exact==="user"||l.exact==="environment"||l.ideal==="user"||l.ideal==="environment")&&!(e.mediaDevices.getSupportedConstraints&&e.mediaDevices.getSupportedConstraints().facingMode&&!h)){delete a.video.facingMode;let u;if(l.exact==="environment"||l.ideal==="environment"?u=["back","rear"]:(l.exact==="user"||l.ideal==="user")&&(u=["front"]),u)return e.mediaDevices.enumerateDevices().then(f=>{f=f.filter(g=>g.kind==="videoinput");let d=f.find(g=>u.some(_=>g.label.toLowerCase().includes(_)));return!d&&f.length&&u.includes("back")&&(d=f[f.length-1]),d&&(a.video.deviceId=l.exact?{exact:d.deviceId}:{ideal:d.deviceId}),a.video=n(a.video),Ih("chrome: "+JSON.stringify(a)),c(a)})}a.video=n(a.video)}return Ih("chrome: "+JSON.stringify(a)),c(a)},r=function(a){return t.version>=64?a:{name:{PermissionDeniedError:"NotAllowedError",PermissionDismissedError:"NotAllowedError",InvalidStateError:"NotAllowedError",DevicesNotFoundError:"NotFoundError",ConstraintNotSatisfiedError:"OverconstrainedError",TrackStartError:"NotReadableError",MediaDeviceFailedDueToShutdown:"NotAllowedError",MediaDeviceKillSwitchOn:"NotAllowedError",TabCaptureError:"AbortError",ScreenCaptureError:"AbortError",DeviceCaptureError:"AbortError"}[a.name]||a.name,message:a.message,constraint:a.constraint||a.constraintName,toString(){return this.name+(this.message&&": ")+this.message}}},o=function(a,c,l){s(a,h=>{e.webkitGetUserMedia(h,c,u=>{l&&l(r(u))})})};if(e.getUserMedia=o.bind(e),e.mediaDevices.getUserMedia){const a=e.mediaDevices.getUserMedia.bind(e.mediaDevices);e.mediaDevices.getUserMedia=function(c){return s(c,l=>a(l).then(h=>{if(l.audio&&!h.getAudioTracks().length||l.video&&!h.getVideoTracks().length)throw h.getTracks().forEach(u=>{u.stop()}),new DOMException("","NotFoundError");return h},h=>Promise.reject(r(h))))}}}function Qu(i){i.MediaStream=i.MediaStream||i.webkitMediaStream}function tf(i,t){if(!(t.version>102))if(typeof i=="object"&&i.RTCPeerConnection&&!("ontrack"in i.RTCPeerConnection.prototype)){Object.defineProperty(i.RTCPeerConnection.prototype,"ontrack",{get(){return this._ontrack},set(n){this._ontrack&&this.removeEventListener("track",this._ontrack),this.addEventListener("track",this._ontrack=n)},enumerable:!0,configurable:!0});const e=i.RTCPeerConnection.prototype.setRemoteDescription;i.RTCPeerConnection.prototype.setRemoteDescription=function(){return this._ontrackpoly||(this._ontrackpoly=s=>{s.stream.addEventListener("addtrack",r=>{let o;i.RTCPeerConnection.prototype.getReceivers?o=this.getReceivers().find(c=>c.track&&c.track.id===r.track.id):o={track:r.track};const a=new Event("track");a.track=r.track,a.receiver=o,a.transceiver={receiver:o},a.streams=[s.stream],this.dispatchEvent(a)}),s.stream.getTracks().forEach(r=>{let o;i.RTCPeerConnection.prototype.getReceivers?o=this.getReceivers().find(c=>c.track&&c.track.id===r.id):o={track:r};const a=new Event("track");a.track=r,a.receiver=o,a.transceiver={receiver:o},a.streams=[s.stream],this.dispatchEvent(a)})},this.addEventListener("addstream",this._ontrackpoly)),e.apply(this,arguments)}}else Ei(i,"track",e=>(e.transceiver||Object.defineProperty(e,"transceiver",{value:{receiver:e.receiver}}),e))}function ef(i){if(typeof i=="object"&&i.RTCPeerConnection&&!("getSenders"in i.RTCPeerConnection.prototype)&&"createDTMFSender"in i.RTCPeerConnection.prototype){const t=function(s,r){return{track:r,get dtmf(){return this._dtmf===void 0&&(r.kind==="audio"?this._dtmf=s.createDTMFSender(r):this._dtmf=null),this._dtmf},_pc:s}};if(!i.RTCPeerConnection.prototype.getSenders){i.RTCPeerConnection.prototype.getSenders=function(){return this._senders=this._senders||[],this._senders.slice()};const s=i.RTCPeerConnection.prototype.addTrack;i.RTCPeerConnection.prototype.addTrack=function(a,c){let l=s.apply(this,arguments);return l||(l=t(this,a),this._senders.push(l)),l};const r=i.RTCPeerConnection.prototype.removeTrack;i.RTCPeerConnection.prototype.removeTrack=function(a){r.apply(this,arguments);const c=this._senders.indexOf(a);c!==-1&&this._senders.splice(c,1)}}const e=i.RTCPeerConnection.prototype.addStream;i.RTCPeerConnection.prototype.addStream=function(r){this._senders=this._senders||[],e.apply(this,[r]),r.getTracks().forEach(o=>{this._senders.push(t(this,o))})};const n=i.RTCPeerConnection.prototype.removeStream;i.RTCPeerConnection.prototype.removeStream=function(r){this._senders=this._senders||[],n.apply(this,[r]),r.getTracks().forEach(o=>{const a=this._senders.find(c=>c.track===o);a&&this._senders.splice(this._senders.indexOf(a),1)})}}else if(typeof i=="object"&&i.RTCPeerConnection&&"getSenders"in i.RTCPeerConnection.prototype&&"createDTMFSender"in i.RTCPeerConnection.prototype&&i.RTCRtpSender&&!("dtmf"in i.RTCRtpSender.prototype)){const t=i.RTCPeerConnection.prototype.getSenders;i.RTCPeerConnection.prototype.getSenders=function(){const n=t.apply(this,[]);return n.forEach(s=>s._pc=this),n},Object.defineProperty(i.RTCRtpSender.prototype,"dtmf",{get(){return this._dtmf===void 0&&(this.track.kind==="audio"?this._dtmf=this._pc.createDTMFSender(this.track):this._dtmf=null),this._dtmf}})}}function nf(i,t){if(t.version>=67||!(typeof i=="object"&&i.RTCPeerConnection&&i.RTCRtpSender&&i.RTCRtpReceiver))return;if(!("getStats"in i.RTCRtpSender.prototype)){const n=i.RTCPeerConnection.prototype.getSenders;n&&(i.RTCPeerConnection.prototype.getSenders=function(){const o=n.apply(this,[]);return o.forEach(a=>a._pc=this),o});const s=i.RTCPeerConnection.prototype.addTrack;s&&(i.RTCPeerConnection.prototype.addTrack=function(){const o=s.apply(this,arguments);return o._pc=this,o}),i.RTCRtpSender.prototype.getStats=function(){const o=this;return this._pc.getStats().then(a=>Lh(a,o.track,!0))}}if(!("getStats"in i.RTCRtpReceiver.prototype)){const n=i.RTCPeerConnection.prototype.getReceivers;n&&(i.RTCPeerConnection.prototype.getReceivers=function(){const r=n.apply(this,[]);return r.forEach(o=>o._pc=this),r}),Ei(i,"track",s=>(s.receiver._pc=s.srcElement,s)),i.RTCRtpReceiver.prototype.getStats=function(){const r=this;return this._pc.getStats().then(o=>Lh(o,r.track,!1))}}if(!("getStats"in i.RTCRtpSender.prototype&&"getStats"in i.RTCRtpReceiver.prototype))return;const e=i.RTCPeerConnection.prototype.getStats;i.RTCPeerConnection.prototype.getStats=function(){if(arguments.length>0&&arguments[0]instanceof i.MediaStreamTrack){const s=arguments[0];let r,o,a;return this.getSenders().forEach(c=>{c.track===s&&(r?a=!0:r=c)}),this.getReceivers().forEach(c=>(c.track===s&&(o?a=!0:o=c),c.track===s)),a||r&&o?Promise.reject(new DOMException("There are more than one sender or receiver for the track.","InvalidAccessError")):r?r.getStats():o?o.getStats():Promise.reject(new DOMException("There is no sender or receiver for the track.","InvalidAccessError"))}return e.apply(this,arguments)}}function sf(i){i.RTCPeerConnection.prototype.getLocalStreams=function(){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},Object.keys(this._shimmedLocalStreams).map(o=>this._shimmedLocalStreams[o][0])};const t=i.RTCPeerConnection.prototype.addTrack;i.RTCPeerConnection.prototype.addTrack=function(o,a){if(!a)return t.apply(this,arguments);this._shimmedLocalStreams=this._shimmedLocalStreams||{};const c=t.apply(this,arguments);return this._shimmedLocalStreams[a.id]?this._shimmedLocalStreams[a.id].indexOf(c)===-1&&this._shimmedLocalStreams[a.id].push(c):this._shimmedLocalStreams[a.id]=[a,c],c};const e=i.RTCPeerConnection.prototype.addStream;i.RTCPeerConnection.prototype.addStream=function(o){this._shimmedLocalStreams=this._shimmedLocalStreams||{},o.getTracks().forEach(l=>{if(this.getSenders().find(u=>u.track===l))throw new DOMException("Track already exists.","InvalidAccessError")});const a=this.getSenders();e.apply(this,arguments);const c=this.getSenders().filter(l=>a.indexOf(l)===-1);this._shimmedLocalStreams[o.id]=[o].concat(c)};const n=i.RTCPeerConnection.prototype.removeStream;i.RTCPeerConnection.prototype.removeStream=function(o){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},delete this._shimmedLocalStreams[o.id],n.apply(this,arguments)};const s=i.RTCPeerConnection.prototype.removeTrack;i.RTCPeerConnection.prototype.removeTrack=function(o){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},o&&Object.keys(this._shimmedLocalStreams).forEach(a=>{const c=this._shimmedLocalStreams[a].indexOf(o);c!==-1&&this._shimmedLocalStreams[a].splice(c,1),this._shimmedLocalStreams[a].length===1&&delete this._shimmedLocalStreams[a]}),s.apply(this,arguments)}}function rf(i,t){if(!i.RTCPeerConnection)return;if(i.RTCPeerConnection.prototype.addTrack&&t.version>=65)return sf(i);const e=i.RTCPeerConnection.prototype.getLocalStreams;i.RTCPeerConnection.prototype.getLocalStreams=function(){const h=e.apply(this);return this._reverseStreams=this._reverseStreams||{},h.map(u=>this._reverseStreams[u.id])};const n=i.RTCPeerConnection.prototype.addStream;i.RTCPeerConnection.prototype.addStream=function(h){if(this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},h.getTracks().forEach(u=>{if(this.getSenders().find(d=>d.track===u))throw new DOMException("Track already exists.","InvalidAccessError")}),!this._reverseStreams[h.id]){const u=new i.MediaStream(h.getTracks());this._streams[h.id]=u,this._reverseStreams[u.id]=h,h=u}n.apply(this,[h])};const s=i.RTCPeerConnection.prototype.removeStream;i.RTCPeerConnection.prototype.removeStream=function(h){this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},s.apply(this,[this._streams[h.id]||h]),delete this._reverseStreams[this._streams[h.id]?this._streams[h.id].id:h.id],delete this._streams[h.id]},i.RTCPeerConnection.prototype.addTrack=function(h,u){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");const f=[].slice.call(arguments,1);if(f.length!==1||!f[0].getTracks().find(_=>_===h))throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.","NotSupportedError");if(this.getSenders().find(_=>_.track===h))throw new DOMException("Track already exists.","InvalidAccessError");this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{};const g=this._streams[u.id];if(g)g.addTrack(h),Promise.resolve().then(()=>{this.dispatchEvent(new Event("negotiationneeded"))});else{const _=new i.MediaStream([h]);this._streams[u.id]=_,this._reverseStreams[_.id]=u,this.addStream(_)}return this.getSenders().find(_=>_.track===h)};function r(l,h){let u=h.sdp;return Object.keys(l._reverseStreams||[]).forEach(f=>{const d=l._reverseStreams[f],g=l._streams[d.id];u=u.replace(new RegExp(g.id,"g"),d.id)}),new RTCSessionDescription({type:h.type,sdp:u})}function o(l,h){let u=h.sdp;return Object.keys(l._reverseStreams||[]).forEach(f=>{const d=l._reverseStreams[f],g=l._streams[d.id];u=u.replace(new RegExp(d.id,"g"),g.id)}),new RTCSessionDescription({type:h.type,sdp:u})}["createOffer","createAnswer"].forEach(function(l){const h=i.RTCPeerConnection.prototype[l],u={[l](){const f=arguments;return arguments.length&&typeof arguments[0]=="function"?h.apply(this,[g=>{const _=r(this,g);f[0].apply(null,[_])},g=>{f[1]&&f[1].apply(null,g)},arguments[2]]):h.apply(this,arguments).then(g=>r(this,g))}};i.RTCPeerConnection.prototype[l]=u[l]});const a=i.RTCPeerConnection.prototype.setLocalDescription;i.RTCPeerConnection.prototype.setLocalDescription=function(){return!arguments.length||!arguments[0].type?a.apply(this,arguments):(arguments[0]=o(this,arguments[0]),a.apply(this,arguments))};const c=Object.getOwnPropertyDescriptor(i.RTCPeerConnection.prototype,"localDescription");Object.defineProperty(i.RTCPeerConnection.prototype,"localDescription",{get(){const l=c.get.apply(this);return l.type===""?l:r(this,l)}}),i.RTCPeerConnection.prototype.removeTrack=function(h){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");if(!h._pc)throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.","TypeError");if(!(h._pc===this))throw new DOMException("Sender was not created by this connection.","InvalidAccessError");this._streams=this._streams||{};let f;Object.keys(this._streams).forEach(d=>{this._streams[d].getTracks().find(_=>h.track===_)&&(f=this._streams[d])}),f&&(f.getTracks().length===1?this.removeStream(this._reverseStreams[f.id]):f.removeTrack(h.track),this.dispatchEvent(new Event("negotiationneeded")))}}function tc(i,t){!i.RTCPeerConnection&&i.webkitRTCPeerConnection&&(i.RTCPeerConnection=i.webkitRTCPeerConnection),i.RTCPeerConnection&&t.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(e){const n=i.RTCPeerConnection.prototype[e],s={[e](){return arguments[0]=new(e==="addIceCandidate"?i.RTCIceCandidate:i.RTCSessionDescription)(arguments[0]),n.apply(this,arguments)}};i.RTCPeerConnection.prototype[e]=s[e]})}function of(i,t){t.version>102||Ei(i,"negotiationneeded",e=>{const n=e.target;if(!((t.version<72||n.getConfiguration&&n.getConfiguration().sdpSemantics==="plan-b")&&n.signalingState!=="stable"))return e})}const Dh=Object.freeze(Object.defineProperty({__proto__:null,fixNegotiationNeeded:of,shimAddTrackRemoveTrack:rf,shimAddTrackRemoveTrackWithNative:sf,shimGetSendersWithDtmf:ef,shimGetUserMedia:Ku,shimMediaStream:Qu,shimOnTrack:tf,shimPeerConnection:tc,shimSenderReceiverGetStats:nf},Symbol.toStringTag,{value:"Module"}));function af(i,t){const e=i&&i.navigator;if(!e.mediaDevices)return;const n=i&&i.MediaStreamTrack;if(e.getUserMedia=function(s,r,o){Bc("navigator.getUserMedia","navigator.mediaDevices.getUserMedia"),e.mediaDevices.getUserMedia(s).then(r,o)},!(t.version>55&&"autoGainControl"in e.mediaDevices.getSupportedConstraints())){const s=function(o,a,c){a in o&&!(c in o)&&(o[c]=o[a],delete o[a])},r=e.mediaDevices.getUserMedia.bind(e.mediaDevices);if(e.mediaDevices.getUserMedia=function(o){return typeof o=="object"&&typeof o.audio=="object"&&(o=JSON.parse(JSON.stringify(o)),s(o.audio,"autoGainControl","mozAutoGainControl"),s(o.audio,"noiseSuppression","mozNoiseSuppression")),r(o)},n&&n.prototype.getSettings){const o=n.prototype.getSettings;n.prototype.getSettings=function(){const a=o.apply(this,arguments);return s(a,"mozAutoGainControl","autoGainControl"),s(a,"mozNoiseSuppression","noiseSuppression"),a}}if(n&&n.prototype.applyConstraints){const o=n.prototype.applyConstraints;n.prototype.applyConstraints=function(a){return this.kind==="audio"&&typeof a=="object"&&(a=JSON.parse(JSON.stringify(a)),s(a,"autoGainControl","mozAutoGainControl"),s(a,"noiseSuppression","mozNoiseSuppression")),o.apply(this,[a])}}}}function Wx(i,t){i.navigator.mediaDevices&&(i.navigator.mediaDevices&&"getDisplayMedia"in i.navigator.mediaDevices||(i.navigator.mediaDevices.getDisplayMedia=function(n){if(!(n&&n.video)){const s=new DOMException("getDisplayMedia without video constraints is undefined");return s.name="NotFoundError",s.code=8,Promise.reject(s)}return n.video===!0?n.video={mediaSource:t}:n.video.mediaSource=t,i.navigator.mediaDevices.getUserMedia(n)}))}function cf(i){typeof i=="object"&&i.RTCTrackEvent&&"receiver"in i.RTCTrackEvent.prototype&&!("transceiver"in i.RTCTrackEvent.prototype)&&Object.defineProperty(i.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function ec(i,t){typeof i!="object"||!(i.RTCPeerConnection||i.mozRTCPeerConnection)||(!i.RTCPeerConnection&&i.mozRTCPeerConnection&&(i.RTCPeerConnection=i.mozRTCPeerConnection),t.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(e){const n=i.RTCPeerConnection.prototype[e],s={[e](){return arguments[0]=new(e==="addIceCandidate"?i.RTCIceCandidate:i.RTCSessionDescription)(arguments[0]),n.apply(this,arguments)}};i.RTCPeerConnection.prototype[e]=s[e]}))}function lf(i,t){if(typeof i!="object"||!(i.RTCPeerConnection||i.mozRTCPeerConnection)||t.version>=151)return;const e={inboundrtp:"inbound-rtp",outboundrtp:"outbound-rtp",candidatepair:"candidate-pair",localcandidate:"local-candidate",remotecandidate:"remote-candidate"},n=i.RTCPeerConnection.prototype.getStats;i.RTCPeerConnection.prototype.getStats=function(){const[r,o,a]=arguments;return this.signalingState==="closed"?Promise.resolve(new Map):n.apply(this,[r||null]).then(c=>{if(t.version<53&&!o)try{c.forEach(l=>{l.type=e[l.type]||l.type})}catch(l){if(l.name!=="TypeError")throw l;c.forEach((h,u)=>{c.set(u,Object.assign({},h,{type:e[h.type]||h.type}))})}return c}).then(o,a)}}function hf(i){if(!(typeof i=="object"&&i.RTCPeerConnection&&i.RTCRtpSender)||i.RTCRtpSender&&"getStats"in i.RTCRtpSender.prototype)return;const t=i.RTCPeerConnection.prototype.getSenders;t&&(i.RTCPeerConnection.prototype.getSenders=function(){const s=t.apply(this,[]);return s.forEach(r=>r._pc=this),s});const e=i.RTCPeerConnection.prototype.addTrack;e&&(i.RTCPeerConnection.prototype.addTrack=function(){const s=e.apply(this,arguments);return s._pc=this,s}),i.RTCRtpSender.prototype.getStats=function(){return this.track?this._pc.getStats(this.track):Promise.resolve(new Map)}}function uf(i){if(!(typeof i=="object"&&i.RTCPeerConnection&&i.RTCRtpSender)||i.RTCRtpSender&&"getStats"in i.RTCRtpReceiver.prototype)return;const t=i.RTCPeerConnection.prototype.getReceivers;t&&(i.RTCPeerConnection.prototype.getReceivers=function(){const n=t.apply(this,[]);return n.forEach(s=>s._pc=this),n}),Ei(i,"track",e=>(e.receiver._pc=e.srcElement,e)),i.RTCRtpReceiver.prototype.getStats=function(){return this._pc.getStats(this.track)}}function ff(i){!i.RTCPeerConnection||"removeStream"in i.RTCPeerConnection.prototype||(i.RTCPeerConnection.prototype.removeStream=function(e){Bc("removeStream","removeTrack"),this.getSenders().forEach(n=>{n.track&&e.getTracks().includes(n.track)&&this.removeTrack(n)})})}function df(i){i.DataChannel&&!i.RTCDataChannel&&(i.RTCDataChannel=i.DataChannel)}function pf(i,t){if(!(typeof i=="object"&&i.RTCPeerConnection)||t.version>=110)return;const e=i.RTCPeerConnection.prototype.addTransceiver;e&&(i.RTCPeerConnection.prototype.addTransceiver=function(){this.setParametersPromises=[];let s=arguments[1]&&arguments[1].sendEncodings;s===void 0&&(s=[]),s=[...s];const r=s.length>0;r&&s.forEach(a=>{if("rid"in a&&!/^[a-z0-9]{0,16}$/i.test(a.rid))throw new TypeError("Invalid RID value provided.");if("scaleResolutionDownBy"in a&&!(parseFloat(a.scaleResolutionDownBy)>=1))throw new RangeError("scale_resolution_down_by must be >= 1.0");if("maxFramerate"in a&&!(parseFloat(a.maxFramerate)>=0))throw new RangeError("max_framerate must be >= 0.0")});const o=e.apply(this,arguments);if(r){const{sender:a}=o,c=a.getParameters();(!("encodings"in c)||c.encodings.length===1&&Object.keys(c.encodings[0]).length===0)&&(c.encodings=s,a.sendEncodings=s,this.setParametersPromises.push(a.setParameters(c).then(()=>{delete a.sendEncodings}).catch(()=>{delete a.sendEncodings})))}return o})}function mf(i,t){if(!(typeof i=="object"&&i.RTCRtpSender)||t.version>=110)return;const e=i.RTCRtpSender.prototype.getParameters;e&&(i.RTCRtpSender.prototype.getParameters=function(){const s=e.apply(this,arguments);return"encodings"in s||(s.encodings=[].concat(this.sendEncodings||[{}])),s})}function gf(i,t){if(!(typeof i=="object"&&i.RTCPeerConnection)||t.version>=110)return;const e=i.RTCPeerConnection.prototype.createOffer;i.RTCPeerConnection.prototype.createOffer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>e.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):e.apply(this,arguments)}}function _f(i,t){if(!(typeof i=="object"&&i.RTCPeerConnection)||t.version>=110)return;const e=i.RTCPeerConnection.prototype.createAnswer;i.RTCPeerConnection.prototype.createAnswer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>e.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):e.apply(this,arguments)}}const Uh=Object.freeze(Object.defineProperty({__proto__:null,shimAddTransceiver:pf,shimCreateAnswer:_f,shimCreateOffer:gf,shimGetDisplayMedia:Wx,shimGetParameters:mf,shimGetStats:lf,shimGetUserMedia:af,shimOnTrack:cf,shimPeerConnection:ec,shimRTCDataChannel:df,shimReceiverGetStats:uf,shimRemoveStream:ff,shimSenderGetStats:hf},Symbol.toStringTag,{value:"Module"}));function vf(i){if(!(typeof i!="object"||!i.RTCPeerConnection)){if("getLocalStreams"in i.RTCPeerConnection.prototype||(i.RTCPeerConnection.prototype.getLocalStreams=function(){return this._localStreams||(this._localStreams=[]),this._localStreams}),!("addStream"in i.RTCPeerConnection.prototype)){const t=i.RTCPeerConnection.prototype.addTrack;i.RTCPeerConnection.prototype.addStream=function(n){this._localStreams||(this._localStreams=[]),this._localStreams.includes(n)||this._localStreams.push(n),n.getAudioTracks().forEach(s=>t.call(this,s,n)),n.getVideoTracks().forEach(s=>t.call(this,s,n))},i.RTCPeerConnection.prototype.addTrack=function(n,...s){return s&&s.forEach(r=>{this._localStreams?this._localStreams.includes(r)||this._localStreams.push(r):this._localStreams=[r]}),t.apply(this,arguments)}}"removeStream"in i.RTCPeerConnection.prototype||(i.RTCPeerConnection.prototype.removeStream=function(e){this._localStreams||(this._localStreams=[]);const n=this._localStreams.indexOf(e);if(n===-1)return;this._localStreams.splice(n,1);const s=e.getTracks();this.getSenders().forEach(r=>{s.includes(r.track)&&this.removeTrack(r)})})}}function xf(i){if(!(typeof i!="object"||!i.RTCPeerConnection)&&("getRemoteStreams"in i.RTCPeerConnection.prototype||(i.RTCPeerConnection.prototype.getRemoteStreams=function(){return this._remoteStreams?this._remoteStreams:[]}),!("onaddstream"in i.RTCPeerConnection.prototype))){Object.defineProperty(i.RTCPeerConnection.prototype,"onaddstream",{get(){return this._onaddstream},set(e){this._onaddstream&&(this.removeEventListener("addstream",this._onaddstream),this.removeEventListener("track",this._onaddstreampoly)),this.addEventListener("addstream",this._onaddstream=e),this.addEventListener("track",this._onaddstreampoly=n=>{n.streams.forEach(s=>{if(this._remoteStreams||(this._remoteStreams=[]),this._remoteStreams.includes(s))return;this._remoteStreams.push(s);const r=new Event("addstream");r.stream=s,this.dispatchEvent(r)})})}});const t=i.RTCPeerConnection.prototype.setRemoteDescription;i.RTCPeerConnection.prototype.setRemoteDescription=function(){const n=this;return this._onaddstreampoly||this.addEventListener("track",this._onaddstreampoly=function(s){s.streams.forEach(r=>{if(n._remoteStreams||(n._remoteStreams=[]),n._remoteStreams.indexOf(r)>=0)return;n._remoteStreams.push(r);const o=new Event("addstream");o.stream=r,n.dispatchEvent(o)})}),t.apply(n,arguments)}}}function yf(i){if(typeof i!="object"||!i.RTCPeerConnection)return;const t=i.RTCPeerConnection.prototype,e=t.createOffer,n=t.createAnswer,s=t.setLocalDescription,r=t.setRemoteDescription,o=t.addIceCandidate;t.createOffer=function(l,h){const u=arguments.length>=2?arguments[2]:arguments[0],f=e.apply(this,[u]);return h?(f.then(l,h),Promise.resolve()):f},t.createAnswer=function(l,h){const u=arguments.length>=2?arguments[2]:arguments[0],f=n.apply(this,[u]);return h?(f.then(l,h),Promise.resolve()):f};let a=function(c,l,h){const u=s.apply(this,[c]);return h?(u.then(l,h),Promise.resolve()):u};t.setLocalDescription=a,a=function(c,l,h){const u=r.apply(this,[c]);return h?(u.then(l,h),Promise.resolve()):u},t.setRemoteDescription=a,a=function(c,l,h){const u=o.apply(this,[c]);return h?(u.then(l,h),Promise.resolve()):u},t.addIceCandidate=a}function Sf(i){const t=i&&i.navigator;if(t.mediaDevices&&t.mediaDevices.getUserMedia){const e=t.mediaDevices,n=e.getUserMedia.bind(e);t.mediaDevices.getUserMedia=s=>n(Mf(s))}!t.getUserMedia&&t.mediaDevices&&t.mediaDevices.getUserMedia&&(t.getUserMedia=(function(n,s,r){t.mediaDevices.getUserMedia(n).then(s,r)}).bind(t))}function Mf(i){return i&&i.video!==void 0?Object.assign({},i,{video:Ju(i.video)}):i}function bf(i){if(!i.RTCPeerConnection)return;const t=i.RTCPeerConnection;i.RTCPeerConnection=function(n,s){if(n&&n.iceServers){const r=[];for(let o=0;o<n.iceServers.length;o++){let a=n.iceServers[o];a.urls===void 0&&a.url?(Bc("RTCIceServer.url","RTCIceServer.urls"),a=JSON.parse(JSON.stringify(a)),a.urls=a.url,delete a.url,r.push(a)):r.push(n.iceServers[o])}n.iceServers=r}return new t(n,s)},i.RTCPeerConnection.prototype=t.prototype,"generateCertificate"in t&&Object.defineProperty(i.RTCPeerConnection,"generateCertificate",{get(){return t.generateCertificate}})}function Ef(i){typeof i=="object"&&i.RTCTrackEvent&&"receiver"in i.RTCTrackEvent.prototype&&!("transceiver"in i.RTCTrackEvent.prototype)&&Object.defineProperty(i.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function Tf(i){const t=i.RTCPeerConnection.prototype.createOffer;i.RTCPeerConnection.prototype.createOffer=function(n){if(n){typeof n.offerToReceiveAudio<"u"&&(n.offerToReceiveAudio=!!n.offerToReceiveAudio);const s=this.getTransceivers().find(o=>o.receiver.track.kind==="audio");n.offerToReceiveAudio===!1&&s?s.direction==="sendrecv"?s.setDirection?s.setDirection("sendonly"):s.direction="sendonly":s.direction==="recvonly"&&(s.setDirection?s.setDirection("inactive"):s.direction="inactive"):n.offerToReceiveAudio===!0&&!s&&this.addTransceiver("audio",{direction:"recvonly"}),typeof n.offerToReceiveVideo<"u"&&(n.offerToReceiveVideo=!!n.offerToReceiveVideo);const r=this.getTransceivers().find(o=>o.receiver.track.kind==="video");n.offerToReceiveVideo===!1&&r?r.direction==="sendrecv"?r.setDirection?r.setDirection("sendonly"):r.direction="sendonly":r.direction==="recvonly"&&(r.setDirection?r.setDirection("inactive"):r.direction="inactive"):n.offerToReceiveVideo===!0&&!r&&this.addTransceiver("video",{direction:"recvonly"})}return t.apply(this,arguments)}}function Cf(i){typeof i!="object"||i.AudioContext||(i.AudioContext=i.webkitAudioContext)}const Nh=Object.freeze(Object.defineProperty({__proto__:null,shimAudioContext:Cf,shimCallbacksAPI:yf,shimConstraints:Mf,shimCreateOfferLegacy:Tf,shimGetUserMedia:Sf,shimLocalStreamsAPI:vf,shimRTCIceServerUrls:bf,shimRemoteStreamsAPI:xf,shimTrackEventTransceiver:Ef},Symbol.toStringTag,{value:"Module"}));function Xx(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var Af={exports:{}};(function(i){const t={};t.generateIdentifier=function(){return Math.random().toString(36).substring(2,12)},t.localCName=t.generateIdentifier(),t.splitLines=function(e){return e.trim().split(`
`).map(n=>n.trim())},t.splitSections=function(e){return e.split(`
m=`).map((s,r)=>(r>0?"m="+s:s).trim()+`\r
`)},t.getDescription=function(e){const n=t.splitSections(e);return n&&n[0]},t.getMediaSections=function(e){const n=t.splitSections(e);return n.shift(),n},t.matchPrefix=function(e,n){return t.splitLines(e).filter(s=>s.indexOf(n)===0)},t.parseCandidate=function(e){let n;e.indexOf("a=candidate:")===0?n=e.substring(12).split(" "):n=e.substring(10).split(" ");const s={foundation:n[0],component:{1:"rtp",2:"rtcp"}[n[1]]||n[1],protocol:n[2].toLowerCase(),priority:parseInt(n[3],10),ip:n[4],address:n[4],port:parseInt(n[5],10),type:n[7]};for(let r=8;r<n.length;r+=2)switch(n[r]){case"raddr":s.relatedAddress=n[r+1];break;case"rport":s.relatedPort=parseInt(n[r+1],10);break;case"tcptype":s.tcpType=n[r+1];break;case"ufrag":s.ufrag=n[r+1],s.usernameFragment=n[r+1];break;default:s[n[r]]===void 0&&(s[n[r]]=n[r+1]);break}return s},t.writeCandidate=function(e){const n=[];n.push(e.foundation);const s=e.component;s==="rtp"?n.push(1):s==="rtcp"?n.push(2):n.push(s),n.push(e.protocol.toUpperCase()),n.push(e.priority),n.push(e.address||e.ip),n.push(e.port);const r=e.type;return n.push("typ"),n.push(r),r!=="host"&&e.relatedAddress&&e.relatedPort!==void 0&&(n.push("raddr"),n.push(e.relatedAddress),n.push("rport"),n.push(e.relatedPort)),e.tcpType&&e.protocol.toLowerCase()==="tcp"&&(n.push("tcptype"),n.push(e.tcpType)),(e.usernameFragment||e.ufrag)&&(n.push("ufrag"),n.push(e.usernameFragment||e.ufrag)),"candidate:"+n.join(" ")},t.parseIceOptions=function(e){return e.substring(14).split(" ")},t.parseRtpMap=function(e){let n=e.substring(9).split(" ");const s={payloadType:parseInt(n.shift(),10)};return n=n[0].split("/"),s.name=n[0],s.clockRate=parseInt(n[1],10),s.channels=n.length===3?parseInt(n[2],10):1,s.numChannels=s.channels,s},t.writeRtpMap=function(e){let n=e.payloadType;e.preferredPayloadType!==void 0&&(n=e.preferredPayloadType);const s=e.channels||e.numChannels||1;return"a=rtpmap:"+n+" "+e.name+"/"+e.clockRate+(s!==1?"/"+s:"")+`\r
`},t.parseExtmap=function(e){const n=e.substring(9).split(" ");return{id:parseInt(n[0],10),direction:n[0].indexOf("/")>0?n[0].split("/")[1]:"sendrecv",uri:n[1],attributes:n.slice(2).join(" ")}},t.writeExtmap=function(e){return"a=extmap:"+(e.id||e.preferredId)+(e.direction&&e.direction!=="sendrecv"?"/"+e.direction:"")+" "+e.uri+(e.attributes?" "+e.attributes:"")+`\r
`},t.parseFmtp=function(e){const n={};let s;const r=e.substring(e.indexOf(" ")+1).split(";");for(let o=0;o<r.length;o++)s=r[o].trim().split("="),n[s[0].trim()]=s[1];return n},t.writeFmtp=function(e){let n="",s=e.payloadType;if(e.preferredPayloadType!==void 0&&(s=e.preferredPayloadType),e.parameters&&Object.keys(e.parameters).length){const r=[];Object.keys(e.parameters).forEach(o=>{e.parameters[o]!==void 0?r.push(o+"="+e.parameters[o]):r.push(o)}),n+="a=fmtp:"+s+" "+r.join(";")+`\r
`}return n},t.parseRtcpFb=function(e){const n=e.substring(e.indexOf(" ")+1).split(" ");return{type:n.shift(),parameter:n.join(" ")}},t.writeRtcpFb=function(e){let n="",s=e.payloadType;return e.preferredPayloadType!==void 0&&(s=e.preferredPayloadType),e.rtcpFeedback&&e.rtcpFeedback.length&&e.rtcpFeedback.forEach(r=>{n+="a=rtcp-fb:"+s+" "+r.type+(r.parameter&&r.parameter.length?" "+r.parameter:"")+`\r
`}),n},t.parseSsrcMedia=function(e){const n=e.indexOf(" "),s={ssrc:parseInt(e.substring(7,n),10)},r=e.indexOf(":",n);return r>-1?(s.attribute=e.substring(n+1,r),s.value=e.substring(r+1)):s.attribute=e.substring(n+1),s},t.parseSsrcGroup=function(e){const n=e.substring(13).split(" ");return{semantics:n.shift(),ssrcs:n.map(s=>parseInt(s,10))}},t.getMid=function(e){const n=t.matchPrefix(e,"a=mid:")[0];if(n)return n.substring(6)},t.parseFingerprint=function(e){const n=e.substring(14).split(" ");return{algorithm:n[0].toLowerCase(),value:n[1].toUpperCase()}},t.getDtlsParameters=function(e,n){return{role:"auto",fingerprints:t.matchPrefix(e+n,"a=fingerprint:").map(t.parseFingerprint)}},t.writeDtlsParameters=function(e,n){let s="a=setup:"+n+`\r
`;return e.fingerprints.forEach(r=>{s+="a=fingerprint:"+r.algorithm+" "+r.value+`\r
`}),s},t.parseCryptoLine=function(e){const n=e.substring(9).split(" ");return{tag:parseInt(n[0],10),cryptoSuite:n[1],keyParams:n[2],sessionParams:n.slice(3)}},t.writeCryptoLine=function(e){return"a=crypto:"+e.tag+" "+e.cryptoSuite+" "+(typeof e.keyParams=="object"?t.writeCryptoKeyParams(e.keyParams):e.keyParams)+(e.sessionParams?" "+e.sessionParams.join(" "):"")+`\r
`},t.parseCryptoKeyParams=function(e){if(e.indexOf("inline:")!==0)return null;const n=e.substring(7).split("|");return{keyMethod:"inline",keySalt:n[0],lifeTime:n[1],mkiValue:n[2]?n[2].split(":")[0]:void 0,mkiLength:n[2]?n[2].split(":")[1]:void 0}},t.writeCryptoKeyParams=function(e){return e.keyMethod+":"+e.keySalt+(e.lifeTime?"|"+e.lifeTime:"")+(e.mkiValue&&e.mkiLength?"|"+e.mkiValue+":"+e.mkiLength:"")},t.getCryptoParameters=function(e,n){return t.matchPrefix(e+n,"a=crypto:").map(t.parseCryptoLine)},t.getIceParameters=function(e,n){const s=t.matchPrefix(e+n,"a=ice-ufrag:")[0],r=t.matchPrefix(e+n,"a=ice-pwd:")[0];return s&&r?{usernameFragment:s.substring(12),password:r.substring(10)}:null},t.writeIceParameters=function(e){let n="a=ice-ufrag:"+e.usernameFragment+`\r
a=ice-pwd:`+e.password+`\r
`;return e.iceLite&&(n+=`a=ice-lite\r
`),n},t.parseRtpParameters=function(e){const n={codecs:[],headerExtensions:[],fecMechanisms:[],rtcp:[]},r=t.splitLines(e)[0].split(" ");n.profile=r[2];for(let a=3;a<r.length;a++){const c=r[a],l=t.matchPrefix(e,"a=rtpmap:"+c+" ")[0];if(l){const h=t.parseRtpMap(l),u=t.matchPrefix(e,"a=fmtp:"+c+" ");switch(h.parameters=u.length?t.parseFmtp(u[0]):{},h.rtcpFeedback=t.matchPrefix(e,"a=rtcp-fb:"+c+" ").map(t.parseRtcpFb),n.codecs.push(h),h.name.toUpperCase()){case"RED":case"ULPFEC":n.fecMechanisms.push(h.name.toUpperCase());break}}}t.matchPrefix(e,"a=extmap:").forEach(a=>{n.headerExtensions.push(t.parseExtmap(a))});const o=t.matchPrefix(e,"a=rtcp-fb:* ").map(t.parseRtcpFb);return n.codecs.forEach(a=>{o.forEach(c=>{a.rtcpFeedback.find(h=>h.type===c.type&&h.parameter===c.parameter)||a.rtcpFeedback.push(c)})}),n},t.writeRtpDescription=function(e,n){let s="";s+="m="+e+" ",s+=n.codecs.length>0?"9":"0",s+=" "+(n.profile||"UDP/TLS/RTP/SAVPF")+" ",s+=n.codecs.map(o=>o.preferredPayloadType!==void 0?o.preferredPayloadType:o.payloadType).join(" ")+`\r
`,s+=`c=IN IP4 0.0.0.0\r
`,s+=`a=rtcp:9 IN IP4 0.0.0.0\r
`,n.codecs.forEach(o=>{s+=t.writeRtpMap(o),s+=t.writeFmtp(o),s+=t.writeRtcpFb(o)});let r=0;return n.codecs.forEach(o=>{o.maxptime>r&&(r=o.maxptime)}),r>0&&(s+="a=maxptime:"+r+`\r
`),n.headerExtensions&&n.headerExtensions.forEach(o=>{s+=t.writeExtmap(o)}),s},t.parseRtpEncodingParameters=function(e){const n=[],s=t.parseRtpParameters(e),r=s.fecMechanisms.indexOf("RED")!==-1,o=s.fecMechanisms.indexOf("ULPFEC")!==-1,a=t.matchPrefix(e,"a=ssrc:").map(f=>t.parseSsrcMedia(f)).filter(f=>f.attribute==="cname"),c=a.length>0&&a[0].ssrc;let l;const h=t.matchPrefix(e,"a=ssrc-group:FID").map(f=>f.substring(17).split(" ").map(g=>parseInt(g,10)));h.length>0&&h[0].length>1&&h[0][0]===c&&(l=h[0][1]),s.codecs.forEach(f=>{if(f.name.toUpperCase()==="RTX"&&f.parameters.apt){let d={ssrc:c,codecPayloadType:parseInt(f.parameters.apt,10)};c&&l&&(d.rtx={ssrc:l}),n.push(d),r&&(d=JSON.parse(JSON.stringify(d)),d.fec={ssrc:c,mechanism:o?"red+ulpfec":"red"},n.push(d))}}),n.length===0&&c&&n.push({ssrc:c});let u=t.matchPrefix(e,"b=");return u.length&&(u[0].indexOf("b=TIAS:")===0?u=parseInt(u[0].substring(7),10):u[0].indexOf("b=AS:")===0?u=parseInt(u[0].substring(5),10)*1e3*.95-50*40*8:u=void 0,n.forEach(f=>{f.maxBitrate=u})),n},t.parseRtcpParameters=function(e){const n={},s=t.matchPrefix(e,"a=ssrc:").map(a=>t.parseSsrcMedia(a)).filter(a=>a.attribute==="cname")[0];s&&(n.cname=s.value,n.ssrc=s.ssrc);const r=t.matchPrefix(e,"a=rtcp-rsize");n.reducedSize=r.length>0,n.compound=r.length===0;const o=t.matchPrefix(e,"a=rtcp-mux");return n.mux=o.length>0,n},t.writeRtcpParameters=function(e){let n="";return e.reducedSize&&(n+=`a=rtcp-rsize\r
`),e.mux&&(n+=`a=rtcp-mux\r
`),e.ssrc!==void 0&&e.cname&&(n+="a=ssrc:"+e.ssrc+" cname:"+e.cname+`\r
`),n},t.parseMsid=function(e){let n;const s=t.matchPrefix(e,"a=msid:");if(s.length===1)return n=s[0].substring(7).split(" "),{stream:n[0],track:n[1]};const r=t.matchPrefix(e,"a=ssrc:").map(o=>t.parseSsrcMedia(o)).filter(o=>o.attribute==="msid");if(r.length>0)return n=r[0].value.split(" "),{stream:n[0],track:n[1]}},t.parseSctpDescription=function(e){const n=t.parseMLine(e),s=t.matchPrefix(e,"a=max-message-size:");let r;s.length>0&&(r=parseInt(s[0].substring(19),10)),isNaN(r)&&(r=65536);const o=t.matchPrefix(e,"a=sctp-port:");if(o.length>0)return{port:parseInt(o[0].substring(12),10),protocol:n.fmt,maxMessageSize:r};const a=t.matchPrefix(e,"a=sctpmap:");if(a.length>0){const c=a[0].substring(10).split(" ");return{port:parseInt(c[0],10),protocol:c[1],maxMessageSize:r}}},t.writeSctpDescription=function(e,n){let s=[];return e.protocol!=="DTLS/SCTP"?s=["m="+e.kind+" 9 "+e.protocol+" "+n.protocol+`\r
`,`c=IN IP4 0.0.0.0\r
`,"a=sctp-port:"+n.port+`\r
`]:s=["m="+e.kind+" 9 "+e.protocol+" "+n.port+`\r
`,`c=IN IP4 0.0.0.0\r
`,"a=sctpmap:"+n.port+" "+n.protocol+` 65535\r
`],n.maxMessageSize!==void 0&&s.push("a=max-message-size:"+n.maxMessageSize+`\r
`),s.join("")},t.generateSessionId=function(){return Math.random().toString().substr(2,22)},t.writeSessionBoilerplate=function(e,n,s){let r;const o=n!==void 0?n:2;return e?r=e:r=t.generateSessionId(),`v=0\r
o=`+(s||"thisisadapterortc")+" "+r+" "+o+` IN IP4 127.0.0.1\r
s=-\r
t=0 0\r
`},t.getDirection=function(e,n){const s=t.splitLines(e);for(let r=0;r<s.length;r++)switch(s[r]){case"a=sendrecv":case"a=sendonly":case"a=recvonly":case"a=inactive":return s[r].substring(2)}return n?t.getDirection(n):"sendrecv"},t.getKind=function(e){return t.splitLines(e)[0].split(" ")[0].substring(2)},t.isRejected=function(e){return e.split(" ",2)[1]==="0"},t.parseMLine=function(e){const s=t.splitLines(e)[0].substring(2).split(" ");return{kind:s[0],port:parseInt(s[1],10),protocol:s[2],fmt:s.slice(3).join(" ")}},t.parseOLine=function(e){const s=t.matchPrefix(e,"o=")[0].substring(2).split(" ");return{username:s[0],sessionId:s[1],sessionVersion:parseInt(s[2],10),netType:s[3],addressType:s[4],address:s[5]}},t.isValidSDP=function(e){if(typeof e!="string"||e.length===0)return!1;const n=t.splitLines(e);for(let s=0;s<n.length;s++)if(n[s].length<2||n[s].charAt(1)!=="=")return!1;return!0},i.exports=t})(Af);var wf=Af.exports;const Ji=Xx(wf),$x=td({__proto__:null,default:Ji},[wf]);function Br(i){if(!i.RTCIceCandidate||i.RTCIceCandidate&&"foundation"in i.RTCIceCandidate.prototype)return;const t=i.RTCIceCandidate;i.RTCIceCandidate=function(n){if(typeof n=="object"&&n.candidate&&n.candidate.indexOf("a=")===0&&(n=JSON.parse(JSON.stringify(n)),n.candidate=n.candidate.substring(2)),n.candidate&&n.candidate.length){const s=new t(n),r=Ji.parseCandidate(n.candidate);for(const o in r)o in s||Object.defineProperty(s,o,{value:r[o]});return s.toJSON=function(){return{candidate:s.candidate,sdpMid:s.sdpMid,sdpMLineIndex:s.sdpMLineIndex,usernameFragment:s.usernameFragment}},s}return new t(n)},i.RTCIceCandidate.prototype=t.prototype,Ei(i,"icecandidate",e=>(e.candidate&&Object.defineProperty(e,"candidate",{value:new i.RTCIceCandidate(e.candidate),writable:"false"}),e))}function nc(i){!i.RTCIceCandidate||i.RTCIceCandidate&&"relayProtocol"in i.RTCIceCandidate.prototype||Ei(i,"icecandidate",t=>{if(t.candidate){const e=Ji.parseCandidate(t.candidate.candidate);e.type==="relay"&&(t.candidate.relayProtocol={0:"tls",1:"tcp",2:"udp"}[e.priority>>24])}return t})}function kr(i,t){if(!i.RTCPeerConnection||t.browser==="chrome"&&t.version>102||t.browser==="firefox"&&t.version>=113)return;"sctp"in i.RTCPeerConnection.prototype||Object.defineProperty(i.RTCPeerConnection.prototype,"sctp",{get(){return typeof this._sctp>"u"?null:this._sctp}});const e=function(a){if(!a||!a.sdp)return!1;const c=Ji.splitSections(a.sdp);return c.shift(),c.some(l=>{const h=Ji.parseMLine(l);return h&&h.kind==="application"&&h.protocol.indexOf("SCTP")!==-1})},n=function(a){const c=a.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);if(c===null||c.length<2)return-1;const l=parseInt(c[1],10);return l!==l?-1:l},s=function(a){let c=65536;return t.browser==="firefox"&&(t.version<57?a===-1?c=16384:c=2147483637:t.version<60?c=t.version===57?65535:65536:c=2147483637),c},r=function(a,c){let l=65536;t.browser==="firefox"&&t.version===57&&(l=65535);const h=Ji.matchPrefix(a.sdp,"a=max-message-size:");return h.length>0?l=parseInt(h[0].substring(19),10):t.browser==="firefox"&&c!==-1&&(l=2147483637),l},o=i.RTCPeerConnection.prototype.setRemoteDescription;i.RTCPeerConnection.prototype.setRemoteDescription=function(){if(this._sctp=null,t.browser==="chrome"&&t.version>=76){const{sdpSemantics:c}=this.getConfiguration();c==="plan-b"&&Object.defineProperty(this,"sctp",{get(){return typeof this._sctp>"u"?null:this._sctp},enumerable:!0,configurable:!0})}if(e(arguments[0])){const c=n(arguments[0]),l=s(c),h=r(arguments[0],c);let u;l===0&&h===0?u=Number.POSITIVE_INFINITY:l===0||h===0?u=Math.max(l,h):u=Math.min(l,h);const f={};Object.defineProperty(f,"maxMessageSize",{get(){return u}}),this._sctp=f}return o.apply(this,arguments)}}function zr(i,t){if(!(i.RTCPeerConnection&&"createDataChannel"in i.RTCPeerConnection.prototype)||t.browser==="chrome"&&t.version>=149||t.browser==="firefox"&&t.version>60)return;function e(s,r){const o=s.send;s.send=function(){const c=arguments[0],l=c.length||c.size||c.byteLength;if(s.readyState==="open"&&r.sctp&&l>r.sctp.maxMessageSize)throw new TypeError("Message too large (can send a maximum of "+r.sctp.maxMessageSize+" bytes)");return o.apply(s,arguments)}}const n=i.RTCPeerConnection.prototype.createDataChannel;i.RTCPeerConnection.prototype.createDataChannel=function(){const r=n.apply(this,arguments);return e(r,this),r},Ei(i,"datachannel",s=>(e(s.channel,s.target),s))}function ic(i){if(!i.RTCPeerConnection||"connectionState"in i.RTCPeerConnection.prototype)return;const t=i.RTCPeerConnection.prototype;Object.defineProperty(t,"connectionState",{get(){return{completed:"connected",checking:"connecting"}[this.iceConnectionState]||this.iceConnectionState},enumerable:!0,configurable:!0}),Object.defineProperty(t,"onconnectionstatechange",{get(){return this._onconnectionstatechange||null},set(e){this._onconnectionstatechange&&(this.removeEventListener("connectionstatechange",this._onconnectionstatechange),delete this._onconnectionstatechange),e&&this.addEventListener("connectionstatechange",this._onconnectionstatechange=e)},enumerable:!0,configurable:!0}),["setLocalDescription","setRemoteDescription"].forEach(e=>{const n=t[e];t[e]=function(){return this._connectionstatechangepoly||(this._connectionstatechangepoly=s=>{const r=s.target;if(r._lastConnectionState!==r.connectionState){r._lastConnectionState=r.connectionState;const o=new Event("connectionstatechange",s);r.dispatchEvent(o)}return s},this.addEventListener("iceconnectionstatechange",this._connectionstatechangepoly)),n.apply(this,arguments)}})}function sc(i,t){if(!i.RTCPeerConnection||t.browser==="chrome"&&t.version>=71||t.browser==="safari"&&t._safariVersion>=13.1)return;const e=i.RTCPeerConnection.prototype.setRemoteDescription;i.RTCPeerConnection.prototype.setRemoteDescription=function(s){if(s&&s.sdp&&s.sdp.indexOf(`
a=extmap-allow-mixed`)!==-1){const r=s.sdp.split(`
`).filter(o=>o.trim()!=="a=extmap-allow-mixed").join(`
`);i.RTCSessionDescription&&s instanceof i.RTCSessionDescription?arguments[0]=new i.RTCSessionDescription({type:s.type,sdp:r}):s.sdp=r}return e.apply(this,arguments)}}function Hr(i,t){if(!(i.RTCPeerConnection&&i.RTCPeerConnection.prototype))return;const e=i.RTCPeerConnection.prototype.addIceCandidate;!e||e.length===0||(i.RTCPeerConnection.prototype.addIceCandidate=function(){return arguments[0]?(t.browser==="chrome"&&t.version<78||t.browser==="firefox"&&t.version<68||t.browser==="safari")&&arguments[0]&&arguments[0].candidate===""?Promise.resolve():e.apply(this,arguments):(arguments[1]&&arguments[1].apply(null),Promise.resolve())})}function Vr(i,t){if(!(i.RTCPeerConnection&&i.RTCPeerConnection.prototype))return;const e=i.RTCPeerConnection.prototype.setLocalDescription;!e||e.length===0||(i.RTCPeerConnection.prototype.setLocalDescription=function(){let s=arguments[0]||{};if(typeof s!="object"||s.type&&s.sdp)return e.apply(this,arguments);if(s={type:s.type,sdp:s.sdp},!s.type)switch(this.signalingState){case"stable":case"have-local-offer":case"have-remote-pranswer":s.type="offer";break;default:s.type="answer";break}return s.sdp||s.type!=="offer"&&s.type!=="answer"?e.apply(this,[s]):(s.type==="offer"?this.createOffer:this.createAnswer).apply(this).then(o=>e.apply(this,[o]))})}const qx=Object.freeze(Object.defineProperty({__proto__:null,removeExtmapAllowMixed:sc,shimAddIceCandidateNullOrEmpty:Hr,shimConnectionState:ic,shimMaxMessageSize:kr,shimParameterlessSetLocalDescription:Vr,shimRTCIceCandidate:Br,shimRTCIceCandidateRelayProtocol:nc,shimSendThrowTypeError:zr},Symbol.toStringTag,{value:"Module"}));function Yx({window:i}={},t={shimChrome:!0,shimFirefox:!0,shimSafari:!0}){const e=Oc,n=Gx(i),s={browserDetails:n,commonShim:qx,extractVersion:Es,disableLog:Hx,disableWarnings:Vx,sdp:$x};switch(n.browser){case"chrome":if(!Dh||!tc||!t.shimChrome)return e("Chrome shim is not included in this adapter release."),s;if(n.version===null)return e("Chrome shim can not determine version, not shimming."),s;e("adapter.js shimming chrome."),s.browserShim=Dh,Hr(i,n),Vr(i),Ku(i,n),Qu(i),tc(i,n),tf(i,n),rf(i,n),ef(i),nf(i,n),of(i,n),Br(i),nc(i),ic(i),kr(i,n),zr(i,n),sc(i,n);break;case"firefox":if(!Uh||!ec||!t.shimFirefox)return e("Firefox shim is not included in this adapter release."),s;e("adapter.js shimming firefox."),s.browserShim=Uh,Hr(i,n),Vr(i),af(i,n),ec(i,n),lf(i,n),cf(i),ff(i),hf(i),uf(i),df(i),pf(i,n),mf(i,n),gf(i,n),_f(i,n),Br(i),ic(i),kr(i,n),zr(i,n);break;case"safari":if(!Nh||!t.shimSafari)return e("Safari shim is not included in this adapter release."),s;e("adapter.js shimming safari."),s.browserShim=Nh,Hr(i,n),Vr(i),bf(i),Tf(i),yf(i),vf(i),xf(i),Ef(i),Sf(i),Cf(i),Br(i),nc(i),kr(i,n),zr(i,n),sc(i,n);break;default:e("Unsupported browser!");break}return s}const Fh=Yx({window:typeof window>"u"?void 0:window});function Ti(i,t,e,n){Object.defineProperty(i,t,{get:e,set:n,enumerable:!0,configurable:!0})}class Rf{constructor(){this.chunkedMTU=16300,this._dataCount=1,this.chunk=t=>{const e=[],n=t.byteLength,s=Math.ceil(n/this.chunkedMTU);let r=0,o=0;for(;o<n;){const a=Math.min(n,o+this.chunkedMTU),c=t.slice(o,a),l={__peerData:this._dataCount,n:r,data:c,total:s};e.push(l),o=a,r++}return this._dataCount++,e}}}function jx(i){let t=0;for(const s of i)t+=s.byteLength;const e=new Uint8Array(t);let n=0;for(const s of i)e.set(s,n),n+=s.byteLength;return e}const ia=Fh.default||Fh,Ss=new class{isWebRTCSupported(){return typeof RTCPeerConnection<"u"}isBrowserSupported(){const i=this.getBrowser(),t=this.getVersion();return this.supportedBrowsers.includes(i)?i==="chrome"?t>=this.minChromeVersion:i==="firefox"?t>=this.minFirefoxVersion:i==="safari"?!this.isIOS&&t>=this.minSafariVersion:!1:!1}getBrowser(){return ia.browserDetails.browser}getVersion(){return ia.browserDetails.version||0}isUnifiedPlanSupported(){const i=this.getBrowser(),t=ia.browserDetails.version||0;if(i==="chrome"&&t<this.minChromeVersion)return!1;if(i==="firefox"&&t>=this.minFirefoxVersion)return!0;if(!window.RTCRtpTransceiver||!("currentDirection"in RTCRtpTransceiver.prototype))return!1;let e,n=!1;try{e=new RTCPeerConnection,e.addTransceiver("audio"),n=!0}catch{}finally{e&&e.close()}return n}toString(){return`Supports:
    browser:${this.getBrowser()}
    version:${this.getVersion()}
    isIOS:${this.isIOS}
    isWebRTCSupported:${this.isWebRTCSupported()}
    isBrowserSupported:${this.isBrowserSupported()}
    isUnifiedPlanSupported:${this.isUnifiedPlanSupported()}`}constructor(){this.isIOS=typeof navigator<"u"?["iPad","iPhone","iPod"].includes(navigator.platform):!1,this.supportedBrowsers=["firefox","chrome","safari"],this.minFirefoxVersion=59,this.minChromeVersion=72,this.minSafariVersion=605}},Zx=i=>!i||/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(i),Pf=()=>Math.random().toString(36).slice(2),Oh={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:["turn:eu-0.turn.peerjs.com:3478","turn:us-0.turn.peerjs.com:3478"],username:"peerjs",credential:"peerjsp"}],sdpSemantics:"unified-plan"};class Jx extends Rf{noop(){}blobToArrayBuffer(t,e){const n=new FileReader;return n.onload=function(s){s.target&&e(s.target.result)},n.readAsArrayBuffer(t),n}binaryStringToArrayBuffer(t){const e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n)&255;return e.buffer}isSecure(){return location.protocol==="https:"}constructor(...t){super(...t),this.CLOUD_HOST="0.peerjs.com",this.CLOUD_PORT=443,this.chunkedBrowsers={Chrome:1,chrome:1},this.defaultConfig=Oh,this.browser=Ss.getBrowser(),this.browserVersion=Ss.getVersion(),this.pack=Yu,this.unpack=qu,this.supports=function(){const e={browser:Ss.isBrowserSupported(),webRTC:Ss.isWebRTCSupported(),audioVideo:!1,data:!1,binaryBlob:!1,reliable:!1};if(!e.webRTC)return e;let n;try{n=new RTCPeerConnection(Oh),e.audioVideo=!0;let s;try{s=n.createDataChannel("_PEERJSTEST",{ordered:!0}),e.data=!0,e.reliable=!!s.ordered;try{s.binaryType="blob",e.binaryBlob=!Ss.isIOS}catch{}}catch{}finally{s&&s.close()}}catch{}finally{n&&n.close()}return e}(),this.validateId=Zx,this.randomToken=Pf}}const ze=new Jx,Kx="PeerJS: ";class Qx{get logLevel(){return this._logLevel}set logLevel(t){this._logLevel=t}log(...t){this._logLevel>=3&&this._print(3,...t)}warn(...t){this._logLevel>=2&&this._print(2,...t)}error(...t){this._logLevel>=1&&this._print(1,...t)}setLogFunction(t){this._print=t}_print(t,...e){const n=[Kx,...e];for(const s in n)n[s]instanceof Error&&(n[s]="("+n[s].name+") "+n[s].message);t>=3?console.log(...n):t>=2?console.warn("WARNING",...n):t>=1&&console.error("ERROR",...n)}constructor(){this._logLevel=0}}var vt=new Qx,kc={},ty=Object.prototype.hasOwnProperty,Oe="~";function Bs(){}Object.create&&(Bs.prototype=Object.create(null),new Bs().__proto__||(Oe=!1));function ey(i,t,e){this.fn=i,this.context=t,this.once=e||!1}function Lf(i,t,e,n,s){if(typeof e!="function")throw new TypeError("The listener must be a function");var r=new ey(e,n||i,s),o=Oe?Oe+t:t;return i._events[o]?i._events[o].fn?i._events[o]=[i._events[o],r]:i._events[o].push(r):(i._events[o]=r,i._eventsCount++),i}function Gr(i,t){--i._eventsCount===0?i._events=new Bs:delete i._events[t]}function Pe(){this._events=new Bs,this._eventsCount=0}Pe.prototype.eventNames=function(){var t=[],e,n;if(this._eventsCount===0)return t;for(n in e=this._events)ty.call(e,n)&&t.push(Oe?n.slice(1):n);return Object.getOwnPropertySymbols?t.concat(Object.getOwnPropertySymbols(e)):t};Pe.prototype.listeners=function(t){var e=Oe?Oe+t:t,n=this._events[e];if(!n)return[];if(n.fn)return[n.fn];for(var s=0,r=n.length,o=new Array(r);s<r;s++)o[s]=n[s].fn;return o};Pe.prototype.listenerCount=function(t){var e=Oe?Oe+t:t,n=this._events[e];return n?n.fn?1:n.length:0};Pe.prototype.emit=function(t,e,n,s,r,o){var a=Oe?Oe+t:t;if(!this._events[a])return!1;var c=this._events[a],l=arguments.length,h,u;if(c.fn){switch(c.once&&this.removeListener(t,c.fn,void 0,!0),l){case 1:return c.fn.call(c.context),!0;case 2:return c.fn.call(c.context,e),!0;case 3:return c.fn.call(c.context,e,n),!0;case 4:return c.fn.call(c.context,e,n,s),!0;case 5:return c.fn.call(c.context,e,n,s,r),!0;case 6:return c.fn.call(c.context,e,n,s,r,o),!0}for(u=1,h=new Array(l-1);u<l;u++)h[u-1]=arguments[u];c.fn.apply(c.context,h)}else{var f=c.length,d;for(u=0;u<f;u++)switch(c[u].once&&this.removeListener(t,c[u].fn,void 0,!0),l){case 1:c[u].fn.call(c[u].context);break;case 2:c[u].fn.call(c[u].context,e);break;case 3:c[u].fn.call(c[u].context,e,n);break;case 4:c[u].fn.call(c[u].context,e,n,s);break;default:if(!h)for(d=1,h=new Array(l-1);d<l;d++)h[d-1]=arguments[d];c[u].fn.apply(c[u].context,h)}}return!0};Pe.prototype.on=function(t,e,n){return Lf(this,t,e,n,!1)};Pe.prototype.once=function(t,e,n){return Lf(this,t,e,n,!0)};Pe.prototype.removeListener=function(t,e,n,s){var r=Oe?Oe+t:t;if(!this._events[r])return this;if(!e)return Gr(this,r),this;var o=this._events[r];if(o.fn)o.fn===e&&(!s||o.once)&&(!n||o.context===n)&&Gr(this,r);else{for(var a=0,c=[],l=o.length;a<l;a++)(o[a].fn!==e||s&&!o[a].once||n&&o[a].context!==n)&&c.push(o[a]);c.length?this._events[r]=c.length===1?c[0]:c:Gr(this,r)}return this};Pe.prototype.removeAllListeners=function(t){var e;return t?(e=Oe?Oe+t:t,this._events[e]&&Gr(this,e)):(this._events=new Bs,this._eventsCount=0),this};Pe.prototype.off=Pe.prototype.removeListener;Pe.prototype.addListener=Pe.prototype.on;Pe.prefixed=Oe;Pe.EventEmitter=Pe;kc=Pe;var Ci={};Ti(Ci,"ConnectionType",()=>Jn);Ti(Ci,"PeerErrorType",()=>pe);Ti(Ci,"BaseConnectionErrorType",()=>rc);Ti(Ci,"DataConnectionErrorType",()=>zc);Ti(Ci,"SerializationType",()=>go);Ti(Ci,"SocketEventType",()=>Yn);Ti(Ci,"ServerMessageType",()=>Re);var Jn=function(i){return i.Data="data",i.Media="media",i}({}),pe=function(i){return i.BrowserIncompatible="browser-incompatible",i.Disconnected="disconnected",i.InvalidID="invalid-id",i.InvalidKey="invalid-key",i.Network="network",i.PeerUnavailable="peer-unavailable",i.SslUnavailable="ssl-unavailable",i.ServerError="server-error",i.SocketError="socket-error",i.SocketClosed="socket-closed",i.UnavailableID="unavailable-id",i.WebRTC="webrtc",i}({}),rc=function(i){return i.NegotiationFailed="negotiation-failed",i.ConnectionClosed="connection-closed",i}({}),zc=function(i){return i.NotOpenYet="not-open-yet",i.MessageToBig="message-too-big",i}({}),go=function(i){return i.Binary="binary",i.BinaryUTF8="binary-utf8",i.JSON="json",i.None="raw",i}({}),Yn=function(i){return i.Message="message",i.Disconnected="disconnected",i.Error="error",i.Close="close",i}({}),Re=function(i){return i.Heartbeat="HEARTBEAT",i.Candidate="CANDIDATE",i.Offer="OFFER",i.Answer="ANSWER",i.Open="OPEN",i.Error="ERROR",i.IdTaken="ID-TAKEN",i.InvalidKey="INVALID-KEY",i.Leave="LEAVE",i.Expire="EXPIRE",i}({});const If="1.5.5";class ny extends kc.EventEmitter{constructor(t,e,n,s,r,o=5e3){super(),this.pingInterval=o,this._disconnected=!0,this._messagesQueue=[];const a=t?"wss://":"ws://";this._baseUrl=a+e+":"+n+s+"peerjs?key="+r}start(t,e){this._id=t;const n=`${this._baseUrl}&id=${t}&token=${e}`;this._socket||!this._disconnected||(this._socket=new WebSocket(n+"&version="+If),this._disconnected=!1,this._socket.onmessage=s=>{let r;try{r=JSON.parse(s.data),vt.log("Server message received:",r)}catch{vt.log("Invalid server message",s.data);return}this.emit(Yn.Message,r)},this._socket.onclose=s=>{this._disconnected||(vt.log("Socket closed.",s),this._cleanup(),this._disconnected=!0,this.emit(Yn.Disconnected))},this._socket.onopen=()=>{this._disconnected||(this._sendQueuedMessages(),vt.log("Socket open"),this._scheduleHeartbeat())})}_scheduleHeartbeat(){this._wsPingTimer=setTimeout(()=>{this._sendHeartbeat()},this.pingInterval)}_sendHeartbeat(){if(!this._wsOpen()){vt.log("Cannot send heartbeat, because socket closed");return}const t=JSON.stringify({type:Re.Heartbeat});this._socket.send(t),this._scheduleHeartbeat()}_wsOpen(){return!!this._socket&&this._socket.readyState===1}_sendQueuedMessages(){const t=[...this._messagesQueue];this._messagesQueue=[];for(const e of t)this.send(e)}send(t){if(this._disconnected)return;if(!this._id){this._messagesQueue.push(t);return}if(!t.type){this.emit(Yn.Error,"Invalid message");return}if(!this._wsOpen())return;const e=JSON.stringify(t);this._socket.send(e)}close(){this._disconnected||(this._cleanup(),this._disconnected=!0)}_cleanup(){this._socket&&(this._socket.onopen=this._socket.onmessage=this._socket.onclose=null,this._socket.close(),this._socket=void 0),clearTimeout(this._wsPingTimer)}}class Df{constructor(t){this.connection=t}startConnection(t){const e=this._startPeerConnection();if(this.connection.peerConnection=e,this.connection.type===Jn.Media&&t._stream&&this._addTracksToConnection(t._stream,e),t.originator){const n=this.connection,s={ordered:!!t.reliable},r=e.createDataChannel(n.label,s);n._initializeDataChannel(r),this._makeOffer()}else this.handleSDP("OFFER",t.sdp)}_startPeerConnection(){vt.log("Creating RTCPeerConnection.");const t=new RTCPeerConnection(this.connection.provider.options.config);return this._setupListeners(t),t}_setupListeners(t){const e=this.connection.peer,n=this.connection.connectionId,s=this.connection.type,r=this.connection.provider;vt.log("Listening for ICE candidates."),t.onicecandidate=o=>{!o.candidate||!o.candidate.candidate||(vt.log(`Received ICE candidates for ${e}:`,o.candidate),r.socket.send({type:Re.Candidate,payload:{candidate:o.candidate,type:s,connectionId:n},dst:e}))},t.oniceconnectionstatechange=()=>{switch(t.iceConnectionState){case"failed":vt.log("iceConnectionState is failed, closing connections to "+e),this.connection.emitError(rc.NegotiationFailed,"Negotiation of connection to "+e+" failed."),this.connection.close();break;case"closed":vt.log("iceConnectionState is closed, closing connections to "+e),this.connection.emitError(rc.ConnectionClosed,"Connection to "+e+" closed."),this.connection.close();break;case"disconnected":vt.log("iceConnectionState changed to disconnected on the connection with "+e);break;case"completed":t.onicecandidate=()=>{};break}this.connection.emit("iceStateChanged",t.iceConnectionState)},vt.log("Listening for data channel"),t.ondatachannel=o=>{vt.log("Received data channel");const a=o.channel;r.getConnection(e,n)._initializeDataChannel(a)},vt.log("Listening for remote stream"),t.ontrack=o=>{vt.log("Received remote stream");const a=o.streams[0],c=r.getConnection(e,n);if(c.type===Jn.Media){const l=c;this._addStreamToMediaConnection(a,l)}}}cleanup(){vt.log("Cleaning up PeerConnection to "+this.connection.peer);const t=this.connection.peerConnection;if(!t)return;this.connection.peerConnection=null,t.onicecandidate=t.oniceconnectionstatechange=t.ondatachannel=t.ontrack=()=>{};const e=t.signalingState!=="closed";let n=!1;const s=this.connection.dataChannel;s&&(n=!!s.readyState&&s.readyState!=="closed"),(e||n)&&t.close()}async _makeOffer(){const t=this.connection.peerConnection,e=this.connection.provider;try{const n=await t.createOffer(this.connection.options.constraints);vt.log("Created offer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(n.sdp=this.connection.options.sdpTransform(n.sdp)||n.sdp);try{await t.setLocalDescription(n),vt.log("Set localDescription:",n,`for:${this.connection.peer}`);let s={sdp:n,type:this.connection.type,connectionId:this.connection.connectionId,metadata:this.connection.metadata};if(this.connection.type===Jn.Data){const r=this.connection;s={...s,label:r.label,reliable:r.reliable,serialization:r.serialization}}e.socket.send({type:Re.Offer,payload:s,dst:this.connection.peer})}catch(s){s!="OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer"&&(e.emitError(pe.WebRTC,s),vt.log("Failed to setLocalDescription, ",s))}}catch(n){e.emitError(pe.WebRTC,n),vt.log("Failed to createOffer, ",n)}}async _makeAnswer(){const t=this.connection.peerConnection,e=this.connection.provider;try{const n=await t.createAnswer();vt.log("Created answer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(n.sdp=this.connection.options.sdpTransform(n.sdp)||n.sdp);try{await t.setLocalDescription(n),vt.log("Set localDescription:",n,`for:${this.connection.peer}`),e.socket.send({type:Re.Answer,payload:{sdp:n,type:this.connection.type,connectionId:this.connection.connectionId},dst:this.connection.peer})}catch(s){e.emitError(pe.WebRTC,s),vt.log("Failed to setLocalDescription, ",s)}}catch(n){e.emitError(pe.WebRTC,n),vt.log("Failed to create answer, ",n)}}async handleSDP(t,e){e=new RTCSessionDescription(e);const n=this.connection.peerConnection,s=this.connection.provider;vt.log("Setting remote description",e);const r=this;try{await n.setRemoteDescription(e),vt.log(`Set remoteDescription:${t} for:${this.connection.peer}`),t==="OFFER"&&await r._makeAnswer()}catch(o){s.emitError(pe.WebRTC,o),vt.log("Failed to setRemoteDescription, ",o)}}async handleCandidate(t){vt.log("handleCandidate:",t);try{await this.connection.peerConnection.addIceCandidate(t),vt.log(`Added ICE candidate for:${this.connection.peer}`)}catch(e){this.connection.provider.emitError(pe.WebRTC,e),vt.log("Failed to handleCandidate, ",e)}}_addTracksToConnection(t,e){if(vt.log(`add tracks from stream ${t.id} to peer connection`),!e.addTrack)return vt.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");t.getTracks().forEach(n=>{e.addTrack(n,t)})}_addStreamToMediaConnection(t,e){vt.log(`add stream ${t.id} to media connection ${e.connectionId}`),e.addStream(t)}}class Uf extends kc.EventEmitter{emitError(t,e){vt.error("Error:",e),this.emit("error",new iy(`${t}`,e))}}class iy extends Error{constructor(t,e){typeof e=="string"?super(e):(super(),Object.assign(this,e)),this.type=t}}class Nf extends Uf{get open(){return this._open}constructor(t,e,n){super(),this.peer=t,this.provider=e,this.options=n,this._open=!1,this.metadata=n.metadata}}var uc;const Ps=class Ps extends Nf{get type(){return Jn.Media}get localStream(){return this._localStream}get remoteStream(){return this._remoteStream}constructor(t,e,n){super(t,e,n),this._localStream=this.options._stream,this.connectionId=this.options.connectionId||Ps.ID_PREFIX+ze.randomToken(),this._negotiator=new Df(this),this._localStream&&this._negotiator.startConnection({_stream:this._localStream,originator:!0})}_initializeDataChannel(t){this.dataChannel=t,this.dataChannel.onopen=()=>{vt.log(`DC#${this.connectionId} dc connection success`),this.emit("willCloseOnRemote")},this.dataChannel.onclose=()=>{vt.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}addStream(t){vt.log("Receiving stream",t),this._remoteStream=t,super.emit("stream",t)}handleMessage(t){const e=t.type,n=t.payload;switch(t.type){case Re.Answer:this._negotiator.handleSDP(e,n.sdp),this._open=!0;break;case Re.Candidate:this._negotiator.handleCandidate(n.candidate);break;default:vt.warn(`Unrecognized message type:${e} from peer:${this.peer}`);break}}answer(t,e={}){if(this._localStream){vt.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");return}this._localStream=t,e&&e.sdpTransform&&(this.options.sdpTransform=e.sdpTransform),this._negotiator.startConnection({...this.options._payload,_stream:t});const n=this.provider._getMessages(this.connectionId);for(const s of n)this.handleMessage(s);this._open=!0}close(){this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this._localStream=null,this._remoteStream=null,this.provider&&(this.provider._removeConnection(this),this.provider=null),this.options&&this.options._stream&&(this.options._stream=null),this.open&&(this._open=!1,super.emit("close"))}};uc=new WeakMap,fs(Ps,uc,Ps.ID_PREFIX="mc_");let eo=Ps;class sy{constructor(t){this._options=t}_buildRequest(t){const e=this._options.secure?"https":"http",{host:n,port:s,path:r,key:o}=this._options,a=new URL(`${e}://${n}:${s}${r}${o}/${t}`);return a.searchParams.set("ts",`${Date.now()}${Math.random()}`),a.searchParams.set("version",If),fetch(a.href,{referrerPolicy:this._options.referrerPolicy})}async retrieveId(){try{const t=await this._buildRequest("id");if(t.status!==200)throw new Error(`Error. Status:${t.status}`);return t.text()}catch(t){vt.error("Error retrieving ID",t);let e="";throw this._options.path==="/"&&this._options.host!==ze.CLOUD_HOST&&(e=" If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."),new Error("Could not get an ID from the server."+e)}}async listAllPeers(){try{const t=await this._buildRequest("peers");if(t.status!==200){if(t.status===401){let e="";throw this._options.host===ze.CLOUD_HOST?e="It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key.":e="You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.",new Error("It doesn't look like you have permission to list peers IDs. "+e)}throw new Error(`Error. Status:${t.status}`)}return t.json()}catch(t){throw vt.error("Error retrieving list peers",t),new Error("Could not get list peers from the server."+t)}}}var fc,dc;const pi=class pi extends Nf{get type(){return Jn.Data}constructor(t,e,n){super(t,e,n),this.connectionId=this.options.connectionId||pi.ID_PREFIX+Pf(),this.label=this.options.label||this.connectionId,this.reliable=!!this.options.reliable,this._negotiator=new Df(this),this._negotiator.startConnection(this.options._payload||{originator:!0,reliable:this.reliable})}_initializeDataChannel(t){this.dataChannel=t,this.dataChannel.onopen=()=>{vt.log(`DC#${this.connectionId} dc connection success`),this._open=!0,this.emit("open")},this.dataChannel.onmessage=e=>{vt.log(`DC#${this.connectionId} dc onmessage:`,e.data)},this.dataChannel.onclose=()=>{vt.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}close(t){if(t!=null&&t.flush){this.send({__peerData:{type:"close"}});return}this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this.provider&&(this.provider._removeConnection(this),this.provider=null),this.dataChannel&&(this.dataChannel.onopen=null,this.dataChannel.onmessage=null,this.dataChannel.onclose=null,this.dataChannel=null),this.open&&(this._open=!1,super.emit("close"))}send(t,e=!1){if(!this.open){this.emitError(zc.NotOpenYet,"Connection is not open. You should listen for the `open` event before sending messages.");return}return this._send(t,e)}async handleMessage(t){const e=t.payload;switch(t.type){case Re.Answer:await this._negotiator.handleSDP(t.type,e.sdp);break;case Re.Candidate:await this._negotiator.handleCandidate(e.candidate);break;default:vt.warn("Unrecognized message type:",t.type,"from peer:",this.peer);break}}};fc=new WeakMap,dc=new WeakMap,fs(pi,fc,pi.ID_PREFIX="dc_"),fs(pi,dc,pi.MAX_BUFFERED_AMOUNT=8388608);let no=pi;class Hc extends no{get bufferSize(){return this._bufferSize}_initializeDataChannel(t){super._initializeDataChannel(t),this.dataChannel.binaryType="arraybuffer",this.dataChannel.addEventListener("message",e=>this._handleDataMessage(e))}_bufferedSend(t){(this._buffering||!this._trySend(t))&&(this._buffer.push(t),this._bufferSize=this._buffer.length)}_trySend(t){if(!this.open)return!1;if(this.dataChannel.bufferedAmount>no.MAX_BUFFERED_AMOUNT)return this._buffering=!0,setTimeout(()=>{this._buffering=!1,this._tryBuffer()},50),!1;try{this.dataChannel.send(t)}catch(e){return vt.error(`DC#:${this.connectionId} Error when sending:`,e),this._buffering=!0,this.close(),!1}return!0}_tryBuffer(){if(!this.open||this._buffer.length===0)return;const t=this._buffer[0];this._trySend(t)&&(this._buffer.shift(),this._bufferSize=this._buffer.length,this._tryBuffer())}close(t){if(t!=null&&t.flush){this.send({__peerData:{type:"close"}});return}this._buffer=[],this._bufferSize=0,super.close()}constructor(...t){super(...t),this._buffer=[],this._bufferSize=0,this._buffering=!1}}class sa extends Hc{close(t){super.close(t),this._chunkedData={}}constructor(t,e,n){super(t,e,n),this.chunker=new Rf,this.serialization=go.Binary,this._chunkedData={}}_handleDataMessage({data:t}){const e=qu(t),n=e.__peerData;if(n){if(n.type==="close"){this.close();return}this._handleChunk(e);return}this.emit("data",e)}_handleChunk(t){const e=t.__peerData,n=this._chunkedData[e]||{data:[],count:0,total:t.total};if(n.data[t.n]=new Uint8Array(t.data),n.count++,this._chunkedData[e]=n,n.total===n.count){delete this._chunkedData[e];const s=jx(n.data);this._handleDataMessage({data:s})}}_send(t,e){const n=Yu(t);if(n instanceof Promise)return this._send_blob(n);if(!e&&n.byteLength>this.chunker.chunkedMTU){this._sendChunks(n);return}this._bufferedSend(n)}async _send_blob(t){const e=await t;if(e.byteLength>this.chunker.chunkedMTU){this._sendChunks(e);return}this._bufferedSend(e)}_sendChunks(t){const e=this.chunker.chunk(t);vt.log(`DC#${this.connectionId} Try to send ${e.length} chunks...`);for(const n of e)this.send(n,!0)}}class ry extends Hc{_handleDataMessage({data:t}){super.emit("data",t)}_send(t,e){this._bufferedSend(t)}constructor(...t){super(...t),this.serialization=go.None}}class oy extends Hc{_handleDataMessage({data:t}){const e=this.parse(this.decoder.decode(t)),n=e.__peerData;if(n&&n.type==="close"){this.close();return}this.emit("data",e)}_send(t,e){const n=this.encoder.encode(this.stringify(t));if(n.byteLength>=ze.chunkedMTU){this.emitError(zc.MessageToBig,"Message too big for JSON channel");return}this._bufferedSend(n)}constructor(...t){super(...t),this.serialization=go.JSON,this.encoder=new TextEncoder,this.decoder=new TextDecoder,this.stringify=JSON.stringify,this.parse=JSON.parse}}var pc;const Ls=class Ls extends Uf{get id(){return this._id}get options(){return this._options}get open(){return this._open}get socket(){return this._socket}get connections(){const t=Object.create(null);for(const[e,n]of this._connections)t[e]=n;return t}get destroyed(){return this._destroyed}get disconnected(){return this._disconnected}constructor(t,e){super(),this._serializers={raw:ry,json:oy,binary:sa,"binary-utf8":sa,default:sa},this._id=null,this._lastServerId=null,this._destroyed=!1,this._disconnected=!1,this._open=!1,this._connections=new Map,this._lostMessages=new Map;let n;if(t&&t.constructor==Object?e=t:t&&(n=t.toString()),e={debug:0,host:ze.CLOUD_HOST,port:ze.CLOUD_PORT,path:"/",key:Ls.DEFAULT_KEY,token:ze.randomToken(),config:ze.defaultConfig,referrerPolicy:"strict-origin-when-cross-origin",serializers:{},...e},this._options=e,this._serializers={...this._serializers,...this.options.serializers},this._options.host==="/"&&(this._options.host=window.location.hostname),this._options.path&&(this._options.path[0]!=="/"&&(this._options.path="/"+this._options.path),this._options.path[this._options.path.length-1]!=="/"&&(this._options.path+="/")),this._options.secure===void 0&&this._options.host!==ze.CLOUD_HOST?this._options.secure=ze.isSecure():this._options.host==ze.CLOUD_HOST&&(this._options.secure=!0),this._options.logFunction&&vt.setLogFunction(this._options.logFunction),vt.logLevel=this._options.debug||0,this._api=new sy(e),this._socket=this._createServerConnection(),!ze.supports.audioVideo&&!ze.supports.data){this._delayedAbort(pe.BrowserIncompatible,"The current browser does not support WebRTC");return}if(n&&!ze.validateId(n)){this._delayedAbort(pe.InvalidID,`ID "${n}" is invalid`);return}n?this._initialize(n):this._api.retrieveId().then(s=>this._initialize(s)).catch(s=>this._abort(pe.ServerError,s))}_createServerConnection(){const t=new ny(this._options.secure,this._options.host,this._options.port,this._options.path,this._options.key,this._options.pingInterval);return t.on(Yn.Message,e=>{this._handleMessage(e)}),t.on(Yn.Error,e=>{this._abort(pe.SocketError,e)}),t.on(Yn.Disconnected,()=>{this.disconnected||(this.emitError(pe.Network,"Lost connection to server."),this.disconnect())}),t.on(Yn.Close,()=>{this.disconnected||this._abort(pe.SocketClosed,"Underlying socket is already closed.")}),t}_initialize(t){this._id=t,this.socket.start(t,this._options.token)}_handleMessage(t){const e=t.type,n=t.payload,s=t.src;switch(e){case Re.Open:this._lastServerId=this.id,this._open=!0,this.emit("open",this.id);break;case Re.Error:this._abort(pe.ServerError,n.msg);break;case Re.IdTaken:this._abort(pe.UnavailableID,`ID "${this.id}" is taken`);break;case Re.InvalidKey:this._abort(pe.InvalidKey,`API KEY "${this._options.key}" is invalid`);break;case Re.Leave:vt.log(`Received leave message from ${s}`),this._cleanupPeer(s),this._connections.delete(s);break;case Re.Expire:this.emitError(pe.PeerUnavailable,`Could not connect to peer ${s}`);break;case Re.Offer:{const r=n.connectionId;let o=this.getConnection(s,r);if(o&&(o.close(),vt.warn(`Offer received for existing Connection ID:${r}`)),n.type===Jn.Media){const c=new eo(s,this,{connectionId:r,_payload:n,metadata:n.metadata});o=c,this._addConnection(s,o),this.emit("call",c)}else if(n.type===Jn.Data){const c=new this._serializers[n.serialization](s,this,{connectionId:r,_payload:n,metadata:n.metadata,label:n.label,serialization:n.serialization,reliable:n.reliable});o=c,this._addConnection(s,o),this.emit("connection",c)}else{vt.warn(`Received malformed connection type:${n.type}`);return}const a=this._getMessages(r);for(const c of a)o.handleMessage(c);break}default:{if(!n){vt.warn(`You received a malformed message from ${s} of type ${e}`);return}const r=n.connectionId,o=this.getConnection(s,r);o&&o.peerConnection?o.handleMessage(t):r?this._storeMessage(r,t):vt.warn("You received an unrecognized message:",t);break}}}_storeMessage(t,e){this._lostMessages.has(t)||this._lostMessages.set(t,[]),this._lostMessages.get(t).push(e)}_getMessages(t){const e=this._lostMessages.get(t);return e?(this._lostMessages.delete(t),e):[]}connect(t,e={}){if(e={serialization:"default",...e},this.disconnected){vt.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available."),this.emitError(pe.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}const n=new this._serializers[e.serialization](t,this,e);return this._addConnection(t,n),n}call(t,e,n={}){if(this.disconnected){vt.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect."),this.emitError(pe.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}if(!e){vt.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");return}const s=new eo(t,this,{...n,_stream:e});return this._addConnection(t,s),s}_addConnection(t,e){vt.log(`add connection ${e.type}:${e.connectionId} to peerId:${t}`),this._connections.has(t)||this._connections.set(t,[]),this._connections.get(t).push(e)}_removeConnection(t){const e=this._connections.get(t.peer);if(e){const n=e.indexOf(t);n!==-1&&e.splice(n,1)}this._lostMessages.delete(t.connectionId)}getConnection(t,e){const n=this._connections.get(t);if(!n)return null;for(const s of n)if(s.connectionId===e)return s;return null}_delayedAbort(t,e){setTimeout(()=>{this._abort(t,e)},0)}_abort(t,e){vt.error("Aborting!"),this.emitError(t,e),this._lastServerId?this.disconnect():this.destroy()}destroy(){this.destroyed||(vt.log(`Destroy peer with ID:${this.id}`),this.disconnect(),this._cleanup(),this._destroyed=!0,this.emit("close"))}_cleanup(){for(const t of this._connections.keys())this._cleanupPeer(t),this._connections.delete(t);this.socket.removeAllListeners()}_cleanupPeer(t){const e=this._connections.get(t);if(e)for(const n of e)n.close()}disconnect(){if(this.disconnected)return;const t=this.id;vt.log(`Disconnect peer with ID:${t}`),this._disconnected=!0,this._open=!1,this.socket.close(),this._lastServerId=t,this._id=null,this.emit("disconnected",t)}reconnect(){if(this.disconnected&&!this.destroyed)vt.log(`Attempting reconnection to server with ID ${this._lastServerId}`),this._disconnected=!1,this._initialize(this._lastServerId);else{if(this.destroyed)throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");if(!this.disconnected&&!this.open)vt.error("In a hurry? We're still trying to make the initial connection!");else throw new Error(`Peer ${this.id} cannot reconnect because it is not disconnected from the server!`)}}listAllPeers(t=e=>{}){this._api.listAllPeers().then(e=>t(e)).catch(e=>this._abort(pe.ServerError,e))}};pc=new WeakMap,fs(Ls,pc,Ls.DEFAULT_KEY="peerjs");let io=Ls;const Ff="lucky-smash-v1-",Bh="ABCDEFGHJKLMNPQRSTUVWXYZ23456789",ay=8;function cy(){let i="";for(let t=0;t<5;t++)i+=Bh[Math.floor(Math.random()*Bh.length)];return i}function Of(i){const t=i instanceof Error?i.message:String(i);return t.includes("Could not connect to peer")||t.includes("peer-unavailable")?"ルームが見つかりませんでした。コードを確認してください。":t.includes("unavailable-id")?"このコードは使用中です。もう一度お試しください。":t.includes("network")||t.includes("server")?"シグナリングサーバーに接続できません。ネット接続を確認してください。":t}class ly{constructor(){R(this,"peer",null);R(this,"conns",new Map);R(this,"closed",!1);R(this,"onJoin",()=>{});R(this,"onLeave",()=>{});R(this,"onData",()=>{});R(this,"onFatal",()=>{})}start(t,e){const n=new io(Ff+t);this.peer=n,n.on("open",()=>e()),n.on("connection",s=>{s.on("open",()=>{if(this.conns.size>=ay-1){s.close();return}this.conns.set(s.peer,s),s.on("data",r=>this.onData(s.peer,r)),s.on("close",()=>this.drop(s.peer)),s.on("error",()=>this.drop(s.peer)),this.onJoin(s.peer)})}),n.on("error",s=>{(s.type??"")!=="peer-unavailable"&&(this.closed||(this.closed=!0,this.onFatal(Of(s))))}),n.on("disconnected",()=>n.reconnect())}drop(t){this.conns.delete(t)&&this.onLeave(t)}get memberIds(){return[...this.conns.keys()]}send(t,e){const n=this.conns.get(t);n!=null&&n.open&&n.send(e)}broadcast(t){for(const e of this.conns.values())e.open&&e.send(t)}destroy(){var t;this.closed=!0;try{for(const e of this.conns.values())e.close();(t=this.peer)==null||t.destroy()}catch{}this.conns.clear(),this.peer=null}}class hy{constructor(){R(this,"peer",null);R(this,"conn",null);R(this,"closed",!1);R(this,"myId","");R(this,"onData",()=>{});R(this,"onOpen",()=>{});R(this,"onClose",()=>{})}join(t){const e=new io;this.peer=e,e.on("open",n=>{this.myId=n;const s=e.connect(Ff+t,{reliable:!0});this.conn=s,s.on("open",()=>this.onOpen()),s.on("data",r=>this.onData(r)),s.on("close",()=>this.fail(new Error("ホストとの接続が切れました"))),s.on("error",r=>this.fail(r))}),e.on("error",n=>this.fail(n))}fail(t){this.closed||(this.closed=!0,this.onClose(Of(t)),this.destroy())}send(t){var e;(e=this.conn)!=null&&e.open&&this.conn.send(t)}destroy(){var t,e;this.closed=!0;try{(t=this.conn)==null||t.close(),(e=this.peer)==null||e.destroy()}catch{}this.conn=null,this.peer=null}}const $t=i=>document.getElementById(i),uy=100,fy=30,dy=20,kh=50,py=[0,10,30,50,100],my=[10,30,50,100];function Bf(i,t,e){$t("lobby-code").textContent=e.code,$t("lobby-group").textContent=`グループ: ${e.group}`,$t("lobby-banner").textContent=e.banner,$t("lobby-host-controls").hidden=!e.isHost,$t("lobby-guest-hint").hidden=e.isHost;const n=$t("lobby-rows");n.innerHTML="";for(const s of i){const r=document.createElement("tr"),o=["tag","","pts","tag","adj"].map(a=>{const c=document.createElement("td");return a&&(c.className=a),r.appendChild(c),c});if(o[0].textContent=s.id===t?"👑":"",o[1].textContent=s.name,o[2].textContent=String(s.pts),o[3].textContent=`${s.wins}勝${s.losses}敗`,e.onAdjust)for(const a of[-10,10]){const c=document.createElement("button");c.className="pts-btn",c.dataset.name=s.name,c.dataset.delta=String(a),c.textContent=a>0?"＋":"－",c.onclick=()=>{var l;return(l=e.onAdjust)==null?void 0:l.call(e,s.name,a)},o[4].appendChild(c)}n.appendChild(r)}if(e.isHost){const s=i.length>=2;$t("btn-start-match").disabled=!s,$t("btn-roulette-penalty").disabled=!s,$t("btn-roulette-reward").disabled=!s}}function _i(i){$t("lobby").hidden=!i}let fn={target:null,amount:null},zh="";function Pn(i,t){const e=$t("bet-panel");if(!i||!t){e.hidden=!0;return}const n=i.ids.join("|");n!==zh&&(zh=n,fn={target:null,amount:null}),e.hidden=!1,$t("lobby-host-controls").hidden=!0,$t("lobby-guest-hint").hidden=!0;const s=i.gamesToWin===0?"1ポイント勝負":`${i.gamesToWin}ゲーム先取`;$t("bet-matchup").textContent=`${i.names[0]} 🆚 ${i.names[1]}（${s}）`;const r=i.ids.indexOf(t.myId),o=r===0||r===1;if($t("bet-my").hidden=!o,$t("bet-predict").hidden=o,o){const u=$t("bet-chips");u.innerHTML="";for(const f of py){const d=document.createElement("button");d.className="chip"+(i.stakes[r]===f?" sel":""),d.textContent=`${f}pt`,d.disabled=f>t.myPts,d.onclick=()=>t.onBet(f),u.appendChild(d)}}else{const u=$t("predict-p0"),f=$t("predict-p1");u.textContent=`🎾 ${i.names[0]}`,f.textContent=`🎾 ${i.names[1]}`,u.className="btn"+(fn.target===0?" sel":""),f.className="btn"+(fn.target===1?" sel":"");const d=_=>{fn.target=_,fn.amount!==null?t.onPredict(_,fn.amount):Pn(i,t)};u.onclick=()=>d(0),f.onclick=()=>d(1);const g=$t("predict-chips");g.innerHTML="";for(const _ of my){const m=document.createElement("button");m.className="chip"+(fn.amount===_?" sel":""),m.textContent=`${_}pt`,m.disabled=_>t.myPts||fn.target===null,m.onclick=()=>{fn.amount=_,t.onPredict(fn.target,_)},g.appendChild(m)}}const[a,c]=i.stakes;$t("bet-stake-line").textContent=a!==null&&c!==null?`💰 賭け金 ${Math.min(a,c)}pt — 勝者総取り！`:"両者の賭け待ち…";const l=i.names.map((u,f)=>`${u} ${i.stakes[f]===null?"…":"✓"}`),h=i.predictions.length?`　予想: ${i.predictions.map(u=>`${u.name}→${i.names[u.target]} ${u.amount}pt`).join(" / ")}`:"";if($t("bet-status").textContent=`賭け: ${l.join(" ／ ")}${h}`,$t("bet-host-controls").hidden=!t.isHost,t.isHost){const u=$t("btn-bet-start");u.disabled=a===null||c===null,u.onclick=()=>{var f;return(f=t.onStart)==null?void 0:f.call(t)},$t("btn-bet-cancel").onclick=()=>{var f;return(f=t.onCancel)==null?void 0:f.call(t)}}}function so(i,t){const e=i.map(a=>t==="reward"?a.pts+kh:1/(a.pts+kh)),n=e.reduce((a,c)=>a+c,0),s=i.map((a,c)=>({name:a.name,pct:e[c]/n*100}));let r=Math.random()*n,o=0;for(let a=0;a<e.length;a++)if(r-=e[a],r<=0){o=a;break}return{entries:s,winner:o}}class gy{constructor(t,e,n){R(this,"net",new ly);R(this,"roulette");R(this,"members",new Map);R(this,"rotation",[]);R(this,"championId",null);R(this,"game",null);R(this,"currentIds",null);R(this,"code",cy());R(this,"banner","メンバーの参加を待っています");R(this,"destroyed",!1);R(this,"betting",null);R(this,"bettingRestore",[]);R(this,"predictionsById",new Map);R(this,"currentStake",0);R(this,"currentGamesToWin",2);R(this,"matchSettled",!1);R(this,"ledger");R(this,"onEnd",()=>{});this.roulette=n,this.ledger=e,this.members.set("host",{id:"host",name:t,pts:0,wins:0,losses:0}),this.rotation.push("host"),this.ledger.ensureMember(t).then(s=>{const r=this.members.get("host");r&&!this.destroyed&&(Object.assign(r,s),this.refreshLobby())}),this.net.onData=(s,r)=>this.onData(s,r),this.net.onLeave=s=>void this.removeMember(s),this.net.onFatal=s=>{this.destroy(),this.onEnd(s)},$t("lobby-code").textContent="接続中…",_i(!0),this.net.start(this.code,()=>this.refreshLobby()),$t("btn-start-match").onclick=()=>this.openBetting(),$t("btn-roulette-penalty").onclick=()=>this.spinRoulette("penalty"),$t("btn-roulette-reward").onclick=()=>this.spinRoulette("reward"),$t("btn-reset-pts").onclick=()=>void this.resetAllPoints(),$t("btn-lobby-leave").onclick=()=>{this.destroy(),this.onEnd()}}get ledgerRef(){return Fc(this.ledger.ref)?this.ledger.ref:null}get historyRef(){return this.ledger.ref}get memberList(){return[...this.members.values()]}gamesToWin(){const t=Number($t("games-select").value);return Number.isFinite(t)&&t>=0?t:2}lobbyMsg(){return{t:"lobby",code:this.code,group:this.ledger.ref.name,ledger:this.ledgerRef,members:this.memberList,championId:this.championId,gamesToWin:this.gamesToWin(),banner:this.banner}}refreshLobby(){Bf(this.memberList,this.championId,{code:this.code,group:this.ledger.ref.name,banner:this.banner,isHost:!0}),this.betting?this.renderBet():Pn(null),this.net.broadcast(this.lobbyMsg())}onData(t,e){if(e.t==="hello"){this.addMember(t,e.name);return}if(e.t==="bet"){this.setBet(t,e.amount);return}if(e.t==="predict"){this.setPredict(t,e.target,e.amount);return}if(this.game&&this.currentIds){const n=this.currentIds.indexOf(t);(n===0||n===1)&&this.game.applyRemoteInput(n,e)}}async addMember(t,e){let n=e.trim().slice(0,8)||"ゲスト";const s=new Set(this.memberList.map(l=>l.name));let r=2;const o=n;for(;s.has(n);)n=`${o}${r++}`;this.members.set(t,{id:t,name:n,pts:0,wins:0,losses:0}),this.rotation.push(t),this.banner=`${n} さんが参加しました`,this.refreshLobby();const a=await this.ledger.ensureMember(n),c=this.members.get(t);if(c&&!this.destroyed&&(Object.assign(c,a),a.wins+a.losses===0&&a.pts===100&&(this.banner=`${n} さんが参加しました（🎁 参加ボーナス +100pt）`),this.refreshLobby()),this.betting&&this.net.send(t,{t:"betting",st:this.betting}),this.game&&this.currentIds){const l=this.members.get(this.currentIds[0]),h=this.members.get(this.currentIds[1]);l&&h&&this.net.send(t,{t:"match",ids:this.currentIds,names:[l.name,h.name],gamesToWin:this.currentGamesToWin})}}async removeMember(t){var s,r;const e=this.members.get(t);if(!e)return;let n=!1;if((s=this.currentIds)!=null&&s.includes(t)&&!this.matchSettled){const o=this.currentIds[0]===t?1:0;await this.onMatchOver(o,((r=this.game)==null?void 0:r.authScore())??to(0),!0),n=!0}this.members.delete(t),this.rotation=this.rotation.filter(o=>o!==t),this.championId===t&&(this.championId=null),this.banner=n?`🚪 ${e.name} さんが途中退出（棄権負け）／ ${this.banner}`:`${e.name} さんが退出しました`,this.betting&&(this.betting.ids.includes(t)?this.cancelBetting(`${e.name} さんが退出したためベットを中止しました`):this.predictionsById.delete(t)&&this.syncPredictions()),this.refreshLobby()}openBetting(){if(this.game||this.betting||this.members.size<2)return;let t,e=!1;this.championId&&this.members.has(this.championId)?t=this.championId:(t=this.rotation.shift(),e=!0),this.rotation=this.rotation.filter(s=>s!==t);const n=this.rotation.shift();if(!n){e&&this.rotation.unshift(t);return}this.bettingRestore=e?[t,n]:[n],this.predictionsById.clear(),this.currentGamesToWin=this.gamesToWin(),this.betting={ids:[t,n],names:[this.members.get(t).name,this.members.get(n).name],gamesToWin:this.currentGamesToWin,stakes:[null,null],predictions:[]},this.banner="対戦前ベット受付中！",this.refreshLobby(),this.refreshBetting()}renderBet(){const t=this.members.get("host");Pn(this.betting,{myId:"host",isHost:!0,myPts:t?t.pts:0,onBet:e=>this.setBet("host",e),onPredict:(e,n)=>this.setPredict("host",e,n),onStart:()=>this.launchMatch(),onCancel:()=>this.cancelBetting("ベットを中止しました")})}refreshBetting(){this.renderBet(),this.net.broadcast({t:"betting",st:this.betting})}setBet(t,e){const n=this.betting;if(!n)return;const s=n.ids.indexOf(t);if(s!==0&&s!==1)return;const r=this.members.get(t);r&&(n.stakes[s]=Math.max(0,Math.min(Math.round(e),r.pts)),this.refreshBetting())}setPredict(t,e,n){const s=this.betting;if(!s||s.ids.includes(t)||e!==0&&e!==1)return;const r=this.members.get(t);r&&(this.predictionsById.set(t,{target:e,amount:Math.max(0,Math.min(Math.round(n),r.pts))}),this.syncPredictions())}syncPredictions(){this.betting&&(this.betting.predictions=[...this.predictionsById.entries()].filter(([t])=>this.members.has(t)).map(([t,e])=>({name:this.members.get(t).name,target:e.target,amount:e.amount})),this.refreshBetting())}cancelBetting(t){this.betting&&(this.rotation.unshift(...this.bettingRestore),this.bettingRestore=[],this.betting=null,this.predictionsById.clear(),this.banner=t,this.net.broadcast({t:"betting",st:null}),this.refreshLobby())}launchMatch(){const t=this.betting;if(!t||this.game)return;const[e,n]=t.stakes;if(e===null||n===null)return;this.currentStake=Math.min(e,n),this.currentIds=t.ids,this.matchSettled=!1;const s=t.names,r=t.gamesToWin;this.betting=null,this.bettingRestore=[],Pn(null),this.net.broadcast({t:"betting",st:null}),this.net.broadcast({t:"match",ids:this.currentIds,names:s,gamesToWin:r}),_i(!1);const o=this.currentIds.indexOf("host");this.game=new Dc({authority:!0,playerIdx:o===0||o===1?o:null,names:s,gamesToWin:r,practice:!1,net:{send:()=>{},broadcast:a=>this.net.broadcast(a)},onMatchOver:(a,c)=>this.onMatchOver(a,c)})}async onMatchOver(t,e,n=!1){if(!this.currentIds||this.matchSettled)return;this.matchSettled=!0;const s=this.currentIds[t],r=this.currentIds[1-t],o=this.currentIds,a=this.members.get(s),c=this.members.get(r);if(window.setTimeout(()=>this.endMatch(),2e3),a&&c){const l=this.currentGamesToWin===0?fy:uy,h=e.games[1-t],u=this.currentStake,f=l+u,d=h*dy-u,g=u>0?`（賭け${u}pt込み）`:"",_=n?`${c.name}の途中棄権で勝利${g}`:`${c.name}に勝利${g}`,m=n?`途中棄権で${a.name}に敗北${g}`:`${a.name}に敗北${g}`;Object.assign(a,{id:s},await this.ledger.addResult(a.name,f,!0,_)),Object.assign(c,{id:r},await this.ledger.addResult(c.name,d,!1,m));let p=`🏆 ${a.name} の勝ち！ +${f}pt ／ ${c.name} ${d>=0?"+":""}${d}pt`+(u>0?`（賭け金 ${u}pt）`:"");const E=[];for(const[M,v]of this.predictionsById){const F=this.members.get(M);if(!F||v.amount<=0)continue;const C=o[v.target]===s,A=C?v.amount:-v.amount;Object.assign(F,{id:M},await this.ledger.adjustPoints(F.name,A,C?"勝敗予想が的中":"勝敗予想はずれ")),E.push(`${C?"🎯":"💧"}${F.name}${A>=0?"+":""}${A}`)}E.length&&(p+=` ／ 予想: ${E.join(" ")}`),this.banner=p,this.championId=s,this.rotation.push(r)}this.currentStake=0,this.predictionsById.clear(),!this.destroyed&&!this.game&&this.refreshLobby()}endMatch(){this.destroyed||(this.abortMatch(),this.refreshLobby())}abortMatch(){var t;(t=this.game)==null||t.dispose(),this.game=null,this.currentIds=null,this.currentStake=0,this.predictionsById.clear(),_i(!0)}spinRoulette(t){if(this.game||this.betting||this.members.size<2)return;const e=this.memberList,{entries:n,winner:s}=so(e,t);this.net.broadcast({t:"roulette",kind:t,entries:n,winner:s}),this.roulette.show(t,n,s)}async resetAllPoints(){await this.ledger.resetPoints(this.memberList.map(t=>t.name));for(const t of this.members.values())t.pts=0;this.banner="ポイントをリセットしました",this.refreshLobby()}destroy(){var t,e;if(!this.destroyed&&this.game&&((t=this.currentIds)!=null&&t.includes("host"))&&!this.matchSettled){const n=this.currentIds[0]==="host"?1:0;this.onMatchOver(n,this.game.authScore()??to(0),!0)}this.destroyed=!0,(e=this.game)==null||e.dispose(),this.game=null,this.betting=null,Pn(null),this.roulette.hide(),_i(!1),this.net.destroy()}}class _y{constructor(t,e,n){R(this,"net",new hy);R(this,"roulette");R(this,"game",null);R(this,"joined",!1);R(this,"destroyed",!1);R(this,"lastMembers",[]);R(this,"lastBetting",null);R(this,"historyRef",null);R(this,"onEnd",()=>{});R(this,"onJoined",()=>{});this.roulette=n,this.net.onOpen=()=>this.net.send({t:"hello",name:e}),this.net.onClose=s=>{this.destroy(),this.onEnd(s)},this.net.onData=s=>this.onData(s),this.net.join(t),$t("btn-lobby-leave").onclick=()=>{this.destroy(),this.onEnd()}}onData(t){var e,n,s;if(t.t==="s"){(e=this.game)==null||e.applySnapshot(t);return}if(t.t==="lobby"){this.joined||(this.joined=!0,this.onJoined()),(n=this.game)==null||n.dispose(),this.game=null,this.lastMembers=t.members,this.historyRef=t.ledger,t.ledger&&Ix(t.ledger),Bf(t.members,t.championId,{code:t.code,group:t.group,banner:t.banner,isHost:!1}),Pn(this.lastBetting,this.betCtx()),_i(!0);return}if(t.t==="betting"){this.lastBetting=t.st,Pn(t.st,this.betCtx()),t.st||($t("lobby-guest-hint").hidden=!1);return}if(t.t==="match"){this.lastBetting=null,Pn(null),_i(!1),(s=this.game)==null||s.dispose();const r=t.ids.indexOf(this.net.myId);this.game=new Dc({authority:!1,playerIdx:r===0||r===1?r:null,names:t.names,gamesToWin:t.gamesToWin,practice:!1,net:{send:o=>this.net.send(o),broadcast:()=>{}}});return}t.t==="roulette"&&this.roulette.show(t.kind,t.entries,t.winner)}betCtx(){const t=this.lastMembers.find(e=>e.id===this.net.myId);return{myId:this.net.myId,isHost:!1,myPts:t?t.pts:0,onBet:e=>this.net.send({t:"bet",amount:e}),onPredict:(e,n)=>this.net.send({t:"predict",target:e,amount:n})}}destroy(){var t;this.destroyed||(this.destroyed=!0,(t=this.game)==null||t.dispose(),this.game=null,this.lastBetting=null,Pn(null),this.roulette.hide(),_i(!1),this.net.destroy())}}const Pr=["#e8452c","#27b7e8","#ccff33","#f2a33c","#9d6bf2","#3ce8a0","#f25c9a","#5c7cf2"],Hh=28,$i=24,Wr=2.6,Ts=1.7,oc=.5,Lr=Wr+Ts+oc,Vh=.18,vy=.07;class xy{constructor(){R(this,"root",document.getElementById("roulette"));R(this,"canvas",document.getElementById("roulette-canvas"));R(this,"title",document.getElementById("roulette-title"));R(this,"resultEl",document.getElementById("roulette-result"));R(this,"pctEl",document.getElementById("roulette-pct"));R(this,"closeBtn",document.getElementById("roulette-close"));R(this,"flashEl",document.getElementById("roulette-flash"));R(this,"auraEl",document.getElementById("rl-aura"));R(this,"raysEl",document.getElementById("rl-rays"));R(this,"raf",0);R(this,"timers",[]);this.closeBtn.addEventListener("click",()=>this.hide())}show(t,e,n){this.hide(),this.root.hidden=!1,this.resultEl.textContent="",this.resultEl.className="",this.pctEl.textContent="",this.auraEl.className="",this.raysEl.className="",this.closeBtn.hidden=!0,this.title.textContent=t==="penalty"?"罰ゲームルーレット":"ご褒美ルーレット",this.title.className=t;const s=e.reduce((q,Q)=>q+Q.pct,0)||1,r=e.map(q=>q.pct/s*$i),o=r.map(q=>Math.max(1,Math.floor(q)));let a=$i-o.reduce((q,Q)=>q+Q,0);const c=r.map((q,Q)=>({i:Q,frac:q-Math.floor(q)})).sort((q,Q)=>Q.frac-q.frac);for(let q=0;a>0;q=(q+1)%c.length)o[c[q].i]++,a--;for(let q=c.length-1;a<0&&q>=0;q--)o[c[q].i]>1&&(o[c[q].i]--,a++),q===0&&a<0&&(q=c.length);const l=[],h=e.map(()=>0);for(let q=0;q<$i;q++){let Q=0,rt=-1/0;for(let xt=0;xt<e.length;xt++){if(h[xt]>=o[xt])continue;const Dt=o[xt]*(q+1)/$i-h[xt];Dt>rt&&(rt=Dt,Q=xt)}l.push(Q),h[Q]++}const u=Math.PI*2/$i,f=[];l.forEach((q,Q)=>{q===n&&f.push(Q)});const d=f[Math.floor(Math.random()*f.length)]??0,g=Math.random()<.5?.14+Math.random()*.14:.72+Math.random()*.14,_=d*u+u*g,m=Math.min(u*g,u*(1-g)),p=g<.5?-1:1,E=Math.min(m*2.6+.03,u*.95),M=document.getElementById("rl-legend");M.innerHTML="",e.forEach((q,Q)=>{const rt=document.createElement("span");rt.className="lg-chip";const xt=document.createElement("i");xt.className="lg-dot",xt.style.background=Pr[Q%Pr.length];const Dt=document.createElement("span");Dt.textContent=q.name;const $=document.createElement("span");$.className="lg-pct",$.textContent=`${q.pct.toFixed(0)}%・${o[Q]}枠`,rt.append(xt,Dt,$),M.appendChild(rt)});const F=Math.PI*2*4,C=9,A=Wr+Ts;let P=0,b=performance.now(),S=1,w=1,H=-1,B=0,V=!1,J=0;const W=[],tt=q=>{const Q=Math.PI*2;let rt=q%Q;return rt<0&&(rt+=Q),Math.min($i-1,Math.floor(rt/u))},G=q=>{var ne;const Q=Math.min(.05,(q-b)/1e3);b=q;const rt=Math.min(1,Math.max(0,(P-A)/oc)),xt=P>A&&P<Lr?Vh-(Vh-vy)*rt:1;P=Math.min(Lr,P+Q*xt);const Dt=P/Lr,$=F*(1-Math.pow(1-Dt,2.6)),et=Math.min(1,P/A);let pt=_+Math.PI*2*C*Math.pow(1-et,2.2);const ot=Math.min(1,Math.max(0,(P-Wr)/Ts));let Ct=1.06-.27*(1-Math.pow(1-ot,2)),Rt=0;P>A&&(Rt=(P-A)/oc,pt=_+p*E*Math.exp(-2.8*Rt)*Math.cos(Rt*Math.PI*2.5),Ct=.79+.045*Math.exp(-2.5*Rt)*Math.abs(Math.sin(Rt*Math.PI*2.5))),V||(P>A?w=3:w=1+1.4*Math.min(1,Math.max(0,(P-(Wr+Ts*.35))/(Ts*.65)))),S+=(w-S)*Math.min(1,Q*4.5);const Ot=tt(pt);if(Ot!==H&&(H!==-1&&!V&&He.rlTick(P>A?1:Dt),H=Ot),B=Math.max(0,B-.035),P>=Lr&&!V){V=!0,J=q,B=1,w=1.18;const zt=((ne=e[n])==null?void 0:ne.pct)??100,ie=zt<10?"tier-epic":zt<30?"tier-rare":"tier-common",D=ie==="tier-epic";this.auraEl.className=`${ie} on`;const Be=D?[60,260,430,570,690,800]:[80,330,560];for(const Ht of Be)this.timers.push(window.setTimeout(()=>He.rlHeart(),Ht));this.timers.push(window.setTimeout(()=>{var Gt;const Ht=((Gt=e[n])==null?void 0:Gt.name)??"?";this.resultEl.textContent=t==="penalty"?`💥 ${Ht} さんが罰ゲーム！`:`🎉 ${Ht} さんにご褒美！`,this.resultEl.className=D?`pop ${ie}`:"pop",this.pctEl.textContent=D?`当選確率 ${zt.toFixed(1)}% — ✨奇跡の引き！！✨`:`当選確率 ${zt.toFixed(1)}%`,this.raysEl.className=`${ie} on`,this.flashEl.className=D?`go epic ${t}`:`go ${t}`,t==="penalty"?He.rlThud():He.rlFanfare(),this.spawnConfetti(W,t),D&&(this.timers.push(window.setTimeout(()=>He.rlFanfare(),350)),this.timers.push(window.setTimeout(()=>this.spawnConfetti(W,t),500)),this.timers.push(window.setTimeout(()=>this.spawnConfetti(W,t),1e3))),this.timers.push(window.setTimeout(()=>this.closeBtn.hidden=!1,900))},D?950:600))}this.draw(l,$,{time:q,u:Dt,spotlight:P>A?H:-1,stopped:V,shake:B,particles:W,ballLocal:pt,ballR:Ct},S),(!V||W.length>0||q-J<4500)&&(this.raf=requestAnimationFrame(G))};this.raf=requestAnimationFrame(G)}spawnConfetti(t,e){const s=this.canvas.width/Math.min(window.devicePixelRatio,2),r=e==="penalty"?["#ff5050","#ff9f43","#f25c9a","#ffffff"]:["#ccff33","#ffd700","#3ce8a0","#ffffff","#27b7e8"];for(let o=0;o<110;o++){const a=-Math.PI/2+(Math.random()*2-1)*1.15,c=5+Math.random()*9;t.push({x:s/2,y:s/2,vx:Math.cos(a)*c,vy:Math.sin(a)*c-2,rot:Math.random()*Math.PI,vr:(Math.random()*2-1)*.3,color:r[Math.floor(Math.random()*r.length)],life:1.4+Math.random()*.8})}}draw(t,e,n,s){const r=this.canvas,o=Math.min(window.devicePixelRatio,2),a=Math.min(window.innerWidth,window.innerHeight)*.62;r.width=a*o,r.height=a*o,r.style.width=`${a}px`,r.style.height=`${a}px`;const c=r.getContext("2d");c.scale(o,o);const l=a/2,h=a/2,u=a/2-26,f=e+n.ballLocal,d=l+Math.cos(f)*u*n.ballR,g=h+Math.sin(f)*u*n.ballR;c.clearRect(0,0,a,a),c.save(),n.shake>0&&c.translate((Math.random()*2-1)*7*n.shake,(Math.random()*2-1)*7*n.shake),s>1.01&&(c.translate(l,h),c.scale(s,s),c.translate(-d,-g)),c.beginPath(),c.arc(l,h,u*1.12,0,Math.PI*2),c.fillStyle="#101a36",c.fill(),c.strokeStyle="#2a3a66",c.lineWidth=2,c.stroke();const _=Math.PI*2/t.length;for(let M=0;M<t.length;M++){const v=M*_+e,F=v+_,C=n.spotlight!==-1&&M!==n.spotlight;c.save(),c.globalAlpha=C?.34:1,!C&&n.spotlight===M&&(c.shadowColor="#ffffff",c.shadowBlur=22),c.beginPath(),c.moveTo(l,h),c.arc(l,h,u,v,F),c.closePath(),c.fillStyle=Pr[t[M]%Pr.length],c.fill(),c.shadowBlur=0,c.strokeStyle="#c8a23c",c.lineWidth=2,c.stroke();const A=v+_/2,P=u*.84;c.translate(l+Math.cos(A)*P,h+Math.sin(A)*P),c.rotate(A+Math.PI/2),c.fillStyle="#0d1220",c.textAlign="center",c.font=`800 ${Math.max(11,a*.032)}px system-ui, sans-serif`,c.fillText(String(M+1),0,0),c.restore()}c.beginPath(),c.arc(l,h,u*.55,0,Math.PI*2),c.strokeStyle="#c8a23c",c.lineWidth=2.5,c.stroke();for(let M=0;M<Hh;M++){const v=M/Hh*Math.PI*2;let F,C="#ffd76a";n.stopped?(F=Math.floor(n.time/75)%2===0,C="#ffd700"):n.u>.85?F=Math.floor(n.time/(150-90*((n.u-.85)/.15)))%2===0:F=(M+Math.floor(n.time/70))%4===0,c.beginPath(),c.arc(l+Math.cos(v)*(u*1.12+5),h+Math.sin(v)*(u*1.12+5),3.4,0,Math.PI*2),c.fillStyle=F?C:"#3a3f55",F&&(c.shadowColor=C,c.shadowBlur=8),c.fill(),c.shadowBlur=0}c.beginPath(),c.arc(l,h,u*.12,0,Math.PI*2),c.fillStyle="#eaf2ff",c.fill();const m=Math.max(5,a*.016);c.beginPath(),c.ellipse(d+m*.3,g+m*.5,m*.9,m*.5,0,0,Math.PI*2),c.fillStyle="rgba(0,0,0,0.35)",c.fill();const p=c.createRadialGradient(d-m*.35,g-m*.35,m*.15,d,g,m);p.addColorStop(0,"#ffffff"),p.addColorStop(.6,"#e8edf6"),p.addColorStop(1,"#9aa7bd"),c.beginPath(),c.arc(d,g,m,0,Math.PI*2),c.fillStyle=p,c.fill(),c.restore();const E=1/60;for(let M=n.particles.length-1;M>=0;M--){const v=n.particles[M];if(v.life-=E,v.life<=0){n.particles.splice(M,1);continue}v.vy+=.16,v.x+=v.vx,v.y+=v.vy,v.rot+=v.vr,c.save(),c.translate(v.x,v.y),c.rotate(v.rot),c.globalAlpha=Math.min(1,v.life),c.fillStyle=v.color,c.fillRect(-4,-2.5,8,5),c.restore()}}hide(){cancelAnimationFrame(this.raf);for(const e of this.timers)window.clearTimeout(e);this.timers=[],this.resultEl.className="",this.pctEl.textContent="",this.auraEl.className="",this.raysEl.className="",this.flashEl.className="";const t=document.getElementById("rl-legend");t&&(t.innerHTML=""),this.root.hidden=!0}}const st=i=>document.getElementById(i),_o=st("menu"),yy=st("menu-home"),Sy=st("menu-join"),My=st("menu-group"),by=st("menu-play"),Ey=st("menu-practice"),Ty=st("menu-manage"),Cy=st("menu-roulette"),Vc=st("menu-friends"),ac=st("group-select"),kf=st("group-input"),Gc=st("name-input"),rs=st("join-input"),os=st("join-status"),Wc=st("menu-toast"),Xc=new xy;let Ln=null,be=null,_e=null;Gc.value=Dx();zs()&&mc(()=>import("./friends-CnzVyoR-.js"),__vite__mapDeps([2,1]),import.meta.url).then(i=>i.FriendService.create(vo())).then(i=>{_e=i,st("friend-my-code").textContent=i.myCode}).catch(()=>{st("friend-status").textContent="フレンド機能に接続できませんでした"});window.addEventListener("pointerdown",()=>He.unlock(),{once:!0});{const i=st("btn-fullscreen"),t=document.documentElement,e=document,n=!!(t.requestFullscreen||t.webkitRequestFullscreen),s=()=>!!(e.fullscreenElement??e.webkitFullscreenElement);if(n){i.hidden=!1,i.addEventListener("click",async()=>{try{s()?await(e.exitFullscreen??e.webkitExitFullscreen).call(e):await(t.requestFullscreen??t.webkitRequestFullscreen).call(t)}catch{}});const r=()=>{const o=s();i.classList.toggle("active",o),i.title=o?"全画面をやめる":"全画面にする"};document.addEventListener("fullscreenchange",r),document.addEventListener("webkitfullscreenchange",r)}}function vo(){const i=Gc.value.trim().slice(0,8);return i&&Ux(i),i||"プレイヤー"}function Ee(i){yy.hidden=i!=="home",by.hidden=i!=="play",Sy.hidden=i!=="join",My.hidden=i!=="group",Ey.hidden=i!=="practice",Ty.hidden=i!=="manage",Cy.hidden=i!=="roulette",Vc.hidden=i!=="friends"}function $c(i){var n;const t=Fx(),e=(n=t[Number(i.value)])==null?void 0:n.id;return i.innerHTML="",t.forEach((s,r)=>{const o=document.createElement("option");o.value=String(r),o.textContent=Fc(s)?`☁️ ${s.name}`:`📁 ${s.name}（この端末のみ）`,s.id===e&&(o.selected=!0),i.appendChild(o)}),t}function ks(i){Ln==null||Ln.dispose(),Ln=null,be==null||be.destroy(),be=null,_e==null||_e.setRoom(null),_o.hidden=!1,Ee("home"),os.textContent="",Wc.textContent=i??""}st("btn-play").addEventListener("click",()=>Ee("play"));st("btn-play-back").addEventListener("click",()=>Ee("home"));st("btn-practice").addEventListener("click",()=>Ee("practice"));st("btn-practice-back").addEventListener("click",()=>Ee("play"));for(const i of[1,2,3])st(`btn-cpu-${i}`).addEventListener("click",()=>{var e;_o.hidden=!0,Wc.textContent="",(e=document.activeElement)==null||e.blur();const t=Number(st("practice-games").value);Ln=Mx(i,Number.isFinite(t)?t:2)});let cc=[];st("btn-create").addEventListener("click",()=>{cc=$c(ac);const i=document.createElement("option");i.value="new",i.textContent="＋ 新しいグループを作る",ac.appendChild(i),cc.length===0&&(i.selected=!0),kf.value="",Ee("group")});st("btn-group-go").addEventListener("click",()=>{const i=st("btn-group-go");i.disabled=!0,i.textContent="台帳に接続中…",(async()=>{const t=kf.value.trim().slice(0,12).replace(/[/\\]/g,""),e=cc[Number(ac.value)],n=t||!e?await Nx(t||Vu):await qs(e);_o.hidden=!0,Wc.textContent="";const s=new gy(vo(),n,Xc);be=s,_e==null||_e.setRoom(s.code),s.onEnd=r=>ks(r)})().finally(()=>{i.disabled=!1,i.textContent="このグループでルーム作成"})});st("btn-group-back").addEventListener("click",()=>Ee("play"));st("btn-join").addEventListener("click",()=>{Ee("join"),rs.value="",os.textContent="",rs.focus()});function zf(i){Ee("join"),rs.value=i,os.textContent="接続中…";const t=new _y(i,vo(),Xc);be=t,t.onJoined=()=>{_o.hidden=!0,os.textContent="",_e==null||_e.setRoom(i)},t.onEnd=e=>ks(e)}st("btn-join-go").addEventListener("click",()=>{const i=rs.value.trim().toUpperCase();if(i.length!==5){os.textContent="5文字のコードを入力してください";return}zf(i)});rs.addEventListener("keydown",i=>{i.key==="Enter"&&st("btn-join-go").click(),i.stopPropagation()});st("btn-join-back").addEventListener("click",()=>{be==null||be.destroy(),be=null,Ee("play")});const lc=st("manage-select");let ra=[];function Hf(i,t){if(i.innerHTML="",t.length===0){i.textContent="まだ履歴がありません",i.style.opacity="0.5";return}i.style.opacity="1";const e=new Intl.DateTimeFormat("ja-JP",{month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"});for(const n of t){const s=document.createElement("div");s.className="history-row";const r=document.createElement("span");r.className="h-time",r.textContent=e.format(new Date(n.t));const o=document.createElement("span");o.className="h-name",o.textContent=n.name;const a=document.createElement("span");a.className=`h-delta ${n.d>=0?"plus":"minus"}`,a.textContent=`${n.d>=0?"+":""}${n.d}`;const c=document.createElement("span");c.className="h-why",c.textContent=`${n.why}（→${n.after}pt）`,s.append(r,o,a,c),i.appendChild(s)}}async function ro(){ra=$c(lc);const i=st("manage-rows");i.innerHTML="";const t=st("manage-history"),e=ra[Number(lc.value)]??ra[0];if(st("manage-hint").textContent=e?"ポイントは ± で調整、🗑 でメンバーを削除できます":"まだデータがありません。パーティーで遊ぶとグループが作られます",!e){t.innerHTML="";return}t.textContent="読み込み中…";const n=await qs(e),[s,r]=await Promise.all([n.listMembers(),n.listHistory()]);Hf(t,r),i.innerHTML="";for(const o of s){const a=document.createElement("tr"),c=["","pts","tag","adj"].map(h=>{const u=document.createElement("td");return h&&(u.className=h),a.appendChild(u),u});c[0].textContent=o.name,c[1].textContent=String(o.pts),c[2].textContent=`${o.wins}勝${o.losses}敗`;for(const h of[-10,10]){const u=document.createElement("button");u.className="pts-btn",u.textContent=h>0?"＋":"－",u.onclick=()=>{n.adjustPoints(o.name,h,"手動調整").then(()=>ro())},c[3].appendChild(u)}const l=document.createElement("button");l.className="pts-btn",l.textContent="🗑",l.onclick=()=>{confirm(`${o.name} を「${e.name}」から削除しますか？`)&&n.removeMember(o.name).then(()=>ro())},c[3].appendChild(l),i.appendChild(a)}}st("btn-manage").addEventListener("click",()=>{Ee("manage"),ro()});lc.addEventListener("change",()=>void ro());st("btn-manage-back").addEventListener("click",()=>Ee("home"));const oo=st("solo-group-select");let Rs=[];async function Vf(){Rs=$c(oo);const i=Rs[Number(oo.value)]??Rs[0],t=i?await(await qs(i)).listMembers():[],e=t.length>=2;st("solo-roulette-hint").textContent=i?e?"回す前に当選確率を確認できます":"このグループにはメンバーが2人以上必要です":"まだデータがありません。パーティーで遊ぶとグループが作られます",st("btn-solo-penalty").disabled=!e,st("btn-solo-reward").disabled=!e,st("solo-preview").hidden=!e;const n=st("solo-preview-rows");if(n.innerHTML="",!e)return;const s=so(t,"penalty").entries,r=so(t,"reward").entries;t.forEach((o,a)=>{const c=document.createElement("tr"),l=["","pts","tag","tag"].map(h=>{const u=document.createElement("td");return h&&(u.className=h),c.appendChild(u),u});l[0].textContent=o.name,l[1].textContent=String(o.pts),l[2].textContent=`${s[a].pct.toFixed(0)}%`,l[3].textContent=`${r[a].pct.toFixed(0)}%`,n.appendChild(c)})}function Gf(i){const t=Rs[Number(oo.value)]??Rs[0];t&&qs(t).then(e=>e.listMembers()).then(e=>{if(e.length<2)return;const{entries:n,winner:s}=so(e,i);Xc.show(i,n,s)})}st("btn-solo-roulette").addEventListener("click",()=>{Ee("roulette"),Vf()});oo.addEventListener("change",()=>void Vf());st("btn-solo-penalty").addEventListener("click",()=>Gf("penalty"));st("btn-solo-reward").addEventListener("click",()=>Gf("reward"));st("btn-roulette-back").addEventListener("click",()=>Ee("home"));const Gh=st("friend-code-input"),yi=st("friend-status");async function hc(){if(!_e)return;const i=await _e.listFriends().catch(()=>null);if(!i||Vc.hidden)return;const t=st("friend-list");if(t.innerHTML="",i.length===0){yi.textContent="まだフレンドがいません。コードを教え合って追加しよう";return}yi.textContent="";for(const e of i){const n=document.createElement("div");n.className="friend-row";const s=document.createElement("span");s.textContent=e.online?"🟢":"⚪";const r=document.createElement("span");if(r.className="f-name",r.textContent=e.name,n.append(s,r),e.online&&e.roomCode){const o=document.createElement("button");o.className="btn f-join",o.textContent=`🎾 ${e.roomCode} に参加`,o.onclick=()=>zf(e.roomCode),n.appendChild(o)}else{const o=document.createElement("span");o.className="tag",o.style.opacity="0.5",o.textContent=e.online?"オンライン":"オフライン",n.appendChild(o)}t.appendChild(n)}}st("btn-friends").addEventListener("click",()=>{if(Ee("friends"),!zs()){yi.textContent="フレンド機能は未設定です。FIREBASE_SETUP.md の手順で有効化できます";return}_e&&(st("friend-my-code").textContent=_e.myCode),yi.textContent="読み込み中…",hc();const i=window.setInterval(()=>{if(Vc.hidden){window.clearInterval(i);return}hc()},15e3)});st("btn-friend-add").addEventListener("click",()=>{_e&&(yi.textContent="追加中…",_e.addFriendByCode(Gh.value).catch(()=>null).then(i=>{i?(yi.textContent=`${i} さんとフレンドになりました！`,Gh.value="",hc()):yi.textContent="コードが見つかりませんでした"}))});st("btn-friends-back").addEventListener("click",()=>Ee("home"));Gc.addEventListener("change",()=>_e==null?void 0:_e.setName(vo()));function Wf(){const i=(st("lobby-code").textContent??"").trim();return/^[A-Z0-9]{5}$/.test(i)?i:null}function Xf(i){return`🎾 ラッキースマッシュで遊ぼう！
${`${location.origin}${location.pathname}?room=${i}`}
リンクを開いて「参加する」を押すだけ！（ルームコード: ${i}）`}st("btn-share-line").addEventListener("click",()=>{const i=Wf();i&&window.open(`https://line.me/R/share?text=${encodeURIComponent(Xf(i))}`,"_blank")});st("btn-copy-invite").addEventListener("click",()=>{const i=Wf();if(!i)return;const t=st("btn-copy-invite");navigator.clipboard.writeText(Xf(i)).then(()=>{t.textContent="✓ コピーしました"}).catch(()=>{t.textContent="コピーできませんでした"}).then(()=>{window.setTimeout(()=>t.textContent="📋 コピー",1600)})});{const i=new URLSearchParams(location.search).get("room");i&&/^[A-Za-z0-9]{5}$/.test(i)&&(Ee("join"),rs.value=i.toUpperCase(),os.textContent="招待コードを受け取りました！「参加する」でスタート",history.replaceState(null,"",location.pathname))}st("btn-lobby-history").addEventListener("click",()=>{const i=(be==null?void 0:be.historyRef)??null,t=st("history-modal-list");if(st("history-modal").hidden=!1,!i){t.textContent="この部屋の台帳はホスト端末にあるため、ここからは見られません（クラウド台帳なら全員見られます）",t.style.opacity="0.6";return}t.textContent="読み込み中…",qs(i).then(e=>e.listHistory(100)).then(e=>Hf(t,e)).catch(()=>{t.textContent="読み込みに失敗しました"})});st("btn-history-close").addEventListener("click",()=>{st("history-modal").hidden=!0});const $f="lucky-smash-tut-done",Xr=[{title:"🎾 ようこそ！",body:"<p>ラッキースマッシュは<b>「テニスで勝ってポイントを貯めて、ルーレットを回す」</b>パーティーゲーム。</p><ul><li>💥 罰ゲームルーレット: ポイントが<b>多いほど当たりにくい</b></li><li>🎁 ご褒美ルーレット: ポイントが<b>多いほど当たりやすい</b></li><li>つまり…勝てば勝つほど安全でおいしい！</li></ul>"},{title:"🕹 うごく・うつ",body:"<ul><li>移動: 画面<b>左半分</b>のスティック（PC は WASD / 矢印）</li><li>打つ: 画面<b>右半分をフリック</b>（PC はマウス）</li><li>フリック中は <b>→ 矢印・飛んでいく軌道・パワーゲージ</b> が表示される</li><li><b>赤い表示はアウトコース</b>。速く長くフリックするほど強い</li><li>ゆっくり長くなぞると<b>ロブ</b>（頭上を抜く山なりボール）</li></ul>"},{title:"🎯 サーブ",body:"<ul><li>サーブもフリック。<b>向きと強さ</b>で狙う</li><li>ネットの向こうの<b>対角のサービスボックス</b>に入れないとフォルト</li><li>強すぎるとボックスを越えてフォルト。2回失敗でダブルフォルト</li><li>青いリングは飛んでいるボールの<b>着地予測</b>。そこへ走ろう</li></ul>"},{title:"💰 ポイントの貯め方",body:"<ul><li>はじめて参加すると <b>+100pt</b></li><li>試合に勝つと <b>+100pt</b>。負けても取ったゲーム×20pt</li><li><b>対戦前ベット</b>: 賭けて勝てば総取り</li><li><b>観戦予想</b>: 勝者を当てると同額ゲット</li><li>試合を途中で抜けると<b>棄権負け</b>（賭け金も没収）</li><li>増減はぜんぶ履歴に記録。ロビーの「📜 ポイント履歴」で誰でも確認できる</li></ul>"},{title:"🎰 さあ、はじめよう",body:"<p>まずは「🎾 あそんでポイントを貯める → 🤖 ひとりで練習」で<b>🐣よわいCPU</b>と1ゲーム。</p><p>友達と遊ぶときは「🏟 パーティールームを作る」でコードを<b>LINEで招待</b>！</p><p>ポイントが貯まったらホームの<b>🎰 ルーレット</b>で運命の抽選です。</p>"}];let In=0;function qc(){const i=Xr[In];st("tut-step").textContent=`${In+1} / ${Xr.length}`,st("tut-body").innerHTML=`<div class="tut-title">${i.title}</div>${i.body}`,st("btn-tut-prev").disabled=In===0,st("btn-tut-next").textContent=In===Xr.length-1?"はじめる！":"つぎ →"}function Yc(){In=0,qc(),st("tutorial").hidden=!1}function qf(){st("tutorial").hidden=!0;try{localStorage.setItem($f,"1")}catch{}}st("btn-tutorial").addEventListener("click",Yc);st("btn-tut-skip").addEventListener("click",qf);st("btn-tut-prev").addEventListener("click",()=>{In>0&&(In--,qc())});st("btn-tut-next").addEventListener("click",()=>{In<Xr.length-1?(In++,qc()):qf()});localStorage.getItem($f)||Yc();st("btn-help").addEventListener("click",Yc);st("btn-quit").addEventListener("click",()=>{Ln||(be==null||be.destroy(),be=null),ks()});st("btn-result-menu").addEventListener("click",()=>ks());st("btn-rematch").addEventListener("click",()=>{var i;Ln==null||Ln.rematch(),(i=document.activeElement)==null||i.blur()});export{sl as F,na as I,Ix as r};
