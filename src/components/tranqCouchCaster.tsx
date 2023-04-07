import styles from "../styles/TranquilityGaming/couchCaster.module.scss";
import Image from "next/image";
// import ScaleText from "react-scale-text";

const TranqCaster = (props: any) => {
  const name = props.name;
  const link = props.link;

  return (
    <div className={styles.casterSizer}>
      <div className={styles.casterFrame}>
        <Image
          src="https://www.tranquility.gg/package/digitize/CasterFrame.png"
          alt="Caster Frame"
          fill={true}
        />
        <iframe src={link}></iframe>

        <div className={styles.nameContainer}>
          <div className={styles.name}>
            {/* <ScaleText widthOnly={false}> */}
            <span className={styles.nameSpan}>{name}</span>
            {/* </ScaleText> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TranqCaster;
