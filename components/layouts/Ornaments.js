import Themes from "../../public/themes.json"

const Ornaments = ({ item }) => {
    return (
        <div className="pointer-events-none absolute top-0 left-0 right-0 bottom-0 -z-10">
            <span className="animate_animated animate_fadeInTopLeft animate_slower absolute top-0 left-0 h-full w-1/2 bg-contain bg-left-top bg-no-repeat md:w-[20%]" style={{ backgroundImage: `url(${item.invitationTheme ? Themes[item.invitationTheme].ornamentTop : Themes[1].ornamentTop})` }}></span>
            <span className="animate_animated animate_fadeInBottomRight animate_slower absolute bottom-0 right-0 h-full w-1/2 bg-contain bg-right-bottom bg-no-repeat md:w-[20%]" style={{ backgroundImage: `url(${item.invitationTheme ? Themes[item.invitationTheme].ornamentBottom : Themes[1].ornamentBottom})` }}></span>
        </div>
    );
}

export default Ornaments;