import styles from "./privacyPolicy.module.css"
import messages from "./privacyPolicy.messages"

const privacyPolicy = () =>
{
    return(
        <div className={styles.container}>
            <h1 className={styles.heading}>{messages.header}</h1>
            <p>Currently being constructed.</p>
        </div>
    )
}

export default privacyPolicy;