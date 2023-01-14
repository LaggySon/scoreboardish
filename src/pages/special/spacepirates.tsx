import styles from "../../styles/spacepirates.module.scss";
import Image from "next/image";
// import getSheets from "../lib/getSheets";
import { NextPage } from "next/types";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { env } from "../../env/client.mjs";
import { CSSTransition, SwitchTransition } from "react-transition-group";

type PageProps = {
  team1: Team;
  team2: Team;
};

type Team = {
  name: string;
  logoPath: string;
  info: string;
  score: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());
// const API = env.URL + "/api/sheets";
const URL = env.NEXT_PUBLIC_URL;
const API = URL + "/api/sheets";
// const API = "http://localhost:3000/api/sheets";

export async function getServerSideProps() {
  const _props: PageProps = await fetcher(API);
  return {
    props: _props,
  };
}

const Home: NextPage<PageProps> = (props) => {
  const { data } = useSWR(API, fetcher, {
    refreshWhenHidden: true,
    refreshInterval: 10000,
  });

  return (
    <>
      <div className={styles.scoreboard}>
        <div className={[styles.team, styles.team1].join(" ")}>
          <div className={styles.record}>{data?.teams?.team1?.info}</div>
          <div className={styles.name}>{data?.teams?.team1?.name}</div>
          <div className={styles.logoContainer}>
            <Image
              className={styles.logo}
              src={
                data?.teams?.team1.logoPath ??
                "https://www.tranquility.gg/package/Temp/Tranquility%20Logos/sp_Tranq.png"
              }
              alt={data?.teams?.team1.name + " logo"}
              width="65"
              height="133"
            />
          </div>

          <SwitchTransition>
            <CSSTransition
              key={data?.teams?.team1.score ?? "none"}
              addEndListener={(node, done) => {
                // use the css transitionend event to mark the finish of a transition
                node.addEventListener("transitionend", done, false);
              }}
              classNames="fade"
            >
              <div className={styles.score}>{data?.teams?.team1.score}</div>
            </CSSTransition>
          </SwitchTransition>
        </div>
        <div className={[styles.team, styles.team2].join(" ")}>
          <SwitchTransition>
            <CSSTransition
              key={data?.teams?.team2.score ?? "none"}
              addEndListener={(node, done) => {
                // use the css transitionend event to mark the finish of a transition
                node.addEventListener("transitionend", done, false);
              }}
              classNames="fade"
            >
              <div className={styles.score}>{data?.teams?.team2.score}</div>
            </CSSTransition>
          </SwitchTransition>
          <div className={styles.logoContainer}>
            <Image
              className={styles.logo}
              src={
                data?.teams?.team2.logoPath ??
                "https://www.tranquility.gg/package/Temp/Tranquility%20Logos/sp_Tranq.png"
              }
              alt={data?.teams?.team2.name + " logo"}
              width="65"
              height="133"
            />
          </div>
          <div className={styles.name}>{data?.teams?.team2.name}</div>
          <div className={styles.record}>{data?.teams?.team2.info}</div>
        </div>
      </div>
    </>
  );
};

export default Home;
