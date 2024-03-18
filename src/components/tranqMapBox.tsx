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

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

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
          <>
            <div className={styles.icon}>{mapTypeSvg(map)}</div>
          </>
        ))}
      </div>
      <div className={styles.team1}>
        <div className={styles.logo}>
          <Image
            src={team1.logoPath}
            alt={team1.short}
            height={40}
            width={40}
          ></Image>
        </div>
        <div className={styles.name}>{team1.name}</div>
        <div className={styles.scores}>
          {maps.map((map: MapType, i: number) => (
            <>
              {i !== 0 && <div className={styles.divider}>x</div>}
              <div className={styles.score}>
                {map.isComplete ? map.t1Score : "-"}
              </div>
              {i === maps.length - 1 && <div className={styles.divider}>x</div>}
            </>
          ))}
        </div>
        <div className={styles.matchScore}>{team2.score}</div>
      </div>
      <div className={styles.team2}>
        <div className={styles.logo}>
          <Image
            src={team2.logoPath}
            alt={team2.short}
            height={40}
            width={40}
          ></Image>
        </div>
        <div className={styles.name}>{team2.name}</div>
        <div className={styles.scores}>
          {maps.map((map: MapType, i: number) => (
            <>
              {i !== 0 && <div className={styles.divider}>x</div>}
              <div className={styles.score}>
                {map.isComplete ? map.t2Score : "-"}
              </div>
              {i === maps.length - 1 && <div className={styles.divider}>x</div>}
            </>
          ))}
        </div>
        <div className={styles.matchScore}>{team2.score}</div>
      </div>
    </div>
  );
}
