import PropTypes from 'prop-types';

function Title({ title, toggleTheme }) {
    return (
        <header className="title">
            <img alt="light theme" className="theme"
                onClick={() => toggleTheme()} />
            <h1>{title}</h1>
            <div className="titleEmpty"></div>
        </header>
    )
}

Title.propTypes = {
    title: PropTypes.string.isRequired,
    toggleTheme: PropTypes.func.isRequired
};

export default Title