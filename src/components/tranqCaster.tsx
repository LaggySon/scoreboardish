import styles from "../styles/TranquilityGaming/caster.module.scss";
import Image from "next/image";

const TranqCaster = (props: any) => {
  const name = props.name;
  const link = props.link;

  return (
    <div className={styles.casterFrame}>
      <Image
        src="https://www.tranquility.gg/package/digitize/CasterFrame.png"
        alt="Caster Frame"
        fill={true}
      />
      <iframe src={link}></iframe>
      <div className={styles.name}>
        <span>{name}</span>
      </div>
    </div>
  );
};
export default TranqCaster;
