import React, { useState } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { StatisticsSection } from './components/StatisticsSection';
import { ExpertiseSection } from './components/ExpertiseSection';
import { SelectedWorkSection } from './components/SelectedWorkSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ServicesSection } from './components/ServicesSection';
import { ToolsSection } from './components/ToolsSection';
import { CvSection } from './components/CvSection';
import { ContactSection } from './components/ContactSection';
import { FooterSection } from './components/FooterSection';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { CvPreviewModal } from './components/CvPreviewModal';
import { AdminModal } from './components/AdminModal';
import { FloatingAdminButton } from './components/FloatingAdminButton';

const PortfolioContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { settings } = usePortfolio();

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#EDEDED] overflow-x-hidden selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Initial Cinematic Loading Experience */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Grain / Noise Texture Overlay */}
      {settings.enableGrain && (
        <div className="fixed inset-0 pointer-events-none z-[999] bg-noise opacity-40 mix-blend-overlay" />
      )}

      {/* Interactive Desktop Custom Cursor */}
      <CustomCursor />

      {/* Primary Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main>
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <StatisticsSection />
        <ExpertiseSection />
        <SelectedWorkSection />
        <ExperienceSection />
        <ServicesSection />
        <ToolsSection />
        <CvSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <FooterSection />

      {/* Interactive Modals */}
      <ProjectDetailModal />
      <CvPreviewModal />
      <AdminModal />

      {/* Persistent Quick Access Admin Button */}
      <FloatingAdminButton />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
}
