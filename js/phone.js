const loadPhone = async (searchText) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
}

const displayPhones = phones => {
  // 1. find the phones card container
  const phoneContainer = document.querySelector("#phone-container");
  phoneContainer.textContent = "";

  // display show all button if there are more than 12 phones
  const showAllContainer = document.querySelector("#show-all-container");
  if(phones.length > 12){
    showAllContainer.classList.remove("hidden");
  } else{
    showAllContainer.classList.add("hidden")
  }

  phones = phones.slice(0, 12);

  phones.forEach(phone => {
    // console.log(phone);
    const { brand, image, phone_name, slug } = phone;
    // 2. create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card p-6 text-center border border-[#CFCFCF] rounded-lg`;
    // 3. set inner HTML
    phoneCard.innerHTML = `
            <figure class="bg-[#0D6EFD0D] rounded-lg">
              <img class="scale-75"
                src=${image}
                alt="phone"
              />
            </figure>
            <div class="card-body p-0 pt-6">
              <h2 class="card-title justify-center text-[#403F3F] text-2xl font-bold">${phone_name}</h2>
              <p class="text-[#706F6F] font-light">
                There are many variations of passages of available, but the majority have suffered
              </p>
              <h4 class="text-[#403F3F] font-bold text-2xl">$999</h4>
              <div class="card-actions justify-center mt-6">
                <button
              class="btn px-6 py-1 bg-[#0D6EFD] hover:bg-[#0D6EFD] font-medium rounded-lg text-white"
            >
              Show Details
            </button>
              </div>
            </div>
        `;
    // 4. append child
    phoneContainer.appendChild(phoneCard);
  })
}

// 
document.querySelector("#btn-search").addEventListener("click", () => {
  const searchField = document.querySelector("#search-field");
  const searchValue = searchField.value;
  loadPhone(searchValue);
});

loadPhone("iphone");

