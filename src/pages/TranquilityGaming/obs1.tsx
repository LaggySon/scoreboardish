import { NextPage } from "next/types";
import useSWR from "swr";
import { env } from "../../env/client.mjs";
import styles from "../../styles/TranquilityGaming/obs.module.scss";
import Image from "next/image.js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const URL = env.NEXT_PUBLIC_URL;
const API = URL + `/api/sheets`;

const InGame: NextPage<PageProps> = (props) => {
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
            font-family: "OswaldBold";
            font-weight: normal;
          }
        `}
      </style>

      <div className={[styles.shield, styles.one].join(" ")}>
        <Image
          className={styles.logo}
          src={data?.teams?.team1?.logoPath}
          alt={data?.teams?.team1?.name + " Logo"}
          width="250"
          height="250"
        />
        <div className={styles.hexagon}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            <polygon
              points="100,0 200,50 200,150 100,200 0,150 0,50"
              stroke="var(--team1SecondaryColor)"
              stroke-width="5"
              fill="var(--team1PrimaryColor)"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default InGame;
