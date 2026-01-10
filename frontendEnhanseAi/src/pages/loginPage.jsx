import React, { useState } from 'react'
import { UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom'
import { useToast } from '../components/AdminComponent/ui/useToast'
export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const navigate = useNavigate()
  const { showToast, ToastContainer } = useToast()


  async function handleLogin(e) {
    e.preventDefault()
    if (!email || !password) {
      showToast('Please enter both email and password', 'error')
      return
    }
    setIsLoading(true)
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', data.user.role);
      showToast('Login successful!', 'success');
      
      if (data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    } catch (error) {
      console.error('Login failed', error);
      showToast('Login failed. Please check your credentials.', 'error');
    } finally {
      setIsLoading(false)
    }
  }
 
  async function handleGoogleLogin() {
    setIsGoogleLoading(true)
    try {
      // TODO: Implement Google OAuth login
      // Example implementation:
      // const response = await fetch(import.meta.env.VITE_API_URL + '/api/auth/google', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ token: googleToken })
      // });
      // const data = await response.json();
      // For demo purposes - simulate Google login
      await new Promise((resolve) => setTimeout(resolve, 1500))
      showToast('Google login coming soon!', 'error')
      // Production code after implementing Google OAuth:
      // localStorage.setItem('token', data.token);
      // localStorage.setItem('userRole', data.user.role);
      // showToast('Login successful!', 'success');
      //
      // if (data.user.role === 'admin') {
      //   navigate('/admin');
      // } else {
      //   navigate('/home');
      // }
    } catch (error) {
      console.error('Google login failed', error)
      showToast('Google login failed. Please try again.', 'error')
    } finally {
      setIsGoogleLoading(false)
    }
  }
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[var(--mimosa-pink)] via-[var(--cream-bg)] to-[var(--blush-pink)] flex items-center justify-center p-4 font-inter">
      {ToastContainer}

      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Mimosa Forever
          </h1>
          <p className="text-sm text-gray-600">Admin Dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-8 animate-fade-in delay-100">
          <div className="mb-6">
            <h2 className="font-playfair text-2xl font-semibold text-gray-900 mb-1">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-600">Log in to manage your store</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mimosa.com"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[var(--blush-pink)] focus:border-transparent outline-none transition-all"
                disabled={isLoading || isGoogleLoading}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[var(--blush-pink)] focus:border-transparent outline-none transition-all"
                disabled={isLoading || isGoogleLoading}
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading || isGoogleLoading}
              className="w-full py-3 bg-[var(--blush-pink)] text-rose-900 rounded-lg font-medium hover:bg-[var(--blush-pink)]/90 hover:shadow-lg active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Logging in...
                </span>
              ) : (
                'Log In'
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/90 text-gray-500 font-medium">
                  OR
                </span>
              </div>
            </div>

            {/* Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading || isGoogleLoading}
              className="w-full py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 hover:shadow-md active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isGoogleLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Connecting...
                </span>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </>
              )}
            </button>
         {/* Create New Account Button */}
            <button
              type="button"
              onClick={() => navigate('/register')}
              //disabled={isLoading || isGoogleLoading}
              className="w-full py-3 bg-white border-2 border-[var(--blush-pink)] text-rose-900 rounded-lg font-medium hover:bg-[var(--mimosa-pink)]/30 hover:shadow-md active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <UserPlus size={20} />
              Create New Account
            </button>


            

            {/* Demo Credentials */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
              <p className="text-xs text-blue-800 font-medium mb-1">
                Demo Credentials:
              </p>
              <p className="text-xs text-blue-700">AdminEmail: ashan@example.com</p>
                            <p className="text-xs text-blue-700">userEmail:user@example.com</p>
              <p className="text-xs text-blue-700">Password: 123</p>
            </div>

            {/* Forgot Password */}
            <div className="text-center pt-2">
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-[var(--blush-pink)] transition-colors"
              >
                Forgot your password?
              </a>
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          © 2024 Mimosa Forever. All rights reserved.
        </p>
      </div>
    </div>
  )
}
