from PIL import Image

def autocrop(input_path, output_path):
    img = Image.open(input_path)
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    # Get the bounding box of the non-transparent area
    bbox = img.getbbox()
    if bbox:
        # Crop the image to the bounding box
        img = img.crop(bbox)
        
    img.save(output_path, 'PNG')
    print(f"Autocropped and saved to {output_path}")

input_file = "C:/Users/Mike/.gemini/antigravity/brain/063668d0-0717-42ea-83ea-20731e02bcd7/uploaded_image_1767910018644.png"
output_logo = "c:/Users/Mike/.gemini/antigravity/scratch/caprica-website/public/caprica-logo.png"
output_favicon = "c:/Users/Mike/.gemini/antigravity/scratch/caprica-website/public/favicon.png"

autocrop(input_file, output_logo)
autocrop(input_file, output_favicon)
