import { SignInButton, SignUpButton } from '@clerk/clerk-react';
import {
  ArrowRightIcon,
  SparklesIcon,
  ShieldIcon,
  ZapIcon,
  GlobeIcon,
} from 'lucide-react';

function HomePage() {
  return (
    <div className="h-screen bg-[#0F3220] text-white flex overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Gradient orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl" />

        {/* Geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-emerald-500/20 rounded-3xl rotate-12" />
        <div className="absolute bottom-32 right-20 w-24 h-24 border border-emerald-400/15 rounded-full" />
      </div>

      {/* LEFT SIDE */}
      <div className="flex flex-1 flex-col p-8 lg:p-12 relative z-10">
        {/* NAVBAR */}
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg shadow-black/20">
              <img src="/logo-nbh.png" alt="logo" className="size-6" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              National Authentified Telegrams
            </span>
          </div>

          <div className="flex items-center gap-2">
            <SignInButton mode="modal">
              <button className="px-5 py-2.5 text-sm font-medium text-white/70 hover:text-white transition-colors hover:bg-white/5 rounded-lg">
                Sign in
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-[#0F3220] text-sm font-semibold rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-black/40 active:scale-[0.98]">
                Get Started
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </SignUpButton>
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl">
          {/* Tag */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-medium tracking-wider">
              <SparklesIcon className="w-3 h-3" />
              Now Available
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05]">
            Secure Messaging
            <br />
            <span className="relative">
              <span className="bg-linear-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                Redefined
              </span>
              <span className="absolute -top-2 -right-4">
                <ShieldIcon className="w-8 h-8 text-emerald-400/50" />
              </span>
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg text-white/80 leading-relaxed max-w-lg">
            Enterprise-grade security meets effortless communication.End-to-end
            encrypted messaging with military-grade protectionfor governments,
            businesses, and individuals.
          </p>

          {/* Feature badges */}
          <div className="mt-8 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <ZapIcon className="w-4 h-4 text-emerald-400" />
              <span className="text-sm">Real-time Delivery</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <ShieldIcon className="w-4 h-4 text-emerald-400" />
              <span className="text-sm">End-to-End Encryption</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <GlobeIcon className="w-4 h-4 text-emerald-400" />
              <span className="text-sm">Global Reach</span>
            </div>
          </div>

          {/* CTA BTNS */}
          <div className="mt-10 flex items-center gap-4">
            <SignUpButton mode="modal">
              <button className="group flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20">
                Start Free Trial
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </SignUpButton>

            <SignInButton mode="modal">
              <button className="px-8 py-4 text-white/60 font-semibold hover:text-white transition-colors hover:bg-white/5 rounded-lg">
                Enterprise Login
              </button>
            </SignInButton>
          </div>

          {/* Avatars & Stats */}
          <div className="mt-12 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="avatar-group -space-x-3">
                {[
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
                ].map((src, index) => (
                  <div key={index} className="avatar">
                    <div className="w-10 rounded-full border-2 border-[#0F3220]">
                      <img src={src} alt="User avatar" />
                    </div>
                  </div>
                ))}
                <div className="avatar avatar-placeholder">
                  <div className="w-10 rounded-full border-2 border-[#0F3220] bg-emerald-500/20 text-emerald-300">
                    <span className="text-xs font-medium">+5k</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm text-white/70">Trusted by</div>
                <div className="text-lg font-semibold">
                  10,000+ Organizations
                </div>
              </div>
            </div>

            {/* Vertical divider */}
            <div className="w-px h-12 bg-white/10" />

            {/* Quick Stats */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold font-mono">99.99%</div>
                <div className="text-xs text-white/60 mt-1 uppercase tracking-wider">
                  Uptime SLA
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold font-mono">256-bit</div>
                <div className="text-xs text-white/60 mt-1 uppercase tracking-wider">
                  Encryption
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold font-mono">0-days</div>
                <div className="text-xs text-white/60 mt-1 uppercase tracking-wider">
                  Vulnerabilities
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center p-8">
        {/* Main card container */}
        <div className="relative w-full max-w-2xl">
          {/* Floating elements */}
          <div className="absolute -top-6 -left-6 z-20">
            <div className="px-4 py-2 bg-emerald-500/30 backdrop-blur-sm border border-emerald-400/40 rounded-full text-emerald-200 text-sm font-medium">
              ● Secure Channel Active
            </div>
          </div>

          <div className="absolute -bottom-6 -right-6 z-20">
            <div className="px-4 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-linear-to-br from-emerald-400 to-teal-500" />
                  <div className="w-6 h-6 rounded-full bg-linear-to-br from-cyan-400 to-blue-500" />
                </div>
                <span className="text-sm text-emerald-300 font-medium">
                  Encrypting...
                </span>
              </div>
            </div>
          </div>

          {/* Main card */}
          <div className="relative rounded-3xl overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl shadow-black/30">
            {/* Card header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <div className="text-lg font-semibold">
                    Secure Channel #001
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm text-emerald-300">Encrypted</span>
                </div>
              </div>
            </div>

            {/* Chat content */}
            <div className="p-6 space-y-6">
              {/* Message 1 */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-emerald-500 to-teal-500" />
                <div className="flex-1">
                  <div className="text-sm text-white/50">Admin • 2 min ago</div>
                  <div className="mt-1 p-4 rounded-2xl rounded-tl-none bg-emerald-500/20 border border-emerald-500/30 max-w-md">
                    <div className="text-white/90">
                      All messages in this channel are secured with 256-bit
                      encryption. The key exchange was completed successfully.
                    </div>
                  </div>
                </div>
              </div>

              {/* Message 2 */}
              <div className="flex gap-3 justify-end">
                <div className="flex-1 max-w-md">
                  <div className="text-sm text-white/50 text-right">
                    You • Just now
                  </div>
                  <div className="mt-1 p-4 rounded-2xl rounded-tr-none bg-white/10 border border-white/20">
                    <div className="text-white/90">
                      Understood. The security protocol is impressive. Ready to
                      proceed with transmission.
                    </div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-cyan-500 to-blue-500" />
              </div>

              {/* Encryption status */}
              <div className="flex items-center justify-center gap-2 p-4 rounded-xl bg-black/20 border border-white/5">
                <ShieldIcon className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-emerald-300">
                  End-to-end encrypted • Secure handshake verified
                </span>
              </div>
            </div>

            {/* Input area */}
            <div className="p-6 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-sm text-white/50">
                    Type your secure message...
                  </div>
                </div>
                <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

