import { pageContent } from "@/utils/data/pricingData";

export default function PricingHeader() {
  return (
    <>
      <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white via-green-400 to-white bg-clip-text text-transparent">
        {pageContent.title}
      </h1>
      <p className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto">
        {pageContent.subtitle}
      </p>
    </>
  );
}
