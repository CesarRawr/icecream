import styles from './LinkButton.module.css';

const LinkButton = ({ href, text }:{ href: string, text: string }) => {

	const onClick = () => location.replace(href);

	return (
		<div className={styles.button} onClick={onClick}>
			<span>Sucursal { text }</span>
		</div>
	);
};

export default LinkButton;