import styles from "./polaroid.module.css"
import PolaroidBackground from "../../assets/misc/polaroid-template.png"

const Polaroid = ({image, rotate}) =>
{
    return(
        <div className={styles.polaroid} style={{transform: `rotate(${rotate})`}}>
            <img className={styles.polaroidTemplate} src={PolaroidBackground}></img>
            <img className={styles.polaroidImage} src={image}></img>
        </div>
    )
}

export default Polaroid;