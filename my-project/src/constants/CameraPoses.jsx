import { SESSION } from "./Sessions";

export const CAMERA_POSES = {
  [SESSION.TITLE]: { pos: [-15.5, 70.8, 12.6], target: [-7.2, 81.3, -19], smooth: false },
  [SESSION.HOME]: { pos: [-15, 60, 110], target: [-15, 45, 45], smooth: true  },
  [SESSION.START]: { pos: [-55, 40, 70], target: [-35, 15, -5], smooth: true  },
  [SESSION.PAUSE]: { pos: [-55, 40, 70], target: [-35, 15, -5], smooth: true  },
  [SESSION.PLAY]: { pos: [-55, 40, 70], target: [-35, 15, -5], smooth: true  },
};