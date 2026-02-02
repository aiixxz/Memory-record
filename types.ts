export interface Photo {
  id: string;
  url: string;
  title: string;
  description: string;
  date: string;
  location: string;
  reelYear: string; // Grouping by year
  cameraSettings?: {
    camera: string;
    film: string;
    fStop: string;
    shutter: string;
  };
}

export interface Writing {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
}

export interface SiteData {
  photos: Photo[];
  writings: Writing[];
}