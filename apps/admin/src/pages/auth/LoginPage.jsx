// =============================================================================
// src/pages/auth/LoginPage.jsx — Clean White & Off-White Admin Login
// =============================================================================
import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { CUSTOMIZATION } from '../../config/customization';

export default function LoginPage() {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    if (!email || !email.includes('@')) {
      setValidationError('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setValidationError('Password must be at least 6 characters.');
      return;
    }

    try {
      await login(email, password);
    } catch {
      // Error handled by AuthContext
    }
  };

  return (
    <div className="min-h-screen w-screen flex bg-[#FAF9F6] font-sans text-slate-800">
      {/* Left Brand Showcase (Desktop) */}
      <div className="hidden lg:flex flex-1 flex-col justify-between p-16 bg-[#F5F2EB] border-r border-[#EAE3D2] relative overflow-hidden">
        {/* Brand Header */}
        <div className="flex items-center gap-3 z-10">
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-[0.25em] text-slate-900 uppercase">
              AHVAAN
            </span>
            <span className="text-[10px] font-medium tracking-[0.35em] text-slate-500 uppercase mt-0.5">
              FOR YOU
            </span>
          </div>
        </div>

        {/* Centered Logo & Exclusive Title */}
        <div className="max-w-md z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-sm">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            Internal Admin Operations
          </div>
          
          {/* Logo without artificial white box */}
          <div className="pt-2">
            <img
              src="/logo.png"
              alt="Ahvaan for You"
              className="w-56 h-auto object-contain rounded-2xl shadow-xl border border-stone-800/40"
            />
          </div>

          <h2 className="text-3xl font-serif font-bold text-slate-900 tracking-tight leading-snug">
            Bespoke Wedding Invitations & Operations
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Manage your high-touch wedding clients, custom deliverable milestones, creator payouts, and business finances.
          </p>
        </div>

        <div className="text-xs text-slate-400 z-10">
          © {new Date().getFullYear()} Ahvaan for You. Internal administration portal.
        </div>
      </div>

      {/* Right Login Card */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-[#FAF9F6]">
        <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-3xl p-9 shadow-xl shadow-slate-900/5">
          {/* Header */}
          <div className="mb-8">
            <div className="lg:hidden flex flex-col mb-6">
              <span className="font-serif text-xl font-bold tracking-[0.25em] text-slate-900 uppercase">
                AHVAAN
              </span>
              <span className="text-[10px] font-medium tracking-[0.35em] text-slate-500 uppercase">
                FOR YOU
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Admin Sign In
            </h2>
            <p className="text-xs text-slate-500 mt-1.5">
              Enter your credentials to access the live operations panel
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  name="admin_email_field"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ahvaanforyou@gmail.com"
                  required
                  className="w-full bg-[#FAF9F6] border border-slate-200 text-slate-800 text-xs pl-10 pr-4 py-2.5 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="admin_pwd_field"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#FAF9F6] border border-slate-200 text-slate-800 text-xs pl-10 pr-10 py-2.5 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600 absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Banner */}
            {(validationError || error) && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
                {validationError || error}
              </div>
            )}

            {/* Sky Blue / Royal Blue Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 mt-2 cursor-pointer"
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Enter Admin Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
