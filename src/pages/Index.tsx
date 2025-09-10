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
import AdaquaAIChat from '@/components/AdaquaAIChat';

const Index = () => {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <SEOHead
        title="Austyn Eguale - #1 Voice AI Expert Nigeria | AI Automation Leader Africa | ODIA.DEV"
        description="Nigeria's leading Voice AI expert and AI automation specialist. Austyn Eguale delivers cutting-edge voice technology solutions, AI chatbots, and business automation across Africa. Experience premium voice AI services at ODIA.DEV"
        type="website"
        canonicalUrl="https://austyn-eguale.odia.dev/"
        image="/lovable-uploads/8a31a1fa-c3f5-41e3-9c11-f83965228db6.png"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": ["Person", "ProfessionalService"],
          "name": "Austyn Eguale",
          "url": "https://austyn-eguale.odia.dev",
          "image": "https://austyn-eguale.odia.dev/lovable-uploads/8a31a1fa-c3f5-41e3-9c11-f83965228db6.png",
          "sameAs": [
            "https://linkedin.com/in/austyneguale",
            "https://twitter.com/austyneguale",
            "https://github.com/austyneguale"
          ],
          "jobTitle": "Voice AI Expert & AI Automation Specialist",
          "worksFor": {
            "@type": "Organization",
            "name": "ODIA",
            "url": "https://odia.dev",
            "logo": "https://austyn-eguale.odia.dev/lovable-uploads/8a31a1fa-c3f5-41e3-9c11-f83965228db6.png",
            "areaServed": ["Nigeria", "Africa"],
            "serviceType": "Voice AI Technology"
          },
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "Nigeria",
            "addressRegion": "Nigeria"
          },
          "nationality": "Nigerian",
          "description": "Nigeria's leading Voice AI expert and AI automation specialist, pioneering voice technology solutions across Africa. Specializes in AI chatbots, voice assistants, speech recognition, and business process automation.",
          "expertise": ["Voice AI", "AI Automation", "Speech Technology", "Artificial Intelligence", "Business Automation", "AI Chatbots", "Voice Recognition", "Natural Language Processing"],
          "award": ["Nigeria's #1 Voice AI Expert", "Leading AI Automation Specialist Africa"],
          "knowsAbout": ["Voice Recognition", "AI Chatbots", "Speech Technology", "Machine Learning", "Natural Language Processing", "Business Process Automation", "Voice User Interfaces", "Conversational AI"],
          "serviceOffered": [
            {
              "@type": "Service",
              "name": "Voice AI Development",
              "description": "Custom voice AI solutions for businesses across Nigeria and Africa"
            },
            {
              "@type": "Service", 
              "name": "AI Automation",
              "description": "Business process automation using artificial intelligence"
            },
            {
              "@type": "Service",
              "name": "AI Chatbot Development",
              "description": "Intelligent chatbots for customer service and engagement"
            }
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "bestRating": "5",
            "worstRating": "1",
            "ratingCount": "50"
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
      
      {/* Adaqua AI Chat - Fixed position for easy access */}
      <div className="fixed bottom-8 right-8 z-50">
        <AdaquaAIChat />
      </div>
      
      <Footer />
    </main>
  );
};

export default Index;