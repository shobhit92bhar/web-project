import { ExternalLink, Mail, Linkedin } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import CompanyCarousel from "@/components/company-carousel";
import SkillsSection from "@/components/skills-section";

export default function Home() {
  const handleSectionClick = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Cybersecurity</span><br />
            <span className="text-foreground">Professional</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Experienced cybersecurity expert specializing in Zero Trust architecture, API security, and enterprise-grade security solutions. Helping organizations build robust defense systems against evolving cyber threats.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => handleSectionClick("experience")}
            >
              View Experience
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => handleSectionClick("contact")}
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Professional <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Trusted by leading technology companies to deliver cybersecurity excellence
            </p>
          </div>
          
          <CompanyCarousel />
          
          <div className="text-center">
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              With extensive experience across industry-leading cybersecurity and technology companies, I bring deep expertise in enterprise security solutions, zero trust architecture, and cutting-edge threat protection technologies. My career spans roles in pre-sales engineering, technical enablement, and security architecture design.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Core <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive expertise across security, infrastructure, and business domains
            </p>
          </div>
          
          <SkillsSection />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Ready to discuss cybersecurity solutions or explore opportunities? Let's connect.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <a
              href="https://www.linkedin.com/in/shobhit92bhar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-primary hover:text-primary/80 transition-colors duration-200"
            >
              <Linkedin className="h-6 w-6" />
              <span className="text-lg">LinkedIn Profile</span>
            </a>
            <a
              href="mailto:contact@shobhitbhardwaj.com"
              className="flex items-center gap-3 text-primary hover:text-primary/80 transition-colors duration-200"
            >
              <Mail className="h-6 w-6" />
              <span className="text-lg">Email</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-2xl font-bold mb-4">
            <span className="text-primary">Shobhit</span> Bhardwaj
          </div>
          <p className="text-muted-foreground mb-6">
            Cybersecurity Professional • Pre-Sales Engineering • Zero Trust Architecture
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://www.linkedin.com/in/shobhit92bhar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:contact@shobhitbhardwaj.com"
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-muted-foreground">
            <div className="mb-4">
              <Link href="/headers" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                View HTTP Headers
              </Link>
            </div>
            <p>&copy; 2024 Shobhit Bhardwaj. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
