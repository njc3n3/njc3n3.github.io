function scrollToElement(element) {
    element.scrollIntoView({ behavior: "smooth" });
}
function scrollToContent(id, isMobile = false) {
    scrollToElement(document.getElementById(id));
    if (isMobile) {
        toggleMobileMenu();
    }
}
function scrollToTop() {
    scrollToElement(document.body);
}
function changeClassList(id, className, add = true) {
    if (add) {
        document.getElementById(id).classList.add(className);
    }
    else {
        document.getElementById(id).classList.remove(className);
    }
}
let showMenu = false;
function toggleMobileMenu() {
    showMenu = !showMenu;
    const className = "mobile-menu-open";
    const menuId = "mobile-nav";
    if (showMenu) {
        changeClassList(menuId, className);
    }
    else {
        changeClassList(menuId, className, false);
    }
}
window.onscroll = () => {
    const topOffset = 20;
    const scrollBtn = document.getElementById("scroll-home");
    if (document.body.scrollTop > topOffset ||
        document.documentElement.scrollTop > topOffset) {
        scrollBtn.style.opacity = "1";
    }
    else {
        scrollBtn.style.opacity = "0";
    }
};
window.onload = () => {
    const contents = document.getElementsByClassName("content");
    for (let i = 0; i < contents.length; i++) {
        contents
            .item(i)
            .appendChild(document.createTextNode("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa dolores quifacilis magni! Cupiditate voluptatum voluptates sapiente asperiorespraesentium sed iure commodi dolorem itaque vero, deleniti ducimusrepellat porro nemo, pariatur iste eveniet accusamus dolorum eius?Aspernatur culpa ex vitae nostrum veniam illo fugiat a error consecteturquam earum temporibus officia tenetur, suscipit quis consequatur maxime!Veritatis blanditiis quia aspernatur animi adipisci veniam! Illo quamreiciendis sapiente, iure officia, ipsum quo quisquam illum laboriosamnemo deserunt distinctio ducimus sunt praesentium debitis. Blanditiisobcaecati nesciunt sequi impedit, a exercitationem accusamus faceredolorum, harum molestiae amet enim distinctio ducimus, provident ea.Possimus veniam earum at est harum! Corporis sint incidunt, esse sapientevoluptatum vitae unde tempore ipsum, quisquam excepturi deleniti non.Saepe hic est accusantium fugiat libero vitae eaque cum cumque iste,perspiciatis aperiam repudiandae dolorem nobis doloremque labore doloresdeleniti nemo numquam enim ipsum! Quasi iusto ullam officia numquamdelectus non illo voluptatum aliquid corporis deleniti. Voluptas quae oditducimus facilis dolores? Aliquid harum pariatur eaque, voluptatibusconsequatur totam odio esse! Ab vitae cumque minima molestiae, eumnecessitatibus obcaecati quod. Assumenda atque laudantium neque quodoptio? Corrupti ex natus deserunt consequatur reprehenderit, nam quodmagni excepturi veniam illo earum eius error laudantium aspernaturtemporibus voluptate, soluta voluptatum velit labore! Quidem mollitiadicta illo, vero minus fugiat tempore eveniet quos rem a iusto facilis,ullam natus, officia veniam repellat. Recusandae, quis. Quidem ametdoloribus velit voluptatem ullam molestiae dolorem mollitia ea, itaquemaiores sint eius quod neque, illo quis labore rerum beatae voluptatibus.Sint at aspernatur repudiandae commodi autem earum consequunturexercitationem quia cupiditate dolor ex, eos labore officia, molestiaseaque laudantium. Earum, sequi. Nisi vel expedita soluta laudantium fugitdistinctio corporis debitis omnis iusto voluptatibus sit tenetur obcaecatiharum, assumenda dolorum quas rem eius placeat! Maxime, aperiam.Blanditiis, eos eius quaerat est impedit fuga distinctio aliquam dicta adtempora hic id a amet repellat eum cupiditate dolores aut enim. Veniamfugit dolore repellendus tempore quo cupiditate debitis itaque suscipittenetur molestias maxime voluptate illum, odit, quasi, consecteturofficiis exercitationem minima hic! A rem illum perferendis providentsimilique minus dicta sapiente perspiciatis! Doloremque distinctio nonnatus, aut quae magnam ratione, velit soluta nesciunt iusto excepturi,cupiditate quasi sunt laudantium dolor voluptatum unde qui consecteturnobis. Ab, delectus doloremque. Nemo nisi esse porro qui consequuntur?Molestias nihil atque debitis aut necessitatibus cupiditate cumquecorporis assumenda? Tenetur, sit saepe esse enim maxime fugit quodasperiores ea animi ex ratione, reprehenderit ipsa explicabo minus nemo.Temporibus voluptates ea cupiditate porro quo pariatur odio nonperferendis quaerat magnam iste, a inventore recusandae, dolore, eiusconsequatur! Quidem soluta necessitatibus explicabo vero modi consequunturaccusantium praesentium ea quo atque! Qui fugit necessitatibus ipsum. Undeblanditiis laudantium ex aspernatur in esse modi animi adipisci sapienteea aliquid, tempora ducimus veniam aliquam! Laboriosam quaerat rationeinventore, totam mollitia beatae, dolor ipsum sed, tenetur illo fugaconsequuntur ipsa? Quasi dolore impedit ducimus reprehenderit atque eiusratione nihil fugit reiciendis, porro ipsa nostrum quibusdam similiquenesciunt optio itaque vero alias esse rerum."));
    }
};
class MyContent extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const id = this.getAttribute("content-id");
        const title = this.getAttribute("content-title");
        this.innerHTML = `
      <section id=${id} class="content">
        <header>
          <div class="spacer"></div>
          <h1>${title}</h1>
          <div class="spacer"></div>
        </header>
      </section>
    `;
    }
}
window.customElements.define("my-content", MyContent);
