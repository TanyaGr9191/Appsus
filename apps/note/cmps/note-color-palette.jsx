export class NoteColorPalette extends React.Component {

    render() {
        const { paletteIsHidden, changeNoteColor } = this.props
        const colors = ['white', 'red', 'orange', 'yellow', 'green', 'teal', 'blue',
            'dark-blue', 'purple', 'pink', 'brown', 'grey']

        return <ul className="color-palette-menu" hidden={paletteIsHidden}>
            {colors.map(color => {
                return <li key={color} className={`bg-${color}`} onClick={changeNoteColor}></li>
            })}
        </ul >
    }

}