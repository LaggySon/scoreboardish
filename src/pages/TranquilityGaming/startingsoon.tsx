import styles from "../../styles/TranquilityGaming/startingSoon.module.scss";
import Image from "next/image";
import useSWR from "swr";
import { env } from "../../env/client.mjs";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useEffect, useState } from "react";
import "react-slideshow-image/dist/styles.css";
import { Fade } from "react-slideshow-image";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const URL = env.NEXT_PUBLIC_URL;
const API = URL + "/api/sheets";

const StartingSoon = (props: any) => {
  const { data } = useSWR(API, fetcher, {
    refreshWhenHidden: true,
    refreshInterval: 10000,
  });

  const slides = [
    "https://www.tranquility.gg/package/digitize/StartingSoon/Foreground1.png",
    "https://www.tranquility.gg/package/digitize/StartingSoon/Foreground2.png",
    "https://www.tranquility.gg/package/digitize/StartingSoon/Foreground3.png",
    "https://www.tranquility.gg/package/digitize/StartingSoon/Foreground4.png",
    "https://www.tranquility.gg/package/digitize/StartingSoon/Foreground5.png",
    "https://www.tranquility.gg/package/digitize/StartingSoon/Foreground6.png",
    "https://www.tranquility.gg/package/digitize/StartingSoon/Foreground7.png",
    "https://www.tranquility.gg/package/digitize/StartingSoon/Foreground8.png",
    "https://www.tranquility.gg/package/digitize/StartingSoon/Foreground9.png",
    "https://www.tranquility.gg/package/digitize/StartingSoon/Foreground10.png",
    "https://www.tranquility.gg/package/digitize/StartingSoon/Foreground11.png",
    "https://www.tranquility.gg/package/digitize/StartingSoon/Foreground12.png",
  ];

  //TIMER STUFF
  dayjs.extend(duration);

  const endTime = dayjs(data?.match?.dateTime * 1000);

  const [dayjsLeft, setDayjsLeft] = useState(
    dayjs.duration(endTime.diff(dayjs()))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const diffMilli = endTime.diff(dayjs());
      if (diffMilli > 0) {
        setDayjsLeft(dayjs.duration(diffMilli));
      } else {
        setDayjsLeft(dayjs.duration(0));
      }
    }, 250);
    return () => clearInterval(interval);
  });

  if (!data) {
    return <>Loading...</>;
  }
  return (
    <>
      <style jsx global>
        {`
          :root {
            --team1PrimaryColor: var(--tranqBlue);
            --team1SecondaryColor: var(--tranqYellow);
            --team2PrimaryColor: var(--tranqYellow);
            --team2SecondaryColor: var(--tranqBlue);
            font-family: "Industry";
            font-weight: normal;
          }
        `}
      </style>
      <Image
        src="https://www.tranquility.gg/package/digitize/StartingSoon/Background.png"
        alt="background"
        height={1080}
        width={1920}
        className={styles.backgroundImage}
      ></Image>
      <Fade arrows={false} duration={1000} pauseOnHover={false} autoplay={true}>
        {slides.map((slide, index) => (
          <Image
            key={index}
            src={slide}
            alt="Foreground"
            height={1080}
            width={1920}
          ></Image>
        ))}
      </Fade>
    </>
  );
};

export default StartingSoon;
