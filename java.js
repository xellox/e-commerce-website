let mobileIcon = document.getElementById('mobileNav')
let navbarMenu = document.getElementById('navMenu')
let navbar = document.getElementById('navbar')

mobileIcon.addEventListener('click', mobileShow)
document.addEventListener('scroll', navbarColor)

mobileShow()
function mobileShow() {
    if(navbarMenu.style.display === 'flex') {
        navbarMenu.style.display = 'none'
    } else {navbarMenu.style.display = 'flex'}
}

function navbarColor() {
    if(window.scrollY > 0 ) {
        navbar.style.backgroundColor = 'black'
    }else{navbar.style.backgroundColor = ''}
}