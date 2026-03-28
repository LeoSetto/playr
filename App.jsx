// src/App.jsx — Playr: EA FC Career Mode Tracker
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useAuth } from './AuthProvider.jsx';

/* ═══════════════════════════════════════════════════════════════
   i18n — Full language pack (PT-BR, EN, ES)
   ═══════════════════════════════════════════════════════════════ */
const i18n = {
  'pt-BR': {
    // Nav
    dashboard: 'Painel', manager_career: 'Carreira Treinador', player_career: 'Carreira Jogador',
    settings: 'Configurações', saves: 'Saves', logout: 'Sair',
    // Dashboard
    welcome_back: 'Bem-vindo de volta',
    total_saves: 'Total de Saves', total_seasons: 'Temporadas Jogadas',
    total_trophies: 'Troféus Conquistados', total_matches: 'Partidas Registradas',
    recent_activity: 'Atividade Recente', quick_actions: 'Ações Rápidas',
    new_manager_career: 'Nova Carreira Treinador', new_player_career: 'Nova Carreira Jogador',
    no_saves_yet: 'Nenhum save ainda. Crie sua primeira carreira!',
    // Manager Career
    manager_info: 'Informações do Treinador', manager_name: 'Nome do Treinador',
    manager_age: 'Idade', current_team: 'Time Atual', season: 'Temporada',
    budget: 'Orçamento', league: 'Liga', nationality: 'Nacionalidade',
    squad: 'Elenco', transfers: 'Transferências', matches: 'Partidas',
    trophies: 'Troféus', finances: 'Finanças', youth_academy: 'Academia de Jovens',
    season_history: 'Histórico de Temporadas', team_history: 'Histórico de Times',
    objectives: 'Objetivos', staff: 'Comissão Técnica',
    // Player Career
    player_name: 'Nome do Jogador', position: 'Posição', overall: 'Overall',
    potential: 'Potencial', club: 'Clube', goals: 'Gols', assists: 'Assistências',
    appearances: 'Jogos', rating: 'Nota Média', archetype: 'Arquétipo',
    // Squad
    add_player: 'Adicionar Jogador', player: 'Jogador', age: 'Idade',
    ovr: 'OVR', pot: 'POT', value: 'Valor', wage: 'Salário',
    contract: 'Contrato', loan: 'Empréstimo', role: 'Função',
    // Transfers
    transfer_in: 'Contratações', transfer_out: 'Vendas', loan_in: 'Empréstimos (Entrada)',
    loan_out: 'Empréstimos (Saída)', free_agent: 'Livre', fee: 'Valor',
    from: 'De', to: 'Para', date: 'Data', type: 'Tipo',
    add_transfer: 'Adicionar Transferência',
    // Matches
    add_match: 'Adicionar Partida', competition: 'Competição',
    home: 'Casa', away: 'Fora', result: 'Resultado',
    scorers: 'Goleadores', motm: 'Melhor em Campo',
    win: 'Vitória', draw: 'Empate', loss: 'Derrota',
    opponent: 'Adversário', score: 'Placar',
    // Trophies
    add_trophy: 'Adicionar Troféu', trophy_name: 'Nome do Troféu',
    // Season
    start_new_season: 'Iniciar Nova Temporada', end_season: 'Encerrar Temporada',
    league_position: 'Posição na Liga', top_scorer: 'Artilheiro',
    best_signing: 'Melhor Contratação',
    // Team History
    change_team: 'Mudar de Time', previous_teams: 'Times Anteriores',
    reason: 'Motivo', hired: 'Contratado', resigned: 'Pediu demissão', fired: 'Demitido',
    // Finances
    transfer_budget: 'Orçamento de Transferências', wage_budget: 'Folha Salarial',
    revenue: 'Receita', expenses: 'Despesas', balance: 'Balanço',
    // Youth
    youth_name: 'Nome', youth_potential: 'Potencial', youth_ovr: 'OVR',
    scout_region: 'Região do Scout', add_youth: 'Adicionar Jovem',
    // Settings
    language: 'Idioma', accent_color: 'Cor de Destaque', currency: 'Moeda',
    theme: 'Tema', dark: 'Escuro', light: 'Claro',
    save_settings: 'Salvar Configurações', export_data: 'Exportar Dados',
    import_data: 'Importar Dados', danger_zone: 'Zona de Perigo',
    delete_all: 'Apagar Todos os Dados', confirm_delete: 'Tem certeza?',
    // Saves
    create_save: 'Criar Save', save_name: 'Nome do Save', game_version: 'Versão do Jogo',
    career_type: 'Tipo de Carreira', delete_save: 'Excluir Save', load_save: 'Carregar Save',
    active: 'Ativo',
    // Common
    save: 'Salvar', cancel: 'Cancelar', edit: 'Editar', delete: 'Excluir',
    add: 'Adicionar', close: 'Fechar', confirm: 'Confirmar', back: 'Voltar',
    search: 'Buscar', filter: 'Filtrar', total: 'Total', none: 'Nenhum',
    name: 'Nome', actions: 'Ações', status: 'Status', notes: 'Observações',
    created: 'Criado em', updated: 'Atualizado em',
    // Stats
    wins: 'Vitórias', draws: 'Empates', losses: 'Derrotas',
    goals_for: 'Gols Pró', goals_against: 'Gols Contra', clean_sheets: 'Clean Sheets',
    points: 'Pontos', played: 'Jogos',
  },
  en: {
    dashboard: 'Dashboard', manager_career: 'Manager Career', player_career: 'Player Career',
    settings: 'Settings', saves: 'Saves', logout: 'Sign Out',
    welcome_back: 'Welcome back',
    total_saves: 'Total Saves', total_seasons: 'Seasons Played',
    total_trophies: 'Trophies Won', total_matches: 'Matches Logged',
    recent_activity: 'Recent Activity', quick_actions: 'Quick Actions',
    new_manager_career: 'New Manager Career', new_player_career: 'New Player Career',
    no_saves_yet: 'No saves yet. Create your first career!',
    manager_info: 'Manager Info', manager_name: 'Manager Name',
    manager_age: 'Age', current_team: 'Current Team', season: 'Season',
    budget: 'Budget', league: 'League', nationality: 'Nationality',
    squad: 'Squad', transfers: 'Transfers', matches: 'Matches',
    trophies: 'Trophies', finances: 'Finances', youth_academy: 'Youth Academy',
    season_history: 'Season History', team_history: 'Team History',
    objectives: 'Objectives', staff: 'Staff',
    player_name: 'Player Name', position: 'Position', overall: 'Overall',
    potential: 'Potential', club: 'Club', goals: 'Goals', assists: 'Assists',
    appearances: 'Appearances', rating: 'Avg Rating', archetype: 'Archetype',
    add_player: 'Add Player', player: 'Player', age: 'Age',
    ovr: 'OVR', pot: 'POT', value: 'Value', wage: 'Wage',
    contract: 'Contract', loan: 'Loan', role: 'Role',
    transfer_in: 'Signings', transfer_out: 'Sales', loan_in: 'Loans In',
    loan_out: 'Loans Out', free_agent: 'Free Agent', fee: 'Fee',
    from: 'From', to: 'To', date: 'Date', type: 'Type',
    add_transfer: 'Add Transfer',
    add_match: 'Add Match', competition: 'Competition',
    home: 'Home', away: 'Away', result: 'Result',
    scorers: 'Scorers', motm: 'MOTM',
    win: 'Win', draw: 'Draw', loss: 'Loss',
    opponent: 'Opponent', score: 'Score',
    add_trophy: 'Add Trophy', trophy_name: 'Trophy Name',
    start_new_season: 'Start New Season', end_season: 'End Season',
    league_position: 'League Position', top_scorer: 'Top Scorer',
    best_signing: 'Best Signing',
    change_team: 'Change Team', previous_teams: 'Previous Teams',
    reason: 'Reason', hired: 'Hired', resigned: 'Resigned', fired: 'Fired',
    transfer_budget: 'Transfer Budget', wage_budget: 'Wage Budget',
    revenue: 'Revenue', expenses: 'Expenses', balance: 'Balance',
    youth_name: 'Name', youth_potential: 'Potential', youth_ovr: 'OVR',
    scout_region: 'Scout Region', add_youth: 'Add Youth',
    language: 'Language', accent_color: 'Accent Color', currency: 'Currency',
    theme: 'Theme', dark: 'Dark', light: 'Light',
    save_settings: 'Save Settings', export_data: 'Export Data',
    import_data: 'Import Data', danger_zone: 'Danger Zone',
    delete_all: 'Delete All Data', confirm_delete: 'Are you sure?',
    create_save: 'Create Save', save_name: 'Save Name', game_version: 'Game Version',
    career_type: 'Career Type', delete_save: 'Delete Save', load_save: 'Load Save',
    active: 'Active',
    save: 'Save', cancel: 'Cancel', edit: 'Edit', delete: 'Delete',
    add: 'Add', close: 'Close', confirm: 'Confirm', back: 'Back',
    search: 'Search', filter: 'Filter', total: 'Total', none: 'None',
    name: 'Name', actions: 'Actions', status: 'Status', notes: 'Notes',
    created: 'Created', updated: 'Updated',
    wins: 'Wins', draws: 'Draws', losses: 'Losses',
    goals_for: 'Goals For', goals_against: 'Goals Against', clean_sheets: 'Clean Sheets',
    points: 'Points', played: 'Played',
  },
  es: {
    dashboard: 'Panel', manager_career: 'Carrera Entrenador', player_career: 'Carrera Jugador',
    settings: 'Configuración', saves: 'Guardados', logout: 'Cerrar Sesión',
    welcome_back: 'Bienvenido de vuelta',
    total_saves: 'Total Guardados', total_seasons: 'Temporadas Jugadas',
    total_trophies: 'Trofeos Ganados', total_matches: 'Partidos Registrados',
    recent_activity: 'Actividad Reciente', quick_actions: 'Acciones Rápidas',
    new_manager_career: 'Nueva Carrera Entrenador', new_player_career: 'Nueva Carrera Jugador',
    no_saves_yet: '¡Sin guardados aún. Crea tu primera carrera!',
    manager_info: 'Info del Entrenador', manager_name: 'Nombre del Entrenador',
    manager_age: 'Edad', current_team: 'Equipo Actual', season: 'Temporada',
    budget: 'Presupuesto', league: 'Liga', nationality: 'Nacionalidad',
    squad: 'Plantilla', transfers: 'Fichajes', matches: 'Partidos',
    trophies: 'Trofeos', finances: 'Finanzas', youth_academy: 'Cantera',
    season_history: 'Historial de Temporadas', team_history: 'Historial de Equipos',
    objectives: 'Objetivos', staff: 'Cuerpo Técnico',
    player_name: 'Nombre del Jugador', position: 'Posición', overall: 'Overall',
    potential: 'Potencial', club: 'Club', goals: 'Goles', assists: 'Asistencias',
    appearances: 'Partidos', rating: 'Nota Media', archetype: 'Arquetipo',
    add_player: 'Añadir Jugador', player: 'Jugador', age: 'Edad',
    ovr: 'OVR', pot: 'POT', value: 'Valor', wage: 'Salario',
    contract: 'Contrato', loan: 'Cesión', role: 'Rol',
    transfer_in: 'Fichajes', transfer_out: 'Ventas', loan_in: 'Cesiones (Entrada)',
    loan_out: 'Cesiones (Salida)', free_agent: 'Libre', fee: 'Precio',
    from: 'De', to: 'A', date: 'Fecha', type: 'Tipo',
    add_transfer: 'Añadir Fichaje',
    add_match: 'Añadir Partido', competition: 'Competición',
    home: 'Local', away: 'Visitante', result: 'Resultado',
    scorers: 'Goleadores', motm: 'MVP',
    win: 'Victoria', draw: 'Empate', loss: 'Derrota',
    opponent: 'Rival', score: 'Marcador',
    add_trophy: 'Añadir Trofeo', trophy_name: 'Nombre del Trofeo',
    start_new_season: 'Iniciar Nueva Temporada', end_season: 'Finalizar Temporada',
    league_position: 'Posición en Liga', top_scorer: 'Goleador',
    best_signing: 'Mejor Fichaje',
    change_team: 'Cambiar Equipo', previous_teams: 'Equipos Anteriores',
    reason: 'Motivo', hired: 'Contratado', resigned: 'Renunció', fired: 'Despedido',
    transfer_budget: 'Presupuesto de Fichajes', wage_budget: 'Masa Salarial',
    revenue: 'Ingresos', expenses: 'Gastos', balance: 'Balance',
    youth_name: 'Nombre', youth_potential: 'Potencial', youth_ovr: 'OVR',
    scout_region: 'Región del Scout', add_youth: 'Añadir Joven',
    language: 'Idioma', accent_color: 'Color de Acento', currency: 'Moneda',
    theme: 'Tema', dark: 'Oscuro', light: 'Claro',
    save_settings: 'Guardar Configuración', export_data: 'Exportar Datos',
    import_data: 'Importar Datos', danger_zone: 'Zona de Peligro',
    delete_all: 'Borrar Todos los Datos', confirm_delete: '¿Estás seguro?',
    create_save: 'Crear Guardado', save_name: 'Nombre', game_version: 'Versión del Juego',
    career_type: 'Tipo de Carrera', delete_save: 'Eliminar', load_save: 'Cargar',
    active: 'Activo',
    save: 'Guardar', cancel: 'Cancelar', edit: 'Editar', delete: 'Eliminar',
    add: 'Añadir', close: 'Cerrar', confirm: 'Confirmar', back: 'Volver',
    search: 'Buscar', filter: 'Filtrar', total: 'Total', none: 'Ninguno',
    name: 'Nombre', actions: 'Acciones', status: 'Estado', notes: 'Notas',
    created: 'Creado', updated: 'Actualizado',
    wins: 'Victorias', draws: 'Empates', losses: 'Derrotas',
    goals_for: 'Goles a Favor', goals_against: 'Goles en Contra', clean_sheets: 'Porterías Imbatidas',
    points: 'Puntos', played: 'Jugados',
  }
};

/* ═══════════════════════════════════════════════════════════════
   Constants & Helpers
   ═══════════════════════════════════════════════════════════════ */
const POSITIONS = ['GK','CB','LB','RB','LWB','RWB','CDM','CM','CAM','LM','RM','LW','RW','ST','CF','LF','RF'];
const ARCHETYPES_FC26 = [
  'Poacher','Target Forward','Advanced Forward','Inside Forward','Classic Winger',
  'Trickster','Shadow Striker','Playmaker','Box-to-Box','Holding','Anchor',
  'Ball-Playing Defender','Fullback'
];
const COMPETITIONS = [
  'League','Champions League','Europa League','Conference League',
  'FA Cup','League Cup','Super Cup','Club World Cup','Domestic Cup','Other'
];
const TROPHY_TYPES = [
  'League Title','Champions League','Europa League','Conference League',
  'FA Cup','League Cup','Super Cup','Club World Cup','Domestic Cup',
  'Community Shield','Golden Boot','Golden Glove','Best Manager','Other'
];
const SCOUT_REGIONS = [
  'South America','Europe','Africa','Asia','North America','Oceania'
];

const uid = () => Date.now().toString(36) + Math.random().toString(36).substr(2, 6);

const formatCurrency = (val, currency = 'EUR') => {
  const num = Number(val) || 0;
  const symbols = { EUR: '€', GBP: '£', USD: '$', BRL: 'R$' };
  const sym = symbols[currency] || '€';
  if (num >= 1_000_000) return `${sym}${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${sym}${(num / 1_000).toFixed(0)}K`;
  return `${sym}${num}`;
};

/* ═══════════════════════════════════════════════════════════════
   Logo Component
   ═══════════════════════════════════════════════════════════════ */
const PlayrLogo = ({ size = 32, color = '#00F0FF' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <defs>
      <linearGradient id="pLogo" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor={color} />
        <stop offset="50%" stopColor="#6C5CE7" />
        <stop offset="100%" stopColor={color} />
      </linearGradient>
    </defs>
    <polygon points="32,2 58,17 58,47 32,62 6,47 6,17" fill="none" stroke="url(#pLogo)" strokeWidth="2.5" opacity="0.8" />
    <polygon points="32,10 52,21 52,43 32,54 12,43 12,21" fill={color} opacity="0.06" />
    <polygon points="24,20 46,32 24,44" fill={color} opacity="0.9" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════
   STYLE FACTORY  — EA FC-inspired dark UI
   ═══════════════════════════════════════════════════════════════ */
const makeStyles = (accent = '#00F0FF') => {
  const bg = '#080b12';
  const bgCard = 'rgba(12,16,24,0.7)';
  const bgCardSolid = '#0c1018';
  const border = 'rgba(255,255,255,0.06)';
  const textPrimary = '#fff';
  const textSecondary = 'rgba(255,255,255,0.5)';
  const textMuted = 'rgba(255,255,255,0.25)';

  return {
    accent, bg, bgCard, border, textPrimary, textSecondary, textMuted,
    // Layout
    app: {
      display: 'flex', minHeight: '100vh', background: bg,
      fontFamily: "'Inter', sans-serif", color: textPrimary,
    },
    sidebar: {
      width: 260, minHeight: '100vh', background: 'rgba(8,10,16,0.95)',
      borderRight: `1px solid ${border}`, display: 'flex', flexDirection: 'column',
      padding: '24px 0', position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 100,
      backdropFilter: 'blur(20px)',
    },
    sidebarCollapsed: {
      width: 68,
    },
    main: {
      flex: 1, marginLeft: 260, padding: '32px 40px', minHeight: '100vh',
      maxWidth: 1200, position: 'relative',
    },
    mainMobile: {
      marginLeft: 0, padding: '80px 16px 32px',
    },
    // Sidebar items
    sidebarLogo: {
      display: 'flex', alignItems: 'center', gap: 12, padding: '0 24px', marginBottom: 32,
    },
    sidebarBrand: {
      fontFamily: "'Rajdhani', sans-serif", fontSize: 24, fontWeight: 700, color: '#fff',
      letterSpacing: '0.06em',
    },
    navItem: (active) => ({
      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 24px',
      cursor: 'pointer', fontSize: 14, fontWeight: active ? 600 : 400,
      color: active ? accent : textSecondary,
      background: active ? `${accent}10` : 'transparent',
      borderRight: active ? `3px solid ${accent}` : '3px solid transparent',
      transition: 'all 0.15s ease',
    }),
    navSection: {
      fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
      color: textMuted, padding: '20px 24px 8px',
    },
    // Cards
    card: {
      background: bgCard, backdropFilter: 'blur(20px)',
      border: `1px solid ${border}`, borderRadius: 16, padding: '24px',
      marginBottom: 20,
    },
    cardHeader: {
      fontFamily: "'Rajdhani', sans-serif", fontSize: 20, fontWeight: 700,
      marginBottom: 16, color: textPrimary, letterSpacing: '0.04em',
      textTransform: 'uppercase',
    },
    // Stats
    statGrid: {
      display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: 16, marginBottom: 24,
    },
    statCard: {
      background: bgCard, border: `1px solid ${border}`, borderRadius: 14,
      padding: '20px', position: 'relative', overflow: 'hidden',
    },
    statValue: {
      fontSize: 32, fontWeight: 700, color: accent,
      fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.02em',
    },
    statLabel: {
      fontSize: 12, color: textSecondary, marginTop: 4, fontWeight: 500,
      textTransform: 'uppercase', letterSpacing: '0.05em',
    },
    statIcon: {
      position: 'absolute', top: 16, right: 16, fontSize: 24, opacity: 0.15,
    },
    // Form elements
    input: {
      width: '100%', padding: '12px 14px', borderRadius: 10,
      background: 'rgba(255,255,255,0.04)', border: `1px solid ${border}`,
      color: '#fff', fontSize: 14, fontFamily: "'Inter', sans-serif",
      outline: 'none', boxSizing: 'border-box', transition: 'border 0.2s',
    },
    select: {
      width: '100%', padding: '12px 14px', borderRadius: 10,
      background: 'rgba(255,255,255,0.04)', border: `1px solid ${border}`,
      color: '#fff', fontSize: 14, fontFamily: "'Inter', sans-serif",
      outline: 'none', boxSizing: 'border-box', appearance: 'none',
      cursor: 'pointer',
    },
    label: {
      fontSize: 12, fontWeight: 600, color: textSecondary,
      marginBottom: 6, display: 'block', textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    formGroup: { marginBottom: 16 },
    formRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
    formRow3: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 },
    // Buttons
    btnPrimary: {
      padding: '12px 24px', borderRadius: 10,
      background: `linear-gradient(135deg, ${accent}, #6C5CE7)`,
      color: '#fff', fontSize: 14, fontWeight: 600, border: 'none',
      cursor: 'pointer', fontFamily: "'Inter', sans-serif",
      transition: 'transform 0.1s, box-shadow 0.2s',
      boxShadow: `0 4px 16px ${accent}30`,
    },
    btnSecondary: {
      padding: '12px 24px', borderRadius: 10,
      background: 'rgba(255,255,255,0.05)', border: `1px solid ${border}`,
      color: textSecondary, fontSize: 14, fontWeight: 500,
      cursor: 'pointer', fontFamily: "'Inter', sans-serif",
      transition: 'all 0.15s',
    },
    btnDanger: {
      padding: '10px 20px', borderRadius: 10,
      background: 'rgba(255,60,60,0.1)', border: '1px solid rgba(255,60,60,0.2)',
      color: '#ff6b6b', fontSize: 13, fontWeight: 600,
      cursor: 'pointer', fontFamily: "'Inter', sans-serif",
    },
    btnSmall: {
      padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600,
      border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif",
      background: `${accent}15`, color: accent,
    },
    // Table
    table: {
      width: '100%', borderCollapse: 'separate', borderSpacing: '0 4px',
    },
    th: {
      fontSize: 11, fontWeight: 700, color: textMuted, textTransform: 'uppercase',
      letterSpacing: '0.06em', textAlign: 'left', padding: '8px 12px',
    },
    td: {
      padding: '12px', fontSize: 13, color: textSecondary,
      background: 'rgba(255,255,255,0.02)', verticalAlign: 'middle',
    },
    tdFirst: { borderRadius: '8px 0 0 8px' },
    tdLast: { borderRadius: '0 8px 8px 0' },
    // Modal
    overlay: {
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(8px)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20,
    },
    modal: {
      background: bgCardSolid, border: `1px solid ${border}`,
      borderRadius: 20, padding: '32px', maxWidth: 520, width: '100%',
      maxHeight: '85vh', overflowY: 'auto',
    },
    modalTitle: {
      fontFamily: "'Rajdhani', sans-serif", fontSize: 22, fontWeight: 600,
      marginBottom: 24,
    },
    // Tabs
    tabBar: {
      display: 'flex', gap: 4, marginBottom: 24, borderBottom: `1px solid ${border}`,
      paddingBottom: 0, overflowX: 'auto',
    },
    tab: (active) => ({
      padding: '10px 18px', fontSize: 13, fontWeight: active ? 600 : 400,
      color: active ? accent : textSecondary,
      borderBottom: active ? `2px solid ${accent}` : '2px solid transparent',
      cursor: 'pointer', background: 'none', border: 'none',
      fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap',
      transition: 'all 0.15s',
    }),
    // Badge
    badge: (color = accent) => ({
      display: 'inline-block', padding: '3px 10px', borderRadius: 20,
      fontSize: 11, fontWeight: 600,
      background: `${color}15`, color: color,
      border: `1px solid ${color}25`,
    }),
    // Empty state
    empty: {
      textAlign: 'center', padding: '48px 20px', color: textMuted, fontSize: 14,
    },
    // Mobile hamburger
    hamburger: {
      position: 'fixed', top: 16, left: 16, zIndex: 200, width: 44, height: 44,
      borderRadius: 12, background: bgCard, border: `1px solid ${border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', fontSize: 22,
    },
    mobileOverlay: {
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 99,
    },
    // OVR circle
    ovrCircle: (val) => {
      const c = val >= 85 ? '#FFD700' : val >= 75 ? '#2ecc71' : val >= 65 ? '#3498db' : textSecondary;
      return {
        width: 40, height: 40, borderRadius: '50%', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: `${c}15`, border: `2px solid ${c}40`,
        fontSize: 14, fontWeight: 800, color: c,
      };
    },
    // Season card
    seasonCard: {
      background: bgCard, border: `1px solid ${border}`, borderRadius: 14,
      padding: '20px', marginBottom: 12,
    },
    // Trophy display
    trophyItem: {
      display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
      background: 'rgba(255,215,0,0.04)', border: '1px solid rgba(255,215,0,0.1)',
      borderRadius: 12, marginBottom: 8,
    },
    trophyIcon: { fontSize: 28 },
  };
};

/* ═══════════════════════════════════════════════════════════════
   NAV ICONS (inline SVGs for sidebar)
   ═══════════════════════════════════════════════════════════════ */
const Icon = ({ name, size = 20, color = 'currentColor' }) => {
  const icons = {
    dashboard: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    manager: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    player: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill={color} opacity="0.4"/></svg>,
    saves: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/></svg>,
    settings: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>,
    logout: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    trophy: <span style={{ fontSize: size }}>🏆</span>,
    ball: <span style={{ fontSize: size }}>⚽</span>,
    chart: <span style={{ fontSize: size }}>📊</span>,
    transfer: <span style={{ fontSize: size }}>🔄</span>,
    youth: <span style={{ fontSize: size }}>⭐</span>,
    team: <span style={{ fontSize: size }}>🏟️</span>,
    money: <span style={{ fontSize: size }}>💰</span>,
    calendar: <span style={{ fontSize: size }}>📅</span>,
    add: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    delete: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
    edit: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    menu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  };
  return icons[name] || null;
};

/* ═══════════════════════════════════════════════════════════════
   MODAL COMPONENT
   ═══════════════════════════════════════════════════════════════ */
function Modal({ show, onClose, title, children, S }) {
  if (!show) return null;
  return (
    <div style={S.overlay} onClick={onClose}>
      <div style={S.modal} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={S.modalTitle}>{title}</div>
          <button style={{ ...S.btnSecondary, padding: '6px 12px', fontSize: 18, lineHeight: 1 }} onClick={onClose}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DASHBOARD PAGE
   ═══════════════════════════════════════════════════════════════ */
function DashboardPage({ saves, setPage, setActiveSave, t, S, userName }) {
  const totalSeasons = saves.reduce((sum, s) => sum + (s.seasons?.length || 0), 0);
  const totalTrophies = saves.reduce((sum, s) => sum + (s.trophies?.length || 0), 0);
  const totalMatches = saves.reduce((sum, s) => sum + (s.matches?.length || 0), 0);

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 14, color: S.textSecondary, marginBottom: 4 }}>{t.welcome_back},</div>
        <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 32, fontWeight: 700 }}>
          {userName || 'Manager'}
        </div>
      </div>

      <div style={S.statGrid}>
        {[
          { val: saves.length, label: t.total_saves, icon: '💾' },
          { val: totalSeasons, label: t.total_seasons, icon: '📅' },
          { val: totalTrophies, label: t.total_trophies, icon: '🏆' },
          { val: totalMatches, label: t.total_matches, icon: '⚽' },
        ].map((s, i) => (
          <div key={i} style={S.statCard}>
            <div style={S.statIcon}>{s.icon}</div>
            <div style={S.statValue}>{s.val}</div>
            <div style={S.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={S.card}>
        <div style={S.cardHeader}>{t.quick_actions}</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button style={S.btnPrimary} onClick={() => setPage('saves')}>
            {t.new_manager_career}
          </button>
          <button style={S.btnSecondary} onClick={() => setPage('saves')}>
            {t.new_player_career}
          </button>
        </div>
      </div>

      {saves.length > 0 ? (
        <div style={S.card}>
          <div style={S.cardHeader}>{t.saves} ({saves.length})</div>
          {saves.map((save, i) => (
            <div key={save.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '14px 16px', background: 'rgba(255,255,255,0.02)',
              borderRadius: 12, marginBottom: 8, border: `1px solid ${S.border}`,
              cursor: 'pointer', transition: 'background 0.15s',
            }}
              onClick={() => { setActiveSave(save); setPage(save.type === 'manager' ? 'manager_career' : 'player_career'); }}
              onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
              onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
            >
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 2 }}>{save.name}</div>
                <div style={{ fontSize: 12, color: S.textSecondary }}>
                  {save.type === 'manager' ? t.manager_career : t.player_career} • {save.currentTeam || '—'} • {t.season} {save.currentSeason || 1}
                </div>
              </div>
              <div style={S.badge(S.accent)}>{save.gameVersion || 'FC 26'}</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={S.card}>
          <div style={S.empty}>{t.no_saves_yet}</div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SAVES PAGE
   ═══════════════════════════════════════════════════════════════ */
function SavesPage({ saves, setSaves, setActiveSave, setPage, saveFn, t, S }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', gameVersion: 'EA FC 26', type: 'manager' });

  const createSave = () => {
    const newSave = {
      id: uid(),
      ...form,
      createdAt: new Date().toISOString(),
      currentSeason: 1,
      currentTeam: '',
      managerName: '',
      managerAge: 35,
      managerNationality: '',
      playerName: '',
      playerPosition: 'ST',
      playerOverall: 65,
      playerPotential: 85,
      playerArchetype: '',
      squad: [],
      transfers: [],
      matches: [],
      trophies: [],
      seasons: [],
      teamHistory: [],
      youthAcademy: [],
      finances: { transferBudget: 0, wageBudget: 0 },
      objectives: [],
      staff: [],
      notes: '',
    };
    const updated = [...saves, newSave];
    setSaves(updated);
    saveFn({ saves: updated });
    setShowModal(false);
    setForm({ name: '', gameVersion: 'EA FC 26', type: 'manager' });
  };

  const deleteSave = (id) => {
    const updated = saves.filter(s => s.id !== id);
    setSaves(updated);
    saveFn({ saves: updated });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 28, fontWeight: 700 }}>{t.saves}</div>
        <button style={S.btnPrimary} onClick={() => setShowModal(true)}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="add" size={16} color="#fff" /> {t.create_save}
          </span>
        </button>
      </div>

      {saves.length === 0 ? (
        <div style={S.card}><div style={S.empty}>{t.no_saves_yet}</div></div>
      ) : (
        saves.map(save => (
          <div key={save.id} style={S.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{save.name}</div>
                <div style={{ fontSize: 13, color: S.textSecondary, marginBottom: 8 }}>
                  {save.type === 'manager' ? t.manager_career : t.player_career} • {save.gameVersion}
                </div>
                <div style={{ fontSize: 12, color: S.textMuted }}>
                  {save.currentTeam ? `${t.current_team}: ${save.currentTeam}` : ''} {save.currentTeam ? '•' : ''} {t.season} {save.currentSeason || 1}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={S.btnPrimary}
                  onClick={() => { setActiveSave(save); setPage(save.type === 'manager' ? 'manager_career' : 'player_career'); }}>
                  {t.load_save}
                </button>
                <button style={S.btnDanger} onClick={() => deleteSave(save.id)}>
                  <Icon name="delete" size={16} color="#ff6b6b" />
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)} title={t.create_save} S={S}>
        <div style={S.formGroup}>
          <label style={S.label}>{t.save_name}</label>
          <input style={S.input} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="My Arsenal Career..." onFocus={e => e.target.style.borderColor = `${S.accent}60`}
            onBlur={e => e.target.style.borderColor = S.border} />
        </div>
        <div style={S.formRow}>
          <div style={S.formGroup}>
            <label style={S.label}>{t.game_version}</label>
            <select style={S.select} value={form.gameVersion} onChange={e => setForm({ ...form, gameVersion: e.target.value })}>
              {['EA FC 26','EA FC 25','EA FC 24'].map(v => <option key={v} value={v} style={{ background: '#0c1018' }}>{v}</option>)}
            </select>
          </div>
          <div style={S.formGroup}>
            <label style={S.label}>{t.career_type}</label>
            <select style={S.select} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
              <option value="manager" style={{ background: '#0c1018' }}>{t.manager_career}</option>
              <option value="player" style={{ background: '#0c1018' }}>{t.player_career}</option>
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          <button style={S.btnPrimary} onClick={createSave} disabled={!form.name}>{t.create_save}</button>
          <button style={S.btnSecondary} onClick={() => setShowModal(false)}>{t.cancel}</button>
        </div>
      </Modal>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MANAGER CAREER PAGE (Full featured)
   ═══════════════════════════════════════════════════════════════ */
function ManagerCareerPage({ save, updateSave, t, S, currency }) {
  const [tab, setTab] = useState('info');
  const [showModal, setShowModal] = useState(null);
  const [form, setForm] = useState({});

  const tabs = [
    { key: 'info', label: t.manager_info, icon: '👤' },
    { key: 'squad', label: t.squad, icon: '👥' },
    { key: 'transfers', label: t.transfers, icon: '🔄' },
    { key: 'matches', label: t.matches, icon: '⚽' },
    { key: 'trophies', label: t.trophies, icon: '🏆' },
    { key: 'seasons', label: t.season_history, icon: '📅' },
    { key: 'teams', label: t.team_history, icon: '🏟️' },
    { key: 'youth', label: t.youth_academy, icon: '⭐' },
    { key: 'finances', label: t.finances, icon: '💰' },
  ];

  const update = (key, val) => updateSave({ ...save, [key]: val });

  /* — Info Tab — */
  const InfoTab = () => (
    <div>
      <div style={S.card}>
        <div style={S.cardHeader}>{t.manager_info}</div>
        <div style={S.formRow}>
          <div style={S.formGroup}>
            <label style={S.label}>{t.manager_name}</label>
            <input style={S.input} value={save.managerName || ''} onChange={e => update('managerName', e.target.value)}
              onFocus={e => e.target.style.borderColor = `${S.accent}60`} onBlur={e => e.target.style.borderColor = S.border} />
          </div>
          <div style={S.formGroup}>
            <label style={S.label}>{t.manager_age}</label>
            <input style={S.input} type="number" value={save.managerAge || 35} onChange={e => update('managerAge', Number(e.target.value))}
              onFocus={e => e.target.style.borderColor = `${S.accent}60`} onBlur={e => e.target.style.borderColor = S.border} />
          </div>
        </div>
        <div style={S.formRow}>
          <div style={S.formGroup}>
            <label style={S.label}>{t.current_team}</label>
            <input style={S.input} value={save.currentTeam || ''} onChange={e => update('currentTeam', e.target.value)}
              onFocus={e => e.target.style.borderColor = `${S.accent}60`} onBlur={e => e.target.style.borderColor = S.border} />
          </div>
          <div style={S.formGroup}>
            <label style={S.label}>{t.league}</label>
            <input style={S.input} value={save.league || ''} onChange={e => update('league', e.target.value)}
              onFocus={e => e.target.style.borderColor = `${S.accent}60`} onBlur={e => e.target.style.borderColor = S.border} />
          </div>
        </div>
        <div style={S.formRow}>
          <div style={S.formGroup}>
            <label style={S.label}>{t.nationality}</label>
            <input style={S.input} value={save.managerNationality || ''} onChange={e => update('managerNationality', e.target.value)}
              onFocus={e => e.target.style.borderColor = `${S.accent}60`} onBlur={e => e.target.style.borderColor = S.border} />
          </div>
          <div style={S.formGroup}>
            <label style={S.label}>{t.season}</label>
            <input style={S.input} type="number" value={save.currentSeason || 1} onChange={e => update('currentSeason', Number(e.target.value))}
              onFocus={e => e.target.style.borderColor = `${S.accent}60`} onBlur={e => e.target.style.borderColor = S.border} />
          </div>
        </div>
        <div style={S.formGroup}>
          <label style={S.label}>{t.notes}</label>
          <textarea style={{ ...S.input, minHeight: 80, resize: 'vertical' }} value={save.notes || ''} onChange={e => update('notes', e.target.value)}
            onFocus={e => e.target.style.borderColor = `${S.accent}60`} onBlur={e => e.target.style.borderColor = S.border} />
        </div>
      </div>

      <div style={S.statGrid}>
        <div style={S.statCard}><div style={S.statValue}>{save.squad?.length || 0}</div><div style={S.statLabel}>{t.squad}</div></div>
        <div style={S.statCard}><div style={S.statValue}>{save.matches?.length || 0}</div><div style={S.statLabel}>{t.matches}</div></div>
        <div style={S.statCard}><div style={S.statValue}>{save.trophies?.length || 0}</div><div style={S.statLabel}>{t.trophies}</div></div>
        <div style={S.statCard}><div style={S.statValue}>{save.transfers?.length || 0}</div><div style={S.statLabel}>{t.transfers}</div></div>
      </div>
    </div>
  );

  /* — Squad Tab — */
  const SquadTab = () => {
    const squad = save.squad || [];
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={S.cardHeader}>{t.squad} ({squad.length})</div>
          <button style={S.btnPrimary} onClick={() => { setForm({ name: '', position: 'ST', age: 20, ovr: 70, pot: 80, value: 0, wage: 0, contract: '2028', role: '', loan: false }); setShowModal('player'); }}>
            {t.add_player}
          </button>
        </div>
        {squad.length === 0 ? <div style={S.empty}>{t.none}</div> : (
          <div style={{ overflowX: 'auto' }}>
            <table style={S.table}>
              <thead><tr>
                {[t.player, t.position, t.ovr, t.pot, t.age, t.value, t.wage, t.contract, t.actions].map((h, i) =>
                  <th key={i} style={S.th}>{h}</th>
                )}
              </tr></thead>
              <tbody>
                {squad.map((p, i) => (
                  <tr key={p.id || i}>
                    <td style={{ ...S.td, ...(i === 0 ? S.tdFirst : {}), fontWeight: 600, color: '#fff' }}>{p.name}</td>
                    <td style={S.td}><span style={S.badge(S.accent)}>{p.position}</span></td>
                    <td style={S.td}><div style={S.ovrCircle(p.ovr)}>{p.ovr}</div></td>
                    <td style={S.td}>{p.pot}</td>
                    <td style={S.td}>{p.age}</td>
                    <td style={S.td}>{formatCurrency(p.value, currency)}</td>
                    <td style={S.td}>{formatCurrency(p.wage, currency)}</td>
                    <td style={S.td}>{p.contract}{p.loan ? ' 📌' : ''}</td>
                    <td style={{ ...S.td, ...(i === 0 ? S.tdLast : {}) }}>
                      <button style={S.btnDanger} onClick={() => {
                        const updated = squad.filter((_, idx) => idx !== i);
                        update('squad', updated);
                      }}><Icon name="delete" size={14} color="#ff6b6b" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  /* — Transfers Tab — */
  const TransfersTab = () => {
    const transfers = save.transfers || [];
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={S.cardHeader}>{t.transfers} ({transfers.length})</div>
          <button style={S.btnPrimary} onClick={() => { setForm({ playerName: '', type: 'in', fee: 0, from: '', to: '', season: save.currentSeason || 1 }); setShowModal('transfer'); }}>
            {t.add_transfer}
          </button>
        </div>
        {transfers.length === 0 ? <div style={S.empty}>{t.none}</div> : (
          <div>
            {transfers.map((tr, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', background: 'rgba(255,255,255,0.02)', borderRadius: 12, marginBottom: 6, border: `1px solid ${S.border}` }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{tr.playerName}</div>
                  <div style={{ fontSize: 12, color: S.textSecondary }}>
                    {tr.from} → {tr.to} • {t.season} {tr.season}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={S.badge(tr.type === 'in' ? '#2ecc71' : tr.type === 'out' ? '#e74c3c' : '#f1c40f')}>
                    {tr.type === 'in' ? t.transfer_in : tr.type === 'out' ? t.transfer_out : t.loan}
                  </span>
                  <span style={{ fontWeight: 700, color: S.accent }}>{formatCurrency(tr.fee, currency)}</span>
                  <button style={{ ...S.btnDanger, padding: '4px 8px' }} onClick={() => {
                    update('transfers', transfers.filter((_, idx) => idx !== i));
                  }}><Icon name="delete" size={14} color="#ff6b6b" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  /* — Matches Tab — */
  const MatchesTab = () => {
    const matches = save.matches || [];
    const wins = matches.filter(m => m.result === 'win').length;
    const draws = matches.filter(m => m.result === 'draw').length;
    const losses = matches.filter(m => m.result === 'loss').length;

    return (
      <div>
        <div style={S.statGrid}>
          <div style={S.statCard}><div style={{ ...S.statValue, color: '#2ecc71' }}>{wins}</div><div style={S.statLabel}>{t.wins}</div></div>
          <div style={S.statCard}><div style={{ ...S.statValue, color: '#f1c40f' }}>{draws}</div><div style={S.statLabel}>{t.draws}</div></div>
          <div style={S.statCard}><div style={{ ...S.statValue, color: '#e74c3c' }}>{losses}</div><div style={S.statLabel}>{t.losses}</div></div>
          <div style={S.statCard}><div style={S.statValue}>{matches.length}</div><div style={S.statLabel}>{t.played}</div></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={S.cardHeader}>{t.matches}</div>
          <button style={S.btnPrimary} onClick={() => { setForm({ opponent: '', score: '', result: 'win', competition: 'League', scorers: '', motm: '', season: save.currentSeason || 1, homeAway: 'home' }); setShowModal('match'); }}>
            {t.add_match}
          </button>
        </div>
        {matches.length === 0 ? <div style={S.empty}>{t.none}</div> : (
          matches.slice().reverse().map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', background: 'rgba(255,255,255,0.02)', borderRadius: 12, marginBottom: 6, border: `1px solid ${S.border}` }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>
                  <span style={{ color: m.result === 'win' ? '#2ecc71' : m.result === 'draw' ? '#f1c40f' : '#e74c3c' }}>●</span>
                  {' '}{m.homeAway === 'home' ? `${save.currentTeam || '—'} ${m.score} ${m.opponent}` : `${m.opponent} ${m.score} ${save.currentTeam || '—'}`}
                </div>
                <div style={{ fontSize: 12, color: S.textSecondary }}>
                  {m.competition} • {t.season} {m.season}{m.scorers ? ` • ⚽ ${m.scorers}` : ''}{m.motm ? ` • ⭐ ${m.motm}` : ''}
                </div>
              </div>
              <button style={{ ...S.btnDanger, padding: '4px 8px' }} onClick={() => update('matches', (save.matches || []).filter((_, idx) => idx !== (save.matches.length - 1 - i)))}>
                <Icon name="delete" size={14} color="#ff6b6b" />
              </button>
            </div>
          ))
        )}
      </div>
    );
  };

  /* — Trophies Tab — */
  const TrophiesTab = () => {
    const trophies = save.trophies || [];
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={S.cardHeader}>{t.trophies} ({trophies.length})</div>
          <button style={S.btnPrimary} onClick={() => { setForm({ name: 'League Title', season: save.currentSeason || 1, team: save.currentTeam || '' }); setShowModal('trophy'); }}>
            {t.add_trophy}
          </button>
        </div>
        {trophies.length === 0 ? <div style={S.empty}>{t.none}</div> : (
          trophies.map((tr, i) => (
            <div key={i} style={S.trophyItem}>
              <span style={S.trophyIcon}>🏆</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{tr.name}</div>
                <div style={{ fontSize: 12, color: S.textSecondary }}>{tr.team} • {t.season} {tr.season}</div>
              </div>
              <button style={{ ...S.btnDanger, padding: '4px 8px' }} onClick={() => update('trophies', trophies.filter((_, idx) => idx !== i))}>
                <Icon name="delete" size={14} color="#ff6b6b" />
              </button>
            </div>
          ))
        )}
      </div>
    );
  };

  /* — Seasons Tab — */
  const SeasonsTab = () => {
    const seasons = save.seasons || [];
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={S.cardHeader}>{t.season_history}</div>
          <button style={S.btnPrimary} onClick={() => {
            setForm({ seasonNum: (save.currentSeason || 1), team: save.currentTeam || '', league: save.league || '', leaguePosition: 1, topScorer: '', bestSigning: '', notes: '' });
            setShowModal('season');
          }}>{t.end_season}</button>
        </div>
        {seasons.length === 0 ? <div style={S.empty}>{t.none}</div> : (
          seasons.map((ss, i) => (
            <div key={i} style={S.seasonCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 18, fontWeight: 600 }}>{t.season} {ss.seasonNum}</div>
                  <div style={{ fontSize: 13, color: S.textSecondary }}>{ss.team} • {ss.league}</div>
                </div>
                <span style={S.badge(S.accent)}>#{ss.leaguePosition}</span>
              </div>
              {ss.topScorer && <div style={{ fontSize: 12, color: S.textSecondary }}>⚽ {t.top_scorer}: {ss.topScorer}</div>}
              {ss.bestSigning && <div style={{ fontSize: 12, color: S.textSecondary }}>🔄 {t.best_signing}: {ss.bestSigning}</div>}
              {ss.notes && <div style={{ fontSize: 12, color: S.textMuted, marginTop: 6 }}>{ss.notes}</div>}
            </div>
          ))
        )}
      </div>
    );
  };

  /* — Team History Tab — */
  const TeamHistoryTab = () => {
    const history = save.teamHistory || [];
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={S.cardHeader}>{t.team_history}</div>
          <button style={S.btnPrimary} onClick={() => { setForm({ team: '', league: '', reason: 'hired', season: save.currentSeason || 1 }); setShowModal('teamChange'); }}>
            {t.change_team}
          </button>
        </div>
        {history.length === 0 ? <div style={S.empty}>{t.none}</div> : (
          history.map((h, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: 12, marginBottom: 8, border: `1px solid ${S.border}` }}>
              <span style={{ fontSize: 24 }}>🏟️</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{h.team}</div>
                <div style={{ fontSize: 12, color: S.textSecondary }}>{h.league} • {t.season} {h.season}</div>
              </div>
              <span style={S.badge(h.reason === 'hired' ? '#2ecc71' : h.reason === 'fired' ? '#e74c3c' : '#f1c40f')}>
                {t[h.reason] || h.reason}
              </span>
            </div>
          ))
        )}
      </div>
    );
  };

  /* — Youth Academy Tab — */
  const YouthTab = () => {
    const youth = save.youthAcademy || [];
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={S.cardHeader}>{t.youth_academy} ({youth.length})</div>
          <button style={S.btnPrimary} onClick={() => { setForm({ name: '', position: 'ST', ovr: 55, potential: 80, age: 16, region: 'Europe' }); setShowModal('youth'); }}>
            {t.add_youth}
          </button>
        </div>
        {youth.length === 0 ? <div style={S.empty}>{t.none}</div> : (
          <div style={{ overflowX: 'auto' }}>
            <table style={S.table}>
              <thead><tr>
                {[t.name, t.position, t.ovr, t.potential, t.age, t.scout_region, t.actions].map((h, i) =>
                  <th key={i} style={S.th}>{h}</th>
                )}
              </tr></thead>
              <tbody>
                {youth.map((y, i) => (
                  <tr key={i}>
                    <td style={{ ...S.td, fontWeight: 600, color: '#fff' }}>{y.name}</td>
                    <td style={S.td}><span style={S.badge(S.accent)}>{y.position}</span></td>
                    <td style={S.td}><div style={S.ovrCircle(y.ovr)}>{y.ovr}</div></td>
                    <td style={S.td}>{y.potential}</td>
                    <td style={S.td}>{y.age}</td>
                    <td style={S.td}>{y.region}</td>
                    <td style={S.td}>
                      <button style={S.btnDanger} onClick={() => update('youthAcademy', youth.filter((_, idx) => idx !== i))}>
                        <Icon name="delete" size={14} color="#ff6b6b" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  /* — Finances Tab — */
  const FinancesTab = () => {
    const fin = save.finances || {};
    return (
      <div style={S.card}>
        <div style={S.cardHeader}>{t.finances}</div>
        <div style={S.formRow}>
          <div style={S.formGroup}>
            <label style={S.label}>{t.transfer_budget}</label>
            <input style={S.input} type="number" value={fin.transferBudget || 0}
              onChange={e => update('finances', { ...fin, transferBudget: Number(e.target.value) })}
              onFocus={e => e.target.style.borderColor = `${S.accent}60`} onBlur={e => e.target.style.borderColor = S.border} />
          </div>
          <div style={S.formGroup}>
            <label style={S.label}>{t.wage_budget}</label>
            <input style={S.input} type="number" value={fin.wageBudget || 0}
              onChange={e => update('finances', { ...fin, wageBudget: Number(e.target.value) })}
              onFocus={e => e.target.style.borderColor = `${S.accent}60`} onBlur={e => e.target.style.borderColor = S.border} />
          </div>
        </div>
        <div style={S.statGrid}>
          <div style={S.statCard}>
            <div style={S.statValue}>{formatCurrency(fin.transferBudget, currency)}</div>
            <div style={S.statLabel}>{t.transfer_budget}</div>
          </div>
          <div style={S.statCard}>
            <div style={S.statValue}>{formatCurrency(fin.wageBudget, currency)}</div>
            <div style={S.statLabel}>{t.wage_budget}</div>
          </div>
        </div>
      </div>
    );
  };

  /* — Modal Forms — */
  const addItem = (key, item) => {
    update(key, [...(save[key] || []), { id: uid(), ...item }]);
    setShowModal(null);
  };

  const renderModal = () => {
    if (!showModal) return null;
    const modals = {
      player: { title: t.add_player, key: 'squad', fields: [
        { name: 'name', label: t.player, type: 'text' },
        { name: 'position', label: t.position, type: 'select', options: POSITIONS },
        { name: 'ovr', label: t.ovr, type: 'number' },
        { name: 'pot', label: t.pot, type: 'number' },
        { name: 'age', label: t.age, type: 'number' },
        { name: 'value', label: t.value, type: 'number' },
        { name: 'wage', label: t.wage, type: 'number' },
        { name: 'contract', label: t.contract, type: 'text' },
      ]},
      transfer: { title: t.add_transfer, key: 'transfers', fields: [
        { name: 'playerName', label: t.player, type: 'text' },
        { name: 'type', label: t.type, type: 'select', options: ['in','out','loan_in','loan_out'] },
        { name: 'fee', label: t.fee, type: 'number' },
        { name: 'from', label: t.from, type: 'text' },
        { name: 'to', label: t.to, type: 'text' },
        { name: 'season', label: t.season, type: 'number' },
      ]},
      match: { title: t.add_match, key: 'matches', fields: [
        { name: 'opponent', label: t.opponent, type: 'text' },
        { name: 'score', label: t.score, type: 'text' },
        { name: 'result', label: t.result, type: 'select', options: ['win','draw','loss'] },
        { name: 'competition', label: t.competition, type: 'select', options: COMPETITIONS },
        { name: 'homeAway', label: 'Home/Away', type: 'select', options: ['home','away'] },
        { name: 'scorers', label: t.scorers, type: 'text' },
        { name: 'motm', label: t.motm, type: 'text' },
        { name: 'season', label: t.season, type: 'number' },
      ]},
      trophy: { title: t.add_trophy, key: 'trophies', fields: [
        { name: 'name', label: t.trophy_name, type: 'select', options: TROPHY_TYPES },
        { name: 'season', label: t.season, type: 'number' },
        { name: 'team', label: t.current_team, type: 'text' },
      ]},
      season: { title: t.end_season, key: 'seasons', fields: [
        { name: 'seasonNum', label: t.season, type: 'number' },
        { name: 'team', label: t.current_team, type: 'text' },
        { name: 'league', label: t.league, type: 'text' },
        { name: 'leaguePosition', label: t.league_position, type: 'number' },
        { name: 'topScorer', label: t.top_scorer, type: 'text' },
        { name: 'bestSigning', label: t.best_signing, type: 'text' },
        { name: 'notes', label: t.notes, type: 'text' },
      ]},
      teamChange: { title: t.change_team, key: 'teamHistory', fields: [
        { name: 'team', label: t.current_team, type: 'text' },
        { name: 'league', label: t.league, type: 'text' },
        { name: 'reason', label: t.reason, type: 'select', options: ['hired','resigned','fired'] },
        { name: 'season', label: t.season, type: 'number' },
      ]},
      youth: { title: t.add_youth, key: 'youthAcademy', fields: [
        { name: 'name', label: t.name, type: 'text' },
        { name: 'position', label: t.position, type: 'select', options: POSITIONS },
        { name: 'ovr', label: t.ovr, type: 'number' },
        { name: 'potential', label: t.potential, type: 'number' },
        { name: 'age', label: t.age, type: 'number' },
        { name: 'region', label: t.scout_region, type: 'select', options: SCOUT_REGIONS },
      ]},
    };
    const config = modals[showModal];
    if (!config) return null;

    return (
      <Modal show={true} onClose={() => setShowModal(null)} title={config.title} S={S}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {config.fields.map(f => (
            <div key={f.name} style={S.formGroup}>
              <label style={S.label}>{f.label}</label>
              {f.type === 'select' ? (
                <select style={S.select} value={form[f.name] || ''} onChange={e => setForm({ ...form, [f.name]: e.target.value })}>
                  {f.options.map(o => <option key={o} value={o} style={{ background: '#0c1018' }}>{o}</option>)}
                </select>
              ) : (
                <input style={S.input} type={f.type} value={form[f.name] || ''} onChange={e => setForm({ ...form, [f.name]: f.type === 'number' ? Number(e.target.value) : e.target.value })}
                  onFocus={e => e.target.style.borderColor = `${S.accent}60`} onBlur={e => e.target.style.borderColor = S.border} />
              )}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          <button style={S.btnPrimary} onClick={() => {
            addItem(config.key, form);
            if (showModal === 'teamChange') {
              update('currentTeam', form.team);
              update('league', form.league);
            }
            if (showModal === 'season') {
              update('currentSeason', (save.currentSeason || 1) + 1);
            }
          }}>{t.save}</button>
          <button style={S.btnSecondary} onClick={() => setShowModal(null)}>{t.cancel}</button>
        </div>
      </Modal>
    );
  };

  const tabContent = {
    info: <InfoTab />, squad: <SquadTab />, transfers: <TransfersTab />,
    matches: <MatchesTab />, trophies: <TrophiesTab />, seasons: <SeasonsTab />,
    teams: <TeamHistoryTab />, youth: <YouthTab />, finances: <FinancesTab />,
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: S.textSecondary, marginBottom: 4 }}>{save.name}</div>
        <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 28, fontWeight: 700 }}>
          {save.managerName || t.manager_career} {save.currentTeam ? `— ${save.currentTeam}` : ''}
        </div>
      </div>
      <div style={S.tabBar}>
        {tabs.map(tb => (
          <button key={tb.key} style={S.tab(tab === tb.key)} onClick={() => setTab(tb.key)}>
            <span style={{ marginRight: 6 }}>{tb.icon}</span>{tb.label}
          </button>
        ))}
      </div>
      {tabContent[tab]}
      {renderModal()}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PLAYER CAREER PAGE
   ═══════════════════════════════════════════════════════════════ */
function PlayerCareerPage({ save, updateSave, t, S, currency }) {
  const [tab, setTab] = useState('info');
  const [showModal, setShowModal] = useState(null);
  const [form, setForm] = useState({});

  const tabs = [
    { key: 'info', label: t.manager_info, icon: '👤' },
    { key: 'matches', label: t.matches, icon: '⚽' },
    { key: 'trophies', label: t.trophies, icon: '🏆' },
    { key: 'seasons', label: t.season_history, icon: '📅' },
    { key: 'teams', label: t.team_history, icon: '🏟️' },
  ];

  const update = (key, val) => updateSave({ ...save, [key]: val });

  const InfoTab = () => (
    <div>
      <div style={S.card}>
        <div style={S.cardHeader}>Player Info</div>
        <div style={S.formRow}>
          <div style={S.formGroup}>
            <label style={S.label}>{t.player_name}</label>
            <input style={S.input} value={save.playerName || ''} onChange={e => update('playerName', e.target.value)}
              onFocus={e => e.target.style.borderColor = `${S.accent}60`} onBlur={e => e.target.style.borderColor = S.border} />
          </div>
          <div style={S.formGroup}>
            <label style={S.label}>{t.position}</label>
            <select style={S.select} value={save.playerPosition || 'ST'} onChange={e => update('playerPosition', e.target.value)}>
              {POSITIONS.map(p => <option key={p} value={p} style={{ background: '#0c1018' }}>{p}</option>)}
            </select>
          </div>
        </div>
        <div style={S.formRow3}>
          <div style={S.formGroup}>
            <label style={S.label}>{t.overall}</label>
            <input style={S.input} type="number" value={save.playerOverall || 65} onChange={e => update('playerOverall', Number(e.target.value))}
              onFocus={e => e.target.style.borderColor = `${S.accent}60`} onBlur={e => e.target.style.borderColor = S.border} />
          </div>
          <div style={S.formGroup}>
            <label style={S.label}>{t.potential}</label>
            <input style={S.input} type="number" value={save.playerPotential || 85} onChange={e => update('playerPotential', Number(e.target.value))}
              onFocus={e => e.target.style.borderColor = `${S.accent}60`} onBlur={e => e.target.style.borderColor = S.border} />
          </div>
          <div style={S.formGroup}>
            <label style={S.label}>{t.archetype}</label>
            <select style={S.select} value={save.playerArchetype || ''} onChange={e => update('playerArchetype', e.target.value)}>
              <option value="" style={{ background: '#0c1018' }}>—</option>
              {ARCHETYPES_FC26.map(a => <option key={a} value={a} style={{ background: '#0c1018' }}>{a}</option>)}
            </select>
          </div>
        </div>
        <div style={S.formRow}>
          <div style={S.formGroup}>
            <label style={S.label}>{t.current_team}</label>
            <input style={S.input} value={save.currentTeam || ''} onChange={e => update('currentTeam', e.target.value)}
              onFocus={e => e.target.style.borderColor = `${S.accent}60`} onBlur={e => e.target.style.borderColor = S.border} />
          </div>
          <div style={S.formGroup}>
            <label style={S.label}>{t.season}</label>
            <input style={S.input} type="number" value={save.currentSeason || 1} onChange={e => update('currentSeason', Number(e.target.value))}
              onFocus={e => e.target.style.borderColor = `${S.accent}60`} onBlur={e => e.target.style.borderColor = S.border} />
          </div>
        </div>
      </div>

      {/* Player Stats Card */}
      <div style={S.card}>
        <div style={S.cardHeader}>Stats</div>
        <div style={S.statGrid}>
          <div style={S.statCard}>
            <div style={S.statValue}><div style={{ ...S.ovrCircle(save.playerOverall || 65), width: 56, height: 56, fontSize: 22 }}>{save.playerOverall || 65}</div></div>
            <div style={S.statLabel}>{t.overall}</div>
          </div>
          <div style={S.statCard}><div style={S.statValue}>{save.playerPotential || 85}</div><div style={S.statLabel}>{t.potential}</div></div>
          <div style={S.statCard}><div style={S.statValue}>{save.matches?.length || 0}</div><div style={S.statLabel}>{t.appearances}</div></div>
          <div style={S.statCard}><div style={S.statValue}>{save.trophies?.length || 0}</div><div style={S.statLabel}>{t.trophies}</div></div>
        </div>
      </div>
    </div>
  );

  /* Matches/Trophies/Seasons/Teams reuse same patterns as Manager */
  const MatchesTab = () => {
    const matches = save.matches || [];
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={S.cardHeader}>{t.matches} ({matches.length})</div>
          <button style={S.btnPrimary} onClick={() => { setForm({ opponent: '', score: '', result: 'win', competition: 'League', goals: 0, assists: 0, rating: 7.0, motm: false, season: save.currentSeason || 1 }); setShowModal('match'); }}>
            {t.add_match}
          </button>
        </div>
        <div style={S.statGrid}>
          <div style={S.statCard}><div style={{ ...S.statValue, color: '#2ecc71' }}>{matches.reduce((s, m) => s + (m.goals || 0), 0)}</div><div style={S.statLabel}>{t.goals}</div></div>
          <div style={S.statCard}><div style={{ ...S.statValue, color: '#3498db' }}>{matches.reduce((s, m) => s + (m.assists || 0), 0)}</div><div style={S.statLabel}>{t.assists}</div></div>
          <div style={S.statCard}><div style={S.statValue}>{matches.length > 0 ? (matches.reduce((s, m) => s + (m.rating || 0), 0) / matches.length).toFixed(1) : '—'}</div><div style={S.statLabel}>{t.rating}</div></div>
        </div>
        {matches.slice().reverse().map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', background: 'rgba(255,255,255,0.02)', borderRadius: 12, marginBottom: 6, border: `1px solid ${S.border}` }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>
                <span style={{ color: m.result === 'win' ? '#2ecc71' : m.result === 'draw' ? '#f1c40f' : '#e74c3c' }}>●</span>
                {' '}vs {m.opponent} — {m.score}
              </div>
              <div style={{ fontSize: 12, color: S.textSecondary }}>
                {m.competition} • ⚽ {m.goals || 0} • 🅰️ {m.assists || 0} • ⭐ {m.rating || '—'}{m.motm ? ' • MOTM' : ''}
              </div>
            </div>
            <button style={{ ...S.btnDanger, padding: '4px 8px' }} onClick={() => update('matches', (save.matches || []).filter((_, idx) => idx !== (save.matches.length - 1 - i)))}>
              <Icon name="delete" size={14} color="#ff6b6b" />
            </button>
          </div>
        ))}
      </div>
    );
  };

  const TrophiesTab = () => {
    const trophies = save.trophies || [];
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={S.cardHeader}>{t.trophies} ({trophies.length})</div>
          <button style={S.btnPrimary} onClick={() => { setForm({ name: 'League Title', season: save.currentSeason || 1, team: save.currentTeam || '' }); setShowModal('trophy'); }}>
            {t.add_trophy}
          </button>
        </div>
        {trophies.map((tr, i) => (
          <div key={i} style={S.trophyItem}>
            <span style={S.trophyIcon}>🏆</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{tr.name}</div>
              <div style={{ fontSize: 12, color: S.textSecondary }}>{tr.team} • {t.season} {tr.season}</div>
            </div>
            <button style={{ ...S.btnDanger, padding: '4px 8px' }} onClick={() => update('trophies', trophies.filter((_, idx) => idx !== i))}><Icon name="delete" size={14} color="#ff6b6b" /></button>
          </div>
        ))}
        {trophies.length === 0 && <div style={S.empty}>{t.none}</div>}
      </div>
    );
  };

  const SeasonsTab = () => {
    const seasons = save.seasons || [];
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={S.cardHeader}>{t.season_history}</div>
          <button style={S.btnPrimary} onClick={() => { setForm({ seasonNum: save.currentSeason || 1, team: save.currentTeam || '', goals: 0, assists: 0, appearances: 0, avgRating: 7.0, notes: '' }); setShowModal('season'); }}>
            {t.end_season}
          </button>
        </div>
        {seasons.map((ss, i) => (
          <div key={i} style={S.seasonCard}>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{t.season} {ss.seasonNum}</div>
            <div style={{ fontSize: 13, color: S.textSecondary, marginBottom: 6 }}>{ss.team}</div>
            <div style={{ display: 'flex', gap: 16, fontSize: 13, color: S.textSecondary }}>
              <span>⚽ {ss.goals || 0} {t.goals}</span>
              <span>🅰️ {ss.assists || 0} {t.assists}</span>
              <span>📊 {ss.appearances || 0} {t.appearances}</span>
              <span>⭐ {ss.avgRating || '—'}</span>
            </div>
            {ss.notes && <div style={{ fontSize: 12, color: S.textMuted, marginTop: 4 }}>{ss.notes}</div>}
          </div>
        ))}
        {seasons.length === 0 && <div style={S.empty}>{t.none}</div>}
      </div>
    );
  };

  const TeamsTab = () => {
    const history = save.teamHistory || [];
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={S.cardHeader}>{t.team_history}</div>
          <button style={S.btnPrimary} onClick={() => { setForm({ team: '', reason: 'transfer', season: save.currentSeason || 1 }); setShowModal('teamChange'); }}>
            {t.change_team}
          </button>
        </div>
        {history.map((h, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px', background: 'rgba(255,255,255,0.02)', borderRadius: 12, marginBottom: 8, border: `1px solid ${S.border}` }}>
            <span style={{ fontSize: 24 }}>🏟️</span>
            <div>
              <div style={{ fontWeight: 600 }}>{h.team}</div>
              <div style={{ fontSize: 12, color: S.textSecondary }}>{t.season} {h.season} • {h.reason}</div>
            </div>
          </div>
        ))}
        {history.length === 0 && <div style={S.empty}>{t.none}</div>}
      </div>
    );
  };

  const addItem = (key, item) => { update(key, [...(save[key] || []), { id: uid(), ...item }]); setShowModal(null); };

  const renderModal = () => {
    if (!showModal) return null;
    const modals = {
      match: { title: t.add_match, key: 'matches', fields: [
        { name: 'opponent', label: t.opponent, type: 'text' },
        { name: 'score', label: t.score, type: 'text' },
        { name: 'result', label: t.result, type: 'select', options: ['win','draw','loss'] },
        { name: 'competition', label: t.competition, type: 'select', options: COMPETITIONS },
        { name: 'goals', label: t.goals, type: 'number' },
        { name: 'assists', label: t.assists, type: 'number' },
        { name: 'rating', label: t.rating, type: 'number' },
        { name: 'season', label: t.season, type: 'number' },
      ]},
      trophy: { title: t.add_trophy, key: 'trophies', fields: [
        { name: 'name', label: t.trophy_name, type: 'select', options: TROPHY_TYPES },
        { name: 'season', label: t.season, type: 'number' },
        { name: 'team', label: t.current_team, type: 'text' },
      ]},
      season: { title: t.end_season, key: 'seasons', fields: [
        { name: 'seasonNum', label: t.season, type: 'number' },
        { name: 'team', label: t.current_team, type: 'text' },
        { name: 'goals', label: t.goals, type: 'number' },
        { name: 'assists', label: t.assists, type: 'number' },
        { name: 'appearances', label: t.appearances, type: 'number' },
        { name: 'avgRating', label: t.rating, type: 'number' },
        { name: 'notes', label: t.notes, type: 'text' },
      ]},
      teamChange: { title: t.change_team, key: 'teamHistory', fields: [
        { name: 'team', label: t.current_team, type: 'text' },
        { name: 'reason', label: t.reason, type: 'select', options: ['transfer','loan','released','free agent'] },
        { name: 'season', label: t.season, type: 'number' },
      ]},
    };
    const config = modals[showModal];
    if (!config) return null;
    return (
      <Modal show={true} onClose={() => setShowModal(null)} title={config.title} S={S}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {config.fields.map(f => (
            <div key={f.name} style={S.formGroup}>
              <label style={S.label}>{f.label}</label>
              {f.type === 'select' ? (
                <select style={S.select} value={form[f.name] || ''} onChange={e => setForm({ ...form, [f.name]: e.target.value })}>
                  {f.options.map(o => <option key={o} value={o} style={{ background: '#0c1018' }}>{o}</option>)}
                </select>
              ) : (
                <input style={S.input} type={f.type} value={form[f.name] || ''} onChange={e => setForm({ ...form, [f.name]: f.type === 'number' ? Number(e.target.value) : e.target.value })}
                  onFocus={e => e.target.style.borderColor = `${S.accent}60`} onBlur={e => e.target.style.borderColor = S.border} />
              )}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          <button style={S.btnPrimary} onClick={() => {
            addItem(config.key, form);
            if (showModal === 'teamChange') update('currentTeam', form.team);
            if (showModal === 'season') update('currentSeason', (save.currentSeason || 1) + 1);
          }}>{t.save}</button>
          <button style={S.btnSecondary} onClick={() => setShowModal(null)}>{t.cancel}</button>
        </div>
      </Modal>
    );
  };

  const tabContent = {
    info: <InfoTab />, matches: <MatchesTab />, trophies: <TrophiesTab />,
    seasons: <SeasonsTab />, teams: <TeamsTab />,
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: S.textSecondary, marginBottom: 4 }}>{save.name}</div>
        <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 28, fontWeight: 700 }}>
          {save.playerName || t.player_career} {save.currentTeam ? `— ${save.currentTeam}` : ''}
        </div>
      </div>
      <div style={S.tabBar}>
        {tabs.map(tb => (
          <button key={tb.key} style={S.tab(tab === tb.key)} onClick={() => setTab(tb.key)}>
            <span style={{ marginRight: 6 }}>{tb.icon}</span>{tb.label}
          </button>
        ))}
      </div>
      {tabContent[tab]}
      {renderModal()}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SETTINGS PAGE
   ═══════════════════════════════════════════════════════════════ */
function SettingsPage({ settings, setSettings, saveFn, t, S }) {
  const colors = ['#00F0FF','#6C5CE7','#2ecc71','#e74c3c','#f1c40f','#e67e22','#1abc9c','#9b59b6','#FF6B9D','#00D2FF'];

  return (
    <div>
      <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 28, fontWeight: 700, marginBottom: 28 }}>{t.settings}</div>

      <div style={S.card}>
        <div style={S.cardHeader}>{t.language}</div>
        <div style={{ display: 'flex', gap: 10 }}>
          {[{ code: 'pt-BR', label: '🇧🇷 Português' }, { code: 'en', label: '🇬🇧 English' }, { code: 'es', label: '🇪🇸 Español' }].map(l => (
            <button key={l.code}
              style={{ ...S.btnSecondary, ...(settings.language === l.code ? { background: `${S.accent}15`, borderColor: `${S.accent}40`, color: S.accent } : {}) }}
              onClick={() => setSettings({ ...settings, language: l.code })}>
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <div style={S.card}>
        <div style={S.cardHeader}>{t.accent_color}</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {colors.map(c => (
            <div key={c} onClick={() => setSettings({ ...settings, accentColor: c })} style={{
              width: 40, height: 40, borderRadius: 12, background: c, cursor: 'pointer',
              border: settings.accentColor === c ? '3px solid #fff' : '3px solid transparent',
              transition: 'border 0.15s', boxShadow: settings.accentColor === c ? `0 0 20px ${c}50` : 'none',
            }} />
          ))}
        </div>
      </div>

      <div style={S.card}>
        <div style={S.cardHeader}>{t.currency}</div>
        <div style={{ display: 'flex', gap: 10 }}>
          {['EUR','GBP','USD','BRL'].map(c => (
            <button key={c}
              style={{ ...S.btnSecondary, ...(settings.currency === c ? { background: `${S.accent}15`, borderColor: `${S.accent}40`, color: S.accent } : {}) }}
              onClick={() => setSettings({ ...settings, currency: c })}>
              {{ EUR: '€ EUR', GBP: '£ GBP', USD: '$ USD', BRL: 'R$ BRL' }[c]}
            </button>
          ))}
        </div>
      </div>

      <button style={{ ...S.btnPrimary, marginTop: 8 }} onClick={() => saveFn({ settings })}>{t.save_settings}</button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN APP COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function App() {
  const { user, userData, saveToCloud, loadFromCloud, logout } = useAuth();
  const [page, setPage] = useState('dashboard');
  const [saves, setSaves] = useState([]);
  const [activeSave, setActiveSave] = useState(null);
  const [settings, setSettings] = useState({ language: 'pt-BR', accentColor: '#00F0FF', currency: 'EUR' });
  const [mobileNav, setMobileNav] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (userData) {
      setSaves(userData.saves || []);
      if (userData.settings) setSettings(userData.settings);
    }
  }, [userData]);

  const t = i18n[settings.language] || i18n['pt-BR'];
  const S = useMemo(() => makeStyles(settings.accentColor || '#00F0FF'), [settings.accentColor]);

  const updateSave = useCallback((updatedSave) => {
    const updated = saves.map(s => s.id === updatedSave.id ? updatedSave : s);
    setSaves(updated);
    setActiveSave(updatedSave);
    saveToCloud({ saves: updated });
  }, [saves, saveToCloud]);

  const navItems = [
    { key: 'dashboard', icon: 'dashboard', label: t.dashboard },
    { key: 'saves', icon: 'saves', label: t.saves },
  ];
  if (activeSave?.type === 'manager') navItems.push({ key: 'manager_career', icon: 'manager', label: t.manager_career });
  if (activeSave?.type === 'player') navItems.push({ key: 'player_career', icon: 'player', label: t.player_career });
  navItems.push({ key: 'settings', icon: 'settings', label: t.settings });

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <DashboardPage saves={saves} setPage={setPage} setActiveSave={(s) => { setActiveSave(s); }} t={t} S={S} userName={user?.displayName || ''} />;
      case 'saves': return <SavesPage saves={saves} setSaves={setSaves} setActiveSave={setActiveSave} setPage={setPage} saveFn={saveToCloud} t={t} S={S} />;
      case 'manager_career': return activeSave ? <ManagerCareerPage save={activeSave} updateSave={updateSave} t={t} S={S} currency={settings.currency} /> : <DashboardPage saves={saves} setPage={setPage} setActiveSave={setActiveSave} t={t} S={S} userName={user?.displayName || ''} />;
      case 'player_career': return activeSave ? <PlayerCareerPage save={activeSave} updateSave={updateSave} t={t} S={S} currency={settings.currency} /> : <DashboardPage saves={saves} setPage={setPage} setActiveSave={setActiveSave} t={t} S={S} userName={user?.displayName || ''} />;
      case 'settings': return <SettingsPage settings={settings} setSettings={setSettings} saveFn={saveToCloud} t={t} S={S} />;
      default: return <DashboardPage saves={saves} setPage={setPage} setActiveSave={setActiveSave} t={t} S={S} userName={user?.displayName || ''} />;
    }
  };

  // Sidebar
  const Sidebar = () => (
    <div style={{ ...S.sidebar, ...(isMobile ? { transform: mobileNav ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform 0.25s ease', width: 280 } : {}) }}>
      <div style={S.sidebarLogo}>
        <PlayrLogo size={32} color={settings.accentColor} />
        <span style={S.sidebarBrand}>PLAYR</span>
      </div>

      {activeSave && (
        <div style={{ padding: '0 20px', marginBottom: 16 }}>
          <div style={{ padding: '12px 14px', background: `${S.accent}08`, borderRadius: 12, border: `1px solid ${S.accent}15` }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2, color: '#fff' }}>{activeSave.name}</div>
            <div style={{ fontSize: 11, color: S.textSecondary }}>{activeSave.currentTeam || '—'} • S{activeSave.currentSeason || 1}</div>
          </div>
        </div>
      )}

      <div style={S.navSection}>MENU</div>
      {navItems.map(item => (
        <div key={item.key} style={S.navItem(page === item.key)}
          onClick={() => { setPage(item.key); if (isMobile) setMobileNav(false); }}
          onMouseOver={e => { if (page !== item.key) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
          onMouseOut={e => { if (page !== item.key) e.currentTarget.style.background = 'transparent'; }}>
          <Icon name={item.icon} size={20} color={page === item.key ? S.accent : S.textSecondary} />
          {item.label}
        </div>
      ))}

      <div style={{ marginTop: 'auto', padding: '16px 20px' }}>
        <div style={{ fontSize: 12, color: S.textMuted, marginBottom: 12 }}>{user?.email}</div>
        <div style={S.navItem(false)} onClick={logout}>
          <Icon name="logout" size={20} color={S.textSecondary} />
          {t.logout}
        </div>
      </div>
    </div>
  );

  return (
    <div style={S.app}>
      {/* Mobile hamburger */}
      {isMobile && (
        <div style={S.hamburger} onClick={() => setMobileNav(!mobileNav)}>
          <Icon name="menu" size={22} color="#fff" />
        </div>
      )}
      {isMobile && mobileNav && <div style={S.mobileOverlay} onClick={() => setMobileNav(false)} />}

      <Sidebar />

      <div style={{ ...S.main, ...(isMobile ? S.mainMobile : {}) }}>
        {renderPage()}
      </div>

      {/* Global CSS Reset */}
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #080b12; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
        ::selection { background: ${settings.accentColor}40; }
        option { background: #0f141e; }
        input[type="number"]::-webkit-inner-spin-button { opacity: 0.3; }
      `}</style>
    </div>
  );
}
