import styles from "../../styles/TranquilityGaming/draft.module.scss";
import useSWR from "swr";
import { env } from "../../env/client.mjs";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const URL = env.NEXT_PUBLIC_URL;
const API = URL + `/api/ascension`;

const Draft = (props: any) => {
  const { data } = useSWR(API, fetcher, {
    refreshWhenHidden: true,
    refreshInterval: 10000,
  });
  console.log(data);

  return (
    <>
      <h1 className={styles.title}>Ascension Tournament Draft Board</h1>
      <div className={styles.playerList}>
        {data &&
          data.map((p: any, i: number) => (
            <div
              className={[
                styles.player,
                p.team !== "" && styles["picked"],
                p.team !== "" && styles[p.team.split(" ")[1]],
              ].join(" ")}
              key={i}
            >
              <p className={styles.name}>{p.name}</p>
              <p>
                Primary: {p.role} {p.role2 && "- Secondary: " + p.role2}
              </p>
              <p className={styles.team}>
                Team: {p.team !== "" ? p.team : "Undrafted"}
              </p>
            </div>
          ))}
      </div>
    </>
  );
};

export default Draft;
