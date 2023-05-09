import styles from "../styles/halftime.module.scss";
import Image from "next/image";
import { NextPage } from "next/types";
import useSWR from "swr";
import { env } from "../env/client.mjs";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import SvgAttack from "../components/icons/Attack";
import SvgDefense from "../components/icons/Defense";
import { discovery_v1 } from "googleapis";
import duration from "dayjs/plugin/duration";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const URL = env.NEXT_PUBLIC_URL;
const API = URL + "/api/sheets";

const HalfTime = (props: any) => {
  const { data } = useSWR(API, fetcher, {
    refreshWhenHidden: true,
    refreshInterval: 10000,
  }); //TIMER STUFF
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
            --team1PrimaryColor: ${data?.teams?.team1.primaryCol ?? "black"};
            --team1SecondaryColor: ${data?.teams?.team1.secondaryCol ??
            "black"};
            --team2PrimaryColor: ${data?.teams?.team2.primaryCol ?? "black"};
            --team2SecondaryColor: ${data?.teams?.team2.secondaryCol ??
            "black"};
          }
        `}
      </style>
      <div className={styles.halfTime}>
        <div className={[styles.team1, styles.team].join(" ")}>
          <div className={styles.logoContainer}>
            <Image
              className={styles.logo}
              src={data?.teams?.team1?.logoPath}
              alt={data?.teams?.team1?.name + " Logo"}
              width="250"
              height="250"
            />
          </div>
          <div className={styles.codeBox}>
            <span className={styles.code}>{data?.teams?.team1.code}</span>
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
                <div className={styles.score}>{data?.teams?.team1.score}</div>
              </CSSTransition>
            </SwitchTransition>
          </div>
        </div>
        <div className={styles.centerStuff + " " + styles.noVideo}>
          {/* <div className={styles.replayBox}></div> */}
          <span className={styles.halfTimeText}>Half Time</span>
          <span className={styles.halfTimeTimer}>
            {dayjsLeft.format("mm:ss")}
          </span>
        </div>
        <div className={[styles.team2, styles.team].join(" ")}>
          <div className={styles.logoContainer}>
            <Image
              className={styles.logo}
              src={data?.teams?.team2?.logoPath}
              alt={data?.teams?.team2?.name + " Logo"}
              width="250"
              height="250"
            />
          </div>
          <div className={styles.codeBox}>
            <span className={styles.code}>{data?.teams?.team2.code}</span>
          </div>
          <div className={styles.scoreBox}>
            <span className={styles.score}>{data?.teams?.team2?.score}</span>
          </div>
        </div>
        <div className={styles.botBar}>
          <div className={styles.matchInfo}>
            <span className={styles.line1}>{data?.match?.addInfo}</span>
            <span className={styles.line2}>{data?.match?.tier}</span>
          </div>
          <div className={styles.ticker}>
            <div className={[styles.scrollText, styles.tickerText].join(" ")}>
              {data?.match?.ticker1}
            </div>
          </div>
          <div className={styles.branding}>
            <Image
              className={styles.tranqLogo}
              src="/laggishFull.svg"
              width="334"
              height="50"
              alt="Tranq Logo"
            ></Image>
          </div>
        </div>
      </div>
    </>
  );
};
export default HalfTime;
