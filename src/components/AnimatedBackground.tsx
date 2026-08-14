export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06070d] via-[#080a14] to-[#06070d]" />

      {/* Animated grid */}
      <div className="absolute inset-0 opacity-[0.04] animate-grid-float" style={{
        backgroundImage: `
          linear-gradient(rgba(56,189,248,0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(56,189,248,0.5) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Glowing orbs */}
      <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full opacity-20 animate-orb-1"
        style={{ background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] rounded-full opacity-15 animate-orb-2"
        style={{ background: 'radial-gradient(circle, #0369a1 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="absolute top-[50%] left-[40%] w-[400px] h-[400px] rounded-full opacity-10 animate-orb-1"
        style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)', filter: 'blur(50px)' }} />

      {/* Scanline */}
      <div className="absolute inset-0">
        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500/30 to-transparent animate-scanline" />
      </div>

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />
    </div>
  );
}
