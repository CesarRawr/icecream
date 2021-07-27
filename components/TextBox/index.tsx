import styles from './textbox.module.css';

const TextBox = ({ msg }:{ msg: string }) => {
	return (
      <div className={styles.textContainer}>
        <span className={styles.loadingText}>{ msg }</span>
      </div>
	);
};

export default TextBox;