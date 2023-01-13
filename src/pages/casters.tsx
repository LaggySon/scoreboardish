import { env } from "../env/client.mjs";
import useSWR from "swr";
import { NextPage } from "next/types";
import styles from "../styles/casters.module.scss";
import Image from "next/image";
import { Control, Hybrid, Escort, Push } from "../components/icons";
import React, {
  ReactNode,
  ReactSVGElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const URL = env.NEXT_PUBLIC_URL;
const API = URL + "/api/sheets";

const Casters = (props: any) => {
  const { data } = useSWR(API, fetcher, {
    refreshWhenHidden: true,
    refreshInterval: 10000,
  });
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
      <div className={styles.casters}>
        <div className={styles.topBox}>
          <div className={styles.teams}>
            <div className={styles.team1}>
              <div className={styles.code}>{data?.teams?.team1?.code}</div>
              <div className={styles.logoContainer}>
                <Image
                  className={styles.logo}
                  src={data?.teams?.team1?.logoPath}
                  alt="Team 1 Logo"
                  height="240"
                  width="120"
                />
              </div>
              <div className={styles.scoreBox}>
                <SwitchTransition>
                  <CSSTransition
                    key={data?.teams?.team1.score ?? "none"}
                    addEndListener={(node, done) => {
                      // use the css transitionend event to mark the finish of a transition
                      node.addEventListener("transitionend", done, false);
                    }}
                    classNames="fade"
                  >
                    <div className={styles.score}>
                      {data?.teams?.team1.score}
                    </div>
                  </CSSTransition>
                </SwitchTransition>
              </div>
            </div>
            <div className={styles.team2}>
              <div className={styles.code}>{data?.teams?.team2?.code}</div>
              <div className={styles.logoContainer}>
                <Image
                  className={styles.logo}
                  src={data?.teams?.team2?.logoPath}
                  alt="Team 1 Logo"
                  height="240"
                  width="120"
                />
              </div>
              <div className={styles.scoreBox}>
                <SwitchTransition>
                  <CSSTransition
                    key={data?.teams?.team2.score ?? "none"}
                    addEndListener={(node, done) => {
                      // use the css transitionend event to mark the finish of a transition
                      node.addEventListener("transitionend", done, false);
                    }}
                    classNames="fade"
                  >
                    <div className={styles.score}>
                      {data?.teams?.team2.score}
                    </div>
                  </CSSTransition>
                </SwitchTransition>
              </div>
            </div>
          </div>
          <div className={styles.tier}>{data?.match?.tier}</div>
        </div>
        <div className={styles.botBox}>
          <div className={styles.caster1}>
            <span className={styles.name}>
              {
                data?.twitch.find(
                  (staff: TwitchStaff) => staff.title === "Play By Play"
                ).name
              }
            </span>
            <span className={styles.handle}>
              {
                data?.twitch.find(
                  (staff: TwitchStaff) => staff.title === "Play By Play"
                ).social
              }
            </span>
          </div>
          <div className={styles.caster2}>
            <span className={styles.name}>
              {
                data?.twitch.find(
                  (staff: TwitchStaff) =>
                    staff.title === "Color" || staff.title === "Analyst"
                ).name
              }
            </span>
            <span className={styles.handle}>
              {
                data?.twitch.find(
                  (staff: TwitchStaff) =>
                    staff.title === "Color" || staff.title === "Analyst"
                ).social
              }
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Casters;
