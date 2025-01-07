import { accessToken, API_KEY, baseURL } from "../../../services/utils.js";

const searchInput = document.getElementById("searchInput");
const notFound = document.getElementById("notFound");
const recent = document.getElementById("recent");
const searchModal = document.getElementById("searchModal");
const recentSection = document.getElementById("recentSection");
const searchResults = document.getElementById("searchResults");
const productsSection = document.getElementById("productsSection")
const home = document.getElementById("home");


function saveSearchToLocalStorage(value) {

    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

    if (!searchHistory.includes(value)) {
      searchHistory.push({
        id : Date.now(),
        value
      });
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    }
  }

  function loadSearchHistory() {
    const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    console.log(searchHistory);
    recent.innerHTML = ""
    searchHistory.map((item)=>{recent.innerHTML += `<div class="pt-3 flex justify-between items-center" onclick="searchValue(${item.value})">
        <h3 class="text-gray-400 p-2">${item.value}</h3>
        <img
          src="../../../assets/svg/remove.svg"
          alt=""
          class="opacity-50 p-2"
          onclick="removeFromLocalStorage(${item.id})"
        />
      </div>`;})
    recent.classList.remove("hidden");
  }

  function searchValue(value) {
    searchInput.value = value.id
    searchInput.focus();
  }
  window. searchValue =  searchValue;

  function removeFromLocalStorage(id) {

    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  
    searchHistory = searchHistory.filter(item => item.id !== id);
  
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    loadSearchHistory()
  }
  window. removeFromLocalStorage =  removeFromLocalStorage;


export function searching() {
  searchInput.addEventListener("click", () => {
    searchModal.classList.remove("hidden");
    productsSection.classList.add("hidden")
    loadSearchHistory()
  });
  searchInput.addEventListener("keypress", async (event) => {
    console.log(event);
    if (event.key === "Enter") {
        const value = event.target.value;
        saveSearchToLocalStorage(value)
        try {
          const response = await fetch(
            `${baseURL}/api/records/products?searchKey=name&searchValue=${value}`,
            {
              method: "GET",
              headers: {
                api_key: API_KEY,
                Authorization: `Bearer ${accessToken()}`,
              },
            }
          );
          if (!response.ok) {
            if (response.status === 403) {
              localStorage.removeItem("token");
              location.href = "../log-in/log-in.html";
            }
            throw new Error("response is not ok!");
          }
          const result = await response.json();
          if (result.records.length === 0) {
            notFound.classList.remove("hidden");
            recentSection.classList.remove("hidden");
            recentSection.innerHTML = `<h3 class="text-[18px] pb-2">Results for "${value}"</h3>
                <h3 class="text-[16px]">0 Found</h3>`;
            searchResults.innerHTML = "";
          } else {
            notFound.classList.add("hidden");
            recentSection.classList.remove("hidden");
            recentSection.innerHTML = `<h3 class="text-[18px] pb-2">Results for "${value}"</h3>
                <h3 class="text-[16px]">${result.records.length} Found</h3>`;
            renderResults(result.records);
          }
        } catch (error) {
          console.log(`from catch ${error.message}`);
        }
    }
  });
}

function renderResults(records) {
  searchResults.innerHTML = "";
  records.forEach((result) => {
    searchResults.innerHTML += `<div onclick="productPage(${result.id})" class="flex flex-col items-center gap-3">
            <div class="bg-[#F3F3F3] rounded-[24px] p-5">
                <img src="${result.imageURL[0]}" alt="">
            </div>
            <div class="self-start px-2">
                <h3 class="font-bold text-[17px] truncate max-w-[170px]">${result.name}</h3>
                <h3 class="font-medium text-[15px]">$ ${result.price}</h3>
            </div>
        </div>`;
        searchResults.classList.add("overflow-scroll")
        recent.classList.add("hidden");
  });
}

home.addEventListener('click',()=>{
    window.location.href="./home.html"
})
