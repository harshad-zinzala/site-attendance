import { useState } from 'react';
import { Mail, Lock, Sparkles, AlertCircle, Shield } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function Login({ onLoginSuccess, showToast }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      
      // Fetch role from user_roles
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (roleError) {
        console.warn("Could not fetch user role, defaulting to sub_admin:", roleError.message);
      }

      const role = roleData?.role || 'sub_admin';
      onLoginSuccess(data.user, role);
      showToast(`🎉 Welcome back, ${email}!`);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to sign in.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });
      if (error) throw error;
      
      showToast('✉️ Check your email for confirmation link! (or try logging in if auto-confirmed)');
      setIsSignUp(false);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to sign up.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center px-6 py-12 bg-slate-50 min-h-0 overflow-y-auto">
      <div className="w-full max-w-sm mx-auto space-y-6">
        
        {/* Logo and Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 rounded-3xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
            <Shield size={32} />
          </div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">ATPL Attendance</h2>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
            Site Sec-6 Access Authorization
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="font-bold text-slate-850 text-sm">
              {isSignUp ? 'Create New Account' : 'Sign In To Account'}
            </span>
          </div>

          {errorMsg && (
            <div className="flex items-start gap-2 bg-rose-50 border border-rose-100 text-rose-700 p-3 rounded-2xl text-xs font-semibold">
              <AlertCircle size={15} className="shrink-0 mt-0.5 text-rose-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-orange-500 text-slate-800 transition"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Security Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-orange-500 text-slate-800 transition"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-650 hover:to-amber-650 active:scale-98 text-white font-bold text-xs py-3.5 rounded-2xl shadow-lg shadow-orange-500/15 transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Sparkles size={14} />
                  <span>{isSignUp ? 'Register Account' : 'Authenticate credentials'}</span>
                </>
              )}
            </button>
          </form>

          {/* Toggle login vs signup */}
          <div className="text-center pt-2">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrorMsg('');
              }}
              className="text-xs text-orange-600 hover:underline font-bold"
            >
              {isSignUp ? 'Already have an account? Sign In' : 'Need a cloud account? Sign Up'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
