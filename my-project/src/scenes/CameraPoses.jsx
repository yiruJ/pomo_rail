import { SESSION } from "../constants/Sessions";

export const CAMERA_POSES = {
  [SESSION.TITLE]: { pos: [-5.5, 70.8, 12.6], target: [-5.2, 81.3, -19], smooth: false },
  [SESSION.HOME]: { pos: [-15, 60, 110], target: [-15, 45, 45], smooth: true  },
  [SESSION.START]: { pos: [-65, 45, 70], target: [-45, 15, -5], smooth: true  },
  [SESSION.PAUSE]: { pos: [-65, 45, 70], target: [-45, 15, -5], smooth: true  },
  [SESSION.PLAY]: { pos: [-65, 45, 70], target: [-45, 15, -5], smooth: true  },
};