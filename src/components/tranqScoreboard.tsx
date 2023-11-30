import styles from "../styles/TranquilityGaming/scoreboard.module.scss";
import Image from "next/image";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import SvgAttack from "./icons/Attack";
import SvgDefense from "./icons/Defense";
import SvgTrapezoid from "./icons/Trapezoid";
const TranqScoreboard = (props: any) => {
  const data = props.data;
  const infoBox = !(props.info === false);

  const Team = (props: { team: number }) => {
    return (
      <div className={[styles.team, styles["team" + props.team]].join(" ")}>
        <div className={styles.teamMain}>
          <div className={styles.accentline} />
          <div className={styles.trapezoid}>
            <SvgTrapezoid />
          </div>
          {infoBox &&
            ["ATTACK", "DEFENSE"].includes(
              data?.teams["team" + props.team].atkDef
            ) && (
              <div className={styles.atkDef}>
                {data?.teams["team" + props.team].atkDef === "ATTACK" ? (
                  <SvgAttack />
                ) : (
                  <SvgDefense />
                )}
              </div>
            )}

          <div className={styles.record}>
            {data?.teams["team" + props.team].info.split(" ").join("")}
          </div>
          <div className={styles.name}>
            {data?.teams["team" + props.team].short}
          </div>
          <div className={styles.logoContainer}>
            <Image
              className={styles.logo}
              src={
                data?.teams["team" + props.team].logoPath ??
                "https://www.tranquility.gg/package/Temp/Tranquility%20Logos/sp_Tranq.png"
              }
              alt={data?.teams["team" + props.team].name + " logo"}
              width="65"
              height="65"
            />
          </div>
        </div>
        <div className={styles.scoreBox}>
          <SwitchTransition>
            <CSSTransition
              key={data?.teams["team" + props.team].score ?? "none"}
              addEndListener={(node, done) => {
                // use the css transitionend event to mark the finish of a transition
                node.addEventListener("transitionend", done, false);
              }}
              classNames="fade"
            >
              <div className={styles.score}>
                {data?.teams["team" + props.team].score}
              </div>
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.scoreboard}>
      <div className={styles.tierTag}>
        {["harmony", "discord", "transcendence", "ascendant"].includes(
          data?.match?.tier.toLowerCase()
        ) && (
          <Image
            src={`https://www.tranquility.gg/package/tierTags/${data?.match?.tier.toLowerCase()}.png`}
            alt="TierTag"
            width="489"
            height="81"
          ></Image>
        )}
      </div>
      <Team team={1} />
      {/* INFO BOX */}
      {infoBox && <div className={styles.infoBox}>{data?.match?.mapInfo}</div>}
      <Team team={2} />
    </div>
  );
};
export default TranqScoreboard;
