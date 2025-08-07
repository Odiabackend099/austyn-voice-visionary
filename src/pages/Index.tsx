import FloatingNav from '@/components/FloatingNav';
import HeroSection from '@/components/HeroSection';
import StorySection from '@/components/StorySection';
import ProjectsSection from '@/components/ProjectsSection';
import AISchoolSection from '@/components/AISchoolSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import SocialSection from '@/components/SocialSection';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
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
      <StorySection />
      <ProjectsSection />
      <TestimonialsSection />
      <AISchoolSection />
      <SocialSection />
      <Footer />
    </main>
  );
};

export default Index;
