import styles from "../styles/TranquilityGaming/couchCaster.module.scss";
import Image from "next/image";
// import ScaleText from "react-scale-text";

const TranqCaster = (props: any) => {
  const name = props.name;
  const link = props.link;
  const customFontSize = props.font;
  console.log(props);
  return (
    <div className={styles.casterSizer}>
      <div className={styles.casterFrame}>
        <iframe src={link} scrolling="no"></iframe>

        <div className={styles.nameContainer}>
          <div className={styles.name}>
            {/* <ScaleText widthOnly={false}> */}
            <span
              style={{ fontSize: customFontSize }}
              className={styles.nameSpan}
            >
              {/* {name} */}
            </span>
            {/* </ScaleText> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TranqCaster;
