import styles from "../../styles/TranquilityGaming/startingSoon.module.scss";
import Image from "next/image";
import useSWR from "swr";
import { env } from "../../env/client.mjs";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useEffect, useState } from "react";

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
    </>
  );
};

export default StartingSoon;
