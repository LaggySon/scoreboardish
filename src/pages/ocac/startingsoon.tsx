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
const API = URL + "/api/ocac";

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
            --accentcolor: ${data?.match.accColor};
            font-family: "TommyMedium";
            text-transform: none;
          }
        `}
      </style>
      <div className={styles.startingSoon}>
        <div className={styles.teams}>
          <div className={[styles.team, styles.team1].join(" ")}>
            <div className={styles.logoContainer}>
              <Image
                src={data?.teams?.team1?.logoPath}
                alt={data?.teams?.team1?.name + " logo"}
                className="logo"
                height="350"
                width="350"
              ></Image>
            </div>
            <div className={styles.teamInfo}>
              <span className={styles.name}>{data?.teams?.team1?.name}</span>
              <span className={styles.info}>{data?.teams?.team1?.advInfo}</span>
            </div>
          </div>
          <div className={[styles.team, styles.team2].join(" ")}>
            <div className={styles.logoContainer}>
              <Image
                src={data?.teams?.team2?.logoPath}
                alt={data?.teams?.team2?.name + " logo"}
                className="logo"
                height="350"
                width="350"
              ></Image>
            </div>
            <div className={styles.teamInfo}>
              <span className={styles.name}>{data?.teams?.team2?.name}</span>
              <span className={styles.info}>{data?.teams?.team2?.advInfo}</span>
            </div>
          </div>
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
          <div className={styles.matchInfo}>
            {/* <span className={styles.line1}>{data?.match?.addInfo}</span> */}
            <span className={styles.line2}>{data?.match?.tier}</span>
          </div>
          <div className={styles.ticker}>
            <div className={[styles.scrollText, styles.tickerText].join(" ")}>
              {data?.match?.ticker1}
            </div>
          </div>
          <div className={styles.branding}>
            <Image
              className={styles.tranqLogo}
              src="https://cdn.discordapp.com/attachments/944093549958422528/1089324001630888047/ocac.png"
              width="50"
              height="50"
              alt="OCAC"
            ></Image>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartingSoon;
