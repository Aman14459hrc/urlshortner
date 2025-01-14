import clientPromise from '@/app/lib/mongo.js';

export  async function POST(request) {
    try {
        const body = await request.json();
        console.log("Request body:", body);
        const client = await clientPromise;
        const db = client.db("shortner");
        const collect = db.collection("urls");

        console.log("Database connected successfully");
        const doc = await collect.findOne({shorturl:body.shortUrl});
        if(doc){
            return Response.json({success: false, error: true,  message: 'URL already exists!' })
        }

        if (body){
          

            // Insert into the collection
            await collect.insertOne({
                url,
                shortUrl
            });

            return new Response(
                JSON.stringify({
                    url,
                    shortUrl,
                    message: "URL shortened successfully",
                }),
                { status: 200 }
            );
        } else {
            return new Response(
                JSON.stringify({ message: "Enter the URL" }),
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error:", error);
        return new Response(
            JSON.stringify({ message: "Internal Server Error router page se problem hui h " }),
            { status: 500 }
        );
    }
}


