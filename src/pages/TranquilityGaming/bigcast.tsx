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
import { TTierAw, TTierDw, TTierHw, TTierTw } from "../../components/icons";

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

  function getIcon(tier: string) {
    if (tier === "H") {
      return <TTierHw />;
    } else if (tier === "D") {
      return <TTierDw />;
    } else if (tier === "T") {
      return <TTierTw />;
    } else if (tier === "A") {
      return <TTierAw />;
    }
  }

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
            font-family: "OswaldBold";
            font-weight: normal;
          }
        `}
      </style>

      <div className={styles.casters + " " + styles.big}>
        {/* https://vdo.ninja/?push=6VEzggu&hash=30e9 */}
        {data?.twitch?.filter((staff:TwitchStaff)=> (staff.title === "Admin")).map((staff:TwitchStaff, index:number)=>
            <TranqCaster
            staff={staff}
            link={
              staff.cam
            }
            key={index}
          />
        )}
      </div>
      <div className={styles.mapboxbig}><MapBox maps={data.maps} teams={data.teams} /></div>
      
    </>
  );
};

export default Casters;
