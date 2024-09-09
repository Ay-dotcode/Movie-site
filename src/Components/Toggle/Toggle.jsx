import { useContext } from 'react';
import { Theme } from '../../App';
import styles from './Toggle.module.css';

function Toggle() {
    const { theme, toggleTheme } = useContext(Theme);

    return (
        <div className={styles["Toggle-container"]}>
            <input id='check'
                type="checkbox"
                onChange={toggleTheme}
                className={styles.toggle}
                checked={theme === "dark" ? true : false}
            />
            <label htmlFor="check">Dark mode</label>
        </div>
    )
}

export default Toggle