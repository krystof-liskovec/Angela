var UI = {
  inMenu: true,
  currentMenu: 0,
  inicialize: function () {
    this.globalCustomAlpha = 0;
    this.globalCustomAlphaCheck = false;
    this.mainMenu_sprite0 = {
      width: Math.round(353 * screenratio),
      height: Math.round(184 * screenratio),
      widthOnPic: 353,
      heightOnPic: 184,
      x: Math.round(canvas.width / 2 - 176 * screenratio),
      y: Math.round(canvas.height / 2 - 400 * screenratio),
      sprite: sprite.UI_logo,
      opacity: 1,
      color: ["grey", "black", "white"],
      animationX: 0,
      animationY: 0,
      timeIndex: 15,
      animation: function () {
        this.timeIndex++;
        if (this.timeIndex == 300) {
          this.timeIndex = 0;
        }
        if (this.timeIndex < 15) {
          this.animationX = (Math.floor(this.timeIndex / 2) + 1) * this.widthOnPic;
        } else {
          this.animationX = 0;
        }
      },
    };
    this.mainMenu_b0 = {
      width: 300 * screenratio,
      height: 50 * screenratio,
      x: canvas.width / 2 - 150 * screenratio,
      y: canvas.height / 2 - 150 * screenratio,
      text: "NEW GAME",
      textSize: 30 * screenratio,
      button: "NEW GAME",
      opacity: 1,
      color: ["grey", "black", "white"],
    };
    this.mainMenu_b1 = {
      width: 300 * screenratio,
      height: 50 * screenratio,
      x: canvas.width / 2 - 150 * screenratio,
      y: canvas.height / 2 - 80 * screenratio,
      text: "CONTINUE",
      textSize: 30 * screenratio,
      button: "CONTINUE",
      opacity: 0.5,
      color: ["grey", "black", "white"],
    };
    this.mainMenu_b2 = {
      width: 300 * screenratio,
      height: 50 * screenratio,
      x: canvas.width / 2 - 150 * screenratio,
      y: canvas.height / 2 - 10 * screenratio,
      text: "OPTIONS",
      textSize: 30 * screenratio,
      button: "OPTIONS",
      opacity: 1,
      color: ["grey", "black", "white"],
    };
    this.mainMenu = [
      this.mainMenu_b0,
      this.mainMenu_b1,
      this.mainMenu_b2,
      this.mainMenu_sprite0,
    ];
    this.optionsMenu_box0 = {
      width: 300 * screenratio,
      height: 70 * screenratio,
      x: canvas.width / 2 - 150 * screenratio,
      y: canvas.height / 2 - 170 * screenratio,
      textSize: 30 * screenratio,
      opacity: 1,
      color: ["grey", "black", "white"],
    };
    this.optionsMenu_box1 = {
      width: 300 * screenratio,
      height: 70 * screenratio,
      x: canvas.width / 2 - 150 * screenratio,
      y: canvas.height / 2 - 87 * screenratio,
      textSize: 30 * screenratio,
      opacity: 1,
      color: ["grey", "black", "white"],
    };
    this.optionsMenu_t0 = {
      width: 0 * screenratio,
      height: 0 * screenratio,
      x: canvas.width / 2 - 50 * screenratio,
      y: canvas.height / 2 - 130 * screenratio,
      text: "SOUND:",
      textSize: 30 * screenratio,
      opacity: 1,
      color: ["grey", "black", "white"],
    };
    this.optionsMenu_t1 = {
      width: 0 * screenratio,
      height: 0 * screenratio,
      x: canvas.width / 2 - 50 * screenratio,
      y: canvas.height / 2 - 50 * screenratio,
      text: "MUSIC:",
      textSize: 30 * screenratio,
      opacity: 1,
      color: ["grey", "black", "white"],
    };
    this.optionsMenu_t2 = {
      width: 0 * screenratio,
      height: 0 * screenratio,
      x: canvas.width / 2 + 50 * screenratio,
      y: canvas.height / 2 - 130 * screenratio,
      text: playerData.soundMultiplier,
      textSize: 30 * screenratio,
      opacity: 1,
      color: ["grey", "black", "white"],
    };
    this.optionsMenu_t3 = {
      width: 0 * screenratio,
      height: 0 * screenratio,
      x: canvas.width / 2 + 50 * screenratio,
      y: canvas.height / 2 - 50 * screenratio,
      text: playerData.musicMultiplier,
      textSize: 30 * screenratio,
      opacity: 1,
      color: ["grey", "black", "white"],
    };
    this.optionsMenu_b0 = {
      width: 25 * screenratio,
      height: 25 * screenratio,
      x: canvas.width / 2 + 100 * screenratio,
      y: canvas.height / 2 - 165 * screenratio,
      text: "🡅",
      button: "sound",
      textSize: 20 * screenratio,
      opacity: 1,
      color: ["grey", "black", "white"],
    };
    this.optionsMenu_b1 = {
      width: 25 * screenratio,
      height: 25 * screenratio,
      x: canvas.width / 2 + 100 * screenratio,
      y: canvas.height / 2 - 130 * screenratio,
      text: "🡇",
      button: "sound",
      textSize: 20 * screenratio,
      opacity: 1,
      color: ["grey", "black", "white"],
    };
    this.optionsMenu_b2 = {
      width: 25 * screenratio,
      height: 25 * screenratio,
      x: canvas.width / 2 + 100 * screenratio,
      y: canvas.height / 2 - 82 * screenratio,
      text: "🡅",
      button: "music",
      textSize: 20 * screenratio,
      opacity: 1,
      color: ["grey", "black", "white"],
    };
    this.optionsMenu_b3 = {
      width: 25 * screenratio,
      height: 25 * screenratio,
      x: canvas.width / 2 + 100 * screenratio,
      y: canvas.height / 2 - 47 * screenratio,
      text: "🡇",
      button: "music",
      textSize: 20 * screenratio,
      opacity: 1,
      color: ["grey", "black", "white"],
    };
    this.optionsMenu_b4 = {
      width: 300 * screenratio,
      height: 50 * screenratio,
      x: canvas.width / 2 - 150 * screenratio,
      y: canvas.height / 2 + 5 * screenratio,
      text: document.fullscreen ? "FULLSCREEN" : "WINDOWED",
      button: "DISPLAYMODE",
      textSize: 30 * screenratio,
      opacity: 1,
      color: ["grey", "black", "white"],
    };
    this.optionsMenu_b5 = {
      width: 300 * screenratio,
      height: 50 * screenratio,
      x: canvas.width / 2 - 150 * screenratio,
      y: canvas.height / 2 + 80 * screenratio,
      text: keyboardControler.active ? "KEYBOARD + MOUSE" : "MOUSE ONLY",
      button: "CONTROLS",
      textSize: 20 * screenratio,
      opacity: 1,
      color: ["grey", "black", "white"],
    };
    this.optionsMenu_b6 = {
      width: 250 * screenratio,
      height: 50 * screenratio,
      x: canvas.width / 2 - 125 * screenratio,
      y: canvas.height / 2 + 155 * screenratio,
      text: "BACK",
      button: "BACK",
      textSize: 30 * screenratio,
      opacity: 1,
      color: ["grey", "black", "white"],
    };
    this.optionsMenu = [
      this.optionsMenu_box0,
      this.optionsMenu_box1,
      this.optionsMenu_t0,
      this.optionsMenu_t1,
      this.optionsMenu_t2,
      this.optionsMenu_t3,
      this.optionsMenu_b0,
      this.optionsMenu_b1,
      this.optionsMenu_b2,
      this.optionsMenu_b3,
      this.optionsMenu_b4,
      this.optionsMenu_b5,
      this.optionsMenu_b6,
    ];

    this.gameOverMenuWindow = {
      width: 550 * screenratio,
      height: 250 * screenratio,
      x: canvas.width / 2 - 275 * screenratio,
      y: canvas.height / 2 - 150 * screenratio,
      text: "GAME OVER",
      textSize: 30 * screenratio,
      opacity: 1,
      color: ["#4C4C4C", "black", "white"],
    };
    this.gameOverMenu_b0 = {
      width: 250 * screenratio,
      height: 50 * screenratio,
      x: canvas.width / 2 - 265 * screenratio,
      y: canvas.height / 2 + 40 * screenratio,
      text: "RETRY",
      textSize: 30 * screenratio,
      button: "RETRY",
      opacity: 1,
      color: ["grey", "black", "white"],
    };
    this.gameOverMenu_b1 = {
      width: 250 * screenratio,
      height: 50 * screenratio,
      x: canvas.width / 2 + 15 * screenratio,
      y: canvas.height / 2 + 40 * screenratio,
      text: "MENU",
      textSize: 30 * screenratio,
      button: "BACKTOMENU",
      opacity: 1,
      color: ["grey", "black", "white"],
    };
    this.gameOverMenu = [this.gameOverMenuWindow, this.gameOverMenu_b0, this.gameOverMenu_b1];

    this.creditsMenu_sprite0 = {
      width: 600 * screenratio,
      height: 370 * screenratio,
      widthOnPic: 600,
      heightOnPic: 370,
      x: canvas.width / 2 - 300 * screenratio,
      y: canvas.height / 2 - 250 * screenratio,
      sprite: sprite.UI_credits,
      opacity: 1,
      color: ["grey", "black", "white"],
      animationX: 0,
      animationY: 0,
    };
    this.creditsMenu_b0 = {
      width: 250 * screenratio,
      height: 50 * screenratio,
      x: canvas.width / 2 - 125 * screenratio,
      y: canvas.height / 2 + 140 * screenratio,
      text: "MENU",
      textSize: 30 * screenratio,
      button: "BACKTOMENU",
      opacity: 1,
      color: ["grey", "black", "white"],
    };
    this.creditsMenu_b1 = {
      width: 250 * screenratio,
      height: 22 * screenratio,
      x: canvas.width / 2 - 240 * screenratio,
      y: canvas.height / 2 - 10 * screenratio,
      text: "",
      textSize: 30 * screenratio,
      button: "incompetech",
      opacity: 0.1,
      color: ["grey", "black", "white"],
    };
    this.creditsMenu_b2 = {
      width: 410 * screenratio,
      height: 22 * screenratio,
      x: canvas.width / 2 - 240 * screenratio,
      y: canvas.height / 2 + 37 * screenratio,
      text: "",
      textSize: 30 * screenratio,
      button: "license",
      opacity: 0.1,
      color: ["grey", "black", "white"],
    };
    this.creditsMenu = [
      this.creditsMenu_sprite0,
      this.creditsMenu_b0,
      this.creditsMenu_b1,
      this.creditsMenu_b2,
    ];

    this.pauseMenuWindow = {
      width: 550 * screenratio,
      height: 250 * screenratio,
      x: canvas.width / 2 - 275 * screenratio,
      y: canvas.height / 2 - 150 * screenratio,
      text: "GAME PAUSED.",
      textSize: 30 * screenratio,
      opacity: 1,
      color: ["#4C4C4C", "black", "white"],
    };
    this.pauseMenu_b0 = {
      width: 250 * screenratio,
      height: 50 * screenratio,
      x: canvas.width / 2 - 265 * screenratio,
      y: canvas.height / 2 + 40 * screenratio,
      text: "MENU",
      textSize: 30 * screenratio,
      button: "BACKTOMENU",
      opacity: 1,
      color: ["grey", "black", "white"],
    };

    this.pauseMenu_b1 = {
      width: 250 * screenratio,
      height: 50 * screenratio,
      x: canvas.width / 2 + 15 * screenratio,
      y: canvas.height / 2 + 40 * screenratio,
      text: "RESUME",
      textSize: 30 * screenratio,
      button: "RESUME",
      opacity: 1,
      color: ["grey", "black", "white"],
    };
    this.pauseMenu = [this.pauseMenuWindow, this.pauseMenu_b0, this.pauseMenu_b1];
    this.beforeTheBossMenuTimer = 0;

    this.beforeTheBossMenu_b1 = {
      width: 320 * screenratio,
      height: 50 * screenratio,
      x: canvas.width / 2 - 315 * screenratio,
      y: canvas.height / 2 + 40 * screenratio,
      text: "HELP ANGELA",
      textSize: 30 * screenratio,
      button: "NO",
      opacity: 1,
      color: ["grey", "black", "white"],
    };

    this.beforeTheBossMenu_b2 = {
      width: 320 * screenratio,
      height: 50 * screenratio,
      x: canvas.width / 2 + 65 * screenratio,
      y: canvas.height / 2 + 40 * screenratio,
      text: "DEFEAT ANGELA",
      textSize: 30 * screenratio,
      button: "YES",
      opacity: 1,
      color: ["grey", "black", "white"],
    };
    this.beforeTheBossMenu = [this.beforeTheBossMenu_b1, this.beforeTheBossMenu_b2];

    this.judgementEnding_sprite0 = {
      width: 750 * screenratio,
      height: 955 * screenratio,
      widthOnPic: 750,
      heightOnPic: 955,
      x: canvas.width / 2 - 375 * screenratio,
      y: canvas.height / 2 - 477 * screenratio,
      sprite: sprite.UI_judgementending,
      opacity: 1,
      color: ["grey", "black", "white"],
      animationX: 0,
      animationY: 0,
    };
    this.judgementEnding_b0 = {
      width: 320 * screenratio,
      height: 50 * screenratio,
      x: canvas.width / 2 - 160 * screenratio,
      y: canvas.height / 2 + 400 * screenratio,
      text: "CREDITS",
      textSize: 30 * screenratio,
      button: "CREDITS",
      opacity: 1,
      color: ["grey", "black", "white"],
    };
    this.judgementEnding_b1 = {
      width: 115 * screenratio,
      height: 40 * screenratio,
      x: canvas.width / 2 - 135 * screenratio,
      y: canvas.height / 2 - 220 * screenratio,
      text: "",
      textSize: 30 * screenratio,
      button: "SECRET_1",
      opacity: 0.05,
      color: ["grey", "black", "white"],
    };

    this.judgementEndingMenu = [
      this.judgementEnding_sprite0,
      this.judgementEnding_b0,
      this.judgementEnding_b1,
    ];

    this.revengeEnding_sprite0 = {
      width: 750 * screenratio,
      height: 955 * screenratio,
      widthOnPic: 750,
      heightOnPic: 955,
      x: canvas.width / 2 - 375 * screenratio,
      y: canvas.height / 2 - 500 * screenratio,
      sprite: sprite.UI_revengeending,
      opacity: 1,
      color: ["grey", "black", "white"],
      animationX: 0,
      animationY: 0,
    };
    this.revengeEnding_b0 = {
      width: 320 * screenratio,
      height: 50 * screenratio,
      x: canvas.width / 2 - 160 * screenratio,
      y: canvas.height / 2 + 400 * screenratio,
      text: "CREDITS",
      textSize: 30 * screenratio,
      button: "CREDITS",
      opacity: 1,
      color: ["grey", "black", "white"],
    };
    this.revengeEnding_b1 = {
      width: 100 * screenratio,
      height: 40 * screenratio,
      x: canvas.width / 2 - 320 * screenratio,
      y: canvas.height / 2 + 110 * screenratio,
      text: "",
      textSize: 30 * screenratio,
      button: "SECRET_2",
      opacity: 0.1,
      color: ["grey", "black", "white"],
    };
    this.revengeEndingMenu = [
      this.revengeEnding_sprite0,
      this.revengeEnding_b0,
      this.revengeEnding_b1,
    ];

    this.tutorial_b0 = {
      width: 320 * screenratio,
      height: 50 * screenratio,
      x: canvas.width / 2 - 160 * screenratio,
      y: canvas.height / 2 + 300 * screenratio,
      text: "NEXT",
      textSize: 30 * screenratio,
      button: "NEXT",
      opacity: 1,
      color: ["grey", "black", "white"],
    };

    this.tutorial_t0 = {
      width: 0 * screenratio,
      height: 0 * screenratio,
      x: canvas.width / 2,
      y: canvas.height / 2 - 378 * screenratio,
      text: "Movement",
      textSize: 30 * screenratio,
      opacity: 1,
      color: ["grey", "black", "white"],
    };

    this.tutorial_sprite0 = {
      width: 870 * screenratio,
      height: 590 * screenratio,
      widthOnPic: 870,
      heightOnPic: 590,
      x: canvas.width / 2 - 435 * screenratio,
      y: canvas.height / 2 - 350 * screenratio,
      sprite: sprite.UI_tutorial,
      opacity: 1,
      color: ["grey", "black", "white"],
      animationX: 0,
      animationY: 0,
    };

    this.tutorialHandler = {
      index: 0,
      text: ["Movement", "Enemies", "Weapon acquisition"],
    };

    this.tutorialMenu = [this.tutorial_b0, this.tutorial_sprite0, this.tutorial_t0];

    this.levelDisplay = {
      x: canvas.width / 2,
      y: 300 * screenratio,
      textSize: 120 * screenratio,
      opacity: 0,
      color: "white",
    };
    this.levelDisplayCheck = false;
    this.UIColors = {
      fill: "grey",
      stroke: "#333333",
      fontFill: "white",
      fontStroke: "black",
      hoverFill: "#5C7CFF",
      hoverStroke: "#B2B5FF",
      hoverFontFill: "white",
      hoverFontStroke: "#B2B5FF",
      selectedFill: "grey",
      selectedStroke: "white",
      selectedFontFill: "white",
      selectedFontStroke: "red",
      sliderFill: "#40FF40",
      sliderStroke: "#414141",
    };
    //Gameplay UI
    this.HPbar_player = { color: "" };
    this.HPbar_earth = { color: "" };
    this.HPpanel = {
      width: 260 * screenratio,
      height: 96 * screenratio,
      x: canvas.width - 260 * screenratio,
      y: 0,
      sprite: sprite.UI_HPpanel,
    };

    this.dangerLight_0 = {
      //Earth_hp
      width: 10 * screenratio,
      height: 10 * screenratio,
      x: canvas.width - 20 * screenratio,
      y: 20 * screenratio,
    };
    this.dangerLight_1 = {
      //Player_hp
      width: 10 * screenratio,
      height: 10 * screenratio,
      x: canvas.width - 20 * screenratio,
      y: 50 * screenratio,
    };

    this.duration_panel = {
      width: 240 * screenratio,
      height: 55 * screenratio,
      x: canvas.width - 240 * screenratio,
      y: canvas.height - 55 * screenratio,
      sprite: sprite.UI_durationPanel,
    };

    this.minimapLayer = {
      width: 206 * screenratio,
      height: 206 * screenratio,
      x: -3 * screenratio,
      y: -3 * screenratio,
      lineWidth: 6 * screenratio,
      color: ["#686C70", "#1D1D1D"],
    };
    this.menuList = [
      this.mainMenu,
      this.optionsMenu,
      this.gameOverMenu,
      this.creditsMenu,
      this.pauseMenu,
      this.beforeTheBossMenu,
      this.judgementEndingMenu,
      this.revengeEndingMenu,
      this.tutorialMenu,
    ];
    this.cursorIndex = 0;
  },
  menu_render: function () {
    let menuArray = this.menuList[this.currentMenu];
    this.hover();
    if (this.currentMenu == 5) this.beforeTheBossMenuTimer++;
    if (playerData.level > 0) {
      this.mainMenu_b1.opacity = 1;
    } else {
      this.mainMenu_b1.opacity = 0.5;
    }
    menuArray.forEach((element) => {
      if (this.currentMenu != 5 || this.beforeTheBossMenuTimer > 5290) {
        ctx.fillStyle = element.color[0];
        ctx.strokeStyle = element.color[1];
        if (element.textSize != undefined) ctx.lineWidth = 6 * screenratio;
        if (this.globalCustomAlphaCheck && element.opacity > this.globalCustomAlpha)
          ctx.globalAlpha = this.globalCustomAlpha;
        else ctx.globalAlpha = element.opacity;

        if (element.sprite == undefined && element.textOnly == undefined) {
          ctx.strokeRect(element.x, element.y, element.width, element.height);
          ctx.fillRect(element.x, element.y, element.width, element.height);
        }
        ctx.fillStyle = element.color[2];
        if (element.text != undefined) {
          ctx.font = element.textSize + "px FFFFORWA";
          ctx.textAlign = "center";
          ctx.strokeText(
            element.text,
            element.x + element.width / 2,
            element.y + element.height / 2 + element.textSize / 2 + element.height / 14
          );
          ctx.fillText(
            element.text,
            element.x + element.width / 2,
            element.y + element.height / 2 + element.textSize / 2 + element.height / 14
          ); //text on screen
        }
        if (element.sprite != undefined) {
          if (element.button == undefined) {
            if (element.animation != undefined) element.animation();
            ctx.drawImage(
              element.sprite,
              element.animationX,
              element.animationY,
              element.widthOnPic,
              element.heightOnPic,
              element.x,
              element.y,
              element.width,
              element.height
            );
          }
        }
      }
    });
  },
  game_render: function () {
    //UI
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#0A0A0A";
    ctx.fillRect(
      canvas.width - 210 * screenratio,
      20 * screenratio,
      190 * screenratio,
      50 * screenratio
    );

    let x2_player = parseInt((player.HP[1] / player.maxHP[1]) * 255).toString(16);
    if (x2_player.length == 1) x2_player = "0" + x2_player;
    this.HPbar_player.color = "#F1" + x2_player + x2_player;

    let x2_earth = parseInt((player.HP[0] / player.maxHP[0]) * 255).toString(16);
    if (x2_earth.length == 1) x2_player = "0" + x2_earth;
    this.HPbar_earth.color = "#F1" + x2_earth + x2_earth;

    ctx.fillStyle = this.HPbar_player.color;
    ctx.fillRect(
      canvas.width - 155 * screenratio,
      51 * screenratio,
      (player.HP[1] / player.maxHP[1]) *
        ((player.maxHP[1] * 120) / (player.maxHP[1] + player.maxShield[1])) *
        screenratio,
      16 * screenratio
    );
    ctx.fillStyle = "#5C7CFF";
    ctx.fillRect(
      canvas.width -
        155 * screenratio +
        (player.HP[1] / player.maxHP[1]) *
          ((player.maxHP[1] * 120) / (player.maxHP[1] + player.maxShield[1])) *
          screenratio,
      51 * screenratio,
      (player.shield[1] / player.maxShield[1]) *
        ((player.maxShield[1] * 120) / (player.maxHP[1] + player.maxShield[1])) *
        screenratio,
      16 * screenratio
    );

    ctx.fillStyle = this.HPbar_earth.color;
    ctx.fillRect(
      canvas.width - 195 * screenratio,
      21 * screenratio,
      (player.HP[0] / player.maxHP[0]) *
        ((player.maxHP[0] * 160) / (player.maxHP[0] + player.maxShield[0])) *
        screenratio,
      16 * screenratio
    );
    ctx.fillStyle = "#5C7CFF";
    ctx.fillRect(
      canvas.width -
        195 * screenratio +
        (player.HP[0] / player.maxHP[0]) *
          ((player.maxHP[0] * 160) / (player.maxHP[0] + player.maxShield[0])) *
          screenratio,
      21 * screenratio,
      (player.shield[0] / player.maxShield[0]) *
        ((player.maxShield[0] * 160) / (player.maxHP[0] + player.maxShield[0])) *
        screenratio,
      16 * screenratio
    );

    //Panels
    if (player.weapon.name != "BASIC") {
      ctx.fillStyle = "black";
      ctx.fillRect(
        canvas.width - 155 * screenratio,
        canvas.height - 30 * screenratio,
        120 * screenratio,
        20 * screenratio
      );
      ctx.fillStyle = "#5C7CFF";
      ctx.fillRect(
        canvas.width - 155 * screenratio,
        canvas.height - 25 * screenratio,
        (player.weaponDuration / player.weapon.duration) * 120 * screenratio,
        15 * screenratio
      );
      ctx.drawImage(
        this.duration_panel.sprite,
        this.duration_panel.x,
        this.duration_panel.y,
        this.duration_panel.width,
        this.duration_panel.height
      );
    }
    if (playerData.level < 12) {
      ctx.drawImage(
        this.HPpanel.sprite,
        this.HPpanel.x,
        this.HPpanel.y,
        this.HPpanel.width,
        this.HPpanel.height
      );
    } else {
      ctx.drawImage(
        sprite.UI_HPpanelError,
        this.HPpanel.x,
        this.HPpanel.y,
        this.HPpanel.width,
        this.HPpanel.height
      );
    }
    ctx.font = 13 * screenratio + "px FFFFORWA";
    ctx.strokeStyle = "#5C7CFF";
    ctx.fillStyle = "white";
    ctx.fillText(player.playerLives + "x", canvas.width - 195 * screenratio, 67 * screenratio);
    if (UI.levelDisplayCheck) {
      ctx.globalAlpha = UI.levelDisplay.opacity;
      ctx.textAlign = "center";
      ctx.font = UI.levelDisplay.textSize + "px FFFFORWA";
      ctx.strokeStyle = "black";
      ctx.strokeText(UI.levelDisplay.text, UI.levelDisplay.x, UI.levelDisplay.y);
      ctx.fillStyle = UI.levelDisplay.color;
      ctx.fillText(UI.levelDisplay.text, UI.levelDisplay.x, UI.levelDisplay.y); //text on screen
      ctx.globalAlpha = 1;
    }
    ctx.globalAlpha = 1;
    ctx.drawImage(
      sprite.UI_motherboardMap,
      this.minimapLayer.x,
      this.minimapLayer.y,
      this.minimapLayer.width,
      this.minimapLayer.height
    );
    ctx.fillStyle = "red";
    enemyList.forEach((e) => {
      if (!e.deathAnimation && !e.killed) {
        ctx.save();
        ctx.translate(
          e.coordX / (player.defaultSpaceSize / (200 * screenratio)),
          e.coordY / (player.defaultSpaceSize / (200 * screenratio))
        );
        ctx.rotate(e.angle);
        ctx.drawImage(e.minimapIcon, -3.5, -3.5, 7, 7);
      }
      ctx.restore();
    });

    ctx.fillStyle = "#DCE6EE";
    ctx.strokeStyle = "#5C7CFF";
    ctx.lineWidth = 1;
    ctx.moveTo(3, player.coordY / (player.defaultSpaceSize / (200 * screenratio)));
    ctx.lineTo(
      200 * screenratio,
      player.coordY / (player.defaultSpaceSize / (200 * screenratio))
    );

    ctx.moveTo(player.coordX / (player.defaultSpaceSize / (200 * screenratio)), 3);
    ctx.lineTo(
      player.coordX / (player.defaultSpaceSize / (200 * screenratio)),
      200 * screenratio
    );
    ctx.stroke();
    ctx.fillRect(
      player.coordX / (player.defaultSpaceSize / (200 * screenratio)) - 2.5,
      player.coordY / (player.defaultSpaceSize / (200 * screenratio)) - 2.5,
      5,
      5
    );
    ctx.strokeStyle = this.minimapLayer.color[1];
    ctx.lineWidth = this.minimapLayer.lineWidth * screenratio;
    ctx.strokeRect(
      this.minimapLayer.x,
      this.minimapLayer.y,
      this.minimapLayer.width,
      this.minimapLayer.height
    );
    if (player.inWeaponActivation) {
      weaponActivation.render_update();
    }
    dialogueHandler();
    if (dialogueList.length > 0) {
      if (
        dialogueList[0].color == "white" ||
        ((dialogueList[0].color == "#adadad" || dialogueList[0].color == "cyan") &&
          playerData.level < 12)
      )
        backgroundParticles.angelaDialogueBubble.visible = true;
      else backgroundParticles.angelaDialogueBubble.visible = false;
      gameAudio.changeVolumeOfMusic(0.01);
      let nextDialogue = true;
      dialogueList.forEach((el) => {
        if (!Dialogue.stopDialogues) el.update_render();
        if (el.ttl > 0) {
          nextDialogue = false;
        }
      });
      if (nextDialogue) dialogueList = [];
    } else {
      backgroundParticles.angelaDialogueBubble.visible = false;
      gameAudio.changeVolumeOfMusic(0.03);
    }
    //cursor
    this.cursorIndex +=
      0.001 *
        Math.sqrt(Math.pow(player.accelerationX, 2) + Math.pow(player.accelerationY, 2)) +
      0.02;
    ctx.globalAlpha = 1;
    ctx.save();
    ctx.translate(xMousePos, yMousePos);
    ctx.rotate(this.cursorIndex);
    if (leftMouseDown) ctx.drawImage(sprite.UI_cursorFire, -30, -30, 60, 60);
    else ctx.drawImage(sprite.UI_cursorNoFire, -30, -30, 60, 60);
    ctx.restore();
    if (this.cursorIndex == 6) {
      this.cursorIndex = 0;
    }
  },
  click: function () {
    if (!this.globalCustomAlphaCheck) {
      if (this.currentMenu == 0 && this.inMenu) {
        this.mainMenu.forEach((index) => {
          if (
            collides_UI(index, {
              x: xMousePos,
              y: yMousePos,
              width: 1,
              height: 1,
            }) &&
            index.button != undefined
          ) {
            gameAudio.playSound("click");
            if (index.button == "NEW GAME") {
              let reset = askAboutReset();
              if (reset) {
                hideMenuLinks();
                this.tutorialHandler.index = 0;
                this.tutorial_sprite0.animationX = 0;
                if (!playerData.keyboardControl) this.tutorial_sprite0.animationY = 590;
                this.tutorial_b0.text = "NEXT";
                this.getMenuEffect(8);
              }
            } else if (index.button == "CONTINUE") {
              if (playerData.level > 0) {
                this.closeMenuEffect(startTheGame);
              }
            } else if (index.button == "OPTIONS") {
              this.getMenuEffect(1);
            }
          }
        });
      } else if (this.currentMenu == 1 && this.inMenu) {
        this.optionsMenu.forEach((index) => {
          if (
            collides_UI(index, {
              x: xMousePos,
              y: yMousePos,
              width: 1,
              height: 1,
            }) &&
            index.button != undefined
          ) {
            if (index.button == "BACK") {
              gameAudio.playSound("click");
              this.getMenuEffect(0);
            } else if (index.button == "CONTROLS") {
              gameAudio.playSound("click");
              keyboardControler.active = !keyboardControler.active;
              playerData.keyboardControl = !playerData.keyboardControl;
              saveLocalStorage();
              index.text = keyboardControler.active ? "KEYBOARD + MOUSE" : "MOUSE ONLY";
            } else if (index.button == "DISPLAYMODE") {
              gameAudio.playSound("click");
              if (!document.fullscreen) {
                canvas.requestFullscreen().catch((err) => {
                  console.log(err);
                });
              } else {
                document.exitFullscreen();
              }
            } else if (index.button == "sound") {
              if (index.text == "🡅" && playerData.soundMultiplier < 10) {
                playerData.soundMultiplier++;
              } else if (index.text == "🡇" && playerData.soundMultiplier > 0) {
                playerData.soundMultiplier--;
              }
              gameAudio.setVolume();
              gameAudio.playSound("player_BASIC");
              this.optionsMenu_t2.text = playerData.soundMultiplier;
            } else if (index.button == "music") {
              if (index.text == "🡅" && playerData.musicMultiplier < 10) {
                playerData.musicMultiplier++;
                gameAudio.changeVolumeOfMusic(0.03);
              } else if (index.text == "🡇" && playerData.musicMultiplier > 0) {
                playerData.musicMultiplier--;
                gameAudio.changeVolumeOfMusic(0.03);
              }
              this.optionsMenu_t3.text = playerData.musicMultiplier;
            }
            saveLocalStorage();
          }
        });
      } else if (this.currentMenu == 2 && this.inMenu) {
        this.gameOverMenu.forEach((index) => {
          if (
            collides_UI(index, {
              x: xMousePos,
              y: yMousePos,
              width: 1,
              height: 1,
            }) &&
            index.button != undefined
          ) {
            gameAudio.playSound("click");
            if (index.button == "BACKTOMENU") {
              showMenuLinks();
              gameAudio.playMusic("music_menu");
              this.getMenuEffect(0);
            } else if (index.button == "RETRY") {
              this.closeMenuEffect(startTheGame);
            }
          }
        });
      } else if (this.currentMenu == 3 && this.inMenu) {
        this.creditsMenu.forEach((index) => {
          if (
            collides_UI(index, {
              x: xMousePos,
              y: yMousePos,
              width: 1,
              height: 1,
            }) &&
            index.button != undefined
          ) {
            gameAudio.playSound("click");
            if (index.button == "BACKTOMENU") {
              gameAudio.playMusic("music_menu");
              this.getMenuEffect(0);
            } else if (index.button == "incompetech") {
              window.open(`https://incompetech.com/`);
            } else if (index.button == "license") {
              window.open(`http://creativecommons.org/licenses/by/3.0/`);
            }
          }
        });
      } else if (this.currentMenu == 4 && this.inMenu) {
        this.pauseMenu.forEach((index) => {
          if (
            collides_UI(index, {
              x: xMousePos,
              y: yMousePos,
              width: 1,
              height: 1,
            }) &&
            index.button != undefined
          ) {
            gameAudio.playSound("click");
            if (index.button == "BACKTOMENU") {
              this.getMenuEffect(0);
              gameAudio.playMusic("music_menu");
              showMenuLinks();
              player.inWeaponActivation = false;
              player.inicialize(0, 50);
              camera.inicialize();
              background.inicialize();
              backgroundParticles.inicialize();
            } else if (index.button == "RESUME") {
              gameAudio.resumeMusic();
              canvas.style.cursor = "none";
              this.closeMenuEffect(closeMenu);
            }
          }
        });
      } else if (this.currentMenu == 5 && this.inMenu) {
        this.beforeTheBossMenu.forEach((index) => {
          if (
            collides_UI(index, {
              x: xMousePos,
              y: yMousePos,
              width: 1,
              height: 1,
            }) &&
            index.button != undefined
          ) {
            gameAudio.playSound("click");
            if (index.button == "NO") {
              playerData.level += 2;
              this.closeMenuEffect(startTheGame);
            } else if (index.button == "YES") {
              playerData.level += 1;
              this.closeMenuEffect(startTheGame);
            }
          }
        });
      } else if (this.currentMenu == 6 && this.inMenu) {
        this.judgementEndingMenu.forEach((index) => {
          if (
            collides_UI(index, {
              x: xMousePos,
              y: yMousePos,
              width: 1,
              height: 1,
            }) &&
            index.button != undefined
          ) {
            gameAudio.playSound("click");
            if (index.button == "CREDITS") {
              showMenuLinks();
              this.getMenuEffect(3);
            } else if (index.button == "SECRET_1") {
              window.open(`${window.location.href}sprites/enemy/angelaPhase1/chatlog_1.log`);
            }
          }
        });
      } else if (this.currentMenu == 7 && this.inMenu) {
        this.revengeEndingMenu.forEach((index) => {
          if (
            collides_UI(index, {
              x: xMousePos,
              y: yMousePos,
              width: 1,
              height: 1,
            }) &&
            index.button != undefined
          ) {
            gameAudio.playSound("click");
            if (index.button == "CREDITS") {
              showMenuLinks();
              this.getMenuEffect(3);
            } else if (index.button == "SECRET_2") {
              window.open(`${window.location.href}sprites/enemy/angelaPhase2/chatlog_2.log`);
            }
          }
        });
      } else if (this.currentMenu == 8 && this.inMenu) {
        this.tutorialMenu.forEach((index) => {
          if (
            collides_UI(index, {
              x: xMousePos,
              y: yMousePos,
              width: 1,
              height: 1,
            }) &&
            index.button != undefined
          ) {
            gameAudio.playSound("click");
            if (index.button == "NEXT") {
              if (this.tutorialHandler.index < 2) {
                this.tutorialHandler.index++;
                this.tutorial_sprite0.animationY = 0;
                this.tutorial_sprite0.animationX += 870;
                this.tutorial_t0.text = this.tutorialHandler.text[this.tutorialHandler.index];
                if (this.tutorialHandler.index == 2) {
                  index.text = "START";
                }
              } else {
                this.closeMenuEffect(startTheGame);
              }
            }
          }
        });
      }
    }
  },
  hover: function () {
    let hovered = false;
    if (this.currentMenu == 0) {
      this.mainMenu.forEach((index) => {
        if (
          collides_UI(index, {
            x: xMousePos,
            y: yMousePos,
            width: 1,
            height: 1,
          }) &&
          index.button != undefined
        ) {
          if (index.button == "CONTINUE" && playerData.level > 0) {
            hovered = true;
            index.color[0] = this.UIColors.hoverFill;
            index.color[1] = this.UIColors.hoverStroke;
            index.color[2] = this.UIColors.hoverFontFill;
          } else if (index.button != "CONTINUE") {
            hovered = true;
            index.color[0] = this.UIColors.hoverFill;
            index.color[1] = this.UIColors.hoverStroke;
            index.color[2] = this.UIColors.hoverFontFill;
          }
        } else {
          index.color[0] = this.UIColors.fill;
          index.color[1] = this.UIColors.stroke;
          index.color[2] = this.UIColors.fontFill;
        }
      });
    } else if (this.currentMenu == 1) {
      this.optionsMenu.forEach((index) => {
        if (
          collides_UI(index, {
            x: xMousePos,
            y: yMousePos,
            width: 1,
            height: 1,
          }) &&
          index.button != undefined
        ) {
          hovered = true;
          index.color[0] = this.UIColors.hoverFill;
          index.color[1] = this.UIColors.hoverStroke;
          index.color[2] = this.UIColors.hoverFontFill;
        } else {
          index.color[0] = this.UIColors.fill;
          index.color[1] = this.UIColors.stroke;
          index.color[2] = this.UIColors.fontFill;
        }
      });
    } else if (this.currentMenu == 2) {
      this.gameOverMenu.forEach((index) => {
        if (
          collides_UI(index, {
            x: xMousePos,
            y: yMousePos,
            width: 1,
            height: 1,
          }) &&
          index.button != undefined
        ) {
          hovered = true;
          index.color[0] = this.UIColors.hoverFill;
          index.color[1] = this.UIColors.hoverStroke;
          index.color[2] = this.UIColors.hoverFontFill;
        } else {
          if (index.text != "GAME OVER") index.color[0] = this.UIColors.fill;
          index.color[1] = this.UIColors.stroke;
          index.color[2] = this.UIColors.fontFill;
        }
      });
    } else if (this.currentMenu == 3) {
      this.creditsMenu.forEach((index) => {
        if (
          collides_UI(index, {
            x: xMousePos,
            y: yMousePos,
            width: 1,
            height: 1,
          }) &&
          index.button != undefined
        ) {
          hovered = true;
          index.color[0] = this.UIColors.hoverFill;
          index.color[1] = this.UIColors.hoverStroke;
          index.color[2] = this.UIColors.hoverFontFill;
        } else {
          if (index.text != "GAME COMPLETED!") index.color[0] = this.UIColors.fill;
          index.color[1] = this.UIColors.stroke;
          index.color[2] = this.UIColors.fontFill;
        }
      });
    } else if (this.currentMenu == 4) {
      this.pauseMenu.forEach((index) => {
        if (
          collides_UI(index, {
            x: xMousePos,
            y: yMousePos,
            width: 1,
            height: 1,
          }) &&
          index.button != undefined
        ) {
          hovered = true;
          index.color[0] = this.UIColors.hoverFill;
          index.color[1] = this.UIColors.hoverStroke;
          index.color[2] = this.UIColors.hoverFontFill;
        } else {
          if (index.text != "GAME PAUSED.") index.color[0] = this.UIColors.fill;
          index.color[1] = this.UIColors.stroke;
          index.color[2] = this.UIColors.fontFill;
        }
      });
    } else if (this.currentMenu == 5) {
      this.beforeTheBossMenu.forEach((index) => {
        if (
          collides_UI(index, {
            x: xMousePos,
            y: yMousePos,
            width: 1,
            height: 1,
          }) &&
          index.button != undefined
        ) {
          hovered = true;
          index.color[0] = this.UIColors.hoverFill;
          index.color[1] = this.UIColors.hoverStroke;
          index.color[2] = this.UIColors.hoverFontFill;
        } else {
          index.color[0] = this.UIColors.fill;
          index.color[1] = this.UIColors.stroke;
          index.color[2] = this.UIColors.fontFill;
        }
      });
    } else if (this.currentMenu == 6) {
      //judgement ending
      this.judgementEndingMenu.forEach((index) => {
        if (
          collides_UI(index, {
            x: xMousePos,
            y: yMousePos,
            width: 1,
            height: 1,
          }) &&
          index.button != undefined
        ) {
          hovered = true;
          index.color[0] = this.UIColors.hoverFill;
          index.color[1] = this.UIColors.hoverStroke;
          index.color[2] = this.UIColors.hoverFontFill;
        } else {
          index.color[0] = this.UIColors.fill;
          index.color[1] = this.UIColors.stroke;
          index.color[2] = this.UIColors.fontFill;
        }
      });
    } else if (this.currentMenu == 7) {
      //revenge ending
      this.revengeEndingMenu.forEach((index) => {
        if (
          collides_UI(index, {
            x: xMousePos,
            y: yMousePos,
            width: 1,
            height: 1,
          }) &&
          index.button != undefined
        ) {
          hovered = true;
          index.color[0] = this.UIColors.hoverFill;
          index.color[1] = this.UIColors.hoverStroke;
          index.color[2] = this.UIColors.hoverFontFill;
        } else {
          index.color[0] = this.UIColors.fill;
          index.color[1] = this.UIColors.stroke;
          index.color[2] = this.UIColors.fontFill;
        }
      });
    } else if (this.currentMenu == 8) {
      this.tutorialMenu.forEach((index) => {
        if (
          collides_UI(index, {
            x: xMousePos,
            y: yMousePos,
            width: 1,
            height: 1,
          }) &&
          index.button != undefined
        ) {
          hovered = true;
          index.color[0] = this.UIColors.hoverFill;
          index.color[1] = this.UIColors.hoverStroke;
          index.color[2] = this.UIColors.hoverFontFill;
        } else {
          index.color[0] = this.UIColors.fill;
          index.color[1] = this.UIColors.stroke;
          index.color[2] = this.UIColors.fontFill;
        }
      });
    }
    if (hovered) {
      canvas.style.cursor = "pointer";
    } else {
      canvas.style.cursor = "default";
    }
  },
  cooldown: async function (object) {
    object.opacity = 1;
    for (let i = 1; i <= object.cooldown / 10; i++) {
      await sleep(10);
      if (i == object.cooldown / 10) object.opacity = 0;
      if (object.opacity == 0) break;
    }
  },
  getMenuEffect: async function (menu) {
    this.globalCustomAlphaCheck = true;
    if (this.globalCustomAlpha != 0) {
      for (; this.globalCustomAlpha > 0; this.globalCustomAlpha -= 0.06) {
        await sleep(10);
      }
      this.globalCustomAlpha = 0;
    }
    this.currentMenu = menu;
    for (; this.globalCustomAlpha < 1; this.globalCustomAlpha += 0.06) {
      await sleep(10);
    }
    this.globalCustomAlpha = 1;
    this.globalCustomAlphaCheck = false;
  },
  closeMenuEffect: async function (callback) {
    this.globalCustomAlphaCheck = true;
    for (; this.globalCustomAlpha > 0; this.globalCustomAlpha -= 0.06) {
      await sleep(10);
    }
    this.globalCustomAlpha = 0;
    this.globalCustomAlphaCheck = false;
    callback();
  },
};
