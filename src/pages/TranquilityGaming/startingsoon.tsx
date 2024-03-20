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

  const { data } = useSWR(API + `?sheet=${query?.sheet}`, fetcher, {
    refreshWhenHidden: true,
    refreshInterval: 10000,
  });

  //TIMER STUFF
  dayjs.extend(duration);
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(advancedFormat);

  const endTime = dayjs(data?.match?.dateTime * 1000 - 120000);

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
          <div className={styles.current}>
            <div className={styles.upnext}>Up Next</div>
            <div className={styles.matchup}>
              <div className={styles.logo1}>
                <Image
                  width="200"
                  height="200"
                  src={data.teams.team1.logoPath}
                  alt={data.teams.team1.short}
                ></Image>
              </div>
              <div className={styles.short1}>{data.teams.team1.code}</div>
              <div className={styles.vs}>VS</div>
              <div className={styles.short2}>{data.teams.team2.code}</div>
              <div className={styles.logo2}>
                <Image
                  width="200"
                  height="200"
                  src={data.teams.team2.logoPath}
                  alt={data.teams.team2.short}
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
            (match: Match) =>
              match.show && (
                <div className={styles.match} key={match.team1 + match.team2}>
                  <div className={styles.teams}>
                    <div className={styles.team1}>
                      <div
                        className={styles.name}
                        style={{ color: match.team1color }}
                      >
                        {match.team1}
                      </div>
                      <div className={styles.record}>{match.team1info}</div>
                    </div>
                    <div className={styles.team2}>
                      <div
                        className={styles.name}
                        style={{ color: match.team2color }}
                      >
                        {match.team2}
                      </div>
                      <div className={styles.record}>{match.team2info}</div>
                    </div>
                  </div>
                  <div className={styles.starttime}>{match.info}</div>
                </div>
              )
          )}
        </div>
        <div className={styles.ticker}>{data.match.ticker1}</div>
      </div>
    </>
  );
};

export default StartingSoon;
