// App.jsx — Playr: EA FC Career Mode Tracker (v3 - Professional Rewrite)
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useAuth } from './AuthProvider.jsx';

/* ═══════════════════════════════════════════════════
   i18n — Complete translations PT-BR / EN / ES
   ═══════════════════════════════════════════════════ */
const i18n = {
'pt-BR': {
  dashboard:'Painel', manager_career:'Carreira Treinador', player_career:'Carreira Jogador',
  settings:'Configurações', saves:'Saves', logout:'Sair',
  welcome_back:'Bem-vindo de volta', total_saves:'Total de Saves', total_seasons:'Temporadas',
  total_trophies:'Troféus', total_matches:'Partidas',
  recent_activity:'Atividade Recente', quick_actions:'Ações Rápidas',
  new_manager_career:'Nova Carreira Treinador', new_player_career:'Nova Carreira Jogador',
  no_saves_yet:'Nenhum save ainda. Crie sua primeira carreira!',
  manager_info:'Informações do Treinador', manager_name:'Nome do Treinador',
  manager_age:'Idade', current_team:'Time Atual', season:'Temporada',
  budget:'Orçamento', league:'Liga', nationality:'Nacionalidade',
  squad:'Elenco', transfers:'Transferências', matches:'Partidas',
  trophies:'Troféus', finances:'Finanças', youth_academy:'Base',
  season_history:'Histórico', team_history:'Clubes', objectives:'Objetivos',
  player_name:'Nome do Jogador', position:'Posição', overall:'Overall',
  potential:'Potencial', club:'Clube', goals:'Gols', assists:'Assistências',
  appearances:'Jogos', rating:'Nota Média', archetype:'Arquétipo',
  add_player:'Adicionar Jogador', player:'Jogador', age:'Idade',
  ovr:'OVR', pot:'POT', value:'Valor', wage:'Salário',
  contract:'Contrato', loan:'Empréstimo', role:'Função',
  transfer_in:'Contratação', transfer_out:'Venda', loan_in:'Emp. Entrada',
  loan_out:'Emp. Saída', free_agent:'Livre', fee:'Valor', from:'De', to:'Para',
  date:'Data', type:'Tipo', add_transfer:'Adicionar Transferência',
  add_match:'Adicionar Partida', competition:'Competição',
  home:'Casa', away:'Fora', result:'Resultado',
  scorers:'Goleadores', motm:'Melhor em Campo',
  win:'Vitória', draw:'Empate', loss:'Derrota',
  opponent:'Adversário', score:'Placar',
  add_trophy:'Adicionar Troféu', trophy_name:'Nome do Troféu',
  start_new_season:'Nova Temporada', end_season:'Encerrar Temporada',
  league_position:'Posição na Liga', top_scorer:'Artilheiro', best_signing:'Melhor Contratação',
  change_team:'Mudar de Time', previous_teams:'Times Anteriores',
  reason:'Motivo', hired:'Contratado', resigned:'Pediu demissão', fired:'Demitido',
  transfer_budget:'Orçamento Transf.', wage_budget:'Folha Salarial',
  youth_name:'Nome', youth_potential:'Potencial', youth_ovr:'OVR',
  scout_region:'Região do Scout', add_youth:'Adicionar Jovem',
  language:'Idioma', accent_color:'Cor de Destaque', currency:'Moeda',
  save_settings:'Salvar', export_data:'Exportar Dados', import_data:'Importar Dados',
  create_save:'Criar Save', save_name:'Nome do Save', game_version:'Versão',
  career_type:'Tipo de Carreira', delete_save:'Excluir', load_save:'Carregar',
  save:'Salvar', cancel:'Cancelar', edit:'Editar', delete:'Excluir',
  add:'Adicionar', close:'Fechar', search:'Buscar', none:'Nenhum',
  name:'Nome', actions:'Ações', status:'Status', notes:'Observações',
  wins:'Vitórias', draws:'Empates', losses:'Derrotas', played:'Jogos',
  // Squad enhanced
  players_count:'Jogadores', starters_count:'Titulares', avg_ovr:'OVR Médio',
  avg_age:'Idade Média', squad_value:'Valor do Elenco', total_wages:'Folha Salarial',
  cards_view:'Cards', table_view:'Tabela', all_status:'Todos',
  edit_player:'Editar Jogador', remove_player:'Remover', playstyles:'PlayStyles',
  player_info:'Info do Jogador', home_away:'Casa/Fora', stats:'Estatísticas',
  foot:'Pé', skill_moves:'Dribles', weak_foot:'Pé Fraco', work_rates:'Ritmo de Trabalho',
  morale_label:'Moral', dev_plan:'Plano de Desenv.', height:'Altura', weight:'Peso',
  jersey:'Camisa', custom_competitions:'Competições Custom.', custom_trophies:'Troféus Custom.',
  data_management:'Dados',
  // Status translations
  st_starter:'Titular', st_substitute:'Reserva', st_reserve:'Banco',
  st_loan_listed:'Emprestável', st_transfer_listed:'À Venda', st_youth:'Jovem',
  // Morale translations
  m_ecstatic:'Radiante', m_happy:'Feliz', m_content:'OK', m_unhappy:'Infeliz', m_furious:'Furioso',
  // Dev plan translations
  dp_balanced:'Equilibrado', dp_defending:'Defesa', dp_physical:'Físico',
  dp_attacking:'Ataque', dp_playmaking:'Criação', dp_goalkeeping:'Goleiro', dp_none:'Nenhum',
  // Work rates
  wr_high:'Alto', wr_medium:'Médio', wr_low:'Baixo',
  // Foot
  f_right:'Direito', f_left:'Esquerdo', f_both:'Ambos',
},
'en': {
  dashboard:'Dashboard', manager_career:'Manager Career', player_career:'Player Career',
  settings:'Settings', saves:'Saves', logout:'Sign Out',
  welcome_back:'Welcome back', total_saves:'Total Saves', total_seasons:'Seasons',
  total_trophies:'Trophies', total_matches:'Matches',
  recent_activity:'Recent Activity', quick_actions:'Quick Actions',
  new_manager_career:'New Manager Career', new_player_career:'New Player Career',
  no_saves_yet:'No saves yet. Create your first career!',
  manager_info:'Manager Info', manager_name:'Manager Name',
  manager_age:'Age', current_team:'Current Team', season:'Season',
  budget:'Budget', league:'League', nationality:'Nationality',
  squad:'Squad', transfers:'Transfers', matches:'Matches',
  trophies:'Trophies', finances:'Finances', youth_academy:'Youth',
  season_history:'History', team_history:'Clubs', objectives:'Objectives',
  player_name:'Player Name', position:'Position', overall:'Overall',
  potential:'Potential', club:'Club', goals:'Goals', assists:'Assists',
  appearances:'Appearances', rating:'Avg Rating', archetype:'Archetype',
  add_player:'Add Player', player:'Player', age:'Age',
  ovr:'OVR', pot:'POT', value:'Value', wage:'Wage',
  contract:'Contract', loan:'Loan', role:'Role',
  transfer_in:'Signing', transfer_out:'Sale', loan_in:'Loan In',
  loan_out:'Loan Out', free_agent:'Free Agent', fee:'Fee', from:'From', to:'To',
  date:'Date', type:'Type', add_transfer:'Add Transfer',
  add_match:'Add Match', competition:'Competition',
  home:'Home', away:'Away', result:'Result',
  scorers:'Scorers', motm:'MOTM',
  win:'Win', draw:'Draw', loss:'Loss',
  opponent:'Opponent', score:'Score',
  add_trophy:'Add Trophy', trophy_name:'Trophy Name',
  start_new_season:'New Season', end_season:'End Season',
  league_position:'League Position', top_scorer:'Top Scorer', best_signing:'Best Signing',
  change_team:'Change Team', previous_teams:'Previous Teams',
  reason:'Reason', hired:'Hired', resigned:'Resigned', fired:'Fired',
  transfer_budget:'Transfer Budget', wage_budget:'Wage Budget',
  youth_name:'Name', youth_potential:'Potential', youth_ovr:'OVR',
  scout_region:'Scout Region', add_youth:'Add Youth',
  language:'Language', accent_color:'Accent Color', currency:'Currency',
  save_settings:'Save', export_data:'Export Data', import_data:'Import Data',
  create_save:'Create Save', save_name:'Save Name', game_version:'Version',
  career_type:'Career Type', delete_save:'Delete', load_save:'Load',
  save:'Save', cancel:'Cancel', edit:'Edit', delete:'Delete',
  add:'Add', close:'Close', search:'Search', none:'None',
  name:'Name', actions:'Actions', status:'Status', notes:'Notes',
  wins:'Wins', draws:'Draws', losses:'Losses', played:'Played',
  players_count:'Players', starters_count:'Starters', avg_ovr:'Avg OVR',
  avg_age:'Avg Age', squad_value:'Squad Value', total_wages:'Total Wages',
  cards_view:'Cards', table_view:'Table', all_status:'All',
  edit_player:'Edit Player', remove_player:'Remove', playstyles:'PlayStyles',
  player_info:'Player Info', home_away:'Home/Away', stats:'Stats',
  foot:'Foot', skill_moves:'Skill Moves', weak_foot:'Weak Foot', work_rates:'Work Rates',
  morale_label:'Morale', dev_plan:'Dev Plan', height:'Height', weight:'Weight',
  jersey:'Jersey', custom_competitions:'Custom Competitions', custom_trophies:'Custom Trophies',
  data_management:'Data',
  st_starter:'Starter', st_substitute:'Substitute', st_reserve:'Reserve',
  st_loan_listed:'Loan Listed', st_transfer_listed:'Transfer Listed', st_youth:'Youth',
  m_ecstatic:'Ecstatic', m_happy:'Happy', m_content:'Content', m_unhappy:'Unhappy', m_furious:'Furious',
  dp_balanced:'Balanced', dp_defending:'Defending', dp_physical:'Physical',
  dp_attacking:'Attacking', dp_playmaking:'Playmaking', dp_goalkeeping:'Goalkeeping', dp_none:'None',
  wr_high:'High', wr_medium:'Medium', wr_low:'Low',
  f_right:'Right', f_left:'Left', f_both:'Both',
},
'es': {
  dashboard:'Panel', manager_career:'Carrera Entrenador', player_career:'Carrera Jugador',
  settings:'Configuración', saves:'Guardados', logout:'Cerrar Sesión',
  welcome_back:'Bienvenido', total_saves:'Guardados', total_seasons:'Temporadas',
  total_trophies:'Trofeos', total_matches:'Partidos',
  recent_activity:'Actividad Reciente', quick_actions:'Acciones',
  new_manager_career:'Nueva Carrera Entrenador', new_player_career:'Nueva Carrera Jugador',
  no_saves_yet:'Sin guardados. ¡Crea tu primera carrera!',
  manager_info:'Info Entrenador', manager_name:'Nombre',
  manager_age:'Edad', current_team:'Equipo Actual', season:'Temporada',
  budget:'Presupuesto', league:'Liga', nationality:'Nacionalidad',
  squad:'Plantilla', transfers:'Fichajes', matches:'Partidos',
  trophies:'Trofeos', finances:'Finanzas', youth_academy:'Cantera',
  season_history:'Historial', team_history:'Equipos', objectives:'Objetivos',
  player_name:'Nombre', position:'Posición', overall:'Overall',
  potential:'Potencial', club:'Club', goals:'Goles', assists:'Asistencias',
  appearances:'Partidos', rating:'Nota', archetype:'Arquetipo',
  add_player:'Añadir Jugador', player:'Jugador', age:'Edad',
  ovr:'OVR', pot:'POT', value:'Valor', wage:'Salario',
  contract:'Contrato', loan:'Cesión', role:'Rol',
  transfer_in:'Fichaje', transfer_out:'Venta', loan_in:'Cesión Ent.',
  loan_out:'Cesión Sal.', free_agent:'Libre', fee:'Precio', from:'De', to:'A',
  date:'Fecha', type:'Tipo', add_transfer:'Añadir Fichaje',
  add_match:'Añadir Partido', competition:'Competición',
  home:'Local', away:'Visitante', result:'Resultado',
  scorers:'Goleadores', motm:'MVP',
  win:'Victoria', draw:'Empate', loss:'Derrota',
  opponent:'Rival', score:'Marcador',
  add_trophy:'Añadir Trofeo', trophy_name:'Nombre',
  start_new_season:'Nueva Temporada', end_season:'Fin Temporada',
  league_position:'Posición Liga', top_scorer:'Goleador', best_signing:'Mejor Fichaje',
  change_team:'Cambiar Equipo', previous_teams:'Equipos Anteriores',
  reason:'Motivo', hired:'Contratado', resigned:'Renunció', fired:'Despedido',
  transfer_budget:'Pres. Fichajes', wage_budget:'Masa Salarial',
  youth_name:'Nombre', youth_potential:'Potencial', youth_ovr:'OVR',
  scout_region:'Región Scout', add_youth:'Añadir Joven',
  language:'Idioma', accent_color:'Color Acento', currency:'Moneda',
  save_settings:'Guardar', export_data:'Exportar', import_data:'Importar',
  create_save:'Crear', save_name:'Nombre', game_version:'Versión',
  career_type:'Tipo', delete_save:'Eliminar', load_save:'Cargar',
  save:'Guardar', cancel:'Cancelar', edit:'Editar', delete:'Eliminar',
  add:'Añadir', close:'Cerrar', search:'Buscar', none:'Ninguno',
  name:'Nombre', actions:'Acciones', status:'Estado', notes:'Notas',
  wins:'Victorias', draws:'Empates', losses:'Derrotas', played:'Jugados',
  players_count:'Jugadores', starters_count:'Titulares', avg_ovr:'OVR Medio',
  avg_age:'Edad Media', squad_value:'Valor Plantilla', total_wages:'Masa Salarial',
  cards_view:'Tarjetas', table_view:'Tabla', all_status:'Todos',
  edit_player:'Editar Jugador', remove_player:'Eliminar', playstyles:'PlayStyles',
  player_info:'Info Jugador', home_away:'Local/Visitante', stats:'Estadísticas',
  foot:'Pie', skill_moves:'Regates', weak_foot:'Pie Malo', work_rates:'Ritmo',
  morale_label:'Moral', dev_plan:'Plan Desarrollo', height:'Altura', weight:'Peso',
  jersey:'Camiseta', custom_competitions:'Comp. Personalizadas', custom_trophies:'Trofeos Person.',
  data_management:'Datos',
  st_starter:'Titular', st_substitute:'Suplente', st_reserve:'Reserva',
  st_loan_listed:'En Cesión', st_transfer_listed:'En Venta', st_youth:'Juvenil',
  m_ecstatic:'Eufórico', m_happy:'Feliz', m_content:'Normal', m_unhappy:'Infeliz', m_furioso:'Furioso',
  dp_balanced:'Equilibrado', dp_defending:'Defensa', dp_physical:'Físico',
  dp_attacking:'Ataque', dp_playmaking:'Creación', dp_goalkeeping:'Portero', dp_none:'Ninguno',
  wr_high:'Alto', wr_medium:'Medio', wr_low:'Bajo',
  f_right:'Derecho', f_left:'Izquierdo', f_both:'Ambos',
}};

/* ═══════════════════════════════════════════════════
   Constants
   ═══════════════════════════════════════════════════ */
const POS = ['GK','CB','LB','RB','LWB','RWB','CDM','CM','CAM','LM','RM','LW','RW','ST','CF','LF','RF'];
const ARCHETYPES = ['Poacher','Target Forward','Advanced Forward','Inside Forward','Classic Winger','Trickster','Shadow Striker','Playmaker','Box-to-Box','Holding','Anchor','Ball-Playing Defender','Fullback'];
const COMPS = ['League','Champions League','Europa League','Conference League','FA Cup','League Cup','Super Cup','Club World Cup','Domestic Cup','Other'];
const TROPHY_TYPES = ['League Title','Champions League','Europa League','Conference League','FA Cup','League Cup','Super Cup','Club World Cup','Domestic Cup','Community Shield','Golden Boot','Golden Glove','Best Manager','Other'];
const SCOUT_REGIONS = ['South America','Europe','Africa','Asia','North America','Oceania'];
const PLAYSTYLES = ['Finesse Shot','Power Shot','Low Driven','Chip Shot','Enforcer','Gamechanger','First Touch','Press Proven','Tiki Taka','Technical','Rapid','Quick Step','Incisive Pass','Pinged Pass','Long Ball','Whipped Pass','Inventive','Intercept','Block','Slide Tackle','Anticipate','Jockey','Bruiser','Aerial Fortress','Acrobatic'];
const ROLES = ['Advanced Forward','Poacher','Target Forward','False 9','Inside Forward','Wide Playmaker','Classic Winger','Shadow Striker','Playmaker','Classic 10','Box-to-Box','Holding','Deep-Lying Playmaker','Mezzala','Wide Back','Fullback','Attacking Wingback','Ball-Playing Defender','Stopper','Sweeper','Goalkeeper','Sweeper Keeper'];

// Translated option builders
const statusOpts = (t) => [
  { v:'Starter', l:t.st_starter }, { v:'Substitute', l:t.st_substitute }, { v:'Reserve', l:t.st_reserve },
  { v:'Loan Listed', l:t.st_loan_listed }, { v:'Transfer Listed', l:t.st_transfer_listed }, { v:'Youth', l:t.st_youth }
];
const moraleOpts = (t) => [
  { v:'Ecstatic', l:t.m_ecstatic }, { v:'Happy', l:t.m_happy }, { v:'Content', l:t.m_content },
  { v:'Unhappy', l:t.m_unhappy }, { v:'Furious', l:t.m_furious }
];
const devPlanOpts = (t) => [
  { v:'Balanced', l:t.dp_balanced }, { v:'Defending', l:t.dp_defending }, { v:'Physical', l:t.dp_physical },
  { v:'Attacking', l:t.dp_attacking }, { v:'Playmaking', l:t.dp_playmaking }, { v:'Goalkeeping', l:t.dp_goalkeeping }, { v:'None', l:t.dp_none }
];
const wrOpts = (t) => {
  const h=t.wr_high, m=t.wr_medium, lo=t.wr_low;
  return [`${h}/${h}`,`${h}/${m}`,`${h}/${lo}`,`${m}/${h}`,`${m}/${m}`,`${m}/${lo}`,`${lo}/${h}`,`${lo}/${m}`,`${lo}/${lo}`];
};
const footOpts = (t) => [{ v:'Right', l:t.f_right }, { v:'Left', l:t.f_left }, { v:'Both', l:t.f_both }];
const statusLabel = (v, t) => { const o = statusOpts(t).find(x => x.v === v); return o ? o.l : v; };

const uid = () => Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
const fmt = (val, cur = 'EUR') => {
  const n = Number(val) || 0;
  const s = { EUR:'€', GBP:'£', USD:'$', BRL:'R$', ARS:'$', MXN:'$', CLP:'$', JPY:'¥', CNY:'¥', TRY:'₺' }[cur] || '€';
  if (n >= 1e6) return `${s}${(n/1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${s}${(n/1e3).toFixed(0)}K`;
  return `${s}${n}`;
};

/* ═══════════════════════════════════════════════════
   Logo
   ═══════════════════════════════════════════════════ */
const Logo = ({ size = 28, color = '#00F0FF' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <defs><linearGradient id="pL" x1="0" y1="0" x2="64" y2="64"><stop offset="0%" stopColor={color}/><stop offset="100%" stopColor="#6C5CE7"/></linearGradient></defs>
    <path d="M32 4 L56 14 L56 36 Q56 52 32 60 Q8 52 8 36 L8 14Z" fill="none" stroke="url(#pL)" strokeWidth="2" opacity="0.8"/>
    <path d="M32 10 L50 18 L50 34 Q50 47 32 54 Q14 47 14 34 L14 18Z" fill={color} opacity="0.05"/>
    <text x="32" y="40" textAnchor="middle" fill={color} fontFamily="Rajdhani,sans-serif" fontWeight="800" fontSize="26" opacity="0.85">P</text>
  </svg>
);

/* ═══════════════════════════════════════════════════
   Icons (minimal SVG)
   ═══════════════════════════════════════════════════ */
const Ic = ({ name, size=18, color='currentColor' }) => {
  const p = { width:size, height:size, viewBox:'0 0 24 24', fill:'none', stroke:color, strokeWidth:'2', strokeLinecap:'round', strokeLinejoin:'round' };
  const icons = {
    grid: <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    user: <svg {...p}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    play: <svg {...p}><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16" fill={color} opacity="0.3"/></svg>,
    save: <svg {...p}><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/></svg>,
    cog: <svg {...p}><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>,
    out: <svg {...p}><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    menu: <svg {...p}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    plus: <svg {...p} strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    trash: <svg {...p}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>,
    pen: <svg {...p}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  };
  return icons[name] || null;
};

/* ═══════════════════════════════════════════════════
   DField — Local-state input, saves onBlur
   ═══════════════════════════════════════════════════ */
function DField({ value, onSave, style, type='text', placeholder='', accent='#00F0FF' }) {
  const [v, setV] = useState(value ?? '');
  const r = useRef(null);
  useEffect(() => { setV(value ?? ''); }, [value]);
  return <input ref={r} style={style} type={type} placeholder={placeholder} value={v}
    onChange={e => setV(e.target.value)}
    onBlur={e => { const out = type==='number' ? Number(e.target.value) : e.target.value; if(out!==value) onSave(out); e.target.style.borderColor='rgba(255,255,255,0.05)'; }}
    onFocus={e => e.target.style.borderColor=`${accent}50`}
    onKeyDown={e => { if(e.key==='Enter') r.current?.blur(); }} />;
}
function DArea({ value, onSave, style, accent='#00F0FF' }) {
  const [v, setV] = useState(value ?? '');
  useEffect(() => { setV(value ?? ''); }, [value]);
  return <textarea style={style} value={v} onChange={e => setV(e.target.value)}
    onBlur={e => { if(e.target.value!==value) onSave(e.target.value); e.target.style.borderColor='rgba(255,255,255,0.05)'; }}
    onFocus={e => e.target.style.borderColor=`${accent}50`} />;
}

/* ═══════════════════════════════════════════════════
   Modal
   ═══════════════════════════════════════════════════ */
function Modal({ show, onClose, title, children, S }) {
  if(!show) return null;
  return (
    <div style={S.overlay} onClick={onClose}>
      <div style={S.modal} onClick={e=>e.stopPropagation()}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
          <div style={S.modalTitle}>{title}</div>
          <button style={{ ...S.btnGhost, padding:'4px 10px', fontSize:18 }} onClick={onClose}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   STYLES — Clean, professional dark theme
   ═══════════════════════════════════════════════════ */
const makeStyles = (ac = '#00F0FF') => {
  const bg='#060910', card='rgba(11,15,24,0.9)', solid='#0a0e17',
    srf='rgba(255,255,255,0.025)', brd='rgba(255,255,255,0.05)',
    t1='#dfe2ea', t2='rgba(255,255,255,0.4)', t3='rgba(255,255,255,0.18)';
  return {
    ac, bg, card, solid, srf, brd, t1, t2, t3,
    app:{ display:'flex', minHeight:'100vh', background:bg, fontFamily:"'Inter',sans-serif", color:t1 },
    sidebar:{ width:220, minHeight:'100vh', background:'rgba(7,10,16,0.98)', borderRight:`1px solid ${brd}`, display:'flex', flexDirection:'column', padding:'18px 0', position:'fixed', left:0, top:0, bottom:0, zIndex:100 },
    main:{ flex:1, marginLeft:220, padding:'24px 32px', minHeight:'100vh', maxWidth:1100 },
    mainM:{ marginLeft:0, padding:'64px 12px 24px' },
    sLogo:{ display:'flex', alignItems:'center', gap:8, padding:'0 16px', marginBottom:24 },
    sBrand:{ fontFamily:"'Rajdhani',sans-serif", fontSize:20, fontWeight:700, color:'#fff', letterSpacing:'0.08em' },
    nav:(a)=>({ display:'flex', alignItems:'center', gap:8, padding:'9px 16px', cursor:'pointer', fontSize:12.5, fontWeight:a?600:400, color:a?'#fff':t2, background:a?`${ac}0C`:'transparent', borderLeft:a?`2px solid ${ac}`:'2px solid transparent', transition:'all 0.1s', marginBottom:1, borderRadius:'0 6px 6px 0' }),
    navSec:{ fontSize:9, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:t3, padding:'16px 16px 4px' },
    card:{ background:card, border:`1px solid ${brd}`, borderRadius:12, padding:'20px', marginBottom:14 },
    cHead:{ fontFamily:"'Rajdhani',sans-serif", fontSize:13, fontWeight:700, marginBottom:12, color:t2, letterSpacing:'0.1em', textTransform:'uppercase' },
    sGrid:{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(130px, 1fr))', gap:8, marginBottom:16 },
    sCard:{ background:srf, border:`1px solid ${brd}`, borderRadius:10, padding:'14px 16px', position:'relative', overflow:'hidden' },
    sVal:{ fontSize:24, fontWeight:700, color:ac, fontFamily:"'Rajdhani',sans-serif", lineHeight:1 },
    sLab:{ fontSize:9, color:t3, marginTop:5, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.1em' },
    inp:{ width:'100%', padding:'10px 12px', borderRadius:8, background:srf, border:`1px solid ${brd}`, color:'#fff', fontSize:13, fontFamily:"'Inter',sans-serif", outline:'none', boxSizing:'border-box', transition:'border 0.15s' },
    sel:{ width:'100%', padding:'10px 12px', borderRadius:8, background:srf, border:`1px solid ${brd}`, color:'#fff', fontSize:13, fontFamily:"'Inter',sans-serif", outline:'none', boxSizing:'border-box', appearance:'none', cursor:'pointer' },
    lbl:{ fontSize:9.5, fontWeight:600, color:t3, marginBottom:4, display:'block', textTransform:'uppercase', letterSpacing:'0.1em' },
    fg:{ marginBottom:12 },
    fr:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 },
    fr3:{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10 },
    btn:{ padding:'9px 20px', borderRadius:8, background:`linear-gradient(135deg, ${ac}D0, #6C5CE7D0)`, color:'#fff', fontSize:12, fontWeight:600, border:'none', cursor:'pointer', fontFamily:"'Inter',sans-serif", transition:'all 0.1s' },
    btn2:{ padding:'9px 20px', borderRadius:8, background:srf, border:`1px solid ${brd}`, color:t2, fontSize:12, fontWeight:500, cursor:'pointer', fontFamily:"'Inter',sans-serif" },
    btnD:{ padding:'7px 14px', borderRadius:6, background:'rgba(255,60,60,0.06)', border:'1px solid rgba(255,60,60,0.12)', color:'#ff6b6b', fontSize:11, fontWeight:600, cursor:'pointer', fontFamily:"'Inter',sans-serif" },
    btnS:{ padding:'4px 10px', borderRadius:5, fontSize:10, fontWeight:600, border:'none', cursor:'pointer', fontFamily:"'Inter',sans-serif", background:`${ac}10`, color:ac },
    btnGhost:{ padding:'8px 16px', borderRadius:8, background:'transparent', border:`1px solid ${brd}`, color:t2, fontSize:12, cursor:'pointer', fontFamily:"'Inter',sans-serif" },
    table:{ width:'100%', borderCollapse:'separate', borderSpacing:'0 2px' },
    th:{ fontSize:9, fontWeight:700, color:t3, textTransform:'uppercase', letterSpacing:'0.1em', textAlign:'left', padding:'5px 8px' },
    td:{ padding:'8px', fontSize:11.5, color:t2, background:srf, verticalAlign:'middle' },
    overlay:{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', backdropFilter:'blur(10px)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:14 },
    modal:{ background:solid, border:`1px solid ${brd}`, borderRadius:14, padding:'24px', maxWidth:520, width:'100%', maxHeight:'85vh', overflowY:'auto' },
    modalTitle:{ fontFamily:"'Rajdhani',sans-serif", fontSize:18, fontWeight:700, letterSpacing:'0.04em' },
    tabs:{ display:'flex', gap:0, marginBottom:16, background:srf, borderRadius:8, padding:3, overflowX:'auto', border:`1px solid ${brd}` },
    tab:(a)=>({ padding:'7px 14px', fontSize:11.5, fontWeight:a?600:400, color:a?'#fff':t3, background:a?`${ac}15`:'transparent', borderRadius:6, cursor:'pointer', border:'none', fontFamily:"'Inter',sans-serif", whiteSpace:'nowrap', transition:'all 0.1s' }),
    badge:(c=ac)=>({ display:'inline-block', padding:'2px 7px', borderRadius:4, fontSize:9.5, fontWeight:700, background:`${c}10`, color:c, letterSpacing:'0.03em' }),
    empty:{ textAlign:'center', padding:'36px 16px', color:t3, fontSize:12 },
    ham:{ position:'fixed', top:12, left:12, zIndex:200, width:38, height:38, borderRadius:8, background:card, border:`1px solid ${brd}`, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' },
    mobOv:{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:99 },
    ovr:(v)=>{ const c=v>=85?'#FFD700':v>=75?'#2ecc71':v>=65?'#3498db':t2; return { width:32, height:32, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', background:`${c}0D`, border:`2px solid ${c}25`, fontSize:12, fontWeight:800, color:c, fontFamily:"'Rajdhani',sans-serif" }; },
    ssnCard:{ background:srf, border:`1px solid ${brd}`, borderRadius:8, padding:'14px 16px', marginBottom:6 },
    trophy:{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px', background:'rgba(255,215,0,0.02)', border:'1px solid rgba(255,215,0,0.06)', borderRadius:8, marginBottom:5 },
  };
};

/* ═══════════════════════════════════════════════════
   DASHBOARD
   ═══════════════════════════════════════════════════ */
function Dashboard({ saves, setPage, setActiveSave, t, S, userName }) {
  const ts = saves.reduce((s,x)=>s+(x.seasons?.length||0),0);
  const tt = saves.reduce((s,x)=>s+(x.trophies?.length||0),0);
  const tm = saves.reduce((s,x)=>s+(x.matches?.length||0),0);
  return (
    <div>
      <div style={{ marginBottom:24 }}>
        <div style={{ fontSize:11, color:S.t2 }}>{t.welcome_back}</div>
        <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:28, fontWeight:700 }}>{userName||'Manager'}</div>
      </div>
      <div style={S.sGrid}>
        {[{v:saves.length,l:t.total_saves,i:'💾'},{v:ts,l:t.total_seasons,i:'📅'},{v:tt,l:t.total_trophies,i:'🏆'},{v:tm,l:t.total_matches,i:'⚽'}].map((x,i)=>(
          <div key={i} style={S.sCard}><div style={S.sVal}>{x.v}</div><div style={S.sLab}>{x.l}</div><div style={{ position:'absolute', top:10, right:12, fontSize:18, opacity:0.1 }}>{x.i}</div></div>
        ))}
      </div>
      <div style={S.card}>
        <div style={S.cHead}>{t.quick_actions}</div>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          <button style={S.btn} onClick={()=>setPage('saves')}>{t.new_manager_career}</button>
          <button style={S.btn2} onClick={()=>setPage('saves')}>{t.new_player_career}</button>
        </div>
      </div>
      {saves.length>0 && (
        <div style={S.card}>
          <div style={S.cHead}>{t.saves} ({saves.length})</div>
          {saves.map(sv=>(
            <div key={sv.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 14px', background:S.srf, borderRadius:8, marginBottom:4, border:`1px solid ${S.brd}`, cursor:'pointer', transition:'background 0.1s' }}
              onClick={()=>{ setActiveSave(sv); setPage(sv.type==='manager'?'manager_career':'player_career'); }}
              onMouseOver={e=>e.currentTarget.style.background='rgba(255,255,255,0.04)'} onMouseOut={e=>e.currentTarget.style.background=S.srf}>
              <div>
                <div style={{ fontSize:13, fontWeight:600, marginBottom:1 }}>{sv.name}</div>
                <div style={{ fontSize:11, color:S.t2 }}>{sv.type==='manager'?t.manager_career:t.player_career} · {sv.currentTeam||'—'} · {t.season} {sv.currentSeason||1}</div>
              </div>
              <div style={S.badge(S.ac)}>{sv.gameVersion||'FC 26'}</div>
            </div>
          ))}
        </div>
      )}
      {saves.length===0 && <div style={S.card}><div style={S.empty}>{t.no_saves_yet}</div></div>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SAVES PAGE
   ═══════════════════════════════════════════════════ */
function SavesPage({ saves, setSaves, setActiveSave, setPage, saveFn, t, S }) {
  const [show, setShow] = useState(false);
  const [f, setF] = useState({ name:'', gameVersion:'EA FC 26', type:'manager' });
  const create = () => {
    const ns = { id:uid(), ...f, createdAt:new Date().toISOString(), currentSeason:1, currentTeam:'', managerName:'', managerAge:35, managerNationality:'', playerName:'', playerPosition:'ST', playerOverall:65, playerPotential:85, playerArchetype:'', squad:[], transfers:[], matches:[], trophies:[], seasons:[], teamHistory:[], youthAcademy:[], finances:{transferBudget:0,wageBudget:0}, notes:'' };
    const u = [...saves, ns]; setSaves(u); saveFn({saves:u}); setShow(false); setF({name:'',gameVersion:'EA FC 26',type:'manager'});
  };
  const del = id => { const u=saves.filter(s=>s.id!==id); setSaves(u); saveFn({saves:u}); };
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
        <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:24, fontWeight:700 }}>{t.saves}</div>
        <button style={S.btn} onClick={()=>setShow(true)}>{t.create_save}</button>
      </div>
      {saves.length===0 ? <div style={S.card}><div style={S.empty}>{t.no_saves_yet}</div></div> :
        saves.map(sv=>(
          <div key={sv.id} style={S.card}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div>
                <div style={{ fontSize:16, fontWeight:700, marginBottom:2 }}>{sv.name}</div>
                <div style={{ fontSize:12, color:S.t2 }}>{sv.type==='manager'?t.manager_career:t.player_career} · {sv.gameVersion}</div>
                {sv.currentTeam && <div style={{ fontSize:11, color:S.t3, marginTop:2 }}>{sv.currentTeam} · {t.season} {sv.currentSeason||1}</div>}
              </div>
              <div style={{ display:'flex', gap:6 }}>
                <button style={S.btn} onClick={()=>{ setActiveSave(sv); setPage(sv.type==='manager'?'manager_career':'player_career'); }}>{t.load_save}</button>
                <button style={S.btnD} onClick={()=>del(sv.id)}><Ic name="trash" size={14} color="#ff6b6b"/></button>
              </div>
            </div>
          </div>
        ))
      }
      <Modal show={show} onClose={()=>setShow(false)} title={t.create_save} S={S}>
        <div style={S.fg}><label style={S.lbl}>{t.save_name}</label><input style={S.inp} value={f.name} onChange={e=>setF({...f,name:e.target.value})} /></div>
        <div style={S.fr}>
          <div style={S.fg}><label style={S.lbl}>{t.game_version}</label><select style={S.sel} value={f.gameVersion} onChange={e=>setF({...f,gameVersion:e.target.value})}>{['EA FC 26','EA FC 25','EA FC 24'].map(v=><option key={v} value={v} style={{background:S.solid}}>{v}</option>)}</select></div>
          <div style={S.fg}><label style={S.lbl}>{t.career_type}</label><select style={S.sel} value={f.type} onChange={e=>setF({...f,type:e.target.value})}><option value="manager" style={{background:S.solid}}>{t.manager_career}</option><option value="player" style={{background:S.solid}}>{t.player_career}</option></select></div>
        </div>
        <div style={{ display:'flex', gap:8, marginTop:16 }}><button style={S.btn} onClick={create} disabled={!f.name}>{t.create_save}</button><button style={S.btn2} onClick={()=>setShow(false)}>{t.cancel}</button></div>
      </Modal>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MANAGER CAREER
   ═══════════════════════════════════════════════════ */
function ManagerPage({ save, updateSave, t, S, currency }) {
  const [tab, setTab] = useState('info');
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const up = (k,v) => updateSave({...save,[k]:v});
  const addItem = (k,item) => { up(k,[...(save[k]||[]),{id:uid(),...item}]); setModal(null); };

  const tabs = [
    {k:'info',l:t.manager_info},{k:'squad',l:t.squad},{k:'transfers',l:t.transfers},
    {k:'matches',l:t.matches},{k:'trophies',l:t.trophies},{k:'seasons',l:t.season_history},
    {k:'teams',l:t.team_history},{k:'youth',l:t.youth_academy},{k:'finances',l:t.finances}
  ];

  /* INFO */
  const Info = () => (
    <div style={S.card}>
      <div style={S.cHead}>{t.manager_info}</div>
      <div style={S.fr}>
        <div style={S.fg}><label style={S.lbl}>{t.manager_name}</label><DField style={S.inp} value={save.managerName||''} onSave={v=>up('managerName',v)} accent={S.ac}/></div>
        <div style={S.fg}><label style={S.lbl}>{t.manager_age}</label><DField style={S.inp} type="number" value={save.managerAge||35} onSave={v=>up('managerAge',v)} accent={S.ac}/></div>
      </div>
      <div style={S.fr}>
        <div style={S.fg}><label style={S.lbl}>{t.current_team}</label><DField style={S.inp} value={save.currentTeam||''} onSave={v=>up('currentTeam',v)} accent={S.ac}/></div>
        <div style={S.fg}><label style={S.lbl}>{t.league}</label><DField style={S.inp} value={save.league||''} onSave={v=>up('league',v)} accent={S.ac}/></div>
      </div>
      <div style={S.fr}>
        <div style={S.fg}><label style={S.lbl}>{t.nationality}</label><DField style={S.inp} value={save.managerNationality||''} onSave={v=>up('managerNationality',v)} accent={S.ac}/></div>
        <div style={S.fg}><label style={S.lbl}>{t.season}</label><DField style={S.inp} type="number" value={save.currentSeason||1} onSave={v=>up('currentSeason',v)} accent={S.ac}/></div>
      </div>
      <div style={S.fg}><label style={S.lbl}>{t.notes}</label><DArea style={{...S.inp,minHeight:60,resize:'vertical'}} value={save.notes||''} onSave={v=>up('notes',v)} accent={S.ac}/></div>
    </div>
  );

  /* SQUAD */
  const Squad = () => {
    const sq = save.squad||[];
    const [view, setView] = useState('cards');
    const [sort, setSort] = useState('ovr');
    const [dir, setDir] = useState('desc');
    const [fPos, setFPos] = useState('All');
    const [fSt, setFSt] = useState('All');
    const [q, setQ] = useState('');
    const [exp, setExp] = useState(null);
    const posG = {All:null,GK:['GK'],DEF:['CB','LB','RB','LWB','RWB'],MID:['CDM','CM','CAM','LM','RM'],ATK:['LW','RW','ST','CF','LF','RF']};
    const fil = sq.filter(p=>(fPos==='All'||(posG[fPos]?posG[fPos].includes(p.position):true))&&(fSt==='All'||p.status===fSt)&&(!q||p.name?.toLowerCase().includes(q.toLowerCase())));
    const sorted = [...fil].sort((a,b)=>{const va=a[sort]??0,vb=b[sort]??0;return typeof va==='string'?dir==='asc'?va.localeCompare(vb):vb.localeCompare(va):dir==='asc'?va-vb:vb-va;});
    const avg = (k)=>sq.length?Math.round(sq.reduce((s,p)=>s+(p[k]||0),0)/sq.length):0;
    const stC = { Starter:'#2ecc71', Substitute:'#f1c40f', Reserve:'#95a5a6', 'Loan Listed':'#e67e22', 'Transfer Listed':'#e74c3c', Youth:'#9b59b6' };

    return (
      <div>
        <div style={S.sGrid}>
          {[{v:sq.length,l:t.players_count},{v:sq.filter(p=>p.status==='Starter').length,l:t.starters_count},{v:avg('ovr'),l:t.avg_ovr},{v:sq.length?(sq.reduce((s,p)=>s+(p.age||0),0)/sq.length).toFixed(1):0,l:t.avg_age},{v:fmt(sq.reduce((s,p)=>s+(p.value||0),0),currency),l:t.squad_value},{v:fmt(sq.reduce((s,p)=>s+(p.wage||0),0),currency),l:t.total_wages}].map((x,i)=>(
            <div key={i} style={S.sCard}><div style={{...S.sVal,fontSize:20,color:i<3?S.ac:S.t1}}>{x.v}</div><div style={S.sLab}>{x.l}</div></div>
          ))}
        </div>
        {/* Toolbar */}
        <div style={{ display:'flex', gap:6, marginBottom:12, flexWrap:'wrap', alignItems:'center' }}>
          <input style={{...S.inp,width:150,marginBottom:0,padding:'7px 10px',fontSize:11}} placeholder={`🔍 ${t.search}...`} value={q} onChange={e=>setQ(e.target.value)}/>
          {['All','GK','DEF','MID','ATK'].map(f=><button key={f} onClick={()=>setFPos(f)} style={{...S.btnS,background:fPos===f?`${S.ac}18`:S.srf,color:fPos===f?S.ac:S.t3,border:fPos===f?`1px solid ${S.ac}25`:'1px solid transparent',padding:'4px 8px',fontSize:9.5}}>{f}</button>)}
          <select style={{...S.sel,width:'auto',padding:'5px 8px',fontSize:10,marginBottom:0}} value={fSt} onChange={e=>setFSt(e.target.value)}>
            <option value="All" style={{background:S.solid}}>{t.all_status}</option>
            {statusOpts(t).map(o=><option key={o.v} value={o.v} style={{background:S.solid}}>{o.l}</option>)}
          </select>
          <div style={{ marginLeft:'auto', display:'flex', gap:4 }}>
            {['cards','table'].map(v=><button key={v} onClick={()=>setView(v)} style={{...S.btnS,background:view===v?`${S.ac}18`:S.srf,color:view===v?S.ac:S.t3,fontSize:9}}>{v==='cards'?t.cards_view:t.table_view}</button>)}
          </div>
          <button style={S.btn} onClick={()=>{setForm({name:'',position:'ST',age:20,ovr:70,pot:80,value:0,wage:0,contract:'2028',role:'',loan:false,status:'Starter',foot:'Right',skillMoves:3,weakFoot:3,workRates:`${t.wr_high}/${t.wr_medium}`,nationality:'',jerseyNumber:'',height:'',weight:'',morale:'Content',devPlan:'Balanced',playStyles:[],notes:''});setModal('player');}}>{t.add_player}</button>
        </div>
        {/* Cards */}
        {view==='cards' && (sorted.length===0?<div style={S.empty}>{t.none}</div>:sorted.map((p,i)=>{
          const ri=sq.findIndex(x=>x.id===p.id); const isX=exp===ri;
          const oc=p.ovr>=85?'#FFD700':p.ovr>=75?'#2ecc71':p.ovr>=65?'#3498db':'#95a5a6';
          return (
            <div key={p.id||i} style={{ background:S.srf, border:`1px solid ${isX?S.ac+'20':S.brd}`, borderRadius:10, overflow:'hidden', marginBottom:4 }}>
              <div style={{ display:'flex', alignItems:'center', padding:'10px 14px', cursor:'pointer', gap:10 }} onClick={()=>setExp(isX?null:ri)}>
                <div style={{ width:40,height:46,borderRadius:5,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:`${oc}0D`,border:`1px solid ${oc}20`,flexShrink:0 }}>
                  <div style={{ fontSize:17,fontWeight:800,color:oc,fontFamily:"'Rajdhani',sans-serif",lineHeight:1 }}>{p.ovr||'—'}</div>
                  <div style={{ fontSize:8,fontWeight:700,color:oc,opacity:0.6 }}>{p.position}</div>
                </div>
                <div style={{ flex:1,minWidth:0 }}>
                  <div style={{ display:'flex',alignItems:'center',gap:6,marginBottom:1 }}>
                    <span style={{ fontSize:13,fontWeight:600,color:'#fff' }}>{p.jerseyNumber?`#${p.jerseyNumber} `:''}{p.name||'—'}</span>
                    {p.loan && <span style={{...S.badge('#e67e22'),fontSize:8}}>LOAN</span>}
                    {p.status && <span style={{...S.badge(stC[p.status]||'#95a5a6'),fontSize:8}}>{statusLabel(p.status,t)}</span>}
                  </div>
                  <div style={{ fontSize:10,color:S.t2,display:'flex',gap:8,flexWrap:'wrap' }}>
                    <span>POT {p.pot||'—'}</span><span>{t.age} {p.age||'—'}</span>
                    {p.role && <span style={{color:S.ac}}>{p.role}</span>}
                  </div>
                </div>
                <div style={{ textAlign:'right',flexShrink:0 }}>
                  <div style={{ fontSize:12,fontWeight:700,color:S.ac }}>{fmt(p.value,currency)}</div>
                  <div style={{ fontSize:10,color:S.t3 }}>{fmt(p.wage,currency)}/w</div>
                </div>
                <span style={{ fontSize:14,color:S.t3,transform:isX?'rotate(180deg)':'',transition:'0.15s' }}>▾</span>
              </div>
              {isX && (
                <div style={{ padding:'0 14px 12px', borderTop:`1px solid ${S.brd}` }}>
                  <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(120px,1fr))',gap:6,marginTop:10 }}>
                    {[{l:t.contract,v:p.contract},{l:t.work_rates,v:p.workRates},{l:t.dev_plan,v:p.devPlan},{l:t.nationality,v:p.nationality},{l:t.height,v:p.height},{l:t.weight,v:p.weight},{l:t.foot,v:p.foot?footOpts(t).find(x=>x.v===p.foot)?.l||p.foot:''},{l:t.skill_moves,v:p.skillMoves?`⭐${p.skillMoves}`:''},{l:t.weak_foot,v:p.weakFoot?`🌟${p.weakFoot}`:''}].filter(x=>x.v).map((x,j)=>(
                      <div key={j} style={{ background:S.srf,borderRadius:6,padding:'6px 8px' }}>
                        <div style={{ fontSize:8,color:S.t3,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:1 }}>{x.l}</div>
                        <div style={{ fontSize:11,color:S.t2 }}>{x.v}</div>
                      </div>
                    ))}
                  </div>
                  {p.playStyles?.length>0 && <div style={{marginTop:8}}><div style={{fontSize:8,color:S.t3,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:4}}>{t.playstyles}</div><div style={{display:'flex',flexWrap:'wrap',gap:3}}>{p.playStyles.map((ps,j)=><span key={j} style={{...S.badge(ps.endsWith('+')?'#FFD700':S.ac),fontSize:9}}>{ps}</span>)}</div></div>}
                  {p.notes && <div style={{marginTop:6,fontSize:11,color:S.t3,fontStyle:'italic'}}>📝 {p.notes}</div>}
                  <div style={{ display:'flex',gap:4,marginTop:10 }}>
                    <button style={S.btnS} onClick={()=>{setForm({...p,_ei:ri});setModal('editPlayer');}}>✏️ {t.edit}</button>
                    <button style={{...S.btnS,background:'rgba(255,60,60,0.08)',color:'#ff6b6b'}} onClick={()=>up('squad',sq.filter((_,j)=>j!==ri))}>🗑️ {t.remove_player}</button>
                  </div>
                </div>
              )}
            </div>
          );
        }))}
        {/* Table */}
        {view==='table' && (sorted.length===0?<div style={S.empty}>{t.none}</div>:
          <div style={{overflowX:'auto'}}><table style={S.table}><thead><tr>{['#',t.player,t.position,'OVR','POT',t.age,t.role,t.status,t.value,t.wage,''].map((h,i)=><th key={i} style={S.th}>{h}</th>)}</tr></thead><tbody>
            {sorted.map((p,i)=>{const ri=sq.findIndex(x=>x.id===p.id);const oc=p.ovr>=85?'#FFD700':p.ovr>=75?'#2ecc71':p.ovr>=65?'#3498db':'#95a5a6';return(
              <tr key={p.id||i}><td style={S.td}>{p.jerseyNumber||'—'}</td><td style={{...S.td,fontWeight:600,color:'#fff'}}>{p.name}</td><td style={S.td}><span style={S.badge(S.ac)}>{p.position}</span></td><td style={S.td}><span style={{fontWeight:800,color:oc,fontFamily:"'Rajdhani',sans-serif",fontSize:14}}>{p.ovr}</span></td><td style={S.td}>{p.pot}</td><td style={S.td}>{p.age}</td><td style={{...S.td,fontSize:10}}>{p.role||'—'}</td><td style={S.td}><span style={{fontSize:9,color:p.status==='Starter'?'#2ecc71':S.t3}}>{statusLabel(p.status,t)}</span></td><td style={S.td}>{fmt(p.value,currency)}</td><td style={S.td}>{fmt(p.wage,currency)}</td><td style={S.td}><div style={{display:'flex',gap:3}}><button style={S.btnS} onClick={()=>{setForm({...p,_ei:ri});setModal('editPlayer');}}>✏️</button><button style={{...S.btnS,background:'rgba(255,60,60,0.08)',color:'#ff6b6b'}} onClick={()=>up('squad',sq.filter((_,j)=>j!==ri))}>✕</button></div></td></tr>
            );})}
          </tbody></table></div>
        )}
      </div>
    );
  };

  /* TRANSFERS */
  const Transfers = () => { const tr=save.transfers||[]; return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}><div style={S.cHead}>{t.transfers} ({tr.length})</div><button style={S.btn} onClick={()=>{setForm({playerName:'',type:'in',fee:0,from:'',to:'',season:save.currentSeason||1});setModal('transfer');}}>{t.add_transfer}</button></div>
      {tr.length===0?<div style={S.empty}>{t.none}</div>:tr.map((x,i)=>(
        <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 12px',background:S.srf,borderRadius:8,marginBottom:4,border:`1px solid ${S.brd}`}}>
          <div><div style={{fontWeight:600,fontSize:13,marginBottom:1}}>{x.playerName}</div><div style={{fontSize:10,color:S.t2}}>{x.from} → {x.to} · {t.season} {x.season}</div></div>
          <div style={{display:'flex',alignItems:'center',gap:8}}><span style={S.badge(x.type==='in'?'#2ecc71':x.type==='out'?'#e74c3c':'#f1c40f')}>{x.type==='in'?t.transfer_in:x.type==='out'?t.transfer_out:t.loan}</span><span style={{fontWeight:700,color:S.ac,fontSize:12}}>{fmt(x.fee,currency)}</span><button style={{...S.btnD,padding:'3px 6px'}} onClick={()=>up('transfers',tr.filter((_,j)=>j!==i))}>✕</button></div>
        </div>
      ))}
    </div>
  );};

  /* MATCHES */
  const Matches = () => { const m=save.matches||[];const w=m.filter(x=>x.result==='win').length,d=m.filter(x=>x.result==='draw').length,l=m.filter(x=>x.result==='loss').length; return (
    <div>
      <div style={S.sGrid}>{[{v:w,l:t.wins,c:'#2ecc71'},{v:d,l:t.draws,c:'#f1c40f'},{v:l,l:t.losses,c:'#e74c3c'},{v:m.length,l:t.played,c:S.ac}].map((x,i)=><div key={i} style={S.sCard}><div style={{...S.sVal,color:x.c,fontSize:20}}>{x.v}</div><div style={S.sLab}>{x.l}</div></div>)}</div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}><div style={S.cHead}>{t.matches}</div><button style={S.btn} onClick={()=>{setForm({opponent:'',score:'',result:'win',competition:'League',scorers:'',motm:'',season:save.currentSeason||1,homeAway:'home'});setModal('match');}}>{t.add_match}</button></div>
      {m.length===0?<div style={S.empty}>{t.none}</div>:m.slice().reverse().map((x,i)=>(
        <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 12px',background:S.srf,borderRadius:8,marginBottom:3,border:`1px solid ${S.brd}`}}>
          <div><div style={{fontWeight:600,fontSize:12,marginBottom:1}}><span style={{color:x.result==='win'?'#2ecc71':x.result==='draw'?'#f1c40f':'#e74c3c'}}>●</span> {x.homeAway==='home'?`${save.currentTeam||'—'} ${x.score} ${x.opponent}`:`${x.opponent} ${x.score} ${save.currentTeam||'—'}`}</div><div style={{fontSize:10,color:S.t2}}>{x.competition} · {t.season} {x.season}{x.scorers?` · ⚽ ${x.scorers}`:''}{x.motm?` · ⭐ ${x.motm}`:''}</div></div>
          <button style={{...S.btnD,padding:'3px 6px'}} onClick={()=>up('matches',(save.matches||[]).filter((_,j)=>j!==(save.matches.length-1-i)))}>✕</button>
        </div>
      ))}
    </div>
  );};

  /* TROPHIES */
  const Trophies = () => { const tr=save.trophies||[]; return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}><div style={S.cHead}>{t.trophies} ({tr.length})</div><button style={S.btn} onClick={()=>{setForm({name:'League Title',season:save.currentSeason||1,team:save.currentTeam||''});setModal('trophy');}}>{t.add_trophy}</button></div>
      {tr.length===0?<div style={S.empty}>{t.none}</div>:tr.map((x,i)=><div key={i} style={S.trophy}><span style={{fontSize:22}}>🏆</span><div style={{flex:1}}><div style={{fontWeight:600,fontSize:13}}>{x.name}</div><div style={{fontSize:10,color:S.t2}}>{x.team} · {t.season} {x.season}</div></div><button style={{...S.btnD,padding:'3px 6px'}} onClick={()=>up('trophies',tr.filter((_,j)=>j!==i))}>✕</button></div>)}
    </div>
  );};

  /* SEASONS */
  const Seasons = () => { const ss=save.seasons||[]; return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}><div style={S.cHead}>{t.season_history}</div><button style={S.btn} onClick={()=>{setForm({seasonNum:save.currentSeason||1,team:save.currentTeam||'',league:save.league||'',leaguePosition:1,topScorer:'',bestSigning:'',notes:''});setModal('season');}}>{t.end_season}</button></div>
      {ss.length===0?<div style={S.empty}>{t.none}</div>:ss.map((x,i)=><div key={i} style={S.ssnCard}><div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}><div><div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:16,fontWeight:700}}>{t.season} {x.seasonNum}</div><div style={{fontSize:11,color:S.t2}}>{x.team} · {x.league}</div></div><span style={S.badge(S.ac)}>#{x.leaguePosition}</span></div>{x.topScorer&&<div style={{fontSize:10,color:S.t2,marginTop:4}}>⚽ {t.top_scorer}: {x.topScorer}</div>}{x.bestSigning&&<div style={{fontSize:10,color:S.t2}}>🔄 {t.best_signing}: {x.bestSigning}</div>}{x.notes&&<div style={{fontSize:10,color:S.t3,marginTop:2}}>{x.notes}</div>}</div>)}
    </div>
  );};

  /* TEAMS */
  const Teams = () => { const h=save.teamHistory||[]; return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}><div style={S.cHead}>{t.team_history}</div><button style={S.btn} onClick={()=>{setForm({team:'',league:'',reason:'hired',season:save.currentSeason||1});setModal('teamChange');}}>{t.change_team}</button></div>
      {h.length===0?<div style={S.empty}>{t.none}</div>:h.map((x,i)=><div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 12px',background:S.srf,borderRadius:8,marginBottom:4,border:`1px solid ${S.brd}`}}><span style={{fontSize:20}}>🏟️</span><div style={{flex:1}}><div style={{fontWeight:600,fontSize:13}}>{x.team}</div><div style={{fontSize:10,color:S.t2}}>{x.league} · {t.season} {x.season}</div></div><span style={S.badge(x.reason==='hired'?'#2ecc71':x.reason==='fired'?'#e74c3c':'#f1c40f')}>{t[x.reason]||x.reason}</span></div>)}
    </div>
  );};

  /* YOUTH */
  const Youth = () => { const y=save.youthAcademy||[]; return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}><div style={S.cHead}>{t.youth_academy} ({y.length})</div><button style={S.btn} onClick={()=>{setForm({name:'',position:'ST',ovr:55,potential:80,age:16,region:'Europe'});setModal('youth');}}>{t.add_youth}</button></div>
      {y.length===0?<div style={S.empty}>{t.none}</div>:
        <table style={S.table}><thead><tr>{[t.name,t.position,'OVR',t.potential,t.age,t.scout_region,''].map((h,i)=><th key={i} style={S.th}>{h}</th>)}</tr></thead><tbody>
          {y.map((x,i)=><tr key={i}><td style={{...S.td,fontWeight:600,color:'#fff'}}>{x.name}</td><td style={S.td}><span style={S.badge(S.ac)}>{x.position}</span></td><td style={S.td}><div style={S.ovr(x.ovr)}>{x.ovr}</div></td><td style={S.td}>{x.potential}</td><td style={S.td}>{x.age}</td><td style={S.td}>{x.region}</td><td style={S.td}><button style={S.btnD} onClick={()=>up('youthAcademy',y.filter((_,j)=>j!==i))}>✕</button></td></tr>)}
        </tbody></table>
      }
    </div>
  );};

  /* FINANCES */
  const Finances = () => { const f=save.finances||{}; return (
    <div style={S.card}>
      <div style={S.cHead}>{t.finances}</div>
      <div style={S.fr}>
        <div style={S.fg}><label style={S.lbl}>{t.transfer_budget}</label><DField style={S.inp} type="number" value={f.transferBudget||0} onSave={v=>up('finances',{...f,transferBudget:Number(v)})} accent={S.ac}/></div>
        <div style={S.fg}><label style={S.lbl}>{t.wage_budget}</label><DField style={S.inp} type="number" value={f.wageBudget||0} onSave={v=>up('finances',{...f,wageBudget:Number(v)})} accent={S.ac}/></div>
      </div>
      <div style={S.sGrid}>
        <div style={S.sCard}><div style={S.sVal}>{fmt(f.transferBudget,currency)}</div><div style={S.sLab}>{t.transfer_budget}</div></div>
        <div style={S.sCard}><div style={S.sVal}>{fmt(f.wageBudget,currency)}</div><div style={S.sLab}>{t.wage_budget}</div></div>
      </div>
    </div>
  );};

  /* MODALS */
  const renderModal = () => {
    if(!modal) return null;
    const playerFields = [
      {n:'name',l:t.player,tp:'text'},{n:'jerseyNumber',l:t.jersey,tp:'number'},{n:'position',l:t.position,tp:'select',opts:POS},{n:'ovr',l:'OVR',tp:'number'},{n:'pot',l:'POT',tp:'number'},{n:'age',l:t.age,tp:'number'},{n:'value',l:t.value,tp:'number'},{n:'wage',l:t.wage,tp:'number'},{n:'contract',l:t.contract,tp:'text'},{n:'status',l:t.status,tp:'tselect',opts:statusOpts(t)},{n:'role',l:t.role,tp:'select',opts:['',...ROLES]},{n:'foot',l:t.foot,tp:'tselect',opts:footOpts(t)},{n:'skillMoves',l:t.skill_moves,tp:'number'},{n:'weakFoot',l:t.weak_foot,tp:'number'},{n:'workRates',l:t.work_rates,tp:'select',opts:wrOpts(t)},{n:'nationality',l:t.nationality,tp:'text'},{n:'height',l:t.height,tp:'text'},{n:'weight',l:t.weight,tp:'text'},{n:'morale',l:t.morale_label,tp:'tselect',opts:moraleOpts(t)},{n:'devPlan',l:t.dev_plan,tp:'tselect',opts:devPlanOpts(t)},{n:'loan',l:t.loan,tp:'select',opts:['false','true']},{n:'notes',l:t.notes,tp:'text'}
    ];
    const mods = {
      player:{title:t.add_player,key:'squad',fields:playerFields},
      editPlayer:{title:`✏️ ${t.edit_player}`,fields:playerFields},
      transfer:{title:t.add_transfer,key:'transfers',fields:[{n:'playerName',l:t.player,tp:'text'},{n:'type',l:t.type,tp:'select',opts:['in','out','loan_in','loan_out']},{n:'fee',l:t.fee,tp:'number'},{n:'from',l:t.from,tp:'text'},{n:'to',l:t.to,tp:'text'},{n:'season',l:t.season,tp:'number'}]},
      match:{title:t.add_match,key:'matches',fields:[{n:'opponent',l:t.opponent,tp:'text'},{n:'score',l:t.score,tp:'text'},{n:'result',l:t.result,tp:'select',opts:['win','draw','loss']},{n:'competition',l:t.competition,tp:'select',opts:COMPS},{n:'homeAway',l:t.home_away,tp:'select',opts:['home','away']},{n:'scorers',l:t.scorers,tp:'text'},{n:'motm',l:t.motm,tp:'text'},{n:'season',l:t.season,tp:'number'}]},
      trophy:{title:t.add_trophy,key:'trophies',fields:[{n:'name',l:t.trophy_name,tp:'select',opts:TROPHY_TYPES},{n:'season',l:t.season,tp:'number'},{n:'team',l:t.current_team,tp:'text'}]},
      season:{title:t.end_season,key:'seasons',fields:[{n:'seasonNum',l:t.season,tp:'number'},{n:'team',l:t.current_team,tp:'text'},{n:'league',l:t.league,tp:'text'},{n:'leaguePosition',l:t.league_position,tp:'number'},{n:'topScorer',l:t.top_scorer,tp:'text'},{n:'bestSigning',l:t.best_signing,tp:'text'},{n:'notes',l:t.notes,tp:'text'}]},
      teamChange:{title:t.change_team,key:'teamHistory',fields:[{n:'team',l:t.current_team,tp:'text'},{n:'league',l:t.league,tp:'text'},{n:'reason',l:t.reason,tp:'select',opts:['hired','resigned','fired']},{n:'season',l:t.season,tp:'number'}]},
      youth:{title:t.add_youth,key:'youthAcademy',fields:[{n:'name',l:t.name,tp:'text'},{n:'position',l:t.position,tp:'select',opts:POS},{n:'ovr',l:'OVR',tp:'number'},{n:'potential',l:t.potential,tp:'number'},{n:'age',l:t.age,tp:'number'},{n:'region',l:t.scout_region,tp:'select',opts:SCOUT_REGIONS}]}
    };
    const cfg = mods[modal]; if(!cfg) return null;

    if(modal==='editPlayer') {
      return <Modal show onClose={()=>setModal(null)} title={cfg.title} S={S}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
          {cfg.fields.map(f=><div key={f.n} style={S.fg}><label style={S.lbl}>{f.l}</label>
            {f.tp==='select'?<select style={S.sel} value={String(form[f.n]??'')} onChange={e=>setForm({...form,[f.n]:e.target.value})}>{f.opts.map(o=><option key={o} value={o} style={{background:S.solid}}>{o}</option>)}</select>
            :f.tp==='tselect'?<select style={S.sel} value={String(form[f.n]??'')} onChange={e=>setForm({...form,[f.n]:e.target.value})}>{f.opts.map(o=><option key={o.v} value={o.v} style={{background:S.solid}}>{o.l}</option>)}</select>
            :<input style={S.inp} type={f.tp} value={form[f.n]??''} onChange={e=>setForm({...form,[f.n]:f.tp==='number'?Number(e.target.value):e.target.value})}/>}
          </div>)}
        </div>
        <div style={{display:'flex',gap:8,marginTop:14}}>
          <button style={S.btn} onClick={()=>{const{_ei,...d}=form;d.loan=d.loan==='true'||d.loan===true;const u=[...(save.squad||[])];u[_ei]={...u[_ei],...d};up('squad',u);setModal(null);}}>{t.save}</button>
          <button style={S.btn2} onClick={()=>setModal(null)}>{t.cancel}</button>
        </div>
      </Modal>;
    }

    return <Modal show onClose={()=>setModal(null)} title={cfg.title} S={S}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
        {cfg.fields.map(f=><div key={f.n} style={S.fg}><label style={S.lbl}>{f.l}</label>
          {f.tp==='select'?<select style={S.sel} value={form[f.n]||''} onChange={e=>setForm({...form,[f.n]:e.target.value})}>{f.opts.map(o=><option key={o} value={o} style={{background:S.solid}}>{o}</option>)}</select>
          :f.tp==='tselect'?<select style={S.sel} value={form[f.n]||''} onChange={e=>setForm({...form,[f.n]:e.target.value})}>{f.opts.map(o=><option key={o.v} value={o.v} style={{background:S.solid}}>{o.l}</option>)}</select>
          :<input style={S.inp} type={f.tp} value={form[f.n]||''} onChange={e=>setForm({...form,[f.n]:f.tp==='number'?Number(e.target.value):e.target.value})}/>}
        </div>)}
      </div>
      <div style={{display:'flex',gap:8,marginTop:14}}>
        <button style={S.btn} onClick={()=>{const d={...form};if(d.loan!==undefined)d.loan=d.loan==='true'||d.loan===true;addItem(cfg.key,d);if(modal==='teamChange'){up('currentTeam',form.team);up('league',form.league);}if(modal==='season')up('currentSeason',(save.currentSeason||1)+1);}}>{t.save}</button>
        <button style={S.btn2} onClick={()=>setModal(null)}>{t.cancel}</button>
      </div>
    </Modal>;
  };

  const content = {info:<Info/>,squad:<Squad/>,transfers:<Transfers/>,matches:<Matches/>,trophies:<Trophies/>,seasons:<Seasons/>,teams:<Teams/>,youth:<Youth/>,finances:<Finances/>};

  return (
    <div>
      <div style={{background:`linear-gradient(135deg, ${S.ac}06 0%, rgba(108,92,231,0.04) 100%)`,border:`1px solid ${S.brd}`,borderRadius:12,padding:'20px 24px',marginBottom:16,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
        <div>
          <div style={{fontSize:10,color:S.t3,fontWeight:600,letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:2}}>{save.name}</div>
          <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:24,fontWeight:700,lineHeight:1.1}}>{save.managerName||t.manager_career}</div>
          <div style={{fontSize:12,color:S.t2,marginTop:3,display:'flex',gap:10}}>{save.currentTeam&&<span style={{color:S.ac,fontWeight:600}}>{save.currentTeam}</span>}{save.league&&<span>· {save.league}</span>}<span>· {t.season} {save.currentSeason||1}</span></div>
        </div>
        <div style={{display:'flex',gap:14}}>{[{v:save.squad?.length||0,l:t.squad},{v:save.trophies?.length||0,l:t.trophies},{v:save.matches?.length||0,l:t.matches}].map((x,i)=><div key={i} style={{textAlign:'center'}}><div style={{fontSize:20,fontWeight:700,color:S.ac,fontFamily:"'Rajdhani',sans-serif",lineHeight:1}}>{x.v}</div><div style={{fontSize:8,color:S.t3,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',marginTop:1}}>{x.l}</div></div>)}</div>
      </div>
      <div style={S.tabs}>{tabs.map(x=><button key={x.k} style={S.tab(tab===x.k)} onClick={()=>setTab(x.k)}>{x.l}</button>)}</div>
      {content[tab]}
      {renderModal()}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PLAYER CAREER (simplified)
   ═══════════════════════════════════════════════════ */
function PlayerPage({ save, updateSave, t, S, currency }) {
  const [tab, setTab] = useState('info');
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const up = (k,v) => updateSave({...save,[k]:v});
  const addItem = (k,item) => { up(k,[...(save[k]||[]),{id:uid(),...item}]); setModal(null); };
  const tabs = [{k:'info',l:t.player_info},{k:'matches',l:t.matches},{k:'trophies',l:t.trophies},{k:'seasons',l:t.season_history},{k:'teams',l:t.team_history}];

  const Info = () => (
    <div>
      <div style={S.card}>
        <div style={S.cHead}>{t.player_info}</div>
        <div style={S.fr}><div style={S.fg}><label style={S.lbl}>{t.player_name}</label><DField style={S.inp} value={save.playerName||''} onSave={v=>up('playerName',v)} accent={S.ac}/></div><div style={S.fg}><label style={S.lbl}>{t.position}</label><select style={S.sel} value={save.playerPosition||'ST'} onChange={e=>up('playerPosition',e.target.value)}>{POS.map(p=><option key={p} value={p} style={{background:S.solid}}>{p}</option>)}</select></div></div>
        <div style={S.fr3}><div style={S.fg}><label style={S.lbl}>{t.overall}</label><DField style={S.inp} type="number" value={save.playerOverall||65} onSave={v=>up('playerOverall',v)} accent={S.ac}/></div><div style={S.fg}><label style={S.lbl}>{t.potential}</label><DField style={S.inp} type="number" value={save.playerPotential||85} onSave={v=>up('playerPotential',v)} accent={S.ac}/></div><div style={S.fg}><label style={S.lbl}>{t.archetype}</label><select style={S.sel} value={save.playerArchetype||''} onChange={e=>up('playerArchetype',e.target.value)}><option value="" style={{background:S.solid}}>—</option>{ARCHETYPES.map(a=><option key={a} value={a} style={{background:S.solid}}>{a}</option>)}</select></div></div>
        <div style={S.fr}><div style={S.fg}><label style={S.lbl}>{t.current_team}</label><DField style={S.inp} value={save.currentTeam||''} onSave={v=>up('currentTeam',v)} accent={S.ac}/></div><div style={S.fg}><label style={S.lbl}>{t.season}</label><DField style={S.inp} type="number" value={save.currentSeason||1} onSave={v=>up('currentSeason',v)} accent={S.ac}/></div></div>
      </div>
      <div style={S.sGrid}>{[{v:save.playerOverall||'—',l:t.overall},{v:save.playerPotential||'—',l:t.potential},{v:save.matches?.length||0,l:t.appearances},{v:save.trophies?.length||0,l:t.trophies}].map((x,i)=><div key={i} style={S.sCard}><div style={{...S.sVal,color:i===0?S.ac:S.t1}}>{x.v}</div><div style={S.sLab}>{x.l}</div></div>)}</div>
    </div>
  );

  const MatchesP = () => { const m=save.matches||[]; return (
    <div>
      <div style={S.sGrid}>{[{v:m.reduce((s,x)=>s+(x.goals||0),0),l:t.goals,c:'#2ecc71'},{v:m.reduce((s,x)=>s+(x.assists||0),0),l:t.assists,c:'#3498db'},{v:m.length>0?(m.reduce((s,x)=>s+(x.rating||0),0)/m.length).toFixed(1):'—',l:t.rating,c:S.ac}].map((x,i)=><div key={i} style={S.sCard}><div style={{...S.sVal,color:x.c,fontSize:20}}>{x.v}</div><div style={S.sLab}>{x.l}</div></div>)}</div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}><div style={S.cHead}>{t.matches} ({m.length})</div><button style={S.btn} onClick={()=>{setForm({opponent:'',score:'',result:'win',competition:'League',goals:0,assists:0,rating:7.0,season:save.currentSeason||1});setModal('match');}}>{t.add_match}</button></div>
      {m.slice().reverse().map((x,i)=><div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 12px',background:S.srf,borderRadius:8,marginBottom:3,border:`1px solid ${S.brd}`}}><div><div style={{fontWeight:600,fontSize:12}}><span style={{color:x.result==='win'?'#2ecc71':x.result==='draw'?'#f1c40f':'#e74c3c'}}>●</span> vs {x.opponent} — {x.score}</div><div style={{fontSize:10,color:S.t2}}>{x.competition} · ⚽{x.goals||0} · 🅰️{x.assists||0} · ⭐{x.rating||'—'}</div></div><button style={{...S.btnD,padding:'3px 6px'}} onClick={()=>up('matches',(save.matches||[]).filter((_,j)=>j!==(save.matches.length-1-i)))}>✕</button></div>)}
      {m.length===0&&<div style={S.empty}>{t.none}</div>}
    </div>
  );};

  const TrophiesP = () => { const tr=save.trophies||[]; return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}><div style={S.cHead}>{t.trophies} ({tr.length})</div><button style={S.btn} onClick={()=>{setForm({name:'League Title',season:save.currentSeason||1,team:save.currentTeam||''});setModal('trophy');}}>{t.add_trophy}</button></div>
      {tr.map((x,i)=><div key={i} style={S.trophy}><span style={{fontSize:22}}>🏆</span><div style={{flex:1}}><div style={{fontWeight:600,fontSize:13}}>{x.name}</div><div style={{fontSize:10,color:S.t2}}>{x.team} · {t.season} {x.season}</div></div><button style={{...S.btnD,padding:'3px 6px'}} onClick={()=>up('trophies',tr.filter((_,j)=>j!==i))}>✕</button></div>)}
      {tr.length===0&&<div style={S.empty}>{t.none}</div>}
    </div>
  );};

  const SeasonsP = () => { const ss=save.seasons||[]; return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}><div style={S.cHead}>{t.season_history}</div><button style={S.btn} onClick={()=>{setForm({seasonNum:save.currentSeason||1,team:save.currentTeam||'',goals:0,assists:0,appearances:0,avgRating:7.0,notes:''});setModal('season');}}>{t.end_season}</button></div>
      {ss.map((x,i)=><div key={i} style={S.ssnCard}><div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:15,fontWeight:700}}>{t.season} {x.seasonNum}</div><div style={{fontSize:11,color:S.t2}}>{x.team}</div><div style={{display:'flex',gap:12,fontSize:11,color:S.t2,marginTop:4}}><span>⚽ {x.goals||0}</span><span>🅰️ {x.assists||0}</span><span>📊 {x.appearances||0}</span><span>⭐ {x.avgRating||'—'}</span></div>{x.notes&&<div style={{fontSize:10,color:S.t3,marginTop:2}}>{x.notes}</div>}</div>)}
      {ss.length===0&&<div style={S.empty}>{t.none}</div>}
    </div>
  );};

  const TeamsP = () => { const h=save.teamHistory||[]; return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}><div style={S.cHead}>{t.team_history}</div><button style={S.btn} onClick={()=>{setForm({team:'',reason:'transfer',season:save.currentSeason||1});setModal('teamChange');}}>{t.change_team}</button></div>
      {h.map((x,i)=><div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 12px',background:S.srf,borderRadius:8,marginBottom:4,border:`1px solid ${S.brd}`}}><span style={{fontSize:20}}>🏟️</span><div><div style={{fontWeight:600}}>{x.team}</div><div style={{fontSize:10,color:S.t2}}>{t.season} {x.season} · {x.reason}</div></div></div>)}
      {h.length===0&&<div style={S.empty}>{t.none}</div>}
    </div>
  );};

  const renderModal = () => {
    if(!modal) return null;
    const mods = {
      match:{title:t.add_match,key:'matches',fields:[{n:'opponent',l:t.opponent,tp:'text'},{n:'score',l:t.score,tp:'text'},{n:'result',l:t.result,tp:'select',opts:['win','draw','loss']},{n:'competition',l:t.competition,tp:'select',opts:COMPS},{n:'goals',l:t.goals,tp:'number'},{n:'assists',l:t.assists,tp:'number'},{n:'rating',l:t.rating,tp:'number'},{n:'season',l:t.season,tp:'number'}]},
      trophy:{title:t.add_trophy,key:'trophies',fields:[{n:'name',l:t.trophy_name,tp:'select',opts:TROPHY_TYPES},{n:'season',l:t.season,tp:'number'},{n:'team',l:t.current_team,tp:'text'}]},
      season:{title:t.end_season,key:'seasons',fields:[{n:'seasonNum',l:t.season,tp:'number'},{n:'team',l:t.current_team,tp:'text'},{n:'goals',l:t.goals,tp:'number'},{n:'assists',l:t.assists,tp:'number'},{n:'appearances',l:t.appearances,tp:'number'},{n:'avgRating',l:t.rating,tp:'number'},{n:'notes',l:t.notes,tp:'text'}]},
      teamChange:{title:t.change_team,key:'teamHistory',fields:[{n:'team',l:t.current_team,tp:'text'},{n:'reason',l:t.reason,tp:'select',opts:['transfer','loan','released','free agent']},{n:'season',l:t.season,tp:'number'}]}
    };
    const cfg=mods[modal]; if(!cfg) return null;
    return <Modal show onClose={()=>setModal(null)} title={cfg.title} S={S}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>{cfg.fields.map(f=><div key={f.n} style={S.fg}><label style={S.lbl}>{f.l}</label>{f.tp==='select'?<select style={S.sel} value={form[f.n]||''} onChange={e=>setForm({...form,[f.n]:e.target.value})}>{f.opts.map(o=><option key={o} value={o} style={{background:S.solid}}>{o}</option>)}</select>:<input style={S.inp} type={f.tp} value={form[f.n]||''} onChange={e=>setForm({...form,[f.n]:f.tp==='number'?Number(e.target.value):e.target.value})}/>}</div>)}</div>
      <div style={{display:'flex',gap:8,marginTop:14}}>
        <button style={S.btn} onClick={()=>{addItem(cfg.key,form);if(modal==='teamChange')up('currentTeam',form.team);if(modal==='season')up('currentSeason',(save.currentSeason||1)+1);}}>{t.save}</button>
        <button style={S.btn2} onClick={()=>setModal(null)}>{t.cancel}</button>
      </div>
    </Modal>;
  };

  const content = {info:<Info/>,matches:<MatchesP/>,trophies:<TrophiesP/>,seasons:<SeasonsP/>,teams:<TeamsP/>};

  return (
    <div>
      <div style={{background:`linear-gradient(135deg, ${S.ac}06 0%, rgba(108,92,231,0.04) 100%)`,border:`1px solid ${S.brd}`,borderRadius:12,padding:'20px 24px',marginBottom:16,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
        <div>
          <div style={{fontSize:10,color:S.t3,fontWeight:600,letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:2}}>{save.name}</div>
          <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:24,fontWeight:700,lineHeight:1.1}}>{save.playerName||t.player_career}</div>
          <div style={{fontSize:12,color:S.t2,marginTop:3,display:'flex',gap:10}}>{save.currentTeam&&<span style={{color:S.ac,fontWeight:600}}>{save.currentTeam}</span>}{save.playerPosition&&<span>· {save.playerPosition}</span>}<span>· {t.season} {save.currentSeason||1}</span></div>
        </div>
        <div style={{display:'flex',gap:14}}>{[{v:save.playerOverall||'—',l:t.overall},{v:save.playerPotential||'—',l:t.potential},{v:save.trophies?.length||0,l:t.trophies}].map((x,i)=><div key={i} style={{textAlign:'center'}}><div style={{fontSize:20,fontWeight:700,color:i===0?S.ac:S.t1,fontFamily:"'Rajdhani',sans-serif",lineHeight:1}}>{x.v}</div><div style={{fontSize:8,color:S.t3,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',marginTop:1}}>{x.l}</div></div>)}</div>
      </div>
      <div style={S.tabs}>{tabs.map(x=><button key={x.k} style={S.tab(tab===x.k)} onClick={()=>setTab(x.k)}>{x.l}</button>)}</div>
      {content[tab]}
      {renderModal()}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SETTINGS
   ═══════════════════════════════════════════════════ */
function SettingsPage({ settings, setSettings, saveFn, saves, setSaves, t, S }) {
  const colors = ['#00F0FF','#6C5CE7','#2ecc71','#e74c3c','#f1c40f','#e67e22','#1abc9c','#9b59b6','#FF6B9D','#00D2FF','#FF4757','#7BED9F','#70A1FF'];
  const [cc,setCc] = useState('');
  const [ct,setCt] = useState('');
  const addC = (k,v) => { if(!v.trim()) return; const l=settings[k]||[]; if(!l.includes(v.trim())) setSettings({...settings,[k]:[...l,v.trim()]}); };
  const remC = (k,v) => setSettings({...settings,[k]:(settings[k]||[]).filter(x=>x!==v)});
  const exp = () => { const d=JSON.stringify({settings,saves},null,2);const b=new Blob([d],{type:'application/json'});const u=URL.createObjectURL(b);const a=document.createElement('a');a.href=u;a.download=`playr-${new Date().toISOString().slice(0,10)}.json`;a.click(); };
  const imp = () => { const i=document.createElement('input');i.type='file';i.accept='.json';i.onchange=async(e)=>{const f=e.target.files[0];if(!f)return;try{const d=JSON.parse(await f.text());if(d.settings)setSettings(d.settings);if(d.saves)setSaves(d.saves);saveFn({settings:d.settings||settings,saves:d.saves||saves});}catch{}}; i.click(); };
  return (
    <div>
      <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:24,fontWeight:700,marginBottom:20}}>{t.settings}</div>
      <div style={S.card}><div style={S.cHead}>{t.language}</div><div style={{display:'flex',gap:8,flexWrap:'wrap'}}>{[{c:'pt-BR',l:'🇧🇷 Português'},{c:'en',l:'🇬🇧 English'},{c:'es',l:'🇪🇸 Español'}].map(x=><button key={x.c} style={{...S.btn2,...(settings.language===x.c?{background:`${S.ac}12`,color:S.ac}:{})}} onClick={()=>setSettings({...settings,language:x.c})}>{x.l}</button>)}</div></div>
      <div style={S.card}><div style={S.cHead}>{t.accent_color}</div><div style={{display:'flex',gap:8,flexWrap:'wrap'}}>{colors.map(c=><div key={c} onClick={()=>setSettings({...settings,accentColor:c})} style={{width:32,height:32,borderRadius:8,background:c,cursor:'pointer',border:settings.accentColor===c?'2px solid #fff':'2px solid transparent',boxShadow:settings.accentColor===c?`0 0 12px ${c}40`:'none'}}/>)}<input type="color" value={settings.accentColor||'#00F0FF'} onChange={e=>setSettings({...settings,accentColor:e.target.value})} style={{width:32,height:32,borderRadius:8,border:'none',cursor:'pointer',padding:0}}/></div></div>
      <div style={S.card}><div style={S.cHead}>{t.currency}</div><div style={{display:'flex',gap:6,flexWrap:'wrap'}}>{['EUR','GBP','USD','BRL','ARS','MXN','JPY','TRY'].map(c=><button key={c} style={{...S.btn2,padding:'6px 12px',...(settings.currency===c?{background:`${S.ac}12`,color:S.ac}:{})}} onClick={()=>setSettings({...settings,currency:c})}>{c}</button>)}</div></div>
      <div style={S.card}><div style={S.cHead}>{t.custom_competitions}</div><div style={{display:'flex',gap:6,marginBottom:8}}><input style={{...S.inp,flex:1,marginBottom:0}} value={cc} onChange={e=>setCc(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){addC('customCompetitions',cc);setCc('');}}} placeholder="Ex: Brasileirão..."/><button style={S.btn} onClick={()=>{addC('customCompetitions',cc);setCc('');}}>+</button></div><div style={{display:'flex',flexWrap:'wrap',gap:4}}>{(settings.customCompetitions||[]).map((c,i)=><span key={i} style={{...S.badge(S.ac),display:'flex',alignItems:'center',gap:4}}>{c}<span onClick={()=>remC('customCompetitions',c)} style={{cursor:'pointer',opacity:0.5}}>×</span></span>)}</div></div>
      <div style={S.card}><div style={S.cHead}>{t.custom_trophies}</div><div style={{display:'flex',gap:6,marginBottom:8}}><input style={{...S.inp,flex:1,marginBottom:0}} value={ct} onChange={e=>setCt(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){addC('customTrophies',ct);setCt('');}}} placeholder="Ex: Libertadores..."/><button style={S.btn} onClick={()=>{addC('customTrophies',ct);setCt('');}}>+</button></div><div style={{display:'flex',flexWrap:'wrap',gap:4}}>{(settings.customTrophies||[]).map((c,i)=><span key={i} style={{...S.badge('#FFD700'),display:'flex',alignItems:'center',gap:4}}>🏆 {c}<span onClick={()=>remC('customTrophies',c)} style={{cursor:'pointer',opacity:0.5}}>×</span></span>)}</div></div>
      <div style={S.card}><div style={S.cHead}>{t.data_management}</div><div style={{display:'flex',gap:8}}><button style={S.btn2} onClick={exp}>📥 {t.export_data}</button><button style={S.btn2} onClick={imp}>📤 {t.import_data}</button></div></div>
      <button style={{...S.btn,marginTop:6}} onClick={()=>saveFn({settings})}>{t.save_settings}</button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════ */
export default function App() {
  const { user, userData, saveToCloud, loadFromCloud, logout } = useAuth();
  const [page, setPage] = useState('dashboard');
  const [saves, setSaves] = useState([]);
  const [activeSave, setActiveSave] = useState(null);
  const [settings, setSettings] = useState({ language:'pt-BR', accentColor:'#00F0FF', currency:'EUR' });
  const [mobNav, setMobNav] = useState(false);
  const [isMob, setIsMob] = useState(window.innerWidth < 768);
  useEffect(()=>{const h=()=>setIsMob(window.innerWidth<768);window.addEventListener('resize',h);return()=>window.removeEventListener('resize',h);},[]);
  useEffect(()=>{if(userData){setSaves(userData.saves||[]);if(userData.settings)setSettings(userData.settings);}},[userData]);
  const t = i18n[settings.language]||i18n['pt-BR'];
  const S = useMemo(()=>makeStyles(settings.accentColor||'#00F0FF'),[settings.accentColor]);
  const updateSave = useCallback((us)=>{const u=saves.map(s=>s.id===us.id?us:s);setSaves(u);setActiveSave(us);saveToCloud({saves:u});},[saves,saveToCloud]);

  const navItems = [{k:'dashboard',ic:'grid',l:t.dashboard},{k:'saves',ic:'save',l:t.saves}];
  if(activeSave?.type==='manager') navItems.push({k:'manager_career',ic:'user',l:t.manager_career});
  if(activeSave?.type==='player') navItems.push({k:'player_career',ic:'play',l:t.player_career});
  navItems.push({k:'settings',ic:'cog',l:t.settings});

  const renderPage = ()=>{
    switch(page){
      case 'dashboard': return <Dashboard saves={saves} setPage={setPage} setActiveSave={setActiveSave} t={t} S={S} userName={user?.displayName||''}/>;
      case 'saves': return <SavesPage saves={saves} setSaves={setSaves} setActiveSave={setActiveSave} setPage={setPage} saveFn={saveToCloud} t={t} S={S}/>;
      case 'manager_career': return activeSave?<ManagerPage save={activeSave} updateSave={updateSave} t={t} S={S} currency={settings.currency}/>:<Dashboard saves={saves} setPage={setPage} setActiveSave={setActiveSave} t={t} S={S} userName={user?.displayName||''}/>;
      case 'player_career': return activeSave?<PlayerPage save={activeSave} updateSave={updateSave} t={t} S={S} currency={settings.currency}/>:<Dashboard saves={saves} setPage={setPage} setActiveSave={setActiveSave} t={t} S={S} userName={user?.displayName||''}/>;
      case 'settings': return <SettingsPage settings={settings} setSettings={setSettings} saveFn={saveToCloud} saves={saves} setSaves={setSaves} t={t} S={S}/>;
      default: return <Dashboard saves={saves} setPage={setPage} setActiveSave={setActiveSave} t={t} S={S} userName={user?.displayName||''}/>;
    }
  };

  const Sidebar = ()=>(
    <div style={{...S.sidebar,...(isMob?{transform:mobNav?'translateX(0)':'translateX(-100%)',transition:'transform 0.2s ease',width:240}:{})}}>
      <div style={S.sLogo}><Logo size={26} color={settings.accentColor}/><span style={S.sBrand}>PLAYR</span></div>
      {activeSave && <div style={{padding:'0 14px',marginBottom:14}}><div style={{padding:'10px 12px',background:`${S.ac}08`,borderRadius:8,border:`1px solid ${S.ac}10`}}><div style={{fontSize:12,fontWeight:600,marginBottom:1,color:'#fff'}}>{activeSave.name}</div><div style={{fontSize:10,color:S.t2}}>{activeSave.currentTeam||'—'} · S{activeSave.currentSeason||1}</div></div></div>}
      <div style={S.navSec}>MENU</div>
      {navItems.map(x=><div key={x.k} style={S.nav(page===x.k)} onClick={()=>{setPage(x.k);if(isMob)setMobNav(false);}} onMouseOver={e=>{if(page!==x.k)e.currentTarget.style.background='rgba(255,255,255,0.02)';}} onMouseOut={e=>{if(page!==x.k)e.currentTarget.style.background='transparent';}}><Ic name={x.ic} size={16} color={page===x.k?S.ac:S.t2}/>{x.l}</div>)}
      <div style={{marginTop:'auto',padding:'14px 16px'}}><div style={{fontSize:10,color:S.t3,marginBottom:8}}>{user?.email}</div><div style={S.nav(false)} onClick={logout}><Ic name="out" size={16} color={S.t2}/>{t.logout}</div></div>
    </div>
  );

  return (
    <div style={S.app}>
      {isMob && <div style={S.ham} onClick={()=>setMobNav(!mobNav)}><Ic name="menu" size={18} color="#fff"/></div>}
      {isMob && mobNav && <div style={S.mobOv} onClick={()=>setMobNav(false)}/>}
      <Sidebar/>
      <div style={{...S.main,...(isMob?S.mainM:{})}}>{renderPage()}</div>
      <style>{`*{margin:0;padding:0;box-sizing:border-box}body{background:#060910;overflow-x:hidden}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.08);border-radius:3px}::selection{background:${settings.accentColor}30}option{background:#0a0e17}input[type="number"]::-webkit-inner-spin-button{opacity:0.2}`}</style>
    </div>
  );
}
