import { Lightbulb } from "lucide-react";
import { disclaimerSections, helpSection } from "@/utils/data/disclaimerData";
import { DisclaimerCard } from "@/types/disclaimer";

const getCardClasses = (color: DisclaimerCard["color"]) => {
  const colorMap = {
    green: "bg-green-500/10 border-green-500/30 text-green-400",
    blue: "bg-blue-500/10 border-blue-500/30 text-blue-400", 
    purple: "bg-purple-500/10 border-purple-500/30 text-purple-400",
    amber: "bg-amber-500/10 border-amber-500/30 text-amber-400"
  };
  return colorMap[color];
};

export default function DisclaimerContent() {
  return (
    <div className="text-left space-y-6 text-gray-300 leading-relaxed">
      {disclaimerSections.map((section) => {
        const IconComponent = section.icon;
        return (
          <div key={section.id}>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-3">
              <IconComponent className={`w-5 h-5 ${
                section.id === "ddos-protection" ? "text-red-500" :
                section.id === "why-matters" ? "text-green-500" :
                section.id === "recommended-actions" ? "text-green-400" :
                "text-blue-400"
              }`} />
              {section.title}
            </h3>
            
            {section.content && (
              <p className="mb-3">{section.content}</p>
            )}
            
            {section.items && (
              <ul className="list-disc list-inside space-y-2 ml-4">
                {section.items.map((item, index) => (
                  <li key={index}>
                    {section.id === "ddos-protection" ? (
                      <><strong>{item.split(" - ")[0]}</strong> - {item.split(" - ")[1]}</>
                    ) : (
                      item
                    )}
                  </li>
                ))}
              </ul>
            )}
            
            {section.cards && (
              <div className="space-y-3">
                {section.cards.map((card, index) => (
                  <div key={index} className={`border rounded-lg p-4 ${getCardClasses(card.color)}`}>
                    <p className={`font-semibold mb-2 ${getCardClasses(card.color).split(' ')[2]}`}>
                      {card.title}
                    </p>
                    <p>{card.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <div className={`border rounded-lg p-4 ${getCardClasses(helpSection.color)}`}>
        <h3 className={`text-lg font-semibold mb-3 flex items-center gap-3 ${getCardClasses(helpSection.color).split(' ')[2]}`}>
          <Lightbulb className="w-5 h-5 text-white" />
          {helpSection.title}
        </h3>
        <p>{helpSection.content}</p>
      </div>
    </div>
  );
}
