import Pusher from "pusher";
import { env } from "../../env/server.mjs";

export const pusher = new Pusher({
  appId: env.app_id,
  key: env.key,
  secret: env.secret,
  cluster: env.cluster,
  useTLS: true,
});

export default async function handler(req: any, res: any) {
  const { message, sender } = req.body;
  console.log(sender + ": " + message);
  const response = await pusher.trigger("chat", "chat-event", {
    message,
    sender,
  });

  res.json({ message: "completed" });
}
