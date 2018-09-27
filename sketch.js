const SIZE = 800 / 16;
const MINES = 40;
var gameOver = false;

var terrain = [];
var canClick = true;


function setup()
{
  createCanvas(800, 800);
  initTerrain();
  calculateNear();
}

function draw()
{
  background(51);

  drawGrid();
  drawTerrain();
  updateTerrain();
  gameOverf();
}

function drawGrid()
{
  stroke(0);
  for (var x = 0; x < floor(width / SIZE); x++)
  {
    for (var y = 0; y < floor(width / SIZE); y++)
    {
      line(0, y * SIZE, width, y * SIZE);
    }
    line(x * SIZE, 0, x * SIZE, height);
  }
}

function initTerrain()
{
  var temp = ineditRandomMines();

  for (var x = 0; x < floor(width / SIZE); x++)
  {
    terrain.push([]);
    for (var y = 0; y < floor(width / SIZE); y++)
    {
      terrain[x].push(new Cell(x, y, getType(x, y, temp)));

    }
  }
}

function calculateNear()
{

  for (var x = 0; x < floor(width / SIZE); x++)
  {
    for (var y = 0; y < floor(width / SIZE); y++)
    {
      try
      {
        for (var z = 0; z < 3; z++)
        {
          for (var t = 0; t < 3; t++)
            if (terrain[x + z - 1][y + t - 1].type && !terrain[x][y].type)
            {
              terrain[x][y].near++;
            }
        }

      }
      catch (e)
      {}
    }
  }
}

function drawTerrain()
{
  for (var x = 0; x < floor(width / SIZE); x++)
  {
    for (var y = 0; y < floor(width / SIZE); y++)
    {
      terrain[x][y].draw();
    }
  }
}

function updateTerrain()
{
  for (var x = 0; x < floor(width / SIZE); x++)
  {
    for (var y = 0; y < floor(width / SIZE); y++)
    {
      terrain[x][y].onClick();
    }
  }
}

function ineditRandomMines()
{
  var temp = [];

  for (var i = 0; i < 40; i++)
  {
    var notinedit = true,
      xt, yt;
    while (notinedit)
    {
      xt = floor(random(floor(width / SIZE)));
      yt = floor(random(floor(height / SIZE)));
      var notinedit = false;
      for (var o of temp)
      {
        if (o.x == xt && o.y == yt)
          notinedit = true;
      }
    }

    temp.push(
    {
      x: xt,
      y: yt
    });
  }

  return temp;
}

function openCells(x, y)
{
  if (terrain[x][y].flag)
    return;
  if (terrain[x][y].checked || terrain[x][y].type)
  {
    terrain[x][y].active = true;
    return;
  }

  terrain[x][y].checked = true;

  if (terrain[x][y].near > 0)
  {
    terrain[x][y].active = true;
  }
  else
  {
    try
    {
      for (var z = 0; z < 3; z++)
      {
        for (var t = 0; t < 3; t++)
          openCells(x + z - 1, y + t - 1);
      }

    }
    catch (e)
    {}
  }
}

function resetCheck()
{
  for (var x = 0; x < floor(width / SIZE); x++)
  {
    for (var y = 0; y < floor(width / SIZE); y++)
    {
      terrain[x][y].checked = false;
    }
  }
}

function getType(x, y, temp)
{
  for (var o of temp)
  {
    if (o.x == x && o.y == y)
      return true;
  }
  return false;
}

function gameOverf()
{
  if (gameOver)
  {
    fill(255, 0, 0);
    stroke(0);
    textSize(50);
    text("GAME OVER!", 260, 390);
  }
}