// Alap valtozok
let mezok = [];
let jelenlegiJatekos = 'X';
let jatekFolyamatban = true;

// Jatekmezo betoltese
function jatekterBetoltese() {
    mezok = ['', '', '', '', '', '', '', '', ''];
    jatekFolyamatban = true;
    document.getElementById('jatekter').innerHTML = '';
    document.getElementById('eredmeny').innerText = '';
    document.getElementById('ujJatek').style.display = 'none';

    for (let i = 0; i < 9; i++) {
        let mezo = document.createElement('div');
        mezo.className = 'mezo';
        mezo.onclick = function () {
            kezelesKattintas(mezo, i);
        };
        document.getElementById('jatekter').appendChild(mezo);
    }
}

// Kattintas kezelese
function kezelesKattintas(mezo, index) {
    if (!jatekFolyamatban || mezok[index] !== '') {
        return;
    }

    mezok[index] = jelenlegiJatekos;
    mezo.innerText = jelenlegiJatekos;

    if (ellenorzes()) {
        document.getElementById('eredmeny').innerText = jelenlegiJatekos + ' játékos nyert!';
        jatekFolyamatban = false;
        document.getElementById('ujJatek').style.display = 'block';
        return;
    }

    if (mezok.every(mezo => mezo !== '')) {
        document.getElementById('eredmeny').innerText = 'A játék döntetlen!';
        jatekFolyamatban = false;
        document.getElementById('ujJatek').style.display = 'block';
        return;
    }

    jelenlegiJatekos = jelenlegiJatekos === 'X' ? 'O' : 'X';
}

// Nyertes ellenorzese
function ellenorzes() {
    const nyeroMintak = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return nyeroMintak.some(minta => {
        const [a, b, c] = minta;
        return mezok[a] === jelenlegiJatekos && mezok[b] === jelenlegiJatekos && mezok[c] === jelenlegiJatekos;
    });
}

// Uj jatek
document.getElementById('ujJatek').onclick = function () {
    jatekterBetoltese();
};

// Start
jatekterBetoltese();
