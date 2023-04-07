import styles from "../../styles/TranquilityGaming/megacast.module.scss";
import Image from "next/image";
import useSWR from "swr";
import { env } from "../../env/client.mjs";
import TranqScoreboard from "../../components/tranqScoreboard";
import TranqCaster from "../../components/tranqCouchCaster";
import TranqScoreboardEW from "../../components/tranqScoreboardEW";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const URL = env.NEXT_PUBLIC_URL;
const API = URL + "/api/sheets";

const Casters = (props: any) => {
  const { data } = useSWR(API, fetcher, {
    refreshWhenHidden: true,
    refreshInterval: 10000,
  });

  const users = data?.cams.slice(11, 14);
  //   const guest = users[1];
  //   const interviewee = users[0];

  //   const casters = ;

  if (!data) {
    return <>Loading...</>;
  }
  return (
    <>
      <style jsx global>
        {`
          :root {
            --team1PrimaryColor: var(--tranqBlue);
            --team1SecondaryColor: var(--tranqYellow);
            --team2PrimaryColor: var(--tranqYellow);
            --team2SecondaryColor: var(--tranqBlue);
            font-family: "Industry";
            font-weight: normal;
          }
        `}
      </style>
      {["harmony", "discord", "transcendence", "admin pugs"].includes(
        data?.match?.tier.toLowerCase()
      ) ? (
        <TranqScoreboard data={data} />
      ) : (
        <TranqScoreboardEW data={data} />
      )}
      <div className={styles.casterContainer}>
        <div className={styles.castersTri}>
          {[
            [
              data?.twitch?.find(
                (staff: TwitchStaff) => staff.title === "Play By Play"
              ).name,
              "https://vdo.ninja/?view=fdGjaBK&hash=30e9&label=Play_By_Play&password=gamer",
            ],
            [
              data?.twitch?.find(
                (staff: TwitchStaff) => staff.title === "Analyst"
              ).name,
              "https://vdo.ninja/?view=fxj4Bub&hash=30e9&label=Analyst&password=gamer",
            ],
            users[1],
          ].map((user: any, index: number) => (
            <div className={styles.casterBox} key={index}>
              <TranqCaster name={user[0]} link={user[1]} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Casters;
