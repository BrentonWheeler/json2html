var inputElement = document.getElementById('input')
var outputElement = document.getElementById('output')
var previewElement = document.getElementById('preview')
var inputJSON = {}
var outputHTML = ''

inputElement.addEventListener('keyup', function () {
    covert(inputElement.value)
    outputElement.value = outputHTML
    previewElement.innerHTML = outputHTML
})

// Conversion controller
function covert(input) {
    try {
        inputJSON = JSON.parse(input)
    } catch (e) {
        return e
    }

    if (inputJSON) {
        outputHTML = `<details><summary>Object</summary>`
        recursiveCreateHTMLString(inputJSON)
        outputHTML += `</details>`
    }
}

// Actually does the html string creation (recursively)
function recursiveCreateHTMLString(object) {
    for (key in object) {
        let peak = JSON.stringify(object[key])
        if (peak.length > 75) {
            peak = peak.substring(0, 74) + "...";
        }
        outputHTML += `<blockquote><details><summary><span><b>${key}</b> <var> - ${peak}</var></span></summary>`
        if (typeof object[key] === 'object') {
            recursiveCreateHTMLString(object[key])
        } else {
            outputHTML += `<blockquote><code>${JSON.stringify(object[key]) || 'null'}</code></blockquote>`
        }
        outputHTML += `</details></blockquote>`
    }
}

// Run initial example
inputElement.value = '{ "fruits": { "apple": "red", "orange": "orange", "banana": "yellow" }, "animals": { "cat": "small", "whale": "big", "cow": "medium", "cat types": ["grumpy cats", "orange cats", "hungry cats", "Garfield"] } }'
covert(inputElement.value)
outputElement.value = outputHTML
previewElement.innerHTML = outputHTML