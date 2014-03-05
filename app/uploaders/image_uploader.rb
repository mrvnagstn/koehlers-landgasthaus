class ImageUploader < CarrierWave::Uploader::Base

  # Include RMagick or MiniMagick support:
  # include CarrierWave::RMagick
  include CarrierWave::MiniMagick
  include CarrierWave::MimeTypes
  storage :fog
  process :set_content_type

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def extension_white_list
     %w(jpg jpeg png gif)
  end

  version :normal do
    process resize_to_fit: [480, 440]
  end

  version :med do
    process resize_to_fit: [250, 250]
  end

  version :thumb do
    process resize_to_fit: [128, 128]
  end

  version :pass do
    process resize_to_fill: [354, 472]
  end

  version :blowup do
    process resize_to_fill: [400,400]
  end

  protected

  def is_landscape?(picture)
    image = MiniMagick::Image.open(picture.path)
    image[:width] > image[:height]
  end

end
