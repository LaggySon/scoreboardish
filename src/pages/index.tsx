import styles from "../styles/index.module.scss";
import Image from "next/image";
import { NextPage } from "next/types";
import useSWR from "swr";
import { env } from "../env/client.mjs";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import SvgAttack from "../components/icons/Attack";
import SvgDefense from "../components/icons/Defense";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const URL = env.NEXT_PUBLIC_URL;
const API = URL + "/api/sheets";

const Landing = (props: any) => {
  const { data } = useSWR(API, fetcher, {
    refreshWhenHidden: true,
    refreshInterval: 10000,
  });
  if (!data) {
    return <>Loading...</>;
  }
  return (
    <div className={styles.linkBox}>
      <Link className={styles.link} href="/ingame">
        In Game Scene
      </Link>
      <Link className={styles.link} href="/mapinfo">
        Map Info Scene
      </Link>
    </div>
  );
};
export default Landing;
