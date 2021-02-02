let radios = document.getElementsByName('radiosSound')
let theme = document.getElementById('slTheme')

if (typeof (Storage) !== undefined) {
    if (localStorage.getItem('sound')) {
        radios[0].checked = true
    }else{
        radios[1].checked = true
    }

    if (localStorage.getItem('theme') == 1) {
        theme.value = 1
    }else{
        theme.value = 2
    }
}

function configs() {
    if (typeof (Storage) !== undefined) {
        for (let i = 0; i < radios.length; i++) {
            if (radios[0].checked) {
                localStorage.setItem('sound', true)
            } else if (radios[1].checked) {
                localStorage.setItem('sound', false)
            }
        }
    
        localStorage.setItem('theme', theme.value)
    } else {
        alert(`THIS BROWSER DOESN'T SUPPORT LOCAL STORAGE!`)
    }   
}

for (let i = 0; i < radios.length; i++) {
    radios[i].addEventListener('change', configs)
}

theme.addEventListener('change', configs)