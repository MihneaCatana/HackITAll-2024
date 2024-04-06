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

}, {
    id: 2,
    spaceName: "Space 2",
    devices: [
        {
            id: 1,
            deviceName: "Device 3",
            status: true,
            consumption: 39,
            timestamp: 1712404842
        },
        {
            id: 2,
            deviceName: "Device 4",
            status: true,
            consumption: 25,
            timestamp: 1712400842
        },
        {
            id: 3,
            deviceName: "Device 5",
            status: true,
            consumption: 79,
            timestamp: 1712400442
        },
        {
            id: 4,
            deviceName: "Device 6",
            status: true,
            consumption: 60,
            timestamp: 1712400042
        }
    ]

}]