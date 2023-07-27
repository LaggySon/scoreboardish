import styles from "../styles/TranquilityGaming/scoreboard.module.scss";
import Image from "next/image";
export default function Scoreboard(props: any) {
  return (
    <div className={styles.scoreboard}>
      <div className={styles.titleBox}>
        <div className={styles.eventTitle}>
          <Image
            src={props?.data?.teams?.team1?.logoPath}
            height="60"
            width="60"
            alt="Tranq"
            className={styles.logo}
          />
          <div>
            <p className={styles.caption}>Special Event</p>
            <p>{props?.data?.match?.tier}</p>
          </div>

          <Image
            src={props?.data?.teams?.team1?.logoPath}
            height="60"
            width="60"
            alt="Tranq"
            className={styles.logo}
          />
        </div>
      </div>
    </div>
  );
}
