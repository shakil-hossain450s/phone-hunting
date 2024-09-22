const loadPhone = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/phones?search=iphone");
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
}

const displayPhones = phones => {
    // 1. find the phones card container
    const phoneContainer = document.querySelector("#phone-container");
    phones.forEach(phone => {
        console.log(phone);
        const { brand, image, phone_name, slug } = phone;
        // 2. create a div
        const phoneCard = document.createElement("div");
        phoneCard.classList = `card bg-gray-100 w-96 shadow-xl`;
        // 3. set inner HTML
        phoneCard.innerHTML = `
            <figure>
              <img
                src=${image}
                alt="phone"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${phone_name}</h2>
              <p>
                There are many variations of passages of available, but the majority have suffered
              </p>
              <h4>$999</h4>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
              </div>
            </div>
        `;
        // 4. append child
        phoneContainer.appendChild(phoneCard);
    })
}

loadPhone();