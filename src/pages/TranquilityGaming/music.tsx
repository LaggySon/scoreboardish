import { Howl, Howler } from "howler";

const Music = (props: any) => {
  const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = String(array[j]);
      array[j] = String(temp);
    }
  };

  const url = "https://tranquility.gg/package/music/";
  const songs: string[] = [
    "Body Like (Body Shop)",
    "Deon Custom - Roses",
    "Earthbound",
    "Glacier - Satori",
    "eureka!",
    "Grant - Starship",
    "Mindsight & Duumu - What Feels Right",
    "Razihel & Aero Chord - Titans",
    "Sakura",
    "Sober Rob - Atom Mirror",
    "Soupandreas - Sprite",
    "Tuesday",
    "WRLD - Discovery",
  ];
  const songurls = songs.map(
    (song) => url + song.replaceAll(" ", "%20") + ".mp3"
  );
  shuffleArray(songurls);
  console.log(songurls);

  const sound = new Howl({
    src: [String(songurls[0])],
    html5: true,
    loop: true,
    volume: 0.2,
    onend: function () {
      console.log("Finished!");
    },
  });

  sound.play();

  return <></>;
};
export default Music;
