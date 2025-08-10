"use client"
import { ContactMethod, QuickSupportContent, SocialMediaLink, SupportHour } from "@/types/contact";
import { contactSections } from "@/utils/data/contactData";

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      {contactSections.map((section) => {
        const IconComponent = section.icon;
        return (
          <div key={section.id} className="bg-gradient-to-br from-green-500/20 via-transparent to-green-500/10 rounded-2xl p-6 border border-gray-800/50 backdrop-blur-sm relative">
            <h3 className="text-xl font-semibold mb-4 text-green-400 flex items-center gap-3">
              <IconComponent className="w-5 h-5 text-white" />
              {section.title}
            </h3>
            
            {section.id === "direct-contact" && Array.isArray(section.content) && (
              <div className="space-y-3 text-left">
                {(section.content as ContactMethod[]).map((contact, index) => (
                  <div key={index}>
                    <p className="text-gray-400">{contact.title}:</p>
                    <p className="text-white font-medium">{contact.email}</p>
                  </div>
                ))}
              </div>
            )}
            
            {section.id === "support-hours" && Array.isArray(section.content) && (
              <div className="space-y-2 text-left">
                {(section.content as SupportHour[]).map((hour, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-400">{hour.days}:</span>
                    <span className="text-white">{hour.hours}</span>
                  </div>
                ))}
                {section.note && (
                  <p className="text-sm text-gray-400 mt-3">{section.note}</p>
                )}
              </div>
            )}
            
            {section.id === "quick-support" && !Array.isArray(section.content) && (
              <div className="space-y-3 text-left">
                <div>
                  <p className="text-gray-400 mb-2">{(section.content as QuickSupportContent).liveChatText}</p>
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-all duration-300">
                    {(section.content as QuickSupportContent).liveChatButton}
                  </button>
                </div>
                <div>
                  <p className="text-gray-400 mb-2">{(section.content as QuickSupportContent).docsText}</p>
                  <button className="w-full rounded rounded-full px-4 py-2 text-gray-400 hover:text-white transition-colors border border-green-500/20">
                    {(section.content as QuickSupportContent).docsButton}
                  </button>
                </div>
              </div>
            )}
            
            {section.id === "social-media" && Array.isArray(section.content) && (
              <div className="grid grid-cols-2 gap-3">
                {(section.content as SocialMediaLink[]).map((social, index) => (
                  <a 
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-br from-green-500/30 via-green-600/20 to-green-700/30 text-white py-3 rounded-lg font-medium hover:from-green-500/40 hover:via-green-600/30 hover:to-green-700/40 transition-all duration-300 flex items-center justify-center gap-2 border border-green-500/20"
                  >
                    {social.icon}
                    {social.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}