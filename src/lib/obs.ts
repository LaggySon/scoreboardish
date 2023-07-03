import OBSWebSocket from "obs-websocket-js";

class obsSocket {
  obs = new OBSWebSocket();

  scene = "";

  connect = async () => {
    try {
      const { obsWebSocketVersion, negotiatedRpcVersion } =
        await this.obs.connect("ws://192.168.1.152:4444", "password", {
          rpcVersion: 1,
        });
      console.log(
        `Connected to server ${obsWebSocketVersion} (using RPC ${negotiatedRpcVersion})`
      );
      console.log(await this.obs.call("GetCurrentProgramScene"));
      return this.obs;
    } catch (error: any) {
      console.error("Failed to connect", error.code, error.message);
    }
  };

  getScene = async () => {
    try {
      const currscene = await this.obs.call("GetSceneList");
      this.scene = currscene.currentProgramSceneName;
    } catch (error: any) {
      console.error("Failed to connect", error.code, error.message);
    }
  };
}

export { obsSocket };
