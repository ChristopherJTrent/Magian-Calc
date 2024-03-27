!function(){"use strict";!function(){class e{constructor(e){this.element=e}appendChild(e){this.element.appendChild(e)}appendComponent(e){this.appendChild(e.render())}appendNode(e){this.appendChild(e.element)}finalize(){return this.element}}class t extends e{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"pageContainer";super(),this.element=document.getElementById(e)}static createElement(e){return function(e){const t=document.createElement(e.type??"div");if(e.id&&(t.id=e.id),e.classes&&t.classList.add(e.classes),e.innerText&&(t.innerText=e.innerText),e.attributes)for(const[s,a]of Object.entries(e.attributes))t.setAttribute(s,a);if(e.eventCallbacks)for(const s of e.eventCallbacks)t.addEventListener(s.type,s.listener,s.options);return t}(e)}}class s extends e{constructor(e){e??=document.createElement("div"),super(e)}render(){}}function a(e){const t=Math.floor(4026531839*Math.random()+16**7);return`${e}-${Math.floor(t).toString(16)}`}class n extends s{render(){return this.element.classList.add("flex-break"),this.element}}class r extends s{constructor(){super(),this.element.id="about-modal"}render(){const e=document.createElement("div");e.classList.add("materialCard");const t=document.createElement("button");t.classList.add("styledButton"),t.innerText="Close",t.addEventListener("click",r.closeModal);const s=document.createElement("p");s.classList.add("title-text"),s.innerText="About";const a=document.createElement("div");return a.classList.add("flexContainer","horizontal","center","titlebar"),a.appendChild(s),a.appendChild(t),e.appendChild(a),r.generateCopy(e),e.appendChild((new n).render()),this.appendChild(e),this.finalize()}static generateCopy(e){const t=[],s=document.createElement("p");s.innerText="Magian Calc is a port of XIcalc's delay calculator.",t.push(s);const a=document.createElement("h3"),n=document.createElement("p");a.innerText="Equipment",n.innerText="Input your equipment stats into the boxes on the first card",t.push(a,n);const r=document.createElement("h3"),i=document.createElement("p");r.innerText="Magic",i.innerText="Input your expected magical haste using the inputs on the second card. White/Blue magic haste does not stack except for Mighty Guard and Embrava.",t.push(r,i),t.forEach((t=>e.appendChild(t)))}static closeModal(){document.getElementById("about-modal").classList.remove("active")}}class i extends s{LINKEDIN_URL="https://www.linkedin.com/in/christopher-trent-95b581190/";GITHUB_URL="https://github.com/ChristopherJTrent";constructor(){super(),this.element.id="header",this.element.classList.add("flexContainer","horizontal","center")}render(){const e=document.createElement("img");e.setAttribute("src","icon.webp"),e.classList.add("brand-icon"),this.element.appendChild(e);const t=document.createElement("p");t.classList.add("title-text"),t.innerText="Magian Calc",this.appendChild(t);const s=document.createElement("span");s.classList.add("flexCenter");const a=document.createElement("button");a.addEventListener("click",i.aboutModalHandler),a.setAttribute("value","About this tool"),a.innerText="About this tool",a.classList.add("styledButton"),s.appendChild(a),this.appendChild(s);const n=document.createElement("span");return n.classList.add("flexRight","socials"),n.appendChild(this.linkedin()),n.appendChild(this.github()),this.appendChild(n),this.finalize()}linkedin(){const e=document.createElement("a"),t=document.createElement("i");return t.classList.add("fa-brands","fa-linkedin"),e.setAttribute("href",this.LINKEDIN_URL),e.appendChild(t),e}github(){const e=document.createElement("a"),t=document.createElement("i");return t.classList.add("fa-brands","fa-github"),e.setAttribute("href",this.GITHUB_URL),e.appendChild(t),e}static aboutModalHandler(e){e.stopPropagation(),document.getElementById("about-modal").classList.add("active")}}function d(e){return e.reduce(((e,t)=>e+t),0)}class l{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.value=e,this.subscribers=[]}subscribe(e){this.subscribers.push(e),e(this.value)}setValue(e){return this.value=e,this.alertSubscribers(),!0}updateValue(e){return this.value=e(this.value),this.alertSubscribers(),!0}alertSubscribers(){for(const e of this.subscribers)e(this.value)}}class o extends l{static DEFAULT_AGGREGATOR=d;constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];super(),this.value=e,this.subscribers=[],this.defaultAggregation=d}setDefaultAggregation(e){return this.defaultAggregation=e,this}setValueAtIndex(e,t){if(e>this.value.length-1){const t=e-this.value.length;this.value=this.value.concat(Array(t).fill(0))}this.value[e]=t,this.alertSubscribers()}subscribeAggregate(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.defaultAggregation;this.subscribe((()=>{e(t(this.value))}))}}class c extends l{constructor(e,t){if(super(),this.allowedValues=e,!this.allowedValues.includes(t))throw new Error("Starting value must be an allowed value.");this.value=t,this.subscribers=[]}setValue(e){return!!this.allowedValues.includes(e)&&(this.value=e,this.alertSubscribers(),!0)}}class h{constructor(){throw new ReferenceError('reference to undeclared variable "DataStore"')}static storage=new Map;static registerProvider(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return h.storage.set(e,new l(t)),[t=>{h.storage.get(e).setValue(t)},()=>h.storage.get(e)]}static registerArrayProvider(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return h.storage.set(e,new o(t)),[(t,s)=>{h.storage.get(e).setValueAtIndex(t,s)},()=>h.storage.get(e).value]}static registerEnumProvider(e,t){let s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:t[0];return h.storage.set(e,new c(t,s)),[t=>h.storage.get(e).setValue(t),()=>h.storage.get(e).value]}static registerCombinatorProvider(e,t,s){const[a]=h.registerArrayProvider(e,Array(t.length).fill(0));for(let e=0;e<t.length;e++){const s=t[e];switch(h.getProviderType(s.key)){case"enum":throw new TypeError(`Unsupported Operation: Enum Providers cannot be combined. (${s.key})`);case"array":h.registerAggregateSubscriber(s.key,(t=>{a(e,t)}),s.aggregator);break;default:h.registerSubscriber(s.key,(t=>a(e,t)))}}h.storage.get(e).setDefaultAggregation(s)}static registerSubscriber(e,t){h.storage.get(e)?.subscribe(t)}static registerAggregateSubscriber(e,t,s){h.storage.get(e).subscribeAggregate(t,s)}static forceUpdate(e){h.storage.get(e)?.alertSubscribers()}static hasProvider(e){return h.storage.has(e)}static getProviderType(e){return Array.isArray(h.storage.get(e)?.value)?"array":h.storage.get(e)?.allowedValues?"enum":"standard"}}class u extends s{constructor(e,t){let s=arguments.length>2&&void 0!==arguments[2]&&arguments[2];super(document.createElement("span")),this.element.innerText=t,this.storehouseKey=e,this.aggregate=s,this.reactiveID=a(`reactive-label-${this.storehouseKey}`)}withFormatting(e,t){return this.formatting={prepend:e,append:t},this}render(){let e=document.createElement("span");return e.id=this.reactiveID??"error",this.element.appendChild(e),this.aggregate?!0===this.aggregate?h.registerAggregateSubscriber(this.storehouseKey,this.getUpdater()):h.registerAggregateSubscriber(this.storehouseKey,this.getUpdater(),this.aggregate):h.registerSubscriber(this.storehouseKey,this.getUpdater()),setTimeout((()=>h.forceUpdate(this.storehouseKey)),5),this.element}getUpdater(){const e=this.reactiveID,t=this.formatting??{};return s=>{const a=document.getElementById(e),n=`${t.prepend??""}${s}${t.append??""}`;a&&(a.innerText=n)}}}class p extends s{constructor(e,t){let s=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];super(),!0===s||"function"==typeof s?(!0===s&&(s=d),this.useAggregation=!0):this.useAggregation=!1,this.aggregate=s,this.label=e,this.key=t,this.meter=document.createElement("meter"),this.element.classList.add("meterContainer")}min(e){return this.meter.setAttribute("min",e),this}max(e){return this.meter.setAttribute("max",e),this}low(e){return this.meter.setAttribute("low",e),this}high(e){return this.meter.setAttribute("high",e),this}optimum(e){return this.meter.setAttribute("optimum",e),this}formatLabel(e,t){return this.prepend=e,this.append=t,this}render(){const e=new u(this.key,this.label,this.aggregate).withFormatting(this.prepend??"",this.append??"");return this.appendComponent(e),this.meter.id=`meter-${this.key}`,this.registerConsumer(this.meter),h.storage.get(this.key).alertSubscribers(),this.appendChild(this.meter),this.element}registerConsumer(e){const t=t=>{e.setAttribute("value",t?.toString())};this.useAggregation?h.registerAggregateSubscriber(this.key,t,this.aggregate):h.registerSubscriber(this.key,t)}}function m(e,t){let s=0;return s=e<180?61+63*(e-180)/360:e<541?61+88*(e-180)/360:e<631?149+20*(e-540)/360:e<721?154+28*(e-630)/360:e<901?161+24*(e-720)/360:173+28*(e-900)/360,Math.floor(s)+Math.floor(s*(t/100))}class g extends s{constructor(){super(),this.element.id="tp-display",this.perhitId=a("tp-display-per-hit"),this.to1kId=a("tp-display-to-1k")}render(){const e=new u("tp-per-hit","",!0).withFormatting(""," TP per hit ("),t=new u("tp-per-hit","",(e=>Math.ceil(1e3/m(...e)))).withFormatting(""," hits to 1000 TP)");return this.appendComponent(e),this.appendComponent(t),this.finalize()}}function b(e,t){return e*Math.max(1-t/1024,.2)}class v extends s{constructor(){super(),this.element.id="delay-display"}render(){const e=new u("modified-delay","Total Delay: ",(e=>Math.ceil(b(...e)))),t=new u("modified-delay","",(e=>(b(...e)/60).toFixed(2))).withFormatting(" ("," seconds per round)");return this.appendComponent(e),this.appendComponent(t),this.finalize()}}class y extends s{constructor(){super(),this.element.id="feedbackSidebar",this.element.classList.add("flexContainer","vertical","center","materialCard")}render(){return this.appendComponent(new v),this.appendComponent(new g),this.appendChild(document.createElement("hr")),this.appendComponent(new p("Equipment Haste","haste",y.hasteAggregator).min(0).low(250).optimum(256).high(260).max(300).formatLabel(": ","/256")),this.appendComponent(new p("Magical Haste","total-magic-haste").min(0).low(350).high(430).optimum(448).max(600).formatLabel(": ","/448")),this.element}static hasteAggregator(e){return e.reduce(((e,t)=>e+10*t),0)}}class C extends s{constructor(){super(),[this.setMh,this.getMh]=h.registerProvider("delay-mh",240)}render(){this.element.classList.add("flexContainer","vertical","center");const e=document.createElement("label"),t=document.createElement("input");return t.id="main-hand-delay",e.setAttribute("for",t.id),e.innerText="Main Hand base delay",t.setAttribute("type","number"),t.setAttribute("min","1"),t.setAttribute("max","999"),t.setAttribute("value",this.getMh().value),t.addEventListener("input",(()=>this.setMh(t.valueAsNumber))),t.classList.add("smallInput"),this.appendChild(e),this.appendChild(t),this.element}}class f extends s{static SLOTS=["Main Hand","Off-Hand","Ranged","Ammo","Head","Neck","Ear 1","Ear 2","Body","Hands","Ring 1","Ring 2","Back","Waist","Legs","Feet"];constructor(e){super(document.createElement("span")),this.element.classList.add("equipment-grid"),this.dataStoreKey=e;const[t,s]=h.registerArrayProvider(this.dataStoreKey,Array(16).fill(0));this.setValue=t,this.getValue=s,this.element.id=`equipment-grid-${this.dataStoreKey}`}fieldMinimum(e){return this.fieldMinVal=e,this}fieldMaximum(e){return this.fieldMaxVal=e,this}overallMinMax(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:25;return this.min=e,this.max=t,this}formatLabel(e,t){return this.prepend=e,this.append=t,this}render(){const e=this.getValue(),t=new u(this.dataStoreKey,this.dataStoreKey.replace("-"," "),!0).withFormatting(this.prepend??": ",this.append??`%/${this.max}%`);t.element.classList.add("equipPanelLabel"),this.appendComponent(t),this.appendComponent(new n);for(let t=0;t<16;t++){const s=document.createElement("span");s.classList.add("iblock"),e.push(0);let a=document.createElement("input");a.setAttribute("type","number"),a.setAttribute("data-index",`${t}`),this.fieldMinVal&&a.setAttribute("min",this.fieldMinVal),this.fieldMaxVal&&a.setAttribute("max",this.fieldMaxVal),a.addEventListener("input",this.updateListeners.bind(this)),s.appendChild(a),s.appendChild(document.createElement("br"));const n=document.createElement("span");n.classList.add("label"),n.innerText=f.SLOTS[t],s.appendChild(n),this.appendChild(s)}return setTimeout((()=>h.forceUpdate(this.dataStoreKey)),1),this.element}updateListeners(e){e.stopPropagation(),this.setValue(e.target.dataset.index,parseInt(e.target.value))}}class E extends s{constructor(){super(),this.element.id="equipmentPanel",this.element.classList.add("materialCard")}render(){const e=document.createElement("h1");return e.classList.add("sectionTitle"),e.innerText="Equipment",this.appendChild(e),this.appendComponent(new n),this.appendComponent(new C),this.appendComponent(new n),this.appendComponent(new f("haste").fieldMinimum(-5).fieldMaximum(26).overallMinMax(-25,26)),this.appendComponent(new f("store-tp").formatLabel(void 0,"")),this.afterRender(),this.element}afterRender(){}}const x=[108,118,129,140,151,162,172,183,194],k=[163,179,195,211,228,244,260,277,293],A=[126,138,150,162,174];function w(s,a){const n=t.createElement({type:"label",attributes:{for:s.id}});return n.appendChild(s),a instanceof HTMLElement?n.appendChild(a):a instanceof e?n.appendChild(a.render()):n.append(a),n}class L extends s{constructor(){super(),this.element=t.createElement({type:"fieldset",classes:["flexContainer","vertical"],id:"bard-haste"}),[this.setSongs,this.getSongs]=h.registerArrayProvider("b-songs",[!1,!1,!1]),[this.setSongBonus,this.getSongBonus]=h.registerProvider("b-song-bonus",0),[this.setJobActions,this.getJobActions]=h.registerArrayProvider("b-job-action",[!1,!1]),[this.setTrust,this.getTrust]=h.registerProvider("b-song-trust",!1)}render(){this.appendChild(w(t.createElement({type:"input",id:"a-march",attributes:{type:"checkbox"},eventCallbacks:[{type:"change",listener:e=>{this.setSongs(0,e.target.checked)}}]}),"Advancing March")),this.appendChild(w(t.createElement({type:"input",id:"v-march",attributes:{type:"checkbox"},eventCallbacks:[{type:"change",listener:e=>{this.setSongs(1,e.target.checked)}}]}),"Victory March"));const e=t.createElement({type:"fieldset",id:"bsongs-trust-disabled",classes:["phantom"]});return e.appendChild(w(t.createElement({type:"input",id:"h-march",attributes:{type:"checkbox"},eventCallbacks:[{type:"change",listener:e=>this.setSongs(2,e.target.checked)}]}),"Honor March")),e.append(w(t.createElement({type:"input",id:"songBonusSlider",attributes:{type:"range",min:0,max:8,value:0},eventCallbacks:[{type:"change",listener:e=>this.setSongBonus(parseInt(e.target.value))}]}),new u("b-song-bonus","Song Bonus: +",!1))),e.appendChild(w(t.createElement({type:"input",id:"soulVoiceCheckbox",attributes:{type:"checkbox"},eventCallbacks:[{type:"change",listener:e=>{e.target.checked&&(document.getElementById("marcatoCheckbox").checked=!1)}},{type:"change",listener:e=>this.setJobActions(0,e.target.checked)}]}),"Soul Voice")),e.appendChild(w(t.createElement({type:"input",id:"marcatoCheckbox",attributes:{type:"checkbox"},eventCallbacks:[{type:"change",listener:e=>{e.target.checked&&(document.getElementById("soulVoiceCheckbox").checked=!1)}},{type:"change",listener:e=>{this.setJobActions(1,e.target.checked)}}]}),"Marcato")),this.appendChild(e),this.appendChild(w(t.createElement({type:"input",id:"trustCheckbox",attributes:{type:"checkbox"},eventCallbacks:[{type:"change",listener:e=>{document.getElementById("bsongs-trust-disabled").disabled=e.target.checked,this.setTrust(e.target.checked)}}]}),"Trust")),this.afterRender(),this.finalize()}afterRender(){h.registerCombinatorProvider("bard-haste",[{key:"b-songs",aggregator:e=>e},{key:"b-song-bonus"},{key:"b-job-action",aggregator:e=>e},{key:"b-song-trust"}],(e=>function(e,t,s,a){let[n,r,i]=e,[d,l]=s,o=0;return n&&(o+=x[a?0:t]),r&&(o+=k[a?0:t]),a||(i&&(o+=A[Math.max(t,4)]),d?o*=2:l&&(o*=1.5)),o}(...e)))}}class M extends s{static FIELD_DEFS=[{label:"No Magical Haste",id:"noHaste",value:0,default:!0},{label:"Haste",id:"haste1",value:150},{label:"Haste II",id:"haste2",value:307},{label:"Hastega",id:"hastega",value:153},{label:"Hastega II",id:"hastega2",value:307},{label:"Refuelling",id:"refuelling",value:102},{label:"Animating Wail",id:"animating-wail",value:150},{label:"Erratic Flutter",id:"erratic-flutter",value:307}];constructor(){super(),this.element=document.createElement("form"),this.element.id="white-blue-magic-haste",this.eventCallback=this.handleInputEvent.bind(this),this.embravaCallback=this.embravaHandler.bind(this),this.mightyGuardCallback=this.mightyGuardHandler.bind(this),this.element.classList.add("flexContainer","vertical"),[this.setProvider,this.getProvider]=h.registerArrayProvider("wb-magic-haste",[0,0,0])}render(){const e=document.createElement("fieldset");e.classList.add("flexContainer","vertical");const t=document.createElement("legend");t.innerText="White/Blue Magical Haste",e.appendChild(t);for(const t of M.FIELD_DEFS)e.appendChild(this.hasteSpell(t));return this.setProvider(0,0),e.appendChild(this.mightyGuard()),this.setProvider(1,0),e.appendChild(this.embrava()),this.setProvider(2,0),this.appendChild(e),this.finalize()}handleInputEvent(e){e.stopPropagation(),this.setProvider(0,parseInt(e.target.value))}hasteSpell(e){const t=document.createElement("label"),s=document.createElement("input");return t.setAttribute("for",e.id),s.id=e.id,s.name=this.element.id,s.value=e.value,s.type="radio",e.default&&(s.defaultChecked=!0),s.addEventListener("change",this.eventCallback),t.appendChild(s),t.append(e.label),t}embrava(){const e=document.createElement("label");e.setAttribute("for","embrava");const t=document.createElement("input");return t.setAttribute("name","embrava"),t.setAttribute("type","checkbox"),t.id="embrava",e.appendChild(t),e.append("\n Embrava"),e.addEventListener("change",this.embravaCallback),e}mightyGuard(){const e=document.createElement("label");e.setAttribute("for","mightyGuard");const t=document.createElement("input");return t.setAttribute("name","mighty-guard"),t.setAttribute("type","checkbox"),t.id="mightyGuard",e.appendChild(t),e.append("\nMighty Guard"),t.addEventListener("change",this.mightyGuardCallback),e}embravaHandler(e){e.stopPropagation(),e.target.checked?this.setProvider(2,266):this.setProvider(2,0)}mightyGuardHandler(e){e.stopPropagation(),e.target.checked?this.setProvider(1,150):this.setProvider(1,0)}}class S extends s{constructor(){super(),this.element.classList.add("materialCard","flexContainer","spaceAround")}render(){return this.appendComponent(new M),this.appendComponent(new L),this.afterRender(),this.finalize()}afterRender(){h.registerCombinatorProvider("total-magic-haste",[{key:"wb-magic-haste"},{key:"bard-haste"}],(e=>Math.max(d(e.map((e=>parseInt(e)))),448)))}}const P=new t;P.appendComponent(new i),P.appendComponent(new class extends s{constructor(){super(),this.element.id="inputPanel",this.element.classList.add("materialPanel")}render(){return this.appendComponent(new E),this.appendComponent(new S),this.afterRender(),this.element}afterRender(){h.registerCombinatorProvider("tp-per-hit",[{key:"delay-mh"},{key:"store-tp"}],(e=>m(...e))),h.registerAggregateSubscriber("tp-per-hit",(e=>e)),h.registerCombinatorProvider("modified-delay",[{key:"delay-mh"},{key:"haste",aggregator:e=>Math.min(e.reduce(((e,t)=>e+10*t),0),256)}],(e=>b(...e)))}}),P.appendComponent(new y),P.appendComponent(new r)}()}();
//# sourceMappingURL=main.js.map