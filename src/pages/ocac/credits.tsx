import styles from "../../styles/credits.module.scss";
import Image from "next/image";
import { NextPage } from "next/types";
import useSWR from "swr";
import { env } from "../../env/client.mjs";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import SvgAttack from "../../components/icons/Attack";
import SvgDefense from "../../components/icons/Defense";
import { discovery_v1 } from "googleapis";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const URL = env.NEXT_PUBLIC_URL;
const API = URL + "/api/ocac";

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
            --team1PrimaryColor: ${data?.teams?.team1.primaryCol ?? "black"};
            --team1SecondaryColor: ${data?.teams?.team1.secondaryCol ??
            "black"};
            --team2PrimaryColor: ${data?.teams?.team2.primaryCol ?? "black"};
            --team2SecondaryColor: ${data?.teams?.team2.secondaryCol ??
            "black"};
            --accentcolor: ${data?.match.accColor};
            font-family: "TommyMedium";
            text-transform: none;
          }
        `}
      </style>
      <div className={styles.credits}>
        <div className={styles.left}>
          {data?.twitch
            .filter((staff: TwitchStaff) =>
              [
                "Play By Play".toLowerCase(),
                "Analyst".toLowerCase(),
                "Color".toLowerCase(),
                "Host".toLowerCase(),
                "Desk".toLowerCase(),
              ].includes(staff.title.toLowerCase())
            )
            .map((staff: TwitchStaff) => (
              <div className={styles.staff} key={staff.name}>
                <span className={styles.title}>{staff.title}</span>
                <span className={styles.name}>{staff.name}</span>
                <span className={styles.social}>{staff.social}</span>
              </div>
            ))}
        </div>
        <div className={styles.center}>
          <span className={styles.thanks}>Thanks for watching!</span>
          <div className={styles.teams}>
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
                <span className={styles.score}>
                  {data?.teams?.team1?.score}
                </span>
              </div>
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
                <span className={styles.score}>
                  {data?.teams?.team2?.score}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.branding}>OCAC</div>
        </div>
        <div
          className={[
            styles.right,
            data?.twitch.length >= 6 && styles.lots,
          ].join(" ")}
        >
          {data?.twitch
            .filter(
              (staff: TwitchStaff) =>
                ![
                  "Play By Play".toLowerCase(),
                  "Analyst".toLowerCase(),
                  "Color".toLowerCase(),
                  "Host".toLowerCase(),
                  "Desk".toLowerCase(),
                ].includes(staff.title.toLowerCase())
            )
            .map((staff: TwitchStaff) => (
              <div className={styles.staff} key={staff.name}>
                <span className={styles.title}>{staff.title}</span>
                <span className={styles.name}>{staff.name}</span>
                <span className={styles.social}>{staff.social}</span>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Credits;
