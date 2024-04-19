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

  const { data } = useSWR(API + `?sheet=${query?.sheet}`, fetcher, {
    refreshWhenHidden: true,
    refreshInterval: 10000,
  });
  const divRef = useRef<null | HTMLDivElement>(null);
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
      <div className={styles.mapInfo}>
        <header className={styles.header}>
          <Image
            src="/tranqMapsOverlay.png"
            alt="overlay"
            height={1080}
            width={1920}
          ></Image>
        </header>
        <div className={[styles.team1, styles.team].join(" ")}>
          <div className={styles.logoContainer}>
            <Image
              className={styles.logo}
              src={data?.teams?.team1?.logoPath}
              alt={data?.teams?.team1?.name + " Logo"}
              width="250"
              height="250"
            />
          </div>
          <div className={styles.codeBox}>
            <span className={styles.code}>{data?.teams?.team1.code}</span>
          </div>
          <div className={styles.scoreBox}>
            <SwitchTransition>
              <CSSTransition
                key={data?.teams?.team1.score ?? "none"}
                addEndListener={(node, done) => {
                  // use the css transitionend event to mark the finish of a transition
                  node.addEventListener("transitionend", done, false);
                }}
                classNames="fade"
              >
                <div className={styles.score}>{data?.teams?.team1.score}</div>
              </CSSTransition>
            </SwitchTransition>
          </div>
        </div>
        <div className={styles.mapBox}>
          {data?.maps?.map((map: MapType, index: number) => {
            const isActive = index === findActive();
            console.log(`${map.map}: ${map.winner}`);
            return (
              <div
                className={[
                  styles.map,
                  isActive && styles.active,
                  map.isComplete && styles.complete,
                ].join(" ")}
                key={map.map + index}
              >
                <div
                  className={styles.mapType}
                  style={{} as React.CSSProperties}
                >
                  {mapTypeSvg(map)}
                </div>
                <span className={styles.mapText}>{map.info}</span>
                <div
                  className={styles.mapImageContainer}
                  style={
                    {
                      "--winnerPrimaryCol": [
                        data?.teams?.team1?.short,
                        data?.teams?.team2?.short,
                      ].includes(map.winner)
                        ? map.winner === data?.teams?.team1?.short
                          ? `${
                              data?.teams?.team1.primaryCol ??
                              "var(--tranqBlue)"
                            }`
                          : `${
                              data?.teams?.team2.primaryCol ??
                              "var(--tranqYellow)"
                            }`
                        : "#222",
                    } as React.CSSProperties
                  }
                >
                  <div className={styles.mapImageMask}>
                    {!isActive ? (
                      <Image
                        className={styles.mapImage}
                        src={map.image}
                        alt={map.map}
                        quality={50}
                        // width="1280"
                        // height="720"
                        fill={true}
                      />
                    ) : (
                      <video
                        autoPlay
                        loop
                        src={`https://tranquility.gg/package/Maps/Cinematics/${map.map.replace(
                          /\s/g,
                          ""
                        )}.mp4`}
                      ></video>
                    )}
                  </div>
                </div>

                <div className={styles.logoSizer}>
                  <Image
                    className={styles.winnerLogo}
                    src={
                      [
                        data?.teams?.team1?.short,
                        data?.teams?.team2?.short,
                      ].includes(map.winner)
                        ? map.winner === data?.teams?.team1?.short
                          ? data?.teams.team1.logoPath
                          : data?.teams.team2.logoPath
                        : index === findActive()
                        ? "/elipses.png"
                        : "/hyphen.png"
                    }
                    alt={"Winning Team Logo"}
                    fill={true}
                  ></Image>
                </div>
              </div>
            );
          })}
          <div ref={divRef}></div>
        </div>
        <div className={[styles.team2, styles.team].join(" ")}>
          <div className={styles.logoContainer}>
            <Image
              className={styles.logo}
              src={data?.teams?.team2?.logoPath}
              alt={data?.teams?.team2?.name + " Logo"}
              width="250"
              height="250"
            />
          </div>
          <div className={styles.codeBox}>
            <span className={styles.code}>{data?.teams?.team2.code}</span>
          </div>
          <div className={styles.scoreBox}>
            <span className={styles.score}>{data?.teams?.team2?.score}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapInfo;