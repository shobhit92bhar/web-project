import { Shield, Cloud, Handshake } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const skillCategories = [
  {
    icon: Shield,
    title: "Security & Zero Trust",
    skills: [
      "Zero Trust/SASE",
      "API Security",
      "Web Application Firewall",
      "Bot Management",
      "DLP, CASB",
      "Network Security/Firewall",
      "Virtual Private Network",
      "Cyber Security"
    ]
  },
  {
    icon: Cloud,
    title: "Infrastructure & Cloud",
    skills: [
      "AWS, GCP, Azure",
      "Web/App Delivery & Performance",
      "Traffic Load Balancing",
      "Content Delivery Network",
      "Devops, API, Terraform"
    ]
  },
  {
    icon: Handshake,
    title: "Sales & Business",
    skills: [
      "Pre-Sales Engineering",
      "MEDDPICC",
      "Channel Sales/Training",
      "Account Management",
      "Technical Enablement",
      "Project Management"
    ]
  }
];

export default function SkillsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {skillCategories.map((category, index) => (
        <Card key={index} className="card-hover bg-card border-border">
          <CardContent className="p-6 text-center">
            <div className="text-primary mb-4 flex justify-center">
              <category.icon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
            <ul className="text-muted-foreground space-y-2">
              {category.skills.map((skill, skillIndex) => (
                <li key={skillIndex}>• {skill}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
