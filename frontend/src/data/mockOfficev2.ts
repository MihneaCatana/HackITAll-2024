import {Space} from "../types/space.ts";

export const spaces: Space[] = [{
    id: 1,
    name: "Space 1",
    devices: [
        {
            id: 1,
            name: "Refrigetator",
            status: false,
            consumption: 0,
            timestamp: 1712406842
        },
        {
            id: 2,
            name: "Light Bulb",
            status: true,
            consumption: 16,
            timestamp: 1612406842
        }
    ]

}, {
    id: 2,
    name: "Space 2",
    devices: [
        {
            id: 1,
            name: "Device 3",
            status: true,
            consumption: 39,
            timestamp: 1712404842
        },
        {
            id: 2,
            name: "Device 4",
            status: true,
            consumption: 25,
            timestamp: 1712400842
        },
        {
            id: 3,
            name: "Device 5",
            status: true,
            consumption: 79,
            timestamp: 1712400442
        },
        {
            id: 4,
            name: "Device 6",
            status: true,
            consumption: 60,
            timestamp: 1712400042
        }
    ]

}]