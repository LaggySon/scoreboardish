import styles from "../../styles/TranquilityGaming/megacast.module.scss";
import Image from "next/image";
import useSWR from "swr";
import { env } from "../../env/client.mjs";
import TranqScoreboard from "../../components/tranqScoreboard";
import TranqCaster from "../../components/tranqMegaCaster";
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
            font-family: "OswaldBold";
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
