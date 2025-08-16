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
        title="ODIA — AI Courses, Portfolio and Coaching"
        description="Build with Nigeria’s Voice AI. Explore projects, enroll in voice-first AI courses, and connect with ODIA."
        type="website"
        canonicalUrl={`${window.location.origin}/`}
        image="/lovable-uploads/a3bedfeb-e5bf-4348-beb0-b14cc8f71537.png"
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
