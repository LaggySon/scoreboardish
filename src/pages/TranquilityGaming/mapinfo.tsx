import { env } from "../../env/client.mjs";
import useSWR from "swr";
import { NextPage } from "next/types";
import styles from "../../styles/TranquilityGaming/mapinfo.module.scss";
import Image from "next/image";
import {
  Control,
  Hybrid,
  Escort,
  Push,
  Assault,
  Flashpoint,
} from "../../components/svgs";
import React, {
  ReactNode,
  ReactSVGElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useRouter } from "next/router";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const URL = env.NEXT_PUBLIC_URL;
const API = URL + `/api/sheets`;

const MapInfo = (props: any) => {
  function mapTypeSvg(map: MapType) {
    switch (map.type) {
      case "Control":
        return <Control />;
      case "Hybrid":
        return <Hybrid />;
      case "Escort":
        return <Escort />;
      case "Push":
        return <Push />;
      case "Assault":
        return <Assault />;
      case "Flashpoint":
        return <Flashpoint />;
    }
  }
  function findActive() {
    return data?.maps?.findIndex((map: MapType) => map.isComplete === false);
  }
  //Get URL parameters
  const router = useRouter();
  const [query, setQuery] = useState({ sheet: "" });
  useEffect(() => {
    if (!router.isReady) return;
    const { sheet } = router.query;
    setQuery({ sheet: String(sheet) });
  }, [router.isReady, router.query]);

  const { data }: { data: AllData } = useSWR(
    API + `?sheet=${query?.sheet}`,
    fetcher,
    {
      refreshWhenHidden: true,
      refreshInterval: 10000,
    }
  );
  const divRef = useRef<null | HTMLDivElement>(null);

  function TeamBar() {
    const team1 = data?.teams?.team1;
    const team2 = data?.teams?.team2;
    return (
      <div className={styles.teamBar}>
        <div className={styles.team1}>
          <div className={styles.name}>{team1.short}</div>
          <div className={styles.logo}>
            <Image
              src={team1.logoPath}
              alt={team1.code}
              height={90}
              width={90}
            />
          </div>
          <div className={styles.score}>{team1.score}</div>
        </div>
        <div className={styles.team2}>
          <div className={styles.name}>{team2.short}</div>
          <div className={styles.logo}>
            <Image
              src={team2.logoPath}
              alt={team2.code}
              height={90}
              width={90}
            />
          </div>
          <div className={styles.score}>{team2.score}</div>
        </div>
      </div>
    );
  }

  if (!data) {
    return <>Loading...</>;
  }
  function getWinLogo(map: MapType): string {
    if (map.t1Score > map.t2Score) {
      return data?.teams?.team1?.logoPath;
    } else if (map.t1Score < map.t2Score) {
      return data?.teams?.team2?.logoPath;
    } else {
      return "";
    }
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
      <div className={styles.mapinfo}>
        <TeamBar />
        <div className={styles.maps}>
          {data?.maps.map((map: MapType, i: number) => (
            <div className={styles.map}>
              <div
                className={styles.image}
                style={{ backgroundImage: `url(${map.image})` }}
              ></div>
              <div className={styles.name}>
                <span>{map.map}</span>
              </div>
              <div className={styles.winlogo}>
                <Image
                  height={200}
                  width={200}
                  src={getWinLogo(map)}
                  alt="winner"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MapInfo;
