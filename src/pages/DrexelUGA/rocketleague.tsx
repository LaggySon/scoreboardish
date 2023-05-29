import styles from "../../styles/DrexelUGA/rocketleague.module.scss";
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
const API =
  URL + `/api/sheets?sheet=15lldKBTIAAzgKlg7SizMCJkx68OVyOiMlRonJJsHq5o`;

const InGame: NextPage<PageProps> = (props) => {
  const gamesToWin = 3;
  const { data } = useSWR(API, fetcher, {
    refreshWhenHidden: true,
    refreshInterval: 10000,
  });

  function renderBoxes(numWins: number, key: string) {
    const boxes = [];
    for (let i = 0; i < gamesToWin; i++) {
      const won = i < numWins ? styles.won : "";
      boxes.push(
        <div
          className={[styles.scoreBox, won].join(" ")}
          key={key + " " + i}
        ></div>
      );
    }
    return boxes;
  }

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
        <div className={[styles.teamBig, styles.teamBig1].join(" ")}>
          <div className={[styles.team, styles.team1].join(" ")}>
            <div className={styles.logoContainer}>
              <Image
                className={styles.logo}
                src={
                  data?.teams?.team1.logoPath ?? "/laggishShapeTransparent.svg"
                }
                alt={data?.teams?.team1.name + " logo"}
                width="85"
                height="85"
              />
            </div>
            <div className={styles.name}>{data?.teams?.team1.code}</div>
          </div>
          <div className={styles.scoreBoxes}>
            {renderBoxes(data?.teams?.team1.score, "team1")}
          </div>
        </div>
        <div className={[styles.teamBig, styles.teamBig2].join(" ")}>
          <div className={[styles.team, styles.team2].join(" ")}>
            <div className={styles.logoContainer}>
              <Image
                className={styles.logo}
                src={
                  data?.teams?.team2.logoPath ?? "/laggishShapeTransparent.svg"
                }
                alt={data?.teams?.team2.name + " logo"}
                width="85"
                height="85"
              />
            </div>
            <div className={styles.name}>{data?.teams?.team2.code}</div>
          </div>
          <div className={styles.scoreBoxes}>
            {renderBoxes(data?.teams?.team2.score, "team2")}
          </div>
        </div>
      </div>
    </>
  );
};

export default InGame;
