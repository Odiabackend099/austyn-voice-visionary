import FloatingNav from '@/components/FloatingNav';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import StorySection from '@/components/StorySection';
import ProjectsSection from '@/components/ProjectsSection';
import EducationSection from '@/components/EducationSection';
import SkillsSection from '@/components/SkillsSection';
import AISchoolSection from '@/components/AISchoolSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import SocialSection from '@/components/SocialSection';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import AgentLexiChat from '@/components/AgentLexiChat';

const Index = () => {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <SEOHead
        title="Austyn the Voice Visionary | Expert Voice AI & Communication Coach"
        description="Nigeria's leading voice AI infrastructure builder. Specializing in voice coaching, AI development, and communication training. Book a consultation today."
        type="website"
        canonicalUrl={`${window.location.origin}/`}
        image="/lovable-uploads/a3bedfeb-e5bf-4348-beb0-b14cc8f71537.png"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Austyn Eguale",
          "jobTitle": "Voice AI Visionary & Communication Coach",
          "description": "Builder of Nigeria's Voice AI Infrastructure, specializing in voice coaching and AI development",
          "url": window.location.origin,
          "image": "/lovable-uploads/a3bedfeb-e5bf-4348-beb0-b14cc8f71537.png",
          "sameAs": [
            "https://twitter.com/austyn_eguale",
            "https://linkedin.com/in/austyn-eguale"
          ],
          "knowsAbout": ["Voice AI", "Communication Coaching", "Public Speaking", "AI Development", "Voice Technology"],
          "offers": {
            "@type": "Service",
            "name": "Voice Coaching and AI Development Services",
            "description": "Professional voice coaching, AI development, and communication training services"
          }
        }}
      />
      <FloatingNav />
      <HeroSection />
      <AboutSection />
      <StorySection />
      <ProjectsSection />
      <EducationSection />
      <SkillsSection />
      <TestimonialsSection />
      <AISchoolSection />
      <SocialSection />
      
      {/* Agent Lexi Chat - Fixed position for easy access */}
      <div className="fixed bottom-8 right-8 z-50">
        <AgentLexiChat />
      </div>
      
      <Footer />
    </main>
  );
};

export default Index;