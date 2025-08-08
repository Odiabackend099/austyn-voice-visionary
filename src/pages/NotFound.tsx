import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <SEOHead
        title="404 — Page Not Found | ODIA"
        description="The page you're looking for doesn't exist on ODIA."
        type="website"
        canonicalUrl={`${window.location.origin}${location.pathname}`}
        image="/lovable-uploads/a3bedfeb-e5bf-4348-beb0-b14cc8f71537.png"
      />
      <section className="text-center px-6">
        <h1 className="text-6xl font-display font-bold mb-4">404</h1>
        <p className="text-lg text-muted-foreground mb-8">We couldn't find that page.</p>
        <div className="flex gap-3 justify-center">
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
          <a href="#ai-school">
            <Button variant="outline">Browse Courses</Button>
          </a>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
