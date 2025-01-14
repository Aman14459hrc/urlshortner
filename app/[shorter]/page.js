import { redirect } from "next/navigation";
import  clientPromise  from "@/app/lib/mongo";

export default async function Page({ params }) {
  try {
    const shortUrl = params.shorter; // Extract the short URL from params
    const client = await clientPromise;
    const db = client.db("shortner");
    const collection = db.collection("urls");

    // Find the document with the matching short URL
    const doc = await collection.findOne({ shortUrl: shortUrl });
    console.log("Document found:", doc);

    if (doc) {
      console.log("Redirecting to:", doc.url);
      redirect(doc.url); // Redirect to the original URL
    } else {
      console.warn("Short URL not found. Redirecting to fallback URL.");
      redirect( "http://localhost:3000"); // Redirect to fallback URL
    }
  } catch (error) {
    console.error("Error during redirect:", error);
    redirect( "http://localhost:3000"); // Redirect on error
  }
}
