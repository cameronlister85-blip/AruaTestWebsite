// ============================================================
// Arua Design System — single bundle
// ============================================================

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{ "direction": "editorial" }/*EDITMODE-END*/;

const DIRECTIONS = {
  editorial: {
    name: "Editorial",
    tagline: "Refined NZ magazine. Display serif on grotesk. Confident accent.",
    fonts: {
      display: '"Fraunces", Georgia, serif',
      displayWeight: 380,
      displayTracking: '-0.035em',
      displayFeatures: '"ss01" 1, "ss02" 1',
      body: '"Inter Tight", -apple-system, system-ui, sans-serif',
      bodyWeight: 400,
      mono: '"JetBrains Mono", ui-monospace, monospace',
    },
    colors: {
      page:'#F6F1E8', pageAlt:'#EDE5D8', surface:'#FFFFFF',
      ink:'#15140F', inkSoft:'#3B3933', muted:'#8A867D',
      hairline:'#D9CFBF', hairlineSoft:'#E5DCCC',
      accent:'#8C4A2F', accentInk:'#FFFFFF', accentDeep:'#5C2E1A',
      sage:'#DCE3D2', sageDeep:'#5E6B4F',
    },
    radii:{ input:'4px', card:'6px', tag:'999px', cta:'999px' },
    tag:{ uppercase:true, tracking:'0.14em', size:'11px' },
    labelTracking:'0.18em',
  },
  clinical: {
    name: "Clinical",
    tagline: "Institutional restraint. Single grotesk. Caramel as hairline only.",
    fonts: {
      display: '"Inter Tight", -apple-system, system-ui, sans-serif',
      displayWeight: 480,
      displayTracking: '-0.045em',
      displayFeatures: '"ss01" 1',
      body: '"Inter Tight", -apple-system, system-ui, sans-serif',
      bodyWeight: 400,
      mono: '"JetBrains Mono", ui-monospace, monospace',
    },
    colors: {
      page:'#F4F2EC', pageAlt:'#E8E5DD', surface:'#FFFFFF',
      ink:'#111110', inkSoft:'#3A3A36', muted:'#8C8A82',
      hairline:'#D6D2C7', hairlineSoft:'#E2DED2',
      accent:'#8C4A2F', accentInk:'#FFFFFF', accentDeep:'#5C2E1A',
      sage:'#E1E5DA', sageDeep:'#5E6B4F',
    },
    radii:{ input:'2px', card:'2px', tag:'2px', cta:'999px' },
    tag:{ uppercase:true, tracking:'0.18em', size:'10.5px' },
    labelTracking:'0.22em',
  },
  warm: {
    name: "Warm",
    tagline: "Dignity and domesticity. Richer ochre, italic editorial flourishes.",
    fonts: {
      display: '"Fraunces", Georgia, serif',
      displayWeight: 340,
      displayTracking: '-0.025em',
      displayFeatures: '"ss01" 1, "ss02" 1',
      body: 'Georgia, "Source Serif Pro", serif',
      bodyWeight: 400,
      mono: '"JetBrains Mono", ui-monospace, monospace',
    },
    colors: {
      page:'#F4ECDD', pageAlt:'#E6D5BA', surface:'#FBF5EA',
      ink:'#1F1A12', inkSoft:'#4A4136', muted:'#8C8273',
      hairline:'#D8C7AB', hairlineSoft:'#E8DCC4',
      accent:'#A65A2E', accentInk:'#FBF5EA', accentDeep:'#5C2E1A',
      sage:'#D4DBC2', sageDeep:'#4F5E3F',
    },
    radii:{ input:'6px', card:'10px', tag:'999px', cta:'999px' },
    tag:{ uppercase:true, tracking:'0.16em', size:'11px' },
    labelTracking:'0.18em',
  },
};

// ─────────── helpers ───────────

function Mono(p) {
  const t = p.t;
  return <span style={{fontFamily:t.fonts.mono, fontSize:11, letterSpacing:'0.04em', color:t.colors.muted, ...(p.style||{})}}>{p.children}</span>;
}

function Eyebrow(p) {
  const t = p.t;
  return <div style={{fontFamily:t.fonts.mono, fontSize:11, letterSpacing:t.labelTracking, textTransform:'uppercase', color:t.colors.muted}}>{p.children}</div>;
}

function Section(p) {
  const t = p.t;
  return (
    <section style={{padding:'88px 64px', borderTop:`1px solid ${t.colors.hairline}`}}>
      <div style={{maxWidth:1280, margin:'0 auto'}}>
        <div style={{display:'grid', gridTemplateColumns:'220px 1fr', gap:48, marginBottom:56}}>
          <Eyebrow t={t}>{p.eyebrow}</Eyebrow>
          <div style={{maxWidth:720}}>
            <h2 style={{fontFamily:t.fonts.display, fontWeight:t.fonts.displayWeight, fontSize:44, lineHeight:1.05, letterSpacing:t.fonts.displayTracking, color:t.colors.ink, fontFeatureSettings:t.fonts.displayFeatures}}>
              {p.title}
            </h2>
            {p.sub && <p style={{fontFamily:t.fonts.body, fontSize:16, lineHeight:1.55, color:t.colors.inkSoft, margin:'14px 0 0', maxWidth:560}}>{p.sub}</p>}
          </div>
        </div>
        {p.children}
      </div>
    </section>
  );
}

function Tag(p) {
  const t = p.t;
  const styles = {
    sage:{background:t.colors.sage, color:t.colors.sageDeep},
    ink:{background:t.colors.ink, color:t.colors.page},
    accent:{background:t.colors.accent, color:t.colors.accentInk},
    outline:{background:'transparent', color:t.colors.ink, boxShadow:`inset 0 0 0 1px ${t.colors.hairline}`},
    sand:{background:t.colors.pageAlt, color:t.colors.ink},
  };
  return <span style={{...styles[p.variant||'sage'], fontFamily:t.fonts.mono, fontSize:t.tag.size, fontWeight:500, letterSpacing:t.tag.tracking, textTransform:t.tag.uppercase?'uppercase':'none', borderRadius:t.radii.tag, padding:'6px 12px', display:'inline-block', lineHeight:1.4}}>{p.children}</span>;
}

function Btn(p) {
  const t = p.t;
  const variant = p.variant || 'primary-ink';
  const base = {fontFamily:t.fonts.body, fontWeight:500, fontSize:15, padding:'0 24px', height:44, borderRadius:t.radii.cta, border:'none', cursor:'pointer', display:'inline-flex', alignItems:'center', gap:8};
  const styles = {
    'primary-ink':{...base, background:t.colors.ink, color:t.colors.page},
    'primary-accent':{...base, background:t.colors.accent, color:t.colors.accentInk},
    'primary-page':{...base, background:t.colors.page, color:t.colors.ink, border:`1px solid ${t.colors.hairline}`},
    'secondary':{...base, background:'transparent', color:t.colors.ink, border:`1px solid ${t.colors.ink}`},
    'ghost':{...base, background:'transparent', color:t.colors.ink, padding:'0 12px'},
  };
  return <button className="arua-btn" style={styles[variant]}>{p.children||'Get started'}{p.icon?<span> →</span>:null}</button>;
}

function Photo(p) {
  const t = p.t;
  return (
    <div style={{aspectRatio:p.ratio||'4/3', background:`repeating-linear-gradient(135deg, ${t.colors.pageAlt} 0 12px, ${t.colors.hairlineSoft} 12px 13px)`, border:`1px solid ${t.colors.hairlineSoft}`, display:'flex', alignItems:'flex-end', padding:16, borderRadius:t.radii.card}}>
      <div>
        <Mono t={t} style={{display:'block', color:t.colors.ink}}>[ photo ] {p.label}</Mono>
        {p.hint && <Mono t={t} style={{display:'block', marginTop:4, fontSize:10}}>{p.hint}</Mono>}
      </div>
    </div>
  );
}

// ─────────── sections ───────────

function Cover(p) {
  const t = p.t;
  return (
    <section style={{minHeight:'100vh', padding:64, display:'flex', flexDirection:'column', justifyContent:'space-between', background:t.colors.page}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
        <div style={{fontFamily:t.fonts.display, fontWeight:t.fonts.displayWeight, fontSize:28, letterSpacing:t.fonts.displayTracking, color:t.colors.ink}}>arua</div>
        <Mono t={t}>v0.2 / May 2026 / confidential</Mono>
      </div>
      <div style={{maxWidth:980}}>
        <Eyebrow t={t}>Design system — direction · {t.name.toLowerCase()}</Eyebrow>
        <h1 style={{fontFamily:t.fonts.display, fontWeight:t.fonts.displayWeight, fontSize:'clamp(64px, 9vw, 128px)', lineHeight:0.95, letterSpacing:t.fonts.displayTracking, color:t.colors.ink, margin:'32px 0 0', fontFeatureSettings:t.fonts.displayFeatures}}>
          The voice<br/>made visible.
        </h1>
        <p style={{fontFamily:t.fonts.body, fontSize:19, lineHeight:1.5, color:t.colors.inkSoft, maxWidth:620, margin:'40px 0 0'}}>
          A system designed against a single mandate — Immediate Psychological Ease.
          Every token, every component, every spacing decision either lowers the cost of a man taking action on his health, or it raises it.
        </p>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:32, paddingTop:48, borderTop:`1px solid ${t.colors.hairline}`}}>
        {[['01','Foundations','Type, color, scale'],['02','Primitives','Buttons, tags, forms'],['03','Patterns','Cards, nav, hero'],['04','Voice in context','Live samples']].map(([n,a,b]) => (
          <div key={n}>
            <Mono t={t}>{n}</Mono>
            <div style={{fontFamily:t.fonts.body, fontSize:14, color:t.colors.ink, marginTop:6}}>{a}</div>
            <div style={{fontFamily:t.fonts.body, fontSize:13, color:t.colors.muted, marginTop:2}}>{b}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Manifesto(p) {
  const t = p.t;
  return (
    <section style={{padding:'120px 64px', background:t.colors.ink, color:t.colors.page}}>
      <div style={{maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'220px 1fr', gap:48}}>
        <div style={{fontFamily:t.fonts.mono, fontSize:11, letterSpacing:t.labelTracking, textTransform:'uppercase', color:t.colors.muted}}>The mandate</div>
        <div style={{maxWidth:820}}>
          <p style={{fontFamily:t.fonts.display, fontWeight:t.fonts.displayWeight, fontSize:'clamp(32px, 4vw, 56px)', lineHeight:1.15, letterSpacing:t.fonts.displayTracking, fontFeatureSettings:t.fonts.displayFeatures}}>
            <span style={{color:t.colors.muted}}>The voice is not a brand asset. It is a clinical instrument.</span>{' '}
            Every word Arua publishes either lowers the psychological cost of a man taking action on his health,{' '}
            <span style={{color:t.colors.accent}}>or it raises it.</span>
          </p>
          <div style={{display:'flex', gap:32, marginTop:56, flexWrap:'wrap'}}>
            {['Clinical authority','Intelligent empathy','Warm directness','Quiet confidence'].map((v,i) => (
              <div key={v} style={{flex:'1 1 200px'}}>
                <Mono t={t} style={{color:t.colors.muted}}>{String(i+1).padStart(2,'0')}</Mono>
                <div style={{fontFamily:t.fonts.display, fontSize:22, fontWeight:t.fonts.displayWeight, marginTop:8, letterSpacing:t.fonts.displayTracking}}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TypeScale(p) {
  const t = p.t;
  const rows = [
    {label:'Display / 88', size:88, family:'display', lh:0.95, sample:'Get your edge back.', meta:'Hero only'},
    {label:'Display / 56', size:56, family:'display', lh:1.02, sample:'The easiest big decision a man can make.', meta:'Section openers'},
    {label:'H1 / 36', size:36, family:'display', lh:1.1, sample:'Testosterone: what actually happens.', meta:'Page titles'},
    {label:'H2 / 24', size:24, family:'display', lh:1.2, sample:'Why men delay seeing a doctor.', meta:'Section headings'},
    {label:'Lede / 19', size:19, family:'body', lh:1.5, sample:'Most men notice the shift somewhere between 35 and 45.', meta:'Article ledes'},
    {label:'Body / 16', size:16, family:'body', lh:1.62, sample:'Testosterone levels typically decline at roughly 1–2% per year.', meta:'All body copy'},
    {label:'Small / 14', size:14, family:'body', lh:1.5, sample:'A consultation takes about fifteen minutes.', meta:'Captions'},
    {label:'UI label / 11', size:11, family:'mono', lh:1.2, sample:'HORMONAL HEALTH', meta:'Tags, eyebrows', upper:true},
  ];
  return (
    <div>
      {rows.map((r,i) => (
        <div key={r.label} style={{display:'grid', gridTemplateColumns:'180px 1fr 200px', gap:32, padding:'24px 0', borderTop:i===0?'none':`1px solid ${t.colors.hairlineSoft}`, alignItems:'baseline'}}>
          <Mono t={t}>{r.label}</Mono>
          <div style={{fontFamily:r.family==='display'?t.fonts.display:r.family==='mono'?t.fonts.mono:t.fonts.body, fontSize:r.size, fontWeight:r.family==='display'?t.fonts.displayWeight:r.family==='mono'?500:400, letterSpacing:r.family==='display'?t.fonts.displayTracking:'0', lineHeight:r.lh, color:t.colors.ink, textTransform:r.upper?'uppercase':'none', fontFeatureSettings:r.family==='display'?t.fonts.displayFeatures:'normal'}}>{r.sample}</div>
          <div style={{fontFamily:t.fonts.body, fontSize:13, color:t.colors.muted}}>{r.meta}</div>
        </div>
      ))}
    </div>
  );
}

function Swatch(p) {
  const t = p.t;
  return (
    <div style={{background:p.value, color:p.dark?t.colors.page:t.colors.ink, aspectRatio:'4/3', padding:20, display:'flex', flexDirection:'column', justifyContent:'space-between', border:`1px solid ${t.colors.hairlineSoft}`}}>
      <div style={{fontFamily:t.fonts.body, fontSize:14, fontWeight:500}}>{p.name}</div>
      <Mono t={t} style={{color:t.colors.muted}}>{p.value}</Mono>
    </div>
  );
}

function Colors(p) {
  const t = p.t;
  const groups = [
    {label:'Surfaces', items:[['Page',t.colors.page,false],['Page alt',t.colors.pageAlt,false],['Surface',t.colors.surface,false],['Sage wash',t.colors.sage,false]]},
    {label:'Ink', items:[['Ink',t.colors.ink,true],['Ink soft',t.colors.inkSoft,true],['Muted',t.colors.muted,true],['Hairline',t.colors.hairline,false]]},
    {label:'Accent — used with restraint', items:[['Accent',t.colors.accent,true],['Accent deep',t.colors.accentDeep,true],['Sage deep',t.colors.sageDeep,true]]},
  ];
  return (
    <div>
      {groups.map((g,i) => (
        <div key={g.label} style={{marginTop:i===0?0:56}}>
          <Mono t={t}>{g.label}</Mono>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:0, marginTop:24}}>
            {g.items.map(([n,v,d]) => <Swatch key={n} t={t} name={n} value={v} dark={d} />)}
          </div>
        </div>
      ))}
    </div>
  );
}

function Spacing(p) {
  const t = p.t;
  const steps = [['4',4,'Label to content'],['8',8,'Icon to text'],['16',16,'Related elements'],['24',24,'Content blocks'],['48',48,'Major sections'],['64',64,'Page edges'],['96',96,'Surface separations'],['128',128,'Hero & breaks']];
  return (
    <div>
      {steps.map(([token,px,use],i) => (
        <div key={token} style={{display:'grid', gridTemplateColumns:'120px 1fr 200px', gap:32, padding:'20px 0', borderTop:i===0?'none':`1px solid ${t.colors.hairlineSoft}`, alignItems:'center'}}>
          <Mono t={t}>—{token}</Mono>
          <div style={{height:24, width:px*4, background:t.colors.accent, opacity:0.85}} />
          <div style={{fontFamily:t.fonts.body, fontSize:13, color:t.colors.muted}}>{use}</div>
        </div>
      ))}
    </div>
  );
}

function Radii(p) {
  const t = p.t;
  const items = [
    {token:t.radii.input, label:'Inputs', w:200, h:44},
    {token:t.radii.card, label:'Cards', w:160, h:100},
    {token:t.radii.tag, label:'Tags', w:120, h:28},
    {token:t.radii.cta, label:'CTAs', w:140, h:44},
  ];
  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:32}}>
      {items.map(r => (
        <div key={r.label}>
          <div style={{width:r.w, height:r.h, background:t.colors.surface, border:`1.5px solid ${t.colors.ink}`, borderRadius:r.token, marginBottom:16}} />
          <Mono t={t}>{r.token}</Mono>
          <div style={{fontFamily:t.fonts.body, fontSize:14, color:t.colors.ink, marginTop:4}}>{r.label}</div>
        </div>
      ))}
    </div>
  );
}

function Buttons(p) {
  const t = p.t;
  const items = [
    {v:'primary-ink', l:'Primary — Ink', s:'Default CTA on light surfaces'},
    {v:'primary-accent', l:'Primary — Caramel', s:'Conversion moments only'},
    {v:'primary-page', l:'Primary — Page', s:'On dark surfaces', dark:true},
    {v:'secondary', l:'Secondary', s:'Lower-stakes actions'},
    {v:'ghost', l:'Text link', s:'Inline, navigation'},
  ];
  return (
    <div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:24}}>
        {items.map(b => (
          <div key={b.v} style={{padding:'24px 24px 28px', background:b.dark?t.colors.ink:t.colors.surface, border:`1px solid ${t.colors.hairlineSoft}`, borderRadius:t.radii.card}}>
            <div style={{marginBottom:24, minHeight:44, display:'flex', alignItems:'center'}}>
              <Btn variant={b.v} t={t} icon={b.v==='ghost'} />
            </div>
            <Mono t={t}>{b.l}</Mono>
            <div style={{fontFamily:t.fonts.body, fontSize:13, color:b.dark?t.colors.page:t.colors.inkSoft, opacity:b.dark?0.8:1, marginTop:4}}>{b.s}</div>
          </div>
        ))}
      </div>
      <div style={{marginTop:32, padding:20, background:t.colors.pageAlt, borderRadius:t.radii.card}}>
        <Mono t={t}>CTA rule</Mono>
        <p style={{fontFamily:t.fonts.body, fontSize:14, color:t.colors.inkSoft, lineHeight:1.55, margin:'8px 0 0', maxWidth:720}}>
          All CTAs use full pill shape (radius {t.radii.cta}). Height 44 minimum. Copy is an invitation, never a command — &ldquo;Get started&rdquo;, never &ldquo;Book now&rdquo;. One primary CTA per view.
        </p>
      </div>
    </div>
  );
}

function Tags(p) {
  const t = p.t;
  return (
    <div style={{display:'flex', flexDirection:'column', gap:24}}>
      <div>
        <Mono t={t}>Category — sage default</Mono>
        <div style={{display:'flex', flexWrap:'wrap', gap:8, marginTop:12}}>
          {['Hormonal health','Sexual health','Hair loss','Sleep','Longevity','Weight','Skin'].map(c => <Tag key={c} t={t} variant="sage">{c}</Tag>)}
        </div>
      </div>
      <div>
        <Mono t={t}>Status</Mono>
        <div style={{display:'flex', flexWrap:'wrap', gap:8, marginTop:12}}>
          <Tag t={t} variant="ink">Active</Tag>
          <Tag t={t} variant="outline">Pending review</Tag>
          <Tag t={t} variant="outline">Treatment confirmed</Tag>
          <Tag t={t} variant="sand">8 min read</Tag>
          <Tag t={t} variant="sand">Clinically reviewed</Tag>
        </div>
      </div>
      <div>
        <Mono t={t}>Accent — conversion-critical only</Mono>
        <div style={{display:'flex', flexWrap:'wrap', gap:8, marginTop:12}}>
          <Tag t={t} variant="accent">Early access</Tag>
          <Tag t={t} variant="accent">New</Tag>
        </div>
      </div>
    </div>
  );
}

function Forms(p) {
  const t = p.t;
  const Field = ({state, label, value, error}) => {
    const base = {fontFamily:t.fonts.body, fontSize:16, padding:'14px 16px', background:t.colors.surface, color:t.colors.ink, borderRadius:t.radii.input, width:'100%', border:`1px solid ${t.colors.hairline}`, outline:'none'};
    const ss = {default:base, focused:{...base, border:`1.5px solid ${t.colors.ink}`, padding:'13.5px 15.5px'}, error:{...base, border:`1.5px solid ${t.colors.accentDeep}`, padding:'13.5px 15.5px'}, filled:{...base, background:t.colors.pageAlt}};
    return (
      <div>
        <div style={{fontFamily:t.fonts.body, fontSize:13, fontWeight:500, color:t.colors.inkSoft, marginBottom:8}}>{label}</div>
        <input readOnly value={value} style={ss[state]} />
        {error && <div style={{fontFamily:t.fonts.body, fontSize:13, color:t.colors.accentDeep, marginTop:6}}>{error}</div>}
        <Mono t={t} style={{marginTop:8, display:'block'}}>{state}</Mono>
      </div>
    );
  };
  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:24}}>
      <Field state="default" label="Email address" value="" />
      <Field state="focused" label="Email address" value="james@" />
      <Field state="filled" label="Email address" value="james.morrison@gmail.com" />
      <Field state="error" label="Email address" value="james@email" error="Please enter a valid email address." />
      <div>
        <div style={{fontFamily:t.fonts.body, fontSize:13, fontWeight:500, color:t.colors.inkSoft, marginBottom:8}}>Symptoms</div>
        <div style={{display:'flex', flexDirection:'column', gap:10}}>
          {[['Difficulty maintaining',true],['Reduced libido',true],['Performance anxiety',false]].map(([l,c]) => (
            <label key={l} style={{display:'flex', alignItems:'center', gap:12, fontFamily:t.fonts.body, fontSize:15, color:t.colors.ink}}>
              <span style={{width:20, height:20, borderRadius:4, border:`1.5px solid ${c?t.colors.ink:t.colors.hairline}`, background:c?t.colors.ink:'transparent', display:'flex', alignItems:'center', justifyContent:'center', color:t.colors.page, fontSize:12}}>{c?'✓':''}</span>
              {l}
            </label>
          ))}
        </div>
        <Mono t={t} style={{marginTop:12, display:'block'}}>checkbox group</Mono>
      </div>
      <div>
        <div style={{fontFamily:t.fonts.body, fontSize:13, fontWeight:500, color:t.colors.inkSoft, marginBottom:8}}>Duration</div>
        <div style={{display:'flex', flexDirection:'column', gap:10}}>
          {[['Less than 6 months',false],['6–12 months',true],['More than a year',false]].map(([l,c]) => (
            <label key={l} style={{display:'flex', alignItems:'center', gap:12, fontFamily:t.fonts.body, fontSize:15, color:t.colors.ink}}>
              <span style={{width:20, height:20, borderRadius:'50%', border:`1.5px solid ${c?t.colors.ink:t.colors.hairline}`, display:'flex', alignItems:'center', justifyContent:'center'}}>
                {c && <span style={{width:10, height:10, borderRadius:'50%', background:t.colors.ink}} />}
              </span>
              {l}
            </label>
          ))}
        </div>
        <Mono t={t} style={{marginTop:12, display:'block'}}>radio group</Mono>
      </div>
    </div>
  );
}

function Nav(p) {
  const t = p.t;
  const dark = p.dark;
  const bg = dark?t.colors.ink:t.colors.page;
  const fg = dark?t.colors.page:t.colors.ink;
  return (
    <div style={{background:bg, padding:'20px 32px', display:'flex', justifyContent:'space-between', alignItems:'center', borderRadius:t.radii.card, border:`1px solid ${t.colors.hairlineSoft}`}}>
      <div style={{fontFamily:t.fonts.display, fontWeight:t.fonts.displayWeight, fontSize:24, letterSpacing:t.fonts.displayTracking, color:fg}}>arua</div>
      <div style={{display:'flex', alignItems:'center', gap:32}}>
        {['Conditions','How it works','Library','About'].map(l => <span key={l} style={{fontFamily:t.fonts.body, fontSize:14, color:fg}}>{l}</span>)}
        <button style={{fontFamily:t.fonts.body, fontSize:14, fontWeight:500, padding:'10px 20px', borderRadius:t.radii.cta, border:'none', background:dark?t.colors.page:t.colors.ink, color:dark?t.colors.ink:t.colors.page, cursor:'pointer'}}>Get started</button>
      </div>
    </div>
  );
}

function Cards(p) {
  const t = p.t;
  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:24}}>
      <div className="card-hover" style={{background:t.colors.surface, border:`1px solid ${t.colors.hairlineSoft}`, borderRadius:t.radii.card, overflow:'hidden'}}>
        <Photo t={t} ratio="3/2" label="man, morning, warm light" hint="side-on / candid" />
        <div style={{padding:24}}>
          <Tag t={t} variant="sage">Hormonal health</Tag>
          <h3 style={{fontFamily:t.fonts.display, fontSize:22, fontWeight:t.fonts.displayWeight, letterSpacing:'-0.02em', lineHeight:1.2, color:t.colors.ink, margin:'16px 0 12px'}}>Testosterone decline: what actually happens.</h3>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <Mono t={t}>8 min read</Mono>
            <span style={{fontFamily:t.fonts.body, fontSize:14, color:t.colors.ink}}>Read →</span>
          </div>
        </div>
      </div>
      <ConditionTile t={t} fill eyebrow="Sexual health" title="Erectile dysfunction" body="Private online assessment. Evidence-based treatment. Plain packaging." />
      <ConditionTile t={t} eyebrow="Hair loss" title="Hair loss" body="Clinician-prescribed Minoxidil and Finasteride. Managed repeats." />
      <StatusCard t={t} />
      <div style={{gridColumn:'span 2'}}><PullQuote t={t} /></div>
    </div>
  );
}

function ConditionTile(p) {
  const t = p.t;
  const fill = p.fill;
  return (
    <div className="card-hover" style={{background:fill?t.colors.accent:t.colors.surface, color:fill?t.colors.accentInk:t.colors.ink, border:fill?'none':`1px solid ${t.colors.hairlineSoft}`, borderRadius:t.radii.card, padding:32, display:'flex', flexDirection:'column', justifyContent:'space-between', minHeight:280}}>
      <div>
        <Mono t={t} style={{color:fill?'rgba(255,255,255,0.8)':t.colors.muted}}>{p.eyebrow}</Mono>
        <h3 style={{fontFamily:t.fonts.display, fontSize:32, fontWeight:t.fonts.displayWeight, letterSpacing:t.fonts.displayTracking, lineHeight:1.05, margin:'12px 0 16px'}}>{p.title}</h3>
        <p style={{fontFamily:t.fonts.body, fontSize:15, lineHeight:1.55, opacity:fill?0.9:1, color:fill?t.colors.accentInk:t.colors.inkSoft, margin:0}}>{p.body}</p>
      </div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:32}}>
        <span style={{fontFamily:t.fonts.body, fontSize:14, fontWeight:500}}>Learn more</span>
        <span style={{fontSize:18}}>→</span>
      </div>
    </div>
  );
}

function StatusCard(p) {
  const t = p.t;
  return (
    <div style={{background:t.colors.surface, border:`1px solid ${t.colors.hairlineSoft}`, borderRadius:t.radii.card, padding:28}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
        <Tag t={t} variant="ink">Active treatment</Tag>
        <Mono t={t}>Updated 12 Mar</Mono>
      </div>
      <h3 style={{fontFamily:t.fonts.display, fontSize:26, fontWeight:t.fonts.displayWeight, letterSpacing:t.fonts.displayTracking, margin:'20px 0 6px', color:t.colors.ink}}>Erectile dysfunction</h3>
      <div style={{fontFamily:t.fonts.body, fontSize:14, color:t.colors.inkSoft, marginBottom:24}}>Sildenafil 50mg · Monthly</div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:20, borderTop:`1px solid ${t.colors.hairlineSoft}`}}>
        <div>
          <Mono t={t}>Next delivery</Mono>
          <div style={{fontFamily:t.fonts.body, fontSize:16, color:t.colors.ink, marginTop:4}}>14 Apr 2026</div>
        </div>
        <button style={{fontFamily:t.fonts.body, fontSize:14, fontWeight:500, padding:'8px 16px', borderRadius:t.radii.cta, border:`1px solid ${t.colors.ink}`, background:'transparent', color:t.colors.ink, cursor:'pointer'}}>View plan</button>
      </div>
    </div>
  );
}

function PullQuote(p) {
  const t = p.t;
  return (
    <div style={{padding:'32px 36px', borderLeft:`2px solid ${t.colors.accent}`, background:t.colors.pageAlt, borderRadius:`0 ${t.radii.card} ${t.radii.card} 0`}}>
      <p style={{fontFamily:t.fonts.display, fontWeight:t.fonts.displayWeight, fontSize:24, lineHeight:1.3, letterSpacing:'-0.02em', color:t.colors.ink, fontStyle:'italic'}}>
        Most men assume fatigue and reduced drive are part of getting older. For many, they are symptoms.
      </p>
      <Mono t={t} style={{marginTop:16, display:'block'}}>Pull quote — editorial callout</Mono>
    </div>
  );
}

function Hero(p) {
  const t = p.t;
  return (
    <div style={{background:t.colors.page, border:`1px solid ${t.colors.hairline}`, borderRadius:t.radii.card, overflow:'hidden'}}>
      <div style={{padding:'20px 32px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:`1px solid ${t.colors.hairlineSoft}`}}>
        <div style={{fontFamily:t.fonts.display, fontWeight:t.fonts.displayWeight, fontSize:22, letterSpacing:t.fonts.displayTracking, color:t.colors.ink}}>arua</div>
        <div style={{display:'flex', gap:28, alignItems:'center'}}>
          {['Conditions','How it works','Library','About'].map(l => <span key={l} style={{fontFamily:t.fonts.body, fontSize:13, color:t.colors.inkSoft}}>{l}</span>)}
          <button style={{fontFamily:t.fonts.body, fontSize:13, fontWeight:500, padding:'8px 16px', borderRadius:t.radii.cta, border:'none', background:t.colors.ink, color:t.colors.page, cursor:'pointer'}}>Get started</button>
        </div>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:0}}>
        <div style={{padding:'80px 64px 88px'}}>
          <Mono t={t}>Men&rsquo;s health · New Zealand</Mono>
          <h1 style={{fontFamily:t.fonts.display, fontWeight:t.fonts.displayWeight, fontSize:'clamp(48px, 5.6vw, 84px)', lineHeight:0.96, letterSpacing:t.fonts.displayTracking, color:t.colors.ink, margin:'24px 0 28px', fontFeatureSettings:t.fonts.displayFeatures}}>
            The easiest big decision a man can make.
          </h1>
          <p style={{fontFamily:t.fonts.body, fontSize:18, lineHeight:1.5, color:t.colors.inkSoft, maxWidth:460, margin:'0 0 36px'}}>
            Private. Direct. No waiting room. A NZ-registered clinician reviews your case and handles everything from there.
          </p>
          <div style={{display:'flex', gap:12, alignItems:'center'}}>
            <Btn variant="primary-ink" t={t}>Get started</Btn>
            <Btn variant="ghost" t={t} icon>How it works</Btn>
          </div>
          <div style={{display:'flex', gap:48, marginTop:56, paddingTop:28, borderTop:`1px solid ${t.colors.hairlineSoft}`}}>
            {[['48hr','to your door'],['100%','private, always'],['NZ','registered clinicians']].map(([n,l]) => (
              <div key={n}>
                <div style={{fontFamily:t.fonts.display, fontWeight:t.fonts.displayWeight, fontSize:32, letterSpacing:t.fonts.displayTracking, color:t.colors.ink, lineHeight:1}}>{n}</div>
                <Mono t={t} style={{marginTop:8, display:'block'}}>{l}</Mono>
              </div>
            ))}
          </div>
        </div>
        <div style={{padding:24, background:t.colors.pageAlt}}>
          <Photo t={t} ratio="3/4" label="warm NZ morning light" hint="ambient male presence · no eye contact" />
        </div>
      </div>
    </div>
  );
}

function ConditionsGrid(p) {
  const t = p.t;
  const items = [
    {e:'Sexual health', tt:'Erectile dysfunction', b:'Private online assessment. Evidence-based treatment.', fill:true},
    {e:'Hair loss', tt:'Hair loss', b:'Clinician-prescribed Minoxidil and Finasteride.'},
    {e:'Hormonal health', tt:'Testosterone', b:'Understand your levels. Know when to act.'},
    {e:'Sleep', tt:'Sleep disorders', b:'Address the root causes.'},
    {e:'Weight', tt:'Weight management', b:'Evidence-based clinical support.'},
    {e:'Skin', tt:'Skin health', b:'Targeted treatment. No GP referral needed.'},
  ];
  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:16}}>
      {items.map(c => <ConditionTile key={c.tt} t={t} eyebrow={c.e} title={c.tt} body={c.b} fill={c.fill} />)}
    </div>
  );
}

function MobileFrame(p) {
  const t = p.t;
  return (
    <div style={{width:390, background:t.colors.surface, border:`8px solid ${t.colors.ink}`, borderRadius:36, overflow:'hidden', boxShadow:`0 24px 60px -24px rgba(0,0,0,0.25)`}}>
      <div style={{background:t.colors.page, padding:'60px 24px 24px'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{fontFamily:t.fonts.display, fontWeight:t.fonts.displayWeight, fontSize:22, letterSpacing:t.fonts.displayTracking, color:t.colors.ink}}>arua</div>
          <div style={{width:24, height:14}}>
            <div style={{height:1.5, background:t.colors.ink, marginTop:4}} />
            <div style={{height:1.5, background:t.colors.ink, marginTop:5}} />
          </div>
        </div>
        <Mono t={t} style={{marginTop:32, display:'block'}}>Men&rsquo;s health · NZ</Mono>
        <h1 style={{fontFamily:t.fonts.display, fontWeight:t.fonts.displayWeight, fontSize:44, lineHeight:0.98, letterSpacing:t.fonts.displayTracking, color:t.colors.ink, margin:'16px 0 16px', fontFeatureSettings:t.fonts.displayFeatures}}>The easiest big decision a man can make.</h1>
        <p style={{fontFamily:t.fonts.body, fontSize:15, lineHeight:1.5, color:t.colors.inkSoft, margin:'0 0 24px'}}>Private. Direct. No waiting room.</p>
        <div style={{display:'flex', flexDirection:'column', gap:8}}>
          <button style={{fontFamily:t.fonts.body, fontSize:15, fontWeight:500, padding:'14px 24px', borderRadius:t.radii.cta, border:'none', background:t.colors.ink, color:t.colors.page, cursor:'pointer'}}>Get started</button>
          <button style={{fontFamily:t.fonts.body, fontSize:15, fontWeight:500, padding:'13px 24px', borderRadius:t.radii.cta, border:`1px solid ${t.colors.ink}`, background:'transparent', color:t.colors.ink, cursor:'pointer'}}>How it works</button>
        </div>
      </div>
      <div style={{padding:16, background:t.colors.pageAlt}}>
        <Photo t={t} ratio="4/5" label="warm NZ morning" hint="ambient male presence" />
      </div>
      <div style={{padding:'24px 24px 32px', background:t.colors.surface}}>
        <Mono t={t}>Conditions we treat</Mono>
        <div style={{display:'flex', flexDirection:'column', gap:0, marginTop:12}}>
          {['Erectile dysfunction','Hair loss','Testosterone','Sleep disorders'].map(c => (
            <div key={c} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 0', borderTop:`1px solid ${t.colors.hairlineSoft}`, fontFamily:t.fonts.body, fontSize:16, color:t.colors.ink}}>
              <span>{c}</span><span style={{color:t.colors.muted}}>→</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  const t = DIRECTIONS[tweaks.direction] || DIRECTIONS.editorial;

  React.useEffect(() => {
    document.body.style.background = t.colors.page;
    document.body.style.color = t.colors.ink;
    document.body.style.fontFamily = t.fonts.body;
  }, [t]);

  return (
    <div style={{background:t.colors.page, color:t.colors.ink, minHeight:'100vh'}} data-screen-label={`Arua System — ${t.name}`}>
      <Cover t={t} />
      <Manifesto t={t} />
      <Section t={t} eyebrow="01 / Foundations · Type" title="A type system tuned for plain speech." sub="Display sets the editorial register. Body is built for long-form clinical reading. Mono carries metadata — never copy."><TypeScale t={t} /></Section>
      <Section t={t} eyebrow="02 / Foundations · Colour" title="Bone, ink, and a single accent." sub="Three surfaces, three inks, one caramel. Anything more is decoration — and decoration raises friction."><Colors t={t} /></Section>
      <Section t={t} eyebrow="03 / Foundations · Spacing & radius" title="A scale you don't have to think about." sub="Eight spacing steps, four radius tokens. Pill CTAs are the single most important consumer signal — never compromised.">
        <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:64}}>
          <Spacing t={t} />
          <div><Mono t={t}>Border radius</Mono><div style={{marginTop:24}}><Radii t={t} /></div></div>
        </div>
      </Section>
      <Section t={t} eyebrow="04 / Primitives · Buttons" title="Invitations, not commands." sub="One primary action per view. Caramel reserved for the conversion moment."><Buttons t={t} /></Section>
      <Section t={t} eyebrow="05 / Primitives · Tags & status" title="Labels do labelling. Tags never act." sub="Sage for category. Ink for active. Outline for ambient. Accent only when the user must notice."><Tags t={t} /></Section>
      <Section t={t} eyebrow="06 / Primitives · Form elements" title="Inputs that disappear when they're being used." sub="Default is hairline. Focus is ink. Error is restrained."><Forms t={t} /></Section>
      <Section t={t} eyebrow="07 / Patterns · Navigation" title="Light and dark, same posture." sub="Wordmark at display weight. Items spaced at 32. CTA always pill.">
        <div style={{display:'flex', flexDirection:'column', gap:24}}>
          <div><Mono t={t}>Light — page background</Mono><div style={{marginTop:12}}><Nav t={t} /></div></div>
          <div><Mono t={t}>Dark — ink background</Mono><div style={{marginTop:12}}><Nav t={t} dark /></div></div>
        </div>
      </Section>
      <Section t={t} eyebrow="08 / Patterns · Cards" title="Editorial and clinical, in the same room." sub="Article cards lead with photo. Condition cards are typographic. Status cards are quietly reassuring."><Cards t={t} /></Section>
      <section style={{padding:'88px 64px', borderTop:`1px solid ${t.colors.hairline}`, background:t.colors.pageAlt}}>
        <div style={{maxWidth:1280, margin:'0 auto'}}>
          <div style={{display:'grid', gridTemplateColumns:'220px 1fr', gap:48, marginBottom:56}}>
            <Eyebrow t={t}>09 / Voice in context · Homepage</Eyebrow>
            <div>
              <h2 style={{fontFamily:t.fonts.display, fontWeight:t.fonts.displayWeight, fontSize:44, lineHeight:1.05, letterSpacing:t.fonts.displayTracking, color:t.colors.ink, fontFeatureSettings:t.fonts.displayFeatures}}>The whole system, in one frame.</h2>
              <p style={{fontFamily:t.fonts.body, fontSize:16, lineHeight:1.55, color:t.colors.inkSoft, margin:'14px 0 0', maxWidth:560}}>A live preview using the current direction. Type, colour, spacing, components — all in concert.</p>
            </div>
          </div>
          <Hero t={t} />
        </div>
      </section>
      <Section t={t} eyebrow="10 / Voice in context · Conditions" title="The conditions grid." sub="A typographic grid. One tile carries the accent — that's the entry point with the highest intent."><ConditionsGrid t={t} /></Section>
      <Section t={t} eyebrow="11 / Voice in context · Mobile" title="Same posture, smaller frame." sub="The system holds at 390. Display drops to 44. CTAs stay pill."><div style={{display:'flex', justifyContent:'center'}}><MobileFrame t={t} /></div></Section>
      <footer style={{padding:64, background:t.colors.ink, color:t.colors.page}}>
        <div style={{maxWidth:1280, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:32}}>
          <div>
            <div style={{fontFamily:t.fonts.display, fontWeight:t.fonts.displayWeight, fontSize:56, letterSpacing:t.fonts.displayTracking, lineHeight:1}}>arua</div>
            <Mono t={t} style={{marginTop:16, display:'block', color:t.colors.muted}}>Design system · v0.2 · {t.name}</Mono>
          </div>
          <div style={{maxWidth:360}}>
            <p style={{fontFamily:t.fonts.body, fontSize:14, lineHeight:1.55, color:t.colors.page, opacity:0.75, margin:0}}>The voice is not a brand asset. It is a clinical instrument. Every word and pixel either lowers the psychological cost of a man taking action on his health, or it raises it.</p>
          </div>
        </div>
      </footer>
      <window.TweaksPanel title="Tweaks">
        <window.TweakSection label="Direction" />
        <window.TweakRadio label="Variant" value={tweaks.direction} options={[{value:'editorial', label:'Editorial'},{value:'clinical', label:'Clinical'},{value:'warm', label:'Warm'}]} onChange={v => setTweak('direction', v)} />
        <div style={{padding:'0 2px 6px', fontSize:11, color:'#7a7363', lineHeight:1.5}}>{DIRECTIONS[tweaks.direction].tagline}</div>
      </window.TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
