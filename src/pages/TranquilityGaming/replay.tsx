import styles from "../../styles/TranquilityGaming/final.module.scss";
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
        src="https://www.tranquility.gg/package/digitize/Replay.png"
        alt="background"
        height={1080}
        width={1920}
        className={styles.backgroundImage}
      ></Image>
    </>
  );
};

export default Credits;
