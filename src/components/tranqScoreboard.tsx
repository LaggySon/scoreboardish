import styles from "../styles/TranquilityGaming/scoreboard.module.scss";
import Image from "next/image";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import SvgAttack from "./icons/Attack";
import SvgDefense from "./icons/Defense";
import SvgTrapezoids11FinalsL from "./icons/Trapezoids11FinalsL";
import SvgTrapezoids11FinalsR from "./icons/Trapezoids11FinalsR";
const TranqScoreboard = (props: any) => {
  const data = props.data;
  const infoBox = !(props.info === false);

  const Team = (props: { team: number }) => {
    const team = data?.teams["team" + props.team];
    console.log(team);
    return (
      <div className={[styles.team, styles["team" + props.team]].join(" ")}>
        <div className={styles.teamBox}>
          <div className={styles.teamStats}>This team is really cool</div>
          <div className={styles.teamMain}>
            <div className={styles.record}>{team.info}</div>
            <div className={styles.name}>{team.short}</div>
            <div className={styles.logo}>
              <Image
                alt={team.name + "logo"}
                src={team.logoPath}
                height="54"
                width="54"
                className={styles.logoImage}
              ></Image>
            </div>
            <div className={styles.score}>{team.score}</div>
          </div>
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
      </div>
    );
  };

  return (
    <div className={styles.scoreboard}>
      <div className={styles.tierTag}>{data?.match?.tier + " tier"}</div>
      {/* INFO BOX */}
      {infoBox && <div className={styles.infoBox}>{data?.match?.mapInfo}</div>}
      <div className={styles.teams}>
        <Team team={1} />
        <Team team={2} />
      </div>
    </div>
  );
};
export default TranqScoreboard;
