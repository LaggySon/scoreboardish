import { NextPage } from "next/types";
import useSWR from "swr";
import { env } from "../../env/client.mjs";
import styles from "../../styles/TranquilityGaming/obs.module.scss";
import Image from "next/image.js";
import { obs, connect, getScenes } from "../../lib/obs";
import { useEffect, useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const URL = env.NEXT_PUBLIC_URL;
const API =
  URL + `/api/sheets?sheet=15lldKBTIAAzgKlg7SizMCJkx68OVyOiMlRonJJsHq5o`;

const InGame: NextPage<PageProps> = (props) => {
  const [scene, setScene] = useState("Init");
  useEffect(() => {}, []);

  return (
    <>
      <style jsx global>
        {`
          :root {
            font-family: "Industry";
            font-weight: normal;
          }
        `}
      </style>
      <p>{currScene}</p>
    </>
  );
};

export default InGame;
