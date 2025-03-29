public class Image 
{
    private String imagePath;  // Path or URL to the image file
    private String imageID;    // Unique ID or name of the image

    public Image(String imagePath, String imageID) 
    {
        this.imagePath = imagePath;
        this.imageID = imageID;
    }

    public String getImagePath() 
    {
        return imagePath;
    }

    public void setImagePath(String imagePath) 
    {
        this.imagePath = imagePath;
    }

    public String getImageID() 
    {
        return imageID;
    }

    public void setImageID(String imageID) 
    {
        this.imageID = imageID;
    }
}
