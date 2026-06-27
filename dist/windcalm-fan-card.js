function t(t,e,i,s){var r,o=arguments.length,n=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o<3?r(n):o>3?r(e,i,n):r(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,f=globalThis,g=f.trustedTypes,_=g?g.emptyScript:"",m=f.reactiveElementPolyfillSupport,v=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!l(t,e),y={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:$};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&d(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=s;const o=r.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const o=this.constructor;if(!1===s&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??$)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[v("elementProperties")]=new Map,x[v("finalized")]=new Map,m?.({ReactiveElement:x}),(f.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,A=t=>t,S=w.trustedTypes,E=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+k,O=`<${P}>`,T=document,M=()=>T.createComment(""),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,R="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,D=/>/g,j=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,I=/"/g,B=/^(?:script|style|textarea|title)$/i,V=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),W=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),q=new WeakMap,F=T.createTreeWalker(T,129);function Z(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const G=(t,e)=>{const i=t.length-1,s=[];let r,o=2===e?"<svg>":3===e?"<math>":"",n=z;for(let e=0;e<i;e++){const i=t[e];let a,l,d=-1,c=0;for(;c<i.length&&(n.lastIndex=c,l=n.exec(i),null!==l);)c=n.lastIndex,n===z?"!--"===l[1]?n=H:void 0!==l[1]?n=D:void 0!==l[2]?(B.test(l[2])&&(r=RegExp("</"+l[2],"g")),n=j):void 0!==l[3]&&(n=j):n===j?">"===l[0]?(n=r??z,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?j:'"'===l[3]?I:L):n===I||n===L?n=j:n===H||n===D?n=z:(n=j,r=void 0);const h=n===j&&t[e+1].startsWith("/>")?" ":"";o+=n===z?i+O:d>=0?(s.push(a),i.slice(0,d)+C+i.slice(d)+k+h):i+k+(-2===d?e:h)}return[Z(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0;const n=t.length-1,a=this.parts,[l,d]=G(t,e);if(this.el=J.createElement(l,i),F.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=F.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=d[o++],i=s.getAttribute(t).split(k),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?et:"?"===n[1]?it:"@"===n[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:r}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(k),e=t.length-1;if(e>0){s.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],M()),F.nextNode(),a.push({type:2,index:++r});s.append(t[e],M())}}}else if(8===s.nodeType)if(s.data===P)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(k,t+1));)a.push({type:7,index:r}),t+=k.length-1}r++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,s){if(e===W)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=N(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=Q(t,r._$AS(t,e.values),r,s)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??T).importNode(e,!0);F.currentNode=s;let r=F.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Y(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new rt(r,this,t)),this._$AV.push(e),a=i[++n]}o!==a?.index&&(r=F.nextNode(),o++)}return F.currentNode=T,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),N(t)?t===K||null==t||""===t?(this._$AH!==K&&this._$AR(),this._$AH=K):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==K&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new X(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new J(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new Y(this.O(M()),this.O(M()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=K,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(void 0===r)t=Q(this,t,e,0),o=!N(t)||t!==this._$AH&&t!==W,o&&(this._$AH=t);else{const s=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=Q(this,s[i+n],e,n),a===W&&(a=this._$AH[n]),o||=!N(a)||a!==this._$AH[n],a===K?t=K:t!==K&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!s&&this.j(t)}j(t){t===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===K?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==K)}}class st extends tt{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??K)===W)return;const i=this._$AH,s=t===K&&i!==K||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==K&&(i===K||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const ot=w.litHtmlPolyfillSupport;ot?.(J,Y),(w.litHtmlVersions??=[]).push("3.3.3");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class at extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new Y(e.insertBefore(M(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}at._$litElement$=!0,at.finalized=!0,nt.litElementHydrateSupport?.({LitElement:at});const lt=nt.litElementPolyfillSupport;lt?.({LitElement:at}),(nt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:$},ct=(t=dt,e,i)=>{const{kind:s,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ht(t){return(e,i)=>"object"==typeof i?ct(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(t){return ht({...t,state:!0,attribute:!1})}const ut={en:{card:{name_default:"Ceiling fan",subtitle:"CREATE Windcalm",unavailable:"Unavailable",config_required:"Please configure the Windcalm fan card."},speed:{label:"SPEED",off:"Off",s1:"Gentle",s2:"Soft",s3:"Moderate",s4:"Normal",s5:"Strong",s6:"Turbo",state_off:"Off",state_s1:"Speed 1 — Gentle",state_s2:"Speed 2 — Soft",state_s3:"Speed 3 — Moderate",state_s4:"Speed 4 — Normal",state_s5:"Speed 5 — Strong",state_s6:"Speed 6 — Turbo"},controls:{light:"Light",color_temp:"Color temperature",temp_warm:"Warm",temp_cool:"Cool",direction:"DIRECTION",dir_forward:"Normal",dir_reverse:"Reverse",timer:"Timer",timer_none:"None",sound:"Sound beep"},editor:{title:"Windcalm fan card settings",name:"Card name",fan_entity:"Fan entity",show_name:"Show card name",discovered:"Auto-discovered entities",not_found:"not found"}},fr:{card:{name_default:"Ventilateur plafond",subtitle:"CREATE Windcalm",unavailable:"Indisponible",config_required:"Veuillez configurer la carte ventilateur Windcalm."},speed:{label:"VITESSE",off:"Arrêt",s1:"Très doux",s2:"Doux",s3:"Modéré",s4:"Moyen",s5:"Fort",s6:"Turbo",state_off:"Éteint",state_s1:"Vitesse 1 — Très doux",state_s2:"Vitesse 2 — Doux",state_s3:"Vitesse 3 — Modéré",state_s4:"Vitesse 4 — Moyen",state_s5:"Vitesse 5 — Fort",state_s6:"Vitesse 6 — Turbo"},controls:{light:"Lumière",color_temp:"Température de couleur",temp_warm:"Chaud",temp_cool:"Froid",direction:"DIRECTION",dir_forward:"Normale",dir_reverse:"Inverse",timer:"Minuterie",timer_none:"Aucune",sound:"Bip sonore"},editor:{title:"Paramètres de la carte ventilateur Windcalm",name:"Nom de la carte",fan_entity:"Entité ventilateur",show_name:"Afficher le nom de la carte",discovered:"Entités auto-détectées",not_found:"introuvable"}}};function ft(t,e){const i=e.indexOf("."),s=e.slice(0,i),r=e.slice(i+1),o=t[s];return"object"==typeof o?o[r]:void 0}function gt(t,e){return ft(ut[function(t){const e=(t?.locale?.language??t?.language??"en").toLowerCase().split("-")[0];return e in ut?e:"en"}(t)],e)??ft(ut.en,e)??e}const _t=[0,15,30,60,120,240,480];function mt(t){return t<=0?0:Math.round(t/6*100)}function vt(t,e){const i=function(t){if(!t)return null;const e=t.indexOf(".");return e>=0?t.slice(e+1):t}(e.fan_entity),s=t?.states??{},r=t=>{if(!i)return;const e=`${t}.${i}`;return s[e]?e:Object.keys(s).find(t=>t.startsWith(e))};return{fan:e.fan_entity,light:e.light_entity||r("light"),timer:e.timer_entity||r("number"),sound:e.sound_entity||r("switch")}}class bt extends at{constructor(){super(...arguments),this._computeLabel=t=>{const e={fan_entity:"editor.fan_entity",name:"editor.name",show_name:"editor.show_name"};return e[t.name]?this._t(e[t.name]):t.name}}connectedCallback(){super.connectedCallback(),this.hass&&(customElements.get("ha-form")||customElements.get("hui-button-card")?.getConfigElement?.(),customElements.get("ha-entity-picker")||customElements.get("hui-entities-card")?.getConfigElement?.())}setConfig(t){this._config={...t}}get _schema(){return[{name:"fan_entity",required:!0,selector:{entity:{domain:"fan"}}},{name:"name",selector:{text:{}}},{name:"show_name",selector:{boolean:{}}}]}_t(t){return gt(this.hass,t)}_valueChanged(t){const e=t.detail.value;this.dispatchEvent(new CustomEvent("config-changed",{bubbles:!0,composed:!0,detail:{config:e}}))}_renderDiscovered(){if(!this._config?.fan_entity)return K;const t=vt(this.hass,this._config),e=[{key:"controls.light",id:t.light},{key:"controls.timer",id:t.timer},{key:"controls.sound",id:t.sound}];return V`
      <div class="discovered">
        <div class="discovered-title">${this._t("editor.discovered")}</div>
        ${e.map(t=>V`
            <div class="discovered-row">
              <span class="dr-label">${this._t(t.key)}</span>
              ${t.id?V`<span class="dr-id found">${t.id}</span>`:V`<span class="dr-id missing">${this._t("editor.not_found")}</span>`}
            </div>
          `)}
      </div>
    `}render(){return this.hass&&this._config?V`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
      ${this._renderDiscovered()}
    `:V``}}bt.styles=n`
    ha-form {
      width: 100%;
    }
    .discovered {
      margin-top: 16px;
      padding: 12px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      background: var(--secondary-background-color);
    }
    .discovered-title {
      font-size: 11px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: var(--secondary-text-color);
      margin-bottom: 8px;
    }
    .discovered-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 3px 0;
      font-size: 13px;
    }
    .dr-label {
      color: var(--primary-text-color);
    }
    .dr-id {
      font-family: var(--code-font-family, monospace);
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .dr-id.found {
      color: var(--primary-text-color);
    }
    .dr-id.missing {
      color: var(--secondary-text-color);
      font-style: italic;
    }
  `,t([ht({attribute:!1})],bt.prototype,"hass",void 0),t([pt()],bt.prototype,"_config",void 0),customElements.define("windcalm-fan-card-editor",bt);class $t extends at{static getStubConfig(){return{fan_entity:"fan.ceiling_fan_with_light",show_name:!0}}static getConfigElement(){return document.createElement("windcalm-fan-card-editor")}getCardSize(){return 4}setConfig(t){if(!t?.fan_entity)throw new Error("fan_entity is required.");this._config={show_name:!0,...t}}_t(t){return gt(this.hass,t)}get _entities(){return vt(this.hass,this._config)}get _fanState(){return this.hass?.states[this._entities.fan]}get _lightState(){const t=this._entities.light;return t?this.hass?.states[t]:void 0}get _timerState(){const t=this._entities.timer;return t?this.hass?.states[t]:void 0}get _soundState(){const t=this._entities.sound;return t?this.hass?.states[t]:void 0}get _currentSpeed(){const t=this._fanState;return t&&"off"!==t.state&&"unavailable"!==t.state?!(e=Number(t.attributes?.percentage??0))||e<=0?0:Math.min(6,Math.max(1,Math.round(e/(100/6)))):0;var e}get _fanSupportsDirection(){return!!(4&Number(this._fanState?.attributes?.supported_features??0))}get _fanDirection(){return"reverse"===this._fanState?.attributes?.direction?"reverse":"forward"}get _isLightOn(){return"on"===this._lightState?.state}get _lightSupportsColorTemp(){return(this._lightState?.attributes?.supported_color_modes??[]).includes("color_temp")}get _minKelvin(){return Number(this._lightState?.attributes?.min_color_temp_kelvin??2700)}get _maxKelvin(){return Number(this._lightState?.attributes?.max_color_temp_kelvin??6500)}get _currentKelvin(){return Number(this._lightState?.attributes?.color_temp_kelvin??this._minKelvin)}get _isSoundOn(){return"on"===this._soundState?.state}get _timerValue(){return Number(this._timerState?.state??0)}_speedStateKey(t){return 0===t?"speed.state_off":`speed.state_s${t}`}_speedLabelKey(t){return`speed.s${t}`}_setSpeed(t){0===t?this.hass.callService("fan","turn_off",{entity_id:this._entities.fan}):this.hass.callService("fan","set_percentage",{entity_id:this._entities.fan,percentage:mt(t)})}_setDirection(t){this.hass.callService("fan","set_direction",{entity_id:this._entities.fan,direction:t})}_toggleLight(){this._entities.light&&this.hass.callService("light","toggle",{entity_id:this._entities.light})}_setColorTemp(t){if(!this._entities.light)return;const e=Number(t.target.value);this.hass.callService("light","turn_on",{entity_id:this._entities.light,color_temp_kelvin:e})}_setTimer(t){if(!this._entities.timer)return;const e=Number(t.target.value);this.hass.callService("number","set_value",{entity_id:this._entities.timer,value:e})}_toggleSound(){this._entities.sound&&this.hass.callService("switch","toggle",{entity_id:this._entities.sound})}_renderSpeedIcon(t){const e=0===t;return V`
      <div class="fan-icon-wrap ${e?"off":""}">
        <svg
          viewBox="0 0 24 24"
          width="32"
          height="32"
          fill="currentColor"
          class="fan-svg ${e?"off":""}"
          style="${e?"":`animation: spin ${["none","2.5s","1.5s","0.9s","0.6s","0.35s","0.15s"][t]} linear infinite;`}"
          aria-hidden="true"
        >
          <path d="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.69 9.22,10.88C9.41,10.4 9.73,9.97 10.13,9.65C8.14,5.96 8.92,2 12.5,2Z" />
        </svg>
      </div>
    `}render(){if(!this._config)return K;if(!this.hass)return K;const t=this._fanState;if(!t)return V`<ha-card><div class="error">${this._t("card.config_required")}</div></ha-card>`;const e=this._currentSpeed,i="unavailable"===t.state,s=this._config.name||t.attributes?.friendly_name||this._t("card.name_default");return V`
      <ha-card>
        <div class="card-content ${i?"unavailable":""}">

          ${!1!==this._config.show_name?V`
              <div class="card-header">
                <div class="card-title">${s}</div>
              </div>
            `:K}

          ${i?V`<div class="unavailable-msg">${this._t("card.unavailable")}</div>`:K}

          <div class="fan-status-row">
            ${this._renderSpeedIcon(e)}
            <div class="fan-info">
              <div class="fan-state">${this._t(this._speedStateKey(e))}</div>
              <div class="fan-pct">
                ${0===e?"—":`${mt(e)}%`}
              </div>
            </div>
          </div>

          <div class="section-label">${this._t("speed.label")}</div>

          <button
            class="off-btn ${0===e?"active":""}"
            @click=${()=>this._setSpeed(0)}
            ?disabled=${i}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
            </svg>
            ${this._t("speed.off")}
          </button>

          <div class="speed-grid">
            ${Array.from({length:6},(t,e)=>e+1).map(t=>V`
                <button
                  class="speed-btn ${e===t?"active":""}"
                  @click=${()=>this._setSpeed(t)}
                  ?disabled=${i}
                >
                  <span class="speed-num">${t}</span>
                  <span class="speed-lbl">${this._t(this._speedLabelKey(t))}</span>
                </button>
              `)}
          </div>

          ${this._fanSupportsDirection?V`
              <div class="section-label dir-label">${this._t("controls.direction")}</div>
              <div class="dir-segment">
                <button
                  class="dir-btn ${"forward"===this._fanDirection?"active":""}"
                  @click=${()=>this._setDirection("forward")}
                  ?disabled=${i}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                    <path d="M4 12a8 8 0 1 0 2.3 -5.6"/>
                    <polyline points="4 3 4 7 8 7"/>
                  </svg>
                  ${this._t("controls.dir_forward")}
                </button>
                <button
                  class="dir-btn ${"reverse"===this._fanDirection?"active":""}"
                  @click=${()=>this._setDirection("reverse")}
                  ?disabled=${i}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                    <path d="M20 12a8 8 0 1 1 -2.3 -5.6"/>
                    <polyline points="20 3 20 7 16 7"/>
                  </svg>
                  ${this._t("controls.dir_reverse")}
                </button>
              </div>
            `:K}

          ${this._lightState||this._timerState||this._soundState?V`<div class="divider"></div>`:K}

          ${this._lightState?V`
              <div class="row">
                <div class="row-label">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1 -9 -9z"/>
                  </svg>
                  ${this._t("controls.light")}
                </div>
                <button
                  class="toggle ${this._isLightOn?"on":""}"
                  @click=${this._toggleLight}
                  ?disabled=${i}
                  aria-label="${this._t("controls.light")}"
                ></button>
              </div>
              ${this._isLightOn&&this._lightSupportsColorTemp?V`
                  <div class="temp-row">
                    <span class="temp-label warm">${this._t("controls.temp_warm")}</span>
                    <input
                      class="temp-slider"
                      type="range"
                      min="${this._minKelvin}"
                      max="${this._maxKelvin}"
                      step="100"
                      .value=${String(this._currentKelvin)}
                      @change=${this._setColorTemp}
                      ?disabled=${i}
                      aria-label="${this._t("controls.color_temp")}"
                    />
                    <span class="temp-label cool">${this._t("controls.temp_cool")}</span>
                    <span class="temp-value">${this._currentKelvin}K</span>
                  </div>
                `:K}
            `:K}

          ${this._timerState?V`
              <div class="row">
                <div class="row-label">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                    <circle cx="12" cy="12" r="9"/>
                    <polyline points="12 7 12 12 15 15"/>
                  </svg>
                  ${this._t("controls.timer")}
                </div>
                <select
                  class="timer-select"
                  .value=${String(this._timerValue)}
                  @change=${this._setTimer}
                  ?disabled=${i}
                >
                  ${_t.map(t=>V`
                      <option value="${t}" ?selected=${this._timerValue===t}>
                        ${0===t?this._t("controls.timer_none"):t<60?`${t} min`:t/60+" h"}
                      </option>
                    `)}
                </select>
              </div>
            `:K}

          ${this._soundState?V`
              <div class="row">
                <div class="row-label">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                  </svg>
                  ${this._t("controls.sound")}
                </div>
                <button
                  class="toggle ${this._isSoundOn?"on":""}"
                  @click=${this._toggleSound}
                  ?disabled=${i}
                  aria-label="${this._t("controls.sound")}"
                ></button>
              </div>
            `:K}

        </div>
      </ha-card>
    `}}$t.styles=n`
    :host {
      --wc-teal: #1d9e75;
      --wc-teal-light: #e1f5ee;
      --wc-teal-dark: #085041;
      --wc-teal-mid: #0f6e56;
      --wc-red-light: #fcebeb;
      --wc-red: #e24b4a;
      --wc-red-dark: #a32d2d;
    }

    ha-card {
      overflow: hidden;
    }

    .card-content {
      padding: 16px;
    }
    .card-content.unavailable {
      opacity: 0.6;
    }

    .card-header {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
    }
    .card-title {
      font-size: 16px;
      font-weight: 500;
      color: var(--primary-text-color);
      text-align: center;
    }

    .unavailable-msg {
      font-size: 13px;
      color: var(--secondary-text-color);
      text-align: center;
      padding: 8px 0;
    }

    .fan-status-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
      margin-bottom: 16px;
      padding: 12px;
      background: var(--secondary-background-color);
      border-radius: 8px;
    }

    .fan-icon-wrap {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: var(--wc-teal-light);
      border: 1.5px solid var(--wc-teal);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background 0.3s, border-color 0.3s;
    }
    .fan-icon-wrap.off {
      background: var(--secondary-background-color);
      border-color: var(--divider-color);
    }

    .fan-svg {
      color: var(--wc-teal);
      transition: color 0.3s;
      transform-origin: center;
    }
    .fan-svg.off {
      color: var(--secondary-text-color);
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .fan-info { min-width: 0; }
    .fan-state {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color);
      white-space: nowrap;
    }
    .fan-pct {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }

    .section-label {
      font-size: 11px;
      letter-spacing: 0.06em;
      color: var(--secondary-text-color);
      margin-bottom: 8px;
    }

    .off-btn {
      width: 100%;
      padding: 9px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      background: var(--card-background-color);
      color: var(--secondary-text-color);
      font-size: 13px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      margin-bottom: 8px;
      transition: background 0.15s, border-color 0.15s, color 0.15s;
    }
    .off-btn:hover:not(:disabled) {
      background: var(--secondary-background-color);
    }
    .off-btn.active {
      background: var(--wc-red-light);
      border-color: var(--wc-red);
      color: var(--wc-red-dark);
    }
    .off-btn:disabled {
      cursor: default;
      opacity: 0.5;
    }

    .speed-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
      margin-bottom: 16px;
    }

    .speed-btn {
      padding: 10px 6px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
      cursor: pointer;
      text-align: center;
      transition: background 0.15s, border-color 0.15s;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
    }
    .speed-btn:hover:not(:disabled) {
      background: var(--secondary-background-color);
    }
    .speed-btn.active {
      background: var(--wc-teal-light);
      border-color: var(--wc-teal);
    }
    .speed-btn:disabled {
      cursor: default;
      opacity: 0.5;
    }

    .speed-num {
      font-size: 18px;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .speed-btn.active .speed-num {
      color: var(--wc-teal-dark);
    }
    .speed-lbl {
      font-size: 10px;
      color: var(--secondary-text-color);
    }
    .speed-btn.active .speed-lbl {
      color: var(--wc-teal-mid);
    }

    .dir-label {
      margin-top: 16px;
    }
    .dir-segment {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
    }
    .dir-btn {
      padding: 9px 6px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font-size: 13px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: background 0.15s, border-color 0.15s, color 0.15s;
    }
    .dir-btn:hover:not(:disabled) {
      background: var(--secondary-background-color);
    }
    .dir-btn.active {
      background: var(--wc-teal-light);
      border-color: var(--wc-teal);
      color: var(--wc-teal-dark);
    }
    .dir-btn:disabled {
      cursor: default;
      opacity: 0.5;
    }

    .divider {
      height: 1px;
      background: var(--divider-color);
      margin: 12px 0;
    }

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 7px 0;
    }
    .row-label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: var(--primary-text-color);
    }
    .row-label svg {
      color: var(--secondary-text-color);
      flex-shrink: 0;
    }

    .temp-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 0 10px 26px;
    }
    .temp-label {
      font-size: 11px;
      flex-shrink: 0;
    }
    .temp-label.warm {
      color: #ba7517;
    }
    .temp-label.cool {
      color: #378add;
    }
    .temp-value {
      font-size: 11px;
      color: var(--secondary-text-color);
      min-width: 42px;
      text-align: right;
      flex-shrink: 0;
    }
    .temp-slider {
      flex: 1;
      -webkit-appearance: none;
      appearance: none;
      height: 8px;
      border-radius: 4px;
      background: linear-gradient(to right, #ffb46e, #fff6e8 50%, #cfe4ff);
      outline: none;
      cursor: pointer;
    }
    .temp-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--card-background-color, #fff);
      border: 2px solid var(--primary-text-color);
      cursor: pointer;
    }
    .temp-slider::-moz-range-thumb {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--card-background-color, #fff);
      border: 2px solid var(--primary-text-color);
      cursor: pointer;
    }
    .temp-slider:disabled {
      opacity: 0.5;
      cursor: default;
    }

    .toggle {
      width: 40px;
      height: 22px;
      background: var(--divider-color);
      border-radius: 11px;
      position: relative;
      cursor: pointer;
      transition: background 0.2s;
      border: none;
      flex-shrink: 0;
      padding: 0;
    }
    .toggle.on {
      background: var(--wc-teal);
    }
    .toggle::after {
      content: "";
      position: absolute;
      width: 16px;
      height: 16px;
      background: white;
      border-radius: 50%;
      top: 3px;
      left: 3px;
      transition: left 0.2s;
    }
    .toggle.on::after {
      left: 21px;
    }
    .toggle:disabled {
      cursor: default;
      opacity: 0.5;
    }

    .timer-select {
      font-size: 13px;
      padding: 5px 8px;
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
      cursor: pointer;
    }
    .timer-select:disabled {
      cursor: default;
      opacity: 0.5;
    }

    .error {
      padding: 16px;
      font-size: 13px;
      color: var(--error-color, var(--wc-red));
    }
  `,t([ht({attribute:!1})],$t.prototype,"hass",void 0),t([pt()],$t.prototype,"_config",void 0),customElements.define("windcalm-fan-card",$t),window.customCards=window.customCards||[],window.customCards.push({type:"windcalm-fan-card",name:"Windcalm Fan Card",description:"Custom card for the CREATE Windcalm ceiling fan",preview:!0});
//# sourceMappingURL=windcalm-fan-card.js.map
