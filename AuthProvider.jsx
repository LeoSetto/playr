// src/AuthProvider.jsx
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

/* ─── i18n for login screen ─── */
const loginTexts = {
  'pt-BR': {
    tagline: 'Seu Modo Carreira. Sua História.',
    subtitle: 'Registre cada temporada, cada transferência, cada troféu. O tracker definitivo para EA FC.',
    email: 'Email',
    password: 'Senha',
    login: 'Entrar',
    register: 'Criar conta',
    google: 'Entrar com Google',
    or: 'ou',
    toggle_register: 'Não tem conta? Cadastre-se',
    toggle_login: 'Já tem conta? Entrar',
    name: 'Seu nome',
    error_email: 'Email inválido',
    error_password: 'Senha deve ter 6+ caracteres',
    features: ['Modo Carreira Treinador', 'Modo Carreira Jogador', 'Histórico de Temporadas', 'Nuvem Sincronizada']
  },
  en: {
    tagline: 'Your Career Mode. Your Legacy.',
    subtitle: 'Track every season, every transfer, every trophy. The ultimate tracker for EA FC.',
    email: 'Email',
    password: 'Password',
    login: 'Sign In',
    register: 'Create Account',
    google: 'Sign in with Google',
    or: 'or',
    toggle_register: "Don't have an account? Sign Up",
    toggle_login: 'Already have an account? Sign In',
    name: 'Your name',
    error_email: 'Invalid email',
    error_password: 'Password must be 6+ characters',
    features: ['Manager Career', 'Player Career', 'Season History', 'Cloud Synced']
  },
  es: {
    tagline: 'Tu Modo Carrera. Tu Legado.',
    subtitle: 'Registra cada temporada, cada fichaje, cada trofeo. El tracker definitivo para EA FC.',
    email: 'Email',
    password: 'Contraseña',
    login: 'Iniciar Sesión',
    register: 'Crear Cuenta',
    google: 'Entrar con Google',
    or: 'o',
    toggle_register: '¿No tienes cuenta? Regístrate',
    toggle_login: '¿Ya tienes cuenta? Inicia sesión',
    name: 'Tu nombre',
    error_email: 'Email inválido',
    error_password: 'La contraseña debe tener 6+ caracteres',
    features: ['Carrera Entrenador', 'Carrera Jugador', 'Historial de Temporadas', 'Sincronización en la nube']
  }
};

/* ─── Playr Logo SVG ─── */
const PlayrLogo = ({ size = 48, color = '#00F0FF' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGrad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor="#6C5CE7" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#logoGrad)" opacity="0.15" stroke={color} strokeWidth="2" />
    <path d="M20 16 L44 32 L20 48 Z" fill={color} opacity="0.9" />
    <rect x="20" y="16" width="6" height="32" rx="2" fill={color} />
  </svg>
);

/* ─── Login Screen Component ─── */
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
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError(err.message.replace('Firebase: ', '').replace(/\(auth\/.*\)/, ''));
    }
    setLoading(false);
  };

  const s = {
    page: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #0d1117 40%, #0f1923 100%)',
      fontFamily: "'Outfit', sans-serif",
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
    },
    bgOrb1: {
      position: 'absolute', width: 600, height: 600, borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(0,240,255,0.06) 0%, transparent 70%)',
      top: '-200px', right: '-100px', pointerEvents: 'none',
    },
    bgOrb2: {
      position: 'absolute', width: 500, height: 500, borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(108,92,231,0.06) 0%, transparent 70%)',
      bottom: '-150px', left: '-100px', pointerEvents: 'none',
    },
    card: {
      background: 'rgba(15,20,30,0.85)',
      backdropFilter: 'blur(40px)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 24,
      padding: '48px 40px',
      maxWidth: 440,
      width: '100%',
      position: 'relative',
      zIndex: 1,
      boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
    },
    logoRow: {
      display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8,
    },
    brand: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 36, fontWeight: 700, color: '#fff',
      letterSpacing: '-0.5px',
    },
    tagline: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 20, color: 'rgba(255,255,255,0.85)',
      marginBottom: 6, fontStyle: 'italic', fontWeight: 400,
    },
    subtitle: {
      fontSize: 13, color: 'rgba(255,255,255,0.4)',
      lineHeight: 1.5, marginBottom: 32,
    },
    features: {
      display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28,
    },
    badge: {
      fontSize: 11, padding: '4px 12px', borderRadius: 20,
      background: 'rgba(0,240,255,0.08)', color: '#00F0FF',
      border: '1px solid rgba(0,240,255,0.15)', fontWeight: 500,
    },
    input: {
      width: '100%', padding: '14px 16px', borderRadius: 12,
      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
      color: '#fff', fontSize: 14, fontFamily: "'Outfit', sans-serif",
      outline: 'none', marginBottom: 12, boxSizing: 'border-box',
      transition: 'border-color 0.2s',
    },
    btn: {
      width: '100%', padding: '14px', borderRadius: 12,
      background: 'linear-gradient(135deg, #00F0FF, #6C5CE7)',
      color: '#fff', fontSize: 15, fontWeight: 600,
      border: 'none', cursor: 'pointer',
      fontFamily: "'Outfit', sans-serif",
      transition: 'transform 0.15s, box-shadow 0.15s',
      boxShadow: '0 4px 20px rgba(0,240,255,0.2)',
    },
    divider: {
      display: 'flex', alignItems: 'center', gap: 12,
      margin: '20px 0', color: 'rgba(255,255,255,0.2)', fontSize: 12,
    },
    line: { flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' },
    googleBtn: {
      width: '100%', padding: '13px', borderRadius: 12,
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.1)',
      color: '#fff', fontSize: 14, fontWeight: 500,
      cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      transition: 'background 0.2s',
    },
    toggle: {
      textAlign: 'center', marginTop: 20, fontSize: 13,
      color: 'rgba(255,255,255,0.4)', cursor: 'pointer',
    },
    error: {
      background: 'rgba(255,60,60,0.1)', border: '1px solid rgba(255,60,60,0.2)',
      borderRadius: 10, padding: '10px 14px', fontSize: 13,
      color: '#ff6b6b', marginBottom: 16,
    },
    langRow: {
      display: 'flex', justifyContent: 'center', gap: 12,
      marginBottom: 24,
    },
    langBtn: (active) => ({
      fontSize: 12, padding: '4px 10px', borderRadius: 8,
      background: active ? 'rgba(0,240,255,0.15)' : 'transparent',
      color: active ? '#00F0FF' : 'rgba(255,255,255,0.3)',
      border: active ? '1px solid rgba(0,240,255,0.3)' : '1px solid transparent',
      cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
    }),
  };

  return (
    <div style={s.page}>
      <div style={s.bgOrb1} />
      <div style={s.bgOrb2} />
      <div style={s.card}>
        <div style={s.langRow}>
          {['pt-BR', 'en', 'es'].map(l => (
            <button key={l} style={s.langBtn(lang === l)} onClick={() => setLang(l)}>
              {l === 'pt-BR' ? '🇧🇷 PT' : l === 'en' ? '🇬🇧 EN' : '🇪🇸 ES'}
            </button>
          ))}
        </div>

        <div style={s.logoRow}>
          <PlayrLogo size={44} />
          <span style={s.brand}>Playr</span>
        </div>
        <div style={s.tagline}>{t.tagline}</div>
        <div style={s.subtitle}>{t.subtitle}</div>

        <div style={s.features}>
          {t.features.map((f, i) => <span key={i} style={s.badge}>{f}</span>)}
        </div>

        {error && <div style={s.error}>{error}</div>}

        <form onSubmit={handleEmail}>
          {isRegister && (
            <input
              style={s.input}
              placeholder={t.name}
              value={name}
              onChange={e => setName(e.target.value)}
              onFocus={e => e.target.style.borderColor = 'rgba(0,240,255,0.4)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
            />
          )}
          <input
            style={s.input}
            type="email"
            placeholder={t.email}
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            onFocus={e => e.target.style.borderColor = 'rgba(0,240,255,0.4)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
          />
          <input
            style={s.input}
            type="password"
            placeholder={t.password}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
            onFocus={e => e.target.style.borderColor = 'rgba(0,240,255,0.4)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
          />
          <button
            type="submit"
            style={{ ...s.btn, opacity: loading ? 0.7 : 1 }}
            disabled={loading}
            onMouseOver={e => { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 6px 30px rgba(0,240,255,0.3)'; }}
            onMouseOut={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 20px rgba(0,240,255,0.2)'; }}
          >
            {loading ? '...' : isRegister ? t.register : t.login}
          </button>
        </form>

        <div style={s.divider}>
          <div style={s.line} />
          <span>{t.or}</span>
          <div style={s.line} />
        </div>

        <button
          style={s.googleBtn}
          onClick={handleGoogle}
          disabled={loading}
          onMouseOver={e => e.target.style.background = 'rgba(255,255,255,0.08)'}
          onMouseOut={e => e.target.style.background = 'rgba(255,255,255,0.04)'}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A11.96 11.96 0 0 0 0 12c0 1.94.46 3.77 1.28 5.39l3.56-2.77z" transform="translate(0.5,0)"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {t.google}
        </button>

        <div
          style={s.toggle}
          onClick={() => { setIsRegister(!isRegister); setError(''); }}
          onMouseOver={e => e.target.style.color = '#00F0FF'}
          onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
        >
          {isRegister ? t.toggle_login : t.toggle_register}
        </div>
      </div>
    </div>
  );
}

/* ─── Auth Provider ─── */
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
        if (snap.exists()) {
          setUserData(snap.data());
        } else {
          const initial = {
            displayName: u.displayName || '',
            email: u.email,
            createdAt: serverTimestamp(),
            settings: { language: 'pt-BR', accentColor: '#00F0FF', currency: 'EUR', theme: 'dark' },
            saves: [],
          };
          await setDoc(ref, initial);
          setUserData(initial);
        }
      } else {
        setUserData(null);
      }
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
    if (snap.exists()) {
      setUserData(snap.data());
      return snap.data();
    }
    return null;
  }, [user]);

  const logout = () => signOut(auth);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#0a0a0f', color: '#00F0FF', fontFamily: "'Outfit', sans-serif", fontSize: 18,
      }}>
        <div style={{ textAlign: 'center' }}>
          <PlayrLogo size={56} />
          <div style={{ marginTop: 16, opacity: 0.7 }}>Loading...</div>
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
