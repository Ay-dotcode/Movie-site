import { useContext } from 'react';
import { Theme } from '../../App';
import styles from './Toggle.module.css';

function Toggle() {
    const { theme, toggleTheme } = useContext(Theme);

    return (
        <div className={styles["toggle-container"]}>
            <input id='check'
                type="checkbox"
                onChange={toggleTheme}
                className={styles.toggle}
                checked={theme === "dark" ? true : false}
            />
            <label htmlFor="check">
                <img alt="Toggle img" className={styles["toggle-img"]} />
            </label>
        </div>
    )
}

export default Toggle 