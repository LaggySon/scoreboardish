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
      <TranqPred
        t1={data?.teams?.team1.name}
        t2={data?.teams?.team2.name}
        active={data?.match?.showPreds}
      ></TranqPred>
    </>
  );
};

export default Casters;
