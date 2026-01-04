function t(t,e,i,o){var s,n=arguments.length,r=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(n<3?s(r):n>3?s(e,i,r):s(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,o=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(o&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new r(i,t,s)},c=o?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:h,getOwnPropertyDescriptor:d,getOwnPropertyNames:p,getOwnPropertySymbols:u,getPrototypeOf:g}=Object,m=globalThis,f=m.trustedTypes,v=f?f.emptyScript:"",_=m.reactiveElementPolyfillSupport,b=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?v:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!l(t,e),w={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&h(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:s}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const n=o?.call(this);s?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...p(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(c(t))}else void 0!==t&&e.push(c(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(o)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const o of i){const i=document.createElement("style"),s=e.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=o.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=o;const n=s.fromAttribute(e,t.type);this[o]=n??this._$Ej?.get(o)??n,this._$Em=null}}requestUpdate(t,e,i,o=!1,s){if(void 0!==t){const n=this.constructor;if(!1===o&&(s=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??$)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:s},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==s||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[b("elementProperties")]=new Map,x[b("finalized")]=new Map,_?.({ReactiveElement:x}),(m.reactiveElementVersions??=[]).push("2.1.2");const E=globalThis,C=t=>t,A=E.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,k="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+M,R=`<${P}>`,O=document,L=()=>O.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,F=Array.isArray,N="[ \t\n\f\r]",I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,U=/>/g,H=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,B=/"/g,j=/^(?:script|style|textarea|title)$/i,V=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),q=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),G=new WeakMap,J=O.createTreeWalker(O,129);function K(t,e){if(!F(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,o=[];let s,n=2===e?"<svg>":3===e?"<math>":"",r=I;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,h=0;for(;h<i.length&&(r.lastIndex=h,c=r.exec(i),null!==c);)h=r.lastIndex,r===I?"!--"===c[1]?r=z:void 0!==c[1]?r=U:void 0!==c[2]?(j.test(c[2])&&(s=RegExp("</"+c[2],"g")),r=H):void 0!==c[3]&&(r=H):r===H?">"===c[0]?(r=s??I,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?H:'"'===c[3]?B:D):r===B||r===D?r=H:r===z||r===U?r=I:(r=H,s=void 0);const d=r===H&&t[e+1].startsWith("/>")?" ":"";n+=r===I?i+R:l>=0?(o.push(a),i.slice(0,l)+k+i.slice(l)+M+d):i+M+(-2===l?e:d)}return[K(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class Z{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let s=0,n=0;const r=t.length-1,a=this.parts,[c,l]=Y(t,e);if(this.el=Z.createElement(c,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=J.nextNode())&&a.length<r;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(k)){const e=l[n++],i=o.getAttribute(t).split(M),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:r[2],strings:i,ctor:"."===r[1]?it:"?"===r[1]?ot:"@"===r[1]?st:et}),o.removeAttribute(t)}else t.startsWith(M)&&(a.push({type:6,index:s}),o.removeAttribute(t));if(j.test(o.tagName)){const t=o.textContent.split(M),e=t.length-1;if(e>0){o.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],L()),J.nextNode(),a.push({type:2,index:++s});o.append(t[e],L())}}}else if(8===o.nodeType)if(o.data===P)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=o.data.indexOf(M,t+1));)a.push({type:7,index:s}),t+=M.length-1}s++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,o){if(e===q)return e;let s=void 0!==o?i._$Co?.[o]:i._$Cl;const n=T(e)?void 0:e._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(t),s._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=s:i._$Cl=s),void 0!==s&&(e=X(t,s._$AS(t,e.values),s,o)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??O).importNode(e,!0);J.currentNode=o;let s=J.nextNode(),n=0,r=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new tt(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new nt(s,this,t)),this._$AV.push(e),a=i[++r]}n!==a?.index&&(s=J.nextNode(),n++)}return J.currentNode=O,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),T(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>F(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new Q(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new Z(t)),e}k(t){F(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const s of t)o===e.length?e.push(i=new tt(this.O(L()),this.O(L()),this,this.options)):i=e[o],i._$AI(s),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=C(t).nextSibling;C(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,s){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,o){const s=this.strings;let n=!1;if(void 0===s)t=X(this,t,e,0),n=!T(t)||t!==this._$AH&&t!==q,n&&(this._$AH=t);else{const o=t;let r,a;for(t=s[0],r=0;r<s.length-1;r++)a=X(this,o[i+r],e,r),a===q&&(a=this._$AH[r]),n||=!T(a)||a!==this._$AH[r],a===W?t=W:t!==W&&(t+=(a??"")+s[r+1]),this._$AH[r]=a}n&&!o&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class ot extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class st extends et{constructor(t,e,i,o,s){super(t,e,i,o,s),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??W)===q)return;const i=this._$AH,o=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==W&&(i===W||o);o&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const rt=E.litHtmlPolyfillSupport;rt?.(Z,tt),(E.litHtmlVersions??=[]).push("3.3.2");const at=globalThis;let ct=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let s=o._$litPart$;if(void 0===s){const t=i?.renderBefore??null;o._$litPart$=s=new tt(e.insertBefore(L(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}};ct._$litElement$=!0,ct.finalized=!0,at.litElementHydrateSupport?.({LitElement:ct});const lt=at.litElementPolyfillSupport;lt?.({LitElement:ct}),(at.litElementVersions??=[]).push("4.2.2");const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},dt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:$},pt=(t=dt,e,i)=>{const{kind:o,metadata:s}=i;let n=globalThis.litPropertyMetadata.get(s);if(void 0===n&&globalThis.litPropertyMetadata.set(s,n=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===o){const{name:o}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,s,t,!0,i)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=i;return function(i){const s=this[o];e.call(this,i),this.requestUpdate(o,s,t,!0,i)}}throw Error("Unsupported decorator location: "+o)};function ut(t){return(e,i)=>"object"==typeof i?pt(t,e,i):((t,e,i)=>{const o=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function gt(t){return ut({...t,state:!0,attribute:!1})}const mt=a`
  :host {
    /* ============================================
       SPACING SCALE (4px base unit)
       ============================================ */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 12px;
    --spacing-lg: 16px;
    --spacing-xl: 24px;

    /* ============================================
       BORDER RADIUS
       ============================================ */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-xl: 16px;
    --radius-full: 9999px;

    /* ============================================
       COLORS - Inherited from HA Theme
       ============================================ */
    --card-background: var(--ha-card-background, var(--card-background-color, #1c1c1c));
    --text-primary: var(--primary-text-color, #fff);
    --text-secondary: var(--secondary-text-color, rgba(255, 255, 255, 0.7));
    --border-color: var(--divider-color, rgba(255, 255, 255, 0.12));
    --accent-color: var(--primary-color, #03a9f4);

    /* ============================================
       LIGHT STATE COLORS
       ============================================ */
    --light-on-color: #fbbf24;
    --light-off-color: var(--secondary-text-color, rgba(255, 255, 255, 0.5));
    --light-unavailable-color: var(--disabled-text-color, #666);

    /* ============================================
       COMPONENT COLORS
       ============================================ */
    --row-background: rgba(255, 255, 255, 0.03);
    --row-background-hover: rgba(255, 255, 255, 0.06);
    --expanded-panel-background: rgba(0, 0, 0, 0.2);
    --slider-track-color: var(--divider-color, rgba(255, 255, 255, 0.12));
    --slider-active-color: var(--light-on-color);
    --scene-chip-background: rgba(255, 255, 255, 0.05);
    --scene-chip-border: var(--divider-color, rgba(255, 255, 255, 0.12));
    --scene-chip-active-border: var(--accent-color, #03a9f4);

    /* ============================================
       ANIMATION TIMING
       ============================================ */
    --transition-fast: 150ms ease;
    --transition-normal: 200ms ease;
    --transition-slow: 300ms ease-out;
    --transition-color: 500ms ease;
  }
`,ft=a`
  ${mt}

  ha-card {
    padding: var(--spacing-lg);
    border-radius: var(--ha-card-border-radius, 16px);
    background: var(--card-background);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-lg);
  }

  .card-title {
    font-size: 20px;
    font-weight: 500;
    color: var(--text-primary);
    margin: 0;
  }

  .total-power {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    font-size: 14px;
    font-weight: 500;
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
    color: var(--text-secondary);
  }

  .total-power ha-icon {
    --mdc-icon-size: 16px;
    color: var(--light-on-color);
  }

  .rooms-container {
    display: flex;
    flex-direction: column;
  }

  /* Multi-column layout */
  .rooms-container.columns-2,
  .rooms-container.columns-3,
  .rooms-container.columns-4 {
    display: grid;
    gap: var(--spacing-lg);
  }

  .rooms-container.columns-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  .rooms-container.columns-3 {
    grid-template-columns: repeat(3, 1fr);
  }

  .rooms-container.columns-4 {
    grid-template-columns: repeat(4, 1fr);
  }

  /* Column containers */
  .column {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  /* Responsive: wrap to fewer columns on smaller screens */
  @media (max-width: 1200px) {
    .rooms-container.columns-4 {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 900px) {
    .rooms-container.columns-3,
    .rooms-container.columns-4 {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 600px) {
    .rooms-container.columns-2,
    .rooms-container.columns-3,
    .rooms-container.columns-4 {
      grid-template-columns: 1fr;
    }
  }

  .no-rooms-message {
    text-align: center;
    color: var(--text-secondary);
    padding: var(--spacing-xl);
    font-size: 14px;
  }
`,vt=a`
  ${mt}

  .room-section {
    margin-bottom: var(--spacing-md);
  }

  .room-section:last-child {
    margin-bottom: 0;
  }

  .room-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-sm) 0;
    cursor: pointer;
    user-select: none;
  }

  .room-header:hover {
    opacity: 0.8;
  }

  .room-header-left {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }

  .room-header-name {
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--text-secondary);
  }

  .room-header-right {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }

  .room-header-power {
    font-size: 12px;
    font-weight: 500;
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
    color: var(--text-secondary);
  }

  .collapse-icon {
    --mdc-icon-size: 20px;
    color: var(--text-secondary);
    transition: transform var(--transition-fast);
  }

  .collapse-icon.collapsed {
    transform: rotate(-90deg);
  }

  .room-content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    overflow: hidden;
    transition: max-height var(--transition-slow), opacity var(--transition-normal);
    max-height: 2000px;
    opacity: 1;
  }

  .room-content.collapsed {
    max-height: 0;
    opacity: 0;
    pointer-events: none;
  }

  .room-divider {
    height: 1px;
    background: var(--border-color);
    margin: var(--spacing-md) 0;
    opacity: 0.5;
  }
`,_t=a`
  ${mt}

  .light-row {
    display: flex;
    flex-direction: column;
    background: var(--row-background);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    overflow: hidden;
    transition: background var(--transition-fast);
  }

  .light-row:hover {
    background: var(--row-background-hover);
  }

  .light-row.has-scene-color {
    border-left: 3px solid var(--scene-color, var(--light-on-color));
  }

  .light-row-main {
    display: flex;
    align-items: center;
    padding: var(--spacing-md) var(--spacing-lg);
    cursor: pointer;
    gap: var(--spacing-md);
  }

  .light-icon {
    --mdc-icon-size: 24px;
    color: var(--light-off-color);
    transition: color var(--transition-color);
    flex-shrink: 0;
  }

  .light-icon.on {
    color: var(--light-on-color);
  }

  .light-icon.colored {
    color: var(--scene-color, var(--light-on-color));
  }

  .light-icon.unavailable {
    color: var(--light-unavailable-color);
  }

  .light-name {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    font-weight: 400;
    color: var(--text-primary);
  }

  .light-status {
    flex-shrink: 0;
    font-size: 12px;
    font-weight: 500;
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
    color: var(--text-secondary);
  }

  .light-status.unavailable {
    color: var(--light-unavailable-color);
  }

  .expand-button {
    --mdc-icon-size: 20px;
    color: var(--text-secondary);
    cursor: pointer;
    padding: var(--spacing-xs);
    border-radius: var(--radius-sm);
    transition: background var(--transition-fast);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .expand-button:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .expand-button.expanded {
    background: rgba(255, 255, 255, 0.05);
  }

  @keyframes light-on {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  .light-icon.turning-on {
    animation: light-on 300ms ease;
  }
`,bt=a`
  ${mt}

  .expanded-panel {
    padding: var(--spacing-md) var(--spacing-lg) var(--spacing-lg);
    background: var(--expanded-panel-background);
    border-top: 1px solid var(--border-color);
  }

  .brightness-container {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
  }

  .brightness-slider {
    flex: 1;
    height: 8px;
    -webkit-appearance: none;
    appearance: none;
    background: var(--slider-track-color);
    border-radius: var(--radius-full);
    outline: none;
    cursor: pointer;
  }

  .brightness-slider::-webkit-slider-runnable-track {
    height: 8px;
    border-radius: var(--radius-full);
    background: linear-gradient(
      to right,
      var(--slider-active-color) 0%,
      var(--slider-active-color) var(--slider-progress, 0%),
      var(--slider-track-color) var(--slider-progress, 0%),
      var(--slider-track-color) 100%
    );
  }

  .brightness-slider::-moz-range-track {
    height: 8px;
    border-radius: var(--radius-full);
    background: var(--slider-track-color);
  }

  .brightness-slider::-moz-range-progress {
    height: 8px;
    border-radius: var(--radius-full);
    background: var(--slider-active-color);
  }

  .brightness-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: var(--slider-active-color);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    margin-top: -6px;
  }

  .brightness-slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: var(--slider-active-color);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    border: none;
  }

  .brightness-label {
    font-size: 12px;
    font-weight: 500;
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
    color: var(--text-secondary);
    min-width: 36px;
    text-align: right;
  }

  .scene-grid {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
  }

  .no-scenes-message {
    font-size: 12px;
    color: var(--text-secondary);
    font-style: italic;
  }
`,yt=a`
  ${mt}

  .scene-chip {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--scene-chip-background);
    border: 1px solid var(--scene-chip-border);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: border-color var(--transition-fast), background var(--transition-fast);
    user-select: none;
  }

  .scene-chip:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .scene-chip.active {
    border-color: var(--scene-chip-active-border);
    background: rgba(var(--accent-color-rgb, 3, 169, 244), 0.15);
  }

  .scene-color-swatch {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.2);
    flex-shrink: 0;
    overflow: hidden;
    position: relative;
  }

  .scene-color-swatch .scene-picture {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .scene-chip-name {
    font-size: 11px;
    font-weight: 500;
    color: var(--text-primary);
    max-width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .scene-chip-checkmark {
    --mdc-icon-size: 14px;
    color: var(--accent-color);
    flex-shrink: 0;
  }
`,$t=a`
  ${mt}

  .card-config {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  ha-textfield {
    display: block;
    width: 100%;
  }

  ha-formfield {
    display: block;
    margin: var(--spacing-sm) 0;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: var(--spacing-lg);
    padding-bottom: var(--spacing-sm);
    border-bottom: 1px solid var(--border-color);
  }

  .section-title {
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--text-secondary);
  }

  .room-editor {
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    margin-bottom: var(--spacing-sm);
    overflow: hidden;
  }

  .room-editor-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-md);
    background: var(--row-background);
    cursor: pointer;
  }

  .room-editor-header:hover {
    background: var(--row-background-hover);
  }

  .room-name {
    flex: 1;
    font-weight: 500;
    color: var(--text-primary);
  }

  .room-editor-content {
    padding: var(--spacing-md);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .lights-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: var(--spacing-sm);
  }

  .light-editor {
    padding: var(--spacing-md);
    background: var(--row-background);
    border-radius: var(--radius-md);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .type-selection {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }

  .type-selection label {
    font-size: 12px;
    color: var(--text-secondary);
    margin-right: var(--spacing-sm);
  }

  .remove-button {
    align-self: flex-end;
    --mdc-theme-primary: var(--error-color, #f44336);
  }

  mwc-button {
    --mdc-theme-primary: var(--accent-color);
  }

  mwc-icon-button {
    --mdc-icon-button-size: 36px;
    --mdc-icon-size: 20px;
  }

  /* Column selector styles */
  .columns-selector,
  .column-assignment {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .columns-selector label,
  .column-assignment label {
    font-size: 12px;
    color: var(--text-secondary);
  }

  .column-buttons {
    display: flex;
    gap: var(--spacing-xs);
  }

  .column-button {
    min-width: 48px;
    --mdc-theme-primary: var(--text-secondary);
  }

  .column-button.active {
    --mdc-theme-primary: var(--accent-color);
    background: rgba(var(--accent-color-rgb, 3, 169, 244), 0.1);
  }

  /* Power entities styles */
  .power-entities-info {
    font-size: 12px;
    color: var(--text-secondary);
    font-style: italic;
    margin-bottom: var(--spacing-sm);
  }

  .power-entity-row {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }

  .power-entity-row ha-entity-picker {
    flex: 1;
  }

  .no-lights-message,
  .no-rooms-message {
    font-size: 12px;
    color: var(--text-secondary);
    font-style: italic;
    padding: var(--spacing-md);
    text-align: center;
  }
`;a`
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;const wt="lights-room-card",xt={title:"Lights",show_total_power:!0,rooms:[]},Et="mdi:lightbulb",Ct="mdi:lightbulb-outline",At="mdi:cog",St="mdi:chevron-down",kt="mdi:chevron-right",Mt="mdi:flash",Pt="mdi:check",Rt="mdi:plus",Ot="mdi:delete",Lt={relax:"#FF9500",energize:"#66B2FF",concentrate:"#FFFFFF",read:"#FFD700",dimmed:"#FF8C00",nightlight:"#FF6B6B",bright:"#FFFFFF","tropical twilight":"#FF69B4","arctic aurora":"#00CED1","spring blossom":"#FFB7C5","savanna sunset":"#FF6347",tokyo:"#DA70D6",galaxy:"#9400D3",nebula:"#8A2BE2",sunset:"#FF4500",forest:"#228B22",ocean:"#0077BE"};class Tt{constructor(t){this.hass=t}async sendMessage(t){return this.hass.connection.sendMessagePromise(t)}async getEntityArea(t){try{const e=await this.sendMessage({type:"search/related",item_type:"entity",item_id:t});return e?.area?.[0]??null}catch(e){return console.error(`Error getting area for entity ${t}:`,e),null}}async getAreaScenes(t){try{const e=await this.sendMessage({type:"search/related",item_type:"area",item_id:t});return e?.scene??[]}catch(e){return console.error(`Error getting scenes for area ${t}:`,e),[]}}async getDeviceEntities(t){try{const e=await this.sendMessage({type:"search/related",item_type:"device",item_id:t});return e?.entity??[]}catch(e){return console.error(`Error getting entities for device ${t}:`,e),[]}}}function Ft(t,e){const i=t.states[e];if(!i)return null;const o=i.attributes?.friendly_name?.toLowerCase()??"";for(const[t,e]of Object.entries(Lt))if(o.includes(t))return e;return null}function Nt(t,e){if(!t)return t;if(e){const i=[e.replace(/_/g," "),e.split("_").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" ")];for(const e of i)if(t.toLowerCase().startsWith(e.toLowerCase())){const i=t.slice(e.length).trim();if(i)return i}}if(t.split(" ").length>1){const e=["relax","energize","concentrate","read","dimmed","nightlight","bright","tropical twilight","arctic aurora","spring blossom","savanna sunset","tokyo","galaxy","nebula","sunset","forest","ocean","amethyst valley","baby's breath","frosty dawn","still waters","soho","chinatown","golden pond","honolulu","fairfax","hal","tyrell","painted sky","rolling hills","starlight","moonlight","lake placid","lake mist","disturbia","ibiza","miami","cancun","rio","palm beach","motown","memphis","hampton","bossa nova"],i=t.toLowerCase();for(const o of e)if(i.endsWith(o)){const e=i.lastIndexOf(o);return t.slice(e)}}return t}class It{constructor(t=3e5){this.cache=new Map,this.loadingPromises=new Map,this.timestamps=new Map,this.cacheTimeout=t}isCacheValid(t){const e=this.timestamps.get(t);return!!e&&Date.now()-e<this.cacheTimeout}async getScenesForLight(t,e){if(this.cache.has(e)&&this.isCacheValid(e))return this.cache.get(e);if(this.loadingPromises.has(e))return this.loadingPromises.get(e);const i=async function(t,e){const i=new Tt(t),o=await i.getEntityArea(e);return o?(await i.getAreaScenes(o)).map(e=>{const i=t.states[e],s=i?.attributes?.friendly_name??e.split(".")[1]??e,n=i?.attributes?.entity_picture;return{entity_id:e,name:Nt(s,o),color:Ft(t,e)??void 0,entity_picture:n,is_active:!1}}):[]}(t,e);this.loadingPromises.set(e,i);try{const t=await i;return this.cache.set(e,t),this.timestamps.set(e,Date.now()),t}finally{this.loadingPromises.delete(e)}}invalidate(t){t?(this.cache.delete(t),this.timestamps.delete(t)):(this.cache.clear(),this.timestamps.clear())}clear(){this.cache.clear(),this.loadingPromises.clear(),this.timestamps.clear()}}let zt=null;function Ut(t,e){return function(t,e,i){i/=100;const o=(e/=100)*Math.min(i,1-i),s=e=>{const s=(e+t/30)%12,n=i-o*Math.max(Math.min(s-3,9-s,1),-1);return Math.round(255*n).toString(16).padStart(2,"0")};return`#${s(0)}${s(8)}${s(4)}`}(t,e,50)}var Ht=function(t,e){return t<e?-1:t>e?1:0},Dt=function(t){return t.reduce(function(t,e){return t+e},0)},Bt=function(){function t(t){this.colors=t}var e=t.prototype;return e.palette=function(){return this.colors},e.map=function(t){return t},t}(),jt=function(){function t(t,e,i){return(t<<10)+(e<<5)+i}function e(t){var e=[],i=!1;function o(){e.sort(t),i=!0}return{push:function(t){e.push(t),i=!1},peek:function(t){return i||o(),void 0===t&&(t=e.length-1),e[t]},pop:function(){return i||o(),e.pop()},size:function(){return e.length},map:function(t){return e.map(t)},debug:function(){return i||o(),e}}}function i(t,e,i,o,s,n,r){var a=this;a.r1=t,a.r2=e,a.g1=i,a.g2=o,a.b1=s,a.b2=n,a.histo=r}function o(){this.vboxes=new e(function(t,e){return Ht(t.vbox.count()*t.vbox.volume(),e.vbox.count()*e.vbox.volume())})}function s(e,i){if(i.count()){var o=i.r2-i.r1+1,s=i.g2-i.g1+1,n=Math.max.apply(null,[o,s,i.b2-i.b1+1]);if(1==i.count())return[i.copy()];var r,a,c,l,h=0,d=[],p=[];if(n==o)for(r=i.r1;r<=i.r2;r++){for(l=0,a=i.g1;a<=i.g2;a++)for(c=i.b1;c<=i.b2;c++)l+=e[t(r,a,c)]||0;d[r]=h+=l}else if(n==s)for(r=i.g1;r<=i.g2;r++){for(l=0,a=i.r1;a<=i.r2;a++)for(c=i.b1;c<=i.b2;c++)l+=e[t(a,r,c)]||0;d[r]=h+=l}else for(r=i.b1;r<=i.b2;r++){for(l=0,a=i.r1;a<=i.r2;a++)for(c=i.g1;c<=i.g2;c++)l+=e[t(a,c,r)]||0;d[r]=h+=l}return d.forEach(function(t,e){p[e]=h-t}),function(t){var e,o,s,n,a,c=t+"1",l=t+"2",u=0;for(r=i[c];r<=i[l];r++)if(d[r]>h/2){for(s=i.copy(),n=i.copy(),a=(e=r-i[c])<=(o=i[l]-r)?Math.min(i[l]-1,~~(r+o/2)):Math.max(i[c],~~(r-1-e/2));!d[a];)a++;for(u=p[a];!u&&d[a-1];)u=p[--a];return s[l]=a,n[c]=s[l]+1,[s,n]}}(n==o?"r":n==s?"g":"b")}}return i.prototype={volume:function(t){var e=this;return e._volume&&!t||(e._volume=(e.r2-e.r1+1)*(e.g2-e.g1+1)*(e.b2-e.b1+1)),e._volume},count:function(e){var i=this,o=i.histo;if(!i._count_set||e){var s,n,r,a=0;for(s=i.r1;s<=i.r2;s++)for(n=i.g1;n<=i.g2;n++)for(r=i.b1;r<=i.b2;r++)a+=o[t(s,n,r)]||0;i._count=a,i._count_set=!0}return i._count},copy:function(){var t=this;return new i(t.r1,t.r2,t.g1,t.g2,t.b1,t.b2,t.histo)},avg:function(e){var i=this,o=i.histo;if(!i._avg||e){var s,n,r,a,c=0,l=0,h=0,d=0;if(i.r1===i.r2&&i.g1===i.g2&&i.b1===i.b2)i._avg=[i.r1<<3,i.g1<<3,i.b1<<3];else{for(n=i.r1;n<=i.r2;n++)for(r=i.g1;r<=i.g2;r++)for(a=i.b1;a<=i.b2;a++)c+=s=o[t(n,r,a)]||0,l+=s*(n+.5)*8,h+=s*(r+.5)*8,d+=s*(a+.5)*8;i._avg=c?[~~(l/c),~~(h/c),~~(d/c)]:[~~(8*(i.r1+i.r2+1)/2),~~(8*(i.g1+i.g2+1)/2),~~(8*(i.b1+i.b2+1)/2)]}}return i._avg},contains:function(t){var e=this,i=t[0]>>3;return gval=t[1]>>3,bval=t[2]>>3,i>=e.r1&&i<=e.r2&&gval>=e.g1&&gval<=e.g2&&bval>=e.b1&&bval<=e.b2}},o.prototype={push:function(t){this.vboxes.push({vbox:t,color:t.avg()})},palette:function(){return this.vboxes.map(function(t){return t.color})},size:function(){return this.vboxes.size()},map:function(t){for(var e=this.vboxes,i=0;i<e.size();i++)if(e.peek(i).vbox.contains(t))return e.peek(i).color;return this.nearest(t)},nearest:function(t){for(var e,i,o,s=this.vboxes,n=0;n<s.size();n++)((i=Math.sqrt(Math.pow(t[0]-s.peek(n).color[0],2)+Math.pow(t[1]-s.peek(n).color[1],2)+Math.pow(t[2]-s.peek(n).color[2],2)))<e||void 0===e)&&(e=i,o=s.peek(n).color);return o},forcebw:function(){var t=this.vboxes;t.sort(function(t,e){return Ht(Dt(t.color),Dt(e.color))});var e=t[0].color;e[0]<5&&e[1]<5&&e[2]<5&&(t[0].color=[0,0,0]);var i=t.length-1,o=t[i].color;o[0]>251&&o[1]>251&&o[2]>251&&(t[i].color=[255,255,255])}},{quantize:function(n,r){if(!Number.isInteger(r)||r<1||r>256)throw new Error("Invalid maximum color count. It must be an integer between 1 and 256.");if(!n.length||r<2||r>256)return!1;if(!n.length||r<2||r>256)return!1;for(var a=[],c=new Set,l=0;l<n.length;l++){var h=n[l],d=h.join(",");c.has(d)||(c.add(d),a.push(h))}if(a.length<=r)return new Bt(a);var p=function(e){var i,o=new Array(32768);return e.forEach(function(e){i=t(e[0]>>3,e[1]>>3,e[2]>>3),o[i]=(o[i]||0)+1}),o}(n);p.forEach(function(){});var u=function(t,e){var o,s,n,r=1e6,a=0,c=1e6,l=0,h=1e6,d=0;return t.forEach(function(t){(o=t[0]>>3)<r?r=o:o>a&&(a=o),(s=t[1]>>3)<c?c=s:s>l&&(l=s),(n=t[2]>>3)<h?h=n:n>d&&(d=n)}),new i(r,a,c,l,h,d,e)}(n,p),g=new e(function(t,e){return Ht(t.count(),e.count())});function m(t,e){for(var i,o=t.size(),n=0;n<1e3;){if(o>=e)return;if(n++>1e3)return;if((i=t.pop()).count()){var r=s(p,i),a=r[0],c=r[1];if(!a)return;t.push(a),c&&(t.push(c),o++)}else t.push(i),n++}}g.push(u),m(g,.75*r);for(var f=new e(function(t,e){return Ht(t.count()*t.volume(),e.count()*e.volume())});g.size();)f.push(g.pop());m(f,r);for(var v=new o;f.size();)v.push(f.pop());return v}}}().quantize,Vt=function(t){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.width=this.canvas.width=t.naturalWidth,this.height=this.canvas.height=t.naturalHeight,this.context.drawImage(t,0,0,this.width,this.height)};Vt.prototype.getImageData=function(){return this.context.getImageData(0,0,this.width,this.height)};var qt=function(){};qt.prototype.getColor=function(t,e){return void 0===e&&(e=10),this.getPalette(t,5,e)[0]},qt.prototype.getPalette=function(t,e,i){var o=function(t){var e=t.colorCount,i=t.quality;if(void 0!==e&&Number.isInteger(e)){if(1===e)throw new Error("colorCount should be between 2 and 20. To get one color, call getColor() instead of getPalette()");e=Math.max(e,2),e=Math.min(e,20)}else e=10;return(void 0===i||!Number.isInteger(i)||i<1)&&(i=10),{colorCount:e,quality:i}}({colorCount:e,quality:i}),s=new Vt(t),n=function(t,e,i){for(var o,s,n,r,a,c=t,l=[],h=0;h<e;h+=i)s=c[0+(o=4*h)],n=c[o+1],r=c[o+2],(void 0===(a=c[o+3])||a>=125)&&(s>250&&n>250&&r>250||l.push([s,n,r]));return l}(s.getImageData().data,s.width*s.height,o.quality),r=jt(n,o.colorCount);return r?r.palette():null},qt.prototype.getColorFromUrl=function(t,e,i){var o=this,s=document.createElement("img");s.addEventListener("load",function(){var n=o.getPalette(s,5,i);e(n[0],t)}),s.src=t},qt.prototype.getImageData=function(t,e){var o=new XMLHttpRequest;o.open("GET",t,!0),o.responseType="arraybuffer",o.onload=function(){if(200==this.status){var t=new Uint8Array(this.response);i=t.length;for(var o=new Array(i),s=0;s<t.length;s++)o[s]=String.fromCharCode(t[s]);var n=o.join(""),r=window.btoa(n);e("data:image/png;base64,"+r)}},o.send()},qt.prototype.getColorAsync=function(t,e,i){var o=this;this.getImageData(t,function(t){var s=document.createElement("img");s.addEventListener("load",function(){var t=o.getPalette(s,5,i);e(t[0],this)}),s.src=t})};const Wt=new Map;function Gt(t,e,i){return"#"+[t,e,i].map(t=>{const e=t.toString(16);return 1===e.length?"0"+e:e}).join("")}let Jt=class extends ct{constructor(){super(...arguments),this.active=!1,this._extractedColor=null,this._isLoadingColor=!1}static get styles(){return[yt,a`
        :host {
          display: inline-block;
        }
      `]}updated(t){t.has("scene")&&this.scene&&this._extractColorFromPicture()}async _extractColorFromPicture(){var t;if(this.scene.color)this._extractedColor=null;else if(this.scene.entity_picture){this._isLoadingColor=!0;try{const e=await(t=this.scene.entity_picture,Wt.has(t)?Promise.resolve(Wt.get(t)??null):new Promise(e=>{if(!t)return Wt.set(t,null),void e(null);const i=new Image;i.crossOrigin="anonymous",i.onload=()=>{try{const o=(new qt).getColor(i);if(o&&Array.isArray(o)&&o.length>=3){const i={rgb:[o[0],o[1],o[2]],hex:Gt(o[0],o[1],o[2])};Wt.set(t,i),e(i)}else Wt.set(t,null),e(null)}catch(i){console.warn("ColorThief extraction failed:",i),Wt.set(t,null),e(null)}},i.onerror=()=>{console.warn("Failed to load image for color extraction:",t),Wt.set(t,null),e(null)},i.src=t}));this._extractedColor=e}catch(t){console.warn("Failed to extract scene color:",t),this._extractedColor=null}finally{this._isLoadingColor=!1}}}_handleClick(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("scene-activate",{detail:{sceneId:this.scene.entity_id},bubbles:!0,composed:!0}))}render(){const t=this._extractedColor?.hex??this.scene.color??"#888888";if(this._extractedColor){const[t,e,i]=this._extractedColor.rgb}return V`
      <div
        class="scene-chip ${this.active?"active":""}"
        @click=${this._handleClick}
        role="button"
        tabindex="0"
        aria-label="Activate ${this.scene.name} scene"
        aria-pressed=${this.active}
      >
        <div
          class="scene-color-swatch"
          style="background-color: ${t}"
        >
          ${this.scene.entity_picture?V`
            <img 
              src="${this.scene.entity_picture}" 
              alt="" 
              class="scene-picture"
              loading="lazy"
            />
          `:W}
        </div>
        <span class="scene-chip-name">${this.scene.name}</span>
        ${this.active?V`<ha-icon class="scene-chip-checkmark" icon=${Pt}></ha-icon>`:W}
      </div>
    `}};t([ut({attribute:!1})],Jt.prototype,"scene",void 0),t([ut({type:Boolean})],Jt.prototype,"active",void 0),t([gt()],Jt.prototype,"_extractedColor",void 0),t([gt()],Jt.prototype,"_isLoadingColor",void 0),Jt=t([ht("scene-chip")],Jt);let Kt=class extends ct{constructor(){super(),this.value=0,this.disabled=!1,this._localValue=0,this._debouncedChange=function(t,e){let i=null;return function(...o){i&&clearTimeout(i),i=setTimeout(()=>{i=null,t(...o)},e)}}(t=>{this.dispatchEvent(new CustomEvent("brightness-change",{detail:{value:t},bubbles:!0,composed:!0}))},150)}static get styles(){return[bt,a`
        :host {
          display: block;
        }

        .brightness-container {
          margin-bottom: 0;
        }
      `]}willUpdate(t){t.has("value")&&(this._localValue=this.value)}_handleInput(t){const e=t.target;this._localValue=parseInt(e.value,10),this.requestUpdate(),this._debouncedChange(this._localValue)}_handleChange(t){const e=t.target,i=parseInt(e.value,10);this.dispatchEvent(new CustomEvent("brightness-change",{detail:{value:i},bubbles:!0,composed:!0}))}render(){const t=this._localValue;return V`
      <div class="brightness-container">
        <input
          type="range"
          class="brightness-slider"
          min="0"
          max="100"
          .value=${String(this._localValue)}
          ?disabled=${this.disabled}
          @input=${this._handleInput}
          @change=${this._handleChange}
          aria-label="Brightness"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow=${this._localValue}
          style="--slider-progress: ${t}%"
        />
        <span class="brightness-label">${this._localValue}%</span>
      </div>
    `}};t([ut({type:Number})],Kt.prototype,"value",void 0),t([ut({type:Boolean})],Kt.prototype,"disabled",void 0),t([gt()],Kt.prototype,"_localValue",void 0),Kt=t([ht("brightness-slider")],Kt);let Yt=class extends ct{constructor(){super(...arguments),this.expanded=!1,this.scenes=[],this._turningOn=!1}static get styles(){return[_t,bt,a`
        :host {
          display: block;
        }
      `]}_getEntityState(){return this.hass.states[this.config.entity]}_getPowerState(){if(this.config.power_entity)return this.hass.states[this.config.power_entity]}_isOn(){const t=this._getEntityState();return"on"===t?.state}_isAvailable(){const t=this._getEntityState();return"unavailable"!==t?.state&&void 0!==t?.state}_getBrightnessPercent(){if("hue"!==this.config.type)return null;const t=this._getEntityState();if(!t||"on"!==t.state)return null;const e=t.attributes.brightness;return void 0===e?null:Math.round(e/255*100)}_getCurrentColor(){const t=this._getEntityState();return t&&"on"===t.state?function(t){const e=t.attributes;if(e.rgb_color)return"#"+e.rgb_color.map(t=>t.toString(16).padStart(2,"0")).join("");if(e.hs_color)return Ut(e.hs_color[0],e.hs_color[1]);if(e.color_temp){const t=e.color_temp;return t<250?"#F5F5FF":t<350?"#FFFAF0":"#FFE4B5"}return null}(t):null}_getDisplayName(){if(this.config.name)return this.config.name;const t=this._getEntityState();return t?.attributes.friendly_name??this.config.entity.split(".")[1]??this.config.entity}_getPower(){const t=this._getPowerState();if(!t||"unavailable"===t.state)return null;const e=parseFloat(t.state);return isNaN(e)?null:e}_renderStatus(){const t=this._isAvailable(),e=this._isOn();if(!t)return V`<span class="light-status unavailable">Unavailable</span>`;if(!e)return V`<span class="light-status">Off</span>`;const i=this._getPower();if(null!==i)return V`<span class="light-status">${Math.round(i)} W</span>`;const o=this._getBrightnessPercent();return null!==o&&"hue"===this.config.type?V`<span class="light-status">${o}%</span>`:V`<span class="light-status">On</span>`}_handleToggle(t){t.stopPropagation();const e=!this._isOn();this.hass.callService("homeassistant","toggle",{entity_id:this.config.entity}),e&&(this._turningOn=!0,setTimeout(()=>{this._turningOn=!1},300))}_handleExpandClick(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("expand-toggle",{detail:{entityId:this.config.entity},bubbles:!0,composed:!0}))}_handleBrightnessChange(t){const e=t.detail.value;this.hass.callService("light","turn_on",{entity_id:this.config.entity,brightness_pct:e})}_handleSceneActivate(t){const e=t.detail.sceneId;this.hass.callService("scene","turn_on",{entity_id:e}),this.dispatchEvent(new CustomEvent("scene-activated",{detail:{entityId:this.config.entity,sceneId:e},bubbles:!0,composed:!0}))}_renderExpandedPanel(){if(!this.expanded)return W;const t=this._getBrightnessPercent()??0,e=this._isAvailable();return V`
      <div class="expanded-panel">
        <brightness-slider
          .value=${t}
          ?disabled=${!e}
          @brightness-change=${this._handleBrightnessChange}
        ></brightness-slider>

        ${this.scenes.length>0?V`
              <div class="scene-grid">
                ${this.scenes.map(t=>V`
                    <scene-chip
                      .scene=${t}
                      .active=${this.activeSceneId===t.entity_id}
                      @scene-activate=${this._handleSceneActivate}
                    ></scene-chip>
                  `)}
              </div>
            `:V`<div class="no-scenes-message">No scenes found for this light</div>`}
      </div>
    `}render(){const t=this._isOn(),e=this._isAvailable(),i=this._getCurrentColor(),o=t&&null!==i,s="hue"===this.config.type;let n="light-icon";e?t&&(n+=" on",o&&(n+=" colored")):n+=" unavailable",this._turningOn&&(n+=" turning-on");const r=t?Et:Ct,a=o?i:t?"#FBBF24":null;return V`
      <div
        class="light-row ${o?"has-scene-color":""}"
        style="${o?`--scene-color: ${i}`:""}"
      >
        <div class="light-row-main" @click=${this._handleToggle}>
          <ha-icon
            class=${n}
            icon=${r}
            style="${a?`color: ${a}`:""}"
          ></ha-icon>
          <span class="light-name">${this._getDisplayName()}</span>
          ${this._renderStatus()}
          ${s?V`
                <div
                  class="expand-button ${this.expanded?"expanded":""}"
                  @click=${this._handleExpandClick}
                  role="button"
                  tabindex="0"
                  aria-label="Expand light controls"
                  aria-expanded=${this.expanded}
                >
                  <ha-icon icon=${At}></ha-icon>
                </div>
              `:W}
        </div>
        ${this._renderExpandedPanel()}
      </div>
    `}};t([ut({attribute:!1})],Yt.prototype,"hass",void 0),t([ut({attribute:!1})],Yt.prototype,"config",void 0),t([ut({type:Boolean})],Yt.prototype,"expanded",void 0),t([ut({attribute:!1})],Yt.prototype,"scenes",void 0),t([ut({type:String})],Yt.prototype,"activeSceneId",void 0),t([gt()],Yt.prototype,"_turningOn",void 0),Yt=t([ht("light-row")],Yt);let Zt=class extends ct{constructor(){super(...arguments),this.collapsed=!1,this.expandedLights=new Set,this.scenesMap=new Map,this.activeScenes=new Map}static get styles(){return[vt,a`
        :host {
          display: block;
        }
      `]}_calculateRoomPower(){let t=0,e=!1;for(const i of this.config.lights)if(i.power_entity){const o=this.hass.states[i.power_entity];if(o&&"unavailable"!==o.state){const i=parseFloat(o.state);isNaN(i)||(t+=i,e=!0)}}return e?t:null}_handleHeaderClick(){this.dispatchEvent(new CustomEvent("room-collapse-toggle",{detail:{roomName:this.config.name},bubbles:!0,composed:!0}))}_handleLightExpandToggle(t){const e=t.detail.entityId;this.dispatchEvent(new CustomEvent("light-expand-toggle",{detail:{entityId:e},bubbles:!0,composed:!0}))}_handleSceneActivated(t){this.dispatchEvent(new CustomEvent("scene-activated",{detail:t.detail,bubbles:!0,composed:!0}))}_renderHeader(){const t=this._calculateRoomPower();return V`
      <div class="room-header" @click=${this._handleHeaderClick}>
        <div class="room-header-left">
          <ha-icon
            class="collapse-icon ${this.collapsed?"collapsed":""}"
            icon=${St}
          ></ha-icon>
          <span class="room-header-name">${this.config.name}</span>
        </div>
        <div class="room-header-right">
          ${null!==t?V`<span class="room-header-power">${Math.round(t)} W</span>`:""}
        </div>
      </div>
    `}_renderLights(){return V`
      <div class="room-content ${this.collapsed?"collapsed":""}">
        ${this.config.lights.map(t=>V`
            <light-row
              .hass=${this.hass}
              .config=${t}
              .expanded=${this.expandedLights.has(t.entity)}
              .scenes=${this.scenesMap.get(t.entity)??[]}
              .activeSceneId=${this.activeScenes.get(t.entity)}
              @expand-toggle=${this._handleLightExpandToggle}
              @scene-activated=${this._handleSceneActivated}
            ></light-row>
          `)}
      </div>
    `}render(){return V`
      <div class="room-section">
        ${this._renderHeader()}
        ${this._renderLights()}
      </div>
    `}};t([ut({attribute:!1})],Zt.prototype,"hass",void 0),t([ut({attribute:!1})],Zt.prototype,"config",void 0),t([ut({type:Boolean})],Zt.prototype,"collapsed",void 0),t([ut({attribute:!1})],Zt.prototype,"expandedLights",void 0),t([ut({attribute:!1})],Zt.prototype,"scenesMap",void 0),t([ut({attribute:!1})],Zt.prototype,"activeScenes",void 0),Zt=t([ht("room-section")],Zt),console.info("%c LIGHTS-ROOM-CARD %c v1.0.0 ","color: white; background: #FF6B35; font-weight: bold;","color: #FF6B35; background: white; font-weight: bold;");let Xt=class extends ct{constructor(){super(...arguments),this._expandedLights=new Set,this._collapsedRooms=new Set,this._scenesMap=new Map,this._activeScenes=new Map,this._loadingScenes=new Set}static get styles(){return[ft,vt,a`
        :host {
          display: block;
        }
      `]}setConfig(t){if(!t)throw new Error("Invalid configuration");if(!t.rooms||!Array.isArray(t.rooms))throw new Error("You must define at least one room");for(const e of t.rooms){if(!e.name)throw new Error("Each room must have a name");if(!e.lights||!Array.isArray(e.lights))throw new Error(`Room "${e.name}" must have a lights array`);for(const t of e.lights){if(!t.entity)throw new Error(`Each light in room "${e.name}" must have an entity`);if(!t.type||!["hue","switch"].includes(t.type))throw new Error(`Light "${t.entity}" must have type "hue" or "switch"`)}}this._config={...xt,...t},this._collapsedRooms=new Set(t.rooms.filter(t=>t.collapsed).map(t=>t.name))}getCardSize(){if(!this._config?.rooms)return 1;let t=0;for(const e of this._config.rooms)this._collapsedRooms.has(e.name)||(t+=e.lights.length);return 1+this._config.rooms.length+t}static async getConfigElement(){return await Promise.resolve().then(function(){return ie}),document.createElement("lights-room-card-editor")}static getStubConfig(){return{title:"Lights",show_total_power:!0,rooms:[{name:"Living Room",lights:[{entity:"light.living_room",type:"hue"}]}]}}updated(t){super.updated(t),(t.has("_expandedLights")||t.has("hass"))&&this._loadScenesForExpandedLights()}shouldUpdate(t){if(t.has("_config")||t.has("_expandedLights")||t.has("_collapsedRooms")||t.has("_scenesMap")||t.has("_activeScenes")||t.has("_loadingScenes"))return!0;if(t.has("hass")){const e=t.get("hass");if(!e)return!0;const i=this._getRelevantEntities();for(const t of i)if(e.states[t]!==this.hass.states[t])return!0;return!1}return!0}_getRelevantEntities(){if(!this._config?.rooms)return[];const t=[];this._config.power_entities&&t.push(...this._config.power_entities);for(const e of this._config.rooms)for(const i of e.lights)t.push(i.entity),i.power_entity&&t.push(i.power_entity);return t}async _loadScenesForExpandedLights(){if(!this.hass||!this._config?.rooms)return;const t=(zt||(zt=new It),zt);for(const e of this._config.rooms)for(const i of e.lights)if("hue"===i.type&&this._expandedLights.has(i.entity)&&!this._scenesMap.has(i.entity)&&!this._loadingScenes.has(i.entity)){this._loadingScenes=new Set([...this._loadingScenes,i.entity]);try{const e=await t.getScenesForLight(this.hass,i.entity);this._scenesMap=new Map([...this._scenesMap,[i.entity,e]])}catch(t){console.error(`Failed to load scenes for ${i.entity}:`,t),this._scenesMap=new Map([...this._scenesMap,[i.entity,[]]])}finally{const t=new Set(this._loadingScenes);t.delete(i.entity),this._loadingScenes=t}}}_calculateTotalPower(){if(this._config.power_entities&&this._config.power_entities.length>0){let t=0,e=!1;for(const i of this._config.power_entities){const o=this.hass.states[i];if(o&&"unavailable"!==o.state&&"unknown"!==o.state){const i=parseFloat(o.state);isNaN(i)||(t+=i,e=!0)}}return e?t:null}if(!this._config?.rooms)return null;let t=0,e=!1;for(const i of this._config.rooms)for(const o of i.lights)if(o.power_entity){const i=this.hass.states[o.power_entity];if(i&&"unavailable"!==i.state){const o=parseFloat(i.state);isNaN(o)||(t+=o,e=!0)}}return e?t:null}_handleRoomCollapseToggle(t){const e=t.detail.roomName,i=new Set(this._collapsedRooms);i.has(e)?i.delete(e):i.add(e),this._collapsedRooms=i}_handleLightExpandToggle(t){const e=t.detail.entityId,i=new Set(this._expandedLights);i.has(e)?i.delete(e):i.add(e),this._expandedLights=i}_handleSceneActivated(t){const{entityId:e,sceneId:i}=t.detail;this._activeScenes=new Map([...this._activeScenes,[e,i]])}_renderHeader(){const t=this._config.title??"Lights",e=this._config.show_total_power??!0?this._calculateTotalPower():null;return V`
      <div class="card-header">
        <h1 class="card-title">${t}</h1>
        ${null!==e?V`
              <div class="total-power">
                <ha-icon icon=${Mt}></ha-icon>
                <span>${Math.round(e)} W</span>
              </div>
            `:W}
      </div>
    `}_renderRooms(){if(!this._config.rooms||0===this._config.rooms.length)return V`
        <div class="no-rooms-message">
          No rooms configured. Open the card editor to add rooms.
        </div>
      `;const t=this._config.columns??1;if(t<=1)return V`
        <div class="rooms-container">
          ${this._config.rooms.map((t,e)=>V`
              <room-section
                .hass=${this.hass}
                .config=${t}
                .collapsed=${this._collapsedRooms.has(t.name)}
                .expandedLights=${this._expandedLights}
                .scenesMap=${this._scenesMap}
                .activeScenes=${this._activeScenes}
                @room-collapse-toggle=${this._handleRoomCollapseToggle}
                @light-expand-toggle=${this._handleLightExpandToggle}
                @scene-activated=${this._handleSceneActivated}
              ></room-section>
              ${e<this._config.rooms.length-1?V`<div class="room-divider"></div>`:W}
            `)}
        </div>
      `;const e=new Map;for(let i=1;i<=t;i++)e.set(i,[]);return this._config.rooms.forEach(i=>{const o=i.column??1,s=Math.max(1,Math.min(t,o)),n=e.get(s)??[];n.push(i),e.set(s,n)}),V`
      <div class="rooms-container columns-${t}">
        ${Array.from({length:t},(t,e)=>e+1).map(t=>{const i=e.get(t)??[];return V`
            <div class="column">
              ${i.map((t,e)=>V`
                  <room-section
                    .hass=${this.hass}
                    .config=${t}
                    .collapsed=${this._collapsedRooms.has(t.name)}
                    .expandedLights=${this._expandedLights}
                    .scenesMap=${this._scenesMap}
                    .activeScenes=${this._activeScenes}
                    @room-collapse-toggle=${this._handleRoomCollapseToggle}
                    @light-expand-toggle=${this._handleLightExpandToggle}
                    @scene-activated=${this._handleSceneActivated}
                  ></room-section>
                  ${e<i.length-1?V`<div class="room-divider"></div>`:W}
                `)}
            </div>
          `})}
      </div>
    `}render(){return this._config&&this.hass?V`
      <ha-card>
        ${this._renderHeader()}
        ${this._renderRooms()}
      </ha-card>
    `:V``}};var Qt,te;t([ut({attribute:!1})],Xt.prototype,"hass",void 0),t([gt()],Xt.prototype,"_config",void 0),t([gt()],Xt.prototype,"_expandedLights",void 0),t([gt()],Xt.prototype,"_collapsedRooms",void 0),t([gt()],Xt.prototype,"_scenesMap",void 0),t([gt()],Xt.prototype,"_activeScenes",void 0),t([gt()],Xt.prototype,"_loadingScenes",void 0),Xt=t([ht(wt)],Xt),window.customCards=window.customCards||[],window.customCards.push({type:wt,name:"Lights Room Card",description:"A card for managing lights grouped by room with Hue scene support",preview:!0}),function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(Qt||(Qt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(te||(te={}));let ee=class extends ct{constructor(){super(...arguments),this._expandedRooms=new Set([0])}static get styles(){return[$t,a`
        :host {
          display: block;
        }
      `]}setConfig(t){this._config=t}_fireConfigChanged(){!function(t,e,i,o){o=o||{},i=null==i?{}:i;var s=new Event(e,{bubbles:void 0===o.bubbles||o.bubbles,cancelable:Boolean(o.cancelable),composed:void 0===o.composed||o.composed});s.detail=i,t.dispatchEvent(s)}(this,"config-changed",{config:this._config})}_valueChanged(t){const e=t.target,i=e.getAttribute("data-config-value")||e.getAttribute("configValue");if(!i)return;let o=e.value;"checkbox"===e.type&&(o=e.checked),this._config={...this._config,[i]:o},this._fireConfigChanged()}_toggleRoomExpanded(t){const e=new Set(this._expandedRooms);e.has(t)?e.delete(t):e.add(t),this._expandedRooms=e}_addRoom(){const t={name:`Room ${(this._config.rooms?.length??0)+1}`,lights:[]};this._config={...this._config,rooms:[...this._config.rooms??[],t]},this._expandedRooms=new Set([...this._expandedRooms,this._config.rooms.length-1]),this._fireConfigChanged()}_deleteRoom(t,e){t.stopPropagation();const i=[...this._config.rooms??[]];i.splice(e,1),this._config={...this._config,rooms:i};const o=new Set;for(const t of this._expandedRooms)t<e?o.add(t):t>e&&o.add(t-1);this._expandedRooms=o,this._fireConfigChanged()}_roomValueChanged(t,e,i){const o=t.target;let s=o.value;"checkbox"===o.type&&(s=o.checked);const n=[...this._config.rooms??[]];n[e]={...n[e],[i]:s},this._config={...this._config,rooms:n},this._fireConfigChanged()}_addLight(t){const e=[...this._config.rooms??[]];e[t]={...e[t],lights:[...e[t].lights,{entity:"",type:"hue"}]},this._config={...this._config,rooms:e},this._fireConfigChanged()}_removeLight(t,e){const i=[...this._config.rooms??[]],o=[...i[t].lights];o.splice(e,1),i[t]={...i[t],lights:o},this._config={...this._config,rooms:i},this._fireConfigChanged()}_lightValueChanged(t,e,i,o){const s=[...this._config.rooms??[]],n=[...s[e].lights];n[i]={...n[i],[o]:t||void 0},s[e]={...s[e],lights:n},this._config={...this._config,rooms:s},this._fireConfigChanged()}_renderLightEditor(t,e,i){return V`
      <div class="light-editor">
        <ha-entity-picker
          .hass=${this.hass}
          .value=${t.entity}
          .label=${"Entity"}
          .includeDomains=${["light","switch"]}
          @value-changed=${t=>this._lightValueChanged(t.detail.value,e,i,"entity")}
          allow-custom-entity
        ></ha-entity-picker>

        <div class="type-selection">
          <label>Type</label>
          <ha-formfield label="Hue">
            <ha-radio
              name="type-${e}-${i}"
              .checked=${"hue"===t.type}
              @change=${()=>this._lightValueChanged("hue",e,i,"type")}
            ></ha-radio>
          </ha-formfield>
          <ha-formfield label="Switch">
            <ha-radio
              name="type-${e}-${i}"
              .checked=${"switch"===t.type}
              @change=${()=>this._lightValueChanged("switch",e,i,"type")}
            ></ha-radio>
          </ha-formfield>
        </div>

        <ha-entity-picker
          .hass=${this.hass}
          .value=${t.power_entity??""}
          .label=${"Power Entity (optional)"}
          .includeDomains=${["sensor"]}
          @value-changed=${t=>this._lightValueChanged(t.detail.value,e,i,"power_entity")}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-textfield
          label="Name Override (optional)"
          .value=${t.name??""}
          @input=${t=>this._lightValueChanged(t.target.value,e,i,"name")}
        ></ha-textfield>

        <mwc-button class="remove-button" @click=${()=>this._removeLight(e,i)}>
          Remove
        </mwc-button>
      </div>
    `}_renderRoomEditor(t,e){const i=this._expandedRooms.has(e);return V`
      <div class="room-editor">
        <div class="room-editor-header" @click=${()=>this._toggleRoomExpanded(e)}>
          <ha-icon icon=${i?St:kt}></ha-icon>
          <span class="room-name">${t.name||"Unnamed Room"}</span>
          <mwc-icon-button @click=${t=>this._deleteRoom(t,e)}>
            <ha-icon icon=${Ot}></ha-icon>
          </mwc-icon-button>
        </div>

        ${i?V`
              <div class="room-editor-content">
                <ha-textfield
                  label="Room Name"
                  .value=${t.name}
                  @input=${t=>this._roomValueChanged(t,e,"name")}
                ></ha-textfield>

                ${(this._config.columns??1)>1?V`
                      <div class="column-assignment">
                        <label>Assign to Column</label>
                        <div class="column-buttons">
                          ${Array.from({length:this._config.columns??1},(t,e)=>e+1).map(i=>V`
                              <mwc-button
                                class="column-button ${(t.column??1)===i?"active":""}"
                                @click=${()=>this._setRoomColumn(e,i)}
                              >
                                ${i}
                              </mwc-button>
                            `)}
                        </div>
                      </div>
                    `:W}

                <ha-formfield label="Start collapsed">
                  <ha-switch
                    .checked=${t.collapsed??!1}
                    @change=${t=>this._roomValueChanged(t,e,"collapsed")}
                  ></ha-switch>
                </ha-formfield>

                <div class="lights-header">
                  <span class="section-title">LIGHTS</span>
                  <mwc-button @click=${()=>this._addLight(e)}>
                    <ha-icon icon=${Rt}></ha-icon>
                    Add Light
                  </mwc-button>
                </div>

                ${t.lights?.map((t,i)=>this._renderLightEditor(t,e,i))}

                ${0===t.lights?.length?V`<div class="no-lights-message">No lights added yet</div>`:W}
              </div>
            `:W}
      </div>
    `}render(){if(!this.hass||!this._config)return V``;const t=this._config.columns??1;return V`
      <div class="card-config">
        <ha-textfield
          label="Title"
          .value=${this._config.title??"Lights"}
          data-config-value="title"
          @input=${this._valueChanged}
        ></ha-textfield>

        <ha-formfield label="Show total power consumption">
          <ha-switch
            .checked=${this._config.show_total_power??!0}
            data-config-value="show_total_power"
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>

        <div class="section-header">
          <span class="section-title">LAYOUT</span>
        </div>

        <div class="columns-selector">
          <label>Number of Columns</label>
          <div class="column-buttons">
            ${[1,2,3,4].map(e=>V`
                <mwc-button
                  class="column-button ${t===e?"active":""}"
                  @click=${()=>this._setColumns(e)}
                >
                  ${e}
                </mwc-button>
              `)}
          </div>
        </div>

        <div class="section-header">
          <span class="section-title">POWER ENTITIES (Optional)</span>
        </div>

        <div class="power-entities-info">
          Custom entities for total power calculation. Leave empty to sum individual light power values.
        </div>

        ${(this._config.power_entities??[]).map((t,e)=>this._renderPowerEntityEditor(t,e))}

        <mwc-button @click=${this._addPowerEntity}>
          <ha-icon icon=${Rt}></ha-icon>
          Add Power Entity
        </mwc-button>

        <div class="section-header">
          <span class="section-title">ROOMS</span>
          <mwc-button @click=${this._addRoom}>
            <ha-icon icon=${Rt}></ha-icon>
            Add Room
          </mwc-button>
        </div>

        ${this._config.rooms?.map((t,e)=>this._renderRoomEditor(t,e))}

        ${this._config.rooms&&0!==this._config.rooms.length?W:V`<div class="no-rooms-message">No rooms configured yet</div>`}
      </div>
    `}_setColumns(t){this._config={...this._config,columns:t},this._fireConfigChanged()}_setRoomColumn(t,e){const i=[...this._config.rooms??[]];i[t]={...i[t],column:e},this._config={...this._config,rooms:i},this._fireConfigChanged()}_renderPowerEntityEditor(t,e){return V`
      <div class="power-entity-row">
        <ha-entity-picker
          .hass=${this.hass}
          .value=${t}
          .label=${"Power Entity ${index + 1}"}
          .includeDomains=${["sensor"]}
          @value-changed=${t=>this._powerEntityChanged(t.detail.value,e)}
          allow-custom-entity
        ></ha-entity-picker>
        <mwc-icon-button @click=${()=>this._removePowerEntity(e)}>
          <ha-icon icon=${Ot}></ha-icon>
        </mwc-icon-button>
      </div>
    `}_addPowerEntity(){const t=[...this._config.power_entities??[],""];this._config={...this._config,power_entities:t},this._fireConfigChanged()}_removePowerEntity(t){const e=[...this._config.power_entities??[]];e.splice(t,1),this._config={...this._config,power_entities:e.length>0?e:void 0},this._fireConfigChanged()}_powerEntityChanged(t,e){const i=[...this._config.power_entities??[]];i[e]=t;const o=i.filter(t=>t);this._config={...this._config,power_entities:o.length>0?o:void 0},this._fireConfigChanged()}};t([ut({attribute:!1})],ee.prototype,"hass",void 0),t([gt()],ee.prototype,"_config",void 0),t([gt()],ee.prototype,"_expandedRooms",void 0),ee=t([ht("lights-room-card-editor")],ee);var ie=Object.freeze({__proto__:null,get LightsRoomCardEditor(){return ee}});export{Xt as LightsRoomCard};
