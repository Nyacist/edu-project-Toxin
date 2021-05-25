import './_dropdown.scss';
import * as $ from "jquery";

//show
for (let btn of document.querySelectorAll('.dropdown__input')) {
    btn.addEventListener('click', function (e) {
        this.classList.toggle('dropdown__border');
        this.nextElementSibling.classList.toggle('show');
    })
}

//disable "+" and "-"
for (let dropdownCount of document.querySelectorAll('.dropdown__count>h3')) {
    disableSign(dropdownCount);
}




//counter
for (let counter of document.querySelectorAll('.dropdown__wrapper')) {
    counter.addEventListener('click', function (e) {
        let sign = e.target.getAttribute('data-action');
        if (sign == 'minus') {
            let number = $(e.target).next().text();
            if (number > 0) {
                number--;
                $(e.target).next().html(number);
            }
            disableSign($(e.target).next());
        }
        if (sign == 'plus') {
            let number = $(e.target).prev().text();
            if (number < 5) {
                number++;
                $(e.target).prev().html(number);
            }
            disableSign($(e.target).prev());
        }
        switch (counter.getAttribute('data-action')) {
            case 'guestsNumbers': {
                totalGuests(counter);
                break;
            }
            case 'rooms': {
                roomsNumber(counter);
                break;
            }
        }
    })
}

function totalGuests(counter) {
    let guestsNumber = 0;
    for (let div of counter.querySelectorAll('.dropdown__count>h3')) {
        guestsNumber += +$(div).text();
    }
    let str = guestsNumber + ' ';
    switch (guestsNumber) {
        case 1: {
            str += 'гость';
            break;
        }
        case 2:
        case 3:
        case 4: {
            str += 'гостя';
            break;
        }
        default:
            str += 'гостей';
    }
    counter.previousElementSibling.value = str;
}

function roomsNumber(counter) {
    let div = counter.querySelectorAll('.dropdown__count>h3');
    let str = div[0].textContent + ' ';
    switch (div[0].textContent) {
        case '0':
        case '5': {
            str += 'спален';
            break;
        }
        case '1': {
            str += 'спальня';
            break;
        }
        default:
            str += 'спальни';
    }
    str += ', ' + div[1].textContent + ' ';
    switch (div[1].textContent) {
        case '0':
        case '5':
            str += 'кроватей';
            break;
        case '1':
            str += 'кровать';
            break;
        default:
            str += 'кровати';
    }
    str += '...';
    counter.previousElementSibling.value = str;
}

function disableSign(dropdownCount) {

    switch ($(dropdownCount).text()) {
        case '0': {
            $(dropdownCount).prev().addClass('sign_disable');
            break;
        }
        case '5': {
            $(dropdownCount).next().addClass('sign_disable');
            break;
        }
        default : {
            $(dropdownCount).prev().removeClass('sign_disable');
            $(dropdownCount).next().removeClass('sign_disable');
            break;
        }
    }
}

