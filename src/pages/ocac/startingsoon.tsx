import styles from "../../styles/ocac/startingsoon.module.scss";
import Image from "next/image";
import useSWR from "swr";
import { env } from "../../env/client.mjs";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useEffect, useState } from "react";

type PageProps = {
  team1: Team;
  team2: Team;
};

type Team = {
  name: string;
  logoPath: string;
  info: string;
  score: string;
  atkDef: string;
  color: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const URL = env.NEXT_PUBLIC_URL;
const API = URL + "/api/sheets";

const StartingSoon = (props: any) => {
  const { data } = useSWR(API, fetcher, {
    refreshWhenHidden: true,
    refreshInterval: 10000,
  });

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

  console.log(
    (100 -
      ((dayjs(data?.match?.dateTime * 1000).diff(dayjs()) % 30000) / 30000) *
        100) /
      2 >
      1 &&
      (100 -
        ((dayjs(data?.match?.dateTime * 1000).diff(dayjs()) % 30000) / 30000) *
          100) /
        2 <
        48
  );

  if (!data) {
    return <>Loading...</>;
  }
  return (
    <>
      <style jsx global>
        {`
          :root {
            --team1PrimaryColor: ${data?.teams?.team1.primaryCol ?? "black"};
            --team1SecondaryColor: ${data?.teams?.team1.secondaryCol ??
            "black"};
            --team2PrimaryColor: ${data?.teams?.team2.primaryCol ?? "black"};
            --team2SecondaryColor: ${data?.teams?.team2.secondaryCol ??
            "black"};
            --accentcolor: #ff6600;
            font-family: "TommyMedium";
            text-transform: none;
          }
        `}
      </style>
      <div className={styles.startingSoon}>
        <div className={styles.ocac}>
          <span className={styles.big}>Setting the Pace</span>
          <span>w/ CaptJack, ClutchKey, and more!</span>
        </div>
        <div className={styles.starting}>
          <span className={styles.startingText}>Starting Soon</span>
          <div
            className={[
              styles.startingAccent,
              (100 -
                ((dayjs(data?.match?.dateTime * 1000).diff(dayjs()) % 30000) /
                  30000) *
                  100) /
                2 >
                1 &&
                (100 -
                  ((dayjs(data?.match?.dateTime * 1000).diff(dayjs()) % 30000) /
                    30000) *
                    100) /
                  2 <
                  50 &&
                styles.animate,
            ].join(" ")}
            style={
              {
                "--percentage": `${
                  (100 -
                    ((dayjs(data?.match?.dateTime * 1000).diff(dayjs()) %
                      30000) /
                      30000) *
                      100) /
                    2 +
                  1
                }%`,
              } as React.CSSProperties
            }
          ></div>
          <span className={styles.startingTimer}>
            {dayjsLeft.format("mm:ss")}
          </span>
        </div>
        <div className={styles.botBar}>
          <div className={styles.branding + " " + styles.laggish}>
            <Image
              className={styles.tranqLogo}
              src="/laggishShapeTransparent.svg"
              width="50"
              height="50"
              alt="Tranq Logo"
            ></Image>
          </div>
          <div className={styles.ticker}>
            <div className={[styles.scrollText, styles.tickerText].join(" ")}>
              {data?.match?.ticker1}
            </div>
          </div>
          <div className={styles.branding}>
            {/* Overwatch Community Amatuer Circuit */}
            <Image
              className={styles.tranqLogo}
              src="https://drive.google.com/uc?export=download&id=1r3ruQvZM04FmOYfgyz2JoaFQr4SKkTGr"
              width="50"
              height="50"
              alt="Tranq Logo"
            ></Image>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartingSoon;
