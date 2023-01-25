import styles from "../../styles/TranquilityGaming/index.module.scss";
import Link from "next/link";
import Image from "next/image";

const Landing = (props: any) => {
  return (
    <>
      {/* <style>{`:root{font-family: "Industry";
    font-weight: normal;}`}</style> */}
      <div className={styles.linkBox}>
        <Image
          className={styles.tranqLogo}
          src="/tranquilityLogoMono.svg"
          width="334"
          height="113"
          alt="Tranq Logo"
        ></Image>

        {/* <Link className={styles.link} href="/TranquilityGaming/ingame">
          In Game
        </Link>
        <Link className={styles.link} href="/TranquilityGaming/mapinfo">
          Map Info
        </Link>
        <Link className={styles.link} href="/TranquilityGaming/casters">
          Casters
        </Link>
        <Link className={styles.link} href="/TranquilityGaming/startingsoon">
          Starting Soon
        </Link>
        <Link className={styles.link} href="/TranquilityGaming/credits">
          Credits
        </Link>
        <Link className={styles.link} href="/TranquilityGaming/halftime">
          Half Time
        </Link> */}
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
