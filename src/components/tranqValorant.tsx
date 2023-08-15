import styles from "../styles/TranquilityGaming/valscoreboard.module.scss";
import Image from "next/image";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import SvgAttack from "./icons/Attack";
import SvgDefense from "./icons/Defense";
const TranqValScoreboard = (props: any) => {
  const data = props.data;
  const infoBox = !(props.info === false);
  return (
    <div className={styles.scoreboard}>
      <Image
        src="/valorantOverlay.png"
        alt="overlay"
        height={1080}
        width={1920}
      ></Image>
      <Image
        className={styles.logo1}
        src={data?.teams?.team1?.logoPath}
        alt="logo1"
        height="300"
        width="420"
      ></Image>
      <p className={styles.name1}>{data?.teams?.team1?.code}</p>
      <p className={styles.score1}>{data?.teams?.team1?.score}</p>
      <Image
        className={styles.logo2}
        src={data?.teams?.team2?.logoPath}
        alt="logo2"
        height="300"
        width="420"
      ></Image>
      <p className={styles.name2}>{data?.teams?.team2?.code}</p>
      <p className={styles.score2}>{data?.teams?.team2?.score}</p>
    </div>
  );
};
export default TranqValScoreboard;
