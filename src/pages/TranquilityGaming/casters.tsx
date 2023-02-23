import styles from "../../styles/TranquilityGaming/casters.module.scss";
import Image from "next/image";
import useSWR from "swr";
import { env } from "../../env/client.mjs";
import TranqScoreboard from "../../components/tranqScoreboard";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const URL = env.NEXT_PUBLIC_URL;
const API = URL + "/api/sheets";

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
            --team1PrimaryColor: var(--tranqBlue);
            --team1SecondaryColor: var(--tranqYellow);
            --team2PrimaryColor: var(--tranqYellow);
            --team2SecondaryColor: var(--tranqBlue);
            font-family: "Industry";
            font-weight: normal;
          }
        `}
      </style>
      <TranqScoreboard data={data} />
      <Image
        src="https://www.tranquility.gg/package/digitize/Casters/CastersBG.png"
        alt="background"
        height={1080}
        width={1920}
        className={styles.backgroundImage}
      ></Image>
      <Image
        src="https://www.tranquility.gg/package/digitize/Casters/CastersFG.png"
        alt="background"
        height={1080}
        width={1920}
        className={styles.backgroundImage}
      ></Image>
    </>
  );
};

export default Casters;
