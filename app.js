   
async function searchBooks () {
    const searchInput=document.querySelector("#search-input");
    //console.log(searchInput);
    const searchValue=searchInput.value.trim();
    // console.log(searchValue);

    let resultDiv = document.querySelector(".result");
    resultDiv.innerHTML="<p></p>";
    //console.log(resultDiv);
    if (!searchValue)
    {
        alert("please enter a name");
        return;
    }  

    const url=`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchValue)}`

    try {
        let res=await fetch(url);
        let data = await res.json();

         console.log(data);

        //checking if any result found 
        if (!data.items)
        {
            resultDiv.innerHTML="<p>No results found.</p>";
            return;
        }
        let i=1;
        //if result is found
        data.items.forEach(book => {
            //extracting the info for each book in the array fo returned items
            const bookInfo=book.volumeInfo;
            const title= bookInfo.title;
            const authors=bookInfo.authors.join(", ");
            
            let desc
            if (book.searchInfo)
                desc=book.searchInfo.textSnippet;
            else 
                desc=" "
            const imgLink=bookInfo.imageLinks.thumbnail;
            const previewLink= bookInfo.previewLink;
            let genre;
            if (bookInfo.categories)
                genre=bookInfo.categories.join(", ");
            else
                genre="not available";
            

            const bookCard= ` 
            <div class="book-card">
            <a href="${previewLink}" target="_blank" class="book-link">
            <div class="book-content">
            <h3>${title}</h3>
            <h4>${authors}</h4>
            <img src="${imgLink}">
            <p>${desc}</p>
            <p>Genre/Category: ${genre}</p>
            </div>
            </a>
            </div>`

            resultDiv.innerHTML+=bookCard;
        });

    } catch (error) {
        console.log(error);
    }

}