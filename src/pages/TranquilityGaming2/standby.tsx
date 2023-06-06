import styles from "../../styles/TranquilityGaming/standby.module.scss";
import Image from "next/image";
import useSWR from "swr";
import { env } from "../../env/client.mjs";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const URL = env.NEXT_PUBLIC_URL;
const API =
  URL + `/api/sheets?sheet=1rV3UUFVUpBhkFg9YMXdV59rm7tmG0AXmcT0-qQqHGwU`;

const Credits = (props: any) => {
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
      <div className={styles.box}>
        <Image
          src="https://www.tranquility.gg/package/digitize/StandByLogo.png"
          alt="background"
          height={405}
          width={891}
          className={styles.tranqLogo}
        ></Image>
        <div className={styles.info}>{data?.match?.ticker2}</div>
      </div>
    </>
  );
};

export default Credits;