import Link from "next/link";

const services = [
  ["Strategy", "A plan for your business, audience, goals, and voice."],
  ["Content", "Captions, branded graphics, promotions, and edits from footage you supply."],
  ["Scheduling", "A planned calendar and consistent publishing."],
  ["Social management", "An active, recognizable presence without a daily task for you."],
  ["Smart workflow", "AI helps with research and organization. People guide your brand."],
  ["Optimization", "We review performance and improve the next cycle."],
];
const steps = [
  ["Tell us about your business", "Share your goals, audience, services, brand, and available assets."],
  ["We build your marketing system", "We shape the strategy, content plan, and approval workflow."],
  ["We take over the recurring work", "We create, organize, schedule, and manage the agreed content."],
  ["You get back to business", "You review what needs your sign-off while the cycle keeps moving."],
];
const faqs = [
  ["Do I have to create my own content?", "We create the planned content. You supply business facts, available photos or footage, and timely approvals. On-site photography is separately scoped."],
  ["Do I have to write captions or schedule posts?", "No. Captions, calendar planning, and scheduling are included."],
  ["How much time do you need from me?", "We gather the essentials at onboarding, then ask for input and approval when it matters."],
  ["Do you use AI?", "Yes, for efficient research, drafting, organization, and analysis. People guide creative direction and quality."],
  ["Can you work with my existing accounts?", "Yes. We use platform access roles or partner permissions. Never send us passwords through a form."],
  ["Are results guaranteed?", "No agency can guarantee reach, followers, inquiries, or sales. We report the work delivered and results we can measure."],
];
export default function Home() {
  return <>
    <section className="hero wrap" id="home"><div className="hero-copy">
      <p className="eyebrow">YOUR MARKETING. FULLY HANDLED.</p>
      <h1>You run your business.<br/><em>We run your marketing.</em></h1>
      <p className="lead">From strategy and content creation to scheduling, publishing, and ongoing management, we handle the recurring work so you don’t have to.</p>
      <p className="subtle">Powered by smart automation behind the scenes, with real people guiding your brand.</p>
      <div className="actions"><Link className="button" href="/get-started">Get Started ↗</Link><Link className="text-link" href="#how-it-works">See How It Works ↓</Link></div>
    </div><div className="hero-art"><img src="/nc-icon.webp" alt="New England Creatives coastal NC icon"/></div></section>
    <section className="burden"><div className="wrap burden-grid"><div><p className="eyebrow">ONE LESS THING TO CARRY</p><h2>Imagine never having to ask, <em>“What should I post today?”</em></h2><p>Your business already has enough moving parts. Ideas, captions, graphics, hashtags, trends, calendars, and posting times can live with us.</p></div><div className="burden-card"><span>YOUR MARKETING TO-DO LIST</span>{["Plan this week’s posts","Write captions","Design graphics","Remember to publish"].map(x=><div className="crossed" key={x}>{x}</div>)}<strong>Handled by New England Creatives.</strong></div></div></section>
    <section className="section wrap" id="services"><div className="section-head"><p className="eyebrow">WHAT WE HANDLE</p><h2>You hand us the marketing.<br/><em>We handle the rest.</em></h2></div><div className="service-grid">{services.map(([a,b],i)=><article className="service-card" key={a}><span className="number">0{i+1}</span><h3>{a}</h3><p>{b}</p></article>)}</div><div className="center-action"><Link className="text-link" href="/services">Explore services and packages ↗</Link></div></section>
    <section className="autopilot"><div className="wrap"><p className="eyebrow light">A SYSTEM THAT KEEPS MOVING</p><h2>Put your marketing <em>on autopilot.</em></h2><p>Once we’re set up, your marketing doesn’t have to live in your head. Our team combines strategy, creative work, and careful automation to keep it moving.</p><div className="process">{["Your business","Our creative team","Human-led work + smart tools","Your audience"].map(x=><div key={x}>{x}</div>)}</div><p>You stay focused on your business. We stay focused on your marketing.</p></div></section>
    <section className="section wrap" id="how-it-works"><div className="section-head"><p className="eyebrow">HOW IT WORKS</p><h2>Getting started is easier<br/>than doing it yourself.</h2></div><div className="steps">{steps.map(([a,b],i)=><article key={a}><span>0{i+1}</span><div><h3>{a}</h3><p>{b}</p></div></article>)}</div><Link className="button" href="/get-started">Let’s Get Started ↗</Link></section>
    <section className="answer"><div className="wrap answer-grid"><div><p className="eyebrow">A FAIR QUESTION</p><h2>So… what do <em>you</em> actually have to do?</h2></div><div><p className="big-answer">Less than you think.</p><p>Provide the initial information, platform access through roles, the assets you have, and timely approvals. We do the planning and production.</p></div></div></section>
    <section className="section wrap"><div className="section-head"><p className="eyebrow">WHO IT’S FOR</p><h2>Built for business owners<br/>with better things to do.</h2></div><div className="industries">{["Restaurants & food","Beauty & wellness","Retail","Professional services","Local service businesses","Startups & entrepreneurs"].map(x=><span key={x}>{x}</span>)}</div><p className="section-note">Our goal is the same for each business: take the recurring marketing workload off your plate.</p></section>
    <section className="value"><div className="wrap"><p className="eyebrow">THE VALUE</p><h2>More consistency. <em>Less work.</em></h2><div className="value-grid"><div>Less time spent marketing</div><div>More consistent content</div><div>A system that keeps moving</div></div><p>We build a recognizable presence that supports your business without asking you to manage it every day.</p></div></section>
    <section className="section wrap" id="portfolio"><div className="section-head"><p className="eyebrow">PORTFOLIO</p><h2>Your business could<br/><em>look like this.</em></h2><p>Our first client projects are in development. Real work will appear here with permission.</p></div><div className="sample-grid">{[["FEED","Consistent brand stories"],["VIDEO","Short-form storytelling"],["CAMPAIGN","Local promotions"]].map(([a,b],i)=><div key={a}><span>0{i+1} / {a}</span><strong>{b}</strong><small>Sample format · No client work shown</small></div>)}</div></section>
    <section className="about" id="about"><div className="wrap about-grid"><div><p className="eyebrow">ABOUT US</p><h2>We’re the people<br/>behind your marketing.</h2><p>Our mission is simple: make marketing manageable, meaningful, and effective so small business owners can spend less time marketing and more time growing their business.</p></div><div className="roles"><article><span>CREATIVE LEAD</span><h3>Brand & marketing strategy</h3><p>Creative direction, content planning, brand positioning, and quality control.</p></article><article><span>OPERATIONS LEAD</span><h3>Client relationships & delivery</h3><p>Business development, client communication, scheduling, and keeping work moving.</p></article></div></div></section>
    <section className="section wrap" id="pricing"><div className="section-head"><p className="eyebrow">PRICING</p><h2>Simple marketing.<br/><em>Simple pricing.</em></h2><p>Clear monthly scopes with one-time activation for setup and strategy.</p></div><div className="price-grid">{[["STARTER","400","150","12","2"],["GROWTH","650","200","16","3"],["PARTNER","1,000","300","20","4"]].map(([a,b,c,d,e])=><article key={a}><span>{a}</span><h3>${b} <small>/ month</small></h3><p>${c} activation · {d} content pieces · up to {e} platforms</p><Link href={"/services#"+a.toLowerCase()}>See {a.toLowerCase()} ↗</Link></article>)}</div><p className="price-note">Paid ads, on-site production, and daily inbox management are separately scoped. USD.</p></section>
    <section className="faq wrap" id="faq"><div className="section-head"><p className="eyebrow">FAQ</p><h2>Good questions,<br/><em>straight answers.</em></h2></div><div className="faq-list">{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
    <section className="final-cta"><div className="wrap"><p className="eyebrow light">MARKETING MADE MANAGEABLE</p><h2>You have a business to run.<br/><em>Let us handle the marketing.</em></h2><p>Stop spending your nights wondering what to post tomorrow.</p><Link className="button button-light" href="/get-started">Get Started ↗</Link></div></section>
  </>;
}
