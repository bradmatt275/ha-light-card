function t(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:g}=Object,u=globalThis,m=u.trustedTypes,f=m?m.emptyScript:"",v=u.reactiveElementPolyfillSupport,_=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!c(t,e),$={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);o?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const n=o.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const n=this.constructor;if(!1===s&&(o=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??b)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[_("elementProperties")]=new Map,w[_("finalized")]=new Map,v?.({ReactiveElement:w}),(u.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,E=t=>t,A=x.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+k,P=`<${M}>`,R=document,O=()=>R.createComment(""),L=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,N="[ \t\n\f\r]",F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,I=/>/g,H=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,B=/"/g,D=/^(?:script|style|textarea|title)$/i,j=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),V=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),q=new WeakMap,G=R.createTreeWalker(R,129);function J(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":3===e?"<math>":"",r=F;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,h=0;for(;h<i.length&&(r.lastIndex=h,c=r.exec(i),null!==c);)h=r.lastIndex,r===F?"!--"===c[1]?r=U:void 0!==c[1]?r=I:void 0!==c[2]?(D.test(c[2])&&(o=RegExp("</"+c[2],"g")),r=H):void 0!==c[3]&&(r=H):r===H?">"===c[0]?(r=o??F,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?H:'"'===c[3]?B:z):r===B||r===z?r=H:r===U||r===I?r=F:(r=H,o=void 0);const d=r===H&&t[e+1].startsWith("/>")?" ":"";n+=r===F?i+P:l>=0?(s.push(a),i.slice(0,l)+C+i.slice(l)+k+d):i+k+(-2===l?e:d)}return[J(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Y{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[c,l]=K(t,e);if(this.el=Y.createElement(c,i),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=G.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=l[n++],i=s.getAttribute(t).split(k),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?et:"?"===r[1]?it:"@"===r[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:o}),s.removeAttribute(t));if(D.test(s.tagName)){const t=s.textContent.split(k),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],O()),G.nextNode(),a.push({type:2,index:++o});s.append(t[e],O())}}}else if(8===s.nodeType)if(s.data===M)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(k,t+1));)a.push({type:7,index:o}),t+=k.length-1}o++}}static createElement(t,e){const i=R.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,s){if(e===V)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=L(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=Z(t,o._$AS(t,e.values),o,s)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??R).importNode(e,!0);G.currentNode=s;let o=G.nextNode(),n=0,r=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new X(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new ot(o,this,t)),this._$AV.push(e),a=i[++r]}n!==a?.index&&(o=G.nextNode(),n++)}return G.currentNode=R,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),L(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&L(this._$AH)?this._$AA.nextSibling.data=t:this.T(R.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Q(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new Y(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new X(this.O(O()),this.O(O()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=E(t).nextSibling;E(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=Z(this,t,e,0),n=!L(t)||t!==this._$AH&&t!==V,n&&(this._$AH=t);else{const s=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=Z(this,s[i+r],e,r),a===V&&(a=this._$AH[r]),n||=!L(a)||a!==this._$AH[r],a===W?t=W:t!==W&&(t+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class st extends tt{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??W)===V)return;const i=this._$AH,s=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const nt=x.litHtmlPolyfillSupport;nt?.(Y,X),(x.litHtmlVersions??=[]).push("3.3.2");const rt=globalThis;class at extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new X(e.insertBefore(O(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}at._$litElement$=!0,at.finalized=!0,rt.litElementHydrateSupport?.({LitElement:at});const ct=rt.litElementPolyfillSupport;ct?.({LitElement:at}),(rt.litElementVersions??=[]).push("4.2.2");const lt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:b},dt=(t=ht,e,i)=>{const{kind:s,metadata:o}=i;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function pt(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function gt(t){return pt({...t,state:!0,attribute:!1})}const ut=r`
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
`,mt=r`
  ${ut}

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
`,ft=r`
  ${ut}

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
`,vt=r`
  ${ut}

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
`,_t=r`
  ${ut}

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
`,yt=r`
  ${ut}

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

  .scene-chip-name {
    font-size: 11px;
    font-weight: 500;
    color: var(--text-primary);
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .scene-chip-checkmark {
    --mdc-icon-size: 14px;
    color: var(--accent-color);
    flex-shrink: 0;
  }
`,bt=r`
  ${ut}

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

  /* Column assignment styles for room editor */
  .column-assignment {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

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

  ha-select {
    width: 100%;
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
`;r`
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;const $t="lights-room-card",wt={title:"Lights",show_total_power:!0,rooms:[]},xt="mdi:lightbulb",Et="mdi:lightbulb-outline",At="mdi:cog",St="mdi:chevron-down",Ct="mdi:chevron-right",kt="mdi:flash",Mt="mdi:check",Pt="mdi:plus",Rt="mdi:delete",Ot={relax:"#FF9500",energize:"#66B2FF",concentrate:"#FFFFFF",read:"#FFD700",dimmed:"#FF8C00",nightlight:"#FF6B6B",bright:"#FFFFFF","tropical twilight":"#FF69B4","arctic aurora":"#00CED1","spring blossom":"#FFB7C5","savanna sunset":"#FF6347",tokyo:"#DA70D6",galaxy:"#9400D3",nebula:"#8A2BE2",sunset:"#FF4500",forest:"#228B22",ocean:"#0077BE"};class Lt{constructor(t){this.hass=t}async sendMessage(t){return this.hass.connection.sendMessagePromise(t)}async getEntityArea(t){try{const e=await this.sendMessage({type:"search/related",item_type:"entity",item_id:t});return e?.area?.[0]??null}catch(e){return console.error(`Error getting area for entity ${t}:`,e),null}}async getAreaScenes(t){try{const e=await this.sendMessage({type:"search/related",item_type:"area",item_id:t});return e?.scene??[]}catch(e){return console.error(`Error getting scenes for area ${t}:`,e),[]}}async getDeviceEntities(t){try{const e=await this.sendMessage({type:"search/related",item_type:"device",item_id:t});return e?.entity??[]}catch(e){return console.error(`Error getting entities for device ${t}:`,e),[]}}}function Tt(t,e){const i=t.states[e];if(!i)return null;const s=i.attributes?.friendly_name?.toLowerCase()??"";for(const[t,e]of Object.entries(Ot))if(s.includes(t))return e;return null}function Nt(t,e){if(!t)return t;if(e){const i=[e.replace(/_/g," "),e.split("_").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" ")];for(const e of i)if(t.toLowerCase().startsWith(e.toLowerCase())){const i=t.slice(e.length).trim();if(i)return i}}if(t.split(" ").length>1){const e=["relax","energize","concentrate","read","dimmed","nightlight","bright","tropical twilight","arctic aurora","spring blossom","savanna sunset","tokyo","galaxy","nebula","sunset","forest","ocean","amethyst valley","baby's breath","frosty dawn","still waters","soho","chinatown","golden pond","honolulu","fairfax","hal","tyrell","painted sky","rolling hills","starlight","moonlight","lake placid","lake mist","disturbia","ibiza","miami","cancun","rio","palm beach","motown","memphis","hampton","bossa nova"],i=t.toLowerCase();for(const s of e)if(i.endsWith(s)){const e=i.lastIndexOf(s);return t.slice(e)}}return t}class Ft{constructor(t=3e5){this.cache=new Map,this.loadingPromises=new Map,this.timestamps=new Map,this.cacheTimeout=t}isCacheValid(t){const e=this.timestamps.get(t);return!!e&&Date.now()-e<this.cacheTimeout}async getScenesForLight(t,e){if(this.cache.has(e)&&this.isCacheValid(e))return this.cache.get(e);if(this.loadingPromises.has(e))return this.loadingPromises.get(e);const i=async function(t,e){const i=new Lt(t),s=await i.getEntityArea(e);return s?(await i.getAreaScenes(s)).map(e=>{const i=t.states[e],o=i?.attributes?.friendly_name??e.split(".")[1]??e,n=i?.attributes?.entity_picture;return{entity_id:e,name:Nt(o,s),color:Tt(t,e)??void 0,entity_picture:n,is_active:!1}}):[]}(t,e);this.loadingPromises.set(e,i);try{const t=await i;return this.cache.set(e,t),this.timestamps.set(e,Date.now()),t}finally{this.loadingPromises.delete(e)}}invalidate(t){t?(this.cache.delete(t),this.timestamps.delete(t)):(this.cache.clear(),this.timestamps.clear())}clear(){this.cache.clear(),this.loadingPromises.clear(),this.timestamps.clear()}}let Ut=null;function It(t,e){return function(t,e,i){i/=100;const s=(e/=100)*Math.min(i,1-i),o=e=>{const o=(e+t/30)%12,n=i-s*Math.max(Math.min(o-3,9-o,1),-1);return Math.round(255*n).toString(16).padStart(2,"0")};return`#${o(0)}${o(8)}${o(4)}`}(t,e,50)}let Ht=class extends at{constructor(){super(...arguments),this.active=!1}static get styles(){return[yt,r`
        :host {
          display: inline-block;
        }
      `]}_handleClick(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("scene-activate",{detail:{sceneId:this.scene.entity_id},bubbles:!0,composed:!0}))}render(){return j`
      <div
        class="scene-chip ${this.active?"active":""}"
        @click=${this._handleClick}
        role="button"
        tabindex="0"
        aria-label="Activate ${this.scene.name} scene"
        aria-pressed=${this.active}
      >
        <span class="scene-chip-name">${this.scene.name}</span>
        ${this.active?j`<ha-icon class="scene-chip-checkmark" icon=${Mt}></ha-icon>`:W}
      </div>
    `}};t([pt({attribute:!1})],Ht.prototype,"scene",void 0),t([pt({type:Boolean})],Ht.prototype,"active",void 0),Ht=t([lt("scene-chip")],Ht);let zt=class extends at{constructor(){super(),this.value=0,this.disabled=!1,this._localValue=0,this._debouncedChange=function(t,e){let i=null;return function(...s){i&&clearTimeout(i),i=setTimeout(()=>{i=null,t(...s)},e)}}(t=>{this.dispatchEvent(new CustomEvent("brightness-change",{detail:{value:t},bubbles:!0,composed:!0}))},150)}static get styles(){return[_t,r`
        :host {
          display: block;
        }

        .brightness-container {
          margin-bottom: 0;
        }
      `]}willUpdate(t){t.has("value")&&(this._localValue=this.value)}_handleInput(t){const e=t.target;this._localValue=parseInt(e.value,10),this.requestUpdate(),this._debouncedChange(this._localValue)}_handleChange(t){const e=t.target,i=parseInt(e.value,10);this.dispatchEvent(new CustomEvent("brightness-change",{detail:{value:i},bubbles:!0,composed:!0}))}render(){const t=this._localValue;return j`
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
    `}};t([pt({type:Number})],zt.prototype,"value",void 0),t([pt({type:Boolean})],zt.prototype,"disabled",void 0),t([gt()],zt.prototype,"_localValue",void 0),zt=t([lt("brightness-slider")],zt);let Bt=class extends at{constructor(){super(...arguments),this.expanded=!1,this.scenes=[],this._turningOn=!1}static get styles(){return[vt,_t,r`
        :host {
          display: block;
        }
      `]}_getEntityState(){return this.hass.states[this.config.entity]}_getPowerState(){if(this.config.power_entity)return this.hass.states[this.config.power_entity]}_isOn(){const t=this._getEntityState();return"on"===t?.state}_isAvailable(){const t=this._getEntityState();return"unavailable"!==t?.state&&void 0!==t?.state}_getBrightnessPercent(){if("hue"!==this.config.type)return null;const t=this._getEntityState();if(!t||"on"!==t.state)return null;const e=t.attributes.brightness;return void 0===e?null:Math.round(e/255*100)}_getCurrentColor(){const t=this._getEntityState();return t&&"on"===t.state?function(t){const e=t.attributes;if(e.rgb_color)return"#"+e.rgb_color.map(t=>t.toString(16).padStart(2,"0")).join("");if(e.hs_color)return It(e.hs_color[0],e.hs_color[1]);if(e.color_temp){const t=e.color_temp;return t<250?"#F5F5FF":t<350?"#FFFAF0":"#FFE4B5"}return null}(t):null}_getDisplayName(){if(this.config.name)return this.config.name;const t=this._getEntityState();return t?.attributes.friendly_name??this.config.entity.split(".")[1]??this.config.entity}_getPower(){const t=this._getPowerState();if(!t||"unavailable"===t.state)return null;const e=parseFloat(t.state);return isNaN(e)?null:e}_renderStatus(){const t=this._isAvailable(),e=this._isOn();if(!t)return j`<span class="light-status unavailable">Unavailable</span>`;if(!e)return j`<span class="light-status">Off</span>`;const i=this._getPower();if(null!==i)return j`<span class="light-status">${Math.round(i)} W</span>`;const s=this._getBrightnessPercent();return null!==s&&"hue"===this.config.type?j`<span class="light-status">${s}%</span>`:j`<span class="light-status">On</span>`}_handleToggle(t){t.stopPropagation();const e=!this._isOn();this.hass.callService("homeassistant","toggle",{entity_id:this.config.entity}),e&&(this._turningOn=!0,setTimeout(()=>{this._turningOn=!1},300))}_handleExpandClick(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("expand-toggle",{detail:{entityId:this.config.entity},bubbles:!0,composed:!0}))}_handleBrightnessChange(t){const e=t.detail.value;this.hass.callService("light","turn_on",{entity_id:this.config.entity,brightness_pct:e})}_handleSceneActivate(t){const e=t.detail.sceneId;this.hass.callService("scene","turn_on",{entity_id:e}),this.dispatchEvent(new CustomEvent("scene-activated",{detail:{entityId:this.config.entity,sceneId:e},bubbles:!0,composed:!0}))}_renderExpandedPanel(){if(!this.expanded)return W;const t=this._getBrightnessPercent()??0,e=this._isAvailable();return j`
      <div class="expanded-panel">
        <brightness-slider
          .value=${t}
          ?disabled=${!e}
          @brightness-change=${this._handleBrightnessChange}
        ></brightness-slider>

        ${this.scenes.length>0?j`
              <div class="scene-grid">
                ${this.scenes.map(t=>j`
                    <scene-chip
                      .scene=${t}
                      .active=${this.activeSceneId===t.entity_id}
                      @scene-activate=${this._handleSceneActivate}
                    ></scene-chip>
                  `)}
              </div>
            `:j`<div class="no-scenes-message">No scenes found for this light</div>`}
      </div>
    `}render(){const t=this._isOn(),e=this._isAvailable(),i=this._getCurrentColor(),s=t&&null!==i,o="hue"===this.config.type;let n="light-icon";e?t&&(n+=" on",s&&(n+=" colored")):n+=" unavailable",this._turningOn&&(n+=" turning-on");const r=t?xt:Et,a=s?i:t?"#FBBF24":null;return j`
      <div
        class="light-row ${s?"has-scene-color":""}"
        style="${s?`--scene-color: ${i}`:""}"
      >
        <div class="light-row-main" @click=${this._handleToggle}>
          <ha-icon
            class=${n}
            icon=${r}
            style="${a?`color: ${a}`:""}"
          ></ha-icon>
          <span class="light-name">${this._getDisplayName()}</span>
          ${this._renderStatus()}
          ${o?j`
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
    `}};t([pt({attribute:!1})],Bt.prototype,"hass",void 0),t([pt({attribute:!1})],Bt.prototype,"config",void 0),t([pt({type:Boolean})],Bt.prototype,"expanded",void 0),t([pt({attribute:!1})],Bt.prototype,"scenes",void 0),t([pt({type:String})],Bt.prototype,"activeSceneId",void 0),t([gt()],Bt.prototype,"_turningOn",void 0),Bt=t([lt("light-row")],Bt);let Dt=class extends at{constructor(){super(...arguments),this.collapsed=!1,this.expandedLights=new Set,this.scenesMap=new Map,this.activeScenes=new Map}static get styles(){return[ft,r`
        :host {
          display: block;
        }
      `]}_calculateRoomPower(){let t=0,e=!1;for(const i of this.config.lights)if(i.power_entity){const s=this.hass.states[i.power_entity];if(s&&"unavailable"!==s.state){const i=parseFloat(s.state);isNaN(i)||(t+=i,e=!0)}}return e?t:null}_handleHeaderClick(){this.dispatchEvent(new CustomEvent("room-collapse-toggle",{detail:{roomName:this.config.name},bubbles:!0,composed:!0}))}_handleLightExpandToggle(t){const e=t.detail.entityId;this.dispatchEvent(new CustomEvent("light-expand-toggle",{detail:{entityId:e},bubbles:!0,composed:!0}))}_handleSceneActivated(t){this.dispatchEvent(new CustomEvent("scene-activated",{detail:t.detail,bubbles:!0,composed:!0}))}_renderHeader(){const t=this._calculateRoomPower();return j`
      <div class="room-header" @click=${this._handleHeaderClick}>
        <div class="room-header-left">
          <ha-icon
            class="collapse-icon ${this.collapsed?"collapsed":""}"
            icon=${St}
          ></ha-icon>
          <span class="room-header-name">${this.config.name}</span>
        </div>
        <div class="room-header-right">
          ${null!==t?j`<span class="room-header-power">${Math.round(t)} W</span>`:""}
        </div>
      </div>
    `}_renderLights(){return j`
      <div class="room-content ${this.collapsed?"collapsed":""}">
        ${this.config.lights.map(t=>j`
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
    `}render(){return j`
      <div class="room-section">
        ${this._renderHeader()}
        ${this._renderLights()}
      </div>
    `}};t([pt({attribute:!1})],Dt.prototype,"hass",void 0),t([pt({attribute:!1})],Dt.prototype,"config",void 0),t([pt({type:Boolean})],Dt.prototype,"collapsed",void 0),t([pt({attribute:!1})],Dt.prototype,"expandedLights",void 0),t([pt({attribute:!1})],Dt.prototype,"scenesMap",void 0),t([pt({attribute:!1})],Dt.prototype,"activeScenes",void 0),Dt=t([lt("room-section")],Dt),console.info("%c LIGHTS-ROOM-CARD %c v1.0.0 ","color: white; background: #FF6B35; font-weight: bold;","color: #FF6B35; background: white; font-weight: bold;");let jt=class extends at{constructor(){super(...arguments),this._expandedLights=new Set,this._collapsedRooms=new Set,this._scenesMap=new Map,this._activeScenes=new Map,this._loadingScenes=new Set}static get styles(){return[mt,ft,r`
        :host {
          display: block;
        }
      `]}setConfig(t){if(!t)throw new Error("Invalid configuration");if(!t.rooms||!Array.isArray(t.rooms))throw new Error("You must define at least one room");for(const e of t.rooms){if(!e.name)throw new Error("Each room must have a name");if(!e.lights||!Array.isArray(e.lights))throw new Error(`Room "${e.name}" must have a lights array`);for(const t of e.lights){if(!t.entity)throw new Error(`Each light in room "${e.name}" must have an entity`);if(!t.type||!["hue","switch"].includes(t.type))throw new Error(`Light "${t.entity}" must have type "hue" or "switch"`)}}this._config={...wt,...t},this._collapsedRooms=new Set(t.rooms.filter(t=>t.collapsed).map(t=>t.name))}getCardSize(){if(!this._config?.rooms)return 1;let t=0;for(const e of this._config.rooms)this._collapsedRooms.has(e.name)||(t+=e.lights.length);return 1+this._config.rooms.length+t}static async getConfigElement(){return await Promise.resolve().then(function(){return Gt}),document.createElement("lights-room-card-editor")}static getStubConfig(){return{title:"Lights",show_total_power:!0,rooms:[{name:"Living Room",lights:[{entity:"light.living_room",type:"hue"}]}]}}updated(t){super.updated(t),(t.has("_expandedLights")||t.has("hass"))&&this._loadScenesForExpandedLights()}shouldUpdate(t){if(t.has("_config")||t.has("_expandedLights")||t.has("_collapsedRooms")||t.has("_scenesMap")||t.has("_activeScenes")||t.has("_loadingScenes"))return!0;if(t.has("hass")){const e=t.get("hass");if(!e)return!0;const i=this._getRelevantEntities();for(const t of i)if(e.states[t]!==this.hass.states[t])return!0;return!1}return!0}_getRelevantEntities(){if(!this._config?.rooms)return[];const t=[];this._config.power_entities&&t.push(...this._config.power_entities);for(const e of this._config.rooms)for(const i of e.lights)t.push(i.entity),i.power_entity&&t.push(i.power_entity);return t}async _loadScenesForExpandedLights(){if(!this.hass||!this._config?.rooms)return;const t=(Ut||(Ut=new Ft),Ut);for(const e of this._config.rooms)for(const i of e.lights)if("hue"===i.type&&this._expandedLights.has(i.entity)&&!this._scenesMap.has(i.entity)&&!this._loadingScenes.has(i.entity)){this._loadingScenes=new Set([...this._loadingScenes,i.entity]);try{const e=await t.getScenesForLight(this.hass,i.entity);this._scenesMap=new Map([...this._scenesMap,[i.entity,e]])}catch(t){console.error(`Failed to load scenes for ${i.entity}:`,t),this._scenesMap=new Map([...this._scenesMap,[i.entity,[]]])}finally{const t=new Set(this._loadingScenes);t.delete(i.entity),this._loadingScenes=t}}}_calculateTotalPower(){if(this._config.power_entities&&this._config.power_entities.length>0){let t=0,e=!1;for(const i of this._config.power_entities){const s=this.hass.states[i];if(s&&"unavailable"!==s.state&&"unknown"!==s.state){const i=parseFloat(s.state);isNaN(i)||(t+=i,e=!0)}}return e?t:null}if(!this._config?.rooms)return null;let t=0,e=!1;for(const i of this._config.rooms)for(const s of i.lights)if(s.power_entity){const i=this.hass.states[s.power_entity];if(i&&"unavailable"!==i.state){const s=parseFloat(i.state);isNaN(s)||(t+=s,e=!0)}}return e?t:null}_handleRoomCollapseToggle(t){const e=t.detail.roomName,i=new Set(this._collapsedRooms);i.has(e)?i.delete(e):i.add(e),this._collapsedRooms=i}_handleLightExpandToggle(t){const e=t.detail.entityId,i=new Set(this._expandedLights);i.has(e)?i.delete(e):i.add(e),this._expandedLights=i}_handleSceneActivated(t){const{entityId:e,sceneId:i}=t.detail;this._activeScenes=new Map([...this._activeScenes,[e,i]])}_renderHeader(){const t=this._config.title??"Lights",e=this._config.show_total_power??!0?this._calculateTotalPower():null;return j`
      <div class="card-header">
        <h1 class="card-title">${t}</h1>
        ${null!==e?j`
              <div class="total-power">
                <ha-icon icon=${kt}></ha-icon>
                <span>${Math.round(e)} W</span>
              </div>
            `:W}
      </div>
    `}_renderRooms(){if(!this._config.rooms||0===this._config.rooms.length)return j`
        <div class="no-rooms-message">
          No rooms configured. Open the card editor to add rooms.
        </div>
      `;const t=this._config.columns??1;if(t<=1)return j`
        <div class="rooms-container">
          ${this._config.rooms.map((t,e)=>j`
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
              ${e<this._config.rooms.length-1?j`<div class="room-divider"></div>`:W}
            `)}
        </div>
      `;const e=new Map;for(let i=1;i<=t;i++)e.set(i,[]);return this._config.rooms.forEach(i=>{const s=i.column??1,o=Math.max(1,Math.min(t,s)),n=e.get(o)??[];n.push(i),e.set(o,n)}),j`
      <div class="rooms-container columns-${t}">
        ${Array.from({length:t},(t,e)=>e+1).map(t=>{const i=e.get(t)??[];return j`
            <div class="column">
              ${i.map((t,e)=>j`
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
                  ${e<i.length-1?j`<div class="room-divider"></div>`:W}
                `)}
            </div>
          `})}
      </div>
    `}render(){return this._config&&this.hass?j`
      <ha-card>
        ${this._renderHeader()}
        ${this._renderRooms()}
      </ha-card>
    `:j``}};var Vt,Wt;t([pt({attribute:!1})],jt.prototype,"hass",void 0),t([gt()],jt.prototype,"_config",void 0),t([gt()],jt.prototype,"_expandedLights",void 0),t([gt()],jt.prototype,"_collapsedRooms",void 0),t([gt()],jt.prototype,"_scenesMap",void 0),t([gt()],jt.prototype,"_activeScenes",void 0),t([gt()],jt.prototype,"_loadingScenes",void 0),jt=t([lt($t)],jt),window.customCards=window.customCards||[],window.customCards.push({type:$t,name:"Lights Room Card",description:"A card for managing lights grouped by room with Hue scene support",preview:!0}),function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(Vt||(Vt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(Wt||(Wt={}));let qt=class extends at{constructor(){super(...arguments),this._expandedRooms=new Set([0])}static get styles(){return[bt,r`
        :host {
          display: block;
        }
      `]}setConfig(t){this._config=t}_fireConfigChanged(){!function(t,e,i,s){s=s||{},i=null==i?{}:i;var o=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});o.detail=i,t.dispatchEvent(o)}(this,"config-changed",{config:this._config})}_valueChanged(t){const e=t.target,i=e.getAttribute("data-config-value")||e.getAttribute("configValue");if(!i)return;let s=e.value;"checkbox"===e.type&&(s=e.checked),this._config={...this._config,[i]:s},this._fireConfigChanged()}_toggleRoomExpanded(t){const e=new Set(this._expandedRooms);e.has(t)?e.delete(t):e.add(t),this._expandedRooms=e}_addRoom(){const t={name:`Room ${(this._config.rooms?.length??0)+1}`,lights:[]};this._config={...this._config,rooms:[...this._config.rooms??[],t]},this._expandedRooms=new Set([...this._expandedRooms,this._config.rooms.length-1]),this._fireConfigChanged()}_deleteRoom(t,e){t.stopPropagation();const i=[...this._config.rooms??[]];i.splice(e,1),this._config={...this._config,rooms:i};const s=new Set;for(const t of this._expandedRooms)t<e?s.add(t):t>e&&s.add(t-1);this._expandedRooms=s,this._fireConfigChanged()}_roomValueChanged(t,e,i){const s=t.target;let o=s.value;"checkbox"===s.type&&(o=s.checked);const n=[...this._config.rooms??[]];n[e]={...n[e],[i]:o},this._config={...this._config,rooms:n},this._fireConfigChanged()}_addLight(t){const e=[...this._config.rooms??[]];e[t]={...e[t],lights:[...e[t].lights,{entity:"",type:"hue"}]},this._config={...this._config,rooms:e},this._fireConfigChanged()}_removeLight(t,e){const i=[...this._config.rooms??[]],s=[...i[t].lights];s.splice(e,1),i[t]={...i[t],lights:s},this._config={...this._config,rooms:i},this._fireConfigChanged()}_lightValueChanged(t,e,i,s){const o=[...this._config.rooms??[]],n=[...o[e].lights];n[i]={...n[i],[s]:t||void 0},o[e]={...o[e],lights:n},this._config={...this._config,rooms:o},this._fireConfigChanged()}_renderLightEditor(t,e,i){return j`
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
    `}_renderRoomEditor(t,e){const i=this._expandedRooms.has(e);return j`
      <div class="room-editor">
        <div class="room-editor-header" @click=${()=>this._toggleRoomExpanded(e)}>
          <ha-icon icon=${i?St:Ct}></ha-icon>
          <span class="room-name">${t.name||"Unnamed Room"}</span>
          <mwc-icon-button @click=${t=>this._deleteRoom(t,e)}>
            <ha-icon icon=${Rt}></ha-icon>
          </mwc-icon-button>
        </div>

        ${i?j`
              <div class="room-editor-content">
                <ha-textfield
                  label="Room Name"
                  .value=${t.name}
                  @input=${t=>this._roomValueChanged(t,e,"name")}
                ></ha-textfield>

                ${(this._config.columns??1)>1?j`
                      <div class="column-assignment">
                        <label>Assign to Column</label>
                        <div class="column-buttons">
                          ${Array.from({length:this._config.columns??1},(t,e)=>e+1).map(i=>j`
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
                    <ha-icon icon=${Pt}></ha-icon>
                    Add Light
                  </mwc-button>
                </div>

                ${t.lights?.map((t,i)=>this._renderLightEditor(t,e,i))}

                ${0===t.lights?.length?j`<div class="no-lights-message">No lights added yet</div>`:W}
              </div>
            `:W}
      </div>
    `}render(){if(!this.hass||!this._config)return j``;const t=this._config.columns??1;return j`
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

        <ha-select
          label="Number of Columns"
          .value=${String(t)}
          @selected=${this._columnsChanged}
          @closed=${t=>t.stopPropagation()}
          fixedMenuPosition
        >
          ${[1,2,3,4].map(t=>j`
              <mwc-list-item .value=${String(t)}>${t}</mwc-list-item>
            `)}
        </ha-select>

        <div class="section-header">
          <span class="section-title">POWER ENTITIES (Optional)</span>
        </div>

        <div class="power-entities-info">
          Custom entities for total power calculation. Leave empty to sum individual light power values.
        </div>

        ${(this._config.power_entities??[]).map((t,e)=>this._renderPowerEntityEditor(t,e))}

        <mwc-button @click=${this._addPowerEntity}>
          <ha-icon icon=${Pt}></ha-icon>
          Add Power Entity
        </mwc-button>

        <div class="section-header">
          <span class="section-title">ROOMS</span>
          <mwc-button @click=${this._addRoom}>
            <ha-icon icon=${Pt}></ha-icon>
            Add Room
          </mwc-button>
        </div>

        ${this._config.rooms?.map((t,e)=>this._renderRoomEditor(t,e))}

        ${this._config.rooms&&0!==this._config.rooms.length?W:j`<div class="no-rooms-message">No rooms configured yet</div>`}
      </div>
    `}_columnsChanged(t){const e=t.target.value,i=parseInt(e,10);!isNaN(i)&&i>=1&&i<=4&&(this._config={...this._config,columns:i},this._fireConfigChanged())}_setRoomColumn(t,e){const i=[...this._config.rooms??[]];i[t]={...i[t],column:e},this._config={...this._config,rooms:i},this._fireConfigChanged()}_renderPowerEntityEditor(t,e){return j`
      <div class="power-entity-row">
        <ha-entity-picker
          .hass=${this.hass}
          .value=${t}
          .label=${`Power Entity ${e+1}`}
          .includeDomains=${["sensor"]}
          @value-changed=${t=>this._powerEntityChanged(t.detail.value,e)}
          allow-custom-entity
        ></ha-entity-picker>
        <mwc-icon-button @click=${()=>this._removePowerEntity(e)}>
          <ha-icon icon=${Rt}></ha-icon>
        </mwc-icon-button>
      </div>
    `}_addPowerEntity(){const t=[...this._config.power_entities??[],""];this._config={...this._config,power_entities:t},this._fireConfigChanged()}_removePowerEntity(t){const e=[...this._config.power_entities??[]];e.splice(t,1),this._config={...this._config,power_entities:e.length>0?e:void 0},this._fireConfigChanged()}_powerEntityChanged(t,e){const i=[...this._config.power_entities??[]];i[e]=t;const s=i.filter(t=>t);this._config={...this._config,power_entities:s.length>0?s:void 0},this._fireConfigChanged()}};t([pt({attribute:!1})],qt.prototype,"hass",void 0),t([gt()],qt.prototype,"_config",void 0),t([gt()],qt.prototype,"_expandedRooms",void 0),qt=t([lt("lights-room-card-editor")],qt);var Gt=Object.freeze({__proto__:null,get LightsRoomCardEditor(){return qt}});export{jt as LightsRoomCard};
