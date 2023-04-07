import { NextPage } from "next/types";
import useSWR from "swr";
import { env } from "../../env/client.mjs";
import TranqScoreboard from "../../components/tranqScoreboard";
import TranqScoreboardEW from "../../components/tranqScoreboardEW";

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
            --team1PrimaryColor: var(--tranqBlue);
            --team1SecondaryColor: var(--tranqBlue);
            --team2PrimaryColor: var(--tranqYellow);
            --team2SecondaryColor: var(--tranqYellow);
            font-family: "Industry";
            font-weight: normal;
          }
        `}
      </style>
      {["harmony", "discord", "transcendence", "admin pugs"].includes(
        data?.match?.tier.toLowerCase()
      ) ? (
        <TranqScoreboard data={data} />
      ) : (
        <TranqScoreboardEW data={data} />
      )}
    </>
  );
};

export default InGame;
