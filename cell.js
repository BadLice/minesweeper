class Cell
{
  constructor(x, y, t, col)
  {
    this.x = x;
    this.y = y;
    this.type = t; //1=mine,0=empty(true,false)
    this.active = false;
    this.near = 0;
    this.checked = false;
    this.flag = false;

    if (this.type)
      this.color = color(255, 0, 0);
    else
      this.color = color(150);
  }

  draw()
  {
    textSize(15)
    if (this.active)
    {
      if (this.color)
        fill(this.color)
      else
        fill(255, 255, 255);



      this.drawRect();
      if (this.near)
      {
        fill(0)
        text(this.near, this.x * SIZE + 20, this.y * SIZE + 28)
      }
    }
    else
    {
      if (this.flag)
      {
        fill(0, 0, 255)
        this.drawRect();
      }
    }
  }

  drawRect()
  {
    rect(this.x * SIZE, this.y * SIZE, SIZE, SIZE);
  }

  onClick()
  {
    if (!this.active && mouseX > this.x * SIZE && mouseX < this.x * SIZE + SIZE && mouseY > this.y * SIZE && mouseY < this.y * SIZE + SIZE)
    {
      if (mouseIsPressed)
      {
        if (canClick)
        {
          if (mouseButton === LEFT)
          {
            if (!this.flag)
            {
              this.active = true;
              if (this.type)
              {
                gameOver = true;
              }
              else
              {
                resetCheck();
                openCells(this.x, this.y);
              }
            }
          }

          if (mouseButton === CENTER)
          {
            this.flag = !this.flag;
          }
        }
        canClick = false;
      }
      else
        canClick = true;
    }
  }
}