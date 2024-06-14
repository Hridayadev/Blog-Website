document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".read").forEach(button => {
        button.addEventListener("click", function() {
            const index = this.getAttribute("data-index");
            const post = document.querySelectorAll(".mainPortal")[index];
            const content = post.querySelector(".content");

            if (content.style.display === "none" || content.style.display === "") {
                
                content.style.display = "block";
                this.textContent = "Minimize";

                
                document.querySelectorAll(".mainPortal").forEach(otherPost => {
                    if (otherPost !== post) {
                        otherPost.style.display = "none";
                    }
                });
            } else {
                
                content.style.display = "none";
                this.textContent = "Read";

                
                document.querySelectorAll(".mainPortal").forEach(otherPost => {
                    otherPost.style.display = "block";
                });
            }
        });
    });
});
