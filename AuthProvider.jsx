import React,{createContext,useContext,useState,useEffect,useCallback} from 'react';
import {onAuthStateChanged,signInWithEmailAndPassword,createUserWithEmailAndPassword,signInWithPopup,signOut,updateProfile} from 'firebase/auth';
import {doc,getDoc,setDoc,updateDoc,serverTimestamp} from 'firebase/firestore';
import {auth,googleProvider,db} from './firebase.js';

const AC=createContext(null);
export const useAuth=()=>useContext(AC);

const tx={'pt-BR':{tag:'Seu Modo Carreira.',sub:'Registre temporadas, transferências e troféus.',email:'Email',pw:'Senha',login:'Entrar',reg:'Criar Conta',google:'Entrar com Google',or:'ou',toReg:'Criar conta',toLog:'Já tem conta? Entrar',name:'Seu nome'},'en':{tag:'Your Career Mode.',sub:'Track seasons, transfers and trophies.',email:'Email',pw:'Password',login:'Sign In',reg:'Create Account',google:'Sign in with Google',or:'or',toReg:'Create account',toLog:'Already have an account?',name:'Your name'},'es':{tag:'Tu Modo Carrera.',sub:'Registra temporadas, fichajes y trofeos.',email:'Email',pw:'Contraseña',login:'Entrar',reg:'Crear Cuenta',google:'Entrar con Google',or:'o',toReg:'Crear cuenta',toLog:'¿Ya tienes cuenta?',name:'Tu nombre'}};
const Logo=({s=28,c='#00e5ff'})=><svg width={s} height={s} viewBox="0 0 48 48" fill="none"><path d="M24 3L43 13v16q0 12-19 16Q5 41 5 29V13z" fill={c} opacity=".08" stroke={c} strokeWidth="1.5"/><path d="M24 15l6 4.5-2.3 7h-7.4L18 19.5z" fill={c} opacity=".25"/><path d="M24 15v-4M30 19.5l3.5-1.5M27.7 26.5l1.5 3.5M20.3 26.5l-1.5 3.5M18 19.5l-3.5-1.5" stroke={c} strokeWidth="1" opacity=".2"/></svg>;

function Login(){
  const[isR,setIsR]=useState(false);const[em,setEm]=useState('');const[pw,setPw]=useState('');const[nm,setNm]=useState('');const[err,setErr]=useState('');const[ld,setLd]=useState(false);
  const[lang,setLang]=useState(()=>{const n=navigator.language||'en';return n.startsWith('pt')?'pt-BR':n.startsWith('es')?'es':'en';});
  const t=tx[lang]||tx.en;
  const go=async e=>{e.preventDefault();setErr('');setLd(true);try{if(isR){const c=await createUserWithEmailAndPassword(auth,em,pw);if(nm)await updateProfile(c.user,{displayName:nm});}else await signInWithEmailAndPassword(auth,em,pw);}catch(e){setErr(e.message.replace('Firebase: ','').replace(/\(auth\/.*\)/,''));}setLd(false);};
  const gg=async()=>{setErr('');setLd(true);try{await signInWithPopup(auth,googleProvider);}catch(e){setErr(e.message.replace('Firebase: ','').replace(/\(auth\/.*\)/,''));}setLd(false);};
  const i={width:'100%',padding:'14px 16px',borderRadius:12,background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.07)',color:'#fff',fontSize:15,fontFamily:"'DM Sans',sans-serif",outline:'none',boxSizing:'border-box',marginBottom:10,transition:'border .15s'};
  return <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#080c14',fontFamily:"'DM Sans',sans-serif",padding:20}}>
    <div style={{maxWidth:380,width:'100%'}}>
      <div style={{display:'flex',justifyContent:'center',gap:6,marginBottom:28}}>
        {[['pt-BR','PT'],['en','EN'],['es','ES']].map(([c,l])=><button key={c} onClick={()=>setLang(c)} style={{fontSize:11,padding:'5px 12px',borderRadius:6,background:lang===c?'rgba(0,229,255,.1)':'rgba(255,255,255,.03)',color:lang===c?'#00e5ff':'rgba(255,255,255,.3)',border:'none',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>{l}</button>)}
      </div>
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:6}}><Logo s={32}/><span style={{fontSize:26,fontWeight:700,color:'#fff',letterSpacing:'.04em'}}>PLAYR</span></div>
      <div style={{fontSize:16,color:'#00e5ff',fontWeight:600,marginBottom:4,marginTop:8}}>{t.tag}</div>
      <div style={{fontSize:13,color:'rgba(255,255,255,.35)',marginBottom:28}}>{t.sub}</div>
      {err&&<div style={{background:'rgba(255,60,60,.06)',borderLeft:'3px solid #ff6b6b',borderRadius:8,padding:'10px 14px',fontSize:13,color:'#ff6b6b',marginBottom:14}}>{err}</div>}
      <form onSubmit={go}>
        {isR&&<input style={i} placeholder={t.name} value={nm} onChange={e=>setNm(e.target.value)} onFocus={e=>e.target.style.borderColor='rgba(0,229,255,.3)'} onBlur={e=>e.target.style.borderColor='rgba(255,255,255,.07)'}/>}
        <input style={i} type="email" placeholder={t.email} value={em} onChange={e=>setEm(e.target.value)} required onFocus={e=>e.target.style.borderColor='rgba(0,229,255,.3)'} onBlur={e=>e.target.style.borderColor='rgba(255,255,255,.07)'}/>
        <input style={i} type="password" placeholder={t.pw} value={pw} onChange={e=>setPw(e.target.value)} required minLength={6} onFocus={e=>e.target.style.borderColor='rgba(0,229,255,.3)'} onBlur={e=>e.target.style.borderColor='rgba(255,255,255,.07)'}/>
        <button type="submit" disabled={ld} style={{width:'100%',padding:14,borderRadius:12,background:'#00e5ff',color:'#000',fontSize:14,fontWeight:700,border:'none',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",opacity:ld?.6:1,marginTop:4}}>{ld?'...':isR?t.reg:t.login}</button>
      </form>
      <div style={{display:'flex',alignItems:'center',gap:12,margin:'18px 0',color:'rgba(255,255,255,.12)',fontSize:11}}><div style={{flex:1,height:1,background:'rgba(255,255,255,.06)'}}/><span>{t.or}</span><div style={{flex:1,height:1,background:'rgba(255,255,255,.06)'}}/></div>
      <button onClick={gg} disabled={ld} style={{width:'100%',padding:13,borderRadius:12,background:'rgba(255,255,255,.04)',border:'none',color:'rgba(255,255,255,.7)',fontSize:13,cursor:'pointer',fontFamily:"'DM Sans',sans-serif",display:'flex',alignItems:'center',justifyContent:'center',gap:10}}>
        <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A11.96 11.96 0 000 12c0 1.94.46 3.77 1.28 5.39l3.56-2.77z" transform="translate(.5 0)"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        {t.google}
      </button>
      <div onClick={()=>{setIsR(!isR);setErr('');}} style={{textAlign:'center',marginTop:18,fontSize:12,color:'rgba(255,255,255,.3)',cursor:'pointer'}}>{isR?t.toLog:t.toReg}</div>
    </div>
  </div>;
}

export function AuthProvider({children}){
  const[user,setUser]=useState(null);const[data,setData]=useState(null);const[ld,setLd]=useState(true);
  useEffect(()=>{return onAuthStateChanged(auth,async u=>{setUser(u);if(u){const r=doc(db,'users',u.uid);const s=await getDoc(r);if(s.exists())setData(s.data());else{const d={displayName:u.displayName||'',email:u.email,createdAt:serverTimestamp(),settings:{language:'pt-BR',accentColor:'#00e5ff',currency:'EUR'},saves:[]};await setDoc(r,d);setData(d);}}else setData(null);setLd(false);});},[]);
  const saveToCloud=useCallback(async d=>{if(!user)return;const r=doc(db,'users',user.uid);await updateDoc(r,{...d,updatedAt:serverTimestamp()});setData(p=>({...p,...d}));},[user]);
  const loadFromCloud=useCallback(async()=>{if(!user)return null;const r=doc(db,'users',user.uid);const s=await getDoc(r);if(s.exists()){setData(s.data());return s.data();}return null;},[user]);
  if(ld)return <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#080c14',color:'#00e5ff',fontFamily:"'DM Sans',sans-serif"}}><Logo s={40}/></div>;
  if(!user)return <Login/>;
  return <AC.Provider value={{user,userData:data,saveToCloud,loadFromCloud,logout:()=>signOut(auth)}}>{children}</AC.Provider>;
}
