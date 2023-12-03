import styles from "../../styles/TranquilityGaming/roster.module.scss";
import Image from "next/image";
import useSWR from "swr";
import { env } from "../../env/client.mjs";
import TranqScoreboard from "../../components/tranqScoreboard";
import TranqScoreboardEW from "../../components/tranqScoreboardEW";
import TranqCaster from "../../components/tranqCaster";
import TranqPred from "../../components/tranqPred";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SvgSwap from "../../components/icons/Swap";
import SvgDamage from "../../components/icons/Damage";
import SvgSupport from "../../components/icons/Support";
import SvgTank from "../../components/icons/Tank";

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

  const roleIconsMap = new Map();
  roleIconsMap.set(0, <SvgDamage />);
  roleIconsMap.set(1, <SvgDamage />);
  roleIconsMap.set(2, <SvgTank />);
  roleIconsMap.set(3, <SvgSupport />);
  roleIconsMap.set(4, <SvgSupport />);

  console.log(data?.teams?.team1.roster);

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
      {[
        "harmony",
        "discord",
        "transcendence",
        "admin pugs",
        "ascendant",
        "valorant",
      ].includes(data?.match?.tier.toLowerCase()) ? (
        <TranqScoreboard data={data} />
      ) : (
        <TranqScoreboardEW data={data} />
      )}

      <div className={[styles.roster, styles.team2].join(" ")}>
        {data.teams.team2.roster.map((player: Player, index: number) => (
          <div className={styles.player} key={index}>
            {player.swap && (
              <div className={styles.swap}>
                <SvgSwap /> SWAP
              </div>
            )}

            <div className={styles.hero}>
              <Image
                src={`https://www.tranquility.gg/package/heroes/${player.hero}.png`}
                width={800}
                height={800}
                alt={player.hero}
              ></Image>
            </div>
            <div className={styles.bottom}>
              <div className={styles.role}>{roleIconsMap.get(index)}</div>
              <div className={styles.name}>{player.name}</div>

              <div className={styles.pronouns}>{player.pronouns}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Casters;
