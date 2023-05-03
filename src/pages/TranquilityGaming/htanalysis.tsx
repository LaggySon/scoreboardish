import styles from "../../styles/TranquilityGaming/megaanalysis.module.scss";
import Image from "next/image";
import useSWR from "swr";
import { env } from "../../env/client.mjs";
import TranqScoreboard from "../../components/tranqScoreboard";
import TranqCaster from "../../components/tranqCouchCaster";
import TranqTelestrator from "../../components/tranqTelestrator";
import TranqScoreboardEW from "../../components/tranqScoreboardEW";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const URL = env.NEXT_PUBLIC_URL;
const API = URL + "/api/sheets";

const Casters = (props: any) => {
  const { data } = useSWR(API, fetcher, {
    refreshWhenHidden: true,
    refreshInterval: 10000,
  });

  const users = data?.cams.slice(0, 4);
  console.log(users);

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
        <TranqScoreboard data={data} info={false} />
      ) : (
        <TranqScoreboardEW data={data} />
      )}
      <div className={styles.casterContainer}>
        <div className={styles.castersTri}>
          {users.slice(0, -1).map((user: any, index: number) => (
            <div className={styles.casterBox} key={index}>
              <TranqCaster font="0.9rem" name={user[0]} link={user[1]} />
            </div>
          ))}
        </div>
        <div className={styles.teleBox}>
          <TranqTelestrator
            name={users.slice(-1)[0][0]}
            link={users.slice(-1)[0][1]}
            font="2.2rem"
          />
        </div>
      </div>
    </>
  );
};

export default Casters;
