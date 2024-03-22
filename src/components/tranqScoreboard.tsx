import styles from "../styles/TranquilityGaming/scoreboard.module.scss";
import Image from "next/image";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import SvgAttack from "./icons/Attack";
import SvgDefense from "./icons/Defense";
import { TTierAw, TTierDw, TTierHw, TTierTw } from "./icons";
import SvgTrapezoids11FinalsL from "./icons/Trapezoids11FinalsL";
import SvgTrapezoids11FinalsR from "./icons/Trapezoids11FinalsR";
import { TIconInvertedW } from "./icons";

const TranqScoreboard = (props: any) => {
  const data: AllData = props.data;
  const infoBox = !(props.info === false);

  function getIcon(tier: string) {
    if (tier === "H") {
      return <TTierHw />;
    } else if (tier === "D") {
      return <TTierDw />;
    } else if (tier === "T") {
      return <TTierTw />;
    } else if (tier === "A") {
      return <TTierAw />;
    }
  }

  const Team = (props: { team: number; side: string }) => {
    const team = props.team === 1 ? data.teams.team1 : data.teams.team2;
    console.log(team);
    return (
      <div
        className={[
          styles.team,
          styles["team" + props.team],
          styles[props.side],
        ].join(" ")}
      >
        <div className={styles.teamBox}>
          <div
            className={[
              styles.teamStats,
              styles[
                String(
                  props.side === "left" ? data.match.showTL : data.match.showTR
                )
              ],
            ].join(" ")}
          >
            {props.side === "left" ? data.match.TLInfo : data.match.TRInfo}
          </div>
          <div className={styles.teamMain}>
            <div className={styles.bgwrapper}>
              <div className={styles.bgimg}>
                <TIconInvertedW />
              </div>
            </div>
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
          ["ATTACK", "DEFENSE"].includes(team.atkDef.toUpperCase()) && (
            <div className={styles.atkDef}>
              {team.atkDef.toUpperCase() === "ATTACK" ? (
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
      <div
        className={[
          styles.tierTag,
          styles[String(data.match.showTierTag)],
        ].join(" ")}
      >
        <span>{getIcon(data.match.tier)}</span> {data?.match?.tierTag}
      </div>
      {/* INFO BOX */}
      {infoBox && (
        <div
          className={[styles.infoBox, styles[String(data.match.showTM)]].join(
            " "
          )}
        >
          {data?.match?.TMInfo}
        </div>
      )}
      <div className={styles.teams}>
        <Team team={data?.match?.swapSides ? 2 : 1} side="left" />
        <Team team={data?.match?.swapSides ? 1 : 2} side="right" />
      </div>
    </div>
  );
};
export default TranqScoreboard;
