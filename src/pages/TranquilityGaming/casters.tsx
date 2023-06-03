import styles from "../../styles/TranquilityGaming/casters.module.scss";
import Image from "next/image";
import useSWR from "swr";
import { env } from "../../env/client.mjs";
import TranqScoreboard from "../../components/tranqScoreboard";
import TranqScoreboardEW from "../../components/tranqScoreboardEW";
import TranqCaster from "../../components/tranqCaster";
import TranqPred from "../../components/tranqPred";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const URL = env.NEXT_PUBLIC_URL;
const API =
  URL + `/api/sheets?sheet=15lldKBTIAAzgKlg7SizMCJkx68OVyOiMlRonJJsHq5o`;

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
            --team1PrimaryColor: ${data?.teams?.team1.primaryCol ??
            "var(--tranqBlue)"};
            --team1SecondaryColor: ${data?.teams?.team1.secondaryCol ??
            "var(--tranqBlue)"};
            --team2PrimaryColor: ${data?.teams?.team2.primaryCol ??
            "var(--tranqYellow)"};
            --team2SecondaryColor: ${data?.teams?.team2.secondaryCol ??
            "var(--tranqYellow)"};
            font-family: "Industry";
            font-weight: normal;
          }
        `}
      </style>
      {["harmony", "discord", "transcendence", "admin"].includes(
        data?.match?.tier.toLowerCase()
      ) ? (
        <TranqScoreboard data={data} info={false} />
      ) : (
        <TranqScoreboardEW data={data} info={false} />
      )}

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
