import styles from "../../styles/ocac/index.module.scss";
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
              "https://scoreboardish.laggi.sh/ocac/startingsoon"
            );
          }}
          href="/ocac/startingsoon"
          title="Right click to copy!"
        >
          Starting Soon
        </Link>

        <Link
          className={styles.link}
          onContextMenu={(e) => {
            e.preventDefault();
            navigator.clipboard.writeText(
              "https://scoreboardish.laggi.sh/ocac/casters"
            );
          }}
          href="/ocac/casters"
          title="Right click to copy!"
        >
          Casters
        </Link>

        <Link
          className={styles.link}
          onContextMenu={(e) => {
            e.preventDefault();
            navigator.clipboard.writeText(
              "https://scoreboardish.laggi.sh/ocac/ingame"
            );
          }}
          href="/ocac/ingame"
          title="Right click to copy!"
        >
          In Game
        </Link>

        <Link
          className={styles.link}
          onContextMenu={(e) => {
            e.preventDefault();
            navigator.clipboard.writeText(
              "https://scoreboardish.laggi.sh/ocac/mapinfo"
            );
          }}
          href="/ocac/mapinfo"
          title="Right click to copy!"
        >
          Map Info
        </Link>

        <Link
          className={styles.link}
          onContextMenu={(e) => {
            e.preventDefault();
            navigator.clipboard.writeText(
              "https://scoreboardish.laggi.sh/ocac/halftime"
            );
          }}
          href="/ocac/halftime"
          title="Right click to copy!"
        >
          Half Time (No Video)
        </Link>

        <Link
          className={styles.link}
          onContextMenu={(e) => {
            e.preventDefault();
            navigator.clipboard.writeText(
              "https://scoreboardish.laggi.sh/ocac/halftimevideo"
            );
          }}
          href="/ocac/halftimevideo"
          title="Right click to copy!"
        >
          Half Time (With Video)
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
          Back
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
        <p>
          Play By Play VDO Ninja Invite: <br />
          <Link href="https://vdo.ninja/?push=fdGjaBK&hash=30e9&label=Play_By_Play">
            https://vdo.ninja/?push=fdGjaBK&hash=30e9&label=Play_By_Play
          </Link>
        </p>
        <p>
          Analyst/Color VDO Ninja Invite: <br />
          <Link href="https://vdo.ninja/?push=fxj4Bub&hash=30e9&label=Analyst">
            https://vdo.ninja/?push=fxj4Bub&hash=30e9&label=Analyst
          </Link>
        </p>
      </div>
    </>
  );
};
export default Landing;
