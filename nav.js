function navlinkActive() {
    const linkChild = document.querySelector(".nav-link.active");
    const linkParent = document.querySelector(".nav-link.active").parentElement;
    

    if (linkChild) {
        linkChild.style.color = "black";
        linkParent.style.backgroundColor = "white";
        linkParent.style.borderRadius = "10px";
    }

}

navlinkActive();
