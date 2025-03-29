import java.util.List;

public class Tile {
    private List<Image> images;  // List of images associated with the tile
    private String color;        // Tile color

    //
    public Tile(List<Image> images, String color) 
    {
        this.images = images;
        this.color = color;
    }

    public List<Image> getImages() 
    {
        return images;
    }

    public void setImages(List<Image> images) 
    {
        this.images = images;
    }

    public String getColor() 
    {
        return color;
    }

    public void setColor(String color) 
    {
        this.color = color;
    }

    /**
     * Get the current image based on some logic, like random or based on the game state.
     * 
     * @return The path to the current image to be used for this tile.
     */
    public String getCurrentImagePath() 
    {
        // In this example, we'll randomly select an image from the list
        int index = (int) (Math.random() * images.size());
        return images.get(index).getImagePath();
    }

    //add method to remove an image
}
