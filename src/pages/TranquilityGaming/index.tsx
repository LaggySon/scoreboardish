import styles from "../../styles/TranquilityGaming/index.module.scss";
import Link from "next/link";
import Image from "next/image";

const Landing = (props: any) => {
  const handleClick = (e: any) => {
    if (e.type === "click") {
      console.log("Left click");
    } else if (e.type === "contextmenu") {
      console.log("Right click");
    }
  };
  return (
    <>
      <style jsx global>
        {`
          :root {
            --accentColor: var(--tranqYellow);
          }
        `}
      </style>
      <div className={styles.linkBox}>
        <Image
          className={styles.tranqLogo}
          src="/tranquilityLogoMono.svg"
          width="334"
          height="113"
          alt="Tranq Logo"
          onClick={() => {
            navigator.clipboard.writeText("this.state.textToCopy");
          }}
        ></Image>
        <Link
          className={styles.link}
          onContextMenu={(e) => {
            e.preventDefault();
            navigator.clipboard.writeText(
              "https://scoreboardish.laggi.sh/TranquilityGaming/ingame"
            );
          }}
          href="/TranquilityGaming/ingame"
          title="Right click to copy!"
        >
          In Game
        </Link>
        <Link
          className={styles.link}
          onContextMenu={(e) => {
            e.preventDefault();
            navigator.clipboard.writeText(
              "https://scoreboardish.laggi.sh/TranquilityGaming/replay"
            );
          }}
          href="/TranquilityGaming/replay"
          title="Right click to copy!"
        >
          Replay
        </Link>
        <Link
          className={styles.link}
          onContextMenu={(e) => {
            e.preventDefault();
            navigator.clipboard.writeText(
              "https://scoreboardish.laggi.sh/TranquilityGaming/mapinfo"
            );
          }}
          href="/TranquilityGaming/mapinfo"
          title="Right click to copy!"
        >
          Map Info
        </Link>
        <Link
          className={styles.link}
          href="https://scoreboardish.laggi.sh/TranquilityGaming/halftime"
          title="Right click to copy!"
          onContextMenu={(e) => {
            e.preventDefault();
            navigator.clipboard.writeText(
              "https://scoreboardish.laggi.sh/TranquilityGaming/final"
            );
          }}
        >
          Half Time
        </Link>
        <Link
          className={styles.link}
          onContextMenu={(e) => {
            e.preventDefault();
            navigator.clipboard.writeText(
              "https://scoreboardish.laggi.sh/TranquilityGaming/final"
            );
          }}
          href="/TranquilityGaming/final"
          title="Right click to copy!"
        >
          Final Score
        </Link>

        {/* <Link className={styles.link} href="/TranquilityGaming/ingame">
          In Game
        </Link>
        
        <Link className={styles.link} href="/TranquilityGaming/casters">
          Casters
        </Link>
        <Link className={styles.link} href="/TranquilityGaming/startingsoon">
          Starting Soon
        </Link>
        
         */}
        <Link className={styles.link} href="/">
          Coming Soon
        </Link>
        <p>
          - These pages only display properly on a 1920x1080 canvas.
          <br />
          - For use in broadcast please add one of these to an OBS browser
          source with the aforementioned dimensions.
          <br />- If you need these in a higher resolution, the current solution
          is to create the browser source at 1920x1080 and then stretch it to
          the desired size.
        </p>
      </div>
    </>
  );
};
export default Landing;
