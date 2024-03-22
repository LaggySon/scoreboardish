import styles from "../styles/TranquilityGaming/caster.module.scss";
import Image from "next/image";

const TranqCaster = (props: any) => {
  const link = props.link;
  const staff = props.staff;

  return (
    <div className={styles.casterFrame}>
      <iframe src={link}></iframe>
      <div className={styles.info}>
        <span className={styles.name}>{staff?.name ?? "Caster"}</span>
        <div className={styles.sub}>
          <span className={styles.pronouns}>{staff?.pronouns ?? "any"}</span>
          <span className={styles.social}>
            {staff?.social ?? "@tranquilitygg"}
          </span>
        </div>
      </div>
    </div>
  );
};
export default TranqCaster;
