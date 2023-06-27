import OBSWebSocket from "obs-websocket-js";

const obs = new OBSWebSocket();

async function connect(): Promise<any> {
  try {
    const { obsWebSocketVersion, negotiatedRpcVersion } = await obs.connect(
      "ws://127.0.0.1:4455",
      "password",
      {
        rpcVersion: 1,
      }
    );
    console.log(
      `Connected to server ${obsWebSocketVersion} (using RPC ${negotiatedRpcVersion})`
    );
    console.log(await obs.call("GetCurrentProgramScene"));
    return obs;
  } catch (error: any) {
    console.error("Failed to connect", error.code, error.message);
  }
}

export { obs, connect };
