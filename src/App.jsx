import { useState, useEffect } from "react";

const TALLY_URL = "https://tally.so/r/RG4Eqj";

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Load Tally script
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.head.appendChild(script);

    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openTally = () => {
    if (window.Tally) {
      window.Tally.openPopup("RG4Eqj", { width: 440 });
    } else {
      window.open(TALLY_URL, "_blank");
    }
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&family=Instrument+Sans:wght@300;400;500;600&display=swap');

    :root {
      --cream: #f7f4ee;
      --cream2: #efe9de;
      --cream3: #e5ddd0;
      --ink: #1a1710;
      --ink-mid: #4a4640;
      --ink-soft: #9a9388;
      --green: #2a5e40;
      --green-mid: #3a7d56;
      --green-light: #eaf3ed;
      --green-accent: #4a9e6a;
      --border: rgba(26,23,16,0.1);
      --border-soft: rgba(26,23,16,0.06);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background: var(--cream);
      color: var(--ink);
      font-family: 'Instrument Sans', sans-serif;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }

    /* NAV */
    .nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      padding: 22px 52px;
      display: flex; align-items: center; justify-content: space-between;
      transition: all 0.35s;
    }
    .nav.scrolled {
      background: rgba(247,244,238,0.9);
      backdrop-filter: blur(24px);
      border-bottom: 1px solid var(--border);
      padding: 16px 52px;
    }
    .nav-logo {
      font-family: 'Playfair Display', serif;
      font-weight: 900; font-size: 24px;
      letter-spacing: -0.03em; color: var(--ink);
    }
    .nav-logo span { color: var(--green-accent); }
    .nav-right { display: flex; align-items: center; gap: 24px; }
    .nav-link {
      font-size: 13px; font-weight: 500; color: var(--ink-soft);
      background: none; border: none; cursor: pointer;
      font-family: 'Instrument Sans', sans-serif; transition: color 0.2s;
    }
    .nav-link:hover { color: var(--ink); }
    .nav-pill {
      background: var(--ink); color: var(--cream);
      border: none; border-radius: 99px;
      padding: 10px 22px;
      font-family: 'Instrument Sans', sans-serif;
      font-size: 13px; font-weight: 600;
      cursor: pointer; transition: all 0.2s;
    }
    .nav-pill:hover { background: var(--green); transform: translateY(-1px); }

    /* HERO */
    .hero {
      min-height: 100vh;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      text-align: center;
      padding: 140px 24px 100px;
      position: relative; overflow: hidden;
    }

    .hero-bg {
      position: absolute; inset: 0; z-index: 0;
      background:
        radial-gradient(ellipse 70% 60% at 50% 0%, rgba(74,158,106,0.1) 0%, transparent 65%),
        radial-gradient(ellipse 50% 40% at 80% 90%, rgba(42,94,64,0.07) 0%, transparent 60%),
        radial-gradient(ellipse 40% 40% at 10% 80%, rgba(234,243,237,0.8) 0%, transparent 60%);
    }

    .hero-content { position: relative; z-index: 1; max-width: 860px; }

    .badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--green-light);
      border: 1px solid rgba(42,94,64,0.18);
      border-radius: 99px;
      padding: 7px 16px;
      font-size: 11px; font-weight: 600;
      color: var(--green); letter-spacing: 0.08em;
      text-transform: uppercase; margin-bottom: 32px;
    }
    .badge-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--green-accent);
      animation: blink 2s infinite;
    }
    @keyframes blink {
      0%, 100% { opacity: 1; } 50% { opacity: 0.3; }
    }

    .hero-title {
      font-family: 'Playfair Display', serif;
      font-weight: 900;
      font-size: clamp(68px, 11vw, 130px);
      line-height: 0.93;
      letter-spacing: -0.03em;
      color: var(--ink);
      margin-bottom: 28px;
    }
    .hero-title .italic { font-style: italic; color: var(--green); }
    .hero-title .outline {
      -webkit-text-stroke: 2.5px var(--ink);
      color: transparent;
    }

    .hero-sub {
      font-size: 19px; color: var(--ink-mid);
      line-height: 1.65; max-width: 520px;
      margin: 0 auto 52px; font-weight: 400;
    }

    .waitlist-form {
      display: flex; gap: 10px;
      max-width: 460px; margin: 0 auto 18px;
    }
    .waitlist-input {
      flex: 1; background: #fff;
      border: 1.5px solid var(--border);
      border-radius: 14px;
      padding: 16px 20px;
      font-family: 'Instrument Sans', sans-serif;
      font-size: 15px; color: var(--ink);
      outline: none; transition: all 0.2s;
      box-shadow: 0 1px 4px rgba(26,23,16,0.04);
    }
    .waitlist-input::placeholder { color: var(--ink-soft); }
    .waitlist-input:focus {
      border-color: var(--green-mid);
      box-shadow: 0 0 0 3px rgba(42,94,64,0.08);
    }
    .waitlist-btn {
      background: var(--ink); color: var(--cream);
      border: none; border-radius: 14px;
      padding: 16px 26px;
      font-family: 'Instrument Sans', sans-serif;
      font-size: 15px; font-weight: 600;
      cursor: pointer; transition: all 0.2s;
      white-space: nowrap;
    }
    .waitlist-btn:hover { background: var(--green); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(42,94,64,0.25); }

    .social-proof { font-size: 13px; color: var(--ink-soft); font-weight: 500; }
    .social-proof strong { color: var(--green); }

    .success-msg {
      display: flex; align-items: center; justify-content: center; gap: 10px;
      background: var(--green-light);
      border: 1.5px solid rgba(42,94,64,0.2);
      border-radius: 14px; padding: 16px 24px;
      font-size: 15px; color: var(--green); font-weight: 600;
      max-width: 460px; margin: 0 auto 18px;
    }

    /* DIVIDER */
    .divider {
      border: none; border-top: 1px solid var(--border);
      max-width: 1100px; margin: 0 auto;
    }

    /* SECTIONS */
    .section { padding: 120px 52px; max-width: 1100px; margin: 0 auto; }

    .eyebrow {
      display: flex; align-items: center; gap: 12px; margin-bottom: 20px;
    }
    .eyebrow-line { width: 32px; height: 2px; background: var(--green-accent); border-radius: 99px; }
    .eyebrow-text {
      font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
      text-transform: uppercase; color: var(--green);
    }

    .section-title {
      font-family: 'Playfair Display', serif;
      font-weight: 900;
      font-size: clamp(40px, 5vw, 58px);
      letter-spacing: -0.025em; color: var(--ink);
      line-height: 1.05; margin-bottom: 64px;
    }
    .section-title em { color: var(--green); font-style: italic; }

    /* STEPS */
    .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }

    .step {
      background: #fff;
      border: 1px solid var(--border-soft);
      border-radius: 28px; padding: 36px 32px;
      transition: all 0.3s; position: relative; overflow: hidden;
    }
    .step::after {
      content: '';
      position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
      background: linear-gradient(90deg, var(--green), var(--green-accent));
      transform: scaleX(0); transform-origin: left;
      transition: transform 0.3s;
    }
    .step:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(26,23,16,0.08); }
    .step:hover::after { transform: scaleX(1); }

    .step-num {
      font-family: 'Playfair Display', serif;
      font-size: 13px; font-weight: 700; font-style: italic;
      color: var(--green-accent); margin-bottom: 20px;
    }
    .step-icon-wrap {
      width: 48px; height: 48px;
      background: var(--green-light);
      border-radius: 14px;
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 20px;
    }
    .step-title {
      font-family: 'Playfair Display', serif;
      font-size: 22px; font-weight: 800;
      color: var(--ink); margin-bottom: 12px; letter-spacing: -0.02em;
    }
    .step-body { font-size: 14px; color: var(--ink-mid); line-height: 1.72; }

    /* REWARDS */
    .rewards-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }

    .reward-card {
      background: #fff;
      border: 1px solid var(--border-soft);
      border-top: 3px solid var(--green-accent);
      border-radius: 24px; padding: 28px 20px 28px;
      text-align: center; transition: all 0.25s;
    }
    .reward-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(26,23,16,0.08); border-color: var(--green-accent); }
    .reward-name {
      font-family: 'Playfair Display', serif;
      font-size: 17px; font-weight: 800; color: var(--ink); margin-bottom: 5px;
    }
    .reward-val { font-size: 13px; color: var(--ink-soft); font-weight: 500; }

    /* STATS */
    .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

    .stat-card {
      background: var(--ink); border-radius: 28px; padding: 44px 36px;
      position: relative; overflow: hidden;
    }
    .stat-card::before {
      content: '';
      position: absolute; top: 0; right: 0;
      width: 120px; height: 120px;
      background: radial-gradient(circle, rgba(74,158,106,0.15) 0%, transparent 70%);
    }
    .stat-num {
      font-family: 'Playfair Display', serif;
      font-size: 62px; font-weight: 900;
      color: var(--cream); letter-spacing: -0.04em;
      line-height: 1; margin-bottom: 12px;
    }
    .stat-num span { color: var(--green-accent); }
    .stat-label { font-size: 14px; color: rgba(247,244,238,0.4); line-height: 1.6; }

    /* CTA */
    .cta-section {
      background: var(--cream2);
      border-top: 1px solid var(--border);
      padding: 140px 24px;
      text-align: center;
    }
    .cta-inner { max-width: 640px; margin: 0 auto; }
    .cta-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(48px, 7vw, 80px);
      font-weight: 900; letter-spacing: -0.035em;
      color: var(--ink); line-height: 0.95; margin-bottom: 20px;
    }
    .cta-title em { color: var(--green); font-style: italic; }
    .cta-sub { font-size: 17px; color: var(--ink-mid); margin-bottom: 48px; line-height: 1.65; }

    /* FOOTER */
    footer {
      padding: 36px 52px;
      display: flex; align-items: center; justify-content: space-between;
      border-top: 1px solid var(--border);
    }
    .footer-logo {
      font-family: 'Playfair Display', serif;
      font-weight: 900; font-size: 20px;
      letter-spacing: -0.03em; color: var(--ink-soft);
    }
    .footer-logo span { color: var(--green-accent); }
    .footer-copy { font-size: 13px; color: var(--ink-soft); }

    /* ANIMATIONS */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(22px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .fade-up { animation: fadeUp 0.65s ease forwards; }
    .d1 { animation-delay: 0.1s; opacity: 0; }
    .d2 { animation-delay: 0.2s; opacity: 0; }
    .d3 { animation-delay: 0.3s; opacity: 0; }
    .d4 { animation-delay: 0.4s; opacity: 0; }

    @media (max-width: 860px) {
      .steps { grid-template-columns: 1fr; }
      .rewards-grid { grid-template-columns: repeat(2, 1fr); }
      .stats-grid { grid-template-columns: 1fr; }
      .section { padding: 80px 24px; }
      .nav { padding: 16px 24px; }
      .nav.scrolled { padding: 12px 24px; }
      footer { flex-direction: column; gap: 10px; text-align: center; padding: 28px 24px; }
      .waitlist-form { flex-direction: column; }
      .hero-title { font-size: clamp(56px, 14vw, 88px); }
    }
  `;

  const stepData = [
    {
      num: "01",
      title: "Connect Screen Time",
      body: "Link your iPhone's built-in Screen Time in seconds. No extra tracking, no battery drain — we use what's already there.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <circle cx="12" cy="17" r="1" fill="var(--green)" stroke="none" />
        </svg>
      ),
    },
    {
      num: "02",
      title: "Build your streak",
      body: "Stay under 3 hours a day. Every day you hit your target adds to your streak. Miss a day and it resets — simple as that.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
      ),
    },
    {
      num: "03",
      title: "Claim your reward",
      body: "7 days in a row and you unlock a real gift card. Choose your reward from day one so you always know what you're working toward.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 12 20 22 4 22 4 12" />
          <rect x="2" y="7" width="20" height="5" />
          <line x1="12" y1="22" x2="12" y2="7" />
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
      ),
    },
  ];

  const rewardData = [
    { name: "Starbucks", val: "£3 gift card" },
    { name: "Deliveroo", val: "£5 gift card" },
    { name: "Amazon", val: "£5 gift card" },
    { name: "ASOS", val: "£10 gift card" },
  ];

  return (
    <>
      <style>{css}</style>

      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo">stil<span>.</span></div>
        <div className="nav-right">
          <button className="nav-link" onClick={() => document.getElementById("how").scrollIntoView({ behavior: "smooth" })}>How it works</button>
          <button className="nav-link" onClick={() => document.getElementById("rewards").scrollIntoView({ behavior: "smooth" })}>Rewards</button>
          <button className="nav-pill" onClick={() => document.getElementById("waitlist").scrollIntoView({ behavior: "smooth" })}>Join waitlist</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <div className="badge fade-up">
            <div className="badge-dot" />
            Early access — join the waitlist
          </div>

          <h1 className="hero-title fade-up d1">
            Phone<br />
            <span className="italic">down,</span><br />
            <span className="outline">live more.</span>
          </h1>

          <p className="hero-sub fade-up d2">
            Reduce your daily screen time and earn real gift cards from brands you actually use. 7 days. Real rewards. Free forever.
          </p>

          <div id="waitlist" className="fade-up d3">
            <button className="waitlist-btn" onClick={openTally} style={{ fontSize: 16, padding: "18px 36px", borderRadius: 14 }}>
              Join the waitlist →
            </button>
            <p className="social-proof" style={{ marginTop: 16 }}>Free forever · Takes 10 seconds</p>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* HOW IT WORKS */}
      <section id="how" className="section">
        <div className="eyebrow">
          <div className="eyebrow-line" />
          <div className="eyebrow-text">How it works</div>
        </div>
        <div className="section-title">Three steps.<br /><em>One good habit.</em></div>
        <div className="steps">
          {stepData.map((s, i) => (
            <div key={i} className="step">
              <div className="step-num">{s.num}</div>
              <div className="step-icon-wrap">{s.icon}</div>
              <div className="step-title">{s.title}</div>
              <p className="step-body">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* REWARDS */}
      <section id="rewards" className="section">
        <div className="eyebrow">
          <div className="eyebrow-line" />
          <div className="eyebrow-text">Rewards</div>
        </div>
        <div className="section-title" style={{ marginBottom: 16 }}>Real brands.<br /><em>Real value.</em></div>
        <p style={{ fontSize: 16, color: "var(--ink-mid)", marginBottom: 52, maxWidth: 500, lineHeight: 1.7 }}>
          No points that expire. No vouchers you'll never use. Just gift cards from places you already love.
        </p>
        <div className="rewards-grid">
          {rewardData.map((r, i) => (
            <div key={i} className="reward-card">
              <div className="reward-name">{r.name}</div>
              <div className="reward-val">{r.val}</div>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* STATS */}
      <section className="section" style={{ paddingTop: 80 }}>
        <div className="stats-grid">
          {[
            { num: "4–6", unit: "hrs", label: "Average daily screen time in the UK" },
            { num: "7", unit: " days", label: "To earn your first reward" },
            { num: "£0", unit: "", label: "Cost to join. Free forever." },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-num">{s.num}<span>{s.unit}</span></div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2 className="cta-title">Ready to put<br />your <em>phone down?</em></h2>
          <p className="cta-sub">Join the waitlist and be first to know when Stil launches.</p>
          <button className="waitlist-btn" onClick={openTally} style={{ fontSize: 16, padding: "18px 36px", borderRadius: 14 }}>
            Join the waitlist →
          </button>
        </div>
      </section>

      <footer>
        <div className="footer-logo">stil<span>.</span></div>
        <div className="footer-copy">© 2026 Stil. Coming soon to iOS.</div>
      </footer>
    </>
  );
}
