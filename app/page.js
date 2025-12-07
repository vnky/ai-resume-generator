"use client";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    experience: "",
    skills: "",
  });
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setSummary("");
    setError("");

    try {
      const res = await fetch("/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("AI request failed");
      }

      const data = await res.json();
      setSummary(data.summary);
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          AI Resume Summary Generator
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            placeholder="Name"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="Experience (e.g. 4 years Frontend Dev)"
            onChange={(e) =>
              setForm({ ...form, experience: e.target.value })
            }
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="Skills"
            onChange={(e) =>
              setForm({ ...form, skills: e.target.value })
            }
          />

          <button
            disabled={loading}
            className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Summary"}
          </button>
        </form>

        {summary && (
          <div className="mt-6 bg-gray-50 p-4 rounded border">
            <h2 className="font-semibold mb-2">Generated Summary:</h2>
            <p className="text-sm">{summary}</p>
          </div>
        )}

        {error && (
          <p className="text-red-500 mt-4 text-sm">{error}</p>
        )}
      </div>
    </main>
  );
}
