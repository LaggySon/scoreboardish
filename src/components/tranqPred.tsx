import styles from "../styles/TranquilityGaming/pred.module.scss";
import Image from "next/image";
import { env } from "../env/client.mjs";
import { motion, AnimatePresence } from "framer-motion";
import useSWR from "swr";

const fetcher = (url: string) => {
  return fetch(url).then((res) => res.json());
};
const URL = env.NEXT_PUBLIC_URL;
const API = URL + "/api/tranqpreds";

const TranqPred = (props: any) => {
  const { data } = useSWR(API, fetcher, {
    refreshWhenHidden: true,
    refreshInterval: 10000,
  });

  function percentage(pred: any, team: string) {
    if (!pred) return 0;
    const totalVotes = pred.team1Preds + pred.team2Preds;
    // console.log(JSON.stringify(pred));
    let percent =
      team === pred.team1
        ? pred.team1Preds / totalVotes
        : pred.team2Preds / totalVotes;

    percent = Math.round(percent * 100) / 100;
    // console.log(percent);
    // console.log(pred.team1Preds);
    // console.log(pred.team2Preds);
    return "" + percent * 100 + "%";
  }

  const t1 = props.t1;
  const t2 = props.t2;
  // console.log(t1 + " vs " + t2);

  if (!data) {
    return <>Loading...</>;
  }
  return (
    <AnimatePresence>
      {props.active && (
        <motion.div
          className={styles.predFrame}
          initial={{ translateX: "-100%" }}
          animate={{ translateX: "0%" }}
          exit={{ translateX: "-100%" }}
          transition={{ duration: 1 }}
        >
          <span className={styles.title}>Predicting Tranquility</span>
          <div
            className={styles.one}
            style={{
              width: percentage(
                data.predData.find((pred: any) => pred.team1 === t1),
                t1
              ),
            }}
          >
            <p className={styles.name}>{t1}</p>
            <p className={styles.percent}>
              {percentage(
                data.predData.find((pred: any) => pred.team1 === t1),
                t1
              )}
            </p>
          </div>

          <div className={styles.two}>
            <p className={styles.name}>{t2}</p>
            <p className={styles.percent}>
              {percentage(
                data.predData.find((pred: any) => pred.team2 === t2),
                t2
              )}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default TranqPred;
