import { HeroGradient } from "@/components/ui/HeroGradient";
import ContactHeader from "@/components/contact/ContactHeader";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactFAQ from "@/components/contact/ContactFAQ";

export default function ContactPage() {

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black px-4 pb-24 pt-4">
      <HeroGradient />
      
      <div className="relative z-10 text-white text-center max-w-4xl">
        <ContactHeader />
        
        <div className="grid md:grid-cols-2 gap-8">
          <ContactForm />
          <ContactInfo />
        </div>

        <ContactFAQ />
      </div>
    </div>
  );
} 