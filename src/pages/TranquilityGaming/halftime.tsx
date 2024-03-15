import styles from "../../styles/TranquilityGaming/final.module.scss";
import Image from "next/image";
import { NextPage } from "next/types";
import useSWR from "swr";
import { env } from "../../env/client.mjs";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import SvgAttack from "../../components/icons/Attack";
import SvgDefense from "../../components/icons/Defense";
import { discovery_v1 } from "googleapis";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const URL = env.NEXT_PUBLIC_URL;
const API = URL + `/api/sheets`;

const Credits = (props: any) => {
  //Get URL parameters
  const router = useRouter();
  const [query, setQuery] = useState({ sheet: "" });
  useEffect(() => {
    if (!router.isReady) return;
    const { sheet } = router.query;
    setQuery({ sheet: String(sheet) });
  }, [router.isReady, router.query]);

  const { data } = useSWR(API + `?sheet=${query?.sheet}`, fetcher, {
    refreshWhenHidden: true,
    refreshInterval: 10000,
  });

  //TIMER STUFF
  dayjs.extend(duration);

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
    return <>Loading...</>;
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
            --tickerduration: ${(15 * data?.match?.ticker1.length) / 50}s;
          }
        `}
      </style>
      <Image
        src="https://www.tranquility.gg/package/digitize/Halftime.png"
        alt="background"
        height={1080}
        width={1920}
        className={styles.backgroundImage}
      ></Image>
      <div className={styles.startingTimer}>{dayjsLeft.format("mm:ss")}</div>
      <div className={styles.hwrap}>
        <div className={styles.hmove}>
          <div className={styles.hitem}>{data?.match?.ticker1}</div>
        </div>
      </div>

      <div className={styles.teams}>
        <div className={[styles.team, styles.team1].join(" ")}>
          <Image
            src={data?.teams?.team1?.logoPath}
            alt="team 1 logo"
            height={500}
            width={500}
            className={styles.logo}
          ></Image>
          <p className={styles.score}>{data?.teams?.team1?.score}</p>
          <p className={styles.name}>{data?.teams?.team1?.short}</p>
          <p className={styles.record}>{data?.teams?.team1?.info}</p>
        </div>
        <div className={[styles.team, styles.team2].join(" ")}>
          <Image
            src={data?.teams?.team2?.logoPath}
            alt="team 1 logo"
            height={500}
            width={500}
            className={styles.logo}
          ></Image>
          <p className={styles.score}>{data?.teams?.team2?.score}</p>
          <p className={styles.name}>{data?.teams?.team2?.short}</p>
          <p className={styles.record}>{data?.teams?.team2?.info}</p>
        </div>
      </div>
    </>
  );
};

export default Credits;
