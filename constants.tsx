import { Photo, Writing } from './types';

export const MOCK_PHOTOS: Photo[] = [
  // 2025 REEL
  {
    id: '1',
    url: 'https://picsum.photos/id/10/800/1000',
    title: 'Morning Haze',
    description: 'Caught the first light hitting the coastal fog.',
    date: '2025-11-12',
    reelYear: '2025',
    location: 'Pacific Coast, CA',
    cameraSettings: { camera: 'Leica M6', film: 'Portra 400', fStop: 'f/2.8', shutter: '1/125s' }
  },
  {
    id: '2',
    url: 'https://picsum.photos/id/14/1000/800',
    title: 'Urban Echo',
    description: 'The geometry of solitude in the city center.',
    date: '2025-12-05',
    reelYear: '2025',
    location: 'Tokyo, Japan',
    cameraSettings: { camera: 'Fujifilm TX-1', film: 'Cinestill 800T', fStop: 'f/4', shutter: '1/60s' }
  },
  // 2024 REEL
  {
    id: '3',
    url: 'https://picsum.photos/id/29/800/800',
    title: 'Rusty Dreams',
    description: 'Details of an abandoned shipyard.',
    date: '2024-01-20',
    reelYear: '2024',
    location: 'Brooklyn Navy Yard',
    cameraSettings: { camera: 'Nikon FM2', film: 'Kodak Gold 200', fStop: 'f/8', shutter: '1/250s' }
  },
  {
    id: '4',
    url: 'https://picsum.photos/id/33/700/900',
    title: 'Still Life with Shadow',
    description: 'A quiet moment at home.',
    date: '2024-02-14',
    reelYear: '2024',
    location: 'Studio Loft',
    cameraSettings: { camera: 'Pentax 67', film: 'Ilford HP5 Plus', fStop: 'f/4.5', shutter: '1/30s' }
  },
  // 2023 REEL
  {
    id: '5',
    url: 'https://picsum.photos/id/42/1100/700',
    title: 'Desert Wind',
    description: 'Vastness captured in panoramas.',
    date: '2023-10-10',
    reelYear: '2023',
    location: 'Joshua Tree',
    cameraSettings: { camera: 'Hasselblad 500C', film: 'Ektar 100', fStop: 'f/11', shutter: '1/500s' }
  }
];

export const MOCK_WRITINGS: Writing[] = [
  {
    id: 'w1',
    title: 'The Latency of Memory',
    content: 'Photography is not about capturing what is there, but what is leaving.',
    date: '2023-12-15',
    category: 'Essay'
  }
];