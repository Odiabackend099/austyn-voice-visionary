import FloatingNav from '@/components/FloatingNav';
import HeroSection from '@/components/HeroSection';
import StorySection from '@/components/StorySection';
import ProjectsSection from '@/components/ProjectsSection';
import AISchoolSection from '@/components/AISchoolSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import SocialSection from '@/components/SocialSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <FloatingNav />
      <HeroSection />
      <StorySection />
      <ProjectsSection />
      <TestimonialsSection />
      <AISchoolSection />
      <SocialSection />
      <Footer />
    </div>
  );
};

export default Index;
