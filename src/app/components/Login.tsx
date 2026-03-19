import { useState } from 'react';
import { Link } from 'react-router';
import { ChatWidget } from './ChatWidget';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Navigation */}
      <nav className="px-12 py-5 flex justify-between items-center border-b border-[#e5e5e5]">
        <Link to="/" className="text-[1.2rem] font-bold text-[#2d6a4f] tracking-[0.02em] no-underline">
          GreenGauge
        </Link>
        <div>
          <Link 
            to="/" 
            className="no-underline text-[#555] text-[0.85rem] ml-7 hover:text-[#2d6a4f] transition-colors"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Login Form */}
      <div className="flex items-center justify-center px-12 py-20">
        <div className="w-full max-w-[420px]">
          <div className="mb-8">
            <h1 className="text-[2rem] font-normal text-[#111] mb-3">Welcome back</h1>
            <p 
              className="text-[0.9rem] text-[#666] leading-[1.6]"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              Sign in to access your ESG evaluation dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label 
                htmlFor="email" 
                className="block text-[0.85rem] text-[#444] mb-2"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-[#ccc] rounded-[3px] text-[0.9rem] focus:outline-none focus:border-[#2d6a4f] transition-colors"
                style={{ fontFamily: 'Arial, sans-serif' }}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-[0.85rem] text-[#444] mb-2"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-[#ccc] rounded-[3px] text-[0.9rem] focus:outline-none focus:border-[#2d6a4f] transition-colors"
                style={{ fontFamily: 'Arial, sans-serif' }}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label 
                className="flex items-center text-[0.85rem] text-[#555] cursor-pointer"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                <input
                  type="checkbox"
                  className="mr-2 accent-[#2d6a4f]"
                />
                Remember me
              </label>
              <a 
                href="#" 
                className="text-[0.85rem] text-[#2d6a4f] no-underline hover:underline"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#2d6a4f] text-white px-[26px] py-3 text-[0.85rem] rounded-[3px] hover:bg-[#1b4d37] transition-colors cursor-pointer"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p 
              className="text-[0.85rem] text-[#666]"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              Don't have an account?{' '}
              <a 
                href="#" 
                className="text-[#2d6a4f] no-underline hover:underline"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#e5e5e5] px-12 py-6 flex justify-between items-center mt-auto">
        <div className="text-[1rem] font-bold text-[#2d6a4f] tracking-[0.02em]">GreenGauge</div>
        <p 
          className="text-[0.78rem] text-[#bbb]"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          &copy; 2025 GreenGauge ESG Evaluation. All rights reserved.
        </p>
      </footer>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
}