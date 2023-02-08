import styles from "../../styles/TranquilityGaming/credits.module.scss";
import Image from "next/image";
import { NextPage } from "next/types";
import useSWR from "swr";
import { env } from "../../env/client.mjs";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import SvgAttack from "../../components/icons/Attack";
import SvgDefense from "../../components/icons/Defense";
import { discovery_v1 } from "googleapis";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const URL = env.NEXT_PUBLIC_URL;
const API = URL + "/api/sheets";

const Credits = (props: any) => {
  const { data } = useSWR(API, fetcher, {
    refreshWhenHidden: true,
    refreshInterval: 10000,
  });
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
          }
        `}
      </style>
      <Image
        src="https://www.tranquility.gg/package/digitize/ThanksForWatching.png"
        alt="background"
        height={1080}
        width={1920}
        className={styles.backgroundImage}
      ></Image>
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
