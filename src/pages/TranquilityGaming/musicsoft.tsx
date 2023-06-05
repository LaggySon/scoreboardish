import { Howl, Howler } from "howler";

const Music = (props: any) => {
  const sound = new Howl({
    src: ["https://www.youtube.com/watch?v=dhr9wmUV_ks"],
    autoplay: true,
    loop: true,
    volume: 0.5,
    onend: function () {
      console.log("Finished!");
    },
  });
  sound.play();
  return <h1>Hello World</h1>;
};
export default Music;
