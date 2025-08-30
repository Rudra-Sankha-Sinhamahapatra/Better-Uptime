"use client"
import { useState, useEffect } from "react";
import { config } from "@/utils/config";
import { queryTypes, pageContent } from "@/utils/data/contactData";
import { useSession } from "@/context/session-context";
import { Loading } from "../Loading";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    queryType: queryTypes[0],
    query: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const { session } = useSession();

  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        name: session.user.name || "",
        email: session.user.email || ""
      }));
    }
  }, [session]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if(!session) {
        console.log("No session")
      }

      if (session?.session?.token) {
        headers["Authorization"] = `Bearer ${session.session.token}`;
      }

      const response = await fetch(`${config.backendUrl}/contact`, {
        method: "POST",
        headers,
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit contact form");
      }

      setSubmitted(true);
      setFormData({
        name: session?.user?.name || "",
        email: session?.user?.email || "",
        queryType: queryTypes[0],
        query: ""
      });
    } catch (error: any) {
      console.error("Error submitting contact form:", error);
      setError(error.message || "Failed to submit contact form");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

     if (loading) {
          return <Loading/>
      }

  return (
    <div className="bg-gradient-to-br from-green-500/20 via-transparent to-green-500/10 rounded-2xl p-8 h-fit border border-gray-800/50 backdrop-blur-sm relative">
      <h2 className="text-2xl font-semibold mb-6 text-white">{pageContent.formTitle}</h2>
      
      {session?.user && (
        <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-sm text-green-400">
            {pageContent.messages.loggedIn} {session?.user.name || session?.user.email}
          </p>
        </div>
      )}

      {submitted && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
          <p className="text-green-400 font-medium">
            {pageContent.messages.success}
          </p>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
          <p className="text-red-400 font-medium">
            {pageContent.messages.error} {error}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-400 mb-2">{pageContent.formFields.name.label}</label>
          <input 
            type={pageContent.formFields.name.type} 
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-black/60 border border-gray-800/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500/50"
            placeholder={pageContent.formFields.name.placeholder}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">{pageContent.formFields.email.label}</label>
          <input 
            type={pageContent.formFields.email.type} 
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-black/60 border border-gray-800/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500/50"
            placeholder={pageContent.formFields.email.placeholder}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">{pageContent.formFields.queryType.label}</label>
          <select 
            name="queryType"
            value={formData.queryType}
            onChange={handleChange}
            className="w-full bg-black/60 border border-gray-800/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500/50"
            disabled={loading}
          >
            {queryTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-400 mb-2">{pageContent.formFields.query.label}</label>
          <textarea 
            rows={pageContent.formFields.query.rows}
            name="query"
            value={formData.query}
            onChange={handleChange}
            className="w-full bg-black/60 border border-gray-800/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500/50 resize-none"
            placeholder={pageContent.formFields.query.placeholder}
            required
            disabled={loading}
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? pageContent.submitButton.loading : pageContent.submitButton.default}
        </button>
      </form>
    </div>
  );
}