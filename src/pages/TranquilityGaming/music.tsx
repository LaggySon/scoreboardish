import { Howl, Howler } from "howler";
import * as mediatags from "jsmediatags";
import { useState } from "react";

export const getServerSideProps = async () => {
  const getTags = async (file: string) => {
    return new Promise((res, rej) => {
      new mediatags.Reader(file).read({
        onSuccess: (data: any) => {
          res(data);
        },
        onError: (error) => {
          rej(error);
        },
      });
    })
      .then((data: any) => data)
      .catch((error) => {
        console.log(error);
      });
  };

  const url = "https://tranquility.gg/package/music/";
  const songNames: string[] = [
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
  const songs = await Promise.all(
    songNames.map(async (song: string) => {
      const songUrl = url + song.replaceAll(" ", "%20") + ".mp3";
      const songData = await getTags(songUrl);
      return {
        file: songUrl,
        title: songData.tags.title,
        artist: songData.tags.artist,
        howl: null,
      };
    })
  );
  // console.log(songs);
  return { props: { songs } };
};

const Music = (props: any) => {
  const songs = props.songs.map((song: any) => ({
    ...song,
    howl: null,
  }));
  let currentIndex = 0;

  const play = (index: number) => {
    if (songs[index].howl) {
      songs[index].howl.stop();
    }
    songs[index].howl = new Howl({
      src: songs[index].file,
      html5: true,
      onend: handleSongEnd,
    });
    songs[index].howl.play();
    currentIndex = index;
  };

  const skip = () => {
    let newIndex = currentIndex;
    while (newIndex === currentIndex) {
      newIndex = Math.floor(Math.random() * songs.length);
    }
    if (songs[currentIndex].howl) {
      songs[currentIndex].howl.stop();
    }
    play(newIndex);
  };

  const handleSongEnd = () => {
    skip();
  };

  play(Math.floor(Math.random() * songs.length));

  return <></>;
};
export default Music;
