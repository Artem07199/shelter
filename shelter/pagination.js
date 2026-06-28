document.addEventListener('DOMContentLoaded', () => {
    let allPets = [];
    let paginatedPets = [];
    let currentPage = 0;

    const wrapper = document.querySelector('.cards-wrapper-our');
    const pageNumBtn = document.querySelector('.number');

    fetch('pets.json')
        .then(res => res.json())
        .then(data => {
            allPets = data;
            generateMasterList();
            renderPage();
        });

    function generateMasterList() {
        let masterList = [];

        for (let i = 0; i < 6; i++) {
            let block = [...allPets].sort(() => Math.random() - 0.5);
            masterList.push(...block);
        }

        let isCorrect = false;
        while (!isCorrect) {
            isCorrect = true;
            for (let i = 0; i < masterList.length - 1; i++) {

                if ((i + 1) % 8 !== 0 && masterList[i].name === masterList[i + 1].name) {
                    [masterList[i], masterList[i + 1]] = [masterList[i + 1], masterList[i]];
                    isCorrect = false;
                }
            }
        }
        paginatedPets = masterList;
    }

    function getCardsPerPage() {
        const width = window.innerWidth;
        if (width >= 1280) return 8;
        if (width >= 768) return 6;
        return 3;
    }

    function renderPage() {
        const count = getCardsPerPage();
        const start = currentPage * count;
        const pageItems = paginatedPets.slice(start, start + count);

        wrapper.classList.add('fade-out');

        setTimeout(() => {
            wrapper.innerHTML = pageItems.map(p => `
                <div class="card card-our">
                    <img src="${p.img}" alt="${p.name}">
                    <p>${p.name}</p>
                    <button class="card-btn">Learn more</button>
                </div>
            `).join('');
            wrapper.classList.remove('fade-out');
            updateControls();
        }, 300);
    }

    function updateControls() {
        const count = getCardsPerPage();
        const maxPage = Math.ceil(48 / count) - 1;

        pageNumBtn.textContent = currentPage + 1;

        const firstBtn = document.querySelector('.first');
        const prevBtn = document.querySelector('.our-prev');
        const nextBtn = document.querySelector('.our-next');
        const lastBtn = document.querySelector('.last');

        firstBtn.disabled = (currentPage === 0);
        prevBtn.disabled = (currentPage === 0);

        nextBtn.disabled = (currentPage >= maxPage);
        lastBtn.disabled = (currentPage >= maxPage);
    }

    document.querySelector('.pets-arr').addEventListener('click', (e) => {
        const count = getCardsPerPage();
        const maxPage = Math.ceil(48 / count) - 1;

        if (e.target.closest('.first')) { currentPage = 0; }
        else if (e.target.closest('.our-prev') && currentPage > 0) { currentPage--; }
        else if (e.target.closest('.our-next') && currentPage < maxPage) { currentPage++; }
        else if (e.target.closest('.last')) { currentPage = maxPage; }
        else return;

        renderPage();
    });

    window.addEventListener('resize', () => {
        const maxPage = Math.ceil(48 / getCardsPerPage()) - 1;
        if (currentPage > maxPage) currentPage = maxPage;
        renderPage();
    });
});