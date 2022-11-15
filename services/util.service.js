export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    getRandomColor,
    padNum,
    getDayName,
    getMonthName,
    createdAt,
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function padNum(num) {
    return (num > 9) ? num + '' : '0' + num
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function getDayName(date, locale) {
    date = new Date(date)
    return date.toLocaleDateString(locale, { weekday: 'long' })
}


function getMonthName(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    return monthNames[date.getMonth()]
}


function createdAt(time) {
    var newDate = new Date(time)
    // var year = newDate.getFullYear()
    var month = newDate.getMonth() + 1
    var date = newDate.getDate() 
    var hours = newDate.getHours()
    hours = hours % 12
    hours = hours ? hours : 12
    var minutes = newDate.getMinutes()
    var seconds = newDate.getSeconds()
  
    var ampm = hours >= 12 ? 'PM' : 'AM'
  
    // var monthToDisplay = (month + '').padStart(2, '0')
    // var dateToDisplay = (date + '').padStart(2, '0')
    var hoursToDisplay = (hours + '').padStart(2, '0')
    var minutesToDisplay = (minutes + '').padStart(2, '0')
    // var secondsToDisplay = (seconds + '').padStart(2, '0')
  
    return `${hoursToDisplay}:${minutesToDisplay} ${ampm}`
    // return `${monthToDisplay}/${dateToDisplay}/${year} Time: ${hoursToDisplay}:${minutesToDisplay}:${secondsToDisplay} ${ampm}`
  }