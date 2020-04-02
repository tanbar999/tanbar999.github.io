class cell_cost {
  constructor(g_cost, h_cost, f_cost, parent_x, parent_y, isWall) {
    this.g_cost = g_cost;
    this.h_cost = h_cost;
    this.f_cost = f_cost;
    this.parent_x = parent_x;
    this.parent_y = parent_y;
    this.isWall = isWall;
  }
}