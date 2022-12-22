import styles from "../styles/index.module.scss";
import { InferGetServerSidePropsType, type NextPage } from "next";
import Image from "next/image";
import { google, sheets_v4, Auth } from "googleapis";
import { GaxiosResponse } from "gaxios";
import { AppProps } from "next/app";
import { env } from "../env/server.mjs";

type PageProps = {
  team1: Team;
  team2: Team;
};

type Team = {
  name: string;
  logoPath: string;
  info: string;
  score: string;
};

export async function getServerSideProps() {
  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    projectId: env.GOOGLE_PROJECTID,
    credentials: {
      private_key: env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join("\n"),
      client_email: env.GOOGLE_CLIENT_EMAIL,
    },
  });

  const sheets = google.sheets({ version: "v4", auth });

  const spreadsheetId = "1UTt-KfVo59GgaW6NqEgJmsQ6ANkr2w9x2QB0GJhimiU";
  const range = `MAIN!B2:Q3`;

  const response: GaxiosResponse | null = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  // console.log(response.data.values);

  const data = response.data.values;
  const _props: PageProps = {
    team1: {
      name: data[0][0],
      logoPath: data[0][4],
      info: data[0][2],
      score: data[0][1],
    },
    team2: {
      name: data[1][0],
      logoPath: data[1][4],
      info: data[1][2],
      score: data[1][1],
    },
  };

  return {
    props: _props,
  };
}

const Home: NextPage<PageProps> = (props) => {
  console.log(props);
  return (
    <>
      <div className={styles.scoreboard}>
        <div className={[styles.team, styles.team1].join(" ")}>
          <div className={styles.record}>{props.team1.info}</div>
          <div className={styles.name}>{props.team1.name}</div>
          <div className={styles.logoContainer}>
            <Image
              className={styles.logo}
              src={props.team1.logoPath}
              alt={props.team1.name + " logo"}
              width="65"
              height="133"
            />
          </div>
          <div className={styles.score}>{props.team1.score}</div>
        </div>
        <div className={[styles.team, styles.team2].join(" ")}>
          <div className={styles.score}>{props.team2.score}</div>
          <div className={styles.logoContainer}>
            <Image
              className={styles.logo}
              src={props.team2.logoPath}
              alt={props.team2.name + " logo"}
              width="65"
              height="133"
            />
          </div>
          <div className={styles.name}>{props.team2.name}</div>
          <div className={styles.record}>{props.team2.info}</div>
        </div>
      </div>
    </>
  );
};

export default Home;
