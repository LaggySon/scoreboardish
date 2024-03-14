import styles from "../styles/TranquilityGaming/mapbox.module.scss";
import {
  Control,
  Hybrid,
  Escort,
  Push,
  Assault,
  Flashpoint,
} from "../components/svgs";
import Image from "next/image";

export default function MapBox(props: any) {
  const maps = props.maps;
  const team1: Team = props.teams.team1;
  const team2: Team = props.teams.team2;

  const t1scores = [1, 2, 3, 4, 0];
  const t2scores = [4, 3, 2, 1, 4];

  function mapTypeSvg(map: MapType) {
    switch (map.type) {
      case "Control":
        return <Control />;
      case "Hybrid":
        return <Hybrid />;
      case "Escort":
        return <Escort />;
      case "Push":
        return <Push />;
      case "Assault":
        return <Assault />;
      case "Flashpoint":
        return <Flashpoint />;
    }
  }
  return (
    <div className={styles.mapbox}>
      <div className={styles.types}>
        {maps.map((map: MapType, i: number) => (
          <div className={styles.icon}>{mapTypeSvg(map)}</div>
        ))}
      </div>
      <div className={styles.team1}>
        <div className={styles.logo}>
          <Image
            src={team1.logoPath}
            alt={team1.short}
            height={50}
            width={50}
          ></Image>
        </div>
        <div className={styles.name}>{team1.name}</div>
        <div className={styles.scores}>
          {t1scores.map((score, i) => (
            <div className={styles.score}>{score}</div>
          ))}
        </div>
        <div className={styles.matchScore}>{team2.score}</div>
      </div>
      <div className={styles.team2}>
        <div className={styles.logo}>
          <Image
            src={team2.logoPath}
            alt={team2.short}
            height={50}
            width={50}
          ></Image>
        </div>
        <div className={styles.name}>{team2.name}</div>
        <div className={styles.scores}>
          {t2scores.map((score, i) => (
            <div className={styles.score}>{score}</div>
          ))}
        </div>
        <div className={styles.matchScore}>{team2.score}</div>
      </div>
    </div>
  );
}
