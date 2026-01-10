import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../components/AdminComponent/ui/useToast'
import { ArrowLeft, UserPlus, Check } from 'lucide-react'
export function RegisterPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const navigate = useNavigate()
  const { showToast, ToastContainer } = useToast()
  async function handleRegister(e) {
    e.preventDefault()
    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      showToast('Please fill in all fields', 'error')
      return
    }
    if (password !== confirmPassword) {
      showToast('Passwords do not match', 'error')
      return
    }
    if (password.length < 6) {
      showToast('Password must be at least 6 characters', 'error')
      return
    }
    if (!agreeToTerms) {
      showToast('Please agree to the terms and conditions', 'error')
      return
    }
    setIsLoading(true)
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password })
      });
      
      const data = await response.json();
      
      // Check if the response was successful (status 200-299)
      if (response.ok) {
        showToast('Account created successfully!', 'success');
        // Navigate to login page after a short delay
        setTimeout(() => navigate('/login'), 1500);
      } else {
        // Handle error response from backend with detailed message
        showToast(data.message || 'Registration failed. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Registration failed', error)
      showToast('Network error. Please check your connection and try again.', 'error')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[var(--mimosa-pink)] via-[var(--cream-bg)] to-[var(--blush-pink)] flex items-center justify-center p-4 font-inter">
      {ToastContainer}

      <div className="w-full max-w-2xl">
        {/* Back to Login Link */}
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 transition-colors animate-fade-in group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="font-medium">Back to Login</span>
        </button>

        {/* Logo/Brand */}
        <div className="text-center mb-8 animate-fade-in delay-100">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Mimosa Forever
          </h1>
          <p className="text-sm text-gray-600">Create Your Admin Account</p>
        </div>

        {/* Registration Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-8 animate-fade-in delay-200">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--blush-pink)] text-rose-900 flex items-center justify-center font-semibold shadow-sm">
                  1
                </div>
                <div>
                  <p className="font-medium text-gray-900">Account Details</p>
                  <p className="text-xs text-gray-500">Basic information</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <div className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center text-xs">
                  2
                </div>
                <span className="text-xs hidden sm:inline">Verification</span>
              </div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-gradient-to-r from-[var(--blush-pink)] to-[var(--mimosa-pink)] rounded-full transition-all duration-500"></div>
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onFocus={() => setFocusedField('firstName')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="John"
                  className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 placeholder-gray-400 outline-none transition-all duration-300 ${focusedField === 'firstName' ? 'border-[var(--blush-pink)] ring-2 ring-[var(--blush-pink)]/20 scale-[1.02]' : 'border-gray-200'}`}
                  disabled={isLoading}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  onFocus={() => setFocusedField('lastName')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Doe"
                  className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 placeholder-gray-400 outline-none transition-all duration-300 ${focusedField === 'lastName' ? 'border-[var(--blush-pink)] ring-2 ring-[var(--blush-pink)]/20 scale-[1.02]' : 'border-gray-200'}`}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

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
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder="john.doe@example.com"
                className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 placeholder-gray-400 outline-none transition-all duration-300 ${focusedField === 'email' ? 'border-[var(--blush-pink)] ring-2 ring-[var(--blush-pink)]/20 scale-[1.02]' : 'border-gray-200'}`}
                disabled={isLoading}
                required
              />
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Min. 6 characters"
                  className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 placeholder-gray-400 outline-none transition-all duration-300 ${focusedField === 'password' ? 'border-[var(--blush-pink)] ring-2 ring-[var(--blush-pink)]/20 scale-[1.02]' : 'border-gray-200'}`}
                  disabled={isLoading}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Re-enter password"
                  className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 placeholder-gray-400 outline-none transition-all duration-300 ${focusedField === 'confirmPassword' ? 'border-[var(--blush-pink)] ring-2 ring-[var(--blush-pink)]/20 scale-[1.02]' : 'border-gray-200'}`}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="relative flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="w-5 h-5 text-[var(--blush-pink)] border-gray-300 rounded focus:ring-2 focus:ring-[var(--blush-pink)] cursor-pointer"
                  disabled={isLoading}
                />
                {agreeToTerms && (
                  <Check
                    size={14}
                    className="absolute left-0.5 top-0.5 text-rose-900 pointer-events-none"
                  />
                )}
              </div>
              <label
                htmlFor="terms"
                className="text-sm text-gray-700 cursor-pointer"
              >
                I agree to the{' '}
                <a
                  href="#"
                  className="text-[var(--blush-pink)] hover:underline font-medium"
                >
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a
                  href="#"
                  className="text-[var(--blush-pink)] hover:underline font-medium"
                >
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[var(--blush-pink)] text-rose-900 rounded-lg font-medium hover:bg-[var(--blush-pink)]/90 hover:shadow-lg active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                  Creating Account...
                </span>
              ) : (
                <>
                  <UserPlus size={20} />
                  Create Account
                </>
              )}
            </button>

            {/* Already have account */}
            <div className="text-center pt-2">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-[var(--blush-pink)] hover:underline font-medium"
                >
                  Log in here
                </button>
              </p>
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
