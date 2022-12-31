import styles from "../styles/ingame.module.scss";
import Image from "next/image";
// import getSheets from "../lib/getSheets";
import { NextPage } from "next/types";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { env } from "../env/client.mjs";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import SvgAttack from "../components/icons/Attack";
import SvgDefense from "../components/icons/Defense";

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

const InGame: NextPage<PageProps> = (props) => {
  const { data } = useSWR(API, fetcher, {
    refreshWhenHidden: true,
    refreshInterval: 10000,
  });

  return (
    <>
      <style jsx global>
        {`
          :root {
            --team1Color: ${data?.team1?.color ?? "black"};
            --team2Color: ${data?.team2?.color ?? "black"};
          }
        `}
      </style>
      <div className={styles.scoreboard}>
        <div className={[styles.team, styles.team1].join(" ")}>
          <div className={styles.teamMain}>
            <div className={[styles.accent, styles.outside1].join(" ")} />
            {["ATTACK", "DEFENSE"].includes(data?.team1?.atkDef) && (
              <div className={styles.atkDef}>
                {data?.team1?.atkDef === "ATTACK" ? (
                  <SvgAttack />
                ) : (
                  <SvgDefense />
                )}
              </div>
            )}
            <div className={styles.record}>{data?.team1?.info}</div>
            <div className={styles.name}>{data?.team1?.name}</div>
            <div className={styles.logoContainer}>
              <Image
                className={styles.logo}
                src={
                  data?.team1?.logoPath ??
                  "https://www.tranquility.gg/package/Temp/Tranquility%20Logos/sp_Tranq.png"
                }
                alt={data?.team1?.name + " logo"}
                width="65"
                height="133"
              />
            </div>
            <div className={[styles.accent, styles.inside1].join(" ")} />
          </div>
          <div className={styles.scoreBox}>
            <SwitchTransition>
              <CSSTransition
                key={data?.team1?.score ?? "none"}
                addEndListener={(node, done) => {
                  // use the css transitionend event to mark the finish of a transition
                  node.addEventListener("transitionend", done, false);
                }}
                classNames="fade"
              >
                <div className={styles.score}>{data?.team1?.score}</div>
              </CSSTransition>
            </SwitchTransition>
          </div>
        </div>
        {/* START TEAM 2 */}
        <div className={[styles.team, styles.team2].join(" ")}>
          <div className={styles.scoreBox}>
            <SwitchTransition>
              <CSSTransition
                key={data?.team2?.score ?? "none"}
                addEndListener={(node, done) => {
                  // use the css transitionend event to mark the finish of a transition
                  node.addEventListener("transitionend", done, false);
                }}
                classNames="fade"
              >
                <div className={styles.score}>{data?.team2?.score}</div>
              </CSSTransition>
            </SwitchTransition>
          </div>
          <div className={styles.teamMain}>
            <div className={[styles.accent, styles.inside2].join(" ")} />

            <div className={styles.logoContainer}>
              <Image
                className={styles.logo}
                src={
                  data?.team2?.logoPath ??
                  "https://www.tranquility.gg/package/Temp/Tranquility%20Logos/sp_Tranq.png"
                }
                alt={data?.team2?.name + " logo"}
                width="65"
                height="133"
              />
            </div>
            <div className={styles.name}>{data?.team2?.name}</div>
            <div className={styles.record}>{data?.team2?.info}</div>
            {["ATTACK", "DEFENSE"].includes(data?.team2?.atkDef) && (
              <div className={styles.atkDef}>
                {data?.team2?.atkDef === "ATTACK" ? (
                  <SvgAttack />
                ) : (
                  <SvgDefense />
                )}
              </div>
            )}
            <div className={[styles.accent, styles.outside2].join(" ")} />
          </div>
        </div>
      </div>
    </>
  );
};

export default InGame;
