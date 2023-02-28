import styles from "../../styles/TranquilityGaming/casters.module.scss";
import Image from "next/image";
import useSWR from "swr";
import { env } from "../../env/client.mjs";
import TranqScoreboard from "../../components/tranqScoreboard";
import TranqCaster from "../../components/tranqCaster";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const URL = env.NEXT_PUBLIC_URL;
const API = URL + "/api/sheets";

const Casters = (props: any) => {
  const { data } = useSWR(API, fetcher, {
    refreshWhenHidden: true,
    refreshInterval: 10000,
  });

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
      <TranqScoreboard data={data} info={false} />
      <div className={styles.casters}>
        {/* https://vdo.ninja/?push=6VEzggu&hash=30e9 */}
        <TranqCaster
          name={
            data?.twitch?.find(
              (staff: TwitchStaff) => staff.title === "Play By Play"
            ).name
          }
          link="https://vdo.ninja/?view=fdGjaBK&hash=30e9&label=Play_By_Play&password=gamer"
        />
        {/* https://vdo.ninja/?push=cxaQbCv&hash=30e9 */}
        <TranqCaster
          name={
            data?.twitch?.find(
              (staff: TwitchStaff) => staff.title === "Analyst"
            ).name
          }
          link="https://vdo.ninja/?view=fxj4Bub&hash=30e9&label=Analyst&password=gamer"
        />
      </div>
    </>
  );
};

export default Casters;
