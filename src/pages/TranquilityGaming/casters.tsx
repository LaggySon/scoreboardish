import styles from "../../styles/TranquilityGaming/casters.module.scss";
import Image from "next/image";
import useSWR from "swr";
import { env } from "../../env/client.mjs";
import TranqScoreboard from "../../components/tranqScoreboard";
import TranqScoreboardEW from "../../components/tranqScoreboardEW";
import TranqCaster from "../../components/tranqCaster";
import TranqPred from "../../components/tranqPred";
import MapBox from "../../components/tranqMapBox";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const URL = env.NEXT_PUBLIC_URL;
const API = URL + `/api/sheets`;

const Casters = (props: any) => {
  //Get URL parameters
  const router = useRouter();
  const [query, setQuery] = useState({ sheet: "" });
  useEffect(() => {
    if (!router.isReady) return;
    const { sheet } = router.query;
    setQuery({ sheet: String(sheet) });
  }, [router.isReady, router.query]);

  const { data } = useSWR(API + `?sheet=${query?.sheet}`, fetcher, {
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
      

      <div className={styles.casters}>
        {/* https://vdo.ninja/?push=6VEzggu&hash=30e9 */}
        <TranqCaster
          name={
            data?.twitch?.find(
              (staff: TwitchStaff) => staff.title === "Play By Play"
            ).name
          }
          link={data?.cams[0][1]}
        />
        {/* https://vdo.ninja/?push=cxaQbCv&hash=30e9 */}
        <TranqCaster
          name={
            data?.twitch?.find(
              (staff: TwitchStaff) => staff.title === "Analyst"
            ).name
          }
          link={data?.cams[1][1]}
        />
      </div>
      <MapBox maps={data.maps} teams={data.teams}/>
    </>
  );
};

export default Casters;
