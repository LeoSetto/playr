// AuthProvider.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, googleProvider, db } from './firebase.js';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const loginTexts = {
  'pt-BR': {
    tagline: 'SEU MODO CARREIRA. SUA HISTÓRIA.',
    subtitle: 'Registre cada temporada, cada transferência, cada troféu. O tracker definitivo para EA FC.',
    email: 'Email', password: 'Senha', login: 'ENTRAR', register: 'CRIAR CONTA',
    google: 'Entrar com Google', or: 'ou',
    toggle_register: 'Não tem conta? Cadastre-se', toggle_login: 'Já tem conta? Entrar',
    name: 'Seu nome',
    features: ['Carreira Treinador', 'Carreira Jogador', 'Histórico de Temporadas', 'Cloud Sync']
  },
  en: {
    tagline: 'YOUR CAREER MODE. YOUR LEGACY.',
    subtitle: 'Track every season, every transfer, every trophy. The ultimate tracker for EA FC.',
    email: 'Email', password: 'Password', login: 'SIGN IN', register: 'CREATE ACCOUNT',
    google: 'Sign in with Google', or: 'or',
    toggle_register: "Don't have an account? Sign Up", toggle_login: 'Already have an account? Sign In',
    name: 'Your name',
    features: ['Manager Career', 'Player Career', 'Season History', 'Cloud Sync']
  },
  es: {
    tagline: 'TU MODO CARRERA. TU LEGADO.',
    subtitle: 'Registra cada temporada, cada fichaje, cada trofeo. El tracker definitivo para EA FC.',
    email: 'Email', password: 'Contraseña', login: 'ENTRAR', register: 'CREAR CUENTA',
    google: 'Entrar con Google', or: 'o',
    toggle_register: '¿No tienes cuenta? Regístrate', toggle_login: '¿Ya tienes cuenta? Inicia sesión',
    name: 'Tu nombre',
    features: ['Carrera Entrenador', 'Carrera Jugador', 'Historial Temporadas', 'Cloud Sync']
  }
};

/* ─── New Playr Logo — geometric/angular EA FC-inspired ─── */
const PlayrLogo = ({ size = 48, color = '#00F0FF' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGrad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor={color} />
        <stop offset="50%" stopColor="#6C5CE7" />
        <stop offset="100%" stopColor={color} />
      </linearGradient>
      <clipPath id="hexClip">
        <polygon points="32,2 58,17 58,47 32,62 6,47 6,17" />
      </clipPath>
    </defs>
    <polygon points="32,2 58,17 58,47 32,62 6,47 6,17" fill="none" stroke="url(#logoGrad)" strokeWidth="2.5" opacity="0.8" />
    <polygon points="32,10 52,21 52,43 32,54 12,43 12,21" fill={color} opacity="0.06" />
    <polygon points="24,20 46,32 24,44" fill={color} opacity="0.9" />
  </svg>
);

function LoginScreen() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState(() => {
    const nav = navigator.language || 'en';
    if (nav.startsWith('pt')) return 'pt-BR';
    if (nav.startsWith('es')) return 'es';
    return 'en';
  });

  const t = loginTexts[lang] || loginTexts.en;

  const handleEmail = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isRegister) {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        if (name) await updateProfile(cred.user, { displayName: name });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message.replace('Firebase: ', '').replace(/\(auth\/.*\)/, ''));
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try { await signInWithPopup(auth, googleProvider); }
    catch (err) { setError(err.message.replace('Firebase: ', '').replace(/\(auth\/.*\)/, '')); }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#080b12', fontFamily: "'Inter', sans-serif", padding: 20,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background effects */}
      <div style={{ position: 'absolute', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,240,255,0.04) 0%, transparent 70%)', top: -300, right: -200, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,92,231,0.04) 0%, transparent 70%)', bottom: -200, left: -100, pointerEvents: 'none' }} />
      {/* Subtle grid lines */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

      <div style={{
        background: 'rgba(12,16,24,0.9)', backdropFilter: 'blur(40px)',
        borderRadius: 20, padding: '44px 38px', maxWidth: 420, width: '100%',
        position: 'relative', zIndex: 1,
        boxShadow: '0 40px 100px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
        border: 'none',
      }}>
        {/* Language selector */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 28 }}>
          {[['pt-BR', 'PT'], ['en', 'EN'], ['es', 'ES']].map(([code, label]) => (
            <button key={code} onClick={() => setLang(code)} style={{
              fontSize: 11, padding: '5px 14px', borderRadius: 6,
              background: lang === code ? 'rgba(0,240,255,0.12)' : 'rgba(255,255,255,0.03)',
              color: lang === code ? '#00F0FF' : 'rgba(255,255,255,0.3)',
              border: 'none', cursor: 'pointer', fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700, letterSpacing: '0.08em', transition: 'all 0.15s',
            }}>{label}</button>
          ))}
        </div>

        {/* Logo + Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 6 }}>
          <PlayrLogo size={44} />
          <span style={{
            fontFamily: "'Rajdhani', sans-serif", fontSize: 38, fontWeight: 700,
            color: '#fff', letterSpacing: '0.04em', lineHeight: 1,
          }}>PLAYR</span>
        </div>

        <div style={{
          fontFamily: "'Rajdhani', sans-serif", fontSize: 14, fontWeight: 600,
          color: '#00F0FF', letterSpacing: '0.15em', marginBottom: 8, marginTop: 12,
        }}>{t.tagline}</div>

        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.5, marginBottom: 28 }}>
          {t.subtitle}
        </div>

        {/* Feature badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 28 }}>
          {t.features.map((f, i) => (
            <span key={i} style={{
              fontSize: 10, padding: '4px 10px', borderRadius: 4,
              background: 'rgba(0,240,255,0.06)', color: 'rgba(0,240,255,0.7)',
              fontWeight: 600, fontFamily: "'Rajdhani', sans-serif",
              letterSpacing: '0.05em', textTransform: 'uppercase',
            }}>{f}</span>
          ))}
        </div>

        {error && (
          <div style={{
            background: 'rgba(255,60,60,0.08)', borderRadius: 8,
            padding: '10px 14px', fontSize: 13, color: '#ff6b6b', marginBottom: 16,
            borderLeft: '3px solid #ff6b6b',
          }}>{error}</div>
        )}

        <form onSubmit={handleEmail}>
          {isRegister && (
            <input style={inputStyle} placeholder={t.name} value={name}
              onChange={e => setName(e.target.value)}
              onFocus={e => { e.target.style.borderColor = 'rgba(0,240,255,0.3)'; e.target.style.background = 'rgba(0,240,255,0.04)'; }}
              onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.06)'; e.target.style.background = 'rgba(255,255,255,0.03)'; }}
            />
          )}
          <input style={inputStyle} type="email" placeholder={t.email} value={email}
            onChange={e => setEmail(e.target.value)} required
            onFocus={e => { e.target.style.borderColor = 'rgba(0,240,255,0.3)'; e.target.style.background = 'rgba(0,240,255,0.04)'; }}
            onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.06)'; e.target.style.background = 'rgba(255,255,255,0.03)'; }}
          />
          <input style={inputStyle} type="password" placeholder={t.password} value={password}
            onChange={e => setPassword(e.target.value)} required minLength={6}
            onFocus={e => { e.target.style.borderColor = 'rgba(0,240,255,0.3)'; e.target.style.background = 'rgba(0,240,255,0.04)'; }}
            onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.06)'; e.target.style.background = 'rgba(255,255,255,0.03)'; }}
          />
          <button type="submit" disabled={loading} style={{
            width: '100%', padding: 14, borderRadius: 10,
            background: 'linear-gradient(135deg, #00D4FF 0%, #6C5CE7 100%)',
            color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer',
            fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.12em',
            transition: 'all 0.15s', opacity: loading ? 0.6 : 1,
            boxShadow: '0 4px 24px rgba(0,200,255,0.15)',
          }}
            onMouseOver={e => { e.target.style.boxShadow = '0 6px 32px rgba(0,200,255,0.25)'; e.target.style.transform = 'translateY(-1px)'; }}
            onMouseOut={e => { e.target.style.boxShadow = '0 4px 24px rgba(0,200,255,0.15)'; e.target.style.transform = 'translateY(0)'; }}
          >
            {loading ? '...' : isRegister ? t.register : t.login}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '20px 0', color: 'rgba(255,255,255,0.15)', fontSize: 11, letterSpacing: '0.1em' }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
          <span>{t.or}</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
        </div>

        <button onClick={handleGoogle} disabled={loading} style={{
          width: '100%', padding: 13, borderRadius: 10,
          background: 'rgba(255,255,255,0.03)', border: 'none',
          color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 500,
          cursor: 'pointer', fontFamily: "'Inter', sans-serif",
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          transition: 'all 0.15s',
        }}
          onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
          onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A11.96 11.96 0 0 0 0 12c0 1.94.46 3.77 1.28 5.39l3.56-2.77z" transform="translate(0.5,0)"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {t.google}
        </button>

        <div onClick={() => { setIsRegister(!isRegister); setError(''); }}
          style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: 'rgba(255,255,255,0.3)', cursor: 'pointer', transition: 'color 0.15s' }}
          onMouseOver={e => e.target.style.color = '#00F0FF'}
          onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.3)'}
        >
          {isRegister ? t.toggle_login : t.toggle_register}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '13px 16px', borderRadius: 10,
  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
  color: '#fff', fontSize: 14, fontFamily: "'Inter', sans-serif",
  outline: 'none', marginBottom: 12, boxSizing: 'border-box',
  transition: 'all 0.2s',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const ref = doc(db, 'users', u.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) { setUserData(snap.data()); }
        else {
          const initial = { displayName: u.displayName || '', email: u.email, createdAt: serverTimestamp(), settings: { language: 'pt-BR', accentColor: '#00F0FF', currency: 'EUR', theme: 'dark' }, saves: [] };
          await setDoc(ref, initial);
          setUserData(initial);
        }
      } else { setUserData(null); }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const saveToCloud = useCallback(async (data) => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid);
    await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
    setUserData(prev => ({ ...prev, ...data }));
  }, [user]);

  const loadFromCloud = useCallback(async () => {
    if (!user) return null;
    const ref = doc(db, 'users', user.uid);
    const snap = await getDoc(ref);
    if (snap.exists()) { setUserData(snap.data()); return snap.data(); }
    return null;
  }, [user]);

  const logout = () => signOut(auth);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#080b12', color: '#00F0FF', fontFamily: "'Rajdhani', sans-serif", fontSize: 18 }}>
        <div style={{ textAlign: 'center' }}>
          <PlayrLogo size={56} />
          <div style={{ marginTop: 16, opacity: 0.5, letterSpacing: '0.15em', fontWeight: 600 }}>LOADING...</div>
        </div>
      </div>
    );
  }

  if (!user) return <LoginScreen />;

  return (
    <AuthContext.Provider value={{ user, userData, saveToCloud, loadFromCloud, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
