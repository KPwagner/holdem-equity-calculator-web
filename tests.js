import { convertHandText, HandTextInput } from "./equity-calc.js";

const assert = (message, expr) => {
    if (!expr) throw new Error(message);
    assert.count++;
    return true;
};

const output = (text, color) => {
    const p = document.createElement('p');
    p.innerHTML = text;
    p.style.color = color;
    p.className = 'test-output';
    document.body.appendChild(p);
};

assert.count = 0;

const textConversions = [
    {textInput: 'AcKc', textDisplay: 'A♣️K♣️'},
    {textInput: 'QdQh', textDisplay: 'Q♦️Q♥️'},
    {textInput: '2d3h', textDisplay: '2♦️3♥️'},
    {textInput: 'TsJc', textDisplay: 'T♠️J♣️'},
    {textInput: '1sJc', textDisplay: 'invalid rank'},
    {textInput: 'Js0c', textDisplay: 'invalid rank'},
];

try {
    textConversions.forEach((c) => {
        const testName = `${c.textInput} should convert to display text: ${c.textDisplay}`;
        assert(testName, convertHandText(c.textInput).displayText === c.textDisplay);
        output(`Test: ${testName} (passed)`, '#0c0');
    });
    output(`${assert.count} tests OK`, '#0c0');
} catch (e) {
    output(`Test failed: ${e.message}`, '#c00');
}
