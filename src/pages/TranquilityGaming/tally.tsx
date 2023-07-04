import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import { env } from "../../env/client.mjs";
import OBSWebSocket from "obs-websocket-js";

const Chat = ({ sender }: any) => {
  const [tally, setTally] = useState([]);
  const [tallyToSend, setTallyToSend] = useState("");

  useEffect(() => {
    const pusher = new Pusher(env.NEXT_PUBLIC_KEY, {
      cluster: "us2",
    });

    const channel = pusher.subscribe("tally");

    channel.bind("tally-event", function (data: any) {
      setTally(data.scene);
    });

    return () => {
      pusher.unsubscribe("tally");
    };
  }, []);

  const handleSubmit = async (e?: any) => {
    await axios.post("/api/pusher", { scene: tallyToSend });
  };

  return (
    <>
      <p>Tally Viewer</p>
      <div>
        <h1>Current Scene: {tally}</h1>
      </div>

      {/* <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="text"
          value={tallyToSend}
          onChange={(e) => setTallyToSend(e.target.value)}
          placeholder="Scene Name"
        />
        <button type="submit">Send</button>
      </form> */}
    </>
  );
};

export default Chat;
