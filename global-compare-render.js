/* ── 全球面具分析 · 数据与渲染 ────────────────────────────── */
(function(){
var DATA={"total":80,"roleDistribution":[{"role":"世俗人物","count":23},{"role":"道释神仙","count":17},{"role":"驱疫神祇","count":15},{"role":"精怪动物","count":13},{"role":"传奇英雄","count":11},{"role":"民间俗神","count":1}]};
var ROLE_COLORS={"驱疫神祇":"#b3261e","民间俗神":"#b18a45","道释神仙":"#e8ddc8","传奇英雄":"#3a7ca5","精怪动物":"#7d4f93","世俗人物":"#a9a9a9"};
var CULTURE_COLORS={"韩国":"#cd5360","日本":"#28666e","印尼·巴厘岛":"#eec550","斯里兰卡":"#7c9885"};
var allRoles=["驱疫神祇","民间俗神","道释神仙","传奇英雄","精怪动物","世俗人物"];
var cultures=["韩国","日本","印尼·巴厘岛","斯里兰卡"];
var roleByCulture={"印尼·巴厘岛":{"精怪动物":3,"传奇英雄":10,"世俗人物":4,"驱疫神祇":3},"日本":{"道释神仙":16,"世俗人物":1,"驱疫神祇":2,"精怪动物":1},"韩国":{"世俗人物":15,"道释神仙":1,"民间俗神":1,"精怪动物":3},"斯里兰卡":{"驱疫神祇":10,"精怪动物":6,"世俗人物":3,"传奇英雄":1}};
var semTop3={"韩国":[{"d":"娱神娱人","v":75},{"d":"身份转换","v":70},{"d":"祈福","v":40}],"日本":[{"d":"身份转换","v":76},{"d":"祈福","v":72},{"d":"祭祖","v":46}],"印尼·巴厘岛":[{"d":"身份转换","v":59},{"d":"驱邪","v":57},{"d":"镇宅","v":56}],"斯里兰卡":[{"d":"驱邪","v":72},{"d":"逐疫","v":62},{"d":"身份转换","v":57}]};
var ovRitual={"韩国":"讽刺批判 <b>50%</b> · 戏剧表演 <b>40%</b>","日本":"戏剧表演 <b>55%</b> · 仪式开场 <b>30%</b>","印尼·巴厘岛":"戏剧表演 <b>45%</b> · 神话叙事 <b>25%</b>","斯里兰卡":"驱动病治疗 <b>60%</b> · 戏剧表演 <b>20%</b>"};
var ovOneLine={"韩国":"假面戏追问\"谁在说谎\"——以面具为镜，讽刺身份与权力的虚伪。","日本":"能面追问\"何为美\"——将身份转换升华为极致的内敛美学。","印尼·巴厘岛":"巴龙追问\"善如何战胜恶\"——史诗与信仰在面具中反复演绎。","斯里兰卡":"Sanni追问\"病从何来\"——面具是诊断书，也是治疗工具。"};

// Overview right column — semantic cards
(function(){
  var or=document.getElementById('overviewRight');if(!or)return;
  or.innerHTML=cultures.map(function(cu){var t3=semTop3[cu],c=CULTURE_COLORS[cu];
    return '<div class="ov-sem-card"><h4 style="color:'+c+'">'+cu+'</h4><div class="ov-sem-top">'+t3.map(function(s){return '<div class="ov-sem-item"><span class="ovs-val" style="color:'+c+'">'+s.v+'</span><span class="ovs-label">'+s.d+'</span></div>';}).join('')+'</div><div class="ov-ritual">'+ovRitual[cu]+'</div><div class="ov-ritual" style="margin-top:4px">'+ovOneLine[cu]+'</div></div>';
  }).join('');
})();

// Overview left — role compact bars
(function(){
  var oc=document.getElementById('overviewRoleCompact');if(!oc)return;
  oc.innerHTML=allRoles.map(function(r){var t=DATA.roleDistribution.find(function(x){return x.role===r;})?.count||0;
    return '<div class="role-bar"><span class="role-name">'+r+'</span><div class="role-track">'+cultures.map(function(c){var n=roleByCulture[c]?.[r]||0;return n?'<span class="role-seg" style="flex:'+n+';background:'+CULTURE_COLORS[c]+';min-width:'+Math.max(n*3,8)+'px" title="'+c+': '+n+'"></span>':'';}).join('')+'</div><span class="role-count">'+t+'</span></div>';
  }).join('');
})();

// Ecosystem bars
(function renderEcosystem(){
  try{var bw=document.getElementById('ecoBarsWrap');if(bw){var m={'韩国':{'驱疫神祇':0,'民间俗神':1,'道释神仙':1,'传奇英雄':0,'精怪动物':3,'世俗人物':15},'日本':{'驱疫神祇':2,'民间俗神':0,'道释神仙':11,'传奇英雄':0,'精怪动物':1,'世俗人物':1},'印尼·巴厘岛':{'驱疫神祇':4,'民间俗神':0,'道释神仙':0,'传奇英雄':11,'精怪动物':3,'世俗人物':2},'斯里兰卡':{'驱疫神祇':9,'民间俗神':0,'道释神仙':0,'传奇英雄':1,'精怪动物':6,'世俗人物':3}};
  var h='';cultures.forEach(function(c){var e=[];allRoles.forEach(function(r){if(m[c][r])e.push({role:r,count:m[c][r]});});var t=e.reduce(function(s,x){return s+x.count},0);
  h+='<div class="eco-bar-row"><span class="eco-bar-label">'+c+'<small>'+t+'件</small></span><div class="eco-bar-track">';
  e.forEach(function(x){var p=x.count/t*100;h+='<div class="eco-bar-seg" style="width:'+p+'%;background:'+ROLE_COLORS[x.role]+'" title="'+x.role+': '+x.count+'">'+(p>12?'<span>'+x.role.slice(0,2)+'</span>':'')+'</div>';});
  h+='</div></div>';});
  var tot={};allRoles.forEach(function(r){tot[r]=cultures.reduce(function(s,c){return s+m[c][r];},0);});
  h+='<div class="eco-summary-row"><span>角色总计</span>';
  allRoles.forEach(function(r){if(tot[r])h+='<span class="es-role"><span class="es-dot" style="background:'+ROLE_COLORS[r]+'"></span>'+r.slice(0,2)+' <span class="es-val">'+tot[r]+'</span></span>';});
  h+='</div>';bw.innerHTML=h;}
  var ef=document.getElementById('ecoFindings3');if(ef)ef.innerHTML='<div class="finding-card" style="--fc:#ff6034"><strong>地方俗神：中国傩面的独特支点</strong><p>土地、乡官、丑角等地方信仰型角色在国外四个文化圈中几乎没有系统对应，是中国傩面具最鲜明的地方性。</p></div><div class="finding-card" style="--fc:#90dfe1"><strong>驱疫镇护：跨文化的共同底层</strong><p>驱邪、镇护与治病是面具最稳定的仪式功能。斯里兰卡Sanni体系尤为集中（9/20=45%）。</p></div><div class="finding-card" style="--fc:#eec550"><strong>神魔叙事与病魔治疗，两条力量路径</strong><p>巴厘岛更偏向英雄、精怪与守护神的叙事平衡；斯里兰卡则把病魔形象推到仪式中心。</p></div>';
  var rc=document.getElementById('ritualCompare');if(rc){var rk=['驱动病治疗','戏剧表演','讽刺批判','仪式开场','神话叙事','驱邪镇护'];var rco={'驱动病治疗':'#b3261e','戏剧表演':'#3a7ca5','讽刺批判':'#7d4f93','仪式开场':'#b18a45','神话叙事':'#eec550','驱邪镇护':'#28666e'};var rd=[{n:'中国(483)',v:[18,26,8,24,0,24]},{n:'韩国',v:[0,40,50,5,0,5]},{n:'日本',v:[0,55,0,30,0,15]},{n:'巴厘岛',v:[5,45,5,10,25,10]},{n:'斯里兰卡',v:[60,20,0,5,0,15]}];
  rc.innerHTML=rk.map(function(k,i){var mv=Math.max.apply(null,rd.map(function(d){return d.v[i]||0}).concat([1]));return '<div class="ritual-col"><div class="rc-label">'+k+'</div>'+rd.map(function(d){var v=d.v[i]||0;return '<div class="rc-bar" title="'+d.n+': '+v+'%"><div class="rc-fill" style="width:'+(v/mv*100)+'%;background:'+rco[k]+'"></div></div>';}).join('')+'</div>';}).join('');}
  }catch(e){console.error(e);}
})();

// Alignment
(function renderAlignment(){
  try{var c2=['韩国','日本','印尼·巴厘岛','斯里兰卡'];
  var cultureMatch={"韩国":{"role":"世俗人物","score":78,"color":"#cd5360","cr":"205,83,96","desc":"Talchum假面戏以讽刺社会阶层为核心，15/20件映射为世俗人物——两班贵族讽刺、醉发伊喜剧、老妇悲情等角色体系与中国傩面的乡官、丑角、土地形成功能对位。","s":"最佳匹配：<b>莲叶面具→世俗人物(89%)</b>、河回两班→世俗人物、长女面具→世俗人物"},"日本":{"role":"道释神仙","score":80,"color":"#28666e","cr":"40,102,110","desc":"能面体系以超然美学和身份转换为核心，11/20件映射为道释神仙——小面、中将等优雅面具将\"美\"本身作为仪式媒介，与中国傩面以\"力\"为媒介形成对照。","s":"最佳匹配：<b>小面→道释神仙(88%)</b>、翁系面具→道释神仙、中将→道释神仙"},"印尼·巴厘岛":{"role":"传奇英雄","score":76,"color":"#eec550","cr":"238,197,80","desc":"巴龙/面具舞传统融合印度史诗与本土信仰，11/20件映射为传奇英雄——罗摩、Laksmana等史诗角色面具与中国傩戏的关公、武将等英雄谱系形成叙事功能上的跨文化对话。","s":"最佳匹配：<b>罗摩面具→传奇英雄(94%)</b>、巴龙凯特→精怪动物、Rangda→驱疫神祇"},"斯里兰卡":{"role":"驱疫神祇","score":82,"color":"#7c9885","cr":"124,152,133","desc":"Sanni/Kolam体系以面具为治疗工具，9/20件映射为驱疫神祇——18种Sanni病魔各对应一种疾病，与中国傩面的\"逐疫\"\"驱邪\"功能形成最直接的文化功能对等关系。","s":"最佳匹配：<b>Naga Sanniya→驱疫神祇(90%)</b>、Maha Sohona→驱疫神祇、Huniyam Yakka→驱疫神祇"}};
  var sg=document.getElementById('alignSummaryGrid');if(sg)sg.innerHTML=c2.map(function(cu){var d=cultureMatch[cu];return '<div class="align-card" style="--cr:'+d.cr+'"><h4>'+cu+'</h4><span class="ac-sub">与中国傩面最接近的角色谱系</span><div class="ac-match"><strong style="color:'+d.color+'">'+d.role+'</strong><span class="ac-score">平均形态相似度 <b style="color:'+d.color+'">'+d.score+'%</b></span></div><p style="color:var(--muted);font-size:11px;line-height:1.6;margin:0">'+d.desc+'</p><div class="ac-samples">'+d.s+'</div></div>';}).join('');
  var dd={'韩国':{'额部/冠饰':-18,'眉眼':-28,'鼻部中轴':-22,'口部/牙齿':-32,'面颊纹样':-20,'边缘/附属':-26},'日本':{'额部/冠饰':-6,'眉眼':-22,'鼻部中轴':-18,'口部/牙齿':-26,'面颊纹样':-16,'边缘/附属':-8},'印尼·巴厘岛':{'额部/冠饰':8,'眉眼':-6,'鼻部中轴':-2,'口部/牙齿':2,'面颊纹样':4,'边缘/附属':12},'斯里兰卡':{'额部/冠饰':-12,'眉眼':-8,'鼻部中轴':-14,'口部/牙齿':18,'面颊纹样':-10,'边缘/附属':2}};
  var regs=['额部/冠饰','眉眼','鼻部中轴','口部/牙齿','面颊纹样','边缘/附属'];
  var db=document.getElementById('alignDeviationBars');if(db)db.innerHTML=c2.map(function(cu){var d=dd[cu],c=CULTURE_COLORS[cu];
    return '<div class="dev-bar-card"><h5 style="color:'+c+'">'+cu+'</h5>'+regs.map(function(r){var v=d[r],neg=v<0,av=Math.abs(v),pct=av/35*100,cls=neg?'neg':'pos';
      return '<div class="dev-bar-item"><span class="db-label">'+r+'</span><div class="db-track"><div class="db-zero"></div><div class="db-fill '+cls+'" style="width:'+(pct/2)+'%"></div></div><span class="db-val" style="color:'+(neg?'var(--red-hot)':'var(--cyan)')+'">'+(v>0?'+':'')+v+'</span></div>';
    }).join('')+'<p style="font-size:9px;color:var(--faint);margin:8px 0 0">红=低于中国 / 青=高于中国</p></div>';
  }).join('');
  }catch(e){console.error(e);}
})();

// Deep Dive
(function renderDeepDive(){
  try{var pairs=[{cn:'钟馗',wn:'Rangda',wc:'印尼·巴厘岛',kw:'驱邪威慑',x:58,y:88},{cn:'开山神',wn:'大飞出',wc:'日本',kw:'开场震慑',x:92,y:86},{cn:'土地公',wn:'巴龙凯特',wc:'印尼·巴厘岛',kw:'守护祈福',x:62,y:68},{cn:'丑角',wn:'Bondres',wc:'印尼·巴厘岛',kw:'喜剧表演',x:84,y:72},{cn:'判官',wn:'小面',wc:'日本',kw:'身份美学',x:48,y:82},{cn:'武将',wn:'罗摩',wc:'印尼·巴厘岛',kw:'英雄叙事',x:76,y:58},{cn:'先锋小姐',wn:'Hahoe Bune',wc:'韩国',kw:'女性角色',x:82,y:24},{cn:'雷公',wn:'Naga Raksha',wc:'斯里兰卡',kw:'兽形威慑',x:68,y:66},{cn:'唐氏太婆',wn:'Shinhalabi',wc:'韩国',kw:'长者角色',x:74,y:42},{cn:'孽龙',wn:'Maha Sohona',wc:'斯里兰卡',kw:'逐疫治疗',x:56,y:92}];
  var svg=document.getElementById('quadScatter');if(svg){var W=620,H=480,px=60,py=25,pw=500,ph=410;
    var si='<rect class="qs-bg" x="'+px+'" y="'+py+'" width="'+pw+'" height="'+ph+'" rx="12"/>';
    si+='<line class="qs-line" x1="'+px+'" y1="'+(py+ph/2)+'" x2="'+(px+pw)+'" y2="'+(py+ph/2)+'"/>';
    si+='<line class="qs-line" x1="'+(px+pw/2)+'" y1="'+py+'" x2="'+(px+pw/2)+'" y2="'+(py+ph)+'"/>';
    si+='<text class="qs-quad-label" x="'+(px+pw*0.24)+'" y="'+(py+28)+'">戏谑异化型</text><text class="qs-quad-label" x="'+(px+pw*0.7)+'" y="'+(py+28)+'">驱邪震慑型</text><text class="qs-quad-label" x="'+(px+pw*0.24)+'" y="'+(py+ph-10)+'">人相亲和型</text><text class="qs-quad-label" x="'+(px+pw*0.7)+'" y="'+(py+ph-10)+'">神圣威严型</text>';
    pairs.forEach(function(p){var cx=px+p.x/100*pw,cy=py+(100-p.y)/100*ph,c=CULTURE_COLORS[p.wc]||'#888';
      si+='<circle class="qs-dot" cx="'+cx.toFixed(1)+'" cy="'+cy.toFixed(1)+'" r="6" fill="'+c+'" stroke="rgba(255,255,255,.3)" stroke-width="1"><title>'+p.cn+' ↔ '+p.wn+' ('+p.kw+')</title></circle>';
      si+='<text class="qs-label" x="'+cx.toFixed(1)+'" y="'+(cy-10).toFixed(1)+'" text-anchor="middle">'+p.cn.slice(0,2)+'</text>';});
    si+='<text x="'+(px+pw/2)+'" y="'+(py+ph+28)+'" text-anchor="middle" fill="#fff" fill-opacity="0.36" font-size="10">形态相似度 →</text>';
    si+='<text x="'+(px-16)+'" y="'+(py+ph/2)+'" text-anchor="middle" fill="#fff" fill-opacity="0.36" font-size="10" transform="rotate(-90,'+(px-16)+','+(py+ph/2)+')">← 功能等价度</text>';
    svg.innerHTML=si;}
  var ql=document.getElementById('quadLegend');if(ql)ql.innerHTML=pairs.map(function(p){return '<div class="ql-item"><span class="ql-dot" style="background:'+(CULTURE_COLORS[p.wc]||'#888')+'"></span>'+p.cn+'↔'+p.wn+' <span style="color:var(--faint)">'+p.kw+'</span></div>';}).join('');
  var ed=[{n:'中国(483)',g:14.6,d:12.3,c:'#ff6034'},{n:'韩国',g:13.8,d:9.2,c:'#cd5360'},{n:'日本',g:16.2,d:11.8,c:'#28666e'},{n:'巴厘岛',g:20.4,d:16.5,c:'#eec550'},{n:'斯里兰卡',g:22.1,d:18.7,c:'#7c9885'}];
  var eg=document.getElementById('extGrotesque');if(eg)eg.innerHTML='<small>怪诞指数 /30</small>'+ed.map(function(e){return '<div class="ext-row"><div class="er-head"><span class="er-name">'+e.n+'</span><span class="er-val">'+e.g+'</span></div><div class="er-track"><div style="width:'+(e.g/30*100)+'%;height:100%;background:'+e.c+';border-radius:999px;opacity:.85"></div></div></div>';}).join('');
  var ed2=document.getElementById('extDeterrence');if(ed2)ed2.innerHTML='<small>威慑指数 /25</small>'+ed.map(function(e){return '<div class="ext-row"><div class="er-head"><span class="er-name">'+e.n+'</span><span class="er-val">'+e.d+'</span></div><div class="er-track"><div style="width:'+(e.d/25*100)+'%;height:100%;background:'+e.c+';border-radius:999px;opacity:.85"></div></div></div>';}).join('');
  var ei=document.getElementById('extInsight');if(ei)ei.innerHTML='<p><b>巴厘岛和斯里兰卡</b>在怪诞+威慑双维度上显著高于中国均值，反映了东南亚面具传统更强调<b>视觉极端性</b>。</p><p><b>韩国</b>在两个维度上均低于中国，Talchum面具更多服务于<b>讽刺批判与喜剧娱乐</b>而非威慑。</p><p><b>日本</b>与中国最接近——能面的内敛美学与中国傩面的仪式威慑处于相似的<b>中间地带</b>。</p>';
  }catch(e){console.error(e);}
})();

// Deck interaction
(function initDeck(){
  var track=document.getElementById('deckTrack');if(!track)return;
  var tabs=document.querySelectorAll('#compare-section .deck-tab'),dots=document.querySelectorAll('#compare-section .deck-dot');
  var pB=document.getElementById('deckPrev'),nB=document.getElementById('deckNext');
  var hl=document.getElementById('deckHeadline'),it=document.getElementById('deckIntro');
  var cur=0,total=3,sX=0,dr=false,mv=false;
  var labels=['角色对照','形态对照','功能对照'];
  var intros=['以中国傩面的角色分类为基线，观察国外面具分别靠近神祇、精怪、英雄还是世俗人物。','继续比较眼、眉、口、冠饰等面部结构，判断国外面具相对于中国傩面基线的形态偏移。','最后比较驱邪、治病、叙事与威慑强度，判断国外面具与中国傩面在仪式功能上的对应关系。'];
  function go(i){cur=Math.max(0,Math.min(total-1,i));track.style.transform='translateX(-'+(cur*100)+'%)';tabs.forEach(function(t,j){t.classList.toggle('is-active',j===cur);});dots.forEach(function(d,j){d.classList.toggle('is-active',j===cur);});if(hl)hl.textContent=labels[cur];if(it)it.textContent=intros[cur];}
  tabs.forEach(function(t){t.addEventListener('click',function(){go(parseInt(t.dataset.slide));});});
  dots.forEach(function(d){d.addEventListener('click',function(){go(parseInt(d.dataset.slide));});});
  if(pB)pB.addEventListener('click',function(){go(cur-1);});if(nB)nB.addEventListener('click',function(){go(cur+1);});
  track.addEventListener('pointerdown',function(e){sX=e.clientX;dr=true;mv=false;track.style.transition='none';});
  window.addEventListener('pointermove',function(e){if(!dr)return;var dx=e.clientX-sX;if(Math.abs(dx)>5)mv=true;track.style.transform='translateX('+(-cur*100+dx/track.offsetWidth*100)+'%)';});
  window.addEventListener('pointerup',function(e){if(!dr)return;dr=false;track.style.transition='transform .42s cubic-bezier(.22,.61,.36,1)';if(mv){var dx=e.clientX-sX;if(dx<-40)go(cur+1);else if(dx>40)go(cur-1);else go(cur);}});
  document.addEventListener('keydown',function(e){if(e.key==='ArrowLeft')go(cur-1);if(e.key==='ArrowRight')go(cur+1);});
  go(0);
})();
})();
