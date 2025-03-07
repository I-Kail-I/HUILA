import { NextResponse } from "next/server";
import { Client, Databases, ID } from "appwrite";

const client = new Client();
const database = new Databases(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("YOUR_PROJECT_ID"); 

export async function POST(req) {
  try {
    const { title } = await req.json();
    const response = await database.createDocument(
      "DATABASE_ID", 
      "COLLECTION_ID", 
      ID.unique(),
      { title }
    );
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
