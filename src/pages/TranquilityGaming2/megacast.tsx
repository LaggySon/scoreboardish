import styles from "../../styles/TranquilityGaming/megacast.module.scss";
import Image from "next/image";
import useSWR from "swr";
import { env } from "../../env/client.mjs";
import TranqScoreboard from "../../components/tranqScoreboard";
import TranqCaster from "../../components/tranqMegaCaster";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const URL = env.NEXT_PUBLIC_URL;
const API =
  URL + `/api/sheets?sheet=1rV3UUFVUpBhkFg9YMXdV59rm7tmG0AXmcT0-qQqHGwU`;

const Casters = (props: any) => {
  const { data } = useSWR(API, fetcher, {
    refreshWhenHidden: true,
    refreshInterval: 10000,
  });

  const users = [
    {
      name: "NAME",
      link: "https://vdo.ninja/?view=fdGjaBK&hash=30e9&label=Play_By_Play&password=gamer",
    },
    {
      name: "NAME",
      link: "https://vdo.ninja/?view=fdGjaBK&hash=30e9&label=Play_By_Play&password=gamer",
    },
    {
      name: "NAME",
      link: "https://vdo.ninja/?view=fdGjaBK&hash=30e9&label=Play_By_Play&password=gamer",
    },
    {
      name: "NAME",
      link: "https://vdo.ninja/?view=fdGjaBK&hash=30e9&label=Play_By_Play&password=gamer",
    },
    {
      name: "NAME",
      link: "https://vdo.ninja/?view=fdGjaBK&hash=30e9&label=Play_By_Play&password=gamer",
    },
    {
      name: "NAME",
      link: "https://vdo.ninja/?view=fdGjaBK&hash=30e9&label=Play_By_Play&password=gamer",
    },
    {
      name: "NAME",
      link: "https://vdo.ninja/?view=fdGjaBK&hash=30e9&label=Play_By_Play&password=gamer",
    },
    {
      name: "NAME",
      link: "https://vdo.ninja/?view=fdGjaBK&hash=30e9&label=Play_By_Play&password=gamer",
    },
    {
      name: "NAME",
      link: "https://vdo.ninja/?view=fdGjaBK&hash=30e9&label=Play_By_Play&password=gamer",
    },
    {
      name: "NAME",
      link: "https://vdo.ninja/?view=fdGjaBK&hash=30e9&label=Play_By_Play&password=gamer",
    },
  ];

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
      {/* <TranqScoreboard data={data} info={false} /> */}
      <div className={styles.casterContainer}></div>
    </>
  );
};

export default Casters;