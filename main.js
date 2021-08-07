(()=>{"use strict";const e=(()=>{const e=document.getElementById("dialogue");let t=[],n=null,i=null,o=!0,l=40,d=!1,s=1,c=null,r=null;function a(){null==i&&u(t[0],l)}function u(t,i,l=0){o?(0==l&&(e.innerText="",clearTimeout(n),n=null,m(t)),l<t.length&&(e.append(t[l++]),n=setTimeout((()=>{u(t,i,l)}),i))):(e.innerText=t,m(t))}function m(e){if(d){speechSynthesis.speaking&&speechSynthesis.cancel(),console.log("should speak");const t=new SpeechSynthesisUtterance;null!=r&&(t.voice=c[r]),t.text=e,t.rate=s,t.pitch=2,speechSynthesis.speak(t)}}return e.onclick=()=>{t.length>1&&null==i&&(t=t.splice(1,t.length),a())},speechSynthesis.addEventListener("voiceschanged",(()=>{c=speechSynthesis.getVoices(),c.length>=5&&(r=4)})),{enqueue:function(e){const n=0==t.length;"string"==typeof e&&t.push(e),Array.isArray(e)&&e.forEach((e=>{t.push(e)})),n&&a()},flashMessage:function(e,t){null!=i&&(clearTimeout(i),i=null),"string"==typeof e&&(u(e),i=setTimeout((()=>{i=null,a()}),t))},flushMessageQueue:function(){t=[],null==i&&u("",0,0)},enableTextCrawl:function(){o=!0},disableTextCrawl:function(){o=!1},enableSpeech:function(){d=!0},disableSpeech:function(){d=!1},setTextCrawlSpeed:function(e){l=e},setSpeechRate:function(e){s=e}}})();function t(t,n,i,o,l,d,s,r){let a=0,u=!1,m=!0;return{getId:function(){return t},isFirstEntry:function(){return m},generateHtml:function(){let e=document.createElement("div");e.classList.add("level-select-item"),e.id=`level-select-item-${t}`;let o=document.createElement("div");o.classList.add("level-select-item-title"),o.innerText=n;let l=document.createElement("div");return l.classList.add("level-select-item-topic"),l.innerText=i,e.appendChild(o),e.appendChild(l),e.onclick=u?()=>{u=!1,c.resetLevel(t),c.beginLevel(t)}:()=>{c.beginLevel(t)},e},begin:function(){document.getElementById("gameplay-container").innerHTML="",o.setLevel(this),document.getElementById("gameplay-container").appendChild(o.generateHtml()),r&&("object"==typeof r?document.getElementById("level-info-content").appendChild(r):"string"==typeof r&&(document.getElementById("level-info-content").innerText=r)),e.flushMessageQueue(),e.enqueue(d[a]),m=!1},submit:function(n){u?console.log("This level is already complete."):n==l[a]?(e.flashMessage(s[a],2e3),a++,a>l.length-1?(console.log("Level finished."),u=!0,e.flushMessageQueue(),e.flashMessage(`Level ${t} complete, good job!`),c.finishLevel()):(e.flushMessageQueue(),e.enqueue(d[a]))):e.flashMessage("Wrong answer!",2e3)}}}const n=function(){let e=null,t=(()=>{let e=[];for(let t=0;t<8;t++)e.push(0);return e})();function n(){document.getElementById("binary-widget-value-display").innerText=parseInt(t.join(""),2)}return{generateHtml:function(){const i=document.createElement("div");i.id="binary-widget-container";const o=document.createElement("div");o.id="binary-widget-value-display",o.innerText=parseInt(t.join(""),2);const l=document.createElement("div");l.id="binary-widget-toggle-digits";const d=document.createElement("div");d.classList.add("submit-button"),d.innerText="Submit",d.onclick=()=>{!function(){const n=parseInt(t.join(""),2);e.submit(n)}()},i.appendChild(o),i.appendChild(l),i.appendChild(d);for(let e=0;e<8;e++){let i=document.createElement("div"),o=document.createElement("button"),d=document.createElement("div"),s=document.createElement("button");i.classList.add("digit-container"),d.classList.add("digit"),o.innerText="+",d.innerText=t[e],s.innerText="-",i.appendChild(o),i.appendChild(d),i.appendChild(s),l.appendChild(i),o.addEventListener("click",(()=>{"0"===d.innerText&&(t[e]=1,d.innerText="1",n())})),s.addEventListener("click",(()=>{"1"===d.innerText&&(t[e]=0,d.innerText="0",n())}))}return i},setLevel:function(t){e=t}}},i=function(){let e=null;function t(){const t=document.getElementById("convert-widget-input").value;document.getElementById("convert-widget-input").value="",document.getElementById("convert-widget-output").innerText="",e.submit(t)}return{generateHtml:function(){const e=document.createElement("div");e.id="convert-widget-container";const n=document.createElement("input");n.id="convert-widget-input",n.placeholder="Text to binary";const i=document.createElement("div");i.id="convert-widget-output";const o=document.createElement("div");return o.classList.add("submit-button"),o.innerText="Submit",o.onclick=()=>{t()},e.appendChild(n),e.appendChild(i),e.appendChild(o),n.addEventListener("input",(()=>{const e=n.value;i.innerText=function(e){let t="";for(let n=0;n<e.length;n++){let i=e.charCodeAt(n).toString(2);if(i.length<8)for(let e=i.length;e<8;e++)i="0"+i;t+=i+" "}return t.trim()}(e)})),n.addEventListener("keypress",(e=>{"Enter"===e.key&&t()})),e},setLevel:function(t){e=t}}},o=function(){let e=null,t=[0,0,0];return{generateHtml:function(){const n=document.createElement("div");n.id="RGB-widget-container";const i=document.createElement("div");i.id="RGB-widget-color-display",i.style.backgroundColor=`rgb(${t[0]}, ${t[1]}, ${t[2]})`;const o=document.createElement("div");o.id="RGB-widget-slider-container";const l=document.createElement("div"),d=document.createElement("div");d.innerText=`Red ${t[0]}`;const s=document.createElement("input");s.id="RGB-widget-red-input",s.classList.add("slider"),s.type="range",s.min="0",s.max="255",s.value=t[0];const c=document.createElement("div"),r=document.createElement("div");r.innerText=`Green ${t[1]}`;const a=document.createElement("input");a.id="RGB-widget-green-input",a.classList.add("slider"),a.type="range",a.min="0",a.max="255",a.value=t[1];const u=document.createElement("div"),m=document.createElement("div");m.innerText=`Blue ${t[2]}`;const p=document.createElement("input");p.id="GB-widget-blue-input",p.classList.add("slider"),p.type="range",p.min="0",p.max="255",p.value=t[2];const h=document.createElement("div");return h.classList.add("submit-button"),h.innerText="Submit",h.onclick=()=>{!function(){const n=`${t[0]}, ${t[1]}, ${t[2]}`;e.submit(n)}()},l.appendChild(d),l.appendChild(s),c.appendChild(r),c.appendChild(a),u.appendChild(m),u.appendChild(p),o.appendChild(l),o.appendChild(c),o.appendChild(u),n.appendChild(i),n.appendChild(o),n.appendChild(h),s.addEventListener("input",(()=>{t[0]=parseInt(s.value),d.innerText=`Red ${t[0]}`,i.style.backgroundColor=`rgb(${t[0]}, ${t[1]}, ${t[2]})`})),a.addEventListener("input",(()=>{t[1]=parseInt(a.value),r.innerText=`Green ${t[1]}`,i.style.backgroundColor=`rgb(${t[0]}, ${t[1]}, ${t[2]})`})),p.addEventListener("input",(()=>{t[2]=parseInt(p.value),m.innerText=`Blue ${t[2]}`,i.style.backgroundColor=`rgb(${t[0]}, ${t[1]}, ${t[2]})`})),n},setLevel:function(t){e=t}}},l=function(){let e=null;function t(e){const l=document.getElementById("cmd-widget-dir-text"),c=document.getElementById("cmd-widget-output");if(void 0===e||"~"===e)return d=n,s=["~"],void(l.innerHTML=`<span class="green">${i}@${o}</span>:<span class="blue">${s.join("")}</span>$`);if(".."!==e){if(!1===d.contents.hasOwnProperty(e)){let t=document.createElement("div");return t.innerText=`The folder "${e}" does not exist`,t.classList.add("errMsg"),c.prepend(t),-1}if("folder"!=d.contents[e].type){let t=document.createElement("div");return t.innerText=`"${e}" is a ${d.contents[e].type}, not a folder`,t.classList.add("errMsg"),c.prepend(t),-1}d=d.contents[e],s.push(`/${e}`),l.innerHTML=`<span class="green">${i}@${o}</span>:<span class="blue">${s.join("")}</span>$`}else{if(s.length>1){let e="root";s.pop();for(let t=1;t<s.length;t++)e+=`.contents.${s[t].substring(1)}`;t();for(let n=2;n<e.split(".").length;n+=2)t(e.split(".")[n])}else d=n;l.innerHTML=`<span class="green">${i}@${o}</span>:<span class="blue">${s.join("")}</span>$`}}let n={type:"root",contents:{Desktop:{type:"folder",contents:{Projects:{type:"folder",contents:{"roboKid.js":{type:"file",content:{}},"roboKid.html":{type:"file",content:{}},"roboKid.css":{type:"file",content:{}},".gitignore":{type:"file",content:{}}}}}},Downloads:{type:"folder",contents:{"introduction_to_web_development.txt":{type:"file",content:{}},"theOdinProjectSecrets.exe":{type:"file",content:{}}}},Documents:{type:"folder",contents:{node_modules:{type:"folder",content:{oneMillionFiles:{type:"file",content:{}}}}}},Videos:{type:"folder",contents:{"cs50_lecture1.mp4":{type:"file",content:{}},"react_tutorial.mp4":{type:"file",content:{}}}},Music:{type:"folder",contents:{"DOOMSoundtrack.mp3":{type:"file",content:{}},"KommSusserTod.mp3":{type:"file",content:{}},"NightcoreMix583WeebEdition.mp3":{type:"file",content:{}}}},Pictures:{type:"folder",contents:{"DoILookLikeIKnowWhatAJpgIs.jpg":{type:"file",content:{}},"HomeworkCheatsheet.png":{type:"file",content:{}},PicturesOfFriends:{type:"folder",content:{}}}}}};const i="robokid",o="systemName";let l,d=n,s=["~"],c=!1,r=["-1","-1","-1","-1","-1","-1"];function a(){let e=document.getElementById("cmd-widget-dir-caret");null!=e?"visible"===e.style.visibility?e.style.visibility="hidden":e.style.visibility="visible":clearInterval(l)}function u(e){let t=document.getElementById("cmd-widget-dir-caret"),n=document.getElementById("cmd-widget-dir-input");if(null!=t&&null!=n){switch(e){case 8:n.value=n.value.slice(0,-1);break;default:n.value=n.value+String.fromCharCode(e)}clearInterval(l),t.style.visibility="visible",m(n),l=setInterval(a,750)}}function m(e){let t=document.createElement("canvas").getContext("2d");t.font="16px Ubuntu";let n=Math.ceil(t.measureText(e.value).width)+5;e.style.width=`${n}px`}function p(t){e.submit(t)}return{generateHtml:function(){const e=document.createElement("div");e.id="cmd-widget-container";const n=document.createElement("div");n.id="cmd-widget-display";const h=document.createElement("div");h.id="cmd-widget-output";const g=document.createElement("div");g.id="cmd-widget-dir";const f=document.createElement("div");f.id="cmd-widget-dir-text";const y=document.createElement("input");y.id="cmd-widget-dir-input";const v=document.createElement("div");return v.id="cmd-widget-dir-caret",g.appendChild(f),g.appendChild(y),g.appendChild(v),n.appendChild(h),n.appendChild(g),e.appendChild(n),f.innerHTML=`<span class="green">${i}@${o}</span>:<span class="blue">${s.join("")}</span>$`,clearInterval(l),l=setInterval(a,750),c||(window.addEventListener("keypress",(function(e){u(e.keyCode)})),window.addEventListener("keydown",(function(e){switch(e.keyCode){case 8:u(e.keyCode)}})),window.addEventListener("keydown",(function(e){let n=document.getElementById("cmd-widget-dir-text"),o=document.getElementById("cmd-widget-dir-input"),l=document.getElementById("cmd-widget-output");if(13===e.keyCode){let e=document.createElement("div");if(e.innerHTML=`${n.innerHTML} ${o.value.trim()}`,l.prepend(e),"ls"===o.value.trim())"done"!=r[0]&&(r[0]="done",p(r[0])),function(e){if(!Array.isArray(e))return-1;if(0===e.length)return-1;const t=document.createElement("div"),n=document.getElementById("cmd-widget-output");for(let n of e){let e=document.createElement("span");e.innerText=n[0]+" ","folder"===n[1]&&e.classList.add("folder"),t.appendChild(e)}n.prepend(t)}(function(e){let t=[];for(let n in e.contents)t.push([n,e.contents[n].type]);return t}(d));else if(o.value.trim().split(" ").includes("cd")&&o.value.trim().split(" ").length<=2)if("done"===r[0]&&"done"===r[1]&&"done"!==r[2])if("cd Desktop"===o.value.trim())r[2]="done",p(r[2]),t(o.value.trim().split(" ")[1]);else{let e=document.createElement("div");e.innerText='Try typing "cd Desktop"',e.classList.add("errMsg"),l.prepend(e)}else if("done"===r[0]&&"done"===r[1]&&"done"===r[2]&&"done"!==r[3])if("cd"===o.value.trim())r[3]="done",p(r[3]),t(o.value.trim().split(" ")[1]);else{let e=document.createElement("div");e.innerText='Try typing "cd"',e.classList.add("errMsg"),l.prepend(e)}else if("done"===r[0]&&"done"===r[1]&&"done"===r[2]&&"done"===r[3])t(o.value.trim().split(" ")[1]);else{let e=document.createElement("div");e.innerText="Finish all the tasks before entering free mode",e.classList.add("errMsg"),l.prepend(e)}else if("clear"===o.value.trim())"done"===r[0]&&"done"!==r[1]&&(r[1]="done",p(r[1])),l.innerHTML="";else if("rm -rf /"===o.value.trim()||":(){:|:&};:"===o.value.trim()){let e=document.createElement("div");e.innerText="Calm down there Satan.",e.classList.add("errMsg"),l.prepend(e)}else if("pwd"===o.value.trim())"done"===r[0]&&"done"===r[1]&&"done"===r[2]&&"done"===r[3]&&"done"!==r[4]&&(r[4]="done",p(r[4])),function(){let e=document.createElement("div"),t=document.getElementById("cmd-widget-output");e.innerText=`/home/${i}${s.slice(1,s.length).join("")}`,e.classList.add("dir"),t.prepend(e)}();else if("finish"===o.value.trim())if("done"===r[0]&&"done"===r[1]&&"done"===r[2]&&"done"===r[3]&&"done"===r[4])r[5]="done",p(r[5]);else{let e=document.createElement("div");e.innerText="Complete all tasks first!",e.classList.add("errMsg"),l.prepend(e)}else{let e=document.createElement("div");e.innerText=`${o.value.trim()}: command not found`,e.classList.add("errMsg"),l.prepend(e)}o.value="",m(o)}})),c=!0),e},setLevel:function(t){e=t}}},d=function(){let e=null;function t(d,s){d.innerText=o[i],s.innerHTML="";for(let c of l[i]){const r=document.createElement("div");r.innerText=`${c.val}`,r.classList.add("quiz-widget-answer"),s.appendChild(r),r.addEventListener("click",(()=>{if(c.correct?(console.log("Correct!"),n++):console.log("Wrong"),i++,void 0===o[i]){s.innerHTML="",d.innerText=`Quiz finished. Final score: ${n}/${l.length}`;const t=document.createElement("div");t.classList.add("submit-button"),t.innerText="Submit",t.onclick=()=>{e.submit("finished")},s.appendChild(t),n=0,i=0}else t(d,s)}))}}let n=0,i=0;const o=["What color is R:255 G:255 B:0?","What is the largest number you can make with 8 binary bits?",'What does the command "ls" do?',"If all the numbers in RGB are set to 0, what color would that make?","If 11 in binary is equal to 3, what is 111 in binary equal to?",'Are "a" and "A" represented the same in binary?','What command would we use if we wanted to open the "Pictures" folder?',"How many bits would we need to represent 47 in binary?"],l=[[{val:"Red",correct:!1},{val:"Pink",correct:!1},{val:"Yellow",correct:!0}],[{val:"255",correct:!0},{val:"64",correct:!1},{val:"1028",correct:!1}],[{val:"Displays folders and files",correct:!0},{val:"Clears the screen",correct:!1},{val:"Changes what folder you are in",correct:!1}],[{val:"White",correct:!1},{val:"Black",correct:!0},{val:"Orange",correct:!1}],[{val:"4",correct:!1},{val:"6",correct:!1},{val:"7",correct:!0}],[{val:"Yes",correct:!1},{val:"No",correct:!0}],[{val:"cd",correct:!1},{val:"Pictures",correct:!1},{val:"cd Pictures",correct:!0}],[{val:"4",correct:!1},{val:"5",correct:!1},{val:"6",correct:!0}]];return{generateHtml:function(){const e=document.createElement("div");e.id="quiz-widget-container";const n=document.createElement("div");n.id="quiz-widget-question";const i=document.createElement("div");return i.id="quiz-widget-answer-container",e.appendChild(n),e.appendChild(i),t(n,i),e},setLevel:function(t){e=t}}};function s(){let e=[];return e.push(new t(0,"Binary","How do computers think?",new n,["1","5","255","81","198","234"],["Set 1 in binary","Set 5 in binary","Set 255 in binary","Set 81 in binary","Set 198 in binary","Continue to experiement, or set 234 in binary and click submit to end this level."],["That's right!","Correct!","Right again!","Good job!","Right!","Correct!"],'Every computer thinks in 1s and 0s, also known as binary.\n\n            Binary can be used to represent the decimal numbers which we use everyday!\n            \n            This level provides a tool that has eight "bits" which you can toggle on(1) or off(0) by pressing plus or minus buttons.\n\n            The ranges of numbers you can represent with 8 bits is 0-255.\n            ')),e.push(new t(1,"Binary conversion","How do computers understand English?",new i,["a","z","123","Hello world!","finish"],['What is "a" in binary?','What is "z" in binary?','What is "123" in binary?','What is "Hello world!" in binary?','Type whatever you want to see how the computer reads it, or type "finish" and click submit to end the level.'],["That's right!","Good job!","Correct!","A classic, that's right!","Correct answer!"],"If computers can only think in binary how can they understand what we type in English?\n            \n            Computer scientists came up with a clever way to solve this problem.\n\n            They created a system where they could represent letters and characters as numbers. These numbers could then be converted into binary so the computer can understand what we are saying!\n            ")),e.push(new t(2,"Colors","How do computers see color?",new o,["255, 0, 0","0, 255, 0","0, 255, 255","255, 255, 255","0, 0, 0"],["Make red (R:255 G:0 B:0)","Make green (R:0 G:255 B:0)","Make cyan (R:0 G:255 B:255)","Set every slider to 255, what color do we get?","Continue to experiment with making new colors, or set every slider to 0 and click submit to finish this level."],["Good job!","My favorite color, that's right!","Correct!","We get white!","Correct answer!"],"One of the most common ways to represent color to a computer is by using RGB, which stands for Red Green Blue.\n\n            RGB consists of three numbers, each one ranging from 0-255. These numbers determine how much of each color we add to the mix to get a final output color.\n\n            Bonus: Isn't it interesting that each color in RGB is represented by a number from 0-255? That's because 0-255 is the range of numbers we can represent with 8 binary bits!\n            ")),e.push(new t(3,"Command line","How do you navigate a computer without a mouse?",new l,["done","done","done","done","done","done"],['The command "ls" will show you folders and files, try it out!','The command "clear" will wipe the display. Give it a try.','The command "cd" is used to move between folders. Try typing the command "cd Desktop"','Typing "cd" without a target folder will send you to the home folder. Try it now!','View the current directory you\'re in by typing the command "pwd"','You are now in free mode! Explore this system more, or type "finish" to complete this level.'],["Look at all those folders!","Nice!","Beep boop, right again!","You're good at this!","Good job!","Correct answer!"],"The command line is a user interface for navigating a computers folders and files.\n\n            This level has a handful of commands to get you comfortable working with the command line.\n\n            Commands:\n                ls - display folders and files\n                clear - clear display\n                cd - go to home folder\n                cd .. - go up a folder\n                cd [folderName] - open a folder\n                pwd - display current directory\n            ")),e.push(new t(4,"Final Quiz","What have you learned?",new d,["finished"],["Good luck on the quiz! You can go back and reference the other levels if you get stuck."],["Quiz finished!"],"This quiz will test everything you have learned so far.\n            Feel free to revisit the other levels to help you answer each of the questions, your progress will be saved!\n            ")),e}const c=(()=>{const t=e=>document.getElementById(e),n=(t("gameplay-container"),t("level-select-container")),i=t("level-select-items"),o=t("level-info-container");let l=[];function d(){i.innerHTML="",l.forEach((e=>{i.appendChild(e.generateHtml())}))}function c(){n.className="",n.classList.add("level-select-open-animation"),o.className="",o.classList.add("level-info-hide-animation"),e.flushMessageQueue(),e.enqueue("Select a level to play.")}function r(){o.className="",o.classList.add("level-info-open-animation"),n.className="",n.classList.add("level-select-hide-animation")}return l=s(),d(),document.getElementById("level-select-open-button").onclick=function(){c()},document.getElementById("level-info-open-button").onclick=function(){r()},document.getElementById("level-info-return-button").onclick=function(){o.className="",o.classList.add("level-info-close-animation"),n.className="",n.classList.add("level-select-reveal-animation")},c(),n.classList.remove("level-select-open-animation"),{beginLevel:function(e){n.className="",n.classList.add("level-select-close-animation"),o.className="",o.classList.add("level-info-reveal-animation"),l[e].isFirstEntry()&&setTimeout((()=>{r()}),1e3),l[e].begin(l[e])},finishLevel:function(){d(),c()},resetLevel:function(e){l[e]=s()[e]},setDialogue:function(t,n){e.setDialogue(t,n)}}})(),r=(()=>{const e=document.getElementById("portrait-container");let t=[],n=[],i=[];const o=e=>{for(let t=0;t<9;t++)clearInterval(i[t]),i[t]=setInterval((()=>{l(t)}),e);console.log(`Bone tracking initialized with interval of ${e}`)},l=i=>{n[i].style.transform=getComputedStyle(t[i]).getPropertyValue("transform"),n[i].style.transformOrigin=getComputedStyle(t[i]).getPropertyValue("transformOrigin"),n[i].style.left=t[i].getBoundingClientRect().left-e.getBoundingClientRect().left,n[i].style.top=t[i].getBoundingClientRect().top-e.getBoundingClientRect().top};return t[0]=document.getElementById("bone-wheels"),t[1]=document.getElementById("bone-body-tube"),t[2]=document.getElementById("bone-chest"),t[3]=document.getElementById("bone-right-arm"),t[4]=document.getElementById("bone-right-hand"),t[5]=document.getElementById("bone-left-arm"),t[6]=document.getElementById("bone-left-hand"),t[7]=document.getElementById("bone-head"),t[8]=document.getElementById("bone-face"),n[0]=document.getElementById("img-wheels"),n[1]=document.getElementById("img-body-tube"),n[2]=document.getElementById("img-chest"),n[3]=document.getElementById("img-right-arm"),n[4]=document.getElementById("img-right-hand"),n[5]=document.getElementById("img-left-arm"),n[6]=document.getElementById("img-left-hand"),n[7]=document.getElementById("img-head"),n[8]=document.getElementById("img-face"),o(1e3/60),{initBoneTracking:o,enableAnimations:function(){t.forEach((e=>{e.classList.add("animated")}))},disableAnimations:function(){t.forEach((e=>{e.classList.remove("animated")}))}}})();function a(e){let t=0,n=0,i=1,o=null;function l(o){e.style.transform=`translate(${t}px, ${n}px) scaleX(${i})`,setTimeout((()=>{l()}),o)}function d(){switch(clearInterval(o),Math.round(2*Math.random())){case 0:break;case 1:i=Math.random()<.5?1:-1,o=setInterval((function(){return t<16?(t=16,void clearInterval(o)):t>624?(t=624,void clearInterval(o)):void(t+=i)}),15+10*Math.random());break;case 2:o=setInterval((function(){n>-16?n-=.5:(clearInterval(o),o=setInterval((()=>{n<0?n+=.5:clearInterval(o)}),1))}),1)}setTimeout((function(){d()}),500+1500*Math.random())}return{commence:function(e){t=Math.round(16+624*Math.random()),l(e),d()}}}(()=>{let e=[];e.push(new a(document.getElementById("robokid"))),e.push(new a(document.getElementById("kid1"))),e.push(new a(document.getElementById("kid2"))),e.push(new a(document.getElementById("kid3"))),e.forEach((e=>{e.commence(1e3/60)}))})(),(()=>{const t="animation-settings-options",n="font-settings-options",i="dialogue-settings-options",o="speech-settings-options";function l(e){switch(e){case 0:r.disableAnimations(),r.initBoneTracking(Number.MAX_SAFE_INTEGER);break;case 1:r.enableAnimations(),r.initBoneTracking(100);break;case 2:r.enableAnimations(),r.initBoneTracking(1e3/30);break;case 3:r.enableAnimations(),r.initBoneTracking(1)}Array.from(document.getElementById(t).children).forEach((e=>{e.classList.remove("selected")})),document.getElementById(t).children[e].classList.add("selected")}function d(e){switch(e){case 0:document.body.classList.remove("font-standard"),document.body.classList.remove("font-dyslexic"),document.body.classList.add("font-pixel");break;case 1:document.body.classList.remove("font-pixel"),document.body.classList.remove("font-dyslexic"),document.body.classList.add("font-standard");break;case 2:document.body.classList.remove("font-pixel"),document.body.classList.remove("font-standard"),document.body.classList.add("font-dyslexic")}Array.from(document.getElementById(n).children).forEach((e=>{e.classList.remove("selected")})),document.getElementById(n).children[e].classList.add("selected")}function s(t){switch(t){case 0:e.disableTextCrawl();break;case 1:e.enableTextCrawl(),e.setTextCrawlSpeed(80);break;case 2:e.enableTextCrawl(),e.setTextCrawlSpeed(40);break;case 3:e.enableTextCrawl(),e.setTextCrawlSpeed(30)}Array.from(document.getElementById(i).children).forEach((e=>{e.classList.remove("selected")})),document.getElementById(i).children[t].classList.add("selected")}function c(t){switch(t){case 0:e.disableSpeech();break;case 1:e.enableSpeech(),e.setSpeechRate(.5);break;case 2:e.enableSpeech(),e.setSpeechRate(1);break;case 3:e.enableSpeech(),e.setSpeechRate(1.5)}Array.from(document.getElementById(o).children).forEach((e=>{e.classList.remove("selected")})),document.getElementById(o).children[t].classList.add("selected")}!function(){const e=e=>document.getElementById(e);e("open-settings-button").onclick=()=>{document.getElementById("settings-container").style.display=""},e("close-settings-button").onclick=()=>{document.getElementById("settings-container").style.display="none"};for(let n=0;n<4;n++)e(t).children[n].onclick=()=>{l(n)};for(let t=0;t<3;t++)e(n).children[t].onclick=()=>{d(t)};for(let t=0;t<4;t++)e(i).children[t].onclick=()=>{s(t)};for(let t=0;t<4;t++)e(o).children[t].onclick=()=>{c(t)}}()})()})();