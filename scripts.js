window.onload = function typewriter() {
    var textArray = "Front-End Engineer".split("");
    var text = "";
    var header = "";
    textArray.forEach((character, index, array) => {
        this.setTimeout(() => {
            text = text + character;
            header = text + "|";
            this.document.getElementById("tag-line").innerHTML = "";
            $("#desktop-header").text(header);
            if (index === array.length - 1) {
                // on last loop remove cursor
                $("#desktop-header").text(text);
            }
        }, index * 250);
    });
};
