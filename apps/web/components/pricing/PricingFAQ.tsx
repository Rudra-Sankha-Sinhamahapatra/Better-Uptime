import { pageContent, faqs } from "@/utils/data/pricingData";

export default function PricingFAQ() {
  return (
    <div className="bg-gradient-to-br from-green-500/20 via-transparent to-green-500/10 rounded-2xl p-8 border border-gray-800/50">
      <h2 className="text-2xl font-semibold mb-6 text-green-400">{pageContent.faqTitle}</h2>
      <div className="text-left space-y-6">
        {faqs.map((faq, index) => (
          <div key={index}>
            <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
            <p className="text-gray-400">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
