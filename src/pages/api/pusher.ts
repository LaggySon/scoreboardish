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
  const { scene } = req.body;
  console.log("New scene: " + scene);
  const response = await pusher.trigger("tally", "tally-event", {
    scene,
  });

  res.json({ message: "completed" });
}
