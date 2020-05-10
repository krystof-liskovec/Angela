//spawner of enemies
async function spawn() {
  if (levelTimer == 0) {
    UI.levelDisplay.text = ship.section + "-" + ship.level;
    for (let i = 1; i <= 400; i++) {
      if (i <= 100) {
        UI.levelDisplay.opacity = i / 100;
      } else if (i > 300 && i <= 370) {
        UI.levelDisplay.opacity = (370 - i) / 70;
      }
      await sleep(10);
    }
    UI.levelDisplayCheck = false;
    await sleep(levels_handler.level.startTime);
  }
  for (let i = 0; i < enemySpawnList.length; i++) {
    enemyList.push(
      enemyCharacter({
        x: enemySpawnList[i].x * screenratio + player.earthX,
        y: enemySpawnList[i].y * screenratio + player.earthY,
        randomDrop: enemySpawnList[i].randromDrop,
        spawnCD: enemySpawnList[i].spawnCD,
        ...enemyDatabase[enemySpawnList[i].type],
      })
    );
    await sleep(enemySpawnList[i].spawnCD);
  }
  enemySpawnList = [];
}

let enemySpawnList = [];
var levels_handler = {
  level: {},
  levelCreator: function () {
    let detMatrix = [
      [-1, 0, 0, 1],
      [0, -1, 1, 0],
      [1, 0, 0, 1],
      [0, 1, 1, 0],
    ];
    for (index in this.level) {
      if (
        index != "waves" &&
        index != "startTime" &&
        this.level[index][2] == this.level.waves
      ) {
        for (let i = 0; i < this.level[index][0]; i++) {
          let randomPosArray = detMatrix[Math.floor(Math.random() * 4)];
          let det_x =
            (randomPosArray[0] * player.spaceSize) / screenratio / 2 +
            randomPosArray[2] *
              (((Math.random() < 0.5 ? -1 : 1) *
                Math.random() *
                player.spaceSize) /
                screenratio /
                2);

          let det_y =
            (randomPosArray[1] * player.spaceSize) / screenratio / 2 +
            randomPosArray[3] *
              (((Math.random() < 0.5 ? -1 : 1) *
                Math.random() *
                player.spaceSize) /
                2);
          let randomDrop;
          if (Math.round(Math.random() * 1) == 1) randomDrop = true;
          else randomDrop = false;
          enemySpawnList.push({
            x: det_x,
            y: det_y,
            type: index,
            randromDrop: randomDrop,
            spawnCD: this.level[index][1],
          });
        }
      }
    }
    this.level.total = enemySpawnList.length;
    enemySpawnList.sort(function () {
      return 0.5 - Math.random();
    });
  },
};

function levelLayout(L) {
  if (ship.section == 1) {
    if (ship.level == 1) {
      L.waves = 2;
      L.startTime = 3000;
      L.smallCube = [1, 1, 2];
      L.largeCube = [0 + ship.level, 1, 2];
    }
    //L.test = [5, 1];
  }
  return L;
}
