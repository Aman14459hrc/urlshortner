// app/page.js
"use client"
import Link from "next/link";
import { useState } from "react";


export default function HomePage() {
  const handler = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      url: url,
      shortUrl: shortUrl,
    });
console.log(raw)
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch("/api/genrate", requestOptions);
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        // Assuming the API returns the short URL
        setShortUrl(result.shortUrl);
        // Redirect or update the UI as needed
        // router.push("/success");
      } else {
        console.error("Failed to generate short URL");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [genrate, setgenrate] = useState("");
  return (
    <div className="bg-purple-100 min-h-screen flex flex-col items-center">
      {/* Header */}
      <header className="bg-purple-700 w-full p-4 flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">X-links</h1>
        <nav className="space-x-6">
          <Link href="/home" className="text-white hover:underline">
            Home
          </Link>
          <Link href="/about" className="text-white hover:underline">
            About
          </Link>
          <Link href="/shorten" className="text-white hover:underline">
            Shorten
          </Link>
          <Link href="/contact" className="text-white hover:underline">
            Contact Us
          </Link>
        </nav>
        <div className="flex space-x-4">
          <button className="bg-purple-500 text-white py-1 px-4 rounded hover:bg-purple-600">
            Try Now
          </button>
          <Link
            href="https://github.com" target="_blank"
            className="bg-white text-purple-700 py-1 px-4 rounded hover:bg-gray-200"
          >
            GitHub
          </Link>
        </div>
      </header>

      {/* Form Section */}
      <main className="flex flex-col items-center justify-center flex-1 w-full">
  <div className="bg-white p-8 rounded-lg shadow-lg mt-12 max-w-md w-full">
    <h2 className="text-purple-700 text-xl font-bold mb-4">
      Generate your short URLs
    </h2>
    <form
      className="flex flex-col space-y-4"
      onSubmit={(e) => {
        e.preventDefault(); // Prevent page reload
        handler(url, shortUrl); // Call handler with parameters
        console.log("Handler called with:", url, shortUrl)
        setgenrate(true); // Set the genrate state
      }}
    >
      <label className="text-gray-600 font-semibold">URL</label>
      <input
        value={url}
        type="url"
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter your URL"
        className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        required
      />
      <label className="text-gray-600 font-semibold">Short URL</label>
      <input
        value={shortUrl}
        onChange={(e) => setShortUrl(e.target.value)}
        type="text"
        placeholder="Enter your preferred short URL text"
        className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        required
      />
      <button
        type="submit"
        className="bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition"
      >
        Generate
      </button>
      {(
        <p className="text-green-500" >
          {`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/${shortUrl}`}
        </p>
      )}
    </form>
  </div>
</main>

    </div>
  );
}
