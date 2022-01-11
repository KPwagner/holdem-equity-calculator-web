'use strict';

const e = React.createElement;

export class HandTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.state = { inputText: '', displayText: '', valid: false };
    }

    render() {
        return (
            e("div", null,
                e("label", { htmlFor: this.id }, `Hand ${this.id}`),
                e("input", { type: "text", id: this.id, value: this.state.inputText, onChange: (e) => this.setState(convertHandText(e.target.value)) }),
                e("span", null, this.state.displayText)
            )
        )
    }
}

export const convertHandText = (inputText) => {
    const validRegex = new RegExp('[2-9TJQKA][HDSC][2-9TJQKA][HDSC]');
    const invalidRankRegex = new RegExp('[0-1]+');
    const upperInputText = inputText.toUpperCase();

    if (invalidRankRegex.test(upperInputText)) {
        return {inputText: inputText, displayText: 'invalid rank', valid: false };
    }
    if (validRegex.test(upperInputText)) {
        const displayText = upperInputText.replace(/H/g, '♥️').replace(/D/g, '♦️').replace(/S/g, '♠️').replace(/C/g, '♣️');
        return {inputText: inputText, displayText: displayText, valid: true };
    }
    return {inputText: inputText};
}

document.querySelectorAll('.hand-text-input')
    .forEach((domContainer, index) => {
        ReactDOM.render(e(HandTextInput, { id: index + 1 }), domContainer);
    });
