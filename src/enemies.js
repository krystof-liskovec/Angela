//Check for total of enemies on the map | used in: win condition
async function checkDeath(enemy, bulletType = "none") {
  if (enemy.HP <= 0 && !enemy.deathAnimation && !enemy.killed) {
    enemy.deathAnimation = true;
    gameAudio.playSound("enemy_death");
    if (enemy.cache != undefined) {
      for (let i = 0; i < enemy.cache[1]; i++) {
        enemyList.push(
          enemyCharacter({
            randomDirCDcounter: 120,
            x:
              enemy.x +
              Math.cos((2 * Math.PI) / enemy.cache[1]) *
                (i + 1) *
                20 *
                (Math.random() >= 0.5 ? 1 : -1),
            y:
              enemy.y +
              Math.sin((2 * Math.PI) / enemy.cache[1]) *
                (i + 1) *
                20 *
                (Math.random() >= 0.5 ? 1 : -1),
            randomDrop: false,
            spawnCD: 0,
            ...EnemyData[enemy.cache[0]],
          })
        );
        levels_handler.level.total += 1;
      }
    }
    if (bulletType == "SPREADER" && bulletList.length < 300) {
      gameAudio.playSound("player_SPREADERPROJECTILE");
      for (let i = 0; i < 16; i++) {
        bulletList.push(
          bullet(
            {
              x: enemy.x,
              y: enemy.y,
              dirx: Math.cos((Math.PI / 8) * i),
              diry: Math.sin((Math.PI / 8) * i),
              ...WeaponData.SPREADERPROJECTILE,
            },
            1
          )
        );
      }
    }
    if (enemy.source != undefined) {
      enemy.source.spawns--;
    }
    if (enemy.randomDrop) {
      if (playerData.level != 12) var choice = Math.round(Math.random() * 8) + 1;
      else var choice = Math.round(Math.random() * 7) + 1;
      for (let index in WeaponData) {
        if (choice == WeaponData[index].index) {
          choice = WeaponData[index].name;
        }
      }
      if (!player.inWeaponActivation) {
        weaponActivation.targets = 2 + player.companions;
        gameAudio.playSound("player_getDrop");
        weaponActivation.timerIndex = weaponActivation.defaultTimerIndex;
        weaponActivation.weaponName = choice;
        player.inWeaponActivation = true;
        for (let i = 0; i < weaponActivation.targets; i++) {
          spawnAnEnemy("lootCubeTarget");
        }
      }
    }
    if (enemy.behaviour == "loot") {
      lootCube.active = false;
      lootCube.nextSpawn = levelTimer + 1300;
    } else if (enemy.behaviour == "lootCubeTarget") {
      weaponActivation.targets--;
    } else if (levels_handler.level.total == 1) {
      await sleep(2000);
      if (levels_handler.level.total == 1) levels_handler.level.total -= 1;
    } else {
      levels_handler.level.total -= 1;
    }
  }
}

var enemyBulletList = [];
function enemyBullet(B, target = "none", xman = 0, yman = 0, playSound = true) {
  if (B.x > -200 && B.x < canvas.width + 200 && B.y > -200 && B.y < canvas.height + 200)
    if (playSound) gameAudio.playSound(B.sound);
  B.target = target;
  B.killed = false;
  B.opacity = 1;
  B.animationIndex = 0;
  B.animationX = 0;
  if (B.width == undefined && B.height == undefined) {
    B.width = B.widthOnPic * screenratio;
    B.height = B.heightOnPic * screenratio;
  }
  B.angle = 0;
  if (target == "none") {
    B.dirx = player.earthX - B.x;
    B.diry = player.earthY - B.y;
  } else if (target == "custom") {
    B.dirx = xman - B.x;
    B.diry = yman - B.y;
  } else {
    B.dirx = target.x + target.xspeed * 20 - B.x;
    B.diry = target.y + target.yspeed * 20 - B.y;
  }
  B.angle = Math.atan2(B.diry, B.dirx) + Math.PI / 2;
  B.hitBoxWidth = (B.width / 3) * 2;
  B.hitBoxHeight = (B.height / 3) * 2;
  B.update = function () {
    if (B.rotationAnimation) {
      B.angle += (B.rotationSpeed / 180) * Math.PI;
      if (B.angle > 2 * Math.PI) {
        B.angle = 0;
      }
    }
    if (B.animation) {
      B.animationIndex++;
      if (B.animationIndex % B.animationUpdate == 0) {
        B.animationIndex = 0;
        B.animationX++;
      }
      if (B.animationX == B.animationFrames) B.animationX = 0;
    }
    let ratio = B.speed / (Math.abs(B.dirx) + Math.abs(B.diry));
    B.xspeed = ratio * B.dirx;
    B.yspeed = ratio * B.diry;

    B.x += B.xspeed - player.xspeed - camera.offSetX;
    B.y += B.yspeed - player.yspeed - camera.offSetY;
    B.hitBoxX = B.x - B.hitBoxWidth / 2;
    B.hitBoxY = B.y - B.hitBoxHeight / 2;
    B.calcTTL();
  };
  B.render = function () {
    ctx.save();
    ctx.translate(B.x, B.y);
    ctx.rotate(B.angle);
    ctx.globalAlpha = B.opacity;
    ctx.drawImage(
      B.sprite,
      0 + B.widthOnPic * B.animationX,
      0,
      B.widthOnPic,
      B.heightOnPic,
      -B.width / 2,
      -B.height / 2,
      B.width,
      B.height
    );
    ctx.restore();
  };
  B.calcTTL = function () {
    if (B.ttl > 0) {
      B.ttl -= 1;
    } else {
      B.killed = true;
    }
  };
  return B;
}
//enemy objects
var enemyList = [];
function enemyCharacter(E) {
  E.appearOpacity = 0;
  E.appear = async function () {
    for (let i = 1; i <= 100; i++) {
      E.appearOpacity = i / 100;
      await sleep(10);
    }
  };
  E.aggressiveAppear = async function () {
    for (let i = 1; i <= 100; i++) {
      E.appearOpacity = i / 100;
      await sleep(1);
    }
  };
  E.width *= screenratio;
  E.height *= screenratio;
  E.manualUpdate = false;
  E.defaultSpeed *= screenratio;
  E.coordX = player.defaultSpaceSize / 2 + E.x - player.earthX;
  E.coordY = player.defaultSpaceSize / 2 + E.y - player.earthY;
  E.speed = E.defaultSpeed;
  E.deathAnimation = false;
  E.deathAnimation_angle = Math.random() * 2 * Math.PI;
  E.deathAnimation_index = 0;
  E.deathAnimation_countdown = 0;
  E.killed = false;
  E.animationX = 0;
  E.animationY = 0;
  E.animationIndex = 0;
  E.arrival = false;
  E.acceleration = 100;
  E.target = "none";
  E.orbitAngle = Math.atan2(player.earthX - E.y, player.earthY - E.x) + Math.PI / 2;
  E.angle = Math.atan2(player.earthY - E.y, player.earthX - E.x) + Math.PI / 2;
  if (E.turrets > 0) {
    E.turretAttackCD = [false, false, false, false];
  }
  if (E.hitBoxWidth == undefined) {
    E.hitBoxWidth = (E.width / 3) * 2;
    E.hitBoxHeight = (E.height / 3) * 2;
    E.hitBoxX = E.x - E.hitBoxWidth / 2;
    E.hitBoxY = E.y - E.hitBoxHeight / 2;
  }
  E.update = function () {
    E.checkBehaviour();
    if (!E.manualUpdate) {
      if (
        (Math.abs(E.x - player.earthX) > player.spaceSize / 2 ||
          Math.abs(E.y - player.earthY) > player.spaceSize / 2) &&
        !E.moveWithPlayer
      ) {
        //check for miss position
        E.randomDirCDCounter = 300;
        E.randomDirX = Math.cos(Math.random() * 2 * Math.PI);
        E.randomDirY = Math.sin(Math.random() * 2 * Math.PI);
        let ratio = E.speed / (Math.abs(player.earthX - E.x) + Math.abs(player.earthY - E.y));
        E.xspeed = ratio * (player.earthX - E.x);
        E.yspeed = ratio * (player.earthY - E.y);
      } else {
        if (E.behaviour == "ignore") {
          let ratio =
            E.speed / (Math.abs(player.earthX - E.x) + Math.abs(player.earthY - E.y));
          E.xspeed = ratio * (player.earthX - E.x);
          E.yspeed = ratio * (player.earthY - E.y);
        } else if (E.behaviour == "orbit") {
          if (E.inOrbit) {
            E.orbitAngle -= 0.01;

            E.xspeed = E.speed * Math.cos(E.orbitAngle);
            E.yspeed = E.speed * Math.sin(E.orbitAngle);
          } else {
            let ratio =
              E.speed / (Math.abs(player.earthX - E.x) + Math.abs(player.earthY - E.y));
            E.xspeed = ratio * (player.earthX - E.x);
            E.yspeed = ratio * (player.earthY - E.y);
          }
        } else if (
          E.behaviour == "spawn" ||
          E.behaviour == "loot" ||
          (E.target == "none" && E.behaviour == "chase")
        ) {
          E.randomDirCD();
          E.angle = Math.atan2(E.randomDirY, E.randomDirX) + Math.PI / 2;
          let ratio = E.speed / (Math.abs(E.randomDirX) + Math.abs(E.randomDirY));
          E.xspeed = ratio * E.randomDirX;
          E.yspeed = ratio * E.randomDirY;
        } else if (E.moveWithPlayer) {
          if (E.behaviour == "angela_phase3") {
            E.playerOrbitAngle -= E.speed;
            E.x =
              E.distanceFromCenter * Math.cos(E.playerOrbitAngle) * screenratio +
              player.earthX;
            E.y =
              E.distanceFromCenter * Math.sin(E.playerOrbitAngle) * screenratio +
              player.earthY;
            E.coordX = player.defaultSpaceSize / 2 + E.x - player.earthX;
            E.coordY = player.defaultSpaceSize / 2 + E.y - player.earthY;
            if (E.playerOrbitAngle <= 0) E.playerOrbitAngle = 2 * Math.PI;
          } else {
            E.playerOrbitAngle -= E.speed;
            E.x =
              (canvas.width / E.distanceFromPlayerX) * Math.cos(E.playerOrbitAngle) + player.x;
            E.y =
              (canvas.height / E.distanceFromPlayerY) * Math.sin(E.playerOrbitAngle) +
              player.y;
            E.coordX = player.defaultSpaceSize / 2 + E.x - player.earthX;
            E.coordY = player.defaultSpaceSize / 2 + E.y - player.earthY;
            if (E.playerOrbitAngle <= 0) E.playerOrbitAngle = 2 * Math.PI;
          }
        } else {
          E.randomDirCDcounter = 300;
          let ratio = E.speed / (Math.abs(E.target.x - E.x) + Math.abs(E.target.y - E.y));
          E.xspeed = (ratio * (E.target.x - E.x) * E.acceleration) / 100;
          E.yspeed = (ratio * (E.target.y - E.y) * E.acceleration) / 100;
        }
      }
      if (!E.moveWithPlayer) {
        E.x += E.xspeed - player.xspeed - camera.offSetX;
        E.y += E.yspeed - player.yspeed - camera.offSetY;
        E.coordX += E.xspeed;
        E.coordY += E.yspeed;
      }
    }
    E.hitBoxWidth = Math.abs(
      (E.width / 3) * 2 * Math.pow(Math.cos(E.angle), 2) +
        (E.height / 3) * 2 * Math.pow(Math.sin(E.angle), 2)
    );
    E.hitBoxHeight = Math.abs(
      (E.width / 3) * 2 * Math.pow(Math.sin(E.angle), 2) +
        (E.height / 3) * 2 * Math.pow(Math.cos(E.angle), 2)
    );
    E.hitBoxX = E.x - E.hitBoxWidth / 2;
    E.hitBoxY = E.y - E.hitBoxHeight / 2;

    if (E.ttl != undefined) {
      E.calcTTL();
    }
  };
  E.render = function () {
    if (E.animation && !E.spawning) {
      E.animationIndex += 1;
      if (E.animationIndex == 60 / E.animationFPS) {
        E.animationIndex = 0;
        if (E.animationX < E.widthOnPic * (E.animationFrames - 1))
          E.animationX += E.widthOnPic;
        else E.animationX = 0;
      }
    }
    ctx.save();
    ctx.translate(E.x, E.y);
    if (!E.inOrbit && E.rotation) ctx.rotate(E.angle);
    else if (E.rotation)
      ctx.rotate(Math.atan2(player.earthY - E.y, player.earthX - E.x) - Math.PI);
    //normal enemy ship
    ctx.globalAlpha = E.appearOpacity;
    ctx.drawImage(
      E.sprite,
      0 + E.animationX,
      0,
      E.widthOnPic,
      E.heightOnPic,
      -E.width / 2,
      -E.height / 2,
      E.width,
      E.height
    );
    //damaged enemy ship
    if (E.opacity > 0) {
      ctx.globalAlpha = E.opacity;
      ctx.drawImage(
        E.sprite,
        0 + E.animationX,
        E.heightOnPic,
        E.widthOnPic,
        E.heightOnPic,
        -E.width / 2,
        -E.height / 2,
        E.width,
        E.height
      );
    }
    ctx.restore();
    if (E.turrets > 0) {
      for (let i = 0; i < E.turrets; i++) {
        ctx.save();
        ctx.translate(
          E.x + E.turretDist[i] * Math.cos(E.angle + (Math.PI / 2) * i) * screenratio,
          E.y + E.turretDist[i] * Math.sin(E.angle + (Math.PI / 2) * i) * screenratio
        );
        ctx.rotate(E.turretAngle[i]);
        ctx.globalAlpha = E.appearOpacity;
        ctx.drawImage(
          E.turretSprite,
          0,
          0,
          E.turretWidthOnPic,
          E.turretHeightOnPic,
          -E.turretWidthOnPic / 2,
          -E.turretHeightOnPic / 2,
          E.turretWidthOnPic,
          E.turretHeightOnPic
        );
        ctx.globalAlpha = E.opacity;
        ctx.drawImage(
          E.turretSprite,
          0,
          E.turretHeightOnPic,
          E.turretWidthOnPic,
          E.turretHeightOnPic,
          -E.turretWidthOnPic / 2,
          -E.turretHeightOnPic / 2,
          E.turretWidthOnPic,
          E.turretHeightOnPic
        );
        ctx.restore();
      }
    }
    //let colorHPbar_1 = parseInt((E.HP / E.maxHP) * 255).toString(16);
    //if (colorHPbar_1.length == 1) colorHPbar_1 = "0" + colorHPbar_1;
    let colorHPbar = "white";
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = "#606060";
    ctx.fillRect(E.x - 15, E.y + E.height / 2, E.height / 3 > 30 ? E.height / 3 : 30, 5);
    ctx.fillStyle = colorHPbar;
    ctx.fillRect(
      E.x - 15,
      E.y + E.height / 2,
      (E.HP / E.maxHP) * (E.height / 3 > 30 ? E.height / 3 : 30),
      5
    );
    ctx.strokeStyle = "#000000";
    ctx.globalAlpha = 1;
    ctx.lineWidth = 1;
    ctx.strokeRect(E.x - 15, E.y + E.height / 2, E.height / 3 > 30 ? E.height / 3 : 30, 5);
  };
  E.deathAnimation_render = function () {
    E.x += -player.xspeed - camera.offSetX; //So that sprite won't move with the player
    E.y += -player.yspeed - camera.offSetY;
    if (!E.killed) {
      E.deathAnimation_countdown += 1;
      if (E.deathAnimation_countdown % E.deathAnimationFPS == 0) {
        E.deathAnimation_angle = Math.random() * 2 * Math.PI;
        E.deathAnimation_index += 1;
      }
      ctx.save();
      ctx.translate(E.x, E.y);
      if (E.type == "smallCube" || E.type == "largeCube") ctx.rotate(E.deathAnimation_angle);
      else ctx.rotate(E.angle);
      ctx.drawImage(
        E.sprite,
        E.widthOnPic * E.deathAnimation_index,
        2 * E.heightOnPic,
        E.widthOnPic,
        E.heightOnPic,
        -E.width / 2,
        -E.height / 2,
        E.width,
        E.height
      );
      ctx.restore();
      if (E.deathAnimation_index == E.deathAnimationFrames) {
        E.killed = true;
        E.deathAnimation = false;
      }
    }
  };
  //Cooldowns
  E.attackCD = false;
  E.piercingCD = false;
  E.opacity = 0;
  E.chaseBehaviour = async function () {
    E.playerDistance = Math.sqrt(Math.pow(player.x - E.x, 2) + Math.pow(player.y - E.y, 2));
    if (E.playerDistance < 800 * screenratio && E.target == "none" && player.HP[1] > 0) {
      E.target = player;
    }
    if (E.target != "none") {
      E.angle = Math.atan2(E.target.y - E.y, E.target.x - E.x) + Math.PI / 2;
      if (E.playerDistance > 900 * screenratio || E.target.HP[1] <= 0) {
        if (E.acceleration <= 99) E.acceleration += 1;
        else E.acceleration = 100;
        E.randomDirX = E.target.x - E.x;
        E.randomDirY = E.target.y - E.y;
        E.target = "none";
        E.speed = E.defaultSpeed;
        E.randomDirCDcounter = 120;
      } else if (E.playerDistance < 650 * screenratio) {
        if (E.acceleration >= 1) E.acceleration -= 1;
        else E.acceleration = 0;
        if (!E.attackCD && E.bullets == undefined) {
          E.attackCDstart();
          enemyBulletList.push(
            enemyBullet({ x: E.x, y: E.y, ...enemyWeaponData[E.bulletType] }, player)
          );
        } else if (!E.attackCD) {
          E.attackCDstart();
          for (let i = 0; i < E.bullets; i++) {
            enemyBulletList.push(
              enemyBullet({ x: E.x, y: E.y, ...enemyWeaponData[E.bulletType] }, player)
            );
            await sleep(E.bulletDelay);
          }
        }
      } else {
        if (E.acceleration <= 99) E.acceleration += 1;
        else E.acceleration = 100;
        E.speed = E.defaultSpeed;
      }
    } else {
      if (E.acceleration <= 99) E.acceleration += 1;
      else E.acceleration = 100;
    }
  };
  E.ignoreBehaviour = function () {
    E.distance = Math.sqrt(
      Math.pow(player.earthX - E.x, 2) + Math.pow(player.earthY - E.y, 2)
    );
    if (E.distance < 240 * screenratio && !E.arrival) {
      E.speed = 0;
      E.arrival = true;
      E.attackCDstart();
    } else if (E.arrival && !E.attackCD) {
      E.attackCDstart();
      enemyBulletList.push(enemyBullet({ x: E.x, y: E.y, ...enemyWeaponData[E.bulletType] }));
    }
    if (E.turrets > 0) {
      for (let i = E.turrets - 1; i >= 0; i--) {
        let ex = E.x + E.turretDist[i] * Math.cos(E.angle + (Math.PI / 2) * i) * screenratio;
        let ey = E.y + E.turretDist[i] * Math.sin(E.angle + (Math.PI / 2) * i) * screenratio;
        let turretDistance = Math.sqrt(
          Math.pow(player.x - ex, 2) + Math.pow(player.y - ey, 2)
        );
        if (turretDistance < 850 * screenratio) {
          E.turretAngle[i] = Math.atan2(player.y - E.y, player.x - E.x) + Math.PI / 2;
          if (!E.turretAttackCD[i]) {
            E.turretAttackCDstart(i);
            enemyBulletList.push(
              enemyBullet({ x: ex, y: ey, ...enemyWeaponData[E.turretBulletType] }, player)
            );
          }
        } else {
          E.turretAngle[i] = E.angle;
        }
      }
    }
  };
  E.spawnBehaviour = function () {
    if (E.spawning) E.spawnSummonTick();
    if (E.type != "mail" && E.type != "betaMail")
      E.spawnDistance = Math.sqrt(Math.pow(player.x - E.x, 2) + Math.pow(player.y - E.y, 2));
    else E.spawnDistance = 0;
    if (
      E.spawnDistance < 450 * screenratio &&
      !E.spawning &&
      !E.attackCD &&
      E.spawns < E.maximumSpawns
    ) {
      E.spawning = true;
      if (E.type == "mail" || E.type == "betaMail") E.speed = 0;
      E.attackCDstart();
    } else {
      E.speed = E.defaultSpeed;
    }
  };
  E.spawnSummonTick = function () {
    if (E.type == "mail" || E.type == "betaMail") {
      E.spawnAnimationIndex += 1;
      if (E.spawnAnimationIndex == 60 / E.spawnAnimationFPS) {
        E.spawnAnimationIndex = 0;
        if (E.animationX < E.widthOnPic * (E.spawnAnimationFrames - 1))
          E.animationX += E.widthOnPic;
        else {
          E.spawning = false;
          enemyList.push(
            enemyCharacter({
              randomDirCDcounter: 120,
              source: E,
              x: E.x + (Math.random() - 0.5) * 50,
              y: E.y + (Math.random() - 0.5) * 50,
              randomDrop: false,
              spawnCD: 0,
              ...EnemyData[E.bulletType],
            })
          );
          if (E.type == "betaMail") {
            enemyList.push(
              enemyCharacter({
                randomDirCDcounter: 120,
                source: E,
                x: E.x + (Math.random() - 0.5) * 50,
                y: E.y + (Math.random() - 0.5) * 50,
                randomDrop: false,
                spawnCD: 0,
                ...EnemyData[E.bulletType],
              })
            );
            E.spawns++;
            levels_handler.level.total += 1;
          }
          E.spawns++;
          levels_handler.level.total += 1;
          E.animationX = 0;
        }
      }
    } else if (E.type == "star" || E.type == "betaStar") {
      for (let i = 0; i < 7 && E.spawns < E.maximumSpawns; i++) {
        let angle = (Math.PI / 4) * i;
        enemyList.push(
          enemyCharacter({
            randomDirCDcounter: 120,
            ttl: 600,
            source: E,
            x: E.x + Math.cos(angle) * 100 * screenratio,
            y: E.y + Math.sin(angle) * 100 * screenratio,
            randomDrop: false,
            spawnCD: 0,
            ...EnemyData[E.bulletType],
          })
        );
        E.spawns++;
        levels_handler.level.total += 1;
      }
      E.spawning = false;
    }
  };
  E.collideBehaviour = function () {
    E.target = player;
    E.angle = Math.atan2(E.target.y - E.y, E.target.x - E.x) + Math.PI / 2;
  };
  E.orbitBehaviour = function () {
    E.distance = Math.sqrt(
      Math.pow(player.earthX - E.x, 2) + Math.pow(player.earthY - E.y, 2)
    );
    if (E.distance < 500 * screenratio && !E.inOrbit) {
      E.inOrbit = true;
      E.arrival = true;
      E.attackCDstart();
    } else if (E.inOrbit && !E.attackCD) {
      E.attackCDstart();
      enemyBulletList.push(enemyBullet({ x: E.x, y: E.y, ...enemyWeaponData[E.bulletType] }));
    }
  };
  E.mineBehaviour = function () {
    E.distance = Math.sqrt(
      Math.pow(player.earthX - E.x, 2) + Math.pow(player.earthY - E.y, 2)
    );
    if (E.distance < 40 * screenratio && E.HP > 0) {
      E.HP = 0;
      if (player.shield[0] >= 2) player.shield[0] -= 2;
      else if (player.shield[0] == 1) {
        player.shield[0] -= 1;
        player.HP[0] -= 1;
      } else {
        player.HP[0] -= 2;
      }
      checkDeath(E);
    }
  };
  E.angelaBehaviour1 = function () {
    E.target = player;
    E.angle = Math.atan2(E.target.y - E.y, E.target.x - E.x) + Math.PI / 2;
    E.playerDistance = Math.sqrt(Math.pow(player.x - E.x, 2) + Math.pow(player.y - E.y, 2));
    let rampUp = 1 - E.HP / E.maxHP;
    E.attackCDvalue = E.defaultAttackCDvalue - 1200 * rampUp;
    if (E.playerDistance < 650 * screenratio) {
      if (E.acceleration >= 1) E.acceleration -= 1;
      else E.acceleration = 0;
      if (E.ammo > 0 && !E.attackCD) {
        if (E.bulletType == "COG" && !E.weaponCD) {
          let randomAngle = Math.random() * 0.5;
          for (let i = 0; i < 12; i++) {
            enemyBulletList.push(
              enemyBullet(
                { x: E.x, y: E.y, ...enemyWeaponData[E.bulletType] },
                "custom",
                E.x + Math.cos((Math.PI / 6 + randomAngle) * i),
                E.y + Math.sin((Math.PI / 6 + randomAngle) * i)
              )
            );
            E.ammo -= 2 - Math.round(1 * rampUp);
          }
          setTimer(200 - 30 * rampUp, E, "weaponCD");
        } else if (E.bulletType == "ANGELABASIC" && !E.weaponCD) {
          for (let i = -4; i < 4; i++) {
            enemyBulletList.push(
              enemyBullet(
                { x: E.x, y: E.y, ...enemyWeaponData[E.bulletType] },
                "custom",
                E.x + Math.cos(E.angle - Math.PI / 2 + 0.06 * i),
                E.y + Math.sin(E.angle - Math.PI / 2 + 0.06 * i),
                false
              )
            );
            E.ammo -= 4 - Math.round(1 * rampUp);
            if (i % 2 == 0) {
              gameAudio.playSound("enemy_BASIC");
            }
          }
          setTimer(300 - 30 * rampUp, E, "weaponCD");
        } else if (E.bulletType == "CORRUPTEDSHOT" && !E.weaponCD) {
          for (let i = 0; i < 16; i++) {
            let randomSelector = Math.round(Math.random());
            enemyBulletList.push(
              enemyBullet(
                { x: E.x, y: E.y, ...enemyWeaponData[E.bulletType] },
                "custom",
                E.x + Math.cos((Math.PI / 8) * i + (Math.PI / 16) * randomSelector),
                E.y + Math.sin((Math.PI / 8) * i + (Math.PI / 16) * randomSelector)
              )
            );
            E.ammo -= 4 - Math.round(1 * rampUp);
          }
          setTimer(200 - 30 * rampUp, E, "weaponCD");
        }
      } else if (!E.attackCD) {
        E.attackCDstart();
        E.ammo = 100;
        if (E.bulletType == "COG") E.bulletType = "ANGELABASIC";
        else if (E.bulletType == "ANGELABASIC") E.bulletType = "CORRUPTEDSHOT";
        else if (E.bulletType == "CORRUPTEDSHOT") E.bulletType = "COG";
      }
    } else {
      if (E.acceleration <= 99) E.acceleration += 1;
      else E.acceleration = 100;
      E.speed = E.defaultSpeed;
    }
  };
  E.angelaBehaviour2 = function () {
    E.target = player;
    E.angle = Math.atan2(E.target.y - E.y, E.target.x - E.x) + Math.PI / 2;
    let rampUp = 1 - E.HP / E.maxHP;
    E.attackCDvalue = E.defaultAttackCDvalue - 1500 * rampUp;
    if (E.ammo > 0 && !E.attackCD) {
      if (E.bulletType == "COG" && !E.weaponCD) {
        let randomAngle = Math.random() * 0.5;
        for (let i = 0; i < 12; i++) {
          enemyBulletList.push(
            enemyBullet(
              { x: E.x, y: E.y, ...enemyWeaponData[E.bulletType] },
              "custom",
              E.x + Math.cos((Math.PI / 6 + randomAngle) * i),
              E.y + Math.sin((Math.PI / 6 + randomAngle) * i)
            )
          );
          E.ammo -= 2;
        }
        setTimer(200 - 40 * rampUp, E, "weaponCD");
      } else if (E.bulletType == "ANGELABASIC" && !E.weaponCD) {
        for (let i = -4; i < 4; i++) {
          enemyBulletList.push(
            enemyBullet(
              { x: E.x, y: E.y, ...enemyWeaponData[E.bulletType] },
              "custom",
              E.x + Math.cos(E.angle - Math.PI / 2 + 0.06 * i),
              E.y + Math.sin(E.angle - Math.PI / 2 + 0.06 * i)
            )
          );
          E.ammo -= 4;
        }
        setTimer(300 - 40 * rampUp, E, "weaponCD");
      } else if (E.bulletType == "CORRUPTEDSHOT" && !E.weaponCD) {
        for (let i = 0; i < 16; i++) {
          let randomSelector = Math.round(Math.random());
          enemyBulletList.push(
            enemyBullet(
              { x: E.x, y: E.y, ...enemyWeaponData[E.bulletType] },
              "custom",
              E.x + Math.cos((Math.PI / 8) * i + (Math.PI / 16) * randomSelector),
              E.y + Math.sin((Math.PI / 8) * i + (Math.PI / 16) * randomSelector)
            )
          );
          E.ammo -= 4;
        }
        setTimer(200 - 40 * rampUp, E, "weaponCD");
      } else if (E.bulletType == "CHARGE") {
        if (!E.chargeActive) {
          E.chargeSet = Math.round(Math.random() * 3);
          E.appearOpacity = 0;
          E.aggressiveAppear();
          E.chargeActive = true;
          E.manualUpdate = true;
          E.chargeSound = true;
          E.chargeRectX = player.x;
          E.chargeRectY = player.y;

          setTimer(E.chargeWaitTime - 500 * rampUp, E, "weaponCD");
          setTimer(1000 + E.chargeWaitTime - 500 * rampUp, E, "chargeEnd");
        } else if (!E.weaponCD && E.chargeActive) {
          if (E.chargeSound) {
            gameAudio.playSound("enemy_CHARGE");
            E.chargeSound = false;
          }
          E.x += E.chargeXSpeed - player.xspeed - camera.offSetX;
          E.y += E.chargeYSpeed - player.yspeed - camera.offSetY;
          E.coordX += E.chargeXSpeed;
          E.coordY += E.chargeYSpeed;
          if (!E.chargeEnd) {
            E.ammo -= 100 - 1 * Math.round(rampUp);
            E.manualUpdate = false;
            E.chargeActive = false;
            E.appearOpacity = 0;
            E.aggressiveAppear();
          }
        } else {
          if (E.chargeSet == 0) {
            E.x = canvas.width;
            E.y = player.y;
            E.chargeXSpeed = -E.chargeSpeed * screenratio;
            E.chargeYSpeed = 0;
          } else if (E.chargeSet == 1) {
            E.x = 0;
            E.y = player.y;
            E.chargeXSpeed = E.chargeSpeed * screenratio;
            E.chargeYSpeed = 0;
          } else if (E.chargeSet == 2) {
            E.x = player.x;
            E.y = canvas.height;
            E.chargeXSpeed = 0;
            E.chargeYSpeed = -E.chargeSpeed * screenratio;
          } else if (E.chargeSet == 3) {
            E.x = player.x;
            E.y = 0;
            E.chargeXSpeed = 0;
            E.chargeYSpeed = E.chargeSpeed * screenratio;
          }
          E.coordX = player.spaceSize / 2 + E.x - player.earthX;
          E.coordY = player.spaceSize / 2 + E.y - player.earthY;
          E.chargeRectX -= camera.offSetX;
          E.chargeRectY -= camera.offSetY;
          ctx.globalAlpha = 0.3;
          ctx.fillStyle = "red";
          if (E.chargeSet <= 1) {
            ctx.fillRect(0, E.chargeRectY - E.height / 2, canvas.width, E.height);
            ctx.globalAlpha = 0.6;
            ctx.drawImage(
              sprite.projectile_enemyDANGER,
              0,
              0,
              102,
              102,
              canvas.width / 3 - 51 * screenratio,
              E.chargeRectY - 51 * screenratio,
              102 * screenratio,
              102 * screenratio
            );
            ctx.drawImage(
              sprite.projectile_enemyDANGER,
              0,
              0,
              102,
              102,
              (2 * canvas.width) / 3 - 51 * screenratio,
              E.chargeRectY - 51 * screenratio,
              102 * screenratio,
              102 * screenratio
            );
          } else {
            ctx.fillRect(E.chargeRectX - E.width / 2, 0, E.width, canvas.height);
            ctx.globalAlpha = 0.6;
            ctx.drawImage(
              sprite.projectile_enemyDANGER,
              0,
              0,
              102,
              102,
              E.chargeRectX - 51 * screenratio,
              canvas.height / 3 - 51 * screenratio,
              102 * screenratio,
              102 * screenratio
            );
            ctx.drawImage(
              sprite.projectile_enemyDANGER,
              0,
              0,
              102,
              102,
              E.chargeRectX - 51 * screenratio,
              (2 * canvas.height) / 3 - 51 * screenratio,
              102 * screenratio,
              102 * screenratio
            );
          }
        }
      } else if (E.bulletType == "AIRSTRIKE") {
        if (!E.airStrikeActive) {
          setTimer(E.airStrikeCD - 200 * rampUp, E, "weaponCD");
          E.airStrikeX = player.x;
          E.airStrikeY = player.y;
          E.airStrikeActive = true;
        } else if (!E.weaponCD && E.airStrikeActive) {
          enemyBulletList.push(
            enemyBullet(
              {
                x: E.airStrikeX,
                y: E.airStrikeY,
                width: E.airStrikeRadius * screenratio,
                height: E.airStrikeRadius * screenratio,
                ...enemyWeaponData[E.bulletType],
              },
              "custom",
              E.airStrikeX + 0.01,
              E.airStrikeY + 0.01
            )
          );
          E.ammo -= 15;
          E.airStrikeActive = false;
        } else {
          E.airStrikeX += -player.xspeed - camera.offSetX;
          E.airStrikeY += -player.yspeed - camera.offSetY;
          ctx.globalAlpha = 1;
          ctx.fillStyle = "red";
          ctx.drawImage(
            sprite.projectile_enemyAIRSTRIKEDANGER,
            0,
            0,
            150,
            150,
            E.airStrikeX - (E.airStrikeRadius / 2) * screenratio,
            E.airStrikeY - (E.airStrikeRadius / 2) * screenratio,
            E.airStrikeRadius * screenratio,
            E.airStrikeRadius * screenratio
          );
        }
      }
    } else if (!E.attackCD) {
      E.attackCDstart();
      E.ammo = 100;
      if (E.bulletType == "ANGELABASIC") E.bulletType = "CHARGE";
      else if (E.bulletType == "CHARGE") E.bulletType = "COG";
      else if (E.bulletType == "COG") E.bulletType = "AIRSTRIKE";
      else if (E.bulletType == "AIRSTRIKE") E.bulletType = "ANGELABASIC";
    }
  };
  E.angelaBehaviour3 = function () {
    E.target = player;
    E.angle = Math.atan2(E.target.y - E.y, E.target.x - E.x) + Math.PI / 2;
    let rampUp = 1 - E.HP / E.maxHP;
    E.attackCDvalue = E.defaultAttackCDvalue - 2000 * rampUp;
    if (!E.playerPosReseted) {
      E.attackCDstart();
      E.playerPosReseted = true;
      player.setPos(0, 0);
      background.inicialize();
      backgroundParticles.inicialize();
      camera.inicialize();
      player.spaceSize = 1200 * screenratio;
    }
    if (E.ammo > 0 && !E.attackCD) {
      if (E.bulletType == "CORRUPTEDSHOT" && !E.weaponCD) {
        for (let i = 0; i < 16; i++) {
          let randomSelector = Math.round(Math.random());
          enemyBulletList.push(
            enemyBullet(
              { x: E.x, y: E.y, ...enemyWeaponData[E.bulletType] },
              "custom",
              E.x + Math.cos((Math.PI / 8) * i + (Math.PI / 16) * randomSelector),
              E.y + Math.sin((Math.PI / 8) * i + (Math.PI / 16) * randomSelector)
            )
          );
          E.ammo -= 4 - Math.round(2 * rampUp);
        }
        if (rampUp > 0.5) {
          for (let i = -3; i < 3; i++) {
            enemyBulletList.push(
              enemyBullet(
                { x: E.x, y: E.y, ...enemyWeaponData["ANGELABASIC"] },
                "custom",
                E.x + Math.cos(E.angle - Math.PI / 2 + 0.1 * i),
                E.y + Math.sin(E.angle - Math.PI / 2 + 0.1 * i)
              )
            );
          }
        }
        setTimer(200 - 30 * rampUp, E, "weaponCD");
      } else if (E.bulletType == "CHARGE") {
        if (!E.chargeActive) {
          E.chargeSet = Math.round(Math.random() * 3);
          E.appearOpacity = 0;
          E.aggressiveAppear();
          E.chargeActive = true;
          E.manualUpdate = true;
          E.chargeSound = true;
          E.chargeRectX = player.x;
          E.chargeRectY = player.y;

          setTimer(E.chargeWaitTime - 900 * rampUp, E, "weaponCD");
          setTimer(1000 + E.chargeWaitTime - 900 * rampUp, E, "chargeEnd");
        } else if (!E.weaponCD && E.chargeActive) {
          if (E.chargeSound) {
            gameAudio.playSound("enemy_CHARGE");
            E.chargeSound = false;
          }
          E.x += E.chargeXSpeed - player.xspeed - camera.offSetX;
          E.y += E.chargeYSpeed - player.yspeed - camera.offSetY;
          E.coordX += E.chargeXSpeed;
          E.coordY += E.chargeYSpeed;
          if (!E.chargeEnd) {
            E.ammo -= 100 - Math.floor(66 * rampUp);
            E.manualUpdate = false;
            E.chargeActive = false;
            E.appearOpacity = 0;
            E.aggressiveAppear();
          }
        } else {
          if (E.chargeSet == 0) {
            E.x = canvas.width;
            E.y = player.y;
            E.chargeXSpeed = -E.chargeSpeed * screenratio;
            E.chargeYSpeed = 0;
          } else if (E.chargeSet == 1) {
            E.x = 0;
            E.y = player.y;
            E.chargeXSpeed = E.chargeSpeed * screenratio;
            E.chargeYSpeed = 0;
          } else if (E.chargeSet == 2) {
            E.x = player.x;
            E.y = canvas.height;
            E.chargeXSpeed = 0;
            E.chargeYSpeed = -E.chargeSpeed * screenratio;
          } else if (E.chargeSet == 3) {
            E.x = player.x;
            E.y = 0;
            E.chargeXSpeed = 0;
            E.chargeYSpeed = E.chargeSpeed * screenratio;
          }
          E.coordX = player.spaceSize / 2 + E.x - player.earthX;
          E.coordY = player.spaceSize / 2 + E.y - player.earthY;
          E.chargeRectX -= camera.offSetX;
          E.chargeRectY -= camera.offSetY;
          ctx.globalAlpha = 0.3;
          ctx.fillStyle = "red";
          if (E.chargeSet <= 1) {
            ctx.fillRect(0, E.chargeRectY - E.height / 2, canvas.width, E.height);
            ctx.globalAlpha = 0.6;
            ctx.drawImage(
              sprite.projectile_enemyDANGER,
              0,
              0,
              102,
              102,
              canvas.width / 3 - 51 * screenratio,
              E.chargeRectY - 51 * screenratio,
              102 * screenratio,
              102 * screenratio
            );
            ctx.drawImage(
              sprite.projectile_enemyDANGER,
              0,
              0,
              102,
              102,
              (2 * canvas.width) / 3 - 51 * screenratio,
              E.chargeRectY - 51 * screenratio,
              102 * screenratio,
              102 * screenratio
            );
          } else {
            ctx.fillRect(E.chargeRectX - E.width / 2, 0, E.width, canvas.height);
            ctx.globalAlpha = 0.6;
            ctx.drawImage(
              sprite.projectile_enemyDANGER,
              0,
              0,
              102,
              102,
              E.chargeRectX - 51 * screenratio,
              canvas.height / 3 - 51 * screenratio,
              102 * screenratio,
              102 * screenratio
            );
            ctx.drawImage(
              sprite.projectile_enemyDANGER,
              0,
              0,
              102,
              102,
              E.chargeRectX - 51 * screenratio,
              (2 * canvas.height) / 3 - 51 * screenratio,
              102 * screenratio,
              102 * screenratio
            );
          }
        }
      } else if (E.bulletType == "AIRSTRIKE") {
        if (!E.airStrikeActive) {
          setTimer(E.airStrikeCD - 200 * rampUp, E, "weaponCD");
          if (rampUp > 0.5) {
            let randomAngle = Math.random() * 0.5;
            for (let i = 0; i < 12; i++) {
              enemyBulletList.push(
                enemyBullet(
                  { x: E.x, y: E.y, ...enemyWeaponData["COG"] },
                  "custom",
                  E.x + Math.cos((Math.PI / 6 + randomAngle) * i),
                  E.y + Math.sin((Math.PI / 6 + randomAngle) * i)
                )
              );
            }
          }
          E.airStrikeX = player.x;
          E.airStrikeY = player.y;
          E.airStrikeActive = true;
        } else if (!E.weaponCD && E.airStrikeActive) {
          enemyBulletList.push(
            enemyBullet(
              {
                x: E.airStrikeX,
                y: E.airStrikeY,
                width: E.airStrikeRadius * screenratio,
                height: E.airStrikeRadius * screenratio,
                ...enemyWeaponData[E.bulletType],
              },
              "custom",
              E.airStrikeX + 0.01,
              E.airStrikeY + 0.01
            )
          );
          E.ammo -= 15;
          E.airStrikeActive = false;
        } else {
          E.airStrikeX += -player.xspeed - camera.offSetX;
          E.airStrikeY += -player.yspeed - camera.offSetY;
          ctx.globalAlpha = 0.6;
          ctx.fillStyle = "red";
          ctx.drawImage(
            sprite.projectile_enemyAIRSTRIKEDANGER,
            0,
            0,
            150,
            150,
            E.airStrikeX - (E.airStrikeRadius / 2) * screenratio,
            E.airStrikeY - (E.airStrikeRadius / 2) * screenratio,
            E.airStrikeRadius * screenratio,
            E.airStrikeRadius * screenratio
          );
        }
      }
    } else if (!E.attackCD) {
      E.attackCDstart();
      E.ammo = 100;
      if (E.bulletType == "CORRUPTEDSHOT") E.bulletType = "AIRSTRIKE";
      else if (E.bulletType == "AIRSTRIKE") E.bulletType = "CHARGE";
      else if (E.bulletType == "CHARGE") E.bulletType = "CORRUPTEDSHOT";
    }
  };
  E.lootCubeTarget = function () {
    if (weaponActivation.targets < 0) {
      E.HP = 0;
      checkDeath(E);
    }
  };
  E.checkBehaviour = function () {
    switch (E.behaviour) {
      case "chase":
        E.chaseBehaviour();
        break;
      case "ignore":
        E.ignoreBehaviour();
        break;
      case "spawn":
        E.spawnBehaviour();
        break;
      case "collide":
        E.collideBehaviour();
        break;
      case "angela_phase1":
        E.angelaBehaviour1();
        break;
      case "angela_phase2":
        E.angelaBehaviour2();
        break;
      case "angela_phase3":
        E.angelaBehaviour3();
        break;
      case "lootCubeTarget":
        E.lootCubeTarget();
        break;
      case "mine":
        E.mineBehaviour();
        break;
      case "orbit":
        E.orbitBehaviour();
        break;
    }
  };
  E.attackCDstart = async function () {
    E.attackCD = true;
    await sleep(E.attackCDvalue);
    E.attackCD = false;
  };
  E.turretAttackCDstart = async function (i) {
    E.turretAttackCD[i] = true;
    await sleep(E.attackCDvalue);
    E.turretAttackCD[i] = false;
  };
  for (let i = 0; i < E.turrets; i++) {
    E.turretAttackCDstart(i);
  }
  if (playerData.level < 12) E.attackCDstart();
  E.hitCDstart = async function () {
    E.opacity = 0.71;
    for (let i = 70; i >= 0; i--) {
      if (E.opacity != (i + 1) / 100) {
        break;
      } else {
        E.opacity = i / 100;
        await sleep(10);
      }
    }
  };
  E.piercingDamageCDstart = async function (cd) {
    E.piercingCD = true;
    await sleep(cd);
    E.piercingCD = false;
  };
  E.randomDirCDcounter = 1;
  E.randomDirCD = function () {
    E.randomDirCDcounter -= 1;
    if (E.randomDirCDcounter === 0) {
      E.randomDirCDcounter = 300;
      E.randomDirX = Math.cos(Math.random() * 2 * Math.PI);
      E.randomDirY = Math.sin(Math.random() * 2 * Math.PI);
    }
  };
  E.calcTTL = function () {
    if (E.ttl > 0) {
      E.ttl -= 1;
    } else {
      E.HP = 0;
      checkDeath(E);
    }
  };
  if (E.appearOpacity == 0) E.appear();
  return E;
}

var damageNumberList = [];
class DamageNumber {
  constructor(amount, x, y) {
    this.text = amount;
    this.x = x + Math.floor(Math.random() * 20 * (Math.random() > 0.5 ? 1 : -1));
    this.y = y + Math.floor(Math.random() * 20 * (Math.random() > 0.5 ? 1 : -1));
    this.ttl = 60;
  }
  update_render() {
    this.x += 1;
    this.y -= 1;
    this.x += -(player.xspeed + camera.offSetX);
    this.y += -(player.yspeed + camera.offSetY);
    this.ttl--;
    ctx.fillStyle = "#8C95FF";
    ctx.globalAlpha = 0.6;
    ctx.font = 20 * screenratio + "px FFFFORWA";
    ctx.fillText(this.text, this.x, this.y);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.strokeText(this.text, this.x, this.y);
  }
}
