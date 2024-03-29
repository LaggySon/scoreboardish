import styles from "../../styles/TranquilityGaming/megaanalysis.module.scss";
import Image from "next/image";
import useSWR from "swr";
import { env } from "../../env/client.mjs";
import TranqScoreboard from "../../components/tranqScoreboard";
import TranqCaster from "../../components/tranqCouchCaster";
import TranqTelestrator from "../../components/tranqTelestrator";
import TranqScoreboardEW from "../../components/tranqScoreboardEW";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const URL = env.NEXT_PUBLIC_URL;
const API = URL + `/api/sheets`;

const Casters = (props: any) => {
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

  const users = data?.cams;
  console.log(users);

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
          }
        `}
      </style>
      {/* <div className={styles.startingTimer}>{dayjsLeft.format("mm:ss")}</div> */}
      {["harmony", "discord", "transcendence", "admin pugs"].includes(
        data?.match?.tier.toLowerCase()
      ) ? (
        <TranqScoreboard data={data} info={false} />
      ) : (
        <TranqScoreboardEW data={data} />
      )}
      <div className={styles.casterContainer}>
        <div className={styles.castersTri}>
          {users.slice(2, -1).map((user: any, index: number) => (
            <div className={styles.casterBox} key={index}>
              <TranqCaster font="0.9rem" name={user[0]} link={user[1]} />
            </div>
          ))}
        </div>
        <div className={styles.teleBox}>
          <TranqTelestrator
            name={users.slice(-1)[0][0]}
            link={users.slice(-1)[0][1]}
            font="2.2rem"
          />
        </div>
      </div>
    </>
  );
};

export default Casters;
