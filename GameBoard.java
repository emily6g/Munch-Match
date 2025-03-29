public class GameBoard {
    private Tile[][] board;  // 2D array of tiles (rows x columns)
    private int rows;        // Number of rows in the game board
    private int cols;        // Number of columns in the game board

    // Constructor to initialize the game board with given rows and columns
    public GameBoard(int rows, int cols) 
    {
        this.rows = rows;
        this.cols = cols;
        this.board = new Tile[rows][cols];  // Initialize the 2D array of tiles
    }

    // Getter for the board
    public Tile[][] getBoard() 
    {
        return board;
    }

    // Method to set a tile at a specific position
    public void setTile(int row, int col, Tile tile) 
    {
        if (row >= 0 && row < rows && col >= 0 && col < cols) 
        {
            board[row][col] = tile;
        }
    }

    // Method to get a tile from a specific position
    public Tile getTile(int row, int col) 
    {
        if (row >= 0 && row < rows && col >= 0 && col < cols) 
        {
            return board[row][col];
        }
        return null;  // Return null if the position is out of bounds
    }

    //add click method to handle click
}
