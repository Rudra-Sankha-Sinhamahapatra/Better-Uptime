import { pageContent } from "@/utils/data/contactData";

export default function ContactHeader() {
  return (
    <>
      <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white via-green-400 to-white bg-clip-text text-transparent">
        {pageContent.title}
      </h1>
      <p className="text-xl mb-12 text-gray-300">
        {pageContent.subtitle}
      </p>
    </>
  );
}