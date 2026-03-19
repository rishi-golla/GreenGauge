import { Link } from 'react-router';
import { ChatWidget } from './ChatWidget';

export function Home() {
  return (
    <div className="min-h-screen bg-white text-[#222]" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Navigation */}
      <nav className="px-12 py-5 flex justify-between items-center border-b border-[#e5e5e5]">
        <div className="text-[1.2rem] font-bold text-[#2d6a4f] tracking-[0.02em]">GreenGauge</div>
        <div>
          <a 
            href="#" 
            className="no-underline text-[#555] text-[0.85rem] ml-7 hover:text-[#2d6a4f] transition-colors"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            About
          </a>
          <a 
            href="#" 
            className="no-underline text-[#555] text-[0.85rem] ml-7 hover:text-[#2d6a4f] transition-colors"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            Methodology
          </a>
          <a 
            href="#" 
            className="no-underline text-[#555] text-[0.85rem] ml-7 hover:text-[#2d6a4f] transition-colors"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            Contact
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="px-12 pt-[90px] pb-[70px] max-w-[680px]">
        <div 
          className="inline-block bg-[#e8f5ee] text-[#2d6a4f] text-[0.72rem] tracking-[0.12em] uppercase px-3 py-[5px] rounded-[20px] mb-[22px]"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          ESG Shareholder Evaluation
        </div>
        <h1 className="text-[2.5rem] leading-[1.3] text-[#111] mb-[18px] font-normal">
          Helping shareholders <em className="italic text-[#2d6a4f]">understand</em> what companies stand for
        </h1>
        <p 
          className="text-[0.95rem] text-[#666] leading-[1.75] mb-8 max-w-[520px]"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          GreenGauge evaluates companies across Environmental, Social, and Governance criteria — giving shareholders clear, honest insight into long-term sustainability and accountability.
        </p>
        <a 
          href="#overview" 
          className="inline-block bg-[#2d6a4f] text-white px-[26px] py-3 text-[0.85rem] no-underline rounded-[3px] mr-3 hover:bg-[#1b4d37] transition-colors"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          Learn More
        </a>
        <a 
          href="#pillars" 
          className="inline-block border border-[#ccc] text-[#444] px-[26px] py-3 text-[0.85rem] no-underline rounded-[3px] hover:bg-[#f5f5f5] transition-colors mr-3"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          How It Works
        </a>
        <Link 
          to="/login" 
          className="inline-block bg-[#2d6a4f] text-white px-[26px] py-3 text-[0.85rem] no-underline rounded-[3px] hover:bg-[#1b4d37] transition-colors"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          Login
        </Link>
      </div>

      {/* Divider */}
      <hr className="border-none border-t border-[#e5e5e5] mx-12" />

      {/* What is ESG Section */}
      <div className="px-12 py-16 grid grid-cols-[1fr_2fr] gap-12 max-w-[960px]" id="overview">
        <div>
          <div 
            className="text-[0.72rem] tracking-[0.12em] uppercase text-[#aaa] mb-[10px]"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            Overview
          </div>
          <h2 className="text-[1.4rem] font-normal text-[#111] leading-[1.4]">
            What is ESG Evaluation?
          </h2>
        </div>
        <div>
          <p 
            className="text-[0.9rem] text-[#555] leading-[1.8] mb-4"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            ESG stands for Environmental, Social, and Governance. These three pillars are used to measure how a company manages its responsibilities beyond financial performance — toward the planet, its people, and how it's run.
          </p>
          <p 
            className="text-[0.9rem] text-[#555] leading-[1.8] mb-4"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            Shareholders increasingly rely on ESG data to make informed decisions about where they invest, which companies align with their values, and which carry long-term risk. GreenGauge makes that data accessible and straightforward.
          </p>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-none border-t border-[#e5e5e5] mx-12" />

      {/* Pillars Section */}
      <div className="bg-[#f8faf9] px-12 py-16 border-t border-b border-[#e5e5e5]" id="pillars">
        <div 
          className="text-[0.72rem] tracking-[0.12em] uppercase text-[#aaa] mb-8"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          The Three Pillars
        </div>
        <div className="grid grid-cols-3 gap-8 max-w-[960px]">
          <div>
            <h3 
              className="text-[1rem] font-bold text-[#2d6a4f] mb-[10px]"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              Environmental
            </h3>
            <p 
              className="text-[0.85rem] text-[#666] leading-[1.7]"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              How does the company manage its impact on the planet? We evaluate carbon emissions, energy usage, water consumption, waste reduction, and climate risk strategy.
            </p>
          </div>
          <div>
            <h3 
              className="text-[1rem] font-bold text-[#2d6a4f] mb-[10px]"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              Social
            </h3>
            <p 
              className="text-[0.85rem] text-[#666] leading-[1.7]"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              How does the company treat people? We examine labor practices, employee wellbeing, supply chain ethics, community involvement, and diversity and inclusion efforts.
            </p>
          </div>
          <div>
            <h3 
              className="text-[1rem] font-bold text-[#2d6a4f] mb-[10px]"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              Governance
            </h3>
            <p 
              className="text-[0.85rem] text-[#666] leading-[1.7]"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              How is the company led and held accountable? We look at board composition, executive pay, shareholder rights, transparency, and anti-corruption practices.
            </p>
          </div>
        </div>
      </div>

      {/* Why It Matters Section */}
      <div className="px-12 py-16 max-w-[960px] grid grid-cols-2 gap-12">
        <div>
          <h2 className="text-[1.4rem] font-normal text-[#111] leading-[1.4] mb-4">
            Why it matters to shareholders
          </h2>
          <p 
            className="text-[0.88rem] text-[#666] leading-[1.8]"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            ESG performance is increasingly linked to financial resilience, regulatory compliance, and brand reputation. Shareholders who understand a company's ESG standing are better equipped to assess risk and long-term value.
          </p>
        </div>
        <ul className="list-none flex flex-col gap-[14px]">
          <li 
            className="text-[0.88rem] text-[#444] pl-5 relative leading-[1.6]"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            <span className="absolute left-0 text-[#2d6a4f]">→</span>
            Identify companies with strong long-term risk management
          </li>
          <li 
            className="text-[0.88rem] text-[#444] pl-5 relative leading-[1.6]"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            <span className="absolute left-0 text-[#2d6a4f]">→</span>
            Align investments with personal and institutional values
          </li>
          <li 
            className="text-[0.88rem] text-[#444] pl-5 relative leading-[1.6]"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            <span className="absolute left-0 text-[#2d6a4f]">→</span>
            Assess board accountability and governance quality
          </li>
          <li 
            className="text-[0.88rem] text-[#444] pl-5 relative leading-[1.6]"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            <span className="absolute left-0 text-[#2d6a4f]">→</span>
            Understand social and environmental exposure
          </li>
          <li 
            className="text-[0.88rem] text-[#444] pl-5 relative leading-[1.6]"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            <span className="absolute left-0 text-[#2d6a4f]">→</span>
            Support transparent, responsible corporate behavior
          </li>
        </ul>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#e5e5e5] px-12 py-6 flex justify-between items-center">
        <div className="text-[1rem] font-bold text-[#2d6a4f] tracking-[0.02em]">GreenGauge</div>
        <p 
          className="text-[0.78rem] text-[#bbb]"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          &copy; 2025 GreenGauge ESG Evaluation. All rights reserved.
        </p>
      </footer>

      {/* Mobile Responsive Styles */}
      <style>{`
        @media(max-width: 640px) {
          nav {
            padding: 16px 20px;
          }
          nav > div:last-child {
            display: flex;
            flex-direction: column;
            gap: 8px;
            align-items: flex-end;
          }
          .hero {
            padding: 50px 20px 40px;
          }
          .hero h1 {
            font-size: 1.8rem;
          }
          hr {
            margin: 0 20px;
          }
          #overview,
          .why-section {
            padding: 40px 20px;
            grid-template-columns: 1fr;
            gap: 24px;
          }
          #pillars {
            padding: 40px 20px;
          }
          #pillars .grid {
            grid-template-columns: 1fr;
          }
          footer {
            padding: 20px;
            flex-direction: column;
            gap: 8px;
            text-align: center;
          }
        }
      `}</style>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
}