import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

type NewMessage = {
  id?: number;
  email: string;
  name: string;
  message: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newMessage: NewMessage = {
      email,
      name,
      message,
    };

    let client;

    try {
      client = await MongoClient.connect(process.env.DB_URL, {
        useNewUrlParser: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Could not connect to database." });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Storing message failed!" });
      return;
    }

    client.close();

    res.status(201).json({
      message: "Successfully stored message!",
      newMessage: newMessage,
    });
  }
}

export default handler;
