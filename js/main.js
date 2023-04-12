import './form.js';

import { createPhotos } from './data.js';
import { createMiniaturesList } from './miniature.js';

const renderMiniatures = createPhotos();
createMiniaturesList(renderMiniatures);
