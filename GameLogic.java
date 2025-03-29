import java.util.List;

public class GameLogic {

    public static boolean checkMatch(GameBoard board, int tileIndex1, int tileIndex2) {
        int row1 = tileIndex1 / 6;
        int col1 = tileIndex1 % 6;
        int row2 = tileIndex2 / 6;
        int col2 = tileIndex2 % 6;

        Tile tile1 = board.getTile(row1, col1);
        Tile tile2 = board.getTile(row2, col2);

        if (tile1 == null || tile2 == null) return false;

        List<Image> images1 = tile1.getImages();
        List<Image> images2 = tile2.getImages();

        if (images1.isEmpty() || images2.isEmpty()) return false;

        Image top1 = images1.get(images1.size() - 1);
        Image top2 = images2.get(images2.size() - 1);

        if (top1.getImageID().equals(top2.getImageID())) {
            // 🧠 Pop the top image from both stacks
            images1.remove(images1.size() - 1);
            images2.remove(images2.size() - 1);
            return true;
        }

        return false;
    }
}
