import styles from "../styles/TranquilityGaming/scoreboard.module.scss";
import Image from "next/image";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import SvgAttack from "./icons/Attack";
import SvgDefense from "./icons/Defense";
const TranqScoreboard = (props: any) => {
  const data = props.data;
  const infoBox = !(props.info === false);
  return (
    <div className={styles.scoreboard}>
      <div className={styles.tierTag}>
        <Image
          src={`https://www.tranquility.gg/package/tierTags/${data?.match?.tier.toLowerCase()}.png`}
          alt="TierTag"
          width="489"
          height="81"
        ></Image>
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
      {infoBox && <div className={styles.infoBox}>{data?.match?.mapInfo}</div>}

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
  );
};
export default TranqScoreboard;
