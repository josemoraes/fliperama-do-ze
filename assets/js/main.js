window.onload = () => {
  const games = [
    {
      img: "crash-team-racing.png",
      name: "Crash Team Racing",
      url: "https://www.retrogames.cc/embed/41687-crash-team-racing.html",
    },
    {
      img: "hercules.jpg",
      name: "Hercules",
      url: "https://www.retrogames.cc/embed/41734-disney-s-hercules.html",
    },
    {
      img: "castlevania.jpg",
      name: "Castlevania Dracula X",
      url:
        "https://www.retrogames.cc/embed/23408-castlevania-dracula-x-usa.html",
    },
    {
      img: "metal-slug-6.jpg",
      name: "Metal Slug 6",
      url:
        "https://www.retrogames.cc/embed/9169-metal-slug-6-metal-slug-3-bootleg-bootleg.html",
    },
    {
      img: "kof-98.jpg",
      name: "The King of Fighters 98",
      url:
        "https://www.retrogames.cc/embed/34551-the-king-of-fighters-98-the-slugfest-king-of-figh.html",
    },
    {
      img: "jackie-chan-ps1.jpg",
      name: "Jackie Chan",
      url: "https://www.retrogames.cc/embed/41909-jackie-chan-stuntmaster.html",
    },
    {
      img: "tony-hawks-pro-skater-3.jpg",
      name: "Tony Hawks Pro Skater",
      url:
        "https://www.retrogames.cc/embed/32454-tony-hawk-s-pro-skater-3-usa.html",
    },
  ];
  const plugins = [
    "https://cdnjs.cloudflare.com/ajax/libs/flickity/2.2.1/flickity.pkgd.min.js",
  ];

  App.createGallery(games)
    .then(function () {
      return App.loadPlugins(plugins);
    })
    .then(function () {
      App.bindPlayButtonEvent();
    });
};

const App = {
  createGallery: function (games) {
    const $galleryElement = document.getElementById("gallery"),
      assetsPath = "assets/img/";
    let galleryValue = "",
      div = document.createElement("div");

    games.forEach(function (game) {
      galleryValue += App.getGalleryItemTemplate()
        .replace("{url}", game.url)
        .replace("{name}", game.name)
        .replace("{img}", assetsPath + game.img);
    });

    div.innerHTML = galleryValue;
    while (div.children.length > 0) {
      $galleryElement.appendChild(div.children[0]);
    }

    return new Promise((resolve) => resolve());
  },
  getGalleryItemTemplate: function () {
    return `<div class="gallery-cell" style="background-image: url({img});background-repeat: no-repeat;background-position: center;background-size: cover;"><span class="game-name">{name}</span><a class="play-game" href="{url}">Jogar</a></div>`;
  },
  bindPlayButtonEvent: function () {
    const $playButtons = document.querySelectorAll(".play-game");
    const $screen = document.querySelector("iframe");
    const $fakeScreen = document.querySelector("#screen .fake-screen");
    $playButtons.forEach(($play) => {
      $play.addEventListener("click", (event) => {
        event.preventDefault();
        let game = event.target;
        $screen.setAttribute("src", game.getAttribute("href"));
        window.location.hash = "#screen";
        if ($screen.classList.contains("hidden")) {
          $screen.classList.remove("hidden");
          $fakeScreen.classList.add("hidden");
        }
      });
    });
  },
  loadPlugins: function (plugins) {
    plugins.forEach(function (plugin) {
      let newPlugin = document.createElement("script");
      newPlugin.type = "text/javascript";
      newPlugin.async = true;
      newPlugin.src = plugin;
      (
        document.querySelectorAll("head")[0] ||
        document.querySelectorAll("body")[0]
      ).appendChild(newPlugin);
    });
    return new Promise((resolve) => resolve());
  },
};
