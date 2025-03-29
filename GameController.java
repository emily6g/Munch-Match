import java.util.*;
import java.util.stream.Collectors;

public class GameController {

    private GameBoard gameBoard = new GameBoard(6, 6); // 6x6 board

    // Constructor to initialize the board with sample data
    public GameController() {
        initializeBoard();
    }

    // GET /api/getBoard
    public Map<String, Object> getBoard() {
        Tile[][] rawBoard = gameBoard.getBoard();
        List<List<Map<String, Object>>> board = new ArrayList<>();

        for (Tile[] row : rawBoard) {
            List<Map<String, Object>> tileRow = new ArrayList<>();
            for (Tile tile : row) {
                Map<String, Object> tileData = new HashMap<>();
                List<Map<String, String>> images = tile.getImages().stream()
                        .map(img -> Map.of(
                                "imagePath", img.getImagePath(),
                                "imageID", img.getImageID()
                        ))
                        .collect(Collectors.toList());
                tileData.put("images", images);
                tileRow.add(tileData);
            }
            board.add(tileRow);
        }

        return Map.of("board", board);
    }

    // POST /api/checkMatch
    public Map<String, Object> checkMatch(MatchRequest req) {
        int index1 = req.getTile1();
        int index2 = req.getTile2();

        boolean isMatch = GameLogic.checkMatch(gameBoard, index1, index2);

        Tile tile1 = gameBoard.getTile(index1 / 6, index1 % 6);
        Tile tile2 = gameBoard.getTile(index2 / 6, index2 % 6);

        String newImage1 = getTopImagePath(tile1);
        String newImage2 = getTopImagePath(tile2);

        Map<String, Object> response = new HashMap<>();
        response.put("match", isMatch);
        response.put("newImage1", newImage1);
        response.put("newImage2", newImage2);

        return response;
    }

    // Utility: Get the top image from a tile stack
    private String getTopImagePath(Tile tile) {
        List<Image> images = tile.getImages();
        if (images == null || images.isEmpty()) {
            return ""; // No more patterns
        }
        return images.get(images.size() - 1).getImagePath();
    }

    // Utility: Dummy board data
    private void initializeBoard() {
        for (int i = 0; i < 6; i++) {
            for (int j = 0; j < 6; j++) {
                List<Image> imageStack = new ArrayList<>();
                imageStack.add(new Image("img/star.png", "star"));
                imageStack.add(new Image("img/heart.png", "heart"));
                imageStack.add(new Image("img/moon.png", "moon"));
                Tile tile = new Tile(imageStack, "blue");
                gameBoard.setTile(i, j, tile);
            }
        }
    }
}
