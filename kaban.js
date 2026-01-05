const attachCard = (card) => {
    const swimlanes = document.querySelectorAll('.swimlane');

    const randomSwimlane = Math.floor(Math.random() * swimlanes.length);

    swimlanes[randomSwimlane].appendChild(card);
}

// สร้าง Card
const createCard = (index) => {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.innerText = `Card #${index}`; // ชื่อของ Card
    cardElement.draggable = 'true'; // สามารถลากได้

    cardElement.addEventListener('dragstart', (e) => {
        e.target.id = 'dragged';
    });

    cardElement.addEventListener('dragend', (e) => {
        e.target.id = undefined;
    });

    attachCard(cardElement);

}

// สร้างจำนวนของ Crad ว่าจะสร้างทั้งหมดกี่ตัว
const createCards = (amount) => {
    for (let i = 0; i < amount; i++) {
        createCard(i);
    }
}

const addEventListenersToSwimlanes = () => {
    // หาว่ามี swimlane ทั้งหมดกี่ชิ้น
    const swimlanes = document.querySelectorAll('.swimlane');

    // เพิ่ม Event ที่หาว่า Card ตัวไหนที่ถูกลากอยู่ ก็ลบ Card ตัวนั้นออกจากช่องเก่า แล้วก็ไปใส่ในช่องใหม่
    for (let i = 0; i < swimlanes.length; i++) {
        swimlanes[i].addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        swimlanes[i].addEventListener('drop', (e) => {
            e.preventDefault();

            const draggedCard = document.querySelector('#dragged');
            draggedCard.parentNode.removeChild(draggedCard);
            e.currentTarget.appendChild(draggedCard);
        });
    }
}

const sortCards = () => {
    const swimlanes = document.querySelectorAll('.swimlane');

    swimlanes.forEach(lane => {
        // ดึง Card ทั้งหมดใน swimlane
        const cards = Array.from(lane.querySelectorAll('.card'));

        // เรียงเลขจากน้อยไปมาก (ดึงเลขของ Card จากโค้ดบรรทัดที่ 13)
        cards.sort((a, b) => {
            const numA = parseInt(a.innerText.replace('Card #', ''), 10);
            const numB = parseInt(b.innerText.replace('Card #', ''), 10);
            return numA - numB;
        });

        // ลบ Card เก่าออกแล้วนำมาใส่ใหม่หลังเรียงตัวเลขเสดแล้ว
        cards.forEach(card => lane.appendChild(card));
    });
};


createCards(15);
addEventListenersToSwimlanes();

