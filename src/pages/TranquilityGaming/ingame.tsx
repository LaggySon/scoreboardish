import styles from "../../styles/TranquilityGaming/ingame.module.scss";
import Image from "next/image";
import { NextPage } from "next/types";
import useSWR from "swr";
import { env } from "../../env/client.mjs";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import SvgAttack from "../../components/icons/Attack";
import SvgDefense from "../../components/icons/Defense";

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
const URL = env.NEXT_PUBLIC_URL;
const API = URL + "/api/sheets";

const InGame: NextPage<PageProps> = (props) => {
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
      <div className={styles.scoreboard}>
        <div className={styles.tierTag}>
          <Image
            className={styles.tranqLogo}
            src="/tranqLogo.png"
            width="50"
            height="50"
            alt="Tranq Logo"
          ></Image>
          <div className={styles.infos}>
            <span className={styles.tierTagTier}>{data?.match?.tier}</span>
            <span className={styles.tierTagSubtitle}>
              {data?.match?.tierTag}
            </span>
          </div>
        </div>
        <div className={[styles.team, styles.team1].join(" ")}>
          <div className={styles.teamMain}>
            <div className={[styles.accent, styles.outside1].join(" ")} />
            {["ATTACK", "DEFENSE"].includes(data?.teams?.team1.atkDef) && (
              <div className={styles.atkDef}>
                {data?.teams?.team1.atkDef === "ATTACK" ? (
                  <SvgAttack />
                ) : (
                  <SvgDefense />
                )}
              </div>
            )}
            <div className={styles.record}>{data?.teams?.team1.info}</div>
            <div className={styles.name}>{data?.teams?.team1.short}</div>
            <div className={styles.logoContainer}>
              <Image
                className={styles.logo}
                src={
                  data?.teams?.team1.logoPath ??
                  "https://www.tranquility.gg/package/Temp/Tranquility%20Logos/sp_Tranq.png"
                }
                alt={data?.teams?.team1.name + " logo"}
                width="65"
                height="65"
              />
            </div>
            <div className={[styles.accent, styles.inside1].join(" ")} />
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
        {/* INFO BOX */}
        <div className={styles.infoBox}>{data?.match?.mapInfo}</div>
        {/* START TEAM 2 */}
        <div className={[styles.team, styles.team2].join(" ")}>
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
                <div className={styles.score}>{data?.teams?.team2.score}</div>
              </CSSTransition>
            </SwitchTransition>
          </div>
          <div className={styles.teamMain}>
            <div className={[styles.accent, styles.inside2].join(" ")} />

            <div className={styles.logoContainer}>
              <Image
                className={styles.logo}
                src={
                  data?.teams?.team2.logoPath ??
                  "https://www.tranquility.gg/package/Temp/Tranquility%20Logos/sp_Tranq.png"
                }
                alt={data?.teams?.team2.name + " logo"}
                width="65"
                height="65"
              />
            </div>
            <div className={styles.name}>{data?.teams?.team2.short}</div>
            <div className={styles.record}>{data?.teams?.team2.info}</div>
            {["ATTACK", "DEFENSE"].includes(data?.teams?.team2.atkDef) && (
              <div className={styles.atkDef}>
                {data?.teams?.team2.atkDef === "ATTACK" ? (
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
