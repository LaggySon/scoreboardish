import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import { env } from "../../env/client.mjs";
import OBSWebSocket from "obs-websocket-js";

const Chat = ({ sender }: any) => {
  const obs = new OBSWebSocket();

  // Declare some events to listen for.
  obs.on("ConnectionOpened", () => {
    console.log("Connection Opened");
  });

  obs.on("Identified", () => {
    console.log("Identified, good to go!");

    // Send some requests.
    obs.call("GetSceneList").then((data) => {
      console.log("Scenes:", data);
      setTallyToSend(data.currentProgramSceneName);
      handleSubmit();
    });
  });

  obs.on("CurrentProgramSceneChanged", (data) => {
    setTallyToSend(data.sceneName);
    handleSubmit();
    console.log("SwitchScenes", data);
  });

  obs.connect("wss://192.168.1.152:4444").then(
    (info) => {
      console.log("Connected and identified", info);
    },
    (e: string) => {
      console.error("Error " + e);
    }
  );

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
      <p>Tally Transmitter</p>
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
