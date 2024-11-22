"use client";

import { useState } from "react";

export default function MemeUploader() {
  const [image, setImage] = useState(null);
  const [memeText, setMemeText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const generateMemeText = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: "Describe a meme for this image",
        }),
      });

      const data = await response.json();
      setMemeText(data.text);
    } catch (error) {
      console.error("Error generating meme text:", error);
    }
    setLoading(false);
  };

  return (
    <div className="text-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-blue-600 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
      />
      {image && (
        <div className="relative">
          <img
            src={image}
            alt="Uploaded Meme"
            className="rounded-lg shadow-lg max-w-full"
          />
          {memeText && (
            <p className="absolute top-2 left-2 bg-white bg-opacity-80 text-black text-lg font-semibold p-2 rounded">
              {memeText}
            </p>
          )}
        </div>
      )}
      <button
        onClick={generateMemeText}
        disabled={loading}
        className={`mt-4 px-6 py-2 text-white font-bold rounded-lg shadow ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Generating..." : "Generate Meme Text"}
      </button>
    </div>
  );
}
