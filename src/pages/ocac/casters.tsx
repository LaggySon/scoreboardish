import { env } from "../../env/client.mjs";
import useSWR from "swr";
import styles from "../../styles/ocac/casters.module.scss";
import Image from "next/image";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const URL = env.NEXT_PUBLIC_URL;
const API = URL + "/api/sheets";

const Casters = (props: any) => {
  const { data } = useSWR(API, fetcher, {
    refreshWhenHidden: true,
    refreshInterval: 10000,
  });
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
            --accentcolor: #ff6600;
          }
        `}
      </style>
      <div className={styles.casters}>
        <div className={styles.topBox}>
          <Image
            className={styles.tranqLogo}
            src="https://drive.google.com/uc?export=download&id=1r3ruQvZM04FmOYfgyz2JoaFQr4SKkTGr"
            width="200"
            height="200"
            alt="Tranq Logo"
          ></Image>
        </div>
        <div className={styles.botBox}>
          <div className={styles.caster1}>
            <span className={styles.name}>
              {
                data?.twitch.find(
                  (staff: TwitchStaff) => staff.title === "Play By Play"
                ).name
              }
            </span>
            <span className={styles.handle}>
              {
                data?.twitch.find(
                  (staff: TwitchStaff) => staff.title === "Play By Play"
                ).social
              }
            </span>
          </div>
          <div className={styles.caster2}>
            <span className={styles.name}>
              {
                data?.twitch.find(
                  (staff: TwitchStaff) =>
                    staff.title === "Color" || staff.title === "Analyst"
                ).name
              }
            </span>
            <span className={styles.handle}>
              {
                data?.twitch.find(
                  (staff: TwitchStaff) =>
                    staff.title === "Color" || staff.title === "Analyst"
                ).social
              }
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Casters;
