import useSWR from "swr";
import { env } from "../../env/client.mjs";
import TranqCaster from "../../components/tranqCaster2";
import styles from "../../styles/TranquilityGaming/draft.module.scss";
import TranqTelestrator from "../../components/tranqTelestrator";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const URL = env.NEXT_PUBLIC_URL;
const API =
  URL + `/api/sheets?sheet=15lldKBTIAAzgKlg7SizMCJkx68OVyOiMlRonJJsHq5o`;

const Draft = (props: any) => {
  const { data } = useSWR(API, fetcher, {
    refreshWhenHidden: true,
    refreshInterval: 10000,
  });

  const cams = data?.cams.slice(0, 7);
  console.log(cams);

  return (
    <div className={styles.draftContainer}>
      <div className={[styles.casterContainer, styles.top].join(" ")}>
        {cams &&
          cams.slice(0, 3)?.map((user: any, index: number) => (
            <div className={styles.casterBox} key={index}>
              <TranqCaster font="0.9rem" name={user[0]} link={user[1]} />
            </div>
          ))}
      </div>
      <div className={styles.middle}>
        <div className={styles.screenShare}>
          <TranqTelestrator
            name={cams && cams[6][0]}
            link={cams && cams[6][1]}
            font="2.2rem"
          />
        </div>
        <div className={styles.host}>
          <TranqCaster
            font="0.6rem"
            name={
              data?.twitch?.find(
                (staff: TwitchStaff) => staff.title === "Play By Play"
              ).name
            }
            link="https://vdo.ninja/?view=fdGjaBK&hash=30e9&label=Play_By_Play&password=gamer"
          />
        </div>
      </div>
      <div className={[styles.casterContainer, styles.bottom].join(" ")}>
        {cams &&
          cams.slice(3, 6)?.map((user: any, index: number) => (
            <div className={styles.casterBox} key={index}>
              <TranqCaster font="0.6rem" name={user[0]} link={user[1]} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Draft;
