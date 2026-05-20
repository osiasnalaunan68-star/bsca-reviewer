import { useState, useEffect, useRef } from "react";

// ─── PERSISTENT STORAGE ───────────────────────────────────────────────────────
const STORAGE_KEY = "quizmaker_v1";
const saveData = (data) => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch(e){} };
const loadData = () => { try { const d = localStorage.getItem(STORAGE_KEY); return d ? JSON.parse(d) : null; } catch(e){ return null; } };

// ─── THEMES ───────────────────────────────────────────────────────────────────
const THEMES = {
  dark: {
    name:"Dark Mode", icon:"🌙",
    bg:"linear-gradient(135deg,#0A0F1E 0%,#0D1B2A 50%,#0A0F1E 100%)",
    surface:"rgba(255,255,255,0.04)", surfaceBorder:"rgba(255,255,255,0.08)", surfaceHover:"rgba(255,255,255,0.07)",
    text:"#E2E8F0", textSub:"#94A3B8", textMuted:"#475569",
    accent:"#3B82F6", accentGrad:"linear-gradient(135deg,#3B82F6,#8B5CF6)", accentGrad2:"linear-gradient(135deg,#8B5CF6,#EC4899)",
    success:"#10B981", successBg:"rgba(16,185,129,0.12)", successBorder:"rgba(16,185,129,0.3)", successText:"#6EE7B7",
    danger:"#EF4444", dangerBg:"rgba(239,68,68,0.12)", dangerBorder:"rgba(239,68,68,0.3)", dangerText:"#FCA5A5",
    inputBg:"rgba(255,255,255,0.05)", inputBorder:"rgba(255,255,255,0.1)", modalBg:"#0D1B2A",
    progressBg:"rgba(255,255,255,0.08)", chipActive:(c)=>c+"33",
    headFont:"'Sora', sans-serif", bodyFont:"'DM Sans', system-ui, sans-serif",
    gFonts:"https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Sora:wght@700;800&display=swap",
  },
  girl: {
    name:"Blossom", icon:"🌸",
    bg:"linear-gradient(135deg,#FFF0F5 0%,#FDE8F0 40%,#F3E8FF 100%)",
    surface:"rgba(255,255,255,0.8)", surfaceBorder:"rgba(236,72,153,0.14)", surfaceHover:"rgba(251,207,232,0.4)",
    text:"#4A1942", textSub:"#9D4E89", textMuted:"#C48BAD",
    accent:"#E91E8C", accentGrad:"linear-gradient(135deg,#F472B6,#A855F7)", accentGrad2:"linear-gradient(135deg,#FB7185,#F472B6)",
    success:"#059669", successBg:"rgba(5,150,105,0.1)", successBorder:"rgba(5,150,105,0.25)", successText:"#065f46",
    danger:"#BE123C", dangerBg:"rgba(190,18,60,0.08)", dangerBorder:"rgba(190,18,60,0.2)", dangerText:"#9f1239",
    inputBg:"rgba(255,255,255,0.95)", inputBorder:"rgba(236,72,153,0.22)", modalBg:"#FFF5F9",
    progressBg:"rgba(236,72,153,0.1)", chipActive:(c)=>c+"25",
    headFont:"'Playfair Display', serif", bodyFont:"'Nunito', sans-serif",
    gFonts:"https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Nunito:wght@400;600;700;800;900&display=swap",
  }
};

const PRESET_COLORS = ["#3B82F6","#8B5CF6","#EC4899","#10B981","#F59E0B","#EF4444","#06B6D4","#F97316","#84CC16","#6366F1"];
const PRESET_ICONS  = ["📚","🔢","🔬","🌍","🎨","💡","🏛️","🎵","🧬","⚽","🍀","🌸","📖","🔐","🧪","🗺️","🎭","🎯","🧠","💻"];

const uid  = () => Math.random().toString(36).slice(2,10);
const shuf = a  => [...a].sort(()=>Math.random()-.5);

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [theme, setTheme] = useState("dark");
  const T = THEMES[theme];

  const [screen,  setScreen]  = useState("home");
  const [cats,    setCats]    = useState([]);
  const [qs,      setQs]      = useState([]);
  const [selCats, setSelCats] = useState([]);

  // Quiz state
  const [quizQ,  setQuizQ]  = useState([]);
  const [cur,    setCur]    = useState(0);
  const [picked, setPicked] = useState(null);
  const [done,   setDone]   = useState(false);
  const [score,  setScore]  = useState(0);
  const [hist,   setHist]   = useState([]);

  // Modals
  const [catModal,   setCatModal]   = useState(null);
  const [bulkCatId,  setBulkCatId] = useState(null);
  const [singleCatId,setSingleCatId]= useState(null);

  const [toast, setToast] = useState(null);
  const toastT  = useRef(null);

  // Load
  useEffect(() => {
    const d = loadData();
    if (d) {
      if (d.cats)  setCats(d.cats);
      if (d.qs)    setQs(d.qs);
      if (d.theme) setTheme(d.theme);
    }
  }, []);

  // Auto-save
  useEffect(() => { saveData({ cats, qs, theme }); }, [cats, qs, theme]);

  const pop = (msg, type="ok") => {
    if (toastT.current) clearTimeout(toastT.current);
    setToast({msg,type});
    toastT.current = setTimeout(()=>setToast(null), 2600);
  };

  const getCat  = id => cats.find(c=>c.id===id);
  const getCatQs = id => qs.filter(q=>q.catId===id);

  // ── Quiz ──────────────────────────────────────────────────────────────────
  const startQuiz = () => {
    const pool = shuf(qs.filter(q=>selCats.includes(q.catId))).slice(0,30);
    if (!pool.length){ pop("Walang tanong sa napiling kategorya!","err"); return; }
    setQuizQ(pool); setCur(0); setPicked(null); setDone(false); setScore(0); setHist([]);
    setScreen("quiz");
  };

  const pick = idx => {
    if (done) return;
    setPicked(idx); setDone(true);
    const correct = idx === quizQ[cur].ans;
    if (correct) setScore(s=>s+1);
    setHist(h=>[...h,{q:quizQ[cur],sel:idx,correct}]);
  };

  const next = () => {
    if (cur+1>=quizQ.length){ setScreen("results"); return; }
    setCur(c=>c+1); setPicked(null); setDone(false);
  };

  const pct      = quizQ.length ? Math.round(score/quizQ.length*100) : 0;
  const getRating = p => p>=90?{t:"Napakahusay! 🏆",c:T.success}:p>=75?{t:"Mahusay! 🌟",c:T.accent}:p>=60?{t:"Maganda! 👍",c:"#F59E0B"}:{t:"Patuloy Mag-aral 💪",c:T.danger};

  // ── Styles ────────────────────────────────────────────────────────────────
  const S = {
    page:  {minHeight:"100vh",background:T.bg,fontFamily:T.bodyFont,color:T.text,padding:"0 0 48px"},
    wrap:  {maxWidth:680,margin:"0 auto",padding:"24px 16px"},
    card:  {background:T.surface,borderRadius:20,padding:24,border:`1px solid ${T.surfaceBorder}`,backdropFilter:"blur(12px)"},
    cardSm:{background:T.surface,borderRadius:14,padding:"13px 15px",border:`1px solid ${T.surfaceBorder}`},
    btn:   (bg,c=T.text)=>({cursor:"pointer",border:"none",borderRadius:12,padding:"11px 18px",background:bg,color:c,fontWeight:700,fontFamily:T.bodyFont,fontSize:14,transition:"all .15s",outline:"none",display:"inline-flex",alignItems:"center",gap:6}),
    inp:   {width:"100%",padding:"10px 14px",borderRadius:10,border:`1.5px solid ${T.inputBorder}`,background:T.inputBg,color:T.text,fontFamily:T.bodyFont,fontSize:14,outline:"none",boxSizing:"border-box",transition:"border .15s"},
    lbl:   {fontSize:11,fontWeight:800,color:T.textMuted,letterSpacing:1,textTransform:"uppercase",marginBottom:6,display:"block"},
  };

  // ── Category CRUD ─────────────────────────────────────────────────────────
  const saveCat = cat => {
    if (cat._new){ setCats(p=>[...p,{id:uid(),name:cat.name,color:cat.color,icon:cat.icon}]); pop("Kategorya naidagdag! ✅"); }
    else { setCats(p=>p.map(c=>c.id===cat.id?{id:cat.id,name:cat.name,color:cat.color,icon:cat.icon}:c)); pop("Na-update! ✅"); }
    setCatModal(null);
  };

  const deleteCat = id => {
    setCats(p=>p.filter(c=>c.id!==id));
    setQs(p=>p.filter(q=>q.catId!==id));
    setSelCats(p=>p.filter(c=>c!==id));
    pop("Kategorya at mga tanong nito ay natanggal.","err");
  };

  // ── Question CRUD ─────────────────────────────────────────────────────────
  const saveBulk = newQs => {
    const catId = newQs[0]?.catId;
    setQs(p=>[...p.filter(q=>q.catId!==catId),...newQs.filter(q=>q.q.trim())]);
    pop("Na-save ang lahat! ✅"); setBulkCatId(null);
  };

  const addSingle = q => {
    setQs(p=>[...p,q]); pop("Tanong naidagdag! ✅"); setSingleCatId(null);
  };

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div style={S.page}>
      <style>{`
        @import url('${T.gFonts}');
        *{box-sizing:border-box;margin:0;padding:0}
        button:hover:not(:disabled){opacity:.88;transform:translateY(-1px)}
        button:active:not(:disabled){transform:scale(.97)}
        textarea{resize:vertical}
        input:focus,textarea:focus,select:focus{outline:none;border-color:${T.accent}!important}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:${T.textMuted};border-radius:3px}
        .cBtn{width:100%;text-align:left;padding:13px 17px;border-radius:14px;border:1.5px solid ${T.surfaceBorder};background:${T.surface};color:${T.text};font-size:15px;font-family:${T.bodyFont};font-weight:600;cursor:pointer;transition:all .15s;margin-bottom:8px;display:flex;align-items:center;gap:12px}
        .cBtn:not(:disabled):hover{border-color:${T.accent};background:${T.surfaceHover}}
        .cBtn.correct{border-color:${T.success}!important;background:${T.successBg}!important;color:${T.successText}!important}
        .cBtn.wrong{border-color:${T.danger}!important;background:${T.dangerBg}!important;color:${T.dangerText}!important}
        @keyframes fu{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .fu{animation:fu .28s ease}
        @keyframes pu{0%,100%{transform:scale(1)}50%{transform:scale(1.03)}}
        .pu{animation:pu 2.4s ease-in-out infinite}
        .ccrd{transition:transform .15s,box-shadow .15s}
        .ccrd:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,0.15)}
      `}</style>

      {/* Toast */}
      {toast&&<div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",padding:"11px 22px",borderRadius:12,background:toast.type==="err"?T.dangerBg:T.successBg,color:toast.type==="err"?T.dangerText:T.successText,border:`1px solid ${toast.type==="err"?T.dangerBorder:T.successBorder}`,fontWeight:700,fontSize:14,zIndex:999,whiteSpace:"nowrap",boxShadow:"0 4px 24px rgba(0,0,0,0.2)",backdropFilter:"blur(8px)"}}>
        {toast.msg}
      </div>}

      {/* ════ HOME ════ */}
      {screen==="home"&&<div style={S.wrap}>
        {/* Hero */}
        <div style={{textAlign:"center",padding:"28px 0 22px"}}>
          <div style={{fontSize:52,marginBottom:10}}>✏️</div>
          <h1 style={{fontFamily:T.headFont,fontSize:26,fontWeight:800,background:T.accentGrad,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:6,lineHeight:1.2}}>
            My Quiz Maker
          </h1>
          <p style={{color:T.textSub,fontSize:13,lineHeight:1.7}}>Gumawa ng sariling quiz — ikaw ang bahala sa categories, questions, at choices!</p>
        </div>

        {/* Theme Toggle */}
        <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:24}}>
          {Object.entries(THEMES).map(([k,th])=>(
            <button key={k} style={{...S.btn(theme===k?T.accentGrad:T.surface,theme===k?"#fff":T.textSub),padding:"9px 20px",fontSize:13,border:`1.5px solid ${theme===k?"transparent":T.surfaceBorder}`}} onClick={()=>setTheme(k)}>
              {th.icon} {th.name}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:22}}>
          {[[cats.length,"📂","Kategorya"],[qs.length,"❓","Tanong"],[selCats.length,"✅","Napili"]].map(([v,ico,l])=>(
            <div key={l} style={{...S.cardSm,textAlign:"center"}}>
              <div style={{fontSize:22}}>{ico}</div>
              <div style={{fontWeight:900,fontSize:22,color:T.accent}}>{v}</div>
              <div style={{color:T.textMuted,fontSize:11,fontWeight:700,marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div style={{...S.card,marginBottom:18}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <p style={{fontWeight:800,fontSize:15}}>📂 Mga Kategorya</p>
            <button style={{...S.btn(T.accentGrad,"#fff"),padding:"8px 14px",fontSize:13}} onClick={()=>setCatModal({mode:"add",cat:{_new:true,name:"",color:PRESET_COLORS[cats.length%PRESET_COLORS.length],icon:PRESET_ICONS[cats.length%PRESET_ICONS.length]}})}>
              + Kategorya
            </button>
          </div>

          {cats.length===0?(
            <div style={{textAlign:"center",padding:"28px 0",color:T.textMuted}}>
              <div style={{fontSize:38,marginBottom:8}}>📭</div>
              <p style={{fontWeight:700}}>Wala pang kategorya.</p>
              <p style={{fontSize:13,marginTop:4}}>Pindutin ang "+ Kategorya" para magsimula!</p>
            </div>
          ):(
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {cats.map(cat=>{
                const qc=getCatQs(cat.id).length;
                const sel=selCats.includes(cat.id);
                return(
                  <div key={cat.id} className="ccrd" style={{background:sel?T.chipActive(cat.color):T.surfaceHover,borderRadius:14,padding:"12px 14px",border:`1.5px solid ${sel?cat.color:T.surfaceBorder}`,display:"flex",alignItems:"center",gap:10}}>
                    {/* Toggle for quiz */}
                    <button style={{border:"none",background:"none",fontSize:26,cursor:"pointer",flexShrink:0,transition:"transform .15s"}} title="I-tap para piliin sa quiz" onClick={()=>setSelCats(p=>sel?p.filter(c=>c!==cat.id):[...p,cat.id])}>
                      {cat.icon}
                    </button>
                    <div style={{flex:1,minWidth:0}}>
                      <p style={{fontWeight:800,fontSize:14,color:sel?cat.color:T.text}}>{cat.name}</p>
                      <p style={{fontSize:12,color:T.textMuted}}>{qc} tanong {sel?"· ✅ napili":""}</p>
                    </div>
                    {/* Action buttons */}
                    <div style={{display:"flex",gap:6,flexShrink:0,flexWrap:"wrap",justifyContent:"flex-end"}}>
                      <button style={{...S.btn(T.surface),padding:"6px 10px",fontSize:12,border:`1px solid ${T.surfaceBorder}`,color:T.textSub}} title="Mag-add ng isang tanong" onClick={()=>setSingleCatId(cat.id)}>
                        + Isa
                      </button>
                      <button style={{...S.btn(T.surface),padding:"6px 10px",fontSize:12,border:`1px solid ${T.surfaceBorder}`,color:T.accent}} title="I-edit lahat / Mag-add ng marami" onClick={()=>setBulkCatId(cat.id)}>
                        ✏️ Edit All
                      </button>
                      <button style={{...S.btn(T.surface),padding:"6px 10px",fontSize:12,border:`1px solid ${T.surfaceBorder}`,color:T.textSub}} onClick={()=>setCatModal({mode:"edit",cat:{...cat}})}>
                        ⚙️
                      </button>
                      <button style={{...S.btn(T.dangerBg),padding:"6px 10px",fontSize:12,border:`1px solid ${T.dangerBorder}`,color:T.dangerText}} onClick={()=>deleteCat(cat.id)}>
                        🗑️
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cats.length>0&&<>
          <p style={{color:T.textMuted,fontSize:12,textAlign:"center",marginBottom:10}}>
            {selCats.length?`${qs.filter(q=>selCats.includes(q.catId)).length} tanong ang kasama sa quiz`:"I-tap ang icon ng kategorya para piliin sa quiz"}
          </p>
          <button className="pu" style={{...S.btn(selCats.length?T.accentGrad:T.surface,selCats.length?"#fff":T.textMuted),width:"100%",padding:"16px",fontSize:17,borderRadius:16,justifyContent:"center"}} onClick={startQuiz} disabled={!selCats.length}>
            🚀 Simulan ang Quiz
          </button>
        </>}
      </div>}

      {/* ════ QUIZ ════ */}
      {screen==="quiz"&&quizQ.length>0&&<div style={S.wrap} className="fu">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <button style={{...S.btn(T.surface),color:T.textSub}} onClick={()=>setScreen("home")}>← Bumalik</button>
          <span style={{fontWeight:800,color:T.accent,fontSize:15}}>{score}/{hist.length} ✓</span>
        </div>

        <div style={{height:6,background:T.progressBg,borderRadius:3,marginBottom:16,overflow:"hidden"}}>
          <div style={{height:"100%",borderRadius:3,background:T.accentGrad,width:`${(cur+1)/quizQ.length*100}%`,transition:"width .5s"}}/>
        </div>
        <p style={{textAlign:"center",color:T.textMuted,fontSize:13,fontWeight:700,marginBottom:18}}>Tanong {cur+1} / {quizQ.length}</p>

        {(()=>{const c=getCat(quizQ[cur].catId)||{color:T.accent,icon:"❓",name:"?"};return(
          <span style={{padding:"4px 12px",borderRadius:999,background:T.chipActive(c.color),color:c.color,fontWeight:800,fontSize:12,display:"inline-block",marginBottom:14,border:`1px solid ${c.color}44`}}>
            {c.icon} {c.name}
          </span>
        )})()}

        <div style={{...S.card,marginBottom:16}}>
          <p style={{fontWeight:800,fontSize:16,lineHeight:1.65}}>{quizQ[cur].q}</p>
        </div>

        {quizQ[cur].choices.map((ch,i)=>{
          let cls="cBtn";
          if(done){if(i===quizQ[cur].ans)cls+=" correct";else if(i===picked)cls+=" wrong";}
          return(
            <button key={i} className={cls} disabled={done} onClick={()=>pick(i)}>
              <span style={{width:28,height:28,borderRadius:8,background:done&&i===quizQ[cur].ans?T.successBg:done&&i===picked?T.dangerBg:T.surfaceHover,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:13,flexShrink:0}}>
                {String.fromCharCode(65+i)}
              </span>
              {ch}
            </button>
          );
        })}

        {done&&<div className="fu" style={{...S.card,background:picked===quizQ[cur].ans?T.successBg:T.dangerBg,borderColor:picked===quizQ[cur].ans?T.successBorder:T.dangerBorder,marginTop:4,marginBottom:14}}>
          <p style={{fontWeight:800,marginBottom:quizQ[cur].exp?6:0,color:picked===quizQ[cur].ans?T.successText:T.dangerText}}>
            {picked===quizQ[cur].ans?"✅ Tama!":"❌ Mali!"}
          </p>
          {quizQ[cur].exp&&<p style={{fontSize:13,color:T.textSub,lineHeight:1.7}}>{quizQ[cur].exp}</p>}
        </div>}

        {done&&<button style={{...S.btn(T.accentGrad,"#fff"),width:"100%",padding:14,fontSize:15,borderRadius:14,justifyContent:"center"}} onClick={next}>
          {cur+1>=quizQ.length?"Makita ang Resulta 🎯":"Susunod →"}
        </button>}
      </div>}

      {/* ════ RESULTS ════ */}
      {screen==="results"&&<div style={S.wrap} className="fu">
        <div style={{textAlign:"center",padding:"24px 0 18px"}}>
          <div style={{fontSize:60}}>{pct>=75?"🏆":"💪"}</div>
          <h2 style={{fontFamily:T.headFont,fontSize:24,fontWeight:800,marginBottom:6,marginTop:8}}>Quiz Tapos Na!</h2>
          <div style={{fontSize:48,fontWeight:900,color:getRating(pct).c}}>{pct}%</div>
          <div style={{fontWeight:800,fontSize:17,color:getRating(pct).c,marginBottom:4}}>{getRating(pct).t}</div>
          <p style={{color:T.textMuted,fontSize:14}}>{score} tama sa {quizQ.length} tanong</p>
        </div>

        {/* Per-category scores */}
        <div style={{marginBottom:16}}>
          {cats.filter(c=>selCats.includes(c.id)).map(cat=>{
            const cqs=hist.filter(h=>h.q.catId===cat.id);
            if(!cqs.length)return null;
            const sc=cqs.filter(h=>h.correct).length;
            const pp=Math.round(sc/cqs.length*100);
            return(
              <div key={cat.id} style={{...S.cardSm,marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                  <span style={{fontSize:13,fontWeight:700,color:cat.color}}>{cat.icon} {cat.name}</span>
                  <span style={{fontSize:13,fontWeight:800}}>{sc}/{cqs.length}</span>
                </div>
                <div style={{height:6,background:T.progressBg,borderRadius:3,overflow:"hidden"}}>
                  <div style={{height:"100%",borderRadius:3,background:cat.color,width:pp+"%",transition:"width .6s"}}/>
                </div>
              </div>
            );
          })}
        </div>

        {/* Wrong answers */}
        {hist.filter(h=>!h.correct).length>0&&<div style={{marginBottom:16}}>
          <p style={{fontWeight:800,marginBottom:12}}>❌ Mga Maling Sagot:</p>
          {hist.filter(h=>!h.correct).map((h,i)=>{
            const cat=getCat(h.q.catId)||{color:T.accent,icon:"❓",name:"?"};
            return(
              <div key={i} style={{...S.cardSm,marginBottom:10}}>
                <span style={{fontSize:11,fontWeight:800,color:cat.color}}>{cat.icon} {cat.name}</span>
                <p style={{fontWeight:700,fontSize:14,margin:"5px 0 4px",lineHeight:1.5}}>{h.q.q}</p>
                <p style={{fontSize:12,color:T.dangerText,marginBottom:2}}>Iyong sagot: {h.q.choices[h.sel]}</p>
                <p style={{fontSize:12,color:T.successText,marginBottom:h.q.exp?4:0}}>Tamang sagot: {h.q.choices[h.q.ans]}</p>
                {h.q.exp&&<p style={{fontSize:12,color:T.textMuted,lineHeight:1.6}}>{h.q.exp}</p>}
              </div>
            );
          })}
        </div>}

        <div style={{display:"flex",gap:10}}>
          <button style={{...S.btn(T.surface),flex:1,padding:14,fontSize:15,justifyContent:"center",border:`1px solid ${T.surfaceBorder}`,color:T.textSub}} onClick={()=>setScreen("home")}>🏠 Home</button>
          <button style={{...S.btn(T.accentGrad,"#fff"),flex:1,padding:14,fontSize:15,justifyContent:"center"}} onClick={startQuiz}>🔄 Ulit</button>
        </div>
      </div>}

      {/* ════ MODALS ════ */}
      {catModal&&<CatModal T={T} S={S} data={catModal} onSave={saveCat} onClose={()=>setCatModal(null)}/>}
      {bulkCatId&&<BulkEditModal T={T} S={S} cat={getCat(bulkCatId)} existing={getCatQs(bulkCatId)} onSave={saveBulk} onClose={()=>setBulkCatId(null)} pop={pop}/>}
      {singleCatId&&<SingleAddModal T={T} S={S} cat={getCat(singleCatId)} onSave={addSingle} onClose={()=>setSingleCatId(null)}/>}
    </div>
  );
}

// ─── SHARED MODAL SHELL ───────────────────────────────────────────────────────
function Modal({T,children,onClose,wide}){
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:16,backdropFilter:"blur(6px)"}} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{background:T.modalBg,borderRadius:22,padding:24,width:"100%",maxWidth:wide?600:500,maxHeight:"92vh",overflowY:"auto",border:`1px solid ${T.surfaceBorder}`,boxShadow:"0 24px 64px rgba(0,0,0,0.3)"}}>
        {children}
      </div>
    </div>
  );
}

function MHead({T,S,title,onClose}){
  return(
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
      <h3 style={{fontFamily:T.headFont,fontWeight:800,fontSize:17,color:T.text}}>{title}</h3>
      <button style={{...S.btn(T.surface),padding:"6px 12px",fontSize:13,border:`1px solid ${T.surfaceBorder}`,color:T.textSub}} onClick={onClose}>✕</button>
    </div>
  );
}

// ─── CATEGORY MODAL ───────────────────────────────────────────────────────────
function CatModal({T,S,data,onSave,onClose}){
  const [f,setF]=useState({...data.cat});
  const u=(k,v)=>setF(p=>({...p,[k]:v}));
  return(
    <Modal T={T} onClose={onClose}>
      <MHead T={T} S={S} title={data.mode==="add"?"➕ Bagong Kategorya":"✏️ I-edit ang Kategorya"} onClose={onClose}/>
      <label style={S.lbl}>Pangalan</label>
      <input style={{...S.inp,marginBottom:14}} value={f.name} onChange={e=>u("name",e.target.value)} placeholder="Hal: Agham, History, Math..." autoFocus/>
      <label style={S.lbl}>Icon</label>
      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:14}}>
        {PRESET_ICONS.map(ico=>(
          <button key={ico} style={{width:38,height:38,borderRadius:10,border:`2px solid ${f.icon===ico?T.accent:T.surfaceBorder}`,background:f.icon===ico?T.chipActive(T.accent):T.surface,fontSize:20,cursor:"pointer"}} onClick={()=>u("icon",ico)}>{ico}</button>
        ))}
        <input style={{...S.inp,width:60,textAlign:"center"}} value={f.icon} onChange={e=>u("icon",e.target.value)} maxLength={2} placeholder="✍️"/>
      </div>
      <label style={S.lbl}>Kulay</label>
      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:18}}>
        {PRESET_COLORS.map(col=>(
          <button key={col} style={{width:30,height:30,borderRadius:8,background:col,border:`3px solid ${f.color===col?"#fff":"transparent"}`,cursor:"pointer",outline:f.color===col?`2px solid ${col}`:"none",outlineOffset:2}} onClick={()=>u("color",col)}/>
        ))}
      </div>
      {/* Preview */}
      <div style={{background:T.chipActive(f.color),borderRadius:14,padding:"12px 16px",marginBottom:18,border:`1.5px solid ${f.color}`,display:"flex",alignItems:"center",gap:12}}>
        <span style={{fontSize:26}}>{f.icon||"📂"}</span>
        <div>
          <p style={{fontWeight:800,color:f.color,fontSize:15}}>{f.name||"Pangalan ng Kategorya"}</p>
          <p style={{fontSize:12,color:T.textMuted}}>Preview</p>
        </div>
      </div>
      <div style={{display:"flex",gap:10}}>
        <button style={{...S.btn(T.surface),flex:1,padding:12,justifyContent:"center",border:`1px solid ${T.surfaceBorder}`,color:T.textSub}} onClick={onClose}>Kanselahin</button>
        <button style={{...S.btn(T.accentGrad,"#fff"),flex:1,padding:12,justifyContent:"center"}} onClick={()=>f.name.trim()&&onSave(f)} disabled={!f.name.trim()}>
          {data.mode==="add"?"✅ I-add":"💾 I-save"}
        </button>
      </div>
    </Modal>
  );
}

// ─── BULK EDIT MODAL ──────────────────────────────────────────────────────────
function BulkEditModal({T,S,cat,existing,onSave,onClose,pop}){
  const blank=catId=>({id:uid(),catId,q:"",choices:["","","",""],ans:0,exp:""});
  const [items,setItems]=useState(()=>existing.length?existing.map(q=>({...q,choices:[...q.choices]})):[blank(cat.id)]);

  const addItem    =()=>setItems(p=>[...p,blank(cat.id)]);
  const removeItem =i=>setItems(p=>p.filter((_,j)=>j!==i));
  const upd        =(i,k,v)=>setItems(p=>p.map((it,j)=>j===i?{...it,[k]:v}:it));
  const updC       =(i,ci,v)=>setItems(p=>p.map((it,j)=>j===i?{...it,choices:it.choices.map((c,k)=>k===ci?v:c)}:it));

  const handleSave=()=>{
    const valid=items.filter(it=>it.q.trim()&&it.choices.filter(c=>c.trim()).length>=2);
    if(!valid.length){pop("Walang valid na tanong! Kailangan ng question at at least 2 choices.","err");return;}
    onSave(valid);
  };

  return(
    <Modal T={T} onClose={onClose} wide>
      <MHead T={T} S={S} title={`✏️ Edit All — ${cat?.icon} ${cat?.name}`} onClose={onClose}/>
      <div style={{background:T.chipActive(cat?.color||T.accent),borderRadius:12,padding:"10px 14px",marginBottom:16,border:`1px solid ${(cat?.color||T.accent)+"44"}`}}>
        <p style={{fontSize:13,color:T.textSub,lineHeight:1.7}}>
          Lahat ng tanong sa kategoryang ito ay nandito. I-edit, tanggalin, o mag-add pa gamit ang <strong style={{color:T.accent}}>+ Dagdag Pa</strong>. Kapag tapos na, pindutin ang <strong style={{color:T.success}}>💾 Save All</strong>.
        </p>
      </div>

      {items.map((it,i)=>(
        <div key={it.id} style={{background:T.surface,borderRadius:16,padding:18,marginBottom:14,border:`1.5px solid ${T.surfaceBorder}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <span style={{fontWeight:800,fontSize:13,color:cat?.color||T.accent}}>Tanong #{i+1}</span>
            {items.length>1&&<button style={{...S.btn(T.dangerBg),padding:"5px 10px",fontSize:12,color:T.dangerText,border:`1px solid ${T.dangerBorder}`}} onClick={()=>removeItem(i)}>🗑️ Alisin</button>}
          </div>
          <label style={S.lbl}>Tanong</label>
          <textarea style={{...S.inp,marginBottom:12,minHeight:58}} value={it.q} onChange={e=>upd(i,"q",e.target.value)} placeholder="Ilagay ang tanong..."/>
          <label style={S.lbl}>Choices — i-click ang titik para itakda bilang tamang sagot</label>
          {it.choices.map((ch,ci)=>(
            <div key={ci} style={{display:"flex",gap:8,marginBottom:8,alignItems:"center"}}>
              <button style={{...S.btn(it.ans===ci?T.successBg:T.surface),padding:"8px 12px",fontSize:13,flexShrink:0,border:`1.5px solid ${it.ans===ci?T.success:T.surfaceBorder}`,color:it.ans===ci?T.successText:T.textMuted}} onClick={()=>upd(i,"ans",ci)}>
                {String.fromCharCode(65+ci)}{it.ans===ci?" ✓":""}
              </button>
              <input style={S.inp} value={ch} onChange={e=>updC(i,ci,e.target.value)} placeholder={`Choice ${String.fromCharCode(65+ci)}`}/>
            </div>
          ))}
          <label style={{...S.lbl,marginTop:8}}>Paliwanag (opsyonal)</label>
          <textarea style={{...S.inp,minHeight:48}} value={it.exp||""} onChange={e=>upd(i,"exp",e.target.value)} placeholder="Pwedeng blangko..."/>
        </div>
      ))}

      <button style={{...S.btn(T.surface),width:"100%",padding:13,justifyContent:"center",fontSize:14,border:`1.5px dashed ${T.surfaceBorder}`,color:T.textSub,marginBottom:16,borderRadius:14}} onClick={addItem}>
        + Dagdag Pa
      </button>

      <div style={{display:"flex",gap:10,position:"sticky",bottom:0,background:T.modalBg,paddingTop:12}}>
        <button style={{...S.btn(T.surface),flex:1,padding:13,justifyContent:"center",border:`1px solid ${T.surfaceBorder}`,color:T.textSub}} onClick={onClose}>Kanselahin</button>
        <button style={{...S.btn(T.accentGrad2,"#fff"),flex:2,padding:13,justifyContent:"center",fontSize:15}} onClick={handleSave}>💾 Save All</button>
      </div>
    </Modal>
  );
}

// ─── SINGLE ADD MODAL ─────────────────────────────────────────────────────────
function SingleAddModal({T,S,cat,onSave,onClose}){
  const [f,setF]=useState({id:uid(),catId:cat.id,q:"",choices:["","","",""],ans:0,exp:""});
  const u =(k,v)=>setF(p=>({...p,[k]:v}));
  const uc=(i,v)=>setF(p=>({...p,choices:p.choices.map((c,j)=>j===i?v:c)}));
  const valid=f.q.trim()&&f.choices.filter(c=>c.trim()).length>=2;
  return(
    <Modal T={T} onClose={onClose}>
      <MHead T={T} S={S} title={`➕ Mag-add ng Tanong — ${cat?.icon} ${cat?.name}`} onClose={onClose}/>
      <label style={S.lbl}>Tanong</label>
      <textarea style={{...S.inp,marginBottom:14,minHeight:64}} value={f.q} onChange={e=>u("q",e.target.value)} placeholder="Ilagay ang tanong dito..." autoFocus/>
      <label style={S.lbl}>Choices — i-click ang titik para itakda bilang tamang sagot</label>
      {f.choices.map((ch,i)=>(
        <div key={i} style={{display:"flex",gap:8,marginBottom:8,alignItems:"center"}}>
          <button style={{...S.btn(f.ans===i?T.successBg:T.surface),padding:"8px 12px",fontSize:13,flexShrink:0,border:`1.5px solid ${f.ans===i?T.success:T.surfaceBorder}`,color:f.ans===i?T.successText:T.textMuted}} onClick={()=>u("ans",i)}>
            {String.fromCharCode(65+i)}{f.ans===i?" ✓":""}
          </button>
          <input style={S.inp} value={ch} onChange={e=>uc(i,e.target.value)} placeholder={`Choice ${String.fromCharCode(65+i)}`}/>
        </div>
      ))}
      <label style={{...S.lbl,marginTop:10}}>Paliwanag (opsyonal)</label>
      <textarea style={{...S.inp,marginBottom:18,minHeight:52}} value={f.exp} onChange={e=>u("exp",e.target.value)} placeholder="Pwedeng blangko..."/>
      <div style={{display:"flex",gap:10}}>
        <button style={{...S.btn(T.surface),flex:1,padding:12,justifyContent:"center",border:`1px solid ${T.surfaceBorder}`,color:T.textSub}} onClick={onClose}>Kanselahin</button>
        <button style={{...S.btn(T.accentGrad,"#fff"),flex:1,padding:12,justifyContent:"center"}} onClick={()=>valid&&onSave(f)} disabled={!valid}>✅ I-add</button>
      </div>
    </Modal>
  );
}
