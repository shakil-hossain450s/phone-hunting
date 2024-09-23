const loadPhone = async (searchText, isShowAll) => {
  // const defaultText = searchText ? searchText : "iphone";
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText ? searchText : "iphone"}`);
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
  // 1. find the phones card container
  const phoneContainer = document.querySelector("#phone-container");
  phoneContainer.textContent = "";

  // display show all button if there are more than 12 phones
  const showAllContainer = document.querySelector("#show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  // console.log('is show all', isShowAll);

  // display only first 12 phones if not show all
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

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
                onclick="handleShowDetail('${slug}')"
                class="btn px-6 py-1 bg-[#0D6EFD] hover:bg-[#0D6EFD] font-medium rounded-lg text-white"
              >
              Show Details
              </button>
              </div>
            </div>
        `;
    // 4. append child
    phoneContainer.appendChild(phoneCard);
  });
  // hide loading spinner
  toggleLoadingSpinner(false);
}

// handle show details
const handleShowDetail = async (id) => {
  // load single phone data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;

  showPhoneDetails(phone);
}

// show phone details
const showPhoneDetails = phone => {
  console.log(phone);
  const { image, name, slug, releaseDate = {}, brand, mainFeatures: { storage, memory, chipSet, displaySize }, others: { GPS } = {} } = phone;
  show_details_modal.showModal();
  const dialogContainer = document.querySelector("#show_details_modal");

  const modalDiv = document.createElement("div");
  modalDiv.classList.add("modal-box", "text-[#403F3F]");
  modalDiv.innerHTML = `
    <div class="mb-8 flex justify-center items-center bg-[#0D6EFD0D] py-10 rounded-lg">
      <img class="scale-90" src="${image}">
    </div>
    <h3 class="text-3xl font-bold mb-3">${name}</h3>
    <p class="text-base font-normal mb-5">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <div class="space-y-2">
      <p><span class="font-bold mr-2">Storage: </span>${storage}</p>
      <p><span class="font-bold mr-2">Display Size: </span>${displaySize}</p>
      <p><span class="font-bold mr-2">Chipset: </span>${chipSet}</p>
      <p><span class="font-bold mr-2">Memory: </span>${memory}</p>
      <p><span class="font-bold mr-2">Slug: </span>${slug}</p>
      <p><span class="font-bold mr-2">Release Date: </span>${releaseDate !== "" ? releaseDate : "no release date found" }</p>
      <p><span class="font-bold mr-2">Brand: </span>${brand}</p>
      <p><span class="font-bold mr-2">GPS: </span>${GPS ? GPS : "no GPS found"}</p>
    </div>
    <div class="modal-action">
      <form method="dialog">
          <button
            class="btn px-8 bg-[#DC3545] hover:bg-[#DC3545] font-medium rounded-lg text-white"
          >
            Close
          </button>
        </form>
    </div>
  `;
  dialogContainer.appendChild(modalDiv);

}

// get the search value
function handleSearch(isShowAll) {
  // show loading spinner
  toggleLoadingSpinner(true);

  // get the search value
  const searchField = document.querySelector("#search-field");
  const searchValue = searchField.value;
  loadPhone(searchValue, isShowAll);
}

// show all 
document.querySelector("#show-all-btn").addEventListener("click", () => {
  handleSearch(true);
})

// loadingSpinner 
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.querySelector("#loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
}

loadPhone("iphone");



