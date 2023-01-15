import styles from "../styles/startingSoon.module.scss";
import Image from "next/image";
import { NextPage } from "next/types";
import useSWR from "swr";
import { env } from "../env/client.mjs";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import SvgAttack from "../components/icons/Attack";
import SvgDefense from "../components/icons/Defense";

type PageProps = {
  team1: Team;
  team2: Team;
};

type Team = {
  name: string;
  logoPath: string;
  info: string;
  score: string;
  atkDef: string;
  color: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const URL = env.NEXT_PUBLIC_URL;
const API = URL + "/api/sheets";

const InGame: NextPage<PageProps> = (props) => {
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
      <div className={styles.startingSoon}></div>
    </>
  );
};

export default InGame;
