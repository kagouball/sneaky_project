
module.exports = {
  getUpdatedVelocity,
  areVelocityReversed
}

function getUpdatedVelocity(keyCode) {
  switch (keyCode) {
    case 37: { // left
      return [-1, 0];
    }
    case 40: { // down
      return [0, 1];
    }
    case 39: { // right
      return [1, 0];
    }
    case 38: { // up
      return [0, -1];
    }
  }
}

function areVelocityReversed(dir1, dir2)
{
  return dir1[0] + dir2[0] == 0 && dir1[1] + dir2[1] == 0;
}