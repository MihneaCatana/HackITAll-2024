import {Space} from "../types/space.ts";

export const spaces: Space[] = [{
    id: 1,
    spaceName: "Space 1",
    devices: [
        {
            id: 1,
            deviceName: "Refrigetator",
            status: false,
            consumption: 0,
            timestamp: 1712406842
        },
        {
            id: 2,
            deviceName: "Light Bulb",
            status: true,
            consumption: 16,
            timestamp: 1612406842
        }
    ]

}]