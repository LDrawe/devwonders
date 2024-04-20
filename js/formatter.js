// get block however you want.
const codeBlocks = document.querySelectorAll('.code-block')

for (const block of codeBlocks) {

    // remove leading and trailing white space.
    let code = block.innerHTML
        .split('\n')
        .filter(l => l.trim().length > 0)
        .join('\n')

    // find the first non-empty line and use its
    // leading whitespace as the amount that needs to be removed
    let firstNonEmptyLine = block.innerHTML
        .split('\n')
        .filter(l => l.trim().length > 0)[0]

    // using regex get the first capture group
    let leadingWhiteSpace = firstNonEmptyLine.match(/^([ ]*)/)

    // if the capture group exists, then use that to
    // replace all subsequent lines.
    if (leadingWhiteSpace && leadingWhiteSpace[0]) {
        let whiteSpace = leadingWhiteSpace[0];
        code = code.split('\n')
            .map(l => l.replace(new RegExp('^' + whiteSpace + ''), ''))
            .join('\n')
    }

    // update the inner HTML with the edited code
    block.innerHTML = code
}
