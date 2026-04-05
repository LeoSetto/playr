// App.jsx — Playr v4: Mobile-first Career Mode Tracker
import React,{useState,useEffect,useCallback,useMemo,useRef} from 'react';
import {useAuth} from './AuthProvider.jsx';

/* ─── i18n ─── */
const L={
'pt-BR':{
  dash:'Painel',mgr:'Treinador',plr:'Jogador',cfg:'Config',saves:'Saves',out:'Sair',
  hi:'Olá',svs:'Saves',ssns:'Temporadas',trps:'Troféus',mtcs:'Partidas',
  actions:'Ações Rápidas',newMgr:'Novo Treinador',newPlr:'Novo Jogador',noSave:'Nenhum save. Crie um!',
  mgrInfo:'Info Treinador',mgrName:'Nome',mgrAge:'Idade',team:'Time',league:'Liga',nat:'Nacionalidade',
  ssn:'Temporada',squad:'Elenco',trans:'Transferências',match:'Partidas',trophy:'Troféus',
  hist:'Histórico',clubs:'Clubes',youth:'Base',fin:'Finanças',notes:'Obs.',
  plrName:'Nome',pos:'Posição',ovr:'OVR',pot:'POT',age:'Idade',val:'Valor',wage:'Salário',
  contract:'Contrato',loan:'Emp.',role:'Função',status:'Status',foot:'Pé',sm:'Dribles',wf:'Pé Fraco',
  wr:'Ritmo',morale:'Moral',dev:'Desenv.',height:'Altura',weight:'Peso',jersey:'Nº',
  add:'Adicionar',save:'Salvar',cancel:'Cancelar',edit:'Editar',del:'Excluir',search:'Buscar',
  none:'Nenhum',name:'Nome',
  addPlayer:'+ Jogador',addTrans:'+ Transf.',addMatch:'+ Partida',addTrophy:'+ Troféu',
  endSsn:'Encerrar Temp.',chgTeam:'Mudar Time',addYouth:'+ Jovem',
  win:'V',draw:'E',loss:'D',played:'J',goals:'Gols',assists:'Assist.',rating:'Nota',
  opponent:'Adversário',score:'Placar',comp:'Competição',scorers:'Goleadores',motm:'MEC',
  homeAway:'Casa/Fora',home:'Casa',away:'Fora',
  from:'De',to:'Para',fee:'Valor',type:'Tipo',
  trophyName:'Troféu',leaguePos:'Posição',topScorer:'Artilheiro',bestSign:'Melhor Contr.',
  reason:'Motivo',hired:'Contratado',resigned:'Demitiu-se',fired:'Demitido',
  transBudget:'Orç. Transf.',wageBudget:'Folha Sal.',
  scoutRegion:'Região',
  lang:'Idioma',accentColor:'Cor',currency:'Moeda',saveCfg:'Salvar Config',
  createSave:'Criar Save',saveName:'Nome',gameVer:'Versão',careerType:'Tipo',load:'Carregar',
  players:'Jogadores',starters:'Titulares',avgOvr:'OVR Médio',avgAge:'Idade Média',
  sqVal:'Valor Elenco',totWage:'Folha Sal.',cards:'Cards',table:'Tabela',all:'Todos',
  editPlayer:'Editar',rmPlayer:'Remover',playstyles:'PlayStyles',
  overall:'Overall',potential:'Potencial',appearances:'Jogos',archetype:'Arquétipo',
  // Status
  stStarter:'Titular',stSub:'Reserva',stRes:'Banco',stLoan:'Emprestável',stSale:'À Venda',stYouth:'Jovem',
  mEcstatic:'Radiante',mHappy:'Feliz',mContent:'OK',mUnhappy:'Infeliz',mFurious:'Furioso',
  dpBal:'Equilibrado',dpDef:'Defesa',dpPhy:'Físico',dpAtt:'Ataque',dpPlay:'Criação',dpGk:'Goleiro',dpNone:'—',
  wrH:'Alto',wrM:'Médio',wrL:'Baixo',fR:'Direito',fL:'Esquerdo',fB:'Ambos',
  customComp:'Competições Custom.',customTrophy:'Troféus Custom.',dataManage:'Dados',
  exportData:'Exportar',importData:'Importar',
},
'en':{
  dash:'Dashboard',mgr:'Manager',plr:'Player',cfg:'Settings',saves:'Saves',out:'Sign Out',
  hi:'Hello',svs:'Saves',ssns:'Seasons',trps:'Trophies',mtcs:'Matches',
  actions:'Quick Actions',newMgr:'New Manager',newPlr:'New Player',noSave:'No saves yet!',
  mgrInfo:'Manager Info',mgrName:'Name',mgrAge:'Age',team:'Team',league:'League',nat:'Nationality',
  ssn:'Season',squad:'Squad',trans:'Transfers',match:'Matches',trophy:'Trophies',
  hist:'History',clubs:'Clubs',youth:'Youth',fin:'Finances',notes:'Notes',
  plrName:'Name',pos:'Position',ovr:'OVR',pot:'POT',age:'Age',val:'Value',wage:'Wage',
  contract:'Contract',loan:'Loan',role:'Role',status:'Status',foot:'Foot',sm:'SM',wf:'WF',
  wr:'Work Rate',morale:'Morale',dev:'Dev Plan',height:'Height',weight:'Weight',jersey:'#',
  add:'Add',save:'Save',cancel:'Cancel',edit:'Edit',del:'Delete',search:'Search',
  none:'None',name:'Name',
  addPlayer:'+ Player',addTrans:'+ Transfer',addMatch:'+ Match',addTrophy:'+ Trophy',
  endSsn:'End Season',chgTeam:'Change Team',addYouth:'+ Youth',
  win:'W',draw:'D',loss:'L',played:'P',goals:'Goals',assists:'Assists',rating:'Rating',
  opponent:'Opponent',score:'Score',comp:'Competition',scorers:'Scorers',motm:'MOTM',
  homeAway:'Home/Away',home:'Home',away:'Away',
  from:'From',to:'To',fee:'Fee',type:'Type',
  trophyName:'Trophy',leaguePos:'Position',topScorer:'Top Scorer',bestSign:'Best Signing',
  reason:'Reason',hired:'Hired',resigned:'Resigned',fired:'Fired',
  transBudget:'Transfer Budget',wageBudget:'Wage Budget',
  scoutRegion:'Region',
  lang:'Language',accentColor:'Color',currency:'Currency',saveCfg:'Save Settings',
  createSave:'Create Save',saveName:'Name',gameVer:'Version',careerType:'Type',load:'Load',
  players:'Players',starters:'Starters',avgOvr:'Avg OVR',avgAge:'Avg Age',
  sqVal:'Squad Value',totWage:'Total Wages',cards:'Cards',table:'Table',all:'All',
  editPlayer:'Edit',rmPlayer:'Remove',playstyles:'PlayStyles',
  overall:'Overall',potential:'Potential',appearances:'Apps',archetype:'Archetype',
  stStarter:'Starter',stSub:'Sub',stRes:'Reserve',stLoan:'Loan List',stSale:'Transfer List',stYouth:'Youth',
  mEcstatic:'Ecstatic',mHappy:'Happy',mContent:'Content',mUnhappy:'Unhappy',mFurious:'Furious',
  dpBal:'Balanced',dpDef:'Defending',dpPhy:'Physical',dpAtt:'Attacking',dpPlay:'Playmaking',dpGk:'GK',dpNone:'—',
  wrH:'High',wrM:'Med',wrL:'Low',fR:'Right',fL:'Left',fB:'Both',
  customComp:'Custom Competitions',customTrophy:'Custom Trophies',dataManage:'Data',
  exportData:'Export',importData:'Import',
},
'es':{
  dash:'Panel',mgr:'Entrenador',plr:'Jugador',cfg:'Config',saves:'Guardados',out:'Salir',
  hi:'Hola',svs:'Guardados',ssns:'Temporadas',trps:'Trofeos',mtcs:'Partidos',
  actions:'Acciones',newMgr:'Nuevo Entrenador',newPlr:'Nuevo Jugador',noSave:'¡Sin guardados!',
  mgrInfo:'Info Entrenador',mgrName:'Nombre',mgrAge:'Edad',team:'Equipo',league:'Liga',nat:'Nacionalidad',
  ssn:'Temporada',squad:'Plantilla',trans:'Fichajes',match:'Partidos',trophy:'Trofeos',
  hist:'Historial',clubs:'Equipos',youth:'Cantera',fin:'Finanzas',notes:'Notas',
  plrName:'Nombre',pos:'Posición',ovr:'OVR',pot:'POT',age:'Edad',val:'Valor',wage:'Salario',
  contract:'Contrato',loan:'Cesión',role:'Rol',status:'Estado',foot:'Pie',sm:'Regates',wf:'Pie Malo',
  wr:'Ritmo',morale:'Moral',dev:'Desarrollo',height:'Altura',weight:'Peso',jersey:'Nº',
  add:'Añadir',save:'Guardar',cancel:'Cancelar',edit:'Editar',del:'Eliminar',search:'Buscar',
  none:'Ninguno',name:'Nombre',
  addPlayer:'+ Jugador',addTrans:'+ Fichaje',addMatch:'+ Partido',addTrophy:'+ Trofeo',
  endSsn:'Fin Temp.',chgTeam:'Cambiar Equipo',addYouth:'+ Joven',
  win:'V',draw:'E',loss:'D',played:'J',goals:'Goles',assists:'Asist.',rating:'Nota',
  opponent:'Rival',score:'Marcador',comp:'Competición',scorers:'Goleadores',motm:'MVP',
  homeAway:'Local/Visitante',home:'Local',away:'Visitante',
  from:'De',to:'A',fee:'Precio',type:'Tipo',
  trophyName:'Trofeo',leaguePos:'Posición',topScorer:'Goleador',bestSign:'Mejor Fichaje',
  reason:'Motivo',hired:'Contratado',resigned:'Renunció',fired:'Despedido',
  transBudget:'Pres. Fichajes',wageBudget:'Masa Salarial',
  scoutRegion:'Región',
  lang:'Idioma',accentColor:'Color',currency:'Moneda',saveCfg:'Guardar',
  createSave:'Crear',saveName:'Nombre',gameVer:'Versión',careerType:'Tipo',load:'Cargar',
  players:'Jugadores',starters:'Titulares',avgOvr:'OVR Medio',avgAge:'Edad Media',
  sqVal:'Valor Plantilla',totWage:'Masa Salarial',cards:'Tarjetas',table:'Tabla',all:'Todos',
  editPlayer:'Editar',rmPlayer:'Eliminar',playstyles:'PlayStyles',
  overall:'Overall',potential:'Potencial',appearances:'Partidos',archetype:'Arquetipo',
  stStarter:'Titular',stSub:'Suplente',stRes:'Reserva',stLoan:'Cesión',stSale:'En Venta',stYouth:'Juvenil',
  mEcstatic:'Eufórico',mHappy:'Feliz',mContent:'Normal',mUnhappy:'Infeliz',mFurious:'Furioso',
  dpBal:'Equilibrado',dpDef:'Defensa',dpPhy:'Físico',dpAtt:'Ataque',dpPlay:'Creación',dpGk:'Portero',dpNone:'—',
  wrH:'Alto',wrM:'Medio',wrL:'Bajo',fR:'Derecho',fL:'Izquierdo',fB:'Ambos',
  customComp:'Comp. Personalizadas',customTrophy:'Trofeos Person.',dataManage:'Datos',
  exportData:'Exportar',importData:'Importar',
}};

/* ─── Constants ─── */
const POS=['GK','CB','LB','RB','LWB','RWB','CDM','CM','CAM','LM','RM','LW','RW','ST','CF','LF','RF'];
const ROLES=['','Advanced Forward','Poacher','Target Forward','False 9','Inside Forward','Classic Winger','Shadow Striker','Playmaker','Box-to-Box','Holding','Deep-Lying Playmaker','Fullback','Ball-Playing Defender','Stopper','Sweeper Keeper'];
const COMPS=['League','Champions League','Europa League','Conference League','FA Cup','League Cup','Super Cup','Domestic Cup','Other'];
const TTYPES=['League Title','Champions League','Europa League','FA Cup','League Cup','Super Cup','Golden Boot','Golden Glove','Other'];
const REGIONS=['South America','Europe','Africa','Asia','North America','Oceania'];
const uid=()=>Date.now().toString(36)+Math.random().toString(36).substr(2,5);
const fmt=(v,c='EUR')=>{const n=Number(v)||0,s={EUR:'€',GBP:'£',USD:'$',BRL:'R$',ARS:'$',MXN:'$',JPY:'¥',TRY:'₺'}[c]||'€';return n>=1e6?`${s}${(n/1e6).toFixed(1)}M`:n>=1e3?`${s}${(n/1e3).toFixed(0)}K`:`${s}${n}`;};
const stOpts=t=>[{v:'Starter',l:t.stStarter},{v:'Substitute',l:t.stSub},{v:'Reserve',l:t.stRes},{v:'Loan Listed',l:t.stLoan},{v:'Transfer Listed',l:t.stSale},{v:'Youth',l:t.stYouth}];
const stLbl=(v,t)=>(stOpts(t).find(x=>x.v===v)||{}).l||v;
const mOpts=t=>[{v:'Ecstatic',l:t.mEcstatic},{v:'Happy',l:t.mHappy},{v:'Content',l:t.mContent},{v:'Unhappy',l:t.mUnhappy},{v:'Furious',l:t.mFurious}];
const dOpts=t=>[{v:'Balanced',l:t.dpBal},{v:'Defending',l:t.dpDef},{v:'Physical',l:t.dpPhy},{v:'Attacking',l:t.dpAtt},{v:'Playmaking',l:t.dpPlay},{v:'Goalkeeping',l:t.dpGk},{v:'None',l:t.dpNone}];
const fOpts=t=>[{v:'Right',l:t.fR},{v:'Left',l:t.fL},{v:'Both',l:t.fB}];
const wrList=t=>[`${t.wrH}/${t.wrH}`,`${t.wrH}/${t.wrM}`,`${t.wrH}/${t.wrL}`,`${t.wrM}/${t.wrH}`,`${t.wrM}/${t.wrM}`,`${t.wrM}/${t.wrL}`,`${t.wrL}/${t.wrH}`,`${t.wrL}/${t.wrM}`,`${t.wrL}/${t.wrL}`];

/* ─── Logo: shield + soccer ball pentagon ─── */
const Logo=({s=24,c='#00e5ff'})=><svg width={s} height={s} viewBox="0 0 48 48" fill="none"><path d="M24 3L43 13v16q0 12-19 16Q5 41 5 29V13z" fill={c} opacity=".08" stroke={c} strokeWidth="1.5"/><path d="M24 15l6 4.5-2.3 7h-7.4L18 19.5z" fill={c} opacity=".25"/><path d="M24 15v-4M30 19.5l3.5-1.5M27.7 26.5l1.5 3.5M20.3 26.5l-1.5 3.5M18 19.5l-3.5-1.5" stroke={c} strokeWidth="1" opacity=".2"/></svg>;

/* ─── Helpers ─── */
function DF({value,onSave,style,type='text',placeholder='',ac='#00e5ff'}){
  const[v,setV]=useState(value??'');const r=useRef(null);
  useEffect(()=>{setV(value??'')},[value]);
  return <input ref={r} style={style} type={type} placeholder={placeholder} value={v}
    onChange={e=>setV(e.target.value)}
    onBlur={e=>{const o=type==='number'?Number(e.target.value):e.target.value;if(o!==value)onSave(o);e.target.style.borderColor='rgba(255,255,255,0.06)';}}
    onFocus={e=>e.target.style.borderColor=ac+'60'}
    onKeyDown={e=>{if(e.key==='Enter')r.current?.blur();}}/>;
}
function DA({value,onSave,style,ac='#00e5ff'}){
  const[v,setV]=useState(value??'');useEffect(()=>{setV(value??'')},[value]);
  return <textarea style={style} value={v} onChange={e=>setV(e.target.value)}
    onBlur={e=>{if(e.target.value!==value)onSave(e.target.value);e.target.style.borderColor='rgba(255,255,255,0.06)';}}
    onFocus={e=>e.target.style.borderColor=ac+'60'}/>;
}
function Mdl({show,onClose,title,children,bg='#0c1019'}){
  if(!show)return null;
  return <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.7)',backdropFilter:'blur(8px)',zIndex:1000,display:'flex',alignItems:'flex-end',justifyContent:'center',padding:0}} onClick={onClose}>
    <div style={{background:bg,borderRadius:'20px 20px 0 0',padding:'20px 18px 28px',width:'100%',maxWidth:540,maxHeight:'88vh',overflowY:'auto',animation:'slideUp .25s ease'}} onClick={e=>e.stopPropagation()}>
      <div style={{width:36,height:4,borderRadius:2,background:'rgba(255,255,255,.12)',margin:'0 auto 14px'}}/>
      <div style={{fontSize:16,fontWeight:700,marginBottom:16,fontFamily:"'DM Sans',sans-serif"}}>{title}</div>
      {children}
    </div>
  </div>;
}

/* ─── Styles ─── */
const S=(ac='#00e5ff')=>{
  const b='#080c14',cd='rgba(12,16,26,.92)',sf='rgba(255,255,255,.03)',bd='rgba(255,255,255,.06)',
    c1='#e4e7ed',c2='rgba(255,255,255,.42)',c3='rgba(255,255,255,.18)';
  const inp={width:'100%',padding:'12px 14px',borderRadius:10,background:sf,border:`1px solid ${bd}`,color:'#fff',fontSize:14,fontFamily:"'DM Sans',sans-serif",outline:'none',boxSizing:'border-box',transition:'border .15s'};
  const sel={...inp,appearance:'none',cursor:'pointer'};
  const btn={padding:'11px 20px',borderRadius:10,background:ac,color:'#000',fontSize:13,fontWeight:600,border:'none',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",transition:'opacity .1s'};
  const btn2={...btn,background:sf,color:c2,border:`1px solid ${bd}`};
  return{ac,b,cd,sf,bd,c1,c2,c3,inp,sel,btn,btn2,
    lbl:{fontSize:11,fontWeight:500,color:c3,marginBottom:5,display:'block'},
    fg:{marginBottom:14},fr:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10},
    card:{background:cd,border:`1px solid ${bd}`,borderRadius:14,padding:'18px',marginBottom:12},
    hd:{fontSize:12,fontWeight:700,color:c2,marginBottom:12,letterSpacing:'.04em',textTransform:'uppercase',fontFamily:"'DM Sans',sans-serif"},
    badge:(cl=ac)=>({display:'inline-block',padding:'3px 8px',borderRadius:5,fontSize:10,fontWeight:600,background:`${cl}14`,color:cl}),
    empty:{textAlign:'center',padding:'32px 16px',color:c3,fontSize:13},
    sCard:{background:sf,border:`1px solid ${bd}`,borderRadius:12,padding:'14px 16px'},
  };
};

/* ─── Pages ─── */

function Dash({saves,go,setActive,t,s,userName}){
  const ts=saves.reduce((a,x)=>a+(x.seasons?.length||0),0),tt=saves.reduce((a,x)=>a+(x.trophies?.length||0),0);
  return <div>
    <div style={{marginBottom:20}}><div style={{fontSize:13,color:s.c2}}>{t.hi},</div><div style={{fontSize:24,fontWeight:700,fontFamily:"'DM Sans',sans-serif"}}>{userName||'Manager'}</div></div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:16}}>
      {[{v:saves.length,l:t.svs},{v:ts,l:t.ssns},{v:tt,l:t.trps},{v:saves.reduce((a,x)=>a+(x.matches?.length||0),0),l:t.mtcs}].map((x,i)=>
        <div key={i} style={s.sCard}><div style={{fontSize:22,fontWeight:700,color:i===0?s.ac:s.c1,fontFamily:"'DM Sans',sans-serif"}}>{x.v}</div><div style={{fontSize:10,color:s.c3,marginTop:3}}>{x.l}</div></div>
      )}
    </div>
    <div style={s.card}><div style={s.hd}>{t.actions}</div><div style={{display:'flex',gap:8}}><button style={s.btn} onClick={()=>go('saves')}>{t.newMgr}</button><button style={s.btn2} onClick={()=>go('saves')}>{t.newPlr}</button></div></div>
    {saves.length>0?saves.map(sv=><div key={sv.id} style={{...s.sCard,marginBottom:6,cursor:'pointer'}} onClick={()=>{setActive(sv);go(sv.type==='manager'?'mgr':'plr');}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div><div style={{fontSize:14,fontWeight:600}}>{sv.name}</div><div style={{fontSize:11,color:s.c2}}>{sv.currentTeam||'—'} · {t.ssn} {sv.currentSeason||1}</div></div><div style={s.badge(s.ac)}>{sv.gameVersion||'FC 26'}</div></div></div>)
    :<div style={s.card}><div style={s.empty}>{t.noSave}</div></div>}
  </div>;
}

function Saves({saves,setSaves,setActive,go,saveFn,t,s}){
  const[sh,setSh]=useState(false);const[f,setF]=useState({name:'',gameVersion:'EA FC 26',type:'manager'});
  const mk=()=>{const n={id:uid(),...f,createdAt:new Date().toISOString(),currentSeason:1,currentTeam:'',managerName:'',managerAge:35,managerNationality:'',playerName:'',playerPosition:'ST',playerOverall:65,playerPotential:85,playerArchetype:'',squad:[],transfers:[],matches:[],trophies:[],seasons:[],teamHistory:[],youthAcademy:[],finances:{transferBudget:0,wageBudget:0},notes:''};const u=[...saves,n];setSaves(u);saveFn({saves:u});setSh(false);};
  return <div>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}><div style={{fontSize:20,fontWeight:700,fontFamily:"'DM Sans',sans-serif"}}>{t.saves}</div><button style={s.btn} onClick={()=>setSh(true)}>{t.createSave}</button></div>
    {saves.map(sv=><div key={sv.id} style={{...s.card,display:'flex',justifyContent:'space-between',alignItems:'center'}}><div><div style={{fontSize:15,fontWeight:600}}>{sv.name}</div><div style={{fontSize:12,color:s.c2}}>{sv.type==='manager'?t.mgr:t.plr} · {sv.gameVersion}{sv.currentTeam?` · ${sv.currentTeam}`:''}</div></div><div style={{display:'flex',gap:6}}><button style={s.btn} onClick={()=>{setActive(sv);go(sv.type==='manager'?'mgr':'plr');}}>{t.load}</button><button style={{...s.btn2,color:'#ff6b6b',borderColor:'rgba(255,60,60,.15)'}} onClick={()=>{const u=saves.filter(x=>x.id!==sv.id);setSaves(u);saveFn({saves:u});}}>✕</button></div></div>)}
    {saves.length===0&&<div style={s.card}><div style={s.empty}>{t.noSave}</div></div>}
    <Mdl show={sh} onClose={()=>setSh(false)} title={t.createSave}>
      <div style={s.fg}><label style={s.lbl}>{t.saveName}</label><input style={s.inp} value={f.name} onChange={e=>setF({...f,name:e.target.value})}/></div>
      <div style={s.fr}><div style={s.fg}><label style={s.lbl}>{t.gameVer}</label><select style={s.sel} value={f.gameVersion} onChange={e=>setF({...f,gameVersion:e.target.value})}>{['EA FC 26','EA FC 25','EA FC 24'].map(v=><option key={v}>{v}</option>)}</select></div><div style={s.fg}><label style={s.lbl}>{t.careerType}</label><select style={s.sel} value={f.type} onChange={e=>setF({...f,type:e.target.value})}><option value="manager">{t.mgr}</option><option value="player">{t.plr}</option></select></div></div>
      <div style={{display:'flex',gap:8,marginTop:12}}><button style={s.btn} onClick={mk} disabled={!f.name}>{t.createSave}</button><button style={s.btn2} onClick={()=>setSh(false)}>{t.cancel}</button></div>
    </Mdl>
  </div>;
}

/* ─── Manager Career ─── */
function Mgr({save,upSave,t,s,cur}){
  const[tab,setTab]=useState('info');const[mdl,setMdl]=useState(null);const[fm,setFm]=useState({});
  const up=(k,v)=>upSave({...save,[k]:v});
  const add=(k,it)=>{up(k,[...(save[k]||[]),{id:uid(),...it}]);setMdl(null);};
  const tabs=[{k:'info',l:t.mgrInfo},{k:'squad',l:t.squad},{k:'trans',l:t.trans},{k:'match',l:t.match},{k:'trophy',l:t.trophy},{k:'hist',l:t.hist},{k:'clubs',l:t.clubs},{k:'youth',l:t.youth},{k:'fin',l:t.fin}];

  const Info=()=><div style={s.card}>
    <div style={s.fr}><div style={s.fg}><label style={s.lbl}>{t.mgrName}</label><DF style={s.inp} value={save.managerName||''} onSave={v=>up('managerName',v)} ac={s.ac}/></div><div style={s.fg}><label style={s.lbl}>{t.mgrAge}</label><DF style={s.inp} type="number" value={save.managerAge||35} onSave={v=>up('managerAge',v)} ac={s.ac}/></div></div>
    <div style={s.fr}><div style={s.fg}><label style={s.lbl}>{t.team}</label><DF style={s.inp} value={save.currentTeam||''} onSave={v=>up('currentTeam',v)} ac={s.ac}/></div><div style={s.fg}><label style={s.lbl}>{t.league}</label><DF style={s.inp} value={save.league||''} onSave={v=>up('league',v)} ac={s.ac}/></div></div>
    <div style={s.fr}><div style={s.fg}><label style={s.lbl}>{t.nat}</label><DF style={s.inp} value={save.managerNationality||''} onSave={v=>up('managerNationality',v)} ac={s.ac}/></div><div style={s.fg}><label style={s.lbl}>{t.ssn}</label><DF style={s.inp} type="number" value={save.currentSeason||1} onSave={v=>up('currentSeason',v)} ac={s.ac}/></div></div>
    <div style={s.fg}><label style={s.lbl}>{t.notes}</label><DA style={{...s.inp,minHeight:60,resize:'vertical'}} value={save.notes||''} onSave={v=>up('notes',v)} ac={s.ac}/></div>
  </div>;

  const Squad=()=>{
    const sq=save.squad||[];const[vw,setVw]=useState('cards');const[q,setQ]=useState('');const[exp,setExp]=useState(null);const[fP,setFP]=useState('All');
    const pg={All:null,GK:['GK'],DEF:['CB','LB','RB','LWB','RWB'],MID:['CDM','CM','CAM','LM','RM'],ATK:['LW','RW','ST','CF','LF','RF']};
    const fil=sq.filter(p=>(fP==='All'||(pg[fP]||[]).includes(p.position))&&(!q||p.name?.toLowerCase().includes(q.toLowerCase())));
    const sorted=[...fil].sort((a,b)=>(b.ovr||0)-(a.ovr||0));
    const avg=k=>sq.length?Math.round(sq.reduce((a,p)=>a+(p[k]||0),0)/sq.length):0;
    const stC={Starter:'#2ecc71',Substitute:'#f39c12',Reserve:'#95a5a6','Loan Listed':'#e67e22','Transfer Listed':'#e74c3c',Youth:'#9b59b6'};
    return <div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:6,marginBottom:12}}>
        {[{v:sq.length,l:t.players},{v:sq.filter(p=>p.status==='Starter').length,l:t.starters},{v:avg('ovr'),l:t.avgOvr},{v:sq.length?(sq.reduce((a,p)=>a+(p.age||0),0)/sq.length).toFixed(1):'0',l:t.avgAge},{v:fmt(sq.reduce((a,p)=>a+(p.value||0),0),cur),l:t.sqVal},{v:fmt(sq.reduce((a,p)=>a+(p.wage||0),0),cur),l:t.totWage}].map((x,i)=>
          <div key={i} style={s.sCard}><div style={{fontSize:18,fontWeight:700,color:i<2?s.ac:s.c1,fontFamily:"'DM Sans',sans-serif"}}>{x.v}</div><div style={{fontSize:9,color:s.c3,marginTop:2}}>{x.l}</div></div>)}
      </div>
      <div style={{display:'flex',gap:5,marginBottom:10,flexWrap:'wrap',alignItems:'center'}}>
        <input style={{...s.inp,flex:1,minWidth:120,marginBottom:0,padding:'9px 12px',fontSize:12}} placeholder={`🔍 ${t.search}...`} value={q} onChange={e=>setQ(e.target.value)}/>
        {['All','GK','DEF','MID','ATK'].map(f=><button key={f} onClick={()=>setFP(f)} style={{padding:'7px 10px',borderRadius:8,fontSize:10,fontWeight:600,border:'none',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",background:fP===f?s.ac+'1A':s.sf,color:fP===f?s.ac:s.c3}}>{f==='All'?t.all:f}</button>)}
        <button style={s.btn} onClick={()=>{setFm({name:'',position:'ST',age:20,ovr:70,pot:80,value:0,wage:0,contract:'2028',role:'',loan:false,status:'Starter',foot:'Right',skillMoves:3,weakFoot:3,workRates:`${t.wrH}/${t.wrM}`,nationality:'',jerseyNumber:'',height:'',weight:'',morale:'Content',devPlan:'Balanced',notes:''});setMdl('player');}}>{t.addPlayer}</button>
      </div>
      {sorted.length===0?<div style={s.empty}>{t.none}</div>:sorted.map((p,i)=>{
        const ri=sq.findIndex(x=>x.id===p.id);const isX=exp===ri;const oc=p.ovr>=85?'#FFD700':p.ovr>=75?'#2ecc71':p.ovr>=65?'#3498db':'#8e99a4';
        return <div key={p.id||i} style={{background:s.sf,border:`1px solid ${isX?s.ac+'25':s.bd}`,borderRadius:12,marginBottom:4,overflow:'hidden'}}>
          <div style={{display:'flex',alignItems:'center',padding:'12px 14px',cursor:'pointer',gap:10}} onClick={()=>setExp(isX?null:ri)}>
            <div style={{width:42,height:48,borderRadius:8,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:`${oc}0F`,border:`1.5px solid ${oc}25`,flexShrink:0}}>
              <div style={{fontSize:18,fontWeight:800,color:oc,fontFamily:"'DM Sans',sans-serif",lineHeight:1}}>{p.ovr||'—'}</div>
              <div style={{fontSize:8,fontWeight:700,color:oc,opacity:.6}}>{p.position}</div>
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:14,fontWeight:600,color:'#fff',marginBottom:1}}>{p.jerseyNumber?`#${p.jerseyNumber} `:''}{p.name||'—'}
                {p.status&&<span style={{...s.badge(stC[p.status]||'#8e99a4'),fontSize:8,marginLeft:6,verticalAlign:'middle'}}>{stLbl(p.status,t)}</span>}
              </div>
              <div style={{fontSize:10,color:s.c2,display:'flex',gap:8}}>
                <span>{t.pot} {p.pot||'—'}</span><span>{t.age} {p.age||'—'}</span>{p.role&&<span style={{color:s.ac}}>{p.role}</span>}
              </div>
            </div>
            <div style={{textAlign:'right',flexShrink:0}}>
              <div style={{fontSize:12,fontWeight:700,color:s.ac}}>{fmt(p.value,cur)}</div>
              <div style={{fontSize:10,color:s.c3}}>{fmt(p.wage,cur)}/w</div>
            </div>
            <span style={{fontSize:12,color:s.c3,transition:'.15s',transform:isX?'rotate(180deg)':''}}>▾</span>
          </div>
          {isX&&<div style={{padding:'0 14px 14px',borderTop:`1px solid ${s.bd}`}}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(100px,1fr))',gap:5,marginTop:10}}>
              {[{l:t.contract,v:p.contract},{l:t.wr,v:p.workRates},{l:t.dev,v:p.devPlan},{l:t.nat,v:p.nationality},{l:t.height,v:p.height},{l:t.weight,v:p.weight},{l:t.foot,v:p.foot?(fOpts(t).find(x=>x.v===p.foot)||{}).l||p.foot:''},{l:t.sm,v:p.skillMoves?`⭐${p.skillMoves}`:''},{l:t.wf,v:p.weakFoot?`🌟${p.weakFoot}`:''}].filter(x=>x.v).map((x,j)=>
                <div key={j} style={{background:s.sf,borderRadius:6,padding:'5px 7px'}}><div style={{fontSize:8,color:s.c3,fontWeight:600,textTransform:'uppercase',marginBottom:1}}>{x.l}</div><div style={{fontSize:11,color:s.c2}}>{x.v}</div></div>)}
            </div>
            {p.notes&&<div style={{fontSize:11,color:s.c3,marginTop:6,fontStyle:'italic'}}>📝 {p.notes}</div>}
            <div style={{display:'flex',gap:5,marginTop:10}}>
              <button style={{...s.btn,padding:'8px 14px',fontSize:11}} onClick={()=>{setFm({...p,_ei:ri});setMdl('editPlayer');}}>✏️ {t.edit}</button>
              <button style={{...s.btn2,padding:'8px 14px',fontSize:11,color:'#ff6b6b'}} onClick={()=>up('squad',sq.filter((_,j)=>j!==ri))}>🗑️ {t.rmPlayer}</button>
            </div>
          </div>}
        </div>;
      })}
    </div>;
  };

  const Trans=()=>{const tr=save.transfers||[];return<div><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}><div style={s.hd}>{t.trans} ({tr.length})</div><button style={s.btn} onClick={()=>{setFm({playerName:'',type:'in',fee:0,from:'',to:'',season:save.currentSeason||1});setMdl('transfer');}}>{t.addTrans}</button></div>{tr.length===0?<div style={s.empty}>{t.none}</div>:tr.map((x,i)=><div key={i} style={{...s.sCard,marginBottom:4,display:'flex',justifyContent:'space-between',alignItems:'center'}}><div><div style={{fontSize:13,fontWeight:600}}>{x.playerName}</div><div style={{fontSize:10,color:s.c2}}>{x.from} → {x.to} · {t.ssn} {x.season}</div></div><div style={{display:'flex',gap:6,alignItems:'center'}}><span style={s.badge(x.type==='in'?'#2ecc71':x.type==='out'?'#e74c3c':'#f39c12')}>{x.type==='in'?t.trans:x.type==='out'?t.trans:t.loan}</span><span style={{fontWeight:700,color:s.ac,fontSize:12}}>{fmt(x.fee,cur)}</span><button style={{...s.btn2,padding:'4px 8px',color:'#ff6b6b',fontSize:10}} onClick={()=>up('transfers',tr.filter((_,j)=>j!==i))}>✕</button></div></div>)}</div>;};
  const Matches=()=>{const m=save.matches||[];const w=m.filter(x=>x.result==='win').length,d=m.filter(x=>x.result==='draw').length,l=m.filter(x=>x.result==='loss').length;return<div><div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:6,marginBottom:12}}>{[{v:w,l:t.win,c:'#2ecc71'},{v:d,l:t.draw,c:'#f39c12'},{v:l,l:t.loss,c:'#e74c3c'},{v:m.length,l:t.played,c:s.ac}].map((x,i)=><div key={i} style={s.sCard}><div style={{fontSize:18,fontWeight:700,color:x.c,fontFamily:"'DM Sans',sans-serif"}}>{x.v}</div><div style={{fontSize:9,color:s.c3}}>{x.l}</div></div>)}</div><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}><div style={s.hd}>{t.match}</div><button style={s.btn} onClick={()=>{setFm({opponent:'',score:'',result:'win',competition:'League',scorers:'',motm:'',season:save.currentSeason||1,homeAway:'home'});setMdl('match');}}>{t.addMatch}</button></div>{m.length===0?<div style={s.empty}>{t.none}</div>:m.slice().reverse().map((x,i)=><div key={i} style={{...s.sCard,marginBottom:3}}><div style={{fontSize:13,fontWeight:600}}><span style={{color:x.result==='win'?'#2ecc71':x.result==='draw'?'#f39c12':'#e74c3c'}}>●</span> {x.homeAway==='home'?`${save.currentTeam||'—'} ${x.score} ${x.opponent}`:`${x.opponent} ${x.score} ${save.currentTeam||'—'}`}</div><div style={{fontSize:10,color:s.c2}}>{x.competition} · {t.ssn} {x.season}{x.scorers?` · ⚽ ${x.scorers}`:''}{x.motm?` · ⭐ ${x.motm}`:''}</div></div>)}</div>;};
  const Troph=()=>{const tr=save.trophies||[];return<div><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}><div style={s.hd}>{t.trophy} ({tr.length})</div><button style={s.btn} onClick={()=>{setFm({name:'League Title',season:save.currentSeason||1,team:save.currentTeam||''});setMdl('trophy');}}>{t.addTrophy}</button></div>{tr.length===0?<div style={s.empty}>{t.none}</div>:tr.map((x,i)=><div key={i} style={{...s.sCard,marginBottom:4,display:'flex',alignItems:'center',gap:10}}><span style={{fontSize:22}}>🏆</span><div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{x.name}</div><div style={{fontSize:10,color:s.c2}}>{x.team} · {t.ssn} {x.season}</div></div></div>)}</div>;};
  const Hist=()=>{const ss=save.seasons||[];return<div><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}><div style={s.hd}>{t.hist}</div><button style={s.btn} onClick={()=>{setFm({seasonNum:save.currentSeason||1,team:save.currentTeam||'',league:save.league||'',leaguePosition:1,topScorer:'',bestSigning:'',notes:''});setMdl('season');}}>{t.endSsn}</button></div>{ss.length===0?<div style={s.empty}>{t.none}</div>:ss.map((x,i)=><div key={i} style={{...s.sCard,marginBottom:4}}><div style={{display:'flex',justifyContent:'space-between'}}><div><div style={{fontSize:15,fontWeight:700}}>{t.ssn} {x.seasonNum}</div><div style={{fontSize:11,color:s.c2}}>{x.team} · {x.league}</div></div><span style={s.badge(s.ac)}>#{x.leaguePosition}</span></div>{x.topScorer&&<div style={{fontSize:10,color:s.c2,marginTop:4}}>⚽ {x.topScorer}</div>}{x.notes&&<div style={{fontSize:10,color:s.c3,marginTop:2}}>{x.notes}</div>}</div>)}</div>;};
  const Clubs=()=>{const h=save.teamHistory||[];return<div><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}><div style={s.hd}>{t.clubs}</div><button style={s.btn} onClick={()=>{setFm({team:'',league:'',reason:'hired',season:save.currentSeason||1});setMdl('teamChange');}}>{t.chgTeam}</button></div>{h.length===0?<div style={s.empty}>{t.none}</div>:h.map((x,i)=><div key={i} style={{...s.sCard,marginBottom:4,display:'flex',alignItems:'center',gap:10}}><span style={{fontSize:20}}>🏟️</span><div style={{flex:1}}><div style={{fontWeight:600}}>{x.team}</div><div style={{fontSize:10,color:s.c2}}>{x.league} · {t.ssn} {x.season}</div></div><span style={s.badge(x.reason==='hired'?'#2ecc71':x.reason==='fired'?'#e74c3c':'#f39c12')}>{t[x.reason]||x.reason}</span></div>)}</div>;};
  const Youth=()=>{const y=save.youthAcademy||[];return<div><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}><div style={s.hd}>{t.youth} ({y.length})</div><button style={s.btn} onClick={()=>{setFm({name:'',position:'ST',ovr:55,potential:80,age:16,region:'Europe'});setMdl('youth');}}>{t.addYouth}</button></div>{y.length===0?<div style={s.empty}>{t.none}</div>:y.map((x,i)=><div key={i} style={{...s.sCard,marginBottom:4,display:'flex',alignItems:'center',gap:10}}><div style={{width:36,height:36,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',background:`${s.ac}0F`,border:`1.5px solid ${s.ac}25`,fontSize:12,fontWeight:800,color:s.ac,fontFamily:"'DM Sans',sans-serif"}}>{x.ovr}</div><div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{x.name} <span style={s.badge(s.ac)}>{x.position}</span></div><div style={{fontSize:10,color:s.c2}}>{t.pot} {x.potential} · {t.age} {x.age} · {x.region}</div></div><button style={{...s.btn2,padding:'4px 8px',color:'#ff6b6b',fontSize:10}} onClick={()=>up('youthAcademy',y.filter((_,j)=>j!==i))}>✕</button></div>)}</div>;};
  const Fin=()=>{const f=save.finances||{};return<div style={s.card}><div style={s.hd}>{t.fin}</div><div style={s.fr}><div style={s.fg}><label style={s.lbl}>{t.transBudget}</label><DF style={s.inp} type="number" value={f.transferBudget||0} onSave={v=>up('finances',{...f,transferBudget:Number(v)})} ac={s.ac}/></div><div style={s.fg}><label style={s.lbl}>{t.wageBudget}</label><DF style={s.inp} type="number" value={f.wageBudget||0} onSave={v=>up('finances',{...f,wageBudget:Number(v)})} ac={s.ac}/></div></div><div style={s.fr}><div style={s.sCard}><div style={{fontSize:20,fontWeight:700,color:s.ac,fontFamily:"'DM Sans',sans-serif"}}>{fmt(f.transferBudget,cur)}</div><div style={{fontSize:9,color:s.c3,marginTop:2}}>{t.transBudget}</div></div><div style={s.sCard}><div style={{fontSize:20,fontWeight:700,color:s.c1,fontFamily:"'DM Sans',sans-serif"}}>{fmt(f.wageBudget,cur)}</div><div style={{fontSize:9,color:s.c3,marginTop:2}}>{t.wageBudget}</div></div></div></div>;};

  /* Modal rendering */
  const renderMdl=()=>{
    if(!mdl)return null;
    const pf=[{n:'name',l:t.name,tp:'text'},{n:'jerseyNumber',l:t.jersey,tp:'number'},{n:'position',l:t.pos,tp:'select',o:POS},{n:'ovr',l:'OVR',tp:'number'},{n:'pot',l:'POT',tp:'number'},{n:'age',l:t.age,tp:'number'},{n:'value',l:t.val,tp:'number'},{n:'wage',l:t.wage,tp:'number'},{n:'contract',l:t.contract,tp:'text'},{n:'status',l:t.status,tp:'ts',o:stOpts(t)},{n:'role',l:t.role,tp:'select',o:ROLES},{n:'foot',l:t.foot,tp:'ts',o:fOpts(t)},{n:'skillMoves',l:t.sm,tp:'number'},{n:'weakFoot',l:t.wf,tp:'number'},{n:'workRates',l:t.wr,tp:'select',o:wrList(t)},{n:'nationality',l:t.nat,tp:'text'},{n:'height',l:t.height,tp:'text'},{n:'weight',l:t.weight,tp:'text'},{n:'morale',l:t.morale,tp:'ts',o:mOpts(t)},{n:'devPlan',l:t.dev,tp:'ts',o:dOpts(t)},{n:'loan',l:t.loan,tp:'select',o:['false','true']},{n:'notes',l:t.notes,tp:'text'}];
    const mds={player:{tl:t.addPlayer,k:'squad',f:pf},editPlayer:{tl:'✏️ '+t.editPlayer,f:pf},transfer:{tl:t.addTrans,k:'transfers',f:[{n:'playerName',l:t.name,tp:'text'},{n:'type',l:t.type,tp:'select',o:['in','out','loan_in','loan_out']},{n:'fee',l:t.fee,tp:'number'},{n:'from',l:t.from,tp:'text'},{n:'to',l:t.to,tp:'text'},{n:'season',l:t.ssn,tp:'number'}]},match:{tl:t.addMatch,k:'matches',f:[{n:'opponent',l:t.opponent,tp:'text'},{n:'score',l:t.score,tp:'text'},{n:'result',l:t.score,tp:'select',o:['win','draw','loss']},{n:'competition',l:t.comp,tp:'select',o:COMPS},{n:'homeAway',l:t.homeAway,tp:'select',o:['home','away']},{n:'scorers',l:t.scorers,tp:'text'},{n:'motm',l:t.motm,tp:'text'},{n:'season',l:t.ssn,tp:'number'}]},trophy:{tl:t.addTrophy,k:'trophies',f:[{n:'name',l:t.trophyName,tp:'select',o:TTYPES},{n:'season',l:t.ssn,tp:'number'},{n:'team',l:t.team,tp:'text'}]},season:{tl:t.endSsn,k:'seasons',f:[{n:'seasonNum',l:t.ssn,tp:'number'},{n:'team',l:t.team,tp:'text'},{n:'league',l:t.league,tp:'text'},{n:'leaguePosition',l:t.leaguePos,tp:'number'},{n:'topScorer',l:t.topScorer,tp:'text'},{n:'bestSigning',l:t.bestSign,tp:'text'},{n:'notes',l:t.notes,tp:'text'}]},teamChange:{tl:t.chgTeam,k:'teamHistory',f:[{n:'team',l:t.team,tp:'text'},{n:'league',l:t.league,tp:'text'},{n:'reason',l:t.reason,tp:'select',o:['hired','resigned','fired']},{n:'season',l:t.ssn,tp:'number'}]},youth:{tl:t.addYouth,k:'youthAcademy',f:[{n:'name',l:t.name,tp:'text'},{n:'position',l:t.pos,tp:'select',o:POS},{n:'ovr',l:'OVR',tp:'number'},{n:'potential',l:t.pot,tp:'number'},{n:'age',l:t.age,tp:'number'},{n:'region',l:t.scoutRegion,tp:'select',o:REGIONS}]}};
    const c=mds[mdl];if(!c)return null;
    const renderField=f=><div key={f.n} style={s.fg}><label style={s.lbl}>{f.l}</label>{f.tp==='select'?<select style={s.sel} value={String(fm[f.n]??'')} onChange={e=>setFm({...fm,[f.n]:e.target.value})}>{f.o.map(o=><option key={o} value={o}>{o}</option>)}</select>:f.tp==='ts'?<select style={s.sel} value={String(fm[f.n]??'')} onChange={e=>setFm({...fm,[f.n]:e.target.value})}>{f.o.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}</select>:<input style={s.inp} type={f.tp} value={fm[f.n]??''} onChange={e=>setFm({...fm,[f.n]:f.tp==='number'?Number(e.target.value):e.target.value})}/>}</div>;
    const onSave=()=>{
      if(mdl==='editPlayer'){const{_ei,...d}=fm;d.loan=d.loan==='true'||d.loan===true;const u=[...(save.squad||[])];u[_ei]={...u[_ei],...d};up('squad',u);setMdl(null);return;}
      const d={...fm};if(d.loan!==undefined)d.loan=d.loan==='true'||d.loan===true;
      add(c.k,d);if(mdl==='teamChange'){up('currentTeam',fm.team);up('league',fm.league);}if(mdl==='season')up('currentSeason',(save.currentSeason||1)+1);
    };
    return <Mdl show onClose={()=>setMdl(null)} title={c.tl}><div style={s.fr}>{c.f.map(renderField)}</div><div style={{display:'flex',gap:8,marginTop:14}}><button style={s.btn} onClick={onSave}>{t.save}</button><button style={s.btn2} onClick={()=>setMdl(null)}>{t.cancel}</button></div></Mdl>;
  };

  const cn={info:<Info/>,squad:<Squad/>,trans:<Trans/>,match:<Matches/>,trophy:<Troph/>,hist:<Hist/>,clubs:<Clubs/>,youth:<Youth/>,fin:<Fin/>};
  return <div>
    <div style={{background:`linear-gradient(135deg,${s.ac}08,rgba(108,92,231,.04))`,border:`1px solid ${s.bd}`,borderRadius:14,padding:'18px 20px',marginBottom:14,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:10}}>
      <div><div style={{fontSize:10,color:s.c3,fontWeight:600,letterSpacing:'.1em',textTransform:'uppercase',marginBottom:2}}>{save.name}</div><div style={{fontSize:22,fontWeight:700,fontFamily:"'DM Sans',sans-serif"}}>{save.managerName||t.mgr}</div><div style={{fontSize:12,color:s.c2,marginTop:2,display:'flex',gap:8}}>{save.currentTeam&&<span style={{color:s.ac,fontWeight:600}}>{save.currentTeam}</span>}{save.league&&<span>· {save.league}</span>}<span>· {t.ssn} {save.currentSeason||1}</span></div></div>
      <div style={{display:'flex',gap:12}}>{[{v:save.squad?.length||0,l:t.squad},{v:save.trophies?.length||0,l:t.trophy},{v:save.matches?.length||0,l:t.match}].map((x,i)=><div key={i} style={{textAlign:'center'}}><div style={{fontSize:18,fontWeight:700,color:s.ac,fontFamily:"'DM Sans',sans-serif",lineHeight:1}}>{x.v}</div><div style={{fontSize:8,color:s.c3,fontWeight:600,textTransform:'uppercase',marginTop:1}}>{x.l}</div></div>)}</div>
    </div>
    <div style={{display:'flex',gap:0,marginBottom:14,background:s.sf,borderRadius:10,padding:3,overflowX:'auto',border:`1px solid ${s.bd}`}}>
      {tabs.map(x=><button key={x.k} style={{padding:'8px 14px',fontSize:11,fontWeight:tab===x.k?600:400,color:tab===x.k?'#fff':s.c3,background:tab===x.k?s.ac+'18':'transparent',borderRadius:7,cursor:'pointer',border:'none',fontFamily:"'DM Sans',sans-serif",whiteSpace:'nowrap'}} onClick={()=>setTab(x.k)}>{x.l}</button>)}
    </div>
    {cn[tab]}{renderMdl()}
  </div>;
}

/* ─── Player Career (simplified) ─── */
function Plr({save,upSave,t,s,cur}){
  const[tab,setTab]=useState('info');const[mdl,setMdl]=useState(null);const[fm,setFm]=useState({});
  const up=(k,v)=>upSave({...save,[k]:v});const add=(k,it)=>{up(k,[...(save[k]||[]),{id:uid(),...it}]);setMdl(null);};
  const tabs=[{k:'info',l:t.mgrInfo},{k:'match',l:t.match},{k:'trophy',l:t.trophy},{k:'hist',l:t.hist},{k:'clubs',l:t.clubs}];
  const Info=()=><div><div style={s.card}><div style={s.fr}><div style={s.fg}><label style={s.lbl}>{t.plrName}</label><DF style={s.inp} value={save.playerName||''} onSave={v=>up('playerName',v)} ac={s.ac}/></div><div style={s.fg}><label style={s.lbl}>{t.pos}</label><select style={s.sel} value={save.playerPosition||'ST'} onChange={e=>up('playerPosition',e.target.value)}>{POS.map(p=><option key={p}>{p}</option>)}</select></div></div><div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10}}><div style={s.fg}><label style={s.lbl}>{t.ovr}</label><DF style={s.inp} type="number" value={save.playerOverall||65} onSave={v=>up('playerOverall',v)} ac={s.ac}/></div><div style={s.fg}><label style={s.lbl}>{t.pot}</label><DF style={s.inp} type="number" value={save.playerPotential||85} onSave={v=>up('playerPotential',v)} ac={s.ac}/></div><div style={s.fg}><label style={s.lbl}>{t.archetype}</label><select style={s.sel} value={save.playerArchetype||''} onChange={e=>up('playerArchetype',e.target.value)}><option value="">—</option>{['Poacher','Target Forward','Advanced Forward','Inside Forward','Classic Winger','Trickster','Shadow Striker','Playmaker','Box-to-Box','Holding','Fullback'].map(a=><option key={a}>{a}</option>)}</select></div></div><div style={s.fr}><div style={s.fg}><label style={s.lbl}>{t.team}</label><DF style={s.inp} value={save.currentTeam||''} onSave={v=>up('currentTeam',v)} ac={s.ac}/></div><div style={s.fg}><label style={s.lbl}>{t.ssn}</label><DF style={s.inp} type="number" value={save.currentSeason||1} onSave={v=>up('currentSeason',v)} ac={s.ac}/></div></div></div><div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:6}}>{[{v:save.playerOverall||'—',l:t.ovr},{v:save.playerPotential||'—',l:t.pot},{v:save.matches?.length||0,l:t.appearances},{v:save.trophies?.length||0,l:t.trophy}].map((x,i)=><div key={i} style={s.sCard}><div style={{fontSize:18,fontWeight:700,color:i===0?s.ac:s.c1,fontFamily:"'DM Sans',sans-serif"}}>{x.v}</div><div style={{fontSize:9,color:s.c3,marginTop:2}}>{x.l}</div></div>)}</div></div>;
  const MtcP=()=>{const m=save.matches||[];return<div><div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:6,marginBottom:10}}>{[{v:m.reduce((a,x)=>a+(x.goals||0),0),l:t.goals,c:'#2ecc71'},{v:m.reduce((a,x)=>a+(x.assists||0),0),l:t.assists,c:'#3498db'},{v:m.length>0?(m.reduce((a,x)=>a+(x.rating||0),0)/m.length).toFixed(1):'—',l:t.rating,c:s.ac}].map((x,i)=><div key={i} style={s.sCard}><div style={{fontSize:18,fontWeight:700,color:x.c,fontFamily:"'DM Sans',sans-serif"}}>{x.v}</div><div style={{fontSize:9,color:s.c3}}>{x.l}</div></div>)}</div><div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}><div style={s.hd}>{t.match} ({m.length})</div><button style={s.btn} onClick={()=>{setFm({opponent:'',score:'',result:'win',competition:'League',goals:0,assists:0,rating:7.0,season:save.currentSeason||1});setMdl('match');}}>{t.addMatch}</button></div>{m.slice().reverse().map((x,i)=><div key={i} style={{...s.sCard,marginBottom:3}}><div style={{fontSize:13,fontWeight:600}}><span style={{color:x.result==='win'?'#2ecc71':x.result==='draw'?'#f39c12':'#e74c3c'}}>●</span> vs {x.opponent} — {x.score}</div><div style={{fontSize:10,color:s.c2}}>{x.competition} · ⚽{x.goals||0} · 🅰️{x.assists||0} · ⭐{x.rating||'—'}</div></div>)}{m.length===0&&<div style={s.empty}>{t.none}</div>}</div>;};
  const TrP=()=>{const tr=save.trophies||[];return<div><div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}><div style={s.hd}>{t.trophy} ({tr.length})</div><button style={s.btn} onClick={()=>{setFm({name:'League Title',season:save.currentSeason||1,team:save.currentTeam||''});setMdl('trophy');}}>{t.addTrophy}</button></div>{tr.map((x,i)=><div key={i} style={{...s.sCard,marginBottom:4,display:'flex',alignItems:'center',gap:10}}><span style={{fontSize:22}}>🏆</span><div><div style={{fontWeight:600}}>{x.name}</div><div style={{fontSize:10,color:s.c2}}>{x.team} · {t.ssn} {x.season}</div></div></div>)}{tr.length===0&&<div style={s.empty}>{t.none}</div>}</div>;};
  const HstP=()=>{const ss=save.seasons||[];return<div><div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}><div style={s.hd}>{t.hist}</div><button style={s.btn} onClick={()=>{setFm({seasonNum:save.currentSeason||1,team:save.currentTeam||'',goals:0,assists:0,appearances:0,avgRating:7.0,notes:''});setMdl('season');}}>{t.endSsn}</button></div>{ss.map((x,i)=><div key={i} style={{...s.sCard,marginBottom:4}}><div style={{fontSize:14,fontWeight:700}}>{t.ssn} {x.seasonNum}</div><div style={{fontSize:11,color:s.c2}}>{x.team}</div><div style={{display:'flex',gap:10,fontSize:11,color:s.c2,marginTop:3}}><span>⚽{x.goals||0}</span><span>🅰️{x.assists||0}</span><span>📊{x.appearances||0}</span><span>⭐{x.avgRating||'—'}</span></div></div>)}{ss.length===0&&<div style={s.empty}>{t.none}</div>}</div>;};
  const ClP=()=>{const h=save.teamHistory||[];return<div><div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}><div style={s.hd}>{t.clubs}</div><button style={s.btn} onClick={()=>{setFm({team:'',reason:'transfer',season:save.currentSeason||1});setMdl('teamChange');}}>{t.chgTeam}</button></div>{h.map((x,i)=><div key={i} style={{...s.sCard,marginBottom:4,display:'flex',alignItems:'center',gap:10}}><span style={{fontSize:20}}>🏟️</span><div><div style={{fontWeight:600}}>{x.team}</div><div style={{fontSize:10,color:s.c2}}>{t.ssn} {x.season} · {x.reason}</div></div></div>)}{h.length===0&&<div style={s.empty}>{t.none}</div>}</div>;};
  const renderMdl=()=>{if(!mdl)return null;const mds={match:{tl:t.addMatch,k:'matches',f:[{n:'opponent',l:t.opponent,tp:'text'},{n:'score',l:t.score,tp:'text'},{n:'result',l:t.score,tp:'select',o:['win','draw','loss']},{n:'competition',l:t.comp,tp:'select',o:COMPS},{n:'goals',l:t.goals,tp:'number'},{n:'assists',l:t.assists,tp:'number'},{n:'rating',l:t.rating,tp:'number'},{n:'season',l:t.ssn,tp:'number'}]},trophy:{tl:t.addTrophy,k:'trophies',f:[{n:'name',l:t.trophyName,tp:'select',o:TTYPES},{n:'season',l:t.ssn,tp:'number'},{n:'team',l:t.team,tp:'text'}]},season:{tl:t.endSsn,k:'seasons',f:[{n:'seasonNum',l:t.ssn,tp:'number'},{n:'team',l:t.team,tp:'text'},{n:'goals',l:t.goals,tp:'number'},{n:'assists',l:t.assists,tp:'number'},{n:'appearances',l:t.appearances,tp:'number'},{n:'avgRating',l:t.rating,tp:'number'},{n:'notes',l:t.notes,tp:'text'}]},teamChange:{tl:t.chgTeam,k:'teamHistory',f:[{n:'team',l:t.team,tp:'text'},{n:'reason',l:t.reason,tp:'select',o:['transfer','loan','released']},{n:'season',l:t.ssn,tp:'number'}]}};const c=mds[mdl];if(!c)return null;return<Mdl show onClose={()=>setMdl(null)} title={c.tl}><div style={s.fr}>{c.f.map(f=><div key={f.n} style={s.fg}><label style={s.lbl}>{f.l}</label>{f.tp==='select'?<select style={s.sel} value={fm[f.n]||''} onChange={e=>setFm({...fm,[f.n]:e.target.value})}>{f.o.map(o=><option key={o}>{o}</option>)}</select>:<input style={s.inp} type={f.tp} value={fm[f.n]||''} onChange={e=>setFm({...fm,[f.n]:f.tp==='number'?Number(e.target.value):e.target.value})}/>}</div>)}</div><div style={{display:'flex',gap:8,marginTop:14}}><button style={s.btn} onClick={()=>{add(c.k,fm);if(mdl==='teamChange')up('currentTeam',fm.team);if(mdl==='season')up('currentSeason',(save.currentSeason||1)+1);}}>{t.save}</button><button style={s.btn2} onClick={()=>setMdl(null)}>{t.cancel}</button></div></Mdl>;};
  const cn={info:<Info/>,match:<MtcP/>,trophy:<TrP/>,hist:<HstP/>,clubs:<ClP/>};
  return <div>
    <div style={{background:`linear-gradient(135deg,${s.ac}08,rgba(108,92,231,.04))`,border:`1px solid ${s.bd}`,borderRadius:14,padding:'18px 20px',marginBottom:14,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:10}}><div><div style={{fontSize:10,color:s.c3,fontWeight:600,letterSpacing:'.1em',textTransform:'uppercase'}}>{save.name}</div><div style={{fontSize:22,fontWeight:700,fontFamily:"'DM Sans',sans-serif"}}>{save.playerName||t.plr}</div><div style={{fontSize:12,color:s.c2,marginTop:2,display:'flex',gap:8}}>{save.currentTeam&&<span style={{color:s.ac,fontWeight:600}}>{save.currentTeam}</span>}{save.playerPosition&&<span>· {save.playerPosition}</span>}<span>· {t.ssn} {save.currentSeason||1}</span></div></div><div style={{display:'flex',gap:12}}>{[{v:save.playerOverall||'—',l:t.ovr},{v:save.playerPotential||'—',l:t.pot},{v:save.trophies?.length||0,l:t.trophy}].map((x,i)=><div key={i} style={{textAlign:'center'}}><div style={{fontSize:18,fontWeight:700,color:i===0?s.ac:s.c1,fontFamily:"'DM Sans',sans-serif",lineHeight:1}}>{x.v}</div><div style={{fontSize:8,color:s.c3,fontWeight:600,textTransform:'uppercase',marginTop:1}}>{x.l}</div></div>)}</div></div>
    <div style={{display:'flex',gap:0,marginBottom:14,background:s.sf,borderRadius:10,padding:3,overflowX:'auto',border:`1px solid ${s.bd}`}}>{tabs.map(x=><button key={x.k} style={{padding:'8px 14px',fontSize:11,fontWeight:tab===x.k?600:400,color:tab===x.k?'#fff':s.c3,background:tab===x.k?s.ac+'18':'transparent',borderRadius:7,cursor:'pointer',border:'none',fontFamily:"'DM Sans',sans-serif",whiteSpace:'nowrap'}} onClick={()=>setTab(x.k)}>{x.l}</button>)}</div>
    {cn[tab]}{renderMdl()}
  </div>;
}

/* ─── Settings ─── */
function Cfg({settings:cfg,setSettings:setCfg,saveFn,saves,setSaves,t,s}){
  const cls=['#00e5ff','#6C5CE7','#2ecc71','#e74c3c','#f1c40f','#e67e22','#1abc9c','#9b59b6','#FF6B9D','#FF4757','#70A1FF','#7BED9F'];
  const exp=()=>{const d=JSON.stringify({settings:cfg,saves},null,2);const b=new Blob([d],{type:'application/json'});const u=URL.createObjectURL(b);const a=document.createElement('a');a.href=u;a.download=`playr-${new Date().toISOString().slice(0,10)}.json`;a.click();};
  const imp=()=>{const i=document.createElement('input');i.type='file';i.accept='.json';i.onchange=async e=>{try{const d=JSON.parse(await e.target.files[0].text());if(d.settings)setCfg(d.settings);if(d.saves)setSaves(d.saves);saveFn({settings:d.settings||cfg,saves:d.saves||saves});}catch{}};i.click();};
  return <div>
    <div style={{fontSize:20,fontWeight:700,fontFamily:"'DM Sans',sans-serif",marginBottom:16}}>{t.cfg}</div>
    <div style={s.card}><div style={s.hd}>{t.lang}</div><div style={{display:'flex',gap:6,flexWrap:'wrap'}}>{[{c:'pt-BR',l:'🇧🇷 PT'},{c:'en',l:'🇬🇧 EN'},{c:'es',l:'🇪🇸 ES'}].map(x=><button key={x.c} style={{...s.btn2,...(cfg.language===x.c?{background:s.ac+'14',color:s.ac}:{})}} onClick={()=>setCfg({...cfg,language:x.c})}>{x.l}</button>)}</div></div>
    <div style={s.card}><div style={s.hd}>{t.accentColor}</div><div style={{display:'flex',gap:6,flexWrap:'wrap'}}>{cls.map(c=><div key={c} onClick={()=>setCfg({...cfg,accentColor:c})} style={{width:34,height:34,borderRadius:10,background:c,cursor:'pointer',border:cfg.accentColor===c?'2px solid #fff':'2px solid transparent'}}/>)}<input type="color" value={cfg.accentColor||'#00e5ff'} onChange={e=>setCfg({...cfg,accentColor:e.target.value})} style={{width:34,height:34,borderRadius:10,border:'none',cursor:'pointer',padding:0}}/></div></div>
    <div style={s.card}><div style={s.hd}>{t.currency}</div><div style={{display:'flex',gap:6,flexWrap:'wrap'}}>{['EUR','GBP','USD','BRL','ARS','MXN','JPY','TRY'].map(c=><button key={c} style={{...s.btn2,padding:'8px 12px',...(cfg.currency===c?{background:s.ac+'14',color:s.ac}:{})}} onClick={()=>setCfg({...cfg,currency:c})}>{c}</button>)}</div></div>
    <div style={s.card}><div style={s.hd}>{t.dataManage}</div><div style={{display:'flex',gap:6}}><button style={s.btn2} onClick={exp}>📥 {t.exportData}</button><button style={s.btn2} onClick={imp}>📤 {t.importData}</button></div></div>
    <button style={{...s.btn,marginTop:6}} onClick={()=>saveFn({settings:cfg})}>{t.saveCfg}</button>
  </div>;
}

/* ─── MAIN APP ─── */
export default function App(){
  const{user,userData,saveToCloud,logout}=useAuth();
  const[pg,setPg]=useState('dash');const[saves,setSaves]=useState([]);const[active,setActive]=useState(null);
  const[cfg,setCfg]=useState({language:'pt-BR',accentColor:'#00e5ff',currency:'EUR'});
  const[mob,setMob]=useState(window.innerWidth<768);
  useEffect(()=>{const h=()=>setMob(window.innerWidth<768);window.addEventListener('resize',h);return()=>window.removeEventListener('resize',h);},[]);
  useEffect(()=>{if(userData){setSaves(userData.saves||[]);if(userData.settings)setCfg(userData.settings);}},[userData]);
  const t=L[cfg.language]||L['pt-BR'];
  const s=useMemo(()=>S(cfg.accentColor||'#00e5ff'),[cfg.accentColor]);
  const upSave=useCallback(us=>{const u=saves.map(x=>x.id===us.id?us:x);setSaves(u);setActive(us);saveToCloud({saves:u});},[saves,saveToCloud]);

  const navs=[{k:'dash',l:t.dash,i:'⬡'},{k:'saves',l:t.saves,i:'💾'}];
  if(active?.type==='manager')navs.push({k:'mgr',l:t.mgr,i:'👔'});
  if(active?.type==='player')navs.push({k:'plr',l:t.plr,i:'⚽'});
  navs.push({k:'cfg',l:t.cfg,i:'⚙️'});

  const page=()=>{switch(pg){
    case'dash':return<Dash saves={saves} go={setPg} setActive={setActive} t={t} s={s} userName={user?.displayName||''}/>;
    case'saves':return<Saves saves={saves} setSaves={setSaves} setActive={setActive} go={setPg} saveFn={saveToCloud} t={t} s={s}/>;
    case'mgr':return active?<Mgr save={active} upSave={upSave} t={t} s={s} cur={cfg.currency}/>:<Dash saves={saves} go={setPg} setActive={setActive} t={t} s={s} userName={user?.displayName||''}/>;
    case'plr':return active?<Plr save={active} upSave={upSave} t={t} s={s} cur={cfg.currency}/>:<Dash saves={saves} go={setPg} setActive={setActive} t={t} s={s} userName={user?.displayName||''}/>;
    case'cfg':return<Cfg settings={cfg} setSettings={setCfg} saveFn={saveToCloud} saves={saves} setSaves={setSaves} t={t} s={s}/>;
    default:return<Dash saves={saves} go={setPg} setActive={setActive} t={t} s={s} userName={user?.displayName||''}/>;
  }};

  /* MOBILE: bottom tab bar. DESKTOP: sidebar */
  if(mob) return <div style={{...s.app,flexDirection:'column',paddingBottom:64}}>
    <div style={{padding:'16px 16px 8px'}}>{page()}</div>
    <div style={{position:'fixed',bottom:0,left:0,right:0,background:'rgba(8,12,20,.98)',borderTop:`1px solid ${s.bd}`,display:'flex',justifyContent:'space-around',padding:'8px 0 12px',zIndex:100,backdropFilter:'blur(12px)'}}>
      {navs.map(n=><div key={n.k} onClick={()=>setPg(n.k)} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:2,cursor:'pointer',padding:'4px 8px',minWidth:48}}>
        <span style={{fontSize:18,opacity:pg===n.k?1:.4}}>{n.i}</span>
        <span style={{fontSize:9,fontWeight:pg===n.k?700:400,color:pg===n.k?s.ac:s.c3}}>{n.l}</span>
      </div>)}
    </div>
    <style>{`*{margin:0;padding:0;box-sizing:border-box}body{background:#080c14;overflow-x:hidden}option{background:#0c1019}::selection{background:${cfg.accentColor}30}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:rgba(255,255,255,.08);border-radius:2px}@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}`}</style>
  </div>;

  return <div style={s.app}>
    {/* Desktop sidebar */}
    <div style={{width:200,minHeight:'100vh',background:'rgba(7,10,16,.98)',borderRight:`1px solid ${s.bd}`,display:'flex',flexDirection:'column',padding:'16px 0',position:'fixed',left:0,top:0,bottom:0,zIndex:100}}>
      <div style={{display:'flex',alignItems:'center',gap:8,padding:'0 16px',marginBottom:20}}><Logo s={22} c={cfg.accentColor}/><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:18,fontWeight:700,color:'#fff',letterSpacing:'.06em'}}>PLAYR</span></div>
      {active&&<div style={{padding:'0 12px',marginBottom:12}}><div style={{padding:'8px 10px',background:s.ac+'08',borderRadius:8}}><div style={{fontSize:11,fontWeight:600,color:'#fff'}}>{active.name}</div><div style={{fontSize:9,color:s.c2}}>{active.currentTeam||'—'} · S{active.currentSeason||1}</div></div></div>}
      <div style={{fontSize:8,fontWeight:700,letterSpacing:'.14em',textTransform:'uppercase',color:s.c3,padding:'12px 16px 4px'}}>MENU</div>
      {navs.map(n=><div key={n.k} style={{display:'flex',alignItems:'center',gap:8,padding:'9px 16px',cursor:'pointer',fontSize:12,fontWeight:pg===n.k?600:400,color:pg===n.k?'#fff':s.c2,background:pg===n.k?s.ac+'0C':'transparent',borderLeft:pg===n.k?`2px solid ${s.ac}`:'2px solid transparent',borderRadius:'0 6px 6px 0',transition:'.1s'}} onClick={()=>setPg(n.k)}><span style={{fontSize:14}}>{n.i}</span>{n.l}</div>)}
      <div style={{marginTop:'auto',padding:'12px 16px'}}><div style={{fontSize:9,color:s.c3,marginBottom:6}}>{user?.email}</div><div style={{display:'flex',alignItems:'center',gap:6,padding:'8px 0',cursor:'pointer',fontSize:12,color:s.c2}} onClick={logout}>🚪 {t.out}</div></div>
    </div>
    <div style={{marginLeft:200,padding:'22px 28px',maxWidth:1000}}>{page()}</div>
    <style>{`*{margin:0;padding:0;box-sizing:border-box}body{background:#080c14;overflow-x:hidden}option{background:#0c1019}::selection{background:${cfg.accentColor}30}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:rgba(255,255,255,.08);border-radius:2px}@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}`}</style>
  </div>;
}
