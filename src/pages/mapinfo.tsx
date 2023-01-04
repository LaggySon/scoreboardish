import { env } from "../env/client.mjs";
import useSWR from "swr";
import { NextPage } from "next/types";
import styles from "../styles/mapinfo.module.scss";
import Image from "next/image";
import { Control, Hybrid, Escort, Push } from "../components/icons";
import { ReactNode, ReactSVGElement } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const URL = env.NEXT_PUBLIC_URL;
const API = URL + "/api/sheets";

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
    }
  }
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
            --team1PrimaryColor: ${data?.teams?.team1.primaryCol ?? "black"};
            --team1SecondaryColor: ${data?.teams?.team1.secondaryCol ??
            "black"};
            --team2PrimaryColor: ${data?.teams?.team2.primaryCol ?? "black"};
            --team2SecondaryColor: ${data?.teams?.team2.secondaryCol ??
            "black"};
          }
        `}
      </style>
      <div className={styles.mapInfo}>
        <div className={styles.teams}>
          <div className={[styles.team1, styles.team].join(" ")}>
            <div className={styles.logoContainer}>
              <Image
                className={styles.logo}
                src={data?.teams?.team1?.logoPath}
                alt={data?.teams?.team1?.name + " Logo"}
                width="250"
                height="500"
              />
            </div>
            <div className={styles.scoreBox}>
              <span className={styles.score}>{data?.teams?.team1?.score}</span>
            </div>
          </div>
          <div className={[styles.team2, styles.team].join(" ")}>
            <div className={styles.logoContainer}>
              <Image
                className={styles.logo}
                src={data?.teams?.team2?.logoPath}
                alt={data?.teams?.team2?.name + " Logo"}
                width="250"
                height="500"
              />
            </div>
            <div className={styles.scoreBox}>
              <span className={styles.score}>{data?.teams?.team2?.score}</span>
            </div>
          </div>
        </div>
        <div className={styles.mapBox}>
          {data?.maps?.map((map: MapType, index: number) => {
            console.log(map.map);
            return (
              <div
                className={[styles.map, map.isComplete && styles.active].join(
                  " "
                )}
                key={map.map + index}
              >
                <div className={styles.mapType}>{mapTypeSvg(map)}</div>
                <span className={styles.mapText}>{map.info}</span>
                <div
                  className={styles.mapImageContainer}
                  style={{
                    backgroundColor:
                      data?.teams?.team1?.code === map.winner
                        ? data?.teams?.team1?.primaryCol
                        : data?.teams?.team2?.primaryCol,
                  }}
                >
                  <div className={styles.mapImageMask}>
                    <Image
                      className={styles.mapImage}
                      src={map.image}
                      alt={map.map}
                      quality={50}
                      width="1280"
                      height="720"
                    />
                  </div>
                </div>

                <div className={styles.logoContainer}>
                  <Image
                    className={styles.logo}
                    src={
                      data?.teams?.team1.code === map.winner
                        ? data?.teams?.team1.logoPath
                        : data?.teams?.team2.logoPath
                    }
                    alt={"Winning Team Logo"}
                    height="200"
                    width="100"
                  ></Image>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MapInfo;
