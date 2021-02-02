let table = document.getElementById('tblRanking')
let items = 3

if (typeof (Storage) !== undefined) {
    const winners = JSON.parse(localStorage.getItem('winners'));

    winners.sort(function (a, b) {
        if (a.wins > b.wins) {
            return -1
        } else if (a.wins < b.wins) {
            return 1
        } else {
            return 0
        }
    })

    for (let i = 0; i < winners.length; i++) {
        let line = document.createElement('tr')
        for (let j = 0; j < items; j++) {
            let col = document.createElement('td')
            if (j == 0) {
                col.innerHTML = i + 1
            } else if (j == 1) {
                col.innerHTML = winners[i].name
            } else if (j == 2) {
                col.innerHTML = winners[i].wins
            }
            line.append(col)
        }
        table.append(line)
    }
} else {
    alert(`THIS BROWSER DOESN'T SUPPORT LOCAL STORAGE!`);
}