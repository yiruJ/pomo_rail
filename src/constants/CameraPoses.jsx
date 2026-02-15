import { SESSION } from "./Sessions";

export const CAMERA_POSES = {
  [SESSION.TITLE]: { pos: [-15.5, 100.8, 12.6], target: [-7.2, 100.3, -19], smooth: false },
  [SESSION.HOME]: { pos: [-30, 60, 105], target: [-30, 45, 45], smooth: true  },
  [SESSION.START]: { pos: [-55, 40, 70], target: [-35, 15, -5], smooth: true  },
  [SESSION.PAUSE_START]: { pos: [-55, 40, 70], target: [-35, 15, -5], smooth: true  },
  [SESSION.PAUSE_BREAK]: { pos: [-55, 40, 70], target: [-35, 15, -5], smooth: true  },
  [SESSION.PLAY]: { pos: [-55, 40, 70], target: [-35, 15, -5], smooth: true  },
  [SESSION.BREAK]: { pos: [-55, 40, 70], target: [-35, 15, -5], smooth: true  },
};