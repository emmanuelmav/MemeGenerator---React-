import logo from '../assets/logo.svg'

const Header = () => {
    return (
        <header className="header">
            <div className="header__logo-container">
                <img src={logo} alt="troll face" />
                <h2 className="header__title">Meme Generator</h2>
            </div>
            <h3 className="header__subtitle">React Course - Project 3</h3>
        </header>
    )
}

export default Header;