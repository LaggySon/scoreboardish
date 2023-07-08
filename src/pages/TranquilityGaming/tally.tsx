import { NextPage } from "next/types";
import { env } from "../../env/client.mjs";
import { obsSocket } from "../../lib/obs";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import io from "socket.io-client";

let socket: any;

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const URL = env.NEXT_PUBLIC_URL;
const API =
  URL + `/api/sheets?sheet=15lldKBTIAAzgKlg7SizMCJkx68OVyOiMlRonJJsHq5o`;

const InGame: NextPage<PageProps> = (props) => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    socketIntializer();

    return () => {
      socket.disconnect();
    };
  }, []);

  async function socketIntializer() {
    await fetch("/api/socket");

    socket = io();

    socket.on("receive-message", (data: any) => {
      setAllMessages((pre): any => [...pre, data]);
    });
  }

  function handleSubmit(e: any) {
    e.preventDefault();

    console.log("emitted");

    socket.emit("send-message", {
      username,
      message,
    });

    setMessage("");
  }

  //OBS Websocket stuff
  const obs = new obsSocket();
  useEffect(() => {
    console.log(obs.connect());
    obs.getScene();
    console.log(obs.scene);
  }, []);

  //Get URL parameters
  const router = useRouter();
  const [query, setQuery] = useState({});
  useEffect(() => {
    if (!router.isReady) return;
    const query = router.query;
    setQuery(query);
  }, [router.isReady, router.query]);

  return (
    <div>
      <h1>Tranquility Messaging Application</h1>
      <h1>Enter a username</h1>

      <input value={username} onChange={(e) => setUsername(e.target.value)} />

      <br />
      <br />

      <div>
        {allMessages.map(({ username, message }, index) => (
          <div key={index}>
            {username}: {message}
          </div>
        ))}

        <br />

        <form onSubmit={handleSubmit}>
          <input
            name="message"
            placeholder="enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete={"off"}
          />
        </form>
      </div>
    </div>
  );
};

export default InGame;
