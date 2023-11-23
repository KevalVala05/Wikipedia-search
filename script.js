document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.search-box');
    const input = form.querySelector('input[type="search"]');
    // console.log("input >>>",input);
    const resultsContainer = document.querySelector('.results');
    // console.log("results container >>>",resultsContainer);
    const results = document.querySelector('header p');
    // console.log("results:::", results.innerHTML);

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        // console.log(event.preventDefault());
        const searchTerm = input.value;
        console.log("search term:::", searchTerm);
        if (searchTerm) {
            searchWikipedia(searchTerm);
            // alert("search text::",searchTerm);
        }
    });

    function searchWikipedia(searchTerm) {
        const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=250&srsearch=${encodeURIComponent(searchTerm)}`;
        // console.log(url);

        fetch(url).then(response => response.json()).then(data => {
            displayResults(data.query.search)
        }).catch(error => alert(`Error no search found for ${searchTerm} 😢 , please try again`, error))
    }

    function displayResults(results) {
        console.log("results:>>>>>", results);
        resultsContainer.innerHTML = '';
        // resultsContainer.textContent = `Results Count: ${results.length}`;

        console.log("resultscontainer.innerHTML", resultsContainer);

        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.className = 'result';
            // console.log("result title::::::",result.title);
            // console.log("result body::::::",result.snippet);
            // console.log("result page id::::::",result.pageid);
            resultElement.innerHTML = `
            <h3>${result.title}</h3>
            <p>${result.snippet}</p>
            <a href="https://en.wikipedia.org/?curid=${result.pageid}" target="_blank">Read More</a>
            `;
            resultsContainer.appendChild(resultElement);
        });
    }
}

);