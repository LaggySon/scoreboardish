import styles from "../../styles/TranquilityGaming/startingSoon.module.scss";
import Image from "next/image";
import useSWR from "swr";
import { env } from "../../env/client.mjs";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import advancedFormat from "dayjs/plugin/advancedFormat";

import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectFade,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { useRouter } from "next/router";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const URL = env.NEXT_PUBLIC_URL;
const API = URL + `/api/sheets`;

const StartingSoon = (props: any) => {
  //Get URL parameters
  const router = useRouter();
  const [query, setQuery] = useState({ sheet: "" });
  useEffect(() => {
    if (!router.isReady) return;
    const { sheet } = router.query;
    setQuery({
      sheet: String(sheet),
    });
  }, [router.isReady, router.query]);

  const { data }: { data: AllData } = useSWR(
    API + `?sheet=${query?.sheet}`,
    fetcher,
    {
      refreshWhenHidden: true,
      refreshInterval: 10000,
    }
  );

  //TIMER STUFF
  dayjs.extend(duration);
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(advancedFormat);

  const endTime = dayjs(Number(data?.match?.dateTime) * 1000 - 120000);

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

  function getCurrentMatch() {
    return data.matches[Number(data?.match?.currentGame) - 1];
  }

  function hexToRGBA(hex: string, opacity: number) {
    // Remove '#' if present
    hex = hex.replace("#", "");

    // Parse the hex string into individual RGB values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Create the RGBA string
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  const match = getCurrentMatch();

  if (!data) {
    return <>Loading... ({query.sheet === "undefined" ? "hi" : "bye"})</>;
  }
  return (
    <>
      <style jsx global>
        {`
          :root {
            --team1PrimaryColor: ${data?.teams?.team1.primaryCol ??
            "var(--tranqBlue)"};
            --team1SecondaryColor: ${data?.teams?.team1.secondaryCol ??
            "var(--tranqBlue)"};
            --team2PrimaryColor: ${data?.teams?.team2.primaryCol ??
            "var(--tranqYellow)"};
            --team2SecondaryColor: ${data?.teams?.team2.secondaryCol ??
            "var(--tranqYellow)"};
            font-family: "OswaldBold";
            font-weight: normal;
            --tickerduration: ${(15 * data?.match?.ticker1.length) / 40}s;
          }
        `}
      </style>
      <div className={styles.parent}>
        <div className={styles.left}>
          <div className={styles.branding}>
            <Image
              src="/T_Wordmark_FW.svg"
              alt="tranquility"
              height={200}
              width={800}
            ></Image>
          </div>
          <div
            className={styles.current}
            style={{
              background: `linear-gradient(105deg, ${hexToRGBA(
                match!.team1color,
                1
              )} 0%,  
              rgba(0,0,0,1) 50%,
              
                ${hexToRGBA(match!.team2color, 1)} 100%)`,
            }}
          >
            <div className={styles.upnext}>Up Next</div>
            <div className={styles.matchup}>
              <div className={styles.logo1}>
                <Image
                  width="200"
                  height="200"
                  src={match!.team1logo}
                  alt={match!.team1}
                ></Image>
              </div>
              <div
                className={styles.short1}
                style={{ color: match!.team1color }}
              >
                {match!.team1code}
              </div>
              <div className={styles.vs}>VS</div>
              <div
                className={styles.short2}
                style={{ color: match!.team2color }}
              >
                {match!.team2code}
              </div>
              <div className={styles.logo2}>
                <Image
                  width="200"
                  height="200"
                  src={match!.team2logo}
                  alt={match!.team2}
                ></Image>
              </div>
            </div>
          </div>
          <div className={styles.timer}>
            <div className={styles.startingsoon}>Starting Soon</div>
            <div className={styles.timer}>{dayjsLeft.format("mm:ss")}</div>
          </div>
        </div>
        <div className={styles.matches}>
          {data.matches.map(
            (match: Match, i: number) =>
              match.show && (
                <div
                  className={[
                    styles.match,
                    Number(data.match.currentGame) - 1 === i && styles.active,
                  ].join(" ")}
                  key={match.team1 + match.team2}
                >
                  <div className={styles.teams}>
                    <div className={styles.team1}>
                      <div
                        className={styles.name}
                        style={{ color: match.team1color }}
                      >
                        {match.team1} <span>{match.team1code}</span>
                      </div>
                      <div className={styles.record}>{match.team1info}</div>
                    </div>
                    <div className={styles.team2}>
                      <div
                        className={styles.name}
                        style={{ color: match.team2color }}
                      >
                        {match.team2} <span>{match.team2code}</span>
                      </div>
                      <div className={styles.record}>{match.team2info}</div>
                    </div>
                  </div>
                  <div className={styles.starttime}>{match.info}</div>
                </div>
              )
          )}
        </div>
        <div className={styles.ticker}>
          <span>{data.match.ticker1}</span>
        </div>
      </div>
    </>
  );
};

export default StartingSoon;
