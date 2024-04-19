import styles from "../styles/TranquilityGaming/caster.module.scss";
import Image from "next/image";

const TranqCaster = (props: any) => {
  const link = props.link;
  const staff: TwitchStaff = props.staff;

  if(!staff?.pronouns && staff){
    staff.pronouns = "any";
  }

  return (
    <div className={styles.casterFrame}>
      <iframe src={link} className={props?.big && styles.big}></iframe>
      <div className={styles.info}>
        <span className={styles.name}>{staff?.name ?? "Caster"}</span>
        <div className={styles.sub}>
          <span className={styles.pronouns}>
            {staff?.pronouns ?? "any"}
          </span>
          {staff?.social && (
            <span className={styles.social}>{staff.social}</span>
          )}
        </div>
      </div>
    </div>
  );
};
export default TranqCaster;
