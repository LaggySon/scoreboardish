import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import { env } from "../../env/client.mjs";

const Chat = ({ sender }: any) => {
  const [chats, setChats] = useState([]);
  const [messageToSend, setMessageToSend] = useState("");

  useEffect(() => {
    const pusher = new Pusher(env.NEXT_PUBLIC_KEY, {
      cluster: "us2",
    });

    const channel = pusher.subscribe("chat");

    channel.bind("chat-event", function (data: any) {
      setChats((prevState): any => [
        ...prevState,
        { sender: data.sender, message: data.message },
      ]);
    });

    return () => {
      pusher.unsubscribe("chat");
    };
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await axios.post("/api/pusher", { message: messageToSend, sender });
  };

  return (
    <>
      <p>Hello, {sender}</p>
      <div>
        {chats.map((chat: any, id) => (
          <>
            <p>{chat.message}</p>
            <small>{chat.sender}</small>
          </>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="text"
          value={messageToSend}
          onChange={(e) => setMessageToSend(e.target.value)}
          placeholder="start typing...."
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
};

export default Chat;
