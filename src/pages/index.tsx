import styles from "../styles/index.module.scss";
import Link from "next/link";
import Image from "next/image";

const Landing = (props: any) => {
  return (
    <div className={styles.linkBox}>
      <Image
        className={styles.logo}
        src="/laggishFull.svg"
        width="334"
        height="113"
        alt="Tranq Logo"
      ></Image>

      <Link className={styles.link} href="/ingame">
        In Game
      </Link>
      <Link className={styles.link} href="/mapinfo">
        Map Info
      </Link>
      <Link className={styles.link} href="/casters">
        Casters
      </Link>
      <Link className={styles.link} href="/startingsoon">
        Starting Soon
      </Link>
      <Link className={styles.link} href="/credits">
        Credits
      </Link>
      <Link className={styles.link} href="/halftime">
        Half Time
      </Link>
      <p>
        - These pages only display properly on a 1920x1080 canvas.
        <br />
        - For use in broadcast please add one of these to an OBS browser source
        with the aforementioned dimensions.
        <br />- If you need these in a higher resolution, the current solution
        is to create the browser source at 1920x1080 and then stretch it to the
        desired size.
      </p>
    </div>
  );
};
export default Landing;
